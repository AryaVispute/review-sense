import { 
  LayoutDashboard, 
  Inbox, 
  BarChart2, 
  ShieldAlert, 
  Lightbulb, 
  Wrench, 
  Bell,
  Store
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: Inbox, label: "Reviews Inbox", href: "/reviews" },
  { icon: BarChart2, label: "Sentiment Analysis", href: "/sentiment" },
  { icon: ShieldAlert, label: "Issue Detection", href: "/issues" },
  { icon: Lightbulb, label: "Insights", href: "/insights" },
  { icon: Wrench, label: "Action Center", href: "/actions" },
  { icon: Bell, label: "Alerts", href: "/alerts" },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 h-screen bg-card border-r border-border flex flex-col fixed left-0 top-0 z-40 transition-colors">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
          <Store className="text-white w-5 h-5" />
        </div>
        <span className="font-bold text-xl tracking-tight text-foreground">ReviewSense</span>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.label}
              to={item.href}
              className={cn(
                "flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 group",
                isActive 
                  ? "bg-primary/10 text-primary font-medium" 
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon className={cn(
                  "w-5 h-5",
                  isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                )} />
                <span>{item.label}</span>
              </div>
              {isActive && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 mt-auto">
        <div className="p-4 rounded-2xl bg-accent border border-border">
          <p className="text-sm font-semibold text-foreground">Pro Plan</p>
          <p className="text-xs text-muted-foreground mt-1">78% of reviews analyzed this month.</p>
          <div className="w-full bg-background h-1.5 rounded-full mt-3 overflow-hidden">
            <div className="bg-primary h-full w-[78%]" />
          </div>
          <button className="w-full mt-4 py-2 text-xs font-semibold text-primary bg-card border border-primary/20 rounded-lg hover:bg-primary/5 transition-colors">
            Upgrade Plan
          </button>
        </div>
      </div>
    </aside>
  );
}
