import { useState } from "react";
import { 
  Bell, 
  ShieldAlert, 
  TrendingDown, 
  Truck, 
  Mail, 
  Smartphone,
  CheckCircle2,
  Settings,
  ChevronRight,
  MoreVertical,
  Activity,
  Zap
} from "lucide-react";
import data from "@/data/mockData.json";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function Alerts() {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [pushAlerts, setPushAlerts] = useState(false);

  const getAlertIcon = (title: string) => {
    if (title.includes("negative")) return <ShieldAlert className="w-5 h-5" />;
    if (title.includes("Rating")) return <TrendingDown className="w-5 h-5" />;
    if (title.includes("Shipping")) return <Truck className="w-5 h-5" />;
    return <Bell className="w-5 h-5" />;
  };

  const getSeverityStyles = (severity: string) => {
    switch (severity) {
      case "High": return "bg-rose-50 text-rose-600 border-rose-100";
      case "Medium": return "bg-amber-50 text-amber-600 border-amber-100";
      case "Low": return "bg-emerald-50 text-emerald-600 border-emerald-100";
      default: return "bg-slate-50 text-slate-600 border-slate-100";
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in duration-1000">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
            <Zap className="w-8 h-8 text-primary fill-primary" />
            Alerts & Risks
          </h1>
          <p className="text-slate-500 font-medium">Real-time anomaly detection and risk mitigation center.</p>
        </div>
        <div className="flex bg-white border border-slate-200 rounded-2xl p-1 shadow-sm">
          <button className="px-5 py-2 bg-slate-100 text-slate-900 rounded-xl text-sm font-bold shadow-sm">Active</button>
          <button className="px-5 py-2 text-slate-400 rounded-xl text-sm font-bold hover:bg-slate-50">Archived</button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Alerts List */}
        <div className="lg:col-span-2 space-y-4">
          {data.alerts.map((alert, index) => (
            <motion.div 
              key={alert.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-lg transition-all duration-500 flex gap-6 cursor-pointer group"
            >
              <div className={cn(
                "p-4 rounded-2xl h-fit transition-transform group-hover:scale-105 duration-500",
                getSeverityStyles(alert.severity)
              )}>
                {getAlertIcon(alert.title)}
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <span className={cn(
                    "px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border",
                    getSeverityStyles(alert.severity)
                  )}>
                    {alert.severity} Priority
                  </span>
                  <span className="text-[11px] text-slate-400 font-bold">{alert.time}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 leading-tight group-hover:text-primary transition-colors">{alert.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed italic line-clamp-2">
                  "{alert.description}"
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-50">
                  <button className="text-xs font-bold text-slate-900 hover:text-primary transition-colors flex items-center gap-1 uppercase tracking-wider">
                    View Details <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                  <div className="h-4 w-px bg-slate-100" />
                  <button className="text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors uppercase tracking-wider">Dismiss</button>
                </div>
              </div>
              <button className="p-2 text-slate-300 hover:bg-slate-50 rounded-xl self-start">
                <MoreVertical className="w-5 h-5" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Settings Sidebar */}
        <div className="space-y-8">
          <div className="bg-slate-900 p-8 rounded-[2rem] shadow-2xl shadow-slate-900/30 text-white">
            <h2 className="text-xl font-bold mb-8 flex items-center gap-3">
              <Settings className="w-6 h-6 text-primary" />
              Notification Center
            </h2>
            
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/10 rounded-2xl shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-sm">Email Alerts</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Daily digest & critical</p>
                  </div>
                </div>
                <button 
                  onClick={() => setEmailAlerts(!emailAlerts)}
                  className={cn(
                    "w-14 h-8 rounded-full transition-colors relative flex items-center px-1.5 shadow-inner",
                    emailAlerts ? "bg-primary shadow-[0_0_20px_rgba(132,204,22,0.4)] justify-end" : "bg-slate-700 justify-start"
                  )}
                >
                  <motion.div 
                    layout
                    transition={{ type: "spring", stiffness: 600, damping: 35 }}
                    className="w-5 h-5 bg-white rounded-full shadow-lg border border-white/10"
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/10 rounded-2xl shrink-0">
                    <Smartphone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-sm">Push Notifications</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Real-time mobile</p>
                  </div>
                </div>
                <button 
                  onClick={() => setPushAlerts(!pushAlerts)}
                  className={cn(
                    "w-14 h-8 rounded-full transition-colors relative flex items-center px-1.5 shadow-inner",
                    pushAlerts ? "bg-primary shadow-[0_0_20px_rgba(132,204,22,0.4)] justify-end" : "bg-slate-700 justify-start"
                  )}
                >
                  <motion.div 
                    layout
                    transition={{ type: "spring", stiffness: 600, damping: 35 }}
                    className="w-5 h-5 bg-white rounded-full shadow-lg border border-white/10"
                  />
                </button>
              </div>
            </div>

            <div className="mt-12 p-6 bg-white/5 rounded-2xl border border-white/10 space-y-4">
              <div className="flex items-center gap-3">
                <Activity className="w-4 h-4 text-emerald-400" />
                <p className="text-xs font-bold text-slate-300">System Integrity: 100%</p>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <p className="text-xs font-bold text-slate-300">Monitoring 14 ecommerce nodes</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden relative group cursor-pointer">
            <h3 className="text-lg font-bold text-slate-900 mb-2">Upgrade Alerts</h3>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">Unlock predictive risk modeling and automated SMS escalations.</p>
            <div className="mt-8 flex items-baseline gap-1">
              <span className="text-3xl font-black text-slate-900">$29</span>
              <span className="text-sm font-bold text-slate-400 italic">/month</span>
            </div>
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-primary/20 rounded-full blur-3xl group-hover:scale-150 transition-all duration-700" />
          </div>
        </div>
      </div>
    </div>
  );
}
