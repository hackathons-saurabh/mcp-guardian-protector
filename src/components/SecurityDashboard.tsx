import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Activity, 
  Users, 
  Zap,
  TrendingUp,
  Clock,
  Eye,
  Lock
} from "lucide-react";
import { ThreatFeed } from "./dashboard/ThreatFeed";
import { SecurityMetrics } from "./dashboard/SecurityMetrics";
import { AgentStatus } from "./dashboard/AgentStatus";
import { RealtimeChart } from "./dashboard/RealtimeChart";

const BACKEND_URL = "http://localhost:8080/events";
const POLICY_URL = "http://localhost:8080/policy";
const COMPLIANCE_CSV_URL = "http://localhost:8080/compliance/csv";
const COMPLIANCE_PDF_URL = "http://localhost:8080/compliance/pdf";
const INTEGRATION_URL = "http://localhost:8080/integrations";
const COMPLIANCE_TEMPLATE_URL = "https://raw.githubusercontent.com/fkautz/safe-mcp/main/templates/SAFE-MCP-Compliance-Template.csv";

function exportEventsAsCSV(events: any[]) {
  if (!events.length) return;
  const header = Object.keys(events[0]);
  const csv = [header.join(",")].concat(
    events.map(e => header.map(h => JSON.stringify(e[h] ?? "")).join(","))
  ).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "mcpguard_events.csv";
  a.click();
  URL.revokeObjectURL(url);
}

