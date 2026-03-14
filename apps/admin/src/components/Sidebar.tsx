import { motion } from "framer-motion";
import { 
  Calendar, 
  Users, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  LayoutDashboard, 
  Activity,
  Zap,
  Shield
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navItems = [
  { name: "Terminal", href: "/", icon: LayoutDashboard, tag: "CORE" },
  { name: "Registry", href: "/bookings", icon: Calendar, tag: "DATA" },
  { name: "Sectors", href: "/batches", icon: Zap, tag: "OPS" },
  { name: "Roster", href: "/roster", icon: Users, tag: "LIVE" },
  { name: "Config", href: "/settings", icon: Settings, tag: "SYS" },
];

export function Sidebar() {
  const location = useLocation();
  const pathname = location.pathname;
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-6 right-6 z-[70] p-3 bg-white brutalist-border shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-mj-accent hover:text-white transition-all active:translate-x-1 active:translate-y-1 active:shadow-none"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/40 backdrop-blur-md z-[60] lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-[65] w-72 bg-white border-r-[3px] border-black flex flex-col transition-transform duration-500 ease-in-out lg:translate-x-0 lg:static lg:h-screen overflow-hidden",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Branding Area */}
        <div className="p-8 border-b-[3px] border-black bg-white group cursor-default relative overflow-hidden">
          <div className="flex items-center gap-4 relative z-10">
            <motion.div 
              whileHover={{ rotate: 180 }}
              className="w-12 h-12 brutalist-border bg-mj-yellow flex items-center justify-center p-1 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
            >
              <img src="/logo.png" alt="Mambo Jambo" className="w-full h-full object-contain" />
            </motion.div>
            <div className="flex flex-col">
              <span className="font-display text-2xl font-black tracking-tighter uppercase leading-none">Mambo Ops</span>
              <span className="font-mono text-[8px] font-bold uppercase tracking-[0.2em] opacity-40 mt-1 italic">Authorized Admin Only</span>
            </div>
          </div>
          {/* Animated Background Element */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-mj-accent/5 -rotate-45 translate-x-12 -translate-y-12 border-l border-black/10" />
        </div>

        {/* Navigation Terminal */}
        <nav className="flex-1 p-6 space-y-4 overflow-y-auto custom-scrollbar">
          <span className="font-mono text-[9px] font-black uppercase opacity-30 tracking-[0.3em] block mb-6">Navigation Matrix</span>
          
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsOpen(false)}
                className="block relative group"
              >
                <div className={cn(
                  "flex items-center justify-between px-5 py-4 font-display text-xs uppercase font-black tracking-widest transition-all border-[2px] relative z-10",
                  isActive
                    ? "bg-black text-white border-black shadow-[4px_4px_0px_0px_#ff5c00] translate-x-[-2px] translate-y-[-2px]"
                    : "border-transparent hover:bg-sand-100 hover:border-black hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                )}>
                  <div className="flex items-center gap-4">
                    <item.icon className={cn("w-4 h-4", isActive ? "text-mj-accent" : "opacity-40")} />
                    <span>{item.name}</span>
                  </div>
                  <span className={cn(
                    "font-mono text-[8px] px-1.5 py-0.5 border",
                    isActive ? "border-white/20 text-white/40" : "border-black/10 text-black/20"
                  )}>
                    {item.tag}
                  </span>
                </div>
                {/* Visual Glitch Element on Hover */}
                {!isActive && (
                  <div className="absolute inset-0 bg-mj-accent opacity-0 group-hover:opacity-10 translate-x-1 translate-y-1 -z-0 transition-opacity" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* System Footer */}
        <div className="p-6 border-t-[3px] border-black bg-[#f5f5f5] space-y-6">
          {/* Status Indicator */}
          <div className="brutalist-border bg-white p-4 space-y-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[8px] font-black uppercase opacity-40 italic">System Link</span>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                <span className="font-mono text-[8px] font-black uppercase">Active</span>
              </div>
            </div>
            <div className="h-1 bg-black/5 rounded-full overflow-hidden">
              <motion.div 
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="w-1/3 h-full bg-mj-accent"
              />
            </div>
          </div>

          <Link
            to="/login"
            className="flex items-center justify-center gap-3 px-5 py-4 font-display text-xs uppercase font-black tracking-widest bg-white border-[3px] border-black hover:bg-red-500 hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1"
          >
            <LogOut className="w-4 h-4" />
            Abort Session
          </Link>
        </div>
      </aside>
    </>
  );
}
