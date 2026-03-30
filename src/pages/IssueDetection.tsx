import { useState } from "react";
import { 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown, 
  ChevronRight,
  Search,
  Zap,
  ShieldAlert,
  Clock,
  Package,
  Bug
} from "lucide-react";
import data from "@/data/mockData.json";
import { cn } from "@/lib/utils";
import { Bar } from 'react-chartjs-2';
import { motion, AnimatePresence } from "framer-motion";

export function IssueDetection() {
  const [selectedIssueId, setSelectedIssueId] = useState<string | null>(data.issues[0].id);

  const selectedIssue = data.issues.find(i => i.id === selectedIssueId);

  const barData = {
    labels: data.issues.map(i => i.type),
    datasets: [{
      label: 'Mentions',
      data: data.issues.map(i => i.count),
      backgroundColor: data.issues.map(i => 
        i.severity === 'High' ? '#ef4444' : i.severity === 'Medium' ? '#f59e0b' : '#3b82f6'
      ),
      borderRadius: 8,
      barThickness: 32,
    }]
  };

  const getIcon = (type: string) => {
    if (type.includes("Product")) return <ShieldAlert className="w-5 h-5" />;
    if (type.includes("Delivery")) return <Clock className="w-5 h-5" />;
    if (type.includes("App")) return <Bug className="w-5 h-5" />;
    if (type.includes("Packaging")) return <Package className="w-5 h-5" />;
    return <AlertTriangle className="w-5 h-5" />;
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-rose-50 rounded-xl text-rose-600">
            <Zap className="w-6 h-6 fill-rose-600" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Issue Detection</h1>
        </div>
        <p className="text-slate-500 max-w-2xl">
          Our AI automatically groups negative feedback into actionable issue categories to help you prioritize fixes.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Issue Cards */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.issues.map((issue) => (
              <button 
                key={issue.id}
                onClick={() => setSelectedIssueId(issue.id)}
                className={cn(
                  "p-6 rounded-2xl border text-left transition-all duration-300 group relative overflow-hidden",
                  selectedIssueId === issue.id 
                    ? "bg-white border-primary shadow-lg ring-1 ring-primary/20" 
                    : "bg-white border-slate-200 hover:border-slate-300 shadow-sm"
                )}
              >
                <div className="flex items-start justify-between">
                  <div className={cn(
                    "p-3 rounded-xl mb-4 transition-colors",
                    issue.severity === 'High' ? "bg-rose-50 text-rose-600" : issue.severity === 'Medium' ? "bg-amber-50 text-amber-600" : "bg-blue-50 text-blue-600"
                  )}>
                    {getIcon(issue.type)}
                  </div>
                  <div className={cn(
                    "flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full",
                    issue.trend.startsWith('+') ? "bg-rose-50 text-rose-600" : "bg-emerald-50 text-emerald-600"
                  )}>
                    {issue.trend.startsWith('+') ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {issue.trend}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-slate-900">{issue.type}</h3>
                <p className="text-sm text-slate-500 mt-2 line-clamp-2">{issue.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-2xl font-black text-slate-900">{issue.count} <span className="text-sm font-medium text-slate-400">mentions</span></p>
                  <ChevronRight className={cn(
                    "w-5 h-5 transition-transform duration-300",
                    selectedIssueId === issue.id ? "translate-x-1 text-primary" : "text-slate-300"
                  )} />
                </div>
                
                {selectedIssueId === issue.id && (
                  <div className="absolute top-0 right-0 p-2">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Issue Breakdown Chart */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Volume per Category</h3>
            <div className="h-[250px]">
              <Bar 
                data={barData} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { display: false } },
                  scales: { 
                    y: { beginAtZero: true, grid: { color: '#f1f5f9' } },
                    x: { grid: { display: false } }
                  }
                }} 
              />
            </div>
          </div>
        </div>

        {/* Right Column: Sidebar Insights */}
        <div className="space-y-8">
          {/* Keyword Cloud */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Search className="w-5 h-5 text-slate-400" />
              Impactful Keywords
            </h3>
            <div className="flex flex-wrap gap-2">
              {data.issues.flatMap(i => i.keywords).map((keyword, i) => (
                <span 
                  key={keyword + i}
                  className="px-4 py-2 bg-slate-50 text-slate-600 rounded-full text-xs font-semibold border border-slate-100 hover:border-primary/20 hover:text-primary transition-all cursor-pointer"
                >
                   {keyword}
                </span>
              ))}
            </div>
          </div>

          {/* Detail View for selected issue */}
          <AnimatePresence mode="wait">
            {selectedIssue && (
              <motion.div 
                key={selectedIssue.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-primary/5 p-8 rounded-2xl border border-primary/10"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <p className="text-xs font-bold uppercase tracking-wider text-primary">Contextual Insights</p>
                </div>
                <h4 className="text-xl font-bold text-slate-900">{selectedIssue.type} Details</h4>
                <p className="text-sm text-slate-600 mt-4 leading-relaxed italic">
                  "Most customers are complaining about this issue specifically on **{selectedIssue.type.includes('Delivery') ? 'Amazon US & UK' : 'all platforms'}**. The sentiment drop is significant in the last 7 days."
                </p>
                
                <div className="mt-8 space-y-4">
                  <div className="p-4 bg-white rounded-xl border border-primary/10 shadow-sm italic text-xs text-slate-500">
                    "The solar panel doesn't work at all. Left it in the sun for 10 hours and it didn't charge..."
                  </div>
                  <div className="p-4 bg-white rounded-xl border border-primary/10 shadow-sm italic text-xs text-slate-500">
                    "Loose plastic bits and non-functional solar panels reported by customers..."
                  </div>
                </div>

                <button className="w-full mt-8 py-3 bg-primary text-white font-bold rounded-xl text-sm shadow-md hover:shadow-lg transition-shadow">
                  View Full Report
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
