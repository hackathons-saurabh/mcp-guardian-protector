# MCPGuard VC Demo Script

## 1. Start MCPGuard Proxy
```bash
python3 -m mcp_guard.main
```

## 2. Open the Dashboard (localhost:5173 or your dev port)

## 3. Show Real-Time Threat Feed
- Point out the live threat feed panel.
- Click "Simulate Attack". See the blocked event appear instantly.

## 4. Show Agent Status
- See agent(s) and threats blocked update live.

## 5. Show Policy Orchestrator
- In "Policy Editor", upload a JSON file:
```json
{
  "block_keywords": ["leak", "secret", "exfil"]
}
```
- Simulate an attack with one of these keywords. See it blocked.

## 6. Show Compliance Export
- Click "Export Events as CSV". Open the file to show audit log.
- Click "Export Events as PDF" (shows not implemented message for demo).

## 7. Show Integrations
- Enter a Slack/Infobip webhook URL. Save.
- Simulate a blocked attack. Show alert in Slack/Infobip.

## 8. Recap
- "With MCPGuard, you get real-time, zero-trust protection, policy control, compliance, and integrations—all with drop-in deployment."