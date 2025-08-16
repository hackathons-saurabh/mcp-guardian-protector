import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BarChart3, TrendingUp, Shield, Zap } from "lucide-react";

export const SecurityMetrics = () => {
  const metrics = [
    {
      name: "Prompt Injection Detection",
      value: 97.8,
      trend: "+2.3%",
      status: "excellent"
    },
    {
      name: "Token Leak Prevention",
      value: 99.9,
      trend: "+0.1%",
      status: "excellent"
    },
    {
      name: "Rate Limit Enforcement",
      value: 95.2,
      trend: "-1.2%",
      status: "good"
    },
    {
      name: "Supply Chain Security",
      value: 88.7,
      trend: "+5.4%",
      status: "warning"
    }
  ];

  const safeCategories = [
    { name: "Input Validation", techniques: 12, coverage: 95 },
    { name: "Output Sanitization", techniques: 8, coverage: 98 },
    { name: "Token Management", techniques: 15, coverage: 92 },
    { name: "Supply Chain", techniques: 21, coverage: 87 },
    { name: "Monitoring", techniques: 18, coverage: 96 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-emerald-500';
      case 'good': return 'text-blue-500';
      case 'warning': return 'text-orange-400';
      default: return 'text-slate-600';
    }
  };

  const getTrendColor = (trend: string) => {
    return trend.startsWith('+') ? 'text-green-500' : 'text-red-500';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <BarChart3 className="h-5 w-5 mr-2" />
          Security Metrics
        </CardTitle>
        <CardDescription>Performance indicators and SAFE-MCP coverage</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Performance Metrics */}
        <div className="space-y-4">
          <h4 className="font-semibold text-sm">Detection Performance</h4>
          {metrics.map((metric, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>{metric.name}</span>
                <div className="flex items-center space-x-2">
                  <span className={getStatusColor(metric.status)}>{metric.value}%</span>
                  <span className={getTrendColor(metric.trend)}>{metric.trend}</span>
                </div>
              </div>
              <Progress value={metric.value} className="h-2" />
            </div>
          ))}
        </div>

        {/* SAFE-MCP Coverage */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Shield className="h-4 w-4" />
            <h4 className="font-semibold text-sm">SAFE-MCP Coverage</h4>
          </div>
          <div className="space-y-3">
            {safeCategories.map((category, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg border bg-card/30">
                <div>
                  <p className="font-medium text-sm">{category.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {category.techniques} techniques implemented
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold">{category.coverage}%</div>
                  <Progress value={category.coverage} className="w-16 h-1 mt-1" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Compliance Status */}
        <div className="p-4 rounded-lg bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 border">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Zap className="h-4 w-4 text-green-500" />
              <span className="font-semibold text-sm">Overall Compliance</span>
            </div>
            <Badge variant="default" className="bg-green-500">94.2%</Badge>
          </div>
          <p className="text-xs text-muted-foreground">
            Fully compliant with SAFE-MCP standards. 76 of 81 techniques implemented.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};