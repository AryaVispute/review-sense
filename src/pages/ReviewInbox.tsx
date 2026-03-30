import { useState, useMemo } from "react";
import { 
  Search, 
  Star,
  ArrowRight
} from "lucide-react";
import data from "@/data/mockData.json";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

type Sentiment = "Positive" | "Neutral" | "Negative";

export function ReviewInbox() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("All Platforms");
  const [selectedRating, setSelectedRating] = useState("All Ratings");
  const [activeTab, setActiveTab] = useState<"All" | Sentiment>("All");
  const [visibleCount, setVisibleCount] = useState(8);

  const platforms = ["All Platforms", "Amazon US", "Amazon UK", "Shopify", "Flipkart", "Best Buy", "Direct Store"];
  const ratings = ["All Ratings", "5 Stars", "4 Stars", "3 Stars", "2 Stars", "1 Star"];

  const filteredReviews = useMemo(() => {
    return data.reviews.filter((review) => {
      const matchesSearch = 
        review.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.content.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesPlatform = selectedPlatform === "All Platforms" || review.platform === selectedPlatform;
      
      const matchesRating = 
        selectedRating === "All Ratings" || 
        review.rating === parseInt(selectedRating.split(" ")[0]);
      
      const matchesTab = activeTab === "All" || review.sentiment === activeTab;

      return matchesSearch && matchesPlatform && matchesRating && matchesTab;
    });
  }, [searchTerm, selectedPlatform, selectedRating, activeTab]);

  const loadMore = () => setVisibleCount(prev => prev + 4);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-foreground">Review Inbox</h1>
        <p className="text-muted-foreground text-sm">Manage and respond to customer feedback across all channels.</p>
      </header>

      {/* Filters & Search */}
      <div className="bg-card p-4 rounded-2xl border border-border shadow-sm flex flex-wrap items-center gap-4 transition-colors">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input 
            type="text"
            placeholder="Search by name, product or content..."
            className="w-full bg-accent border border-border rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 outline-none text-foreground placeholder:text-muted-foreground"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-3">
          <select 
            className="bg-accent border border-border rounded-xl px-4 py-2 text-sm text-muted-foreground outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
          >
            {platforms.map(p => <option key={p} value={p}>{p}</option>)}
          </select>

          <select 
            className="bg-accent border border-border rounded-xl px-4 py-2 text-sm text-muted-foreground outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
            value={selectedRating}
            onChange={(e) => setSelectedRating(e.target.value)}
          >
            {ratings.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-border pb-px">
        {["All", "Positive", "Neutral", "Negative"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={cn(
              "px-6 py-3 text-sm font-medium transition-all relative",
              activeTab === tab 
                ? "text-primary" 
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab}
            {activeTab === tab && (
              <motion.div 
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" 
              />
            )}
          </button>
        ))}
      </div>

      {/* Review List */}
      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {filteredReviews.slice(0, visibleCount).map((review, index) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              key={review.id}
              className={cn(
                "group relative bg-card border rounded-2xl p-5 hover:shadow-md transition-all duration-300 cursor-pointer",
                review.sentiment === "Negative" 
                  ? "border-destructive/20 bg-destructive/5 hover:bg-destructive/10" 
                  : "border-border hover:border-primary/30"
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex gap-4 flex-1">
                  <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center font-bold text-muted-foreground shrink-0 border border-border">
                    {review.userName.charAt(0)}
                  </div>
                  <div className="space-y-1 overflow-hidden">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-foreground">{review.userName}</h3>
                      <span className="text-xs text-muted-foreground">• {review.platform}</span>
                      <span className="text-xs text-slate-400">• {review.date}</span>
                    </div>
                    <p className="text-sm font-semibold text-primary/80 truncate">
                      {review.productName}
                    </p>
                    <div className="flex items-center gap-0.5 my-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={cn(
                            "w-3.5 h-3.5",
                            i < review.rating ? "fill-amber-400 text-amber-400" : "text-border"
                          )} 
                        />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mt-2">
                      {review.content}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-3 text-right">
                  <div className={cn(
                    "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border",
                    review.sentiment === "Positive" && "bg-emerald-50 text-emerald-600 border-emerald-100",
                    review.sentiment === "Neutral" && "bg-slate-50 text-slate-600 border-slate-200",
                    review.sentiment === "Negative" && "bg-rose-50 text-rose-600 border-rose-100",
                  )}>
                    {review.sentiment}
                  </div>
                  <button className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-background rounded-lg text-muted-foreground hover:text-primary transition-all shadow-sm border border-border">
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredReviews.length === 0 && (
          <div className="py-20 text-center space-y-3">
            <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto text-muted-foreground">
              <Search className="w-8 h-8" />
            </div>
            <p className="text-muted-foreground font-medium">No reviews matching your criteria.</p>
            <button onClick={() => { setSearchTerm(""); setSelectedPlatform("All Platforms"); setSelectedRating("All Ratings"); setActiveTab("All"); }} className="text-primary text-sm font-bold hover:underline">
              Clear all filters
            </button>
          </div>
        )}

        {visibleCount < filteredReviews.length && (
          <div className="pt-6 flex justify-center">
            <button 
              onClick={loadMore}
              className="px-8 py-3 bg-card border border-border rounded-xl text-sm font-bold text-muted-foreground hover:bg-accent hover:border-primary/20 transition-all shadow-sm"
            >
              Load More Reviews
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
