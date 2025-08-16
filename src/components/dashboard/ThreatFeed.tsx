import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertTriangle, Shield, Clock, MapPin } from "lucide-react";

interface ThreatEvent {
  id: string;
  timestamp: string;
  type: 'prompt_injection' | 'rate_limit' | 'token_leak' | 'supply_chain';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  source: string;
  blocked: boolean;
}

export const ThreatFeed = () => {
  const [threats, setThreats] = useState<ThreatEvent[]>([
    {
      id: '1',
      timestamp: '2 min ago',
      type: 'prompt_injection',
      severity: 'high',
      message: 'Detected prompt injection attempt: "Ignore previous instructions"',
      source: 'Agent-7 (OpenAI GPT-4)',
      blocked: true
    },
    {
      id: '2',
      timestamp: '5 min ago',
      type: 'rate_limit',
      severity: 'medium',
      message: 'Rate limit exceeded for API endpoint',
      source: 'Agent-3 (LangChain)',
      blocked: true
    },
    {
      id: '3',
      timestamp: '8 min ago',
      type: 'token_leak',
      severity: 'critical',
      message: 'Potential API key exposure in response',
      source: 'Agent-12 (Anthropic Claude)',
      blocked: true
    },
    {
      id: '4',
      timestamp: '12 min ago',
      type: 'supply_chain',
      severity: 'low',
      message: 'Unverified tool integration detected',
      source: 'Agent-5 (Custom)',
      blocked: false
    },
    {
      id: '5',
      timestamp: '15 min ago',
      type: 'prompt_injection',
      severity: 'high',
      message: 'SQL injection pattern detected in user input',
      source: 'Agent-9 (OpenAI GPT-3.5)',
      blocked: true
    }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const threatTypes: ThreatEvent['type'][] = ['prompt_injection', 'rate_limit', 'token_leak', 'supply_chain'];
      const severities: ThreatEvent['severity'][] = ['low', 'medium', 'high', 'critical'];
      const sources = ['Agent-1 (OpenAI)', 'Agent-2 (Anthropic)', 'Agent-3 (LangChain)', 'Agent-4 (Custom)'];
      
      const messages = {
        prompt_injection: [
          'Detected jailbreak attempt in user prompt',
          'Malicious system override detected',
          'Prompt manipulation pattern identified'
        ],
        rate_limit: [
          'API rate limit threshold exceeded',
          'Suspicious request frequency detected',
          'Token bucket limit reached'
        ],
        token_leak: [
          'Potential credential exposure prevented',
          'API key pattern detected in output',
          'Sensitive data redaction applied'
        ],
        supply_chain: [
          'Unverified plugin detected',
          'Suspicious tool integration attempt',
          'Third-party component validation failed'
        ]
      };

      if (Math.random() < 0.3) { // 30% chance to add new threat
        const type = threatTypes[Math.floor(Math.random() * threatTypes.length)];
        const severity = severities[Math.floor(Math.random() * severities.length)];
        const messageOptions = messages[type];
        
        const newThreat: ThreatEvent = {
          id: Date.now().toString(),
          timestamp: 'Just now',
          type,
          severity,
          message: messageOptions[Math.floor(Math.random() * messageOptions.length)],
          source: sources[Math.floor(Math.random() * sources.length)],
          blocked: Math.random() < 0.8 // 80% blocked
        };

        setThreats(prev => [newThreat, ...prev.slice(0, 9)]); // Keep last 10 threats
      }
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const getSeverityColor = (severity: ThreatEvent['severity']) => {
    switch (severity) {
      case 'critical': return 'destructive';
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  const getTypeIcon = (type: ThreatEvent['type']) => {
    switch (type) {
      case 'prompt_injection': return '🎯';
      case 'rate_limit': return '⚡';
      case 'token_leak': return '🔑';
      case 'supply_chain': return '🔗';
      default: return '⚠️';
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
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {threats.map((threat) => (
              <div
                key={threat.id}
                className="p-4 rounded-lg border bg-card/50 hover:bg-card/80 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{getTypeIcon(threat.type)}</span>
                    <Badge variant={getSeverityColor(threat.severity)}>
                      {threat.severity.toUpperCase()}
                    </Badge>
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
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};