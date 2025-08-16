import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

interface RealtimeChartProps {
  data: Array<{
    time: string;
    threats: number;
    blocked: number;
    allowed: number;
  }>;
}

const chartConfig = {
  threats: {
    label: "Threats Detected",
    color: "hsl(var(--destructive))",
  },
  blocked: {
    label: "Threats Blocked",
    color: "hsl(var(--primary))",
  },
  allowed: {
    label: "Requests Allowed",
    color: "hsl(var(--chart-2))",
  },
};

export const RealtimeChart = ({ data }: RealtimeChartProps) => {
  return (
    <ChartContainer config={chartConfig} className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis 
            dataKey="time" 
            className="fill-muted-foreground text-xs"
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            className="fill-muted-foreground text-xs"
            tick={{ fontSize: 12 }}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend 
            wrapperStyle={{ fontSize: '12px' }}
            iconType="line"
          />
          <Line
            type="monotone"
            dataKey="threats"
            stroke="var(--color-threats)"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6, stroke: "var(--color-threats)", strokeWidth: 2 }}
          />
          <Line
            type="monotone"
            dataKey="blocked"
            stroke="var(--color-blocked)"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6, stroke: "var(--color-blocked)", strokeWidth: 2 }}
          />
          <Line
            type="monotone"
            dataKey="allowed"
            stroke="var(--color-allowed)"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6, stroke: "var(--color-allowed)", strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};