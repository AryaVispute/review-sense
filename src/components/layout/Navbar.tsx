import { 
  Search, 
  Bell, 
  ChevronDown,
  Moon,
  Sun
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="fixed top-0 right-0 left-64 h-16 bg-background/80 backdrop-blur-md border-b border-border z-30 flex items-center justify-between px-8 transition-colors">
      <div className="flex items-center flex-1 max-w-md">
        <div className="relative w-full group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
          <input 
            type="text" 
            placeholder="Search reviews, products, or insights..." 
            className="w-full bg-slate-100 border-none rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-accent text-muted-foreground transition-colors"
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        <div className="relative">
          <button className="p-2 rounded-lg hover:bg-accent text-muted-foreground transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full border-2 border-background" />
          </button>
        </div>

        <div className="h-8 w-px bg-slate-200 mx-2" />

        <button className="flex items-center gap-3 p-1.5 rounded-xl hover:bg-accent transition-colors border border-transparent hover:border-border group">
          <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-xs border border-primary/20">
            JD
          </div>
          <div className="text-left hidden sm:block">
            <p className="text-sm font-semibold text-foreground leading-none">John Doe</p>
            <p className="text-[10px] text-muted-foreground mt-1 uppercase tracking-wider font-bold">Admin</p>
          </div>
          <ChevronDown className="w-4 h-4 text-muted-foreground transition-transform group-hover:translate-y-0.5" />
        </button>
      </div>
    </header>
  );
}
