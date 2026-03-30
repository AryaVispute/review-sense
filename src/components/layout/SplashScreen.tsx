import { motion } from "framer-motion";
import "@/styles/splash.css";
import { Zap } from "lucide-react";

interface SplashScreenProps {
  onEnter: () => void;
}

export function SplashScreen({ onEnter }: SplashScreenProps) {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col md:flex-row bg-white overflow-hidden select-none">
      {/* Centered Soft Green Merged Circle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Left Column: Brand & Messaging (Glassmorphism) */}
      <motion.div 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative flex-1 flex flex-col justify-center px-12 md:px-24 z-10 h-full border-r border-slate-100 bg-white/30 backdrop-blur-3xl"
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center shadow-lg shadow-slate-900/10">
            <Zap className="text-primary w-7 h-7 fill-primary" />
          </div>
          <span className="text-slate-900 font-black text-4xl tracking-tighter uppercase italic">ReviewSense</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-tight tracking-tight">
          AI-Powered <br />
          <span className="text-primary italic">Review Intelligence.</span>
        </h1>
        
        <p className="mt-8 text-xl text-slate-600 max-w-lg leading-relaxed font-medium">
          AI-powered review intelligence for modern ecommerce brands — turning thousands of customer voices into clear, actionable insights.
        </p>

        <div className="mt-12 flex items-center gap-6">
          <div className="flex -space-x-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-400 uppercase">
                {String.fromCharCode(64 + i)}
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">
            Trusted by 500+ brands
          </p>
        </div>
      </motion.div>

      {/* Right Column: Loader & CTA */}
      <motion.div 
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        className="flex-1 flex flex-col items-center justify-center z-10 bg-transparent"
      >
        <div className="space-y-16 flex flex-col items-center">
          <div className="loading-wave">
            <div className="loading-bar"></div>
            <div className="loading-bar"></div>
            <div className="loading-bar (from uiverse)"></div>
            <div className="loading-bar"></div>
          </div>

          <div className="space-y-4 text-center">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onEnter}
              className="splash-button shadow-2xl shadow-primary/20 bg-white"
            >
              Enter Dashboard
            </motion.button>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-4">
              v2.4.0 Engine • System Ready
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
