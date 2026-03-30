import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement, 
  ArcElement, 
  Tooltip, 
  Legend, 
  RadialLinearScale,
  Filler
} from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';
import data from "@/data/mockData.json";
import { 
  Star, 
  Award, 
  AlertCircle,
  Users,
  CheckCircle2,
  ChevronUp
} from "lucide-react";
import { cn } from "@/lib/utils";

ChartJS.register(
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement, 
  ArcElement, 
  Tooltip, 
  Legend,
  RadialLinearScale,
  Filler
);

export function SmartInsights() {
  const topProducts = data.topProducts;
  const bottomProducts = data.bottomProducts;

  const kpis = [
    { label: "Overall CSR", value: "88%", icon: Users, color: "text-emerald-500", bg: "bg-emerald-50", description: "Customer Satisfaction Rate" },
    { label: "NPS Score", value: "72", icon: Star, color: "text-amber-500", bg: "bg-amber-50", description: "Net Promoter Score" },
    { label: "Top Product", value: "UltraPro Headphones", icon: Award, color: "text-primary", bg: "bg-primary/10", description: "98% Positive Sentiment" },
    { label: "Critical Risk", value: "PowerBank Solar", icon: AlertCircle, color: "text-rose-500", bg: "bg-rose-50", description: "15% Positive Sentiment" },
  ];

  const lineData = {
    labels: data.sentimentTimeline.map(t => t.date),
    datasets: [{
      label: 'Total Reviews',
      data: data.sentimentTimeline.map(t => t.positive + t.neutral + t.negative),
      borderColor: '#84cc16',
      backgroundColor: 'rgba(132, 204, 22, 0.1)',
      fill: true,
      tension: 0.4,
    }]
  };

  const productBarData = {
    labels: [...topProducts, ...bottomProducts].slice(0, 6).map(p => p.name),
    datasets: [{
      label: 'Rating',
      data: [...topProducts, ...bottomProducts].slice(0, 6).map(p => p.rating),
      backgroundColor: [...topProducts, ...bottomProducts].slice(0, 6).map(p => p.rating >= 4 ? '#10b981' : '#f43f5e'),
      borderRadius: 6,
    }]
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-1000 pb-12">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Executive Dashboard</h1>
          <p className="text-slate-500 font-medium">Strategic insights derived from your customer feedback ecosystem.</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-1.5 flex shadow-sm">
          <button className="px-5 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold shadow-md shadow-slate-900/10">30D</button>
          <button className="px-5 py-2 text-slate-500 rounded-xl text-sm font-bold hover:bg-slate-50">90D</button>
          <button className="px-5 py-2 text-slate-500 rounded-xl text-sm font-bold hover:bg-slate-50">1Y</button>
        </div>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500">
            <div className="flex items-center gap-4">
              <div className={cn("p-4 rounded-2xl transition-transform group-hover:scale-110 duration-500", kpi.bg, kpi.color)}>
                <kpi.icon className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none">{kpi.label}</p>
                <p className="text-2xl font-black text-slate-900 leading-none">{kpi.value}</p>
              </div>
            </div>
            <div className="mt-5 flex items-center justify-between">
              <p className="text-xs text-slate-400 font-medium">{kpi.description}</p>
              <ChevronUp className="w-4 h-4 text-emerald-500" />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
        {/* Main Chart Section */}
        <div className="xl:col-span-3 space-y-8">
          <div className="bg-white p-10 rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-xl font-bold text-slate-900">Review Acquisition Trend</h2>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Volume</span>
                </div>
              </div>
            </div>
            <div className="h-[350px]">
              <Line 
                data={lineData} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { display: false } },
                  scales: { y: { display: false }, x: { grid: { display: false } } }
                }} 
              />
            </div>
          </div>

          <div className="bg-white p-10 rounded-3xl border border-slate-200 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-10">Product Rating Comparison</h2>
            <div className="h-[300px]">
              <Bar 
                data={productBarData} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { display: false } },
                  scales: { 
                    y: { max: 5, grid: { color: '#f8fafc' } },
                    x: { grid: { display: false } }
                  }
                }} 
              />
            </div>
          </div>
        </div>

        {/* Sidebar Insights */}
        <div className="xl:col-span-2 space-y-8">
          <div className="bg-slate-900 text-white p-10 rounded-3xl shadow-2xl shadow-slate-900/30">
            <h2 className="text-xl font-bold mb-8">AI Strategy Recommendations</h2>
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="bg-white/10 p-2.5 rounded-xl self-start">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-bold text-sm">Improve Packaging Focus</p>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    AI detected a 12% increase in fragile item damage. Recommend switching to double-layered boxes for UltraPro series.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-white/10 p-2.5 rounded-xl self-start">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-bold text-sm">NPS Growth Opportunity</p>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    Customer delight is peaking in the "Battery Life" mentions. Use this in your next Amazon US campaign.
                  </p>
                </div>
              </div>
            </div>
            <button className="w-full mt-12 py-4 bg-primary text-slate-900 font-black rounded-2xl text-sm hover:bg-primary/90 transition-all uppercase tracking-widest">
              Unlock Full Report
            </button>
          </div>

          <div className="bg-white p-10 rounded-3xl border border-slate-200 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-8">Sentiment per Segment</h2>
            <div className="h-[250px] flex items-center justify-center">
              <Pie 
                data={{
                  labels: ['Tech', 'Home', 'Lifestyle'],
                  datasets: [{
                    data: [65, 20, 15],
                    backgroundColor: ['#84cc16', '#3b82f6', '#f43f5e'],
                    borderWidth: 0,
                  }]
                }}
                options={{ maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
