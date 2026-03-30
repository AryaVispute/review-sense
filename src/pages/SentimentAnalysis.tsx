import { 
  Chart as ChartJS, 
  ArcElement, 
  Tooltip, 
  Legend, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  PointElement, 
  LineElement, 
  Title,
  Filler
} from 'chart.js';
import { Pie, Bar, Line } from 'react-chartjs-2';
import data from "@/data/mockData.json";
import { TrendingUp, TrendingDown, Info } from "lucide-react";
import { cn } from "@/lib/utils";

// Register ChartJS
ChartJS.register(
  ArcElement, 
  Tooltip, 
  Legend, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  PointElement, 
  LineElement, 
  Title,
  Filler
);

export function SentimentAnalysis() {
  const { positive, neutral, negative } = data.sentimentDistribution;
  const total = positive + neutral + negative;

  const kpis = [
    { label: "Total Reviews", value: total.toLocaleString(), change: "+12%", trend: "up", color: "text-foreground" },
    { label: "Positive", value: `${Math.round((positive / total) * 100)}%`, change: "+4%", trend: "up", color: "text-emerald-500" },
    { label: "Neutral", value: `${Math.round((neutral / total) * 100)}%`, change: "-1%", trend: "down", color: "text-muted-foreground" },
    { label: "Negative", value: `${Math.round((negative / total) * 100)}%`, change: "+2%", trend: "down", color: "text-rose-500" },
  ];

  // Pie Chart Data
  const pieData = {
    labels: ['Positive', 'Neutral', 'Negative'],
    datasets: [{
      data: [positive, neutral, negative],
      backgroundColor: ['#10b981', '#94a3b8', '#f43f5e'],
      borderColor: ['#fff', '#fff', '#fff'],
      borderWidth: 4,
      hoverOffset: 10
    }]
  };

  // Bar Chart Data
  const barData = {
    labels: data.sentimentPerPlatform.map(p => p.platform),
    datasets: [
      {
        label: 'Positive',
        data: data.sentimentPerPlatform.map(p => p.positive),
        backgroundColor: '#10b981',
        borderRadius: 6,
      },
      {
        label: 'Neutral',
        data: data.sentimentPerPlatform.map(p => p.neutral),
        backgroundColor: '#94a3b8',
        borderRadius: 6,
      },
      {
        label: 'Negative',
        data: data.sentimentPerPlatform.map(p => p.negative),
        backgroundColor: '#f43f5e',
        borderRadius: 6,
      }
    ]
  };

  // Line Chart Data
  const lineData = {
    labels: data.sentimentTimeline.map(t => t.date),
    datasets: [
      {
        label: 'Positive Sentiment',
        data: data.sentimentTimeline.map(t => t.positive),
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        label: 'Negative Sentiment',
        data: data.sentimentTimeline.map(t => t.negative),
        borderColor: '#f43f5e',
        backgroundColor: 'rgba(244, 63, 94, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
      }
    ]
  };

  const commonOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          padding: 20,
          color: '#94a3b8',
          font: { size: 12 }
        }
      },
      tooltip: {
        padding: 12,
        backgroundColor: '#1e293b',
        titleFont: { size: 14 },
        bodyFont: { size: 13 },
        cornerRadius: 8,
      }
    },
    scales: {
      y: { 
        beginAtZero: true, 
        grid: { color: 'rgba(148, 163, 184, 0.1)' }, 
        ticks: { color: '#94a3b8', font: { size: 11 } } 
      },
      x: { 
        grid: { display: false }, 
        ticks: { color: '#94a3b8', font: { size: 11 } } 
      }
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Sentiment Analysis</h1>
          <p className="text-muted-foreground text-sm">Real-time classification of customer emotions using AI.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-card border border-border rounded-xl text-sm font-semibold text-muted-foreground hover:bg-accent shadow-sm transition-all">
            Export Report
          </button>
          <button className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-semibold shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all">
            Refresh Data
          </button>
        </div>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="bg-card p-6 rounded-2xl border border-border shadow-sm transition-colors">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{kpi.label}</p>
            <div className="mt-2 flex items-baseline justify-between">
              <h2 className={cn("text-2xl font-bold", kpi.color)}>{kpi.value}</h2>
              <div className={cn(
                "flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full",
                kpi.trend === "up" ? "bg-emerald-500/10 text-emerald-500" : "bg-rose-500/10 text-rose-500"
              )}>
                {kpi.trend === "up" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {kpi.change}
              </div>
            </div>
            <p className="text-[10px] text-muted-foreground mt-2 flex items-center gap-1">
              <Info className="w-3 h-3" /> vs previous month
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sentiment Distribution Pie */}
        <div className="bg-card p-8 rounded-2xl border border-border shadow-sm flex flex-col h-[450px] transition-colors">
          <h3 className="text-lg font-bold text-foreground mb-6">Overall Distribution</h3>
          <div className="flex-1 relative">
            <Pie data={pieData} options={{ ...commonOptions, cutout: '65%' } as any} />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none pb-8">
              <div className="text-center">
                <p className="text-3xl font-bold text-foreground">{total}</p>
                <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest mt-1">Total</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sentiment Per Platform Bar */}
        <div className="bg-card p-8 rounded-2xl border border-border shadow-sm flex flex-col h-[450px] transition-colors">
          <h3 className="text-lg font-bold text-foreground mb-6">Per-Platform Insights</h3>
          <div className="flex-1">
            <Bar 
              data={barData} 
              options={{
                ...commonOptions,
                plugins: { ...commonOptions.plugins, legend: { ...commonOptions.plugins.legend, position: 'top' as const } },
                scales: { 
                  x: { stacked: true, grid: { display: false }, ticks: { color: '#94a3b8' } },
                  y: { stacked: true, grid: { color: 'rgba(148, 163, 184, 0.1)' }, ticks: { color: '#94a3b8' } }
                }
              } as any} 
            />
          </div>
        </div>

        {/* Timeline Line Chart */}
        <div className="bg-card p-8 rounded-2xl border border-border shadow-sm col-span-full h-[400px] transition-colors">
          <h3 className="text-lg font-bold text-foreground mb-6">Sentiment Trends (Last 3 Months)</h3>
          <div className="h-full pb-8">
            <Line data={lineData} options={commonOptions as any} />
          </div>
        </div>
      </div>
    </div>
  );
}
