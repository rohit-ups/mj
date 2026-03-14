import { useState } from "react";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  User, 
  Mail, 
  Phone, 
  CreditCard, 
  CheckCircle2, 
  History,
  AlertCircle,
  UserCheck,
  UserX,
  UserMinus,
  Users,
  ChevronDown,
  Zap,
  Activity,
  Shield
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const availableBatches = [
  { id: "B-001", name: "Early Morning Batch", instructor: "Raj Kumar", capacity: "8/14" },
  { id: "B-002", name: "Morning Batch", instructor: "Mike Johnson", capacity: "5/14" },
];

const initialBookingData = {
  id: "BK-001",
  date: "2026-03-14",
  time: "07:30 AM",
  customer: {
    name: "John Doe",
    email: "john@example.com",
    phone: "+91 98765 43210",
  },
  course: "3-Day Mambo Jambo",
  stay: "AC Dorm Bed",
  status: "Confirmed",
  pricing: {
    total: 6000,
    deposit: 3000,
    remaining: 3000,
    currency: "INR",
  },
  attendance: [
    { date: "2026-03-14", status: "present", batchId: "B-001" },
    { date: "2026-03-15", status: "pending", batchId: "B-001" },
    { date: "2026-03-16", status: "pending", batchId: "" },
  ],
  paymentHistory: [
    {
      id: "PAY-001",
      date: "2026-03-01 14:20",
      amount: 3000,
      method: "Razorpay",
      type: "Advance (50%)",
      status: "Captured"
    }
  ]
};

