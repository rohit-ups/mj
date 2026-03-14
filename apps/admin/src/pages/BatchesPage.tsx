import { motion } from "framer-motion";
import { useState } from "react";
import { 
  Users, 
  Calendar, 
  Clock, 
  ChevronRight, 
  Search,
  Filter,
  ArrowRight,
  User,
  Zap,
  Shield,
  Activity
} from "lucide-react";
import { Link } from "react-router-dom";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const batches = [
  {
    id: "B-001",
    name: "Early Morning Batch",
    course: "3-Day Mambo Jambo",
    instructor: "Raj Kumar",
    time: "07:30 AM - 09:30 AM",
    capacity: 14,
    enrolled: 8,
    days: [
      {
        date: "2026-03-14",
        bookings: [
          { id: "BK-001", name: "John Doe", status: "Confirmed" },
          { id: "BK-004", name: "Emma Wilson", status: "Confirmed" },
          { id: "BK-007", name: "Alice Brown", status: "Confirmed" },
        ]
      },
      {
        date: "2026-03-15",
        bookings: [
          { id: "BK-001", name: "John Doe", status: "Confirmed" },
          { id: "BK-002", name: "Sarah Smith", status: "Pending" },
        ]
      }
    ]
  },
  {
    id: "B-002",
    name: "Morning Batch",
    course: "5-Day Mambo Jambo",
    instructor: "Mike Johnson",
    time: "10:00 AM - 12:00 PM",
    capacity: 14,
    enrolled: 5,
    days: [
      {
        date: "2026-03-14",
        bookings: [
          { id: "BK-002", name: "Sarah Smith", status: "Pending" },
          { id: "BK-005", name: "David Brown", status: "Confirmed" },
        ]
      }
    ]
  }
];

