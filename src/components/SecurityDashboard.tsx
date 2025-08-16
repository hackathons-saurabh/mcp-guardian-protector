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

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Top Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-primary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Protected Agents</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalAgents}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">+2</span> since last hour
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-destructive">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Threats</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{stats.activeThreats}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-500">High priority</span> incidents
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Blocked Attacks</CardTitle>
            <Shield className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">{stats.blockedAttacks}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">+15</span> in last 24h
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Uptime</CardTitle>
            <Activity className="h-4 w-4 text-blue-500" />
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
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Real-time Security Activity
              </CardTitle>
              <CardDescription>Live monitoring of threats and protections</CardDescription>
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
    </div>
  );
};