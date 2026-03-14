
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
  MoreVertical
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
    return <div className="p-8">Loading Roster...</div>;
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
      case "present": return <CheckCircle2 className="w-4 h-4 text-green-600" />;
      case "absent": return <XCircle className="w-4 h-4 text-red-600" />;
      default: return <AlertCircle className="w-4 h-4 text-yellow-600" />;
    }
  };

  return (
    <div className="p-4 md:p-8 space-y-8 max-w-7xl mx-auto">
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
                      <span className="font-display text-xs uppercase tracking-widest">{batch.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 opacity-40" />
                      <span className="font-display text-xs uppercase tracking-widest">Instructor: {batch.instructor}</span>
                    </div>
                  </div>
                </div>
                <button className="bg-black text-white px-6 py-2 font-display text-xs uppercase tracking-widest hover:bg-accent transition-colors w-full md:w-auto">
                  Manage Batch
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {batch.students.map((student) => (
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
                      <button className="p-1 hover:bg-sand-100 rounded-full transition-colors">
                        <MoreVertical className="w-5 h-5" />
                      </button>
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
                            student.payment === "partial" ? "bg-blue-100 text-blue-800 border-blue-200" :
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

                    {/* Decorative element */}
                    <div className="absolute -right-4 -bottom-4 w-12 h-12 border-2 border-black/5 rounded-full pointer-events-none" />
                  </div>
                ))}

                <button className="border-2 border-black border-dashed p-6 flex flex-col items-center justify-center gap-4 opacity-40 hover:opacity-100 hover:bg-white hover:border-solid transition-all group">
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
