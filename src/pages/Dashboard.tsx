import { 
  TrendingUp, 
  Users, 
  Star, 
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  MessageSquare,
  BarChart3,
  CheckCircle2
} from "lucide-react";
import data from "@/data/mockData.json";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement, 
  Tooltip, 
  Legend, 
  Filler
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement, 
  Tooltip, 
  Legend, 
  Filler
);

export function Dashboard() {
  const { stats, alerts } = data;

  const cards = [
    { label: "Average Rating", value: stats.avgRating, change: stats.trends.rating, icon: Star, color: "text-amber-500", bg: "bg-amber-50" },
    { label: "Total Reviews", value: stats.totalReviews.toLocaleString(), change: stats.trends.reviews, icon: Users, color: "text-blue-500", bg: "bg-blue-50" },
    { label: "Sentiment Score", value: `${stats.sentimentScore}%`, change: stats.trends.sentiment, icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-50" },
    { label: "Detected Issues", value: stats.pendingIssues, change: stats.trends.issues, icon: AlertCircle, color: "text-rose-500", bg: "bg-rose-50" },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">System Overview</h1>
        <div className="flex items-center gap-2 text-slate-500">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <p className="text-sm font-medium">Tracking 1,284 reviews across 6 major platforms.</p>
        </div>
      </header>

      {/* Main KPI Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            key={card.label} 
            className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500 group"
          >
            <div className="flex items-center justify-between mb-6">
              <div className={cn("p-4 rounded-2xl transition-transform group-hover:scale-110", card.bg, card.color)}>
                <card.icon className="w-6 h-6" />
              </div>
              <div className={cn(
                "flex items-center gap-0.5 text-xs font-bold px-2.5 py-1 rounded-full",
                card.change.startsWith('+') ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
              )}>
                {card.change}
                {card.change.startsWith('+') ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{card.label}</p>
              <h2 className="text-3xl font-black text-slate-900">{card.value}</h2>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sentiment Overview Chart */}
        <div className="lg:col-span-2 bg-white rounded-[2rem] border border-slate-200 p-10 shadow-sm">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-xl font-bold text-slate-900">Sentiment Distribution</h3>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Positive</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500" />
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Negative</span>
              </div>
            </div>
          </div>
          <div className="h-[300px]">
             <Bar 
               data={{
                 labels: ['Jan', 'Feb', 'Mar'],
                 datasets: [
                    { label: 'Positive', data: [720, 780, 842], backgroundColor: '#84cc16', borderRadius: 8 },
                    { label: 'Negative', data: [150, 170, 186], backgroundColor: '#f43f5e', borderRadius: 8 }
                 ]
               }}
               options={{
                 responsive: true,
                 maintainAspectRatio: false,
                 plugins: { legend: { display: false } },
                 scales: { y: { grid: { color: '#f8fafc' } }, x: { grid: { display: false } } }
               }}
             />
          </div>
        </div>

        {/* Real-time Alerts Feed */}
        <div className="bg-slate-900 rounded-[2rem] p-10 text-white shadow-2xl shadow-slate-900/30">
          <h3 className="text-xl font-bold mb-8 flex items-center justify-between">
            Live Risks
            <span className="flex h-2 w-2 rounded-full bg-rose-500 animate-ping" />
          </h3>
          <div className="space-y-8">
            {alerts.slice(0, 3).map((alert) => (
              <div key={alert.id} className="group cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className={cn(
                    "p-2 rounded-lg shrink-0",
                    alert.severity === 'High' ? "bg-rose-500/20 text-rose-500" : "bg-amber-500/20 text-amber-500"
                  )}>
                    <AlertCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm group-hover:text-primary transition-colors line-clamp-1">{alert.title}</h4>
                    <p className="text-xs text-slate-400 mt-1">{alert.time} • {alert.source}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-10 py-4 bg-white/5 border border-white/10 text-white rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-all">
            Open Control Center
          </button>
        </div>
      </div>

      {/* Secondary Bottom Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm flex items-center gap-6 group hover:border-primary transition-colors cursor-pointer">
          <div className="p-4 bg-primary/10 text-primary rounded-2xl group-hover:scale-110 transition-transform">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900">Total Inbox</h4>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">128 Unread</p>
          </div>
        </div>
        
        <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm flex items-center gap-6 group hover:border-emerald-500 transition-colors cursor-pointer">
          <div className="p-4 bg-emerald-50 text-emerald-500 rounded-2xl group-hover:scale-110 transition-transform">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900">Resolved Today</h4>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">42 Tickets</p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm flex items-center gap-6 group hover:border-amber-500 transition-colors cursor-pointer">
          <div className="p-4 bg-amber-50 text-amber-500 rounded-2xl group-hover:scale-110 transition-transform">
            <BarChart3 className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900">System Accuracy</h4>
            <div className="flex items-center gap-2 mt-1">
              <div className="h-1.5 w-16 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full w-[94%] bg-amber-500" />
              </div>
              <span className="text-[10px] font-black text-slate-400">94.8%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