export default function BookingDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [booking, setBooking] = useState(initialBookingData);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleMarkAttendance = (date: string, status: string) => {
    setBooking(prev => ({
      ...prev,
      attendance: prev.attendance.map(day => 
        day.date === date ? { ...day, status } : day
      )
    }));
  };

  const handleAssignBatch = (date: string, batchId: string) => {
    setBooking(prev => ({
      ...prev,
      attendance: prev.attendance.map(day => 
        day.date === date ? { ...day, batchId } : day
      )
    }));
  };

  const handleMarkAsPaid = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setBooking(prev => ({
        ...prev,
        pricing: { ...prev.pricing, remaining: 0 },
        paymentHistory: [
          ...prev.paymentHistory,
          {
            id: `PAY-00${prev.paymentHistory.length + 1}`,
            date: new Date().toLocaleString(),
            amount: prev.pricing.remaining,
            method: "Manual / Cash",
            type: "Final Balance",
            status: "Captured"
          }
        ]
      }));
      setIsProcessing(false);
    }, 1000);
  };

  const isFullyPaid = booking.pricing.remaining === 0;

  return (
    <div className="p-8 space-y-10 max-w-7xl mx-auto font-sans relative">
      <div className="scanlines pointer-events-none fixed inset-0 z-50 opacity-[0.03]" />
      
      <header className="flex flex-col gap-6">
        <Link 
          to="/bookings" 
          className="group inline-flex items-center gap-2 font-mono text-[10px] uppercase font-black tracking-[0.2em] opacity-40 hover:opacity-100 transition-opacity w-fit"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Return to Registry
        </Link>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <h1 className="font-display text-6xl uppercase tracking-tighter leading-none">UNIT <span className="text-mj-accent">{id}</span></h1>
              <span className={cn(
                "px-4 py-1 border-[3px] border-black font-display text-xs uppercase font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
                booking.status === "Confirmed" ? "bg-green-100 text-green-800" : "bg-mj-yellow text-black"
              )}>
                {booking.status}
              </span>
            </div>
            <p className="font-mono text-xs uppercase tracking-widest opacity-60">Dossier Initialized: March 1, 2026 • Status: ACTIVE</p>
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            <button className="brutalist-button px-6 py-3 text-xs bg-mj-blue text-white flex items-center gap-2">
              <Zap className="w-4 h-4" /> Sync Data
            </button>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-10">
          {/* CORE INTEL */}
          <section className="brutalist-border bg-white p-8 space-y-8 brutalist-shadow">
            <div className="flex items-center gap-3 border-b-[3px] border-black pb-4">
              <Activity className="w-5 h-5 text-mj-accent" />
              <h2 className="font-display text-2xl uppercase tracking-tight">Core Intelligence</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 brutalist-border bg-mj-yellow flex items-center justify-center shrink-0 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-mono text-[9px] uppercase font-black opacity-40 italic">Unit Name</p>
                    <p className="font-display text-xl uppercase tracking-tighter">{booking.customer.name}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 brutalist-border bg-white flex items-center justify-center shrink-0 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <Mail className="w-6 h-6 text-mj-blue" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="font-mono text-[9px] uppercase font-black opacity-40 italic">Comms Link</p>
                    <p className="font-display text-xs uppercase truncate">{booking.customer.email}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 brutalist-border bg-mj-black text-white flex items-center justify-center shrink-0 shadow-[4px_4px_0px_0px_#ff5c00]">
                    <History className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-mono text-[9px] uppercase font-black opacity-40 italic">Assigned Flow</p>
                    <p className="font-display text-xl uppercase tracking-tighter">{booking.course}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 brutalist-border bg-white flex items-center justify-center shrink-0 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <Shield className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <p className="font-mono text-[9px] uppercase font-black opacity-40 italic">Base Housing</p>
                    <p className="font-display text-xl uppercase tracking-tighter">{booking.stay}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ATTENDANCE LOG */}
          <section className="brutalist-border bg-white p-8 space-y-8 brutalist-shadow">
            <div className="flex items-center gap-3 border-b-[3px] border-black pb-4">
              <Calendar className="w-5 h-5 text-mj-blue" />
              <h2 className="font-display text-2xl uppercase tracking-tight">Mission Schedule</h2>
            </div>
            <div className="space-y-4">
              {booking.attendance.map((day, i) => (
                <div key={i} className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 border-[3px] border-black bg-sand-50/30 group hover:bg-white transition-all">
                  <div className="flex items-center gap-6">
                    <span className="w-10 h-10 brutalist-border bg-black text-white flex items-center justify-center font-mono text-xs font-black">
                      D{i+1}
                    </span>
                    <div>
                      <p className="font-display text-lg uppercase tracking-tighter leading-none">{day.date}</p>
                      <p className="font-mono text-[10px] uppercase font-bold opacity-40 mt-1">Sector Assignment Required</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="relative">
                      <select 
                        className="pl-4 pr-10 py-2 brutalist-border bg-white font-mono text-[10px] font-black uppercase focus:bg-mj-yellow outline-none appearance-none cursor-pointer"
                        value={day.batchId || ""}
                        onChange={(e) => handleAssignBatch(day.date, e.target.value)}
                      >
                        <option value="">Select Sector</option>
                        {availableBatches.map(batch => (
                          <option key={batch.id} value={batch.id}>{batch.name}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none opacity-40" />
                    </div>

                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleMarkAttendance(day.date, "present")}
                        className={cn(
                          "px-4 py-2 brutalist-border font-mono text-[9px] font-black uppercase transition-all",
                          day.status === "present" ? "bg-green-500 text-white shadow-none" : "bg-white hover:bg-green-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                        )}
                      >
                        Present
                      </button>
                      <button 
                        onClick={() => handleMarkAttendance(day.date, "absent")}
                        className={cn(
                          "px-4 py-2 brutalist-border font-mono text-[9px] font-black uppercase transition-all",
                          day.status === "absent" ? "bg-red-500 text-white shadow-none" : "bg-white hover:bg-red-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                        )}
                      >
                        Absent
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* LEDGER */}
          <section className="brutalist-border bg-white overflow-hidden brutalist-shadow">
            <div className="p-6 bg-mj-black text-white border-b-[3px] border-black flex items-center gap-3">
              <CreditCard className="w-5 h-5 text-mj-accent" />
              <h2 className="font-display text-2xl uppercase tracking-tight">Financial Ledger</h2>
            </div>
            <table className="w-full text-left border-collapse font-mono text-[10px]">
              <thead>
                <tr className="border-b-[3px] border-black bg-sand-50 uppercase font-black">
                  <th className="p-6 border-r-[3px] border-black">Sequence Time</th>
                  <th className="p-6 border-r-[3px] border-black">Protocol</th>
                  <th className="p-6 border-r-[3px] border-black">Gateway</th>
                  <th className="p-6 text-right">Value (INR)</th>
                </tr>
              </thead>
              <tbody className="divide-y-[2px] divide-black">
                {booking.paymentHistory.map((payment, i) => (
                  <tr key={i} className="hover:bg-sand-50 transition-colors">
                    <td className="p-6 border-r-[3px] border-black font-black uppercase">{payment.date}</td>
                    <td className="p-6 border-r-[3px] border-black">
                      <span className="bg-mj-yellow px-2 py-0.5 brutalist-border border-black">{payment.type}</span>
                    </td>
                    <td className="p-6 border-r-[3px] border-black font-black">{payment.method}</td>
                    <td className="p-6 text-right font-display text-sm font-black italic">₹{payment.amount.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>

        {/* STATUS PANEL */}
        <div className="lg:col-span-4 space-y-10">
          <section className="brutalist-border bg-white p-8 space-y-8 brutalist-shadow sticky top-8">
            <div className="flex items-center gap-3 border-b-[3px] border-black pb-4">
              <Shield className="w-5 h-5 text-mj-accent" />
              <h2 className="font-display text-2xl uppercase tracking-tight">Status Terminal</h2>
            </div>
            
            <div className="space-y-6">
              <div className="p-6 bg-sand-50 brutalist-border space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-[10px] font-black uppercase opacity-40">Gross Value</span>
                  <span className="font-display text-xl font-black">₹{booking.pricing.total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-green-600 font-black italic">
                  <span className="font-mono text-[10px] uppercase">Advance Paid</span>
                  <span className="font-display text-xl">₹{booking.pricing.deposit.toLocaleString()}</span>
                </div>
                <div className="pt-4 border-t-[3px] border-black flex justify-between items-center">
                  <span className="font-display text-xs font-black uppercase tracking-widest text-mj-accent">Outstanding</span>
                  <span className={cn(
                    "font-display text-3xl font-black italic",
                    isFullyPaid ? "text-green-600" : "text-red-600"
                  )}>
                    ₹{booking.pricing.remaining.toLocaleString()}
                  </span>
                </div>
              </div>

              {isFullyPaid ? (
                <motion.div 
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  className="flex items-center gap-4 p-6 bg-green-500 text-white brutalist-border brutalist-shadow-sm"
                >
                  <CheckCircle2 className="w-8 h-8 shrink-0" />
                  <span className="font-display text-xl font-black uppercase tracking-tighter">Mission Funded</span>
                </motion.div>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-start gap-4 p-6 bg-mj-yellow brutalist-border shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <AlertCircle className="w-6 h-6 shrink-0" />
                    <p className="font-mono text-[10px] font-black uppercase leading-tight">
                      Balance of ₹{booking.pricing.remaining.toLocaleString()} is due upon arrival at base.
                    </p>
                  </div>
                  <button 
                    onClick={handleMarkAsPaid}
                    disabled={isProcessing}
                    className="w-full py-6 bg-mj-black text-white font-display text-xl font-black uppercase tracking-tighter hover:bg-mj-accent transition-all brutalist-shadow active:translate-x-1 active:translate-y-1 active:shadow-none disabled:opacity-50"
                  >
                    {isProcessing ? "Processing Trace..." : "Confirm Final Payment"}
                  </button>
                </div>
              )}

              <div className="pt-6 space-y-4">
                <button className="w-full py-4 border-[3px] border-black bg-white font-display text-xs font-black uppercase tracking-widest hover:bg-sand-100 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  Dispatch Confirmation
                </button>
                <button className="w-full py-4 border-[3px] border-black bg-white font-display text-xs font-black uppercase tracking-widest text-red-600 hover:bg-red-500 hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none">
                  Abort Booking
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