export const SecurityDashboard = () => {
  const [stats, setStats] = useState({
    totalAgents: 12,
    activeThreats: 3,
    blockedAttacks: 247,
    uptime: 99.8
  });

  const [realtimeData, setRealtimeData] = useState([
    { time: '10:00', threats: 5, blocked: 4, allowed: 12 },
    { time: '10:05', threats: 8, blocked: 7, allowed: 15 },
    { time: '10:10', threats: 3, blocked: 3, allowed: 18 },
    { time: '10:15', threats: 12, blocked: 11, allowed: 9 },
    { time: '10:20', threats: 6, blocked: 5, allowed: 14 }
  ]);

  const [events, setEvents] = useState<any[]>([]);
  const [policy, setPolicy] = useState<string>("{}\n");
  const [policyMsg, setPolicyMsg] = useState<string>("");
  const [pdfMsg, setPdfMsg] = useState<string>("");
  const [webhookUrl, setWebhookUrl] = useState<string>("");
  const [webhookMsg, setWebhookMsg] = useState<string>("");

  useEffect(() => {
    const interval = setInterval(() => {
      setRealtimeData(prev => {
        const newTime = new Date().toLocaleTimeString('en-US', { 
          hour12: false, 
          hour: '2-digit', 
          minute: '2-digit' 
        });
        const newData = {
          time: newTime,
          threats: Math.floor(Math.random() * 15),
          blocked: Math.floor(Math.random() * 10),
          allowed: Math.floor(Math.random() * 20)
        };
        return [...prev.slice(1), newData];
      });
    }, 5000);

    fetch(BACKEND_URL)
      .then(res => res.json())
      .then(data => setEvents(data.events || []))
      .catch(() => setEvents([]));
    // Fetch current policy
    fetch(POLICY_URL)
      .then(res => res.json())
      .then(data => setPolicy(JSON.stringify(data, null, 2)))
      .catch(() => setPolicy("{}"));
    fetch(INTEGRATION_URL)
      .then(res => res.json())
      .then(data => setWebhookUrl(data.webhook_url || ""))
      .catch(() => setWebhookUrl(""));
  }, []);

  const handlePolicyUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    setPolicyMsg("Uploading policy...");
    fetch(POLICY_URL, {
      method: "POST",
      body: formData
    })
      .then(res => res.json())
      .then(data => {
        setPolicy(JSON.stringify(data.policy, null, 2));
        setPolicyMsg("Policy uploaded and applied!");
      })
      .catch(() => setPolicyMsg("Failed to upload policy."));
  };

  const handleWebhookSave = () => {
    setWebhookMsg("Saving webhook...");
    fetch(INTEGRATION_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ webhook_url: webhookUrl })
    })
      .then(res => res.json())
      .then(data => setWebhookMsg("Webhook saved!"))
      .catch(() => setWebhookMsg("Failed to save webhook."));
  };

  return (
    <div className="space-y-6">
      {/* Top Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-blue-400 hover:shadow-lg transition-shadow bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-700">Protected Agents</CardTitle>
            <div className="p-2 rounded-lg bg-blue-100">
              <Users className="h-4 w-4 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800">{stats.totalAgents}</div>
            <p className="text-xs text-slate-600">
              <span className="text-emerald-500 font-medium">+2</span> since last hour
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-400 hover:shadow-lg transition-shadow bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-700">Active Threats</CardTitle>
            <div className="p-2 rounded-lg bg-red-100">
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">{stats.activeThreats}</div>
            <p className="text-xs text-slate-600">
              <span className="text-red-500 font-medium">High priority</span> incidents
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-emerald-400 hover:shadow-lg transition-shadow bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-700">Blocked Attacks</CardTitle>
            <div className="p-2 rounded-lg bg-emerald-100">
              <Shield className="h-4 w-4 text-emerald-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-500">{stats.blockedAttacks}</div>
            <p className="text-xs text-slate-600">
              <span className="text-emerald-500 font-medium">+15</span> in last 24h
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-400 hover:shadow-lg transition-shadow bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-700">System Uptime</CardTitle>
            <div className="p-2 rounded-lg bg-blue-100">
              <Activity className="h-4 w-4 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">{stats.uptime}%</div>
            <Progress value={stats.uptime} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Real-time Activity Chart */}
        <div className="lg:col-span-2">
          <Card className="bg-white hover:shadow-lg transition-shadow border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center text-slate-800">
                <div className="p-2 rounded-lg bg-gradient-to-br from-blue-400 to-purple-500 mr-3">
                  <TrendingUp className="h-5 w-5 text-white" />
                </div>
                Real-time Security Activity
              </CardTitle>
              <CardDescription className="text-slate-600">Live monitoring of threats and protections</CardDescription>
            </CardHeader>
            <CardContent>
              <RealtimeChart data={realtimeData} />
            </CardContent>
          </Card>
        </div>

        {/* Agent Status */}
        <div>
          <AgentStatus />
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Threat Feed */}
        <ThreatFeed />
        
        {/* Security Metrics */}
        <SecurityMetrics />
      </div>
      {/* Compliance Export & Policy Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white hover:shadow-lg transition-shadow border-blue-200">
          <CardHeader>
            <CardTitle className="text-slate-800">Compliance Export</CardTitle>
            <CardDescription className="text-slate-600">Export all events as CSV or PDF for audit/compliance. Download a compliance template (GDPR, SOC2, etc.).</CardDescription>
          </CardHeader>
          <CardContent>
            <button
              className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/80 mr-2"
              onClick={() => window.open(COMPLIANCE_CSV_URL, '_blank')}
            >
              Export Events as CSV
            </button>
            <button
              className="px-4 py-2 bg-secondary text-black rounded hover:bg-secondary/80 mr-2"
              onClick={async () => {
                setPdfMsg("Generating PDF (demo)...");
                const res = await fetch(COMPLIANCE_PDF_URL);
                if (res.status === 501) setPdfMsg("PDF export not implemented in demo.");
                else setPdfMsg("PDF downloaded.");
                setTimeout(() => setPdfMsg(""), 3000);
              }}
            >
              Export Events as PDF
            </button>
            <button
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              onClick={() => window.open(COMPLIANCE_TEMPLATE_URL, '_blank')}
            >
              Download Compliance Template (GDPR/SOC2)
            </button>
            {pdfMsg && <div className="text-xs text-red-500 mt-2">{pdfMsg}</div>}
          </CardContent>
        </Card>
        <Card className="bg-white hover:shadow-lg transition-shadow border-purple-200">
          <CardHeader>
            <CardTitle className="text-slate-800">Policy Editor (Stub)</CardTitle>
            <CardDescription className="text-slate-600">Upload a JSON policy file (not yet enforced).</CardDescription>
          </CardHeader>
          <CardContent>
            <input type="file" accept="application/json" onChange={handlePolicyUpload} className="mb-2" />
            <textarea
              className="w-full mt-2 p-3 border border-slate-200 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all"
              rows={8}
              value={policy}
              onChange={e => setPolicy(e.target.value)}
            />
            {policyMsg && <div className="text-xs text-emerald-600 mt-2 font-medium">{policyMsg}</div>}
          </CardContent>
        </Card>
        <Card className="bg-white hover:shadow-lg transition-shadow border-emerald-200">
          <CardHeader>
            <CardTitle className="text-slate-800">Integrations</CardTitle>
            <CardDescription className="text-slate-600">Send alerts to Slack, Infobip, etc. via webhook.</CardDescription>
          </CardHeader>
          <CardContent>
            <input
              type="text"
              className="w-full p-3 border border-slate-200 rounded-lg mb-3 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all"
              placeholder="Webhook URL (Slack, Infobip, etc.)"
              value={webhookUrl}
              onChange={e => setWebhookUrl(e.target.value)}
            />
            <button
              className="px-4 py-2 bg-gradient-to-r from-emerald-400 to-blue-500 text-white rounded-lg hover:from-emerald-500 hover:to-blue-600 transition-all"
              onClick={handleWebhookSave}
            >
              Save Webhook
            </button>
            {webhookMsg && <div className="text-xs text-emerald-600 mt-2 font-medium">{webhookMsg}</div>}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};