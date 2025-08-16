import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, CheckCircle, AlertCircle, Clock, Cpu } from "lucide-react";

interface Agent {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'idle' | 'warning' | 'error';
  lastActivity: string;
  threatsBlocked: number;
  uptime: string;
}

const BACKEND_URL = "http://localhost:8080/agents";

export const AgentStatus = () => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchAgents = async () => {
      try {
        const res = await fetch(BACKEND_URL);
        if (!res.ok) throw new Error("Failed to fetch agents");
        const data = await res.json();
        if (isMounted && data.agents) {
          setAgents(
            Object.entries(data.agents).map(([id, a]: [string, any]) => ({
              id,
              name: id,
              type: a.agent_type,
              status: a.status || 'active',
              lastActivity: a.last_activity,
              threatsBlocked: a.threats_blocked,
              uptime: '99.9%'
            }))
          );
          setError(null);
        }
      } catch (err) {
        setError("Could not connect to MCPGuard backend. Showing demo data.");
        setAgents([]);
      }
    };
    fetchAgents();
    const interval = setInterval(fetchAgents, 5000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const getStatusColor = (status: Agent['status']) => {
    switch (status) {
      case 'active': return 'default';
      case 'idle': return 'secondary';
      case 'warning': return 'destructive';
      case 'error': return 'destructive';
      default: return 'outline';
    }
  };

  const getStatusIcon = (status: Agent['status']) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-3 w-3 text-green-500" />;
      case 'idle': return <Clock className="h-3 w-3 text-blue-500" />;
      case 'warning': return <AlertCircle className="h-3 w-3 text-orange-500" />;
      case 'error': return <AlertCircle className="h-3 w-3 text-red-500" />;
      default: return <Cpu className="h-3 w-3" />;
    }
  };

  const activeAgents = agents.filter(agent => agent.status === 'active').length;
  const totalThreats = agents.reduce((sum, agent) => sum + agent.threatsBlocked, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Bot className="h-5 w-5 mr-2" />
          Protected Agents
        </CardTitle>
        <CardDescription>
          {activeAgents} of {agents.length} agents active • {totalThreats} threats blocked
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="text-xs text-red-500 mb-2">{error}</div>
        )}
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {agents.map((agent) => (
              <div
                key={agent.id}
                className="p-4 rounded-lg border bg-card/50 hover:bg-card/80 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(agent.status)}
                    <div>
                      <p className="font-medium text-sm">{agent.name}</p>
                      <p className="text-xs text-muted-foreground">{agent.type}</p>
                    </div>
                  </div>
                  <Badge variant={getStatusColor(agent.status)} className="text-xs">
                    {agent.status.toUpperCase()}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <p className="text-muted-foreground">Last Activity</p>
                    <p className="font-medium">{agent.lastActivity}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Uptime</p>
                    <p className="font-medium">{agent.uptime}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-muted-foreground">Threats Blocked Today</p>
                    <div className="flex items-center space-x-2">
                      <p className="font-medium text-green-500">{agent.threatsBlocked}</p>
                      <div className="flex-1 h-1 bg-secondary rounded">
                        <div 
                          className="h-1 bg-green-500 rounded" 
                          style={{ width: `${Math.min((agent.threatsBlocked / 50) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};