import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Users, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  MoreVertical,
  Zap,
  Activity,
  UserCheck,
  UserX,
  UserMinus
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Mock data for the roster
const rosterData = {
  "2026-03-14": [
    {
      id: "B-001",
      name: "Early Morning Batch",
      time: "07:30 AM - 09:30 AM",
      instructor: "Raj Kumar",
      students: [
        { id: "BK-001", name: "John Doe", status: "present", payment: "paid" },
        { id: "BK-004", name: "Emma Wilson", status: "present", payment: "partial" },
        { id: "BK-007", name: "Alice Brown", status: "absent", payment: "paid" },
      ]
    },
    {
      id: "B-002",
      name: "Morning Batch",
      time: "10:00 AM - 12:00 PM",
      instructor: "Mike Johnson",
      students: [
        { id: "BK-002", name: "Sarah Smith", status: "pending", payment: "partial" },
        { id: "BK-005", name: "David Brown", status: "present", payment: "paid" },
        { id: "BK-009", name: "Chris Evans", status: "pending", payment: "unpaid" },
      ]
    }
  ],
  "2026-03-15": [
    {
      id: "B-001",
      name: "Early Morning Batch",
      time: "07:30 AM - 09:30 AM",
      instructor: "Raj Kumar",
      students: [
        { id: "BK-001", name: "John Doe", status: "pending", payment: "paid" },
        { id: "BK-010", name: "Robert Miller", status: "pending", payment: "paid" },
      ]
    }
  ]
};

