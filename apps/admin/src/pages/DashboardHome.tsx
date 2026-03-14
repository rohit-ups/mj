import { motion } from "framer-motion";
import { ArrowUpRight, Calendar, Users, Waves, Activity, Zap, Shield, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

export default function DashboardHome() {
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-8 space-y-10 max-w-7xl mx-auto"
    >
      {/* SYSTEM STATUS BAR */}
      <div className="bg-black text-white p-2 flex flex-wrap items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-widest border-[3px] border-black">
        <div className="flex items-center gap-4 px-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>Core System: Online</span>
          </div>
          <div className="flex items-center gap-2">
            <Activity className="w-3 h-3 text-mj-accent" />
            <span>API Latency: 42ms</span>
          </div>
        </div>
        <div className="flex items-center gap-6 px-4">
          <span>{new Date().toLocaleDateString()}</span>
          <span>{new Date().toLocaleTimeString()}</span>
        </div>
      </div>

      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
          <motion.h1 variants={itemVariants} className="font-display text-6xl uppercase tracking-tighter leading-none">
            OPS <span className="text-mj-accent">DASHBOARD</span>
          </motion.h1>
          <p className="font-mono text-xs uppercase tracking-widest opacity-60 italic">Session Control / Base Management v1.0.4</p>
        </div>
        <motion.div variants={itemVariants} className="brutalist-border p-6 bg-white brutalist-shadow-sm rotate-1">
          <span className="font-mono text-[10px] uppercase font-bold opacity-60 block mb-1">Environmental Intel</span>
          <span className="font-display text-2xl uppercase leading-none">Epic • 6-8FT • 28°C</span>
        </motion.div>
      </header>

      {/* METRIC GRIDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Bookings Today", val: "12", icon: <Calendar />, color: "bg-white" },
          { label: "Active Instructors", val: "04", icon: <Users />, color: "bg-mj-accent text-white" },
          { label: "Swell Accuracy", val: "94%", icon: <Waves />, color: "bg-white" },
          { label: "Revenue Target", val: "85%", icon: <Zap />, color: "bg-mj-yellow" }
        ].map((metric, i) => (
          <motion.div 
            key={i}
            variants={itemVariants}
            whileHover={{ scale: 1.02, rotate: i % 2 === 0 ? 1 : -1 }}
            className={`brutalist-border p-8 ${metric.color} brutalist-shadow-sm flex flex-col justify-between h-48`}
          >
            <div className="flex justify-between items-start">
              <div className="w-10 h-10 brutalist-border flex items-center justify-center bg-black/5">
                {metric.icon}
              </div>
              <ArrowUpRight className="w-5 h-5 opacity-40" />
            </div>
            <div>
              <span className="font-display text-5xl font-black uppercase leading-none">{metric.val}</span>
              <span className="font-mono text-[10px] uppercase font-bold block mt-2 opacity-60">{metric.label}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* RECENT ACTIVITY TERMINAL */}
        <motion.div variants={itemVariants} className="lg:col-span-8 brutalist-border bg-white overflow-hidden brutalist-shadow">
          <div className="p-6 border-b-[3px] border-black flex justify-between items-center bg-[#f5f5f5]">
            <div className="flex items-center gap-3">
              <Activity className="w-5 h-5" />
              <h2 className="font-display text-2xl uppercase tracking-tight">Recent Transmissions</h2>
            </div>
            <Link to="/bookings" className="brutalist-button px-4 py-1 text-[10px] bg-black text-white shadow-none hover:bg-mj-accent">View Logs</Link>
          </div>
          <div className="divide-y-[2px] divide-black font-mono">
            {[
              { id: "TX-904", user: "Rahul Sharma", action: "Booking Created", time: "2m ago", status: "confirmed" },
              { id: "TX-903", user: "System", action: "WhatsApp Auto-Reply", time: "14m ago", status: "sent" },
              { id: "TX-902", user: "Anita P.", action: "Payment Captured", time: "28m ago", status: "success" },
              { id: "TX-901", user: "Admin", action: "Batch Modified", time: "1h ago", status: "logged" },
              { id: "TX-900", user: "System", action: "Daily Backup", time: "4h ago", status: "success" }
            ].map((log, i) => (
              <div key={i} className="p-4 flex items-center justify-between hover:bg-sand-50 transition-colors group">
                <div className="flex items-center gap-6">
                  <span className="text-[10px] opacity-40">{log.id}</span>
                  <div className="space-y-0.5">
                    <p className="text-sm font-bold uppercase group-hover:text-mj-accent transition-colors">{log.action}</p>
                    <p className="text-[10px] opacity-60">Source: {log.user}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <span className="text-[10px] opacity-40 italic">{log.time}</span>
                  <span className="px-2 py-0.5 border border-black text-[9px] uppercase font-bold bg-black text-white">{log.status}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* UTILITY MODULES */}
        <div className="lg:col-span-4 space-y-8">
          <motion.div variants={itemVariants} className="brutalist-border p-8 bg-mj-blue text-white brutalist-shadow-sm space-y-6">
            <h3 className="font-display text-2xl uppercase leading-none">Security Protocol</h3>
            <div className="space-y-4 font-mono text-xs">
              <div className="flex justify-between items-center border-b border-white/20 pb-2">
                <span>Auth Encryption</span>
                <Shield className="w-4 h-4" />
              </div>
              <div className="flex justify-between items-center border-b border-white/20 pb-2">
                <span>SSL Terminus</span>
                <span className="text-green-300">Active</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/20 pb-2">
                <span>Threat Level</span>
                <span className="text-green-300">Zero</span>
              </div>
            </div>
            <button className="w-full py-3 bg-white text-black font-display text-xs uppercase font-black hover:bg-mj-yellow transition-colors">Audit Logs</button>
          </motion.div>

          <motion.div variants={itemVariants} className="brutalist-border p-8 bg-white brutalist-shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-mj-accent" />
              <h3 className="font-display text-xl uppercase leading-none">Shift Rotation</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 brutalist-border bg-black text-white flex items-center justify-center font-display text-xs">RK</div>
                <div className="flex-1">
                  <p className="font-display text-sm uppercase">Raj Kumar</p>
                  <p className="font-mono text-[10px] opacity-60">On-Deck • Lead Instructor</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 brutalist-border bg-mj-yellow flex items-center justify-center font-display text-xs">MJ</div>
                <div className="flex-1">
                  <p className="font-display text-sm uppercase">Mike Johnson</p>
                  <p className="font-mono text-[10px] opacity-60">Off-Deck • Logistics</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
