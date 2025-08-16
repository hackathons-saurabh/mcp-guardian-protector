import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertTriangle, Shield, Clock, MapPin } from "lucide-react";

interface ThreatEvent {
  id?: string;
  timestamp: string;
  type: string;
  severity?: string;
  message?: string;
  source?: string;
  blocked?: boolean;
  prompt?: string;
}

const BACKEND_URL = "http://localhost:8080/events";
const PROXY_URL = "http://localhost:8080/proxy";

export const ThreatFeed = () => {
  const [threats, setThreats] = useState<ThreatEvent[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [simMsg, setSimMsg] = useState<string>("");

  useEffect(() => {
    let isMounted = true;
    const fetchThreats = async () => {
      try {
        const res = await fetch(BACKEND_URL);
        if (!res.ok) throw new Error("Failed to fetch events");
        const data = await res.json();
        if (isMounted && data.events) {
          // Map backend events to UI schema
          setThreats(
            data.events
              .slice()
              .reverse()
              .map((e: any, idx: number) => ({
                id: e.id || idx.toString(),
                timestamp: e.timestamp,
                type: e.type || (e.blocked ? "prompt_injection" : "call"),
                severity: e.blocked ? "high" : "low",
                message: e.prompt ? `Prompt: ${e.prompt}` : e.message || "",
                source: e.source || "proxy",
                blocked: e.blocked,
                prompt: e.prompt
              }))
          );
          setError(null);
        }
      } catch (err) {
        setError("Could not connect to MCPGuard backend. Showing demo data.");
      }
    };
    fetchThreats();
    const interval = setInterval(fetchThreats, 5000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const simulateAttack = async () => {
    setSimMsg("Simulating attack...");
    try {
      const res = await fetch(PROXY_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: "block: simulate attack" })
      });
      if (res.status === 403) {
        setSimMsg("Attack blocked by MCPGuard!");
      } else {
        setSimMsg("Attack allowed (unexpected)");
      }
    } catch (err) {
      setSimMsg("Simulation failed: backend not reachable");
    }
    setTimeout(() => setSimMsg(""), 3000);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "destructive";
      case "high": return "destructive";
      case "medium": return "secondary";
      case "low": return "outline";
      default: return "outline";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "prompt_injection": return "🎯";
      case "rate_limit": return "⚡";
      case "token_leak": return "🔑";
      case "supply_chain": return "🔗";
      case "threat": return "🚨";
      case "call": return "🤖";
      default: return "⚠️";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <AlertTriangle className="h-5 w-5 mr-2" />
          Live Threat Feed
        </CardTitle>
        <CardDescription>Real-time security events and threat intelligence</CardDescription>
      </CardHeader>
      <CardContent>
        <button
          className="mb-2 px-3 py-1 bg-destructive text-white rounded hover:bg-destructive/80"
          onClick={simulateAttack}
        >
          Simulate Attack
        </button>
        {simMsg && <div className="text-xs text-green-600 mb-2">{simMsg}</div>}
        {error && (
          <div className="text-xs text-red-500 mb-2">{error}</div>
        )}
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {threats.length === 0 ? (
              <div className="text-muted-foreground text-center">No events yet.</div>
            ) : (
              threats.map((threat) => (
                <div
                  key={threat.id}
                  className="p-4 rounded-lg border bg-card/50 hover:bg-card/80 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{getTypeIcon(threat.type)}</span>
                      <Badge variant={getSeverityColor(threat.severity || "low")}>{(threat.severity || "").toUpperCase()}</Badge>
                      <Badge variant={threat.blocked ? 'default' : 'destructive'}>
                        {threat.blocked ? 'BLOCKED' : 'ALLOWED'}
                      </Badge>
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      {threat.timestamp}
                    </div>
                  </div>
                  <p className="text-sm mb-2">{threat.message}</p>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span>{threat.source}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};