export default function RosterPage() {
  const [selectedDate, setSelectedDate] = useState("2026-03-14");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="p-8 font-mono uppercase text-xs animate-pulse">Initializing Roster...</div>;
  }
  
  const batches = rosterData[selectedDate as keyof typeof rosterData] || [];

  const handlePrevDay = () => {
    const date = new Date(selectedDate);
    date.setDate(date.getDate() - 1);
    setSelectedDate(date.toISOString().split('T')[0]);
  };

  const handleNextDay = () => {
    const date = new Date(selectedDate);
    date.setDate(date.getDate() + 1);
    setSelectedDate(date.toISOString().split('T')[0]);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "present": return <UserCheck className="w-4 h-4 text-green-500" />;
      case "absent": return <UserX className="w-4 h-4 text-red-500" />;
      default: return <UserMinus className="w-4 h-4 text-mj-yellow" />;
    }
  };

  return (
    <div className="p-8 space-y-10 max-w-7xl mx-auto">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div className="space-y-2">
          <h1 className="font-display text-6xl uppercase tracking-tighter leading-none">Daily <span className="text-mj-accent">Roster</span></h1>
          <p className="font-mono text-xs uppercase tracking-widest opacity-60">Attendance Tracking / Live Session Log</p>
        </div>

        <div className="flex items-center gap-2 bg-white border-[3px] border-black p-1 brutalist-shadow-sm">
          <button 
            onClick={handlePrevDay}
            className="p-3 hover:bg-black hover:text-white transition-colors border-r-[3px] border-black"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="px-8 flex items-center gap-4 group">
            <CalendarIcon className="w-5 h-5 text-mj-accent group-hover:rotate-12 transition-transform" />
            <input 
              type="date" 
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="font-display text-xl uppercase tracking-tight focus:outline-none bg-transparent cursor-pointer"
            />
          </div>
          <button 
            onClick={handleNextDay}
            className="p-3 hover:bg-black hover:text-white transition-colors border-l-[3px] border-black"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </header>

      <AnimatePresence mode="wait">
        {batches.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="border-[3px] border-dashed border-black/20 p-32 text-center space-y-6"
          >
            <Activity className="w-16 h-16 mx-auto opacity-20" />
            <p className="font-display text-3xl uppercase tracking-widest opacity-40 leading-none">Sector Clear • No Sessions Scheduled</p>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 gap-16"
          >
            {batches.map((batch) => (
              <section key={batch.id} className="space-y-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b-[4px] border-black pb-6 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-4">
                      <span className="bg-mj-black text-white px-4 py-1 font-mono text-xs font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_#ff5c00]">
                        ID: {batch.id}
                      </span>
                      <h2 className="font-display text-4xl uppercase tracking-tighter leading-none">{batch.name}</h2>
                    </div>
                    <div className="flex flex-wrap gap-8 font-mono text-[10px] font-black uppercase pt-2">
                      <div className="flex items-center gap-2 px-3 py-1 bg-sand-100 brutalist-border">
                        <Clock className="w-3 h-3 text-mj-accent" />
                        <span>{batch.time}</span>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1 bg-sand-100 brutalist-border">
                        <User className="w-3 h-3 text-mj-accent" />
                        <span>{batch.instructor}</span>
                      </div>
                    </div>
                  </div>
                  <button className="brutalist-button px-8 py-3 text-[10px] bg-black text-white hover:bg-mj-accent transition-all w-full md:w-auto">
                    Sync Batch Manifest
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {batch.students.map((student) => (
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      key={student.id}
                      className="group border-[3px] border-black bg-white p-8 space-y-8 brutalist-shadow-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all relative overflow-hidden"
                    >
                      <div className="flex justify-between items-start relative z-10">
                        <div className="space-y-1">
                          <span className="font-mono text-[10px] font-black opacity-40 uppercase tracking-widest">
                            Unit: {student.id}
                          </span>
                          <h3 className="font-display text-2xl uppercase tracking-tighter leading-none group-hover:text-mj-accent transition-colors">
                            {student.name}
                          </h3>
                        </div>
                        <button className="p-2 hover:bg-mj-yellow brutalist-border transition-colors">
                          <MoreVertical className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-6 relative z-10 font-mono">
                        <div className="space-y-2">
                          <span className="text-[9px] font-black uppercase opacity-60">Attendance</span>
                          <div className="flex items-center gap-3 bg-sand-50 p-2 brutalist-border">
                            {getStatusIcon(student.status)}
                            <span className="text-[10px] uppercase font-black">
                              {student.status}
                            </span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <span className="text-[9px] font-black uppercase opacity-60">Payment</span>
                          <div className="flex items-center gap-2">
                            <span className={cn(
                              "w-full px-2 py-2 border-2 font-black text-[9px] uppercase text-center transition-all",
                              student.payment === "paid" ? "bg-green-100 text-green-800 border-green-200" : 
                              student.payment === "partial" ? "bg-mj-yellow text-black border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]" :
                              "bg-red-100 text-red-800 border-red-200"
                            )}>
                              {student.payment}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-3 relative z-10">
                        <button className="flex-1 py-3 border-[3px] border-black font-display text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all active:translate-y-1">
                          Log Present
                        </button>
                        <button className="px-4 py-3 border-[3px] border-black font-display text-[10px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white hover:border-red-500 transition-all active:translate-y-1">
                          Absent
                        </button>
                      </div>

                      {/* Animated Scanner Effect */}
                      <div className="absolute top-0 left-0 w-full h-[2px] bg-mj-accent/20 animate-[scan_2s_linear_infinite] pointer-events-none" />
                    </motion.div>
                  ))}

                  <button className="border-[3px] border-black border-dashed p-8 flex flex-col items-center justify-center gap-6 opacity-40 hover:opacity-100 hover:bg-white hover:border-solid transition-all group brutalist-shadow-hover">
                    <div className="w-16 h-16 rounded-full border-[3px] border-black flex items-center justify-center group-hover:bg-mj-accent group-hover:text-white group-hover:rotate-90 transition-all">
                      <Zap className="w-8 h-8" />
                    </div>
                    <span className="font-display text-sm font-black uppercase tracking-widest">Inject New Student</span>
                  </button>
                </div>
              </section>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes scan {
          0% { top: 0; }
          100% { top: 100%; }
        }
      `}</style>
    </div>
  );
}
