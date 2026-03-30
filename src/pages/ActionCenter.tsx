import { useState } from "react";
import { 
  Reply, 
  CheckCircle, 
  Flag, 
  MoreHorizontal,
  Send,
  X,
  Clock,
  LayoutGrid,
  List
} from "lucide-react";
import data from "@/data/mockData.json";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";



export function ActionCenter() {
  const [view, setView] = useState<"list" | "grid">("list");
  const [selectedReview, setSelectedReview] = useState<any | null>(null);
  const [replyText, setReplyText] = useState("");

  const actionableReviews = data.reviews.filter(r => r.sentiment === "Negative" || r.rating <= 2);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="flex h-3 w-3 rounded-full bg-rose-500 animate-pulse" />
            <h1 className="text-2xl font-bold text-slate-900">Action Center</h1>
          </div>
          <p className="text-slate-500 text-sm">Resolve high-priority customer issues and flagging risks.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="bg-white border border-slate-200 rounded-xl p-1 flex">
            <button 
              onClick={() => setView("list")}
              className={cn("p-2 rounded-lg transition-all", view === "list" ? "bg-slate-100 text-slate-900 shadow-sm" : "text-slate-400 hover:text-slate-600")}
            >
              <List className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setView("grid")}
              className={cn("p-2 rounded-lg transition-all", view === "grid" ? "bg-slate-100 text-slate-900 shadow-sm" : "text-slate-400 hover:text-slate-600")}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
          <button className="bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-slate-900/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
            Assign Batch
          </button>
        </div>
      </header>

      {/* Task Filter Bar */}
      <div className="flex overflow-x-auto pb-2 gap-4 border-b border-slate-200">
        {["All Tasks", "Assigned to Me", "Unassigned", "Priority"].map((filter) => (
          <button key={filter} className={cn(
            "px-4 py-2 text-sm font-bold whitespace-nowrap rounded-lg transition-colors border border-transparent",
            filter === "All Tasks" ? "bg-primary/10 text-primary border-primary/20" : "text-slate-500 hover:bg-slate-50"
          )}>
            {filter}
          </button>
        ))}
      </div>

      {/* List / Grid View */}
      <div className={cn(
        "grid gap-6",
        view === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
      )}>
        {actionableReviews.map((review, index) => (
          <motion.div 
            key={review.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={cn(
              "bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow group relative",
              view === "list" ? "flex flex-col md:flex-row gap-6 items-start md:items-center" : "flex flex-col gap-5"
            )}
          >
            <div className="flex flex-col gap-3 flex-1 min-w-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-100">
                  <Flag className="w-4 h-4 fill-rose-600" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-slate-900 text-sm truncate">{review.userName}</h3>
                  <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">{review.platform}</p>
                </div>
                <div className="ml-auto md:ml-0 px-2 py-0.5 rounded-full bg-amber-50 text-amber-600 border border-amber-100 text-[10px] font-bold">
                  Pending
                </div>
              </div>
              
              <div className="space-y-1">
                <p className="text-xs font-bold text-primary truncate uppercase tracking-tighter">{review.productName}</p>
                <p className="text-sm text-slate-600 line-clamp-2 italic leading-relaxed">
                  "{review.content}"
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs text-slate-400">
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {review.date}</span>
                <span className="flex items-center gap-1 font-bold text-rose-500 uppercase tracking-tighter">High Severity</span>
              </div>
            </div>

            <div className={cn(
              "flex items-center gap-2 w-full md:w-auto shrink-0",
              view === "list" ? "justify-end" : "justify-between pt-4 border-t border-slate-50"
            )}>
              <button 
                onClick={() => setSelectedReview(review)}
                className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-50 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-100 transition-colors"
                title="Reply"
              >
                <Reply className="w-3.5 h-3.5" />
                Reply
              </button>
              <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-emerald-200 text-emerald-600 rounded-xl text-xs font-bold hover:bg-emerald-50 transition-colors">
                <CheckCircle className="w-3.5 h-3.5" />
                Resolve
              </button>
              <button className="p-2.5 text-slate-400 hover:bg-slate-50 rounded-xl">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Reply Modal */}
      <AnimatePresence>
        {selectedReview && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedReview(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              layoutId="modal"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden shadow-slate-900/40"
            >
              <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-primary/5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-bold shadow-lg shadow-primary/20">
                    {selectedReview.userName.charAt(0)}
                  </div>
                  <div>
                    <h2 className="font-bold text-slate-900 leading-none">Reply to {selectedReview.userName}</h2>
                    <p className="text-xs text-slate-500 mt-1.5 uppercase tracking-wide font-bold">Via {selectedReview.platform}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedReview(null)} className="p-2 hover:bg-white rounded-xl transition-colors shadow-sm border border-slate-200">
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              <div className="p-8 space-y-6">
                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 relative">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Customer's Review</p>
                  <p className="text-sm text-slate-600 leading-relaxed italic">"{selectedReview.content}"</p>
                  <div className="absolute -bottom-2 -right-2 p-1.5 bg-rose-50 text-rose-500 rounded-lg border border-rose-100">
                    <Flag className="w-3.5 h-3.5 fill-rose-500" />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                    <Send className="w-4 h-4 text-primary" />
                    Your Response
                  </label>
                  <textarea 
                    autoFocus
                    placeholder="Type your reply here..."
                    className="w-full h-40 bg-white border border-slate-200 rounded-2xl p-5 text-sm focus:ring-4 focus:ring-primary/10 transition-all outline-none resize-none shadow-inner"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                  />
                  <div className="flex items-center gap-2">
                    <button className="px-3 py-1.5 bg-slate-50 text-slate-500 rounded-lg text-xs font-bold border border-slate-200 hover:bg-slate-100">AI Reword</button>
                    <button className="px-3 py-1.5 bg-slate-50 text-slate-500 rounded-lg text-xs font-bold border border-slate-200 hover:bg-slate-100">Insert Template</button>
                  </div>
                </div>
              </div>

              <div className="p-8 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
                <p className="text-[11px] text-slate-400 font-medium">Replying will mark this as **In Progress** automatically.</p>
                <div className="flex gap-4">
                  <button onClick={() => setSelectedReview(null)} className="px-5 py-2.5 text-sm font-bold text-slate-500 hover:text-slate-700 transition-colors">Cancel</button>
                  <button className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold shadow-lg shadow-slate-900/20 hover:scale-105 active:scale-95 transition-all">Send Reply</button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