export default function BatchesPage() {
  const [selectedBatchId, setSelectedBatchId] = useState(batches[0].id);
  const selectedBatch = batches.find(b => b.id === selectedBatchId) || batches[0];

  return (
    <div className="p-8 space-y-10 max-w-7xl mx-auto">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
          <h1 className="font-display text-6xl uppercase tracking-tighter leading-none">Session <span className="text-mj-accent">Control</span></h1>
          <p className="font-mono text-xs uppercase tracking-widest opacity-60 italic">Batch Management / Instructor Assignment</p>
        </div>
        <button className="brutalist-button px-8 py-4 bg-black text-white flex items-center gap-3">
          <Zap className="w-5 h-5 text-mj-yellow" />
          <span>New Batch Sync</span>
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* BATCH SELECTOR SIDEBAR */}
        <div className="lg:col-span-4 space-y-6">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40 group-focus-within:text-mj-accent transition-colors" />
            <input 
              type="text" 
              placeholder="Search Identifier..."
              className="w-full pl-12 pr-4 py-4 border-2 border-black bg-white font-mono text-xs uppercase outline-none brutalist-shadow-sm focus:brutalist-shadow-none transition-all"
            />
          </div>

          <div className="space-y-4">
            {batches.map((batch) => (
              <motion.button
                whileHover={{ x: 4 }}
                key={batch.id}
                onClick={() => setSelectedBatchId(batch.id)}
                className={cn(
                  "w-full text-left p-6 border-[3px] border-black transition-all relative overflow-hidden group",
                  selectedBatchId === batch.id 
                    ? "bg-black text-white shadow-none translate-x-1 translate-y-1" 
                    : "bg-white hover:bg-sand-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                )}
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="font-mono text-[10px] font-black opacity-40 group-hover:opacity-100 uppercase tracking-widest">
                    ID: {batch.id}
                  </span>
                  <div className={cn(
                    "px-3 py-1 border-2 font-display text-[10px] font-black uppercase tracking-tighter",
                    selectedBatchId === batch.id ? "border-mj-accent bg-mj-accent text-white" : "border-black bg-mj-yellow text-black"
                  )}>
                    {batch.enrolled}/{batch.capacity} LOAD
                  </div>
                </div>
                <h3 className="font-display text-2xl uppercase tracking-tighter mb-1 leading-none">{batch.name}</h3>
                <p className={cn(
                  "font-mono text-[10px] uppercase font-bold",
                  selectedBatchId === batch.id ? "opacity-60" : "opacity-40"
                )}>
                  {batch.instructor}
                </p>
                
                {selectedBatchId === batch.id && (
                  <motion.div layoutId="active-indicator" className="absolute right-0 top-0 bottom-0 w-2 bg-mj-accent" />
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* BATCH CONSOLE */}
        <div className="lg:col-span-8 space-y-8">
          <motion.section 
            layout
            className="border-[3px] border-black bg-white p-8 relative overflow-hidden brutalist-shadow"
          >
            {/* Console Header */}
            <div className="relative z-10 flex flex-col md:flex-row justify-between gap-8 mb-10 border-b-[3px] border-black pb-8">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <h2 className="font-display text-5xl uppercase tracking-tighter leading-none">{selectedBatch.name}</h2>
                  <Activity className="w-6 h-6 text-green-500 animate-pulse" />
                </div>
                <div className="flex flex-wrap gap-6 font-mono text-[10px] font-black uppercase">
                  <div className="flex items-center gap-2 bg-sand-100 px-3 py-1 brutalist-border">
                    <User className="w-3 h-3 text-mj-accent" />
                    <span>Commander: {selectedBatch.instructor}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-sand-100 px-3 py-1 brutalist-border">
                    <Clock className="w-3 h-3 text-mj-accent" />
                    <span>Window: {selectedBatch.time}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-mj-black text-white px-3 py-1 brutalist-border border-black">
                    <Users className="w-3 h-3 text-mj-accent" />
                    <span>{selectedBatch.enrolled} Units Locked</span>
                  </div>
                </div>
              </div>
              <button className="brutalist-button px-6 py-2 text-[10px] bg-white hover:bg-black hover:text-white self-start">
                Modify Manifest
              </button>
            </div>

            {/* Days Pipeline */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
              {selectedBatch.days.map((day) => (
                <div key={day.date} className="space-y-6">
                  <div className="flex items-center justify-between border-b-2 border-black/10 pb-2">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-mj-accent" />
                      <h4 className="font-mono text-xs uppercase font-black">{day.date}</h4>
                    </div>
                    <span className="font-mono text-[9px] uppercase opacity-40">Pipeline Status: Green</span>
                  </div>
                  
                  <div className="space-y-3">
                    {day.bookings.map((booking) => (
                      <Link 
                        key={booking.id}
                        to={`/bookings/${booking.id}`}
                        className="flex items-center justify-between p-4 border-2 border-black bg-[#fbfbfb] hover:bg-white hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all group"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 brutalist-border bg-mj-yellow flex items-center justify-center font-display font-black text-xs group-hover:rotate-12 transition-transform">
                            {booking.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-display text-sm uppercase font-black tracking-tighter leading-none">{booking.name}</p>
                            <p className="font-mono text-[9px] opacity-40 uppercase font-bold mt-1">{booking.id}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={cn(
                            "px-2 py-0.5 border-2 font-mono text-[8px] uppercase font-black",
                            booking.status === "Confirmed" ? "bg-green-100 text-green-800 border-green-200" : "bg-mj-yellow text-black border-black"
                          )}>
                            {booking.status}
                          </span>
                          <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                        </div>
                      </Link>
                    ))}
                    
                    <button className="w-full py-4 border-2 border-dashed border-black/30 font-mono text-[9px] uppercase font-black opacity-40 hover:opacity-100 hover:bg-sand-50 hover:border-solid transition-all">
                      + INJECT UNIT INTO PIPELINE
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* CAPACITY ANALYTICS */}
          <section className="brutalist-border bg-white p-8 brutalist-shadow">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-5 h-5 text-mj-blue" />
              <h3 className="font-display text-xl uppercase tracking-widest leading-none">Manifest Capacity</h3>
            </div>
            <div className="space-y-4">
              <div className="h-16 border-[3px] border-black bg-sand-100 relative overflow-hidden group">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${(selectedBatch.enrolled / selectedBatch.capacity) * 100}%` }}
                  transition={{ duration: 1.5, ease: "circOut" }}
                  className="h-full bg-mj-blue group-hover:bg-mj-accent transition-colors duration-500"
                />
                <div className="absolute inset-0 flex items-center justify-between px-6 font-display text-xl font-black uppercase tracking-tighter mix-blend-difference text-white">
                  <span>Usage Rate</span>
                  <span>{Math.round((selectedBatch.enrolled / selectedBatch.capacity) * 100)}%</span>
                </div>
              </div>
              <div className="flex justify-between font-mono text-[10px] font-black uppercase opacity-60 italic">
                <span>Buffer: {selectedBatch.capacity - selectedBatch.enrolled} slots remaining</span>
                <span>Critical Threshold: 14 Units</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
