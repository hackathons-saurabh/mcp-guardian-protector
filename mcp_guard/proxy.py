import requests
import json
import os
from datetime import datetime
from fastapi import FastAPI, Request, UploadFile, File
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
import io

EVENT_LOG = os.environ.get("MCPGUARD_EVENT_LOG", "mcpguard_events.jsonl")
POLICY_FILE = os.environ.get("MCPGUARD_POLICY_FILE", "mcpguard_policy.json")
INTEGRATION_FILE = os.environ.get("MCPGUARD_INTEGRATION_FILE", "mcpguard_integrations.json")

# --- Policy orchestrator ---
def load_policy():
    if os.path.exists(POLICY_FILE):
        with open(POLICY_FILE) as f:
            try:
                return json.load(f)
            except Exception:
                return {}
    return {}

def save_policy(policy_dict):
    with open(POLICY_FILE, "w") as f:
        json.dump(policy_dict, f)

def log_event(event):
    event["timestamp"] = datetime.utcnow().isoformat()
    with open(EVENT_LOG, "a") as f:
        f.write(json.dumps(event) + "\n")

def load_integrations():
    if os.path.exists(INTEGRATION_FILE):
        with open(INTEGRATION_FILE) as f:
            try:
                return json.load(f)
            except Exception:
                return {}
    return {}

def save_integrations(integrations):
    with open(INTEGRATION_FILE, "w") as f:
        json.dump(integrations, f)

def send_webhook_alert(event):
    integrations = load_integrations()
    url = integrations.get("webhook_url")
    if url and event.get("blocked"):
        try:
            requests.post(url, json={"text": f"[MCPGuard] Blocked threat: {event.get('prompt', '')}"})
        except Exception as e:
            print(f"[MCPGuard] Failed to send webhook: {e}")

class ProxyClient:
    def patch_agent(self, agent):
        orig_run = getattr(agent, 'run', None)
        if orig_run:
            def proxy_run(*args, **kwargs):
                prompt = args[0] if args else kwargs.get('prompt', '')
                print(f"[MCPGuard Proxy] Routing call via proxy: {prompt}")
                resp = requests.post('http://localhost:8080/proxy', json={"prompt": prompt})
                if resp.status_code == 200:
                    return resp.json().get('result', None)
                else:
                    raise Exception(f"Proxy error: {resp.text}")
            agent.run = proxy_run
            print("[MCPGuard Proxy] Agent 'run' method patched to use proxy.")
        else:
            print("[MCPGuard Proxy] No 'run' method found to patch.")

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post('/integrations')
async def set_integration(request: Request):
    data = await request.json()
    url = data.get("webhook_url")
    if not url:
        return JSONResponse({"error": "Missing webhook_url"}, status_code=400)
    save_integrations({"webhook_url": url})
    return {"status": "ok", "webhook_url": url}

@app.get('/integrations')
async def get_integration():
    return load_integrations()

@app.post('/proxy')
async def proxy_endpoint(request: Request):
    data = await request.json()
    prompt = data.get('prompt', '')
    print(f"[MCPGuard Proxy] Intercepted prompt: {prompt}")
    # --- Policy enforcement ---
    policy = load_policy()
    block_keywords = policy.get('block_keywords', [])
    blocked = any(kw.lower() in str(prompt).lower() for kw in block_keywords) or 'block' in str(prompt).lower()
    event = {
        "type": "threat" if blocked else "call",
        "prompt": prompt,
        "blocked": blocked,
        "source": "proxy"
    }
    log_event(event)
    send_webhook_alert(event)
    if blocked:
        print("[MCPGuard Proxy] Threat detected: blocking call!")
        return JSONResponse({"error": "Blocked by MCPGuard proxy (policy)."}, status_code=403)
    # Simulate LLM/tool call (echo)
    result = f"Echo: {prompt}"
    return {"result": result}

@app.get('/events')
async def get_events():
    events = []
    if os.path.exists(EVENT_LOG):
        with open(EVENT_LOG) as f:
            for line in f:
                try:
                    events.append(json.loads(line))
                except Exception:
                    continue
    return {"events": events[-100:]}

@app.post('/policy')
async def upload_policy(file: UploadFile = File(...)):
    try:
        policy_dict = json.load(file.file)
        save_policy(policy_dict)
        return {"status": "ok", "policy": policy_dict}
    except Exception as e:
        return JSONResponse({"error": str(e)}, status_code=400)

@app.get('/policy')
async def get_policy():
    return load_policy()

@app.get('/compliance/csv')
async def compliance_csv():
    events = []
    if os.path.exists(EVENT_LOG):
        with open(EVENT_LOG) as f:
            for line in f:
                try:
                    events.append(json.loads(line))
                except Exception:
                    continue
    if not events:
        return StreamingResponse(io.StringIO("No events found."), media_type="text/csv")
    header = list(events[0].keys())
    csv_lines = [','.join(header)]
    for e in events:
        csv_lines.append(','.join([json.dumps(e.get(h, "")) for h in header]))
    csv_data = '\n'.join(csv_lines)
    return StreamingResponse(io.StringIO(csv_data), media_type="text/csv", headers={"Content-Disposition": "attachment; filename=mcpguard_compliance.csv"})

@app.get('/compliance/pdf')
async def compliance_pdf():
    return JSONResponse({"error": "PDF export not implemented in demo."}, status_code=501)
