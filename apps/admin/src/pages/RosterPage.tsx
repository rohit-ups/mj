import { useState, useEffect } from "react";
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
  Eye,
  UserCheck,
  UserX,
  ArrowRightLeft,
  Zap,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const API_URL = "http://localhost:4000";

const ActionMenu = ({ studentId }: { studentId: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-1 hover:bg-sand-100 rounded-full transition-colors"
      >
        <MoreVertical className="w-5 h-5" />
      </button>
      
      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-48 bg-white border-2 border-black brutalist-shadow-sm z-20 overflow-hidden">
            <button className="w-full flex items-center gap-2 px-4 py-2 text-[10px] uppercase font-bold hover:bg-sand-50 border-b border-black/10 text-left">
              <Eye className="w-3 h-3" /> View Details
            </button>
            <button className="w-full flex items-center gap-2 px-4 py-2 text-[10px] uppercase font-bold hover:bg-sand-50 border-b border-black/10 text-green-600 text-left">
              <UserCheck className="w-3 h-3" /> Mark Present
            </button>
            <button className="w-full flex items-center gap-2 px-4 py-2 text-[10px] uppercase font-bold hover:bg-sand-50 border-b border-black/10 text-red-600 text-left">
              <UserX className="w-3 h-3" /> Mark Absent
            </button>
            <button className="w-full flex items-center gap-2 px-4 py-2 text-[10px] uppercase font-bold hover:bg-sand-50 text-mj-blue text-left">
              <ArrowRightLeft className="w-3 h-3" /> Change Batch
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default function RosterPage() {
  const [selectedDate, setSelectedDate] = useState("2026-03-14");
  const [isMounted, setIsMounted] = useState(false);
  const [batches, setBatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [assignForm, setAssignForm] = useState({ studentId: "", batchId: "" });
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    setIsMounted(true);
    fetchData();
  }, [selectedDate]);

  const fetchData = async () => {
    try {
      const [bRes, rRes] = await Promise.all([
        fetch(`${API_URL}/bookings/batches`),
        fetch(`${API_URL}/bookings`)
      ]);
      const bData = await bRes.json();
      const rData = await rRes.json();
      
      // Filter batches for current date
      const dateFilteredBatches = bData.filter((b: any) => 
        new Date(b.startDate).toDateString() === new Date(selectedDate).toDateString()
      );
      
      setBatches(dateFilteredBatches);
      setBookings(rData);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const handleAssignStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/bookings/${assignForm.studentId}/assign-batch`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ batchId: assignForm.batchId, date: selectedDate })
      });
      if (res.ok) {
        await fetchData();
        setShowAssignModal(false);
      }
    } catch (e) { console.error(e); }
  };

  if (!isMounted) return null;

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
      case "present": return <CheckCircle2 className="w-4 h-4 text-green-600" />;
      case "absent": return <XCircle className="w-4 h-4 text-red-600" />;
      default: return <AlertCircle className="w-4 h-4 text-yellow-600" />;
    }
  };

  return (
    <div className="p-4 md:p-8 space-y-8 max-w-7xl mx-auto pb-20">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="font-display text-4xl md:text-5xl uppercase tracking-tighter">Daily Roster</h1>
          <p className="font-display text-sm uppercase tracking-widest opacity-60">Track attendance and batch assignments</p>
        </div>

        <div className="flex items-center gap-2 bg-white border-2 border-black p-1">
          <button 
            onClick={handlePrevDay}
            className="p-2 hover:bg-accent hover:text-white transition-colors border-r-2 border-black"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="px-6 flex items-center gap-3">
            <CalendarIcon className="w-5 h-5 opacity-40" />
            <input 
              type="date" 
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="font-display text-lg uppercase tracking-tight focus:outline-none bg-transparent"
            />
          </div>
          <button 
            onClick={handleNextDay}
            className="p-2 hover:bg-accent hover:text-white transition-colors border-l-2 border-black"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* ASSIGN MODAL */}
      <AnimatePresence>
        {showAssignModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm font-sans">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-xl bg-white border-[3px] border-black brutalist-shadow p-10 space-y-8 text-mj-black"
            >
              <div className="flex justify-between items-center border-b-[3px] border-black pb-4">
                <h2 className="font-display text-3xl uppercase tracking-tighter font-black text-mj-black">Assign Student</h2>
                <button onClick={() => setShowAssignModal(false)} className="hover:text-mj-accent transition-colors">
                  <X className="w-8 h-8" />
                </button>
              </div>

              <form onSubmit={handleAssignStudent} className="space-y-6">
                <div className="space-y-2">
                  <label className="font-mono text-[10px] font-black uppercase tracking-widest block opacity-60 text-mj-black">Select Student</label>
                  <select 
                    required
                    className="w-full border-[3px] border-black p-4 focus:bg-sand-50 outline-none font-display text-xs uppercase font-bold appearance-none bg-white text-mj-black"
                    value={assignForm.studentId}
                    onChange={e => setAssignForm({ ...assignForm, studentId: e.target.value })}
                  >
                    <option value="">Choose Unit from Registry</option>
                    {bookings.map(b => <option key={b.id} value={b.id}>{b.customerName} ({b.id})</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="font-mono text-[10px] font-black uppercase tracking-widest block opacity-60 text-mj-black">Target Sector</label>
                  <select 
                    required
                    className="w-full border-[3px] border-black p-4 focus:bg-sand-50 outline-none font-display text-xs uppercase font-bold appearance-none bg-white text-mj-black"
                    value={assignForm.batchId}
                    onChange={e => setAssignForm({ ...assignForm, batchId: e.target.value })}
                  >
                    <option value="">Choose Sector</option>
                    {batches.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                  </select>
                </div>
                <button 
                  type="submit"
                  className="w-full brutalist-button bg-mj-blue text-white py-6 text-xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-none"
                >
                  CONFIRM ASSIGNMENT
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {batches.length === 0 ? (
        <div className="border-4 border-dashed border-black/20 p-20 text-center space-y-4">
          <Users className="w-12 h-12 mx-auto opacity-20" />
          <p className="font-display text-xl uppercase tracking-widest opacity-40">No sessions scheduled for this date</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-12">
          {batches.map((batch) => (
            <section key={batch.id} className="space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b-4 border-black pb-4 gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="bg-black text-white px-3 py-1 font-display text-xs uppercase tracking-widest">
                      {batch.id}
                    </span>
                    <h2 className="font-display text-3xl uppercase tracking-tight">{batch.name}</h2>
                  </div>
                  <div className="flex flex-wrap gap-6 pt-2">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 opacity-40" />
                      <span className="font-display text-xs uppercase tracking-widest">
                        {new Date(batch.startDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 opacity-40" />
                      <span className="font-display text-xs uppercase tracking-widest">Instructor: {batch.instructor?.name}</span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setShowAssignModal(true)}
                  className="bg-black text-white px-6 py-2 font-display text-xs uppercase tracking-widest hover:bg-accent transition-colors w-full md:w-auto brutalist-border shadow-[4px_4px_0px_0px_#ff5c00] active:translate-x-1 active:translate-y-1 active:shadow-none"
                >
                  Assign Student
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Mocking students for display since batch model doesn't have direct linkage yet */}
                {[].map((student: any) => (
                  <div 
                    key={student.id}
                    className="group border-2 border-black bg-white p-6 space-y-6 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all relative overflow-hidden"
                  >
                    <div className="flex justify-between items-start relative z-10">
                      <div className="space-y-1">
                        <span className="font-display text-[10px] uppercase tracking-widest opacity-40">
                          {student.id}
                        </span>
                        <h3 className="font-display text-xl uppercase tracking-tight leading-none">
                          {student.name}
                        </h3>
                      </div>
                      <ActionMenu studentId={student.id} />
                    </div>

                    <div className="grid grid-cols-2 gap-4 relative z-10">
                      <div className="space-y-2">
                        <span className="font-display text-[8px] uppercase tracking-widest opacity-60">Attendance</span>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(student.status)}
                          <span className="font-display text-[10px] uppercase tracking-widest font-bold">
                            {student.status}
                          </span>
                        </div>
                      </div>
                      <div className="space-y-2 text-right">
                        <span className="font-display text-[8px] uppercase tracking-widest opacity-60">Payment</span>
                        <div className="flex items-center justify-end gap-2">
                          <span className={cn(
                            "px-2 py-0.5 border font-display text-[8px] uppercase tracking-widest font-bold",
                            student.payment === "paid" ? "bg-green-100 text-green-800 border-green-200" : 
                            student.payment === "partial" ? "bg-mj-yellow text-black border-black" :
                            "bg-red-100 text-red-800 border-red-200"
                          )}>
                            {student.payment}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 relative z-10">
                      <button className="flex-1 py-2 border-2 border-black font-display text-[10px] uppercase tracking-widest hover:bg-black hover:text-white transition-all">
                        Mark Present
                      </button>
                      <button className="px-3 py-2 border-2 border-black font-display text-[10px] uppercase tracking-widest hover:bg-red-500 hover:text-white hover:border-red-500 transition-all">
                        Absent
                      </button>
                    </div>
                  </div>
                ))}

                <button 
                  onClick={() => {
                    setAssignForm({ ...assignForm, batchId: batch.id });
                    setShowAssignModal(true);
                  }}
                  className="border-2 border-black border-dashed p-6 flex flex-col items-center justify-center gap-4 opacity-40 hover:opacity-100 hover:bg-white hover:border-solid transition-all group"
                >
                  <div className="w-12 h-12 rounded-full border-2 border-black flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
                    <span className="text-2xl">+</span>
                  </div>
                  <span className="font-display text-xs uppercase tracking-widest">Assign Student</span>
                </button>
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
