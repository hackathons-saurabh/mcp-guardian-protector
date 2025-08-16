import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const BACKEND_URL = "http://localhost:8080/events";

export const RealtimeChart = () => {
  const [chartData, setChartData] = useState<any>({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(BACKEND_URL);
        if (!res.ok) throw new Error("Failed to fetch events");
        const data = await res.json();
        if (data.events) {
          // Aggregate events by minute
          const buckets: Record<string, { threats: number; blocked: number; allowed: number }> = {};
          data.events.forEach((e: any) => {
            const t = e.timestamp ? e.timestamp.slice(0, 16) : "unknown"; // YYYY-MM-DDTHH:MM
            if (!buckets[t]) buckets[t] = { threats: 0, blocked: 0, allowed: 0 };
            if (e.blocked) {
              buckets[t].blocked += 1;
              buckets[t].threats += 1;
            } else {
              buckets[t].allowed += 1;
            }
          });
          const labels = Object.keys(buckets).sort();
          setChartData({
            labels,
            datasets: [
              {
                label: "Threats",
                data: labels.map(l => buckets[l].threats),
                borderColor: "#ef4444",
                backgroundColor: "#fee2e2",
                tension: 0.4
              },
              {
                label: "Blocked",
                data: labels.map(l => buckets[l].blocked),
                borderColor: "#22c55e",
                backgroundColor: "#bbf7d0",
                tension: 0.4
              },
              {
                label: "Allowed",
                data: labels.map(l => buckets[l].allowed),
                borderColor: "#3b82f6",
                backgroundColor: "#dbeafe",
                tension: 0.4
              }
            ]
          });
        }
      } catch {
        setChartData({ labels: [], datasets: [] });
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-64">
      <Line
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: { position: "top" as const },
            title: { display: false, text: "Real-time Security Activity" }
          },
          scales: {
            x: { title: { display: true, text: "Time (minute)" } },
            y: { title: { display: true, text: "Count" }, beginAtZero: true }
          }
        }}
      />
    </div>
  );
};