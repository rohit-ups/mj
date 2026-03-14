"use client";

import { useState, use } from "react";
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
  ChevronDown
} from "lucide-react";
import Link from "next/link";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const availableBatches = [
  { id: "B-001", name: "Morning Session (9AM - 11AM)", instructor: "Rodrigo", capacity: "8/10" },
  { id: "B-002", name: "Midday Session (12PM - 2PM)", instructor: "Tiago", capacity: "5/10" },
  { id: "B-003", name: "Afternoon Session (3PM - 5PM)", instructor: "Ana", capacity: "9/10" },
];

const initialBookingData = {
  id: "BK-001",
  date: "2026-03-14",
  time: "09:00 AM",
  customer: {
    name: "John Doe",
    email: "john@example.com",
    phone: "+351 912 345 678",
  },
  course: "Beginner Lesson",
  stay: "3 Days",
  status: "Confirmed",
  pricing: {
    total: 255.00,
    deposit: 75.00,
    remaining: 180.00,
    currency: "EUR",
  },
  attendance: [
    { date: "2026-03-14", status: "pending", batchId: "B-001" },
    { date: "2026-03-15", status: "pending", batchId: "B-001" },
    { date: "2026-03-16", status: "pending", batchId: "" },
  ],
  paymentHistory: [
    {
      id: "PAY-001",
      date: "2026-03-01 14:20",
      amount: 75.00,
      method: "Stripe (Card)",
      type: "Deposit",
      status: "Completed"
    }
  ]
};

export default function BookingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
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
      const now = new Date();
      const dateString = now.toISOString().split('T')[0] + ' ' + now.toTimeString().split(' ')[0].substring(0, 5);
      
      setBooking(prev => ({
        ...prev,
        pricing: {
          ...prev.pricing,
          remaining: 0
        },
        paymentHistory: [
          ...prev.paymentHistory,
          {
            id: `PAY-00${prev.paymentHistory.length + 1}`,
            date: dateString,
            amount: prev.pricing.remaining,
            method: "Manual (Cash/Terminal)",
            type: "Remaining Balance",
            status: "Completed"
          }
        ]
      }));
      setIsProcessing(false);
    }, 800);
  };

  const isFullyPaid = booking.pricing.remaining === 0;

  return (
    <div className="p-8 space-y-8 max-w-5xl mx-auto">
      <header className="flex flex-col gap-4">
        <Link 
          href="/bookings" 
          className="flex items-center gap-2 font-display text-xs uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity w-fit"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Bookings
        </Link>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="font-display text-5xl uppercase tracking-tighter">Booking {resolvedParams.id}</h1>
              <span className={cn(
                "px-3 py-1 border-2 font-display text-xs uppercase tracking-widest",
                booking.status === "Confirmed" ? "bg-green-100 text-green-800 border-green-200" : "bg-yellow-100 text-yellow-800 border-yellow-200"
              )}>
                {booking.status}
              </span>
            </div>
            <p className="font-display text-sm uppercase tracking-widest opacity-60">Created on March 1, 2026</p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section className="border-2 border-black bg-white p-6 space-y-6">
            <h2 className="font-display text-xl uppercase tracking-tight border-b-2 border-black pb-2">Booking Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-sand-100 border border-black">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest opacity-60">Date</p>
                  <p className="font-display text-lg uppercase">{booking.date}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-sand-100 border border-black">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest opacity-60">Time</p>
                  <p className="font-display text-lg uppercase">{booking.time}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-sand-100 border border-black">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest opacity-60">Course</p>
                  <p className="font-display text-lg uppercase">{booking.course}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-sand-100 border border-black">
                  <History className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest opacity-60">Duration</p>
                  <p className="font-display text-lg uppercase">{booking.stay}</p>
                </div>
              </div>
            </div>
          </section>

          <section className="border-2 border-black bg-white p-6 space-y-6">
            <h2 className="font-display text-xl uppercase tracking-tight border-b-2 border-black pb-2">Batch Assignment</h2>
            <div className="space-y-4">
              {booking.attendance.map((day) => (
                <div key={day.date} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border-2 border-black bg-sand-50/30">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white border border-black">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest opacity-60">Day</p>
                      <p className="font-display text-sm uppercase">{day.date}</p>
                    </div>
                  </div>
                  
                  <div className="flex-1 max-w-xs">
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40" />
                      <select 
                        className="w-full pl-10 pr-4 py-2 border-2 border-black bg-white font-display text-[10px] uppercase tracking-widest focus:outline-none appearance-none"
                        value={day.batchId || ""}
                        onChange={(e) => handleAssignBatch(day.date, e.target.value)}
                      >
                        <option value="">Select Batch</option>
                        {availableBatches.map(batch => (
                          <option key={batch.id} value={batch.id}>
                            {batch.name} ({batch.instructor})
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 opacity-40 pointer-events-none" />
                    </div>
                  </div>

                  {day.batchId && (
                    <div className="flex items-center gap-2 px-3 py-1 bg-black text-white font-display text-[10px] uppercase tracking-widest">
                      <Users className="w-3 h-3" />
                      {availableBatches.find(b => b.id === day.batchId)?.capacity}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section className="border-2 border-black bg-white p-6 space-y-6">
            <h2 className="font-display text-xl uppercase tracking-tight border-b-2 border-black pb-2">Attendance</h2>
            <div className="space-y-4">
              {booking.attendance.map((day) => (
                <div key={day.date} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border-2 border-black bg-sand-50/30">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white border border-black">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest opacity-60">Day</p>
                      <p className="font-display text-sm uppercase">{day.date}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleMarkAttendance(day.date, "present")}
                      className={cn(
                        "flex items-center gap-2 px-3 py-2 border-2 border-black font-display text-[10px] uppercase tracking-widest transition-colors",
                        day.status === "present" ? "bg-green-500 text-white" : "bg-white hover:bg-green-50"
                      )}
                    >
                      <UserCheck className="w-3 h-3" />
                      Present
                    </button>
                    <button 
                      onClick={() => handleMarkAttendance(day.date, "absent")}
                      className={cn(
                        "flex items-center gap-2 px-3 py-2 border-2 border-black font-display text-[10px] uppercase tracking-widest transition-colors",
                        day.status === "absent" ? "bg-red-500 text-white" : "bg-white hover:bg-red-50"
                      )}
                    >
                      <UserX className="w-3 h-3" />
                      Absent
                    </button>
                    <button 
                      onClick={() => handleMarkAttendance(day.date, "no-show")}
                      className={cn(
                        "flex items-center gap-2 px-3 py-2 border-2 border-black font-display text-[10px] uppercase tracking-widest transition-colors",
                        day.status === "no-show" ? "bg-yellow-500 text-white" : "bg-white hover:bg-yellow-50"
                      )}
                    >
                      <UserMinus className="w-3 h-3" />
                      No-Show
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="border-2 border-black bg-white p-6 space-y-6">
            <h2 className="font-display text-xl uppercase tracking-tight border-b-2 border-black pb-2">Customer Information</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <User className="w-5 h-5 opacity-40" />
                <div>
                  <p className="text-[10px] uppercase tracking-widest opacity-60">Full Name</p>
                  <p className="font-display text-base uppercase">{booking.customer.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="w-5 h-5 opacity-40" />
                <div>
                  <p className="text-[10px] uppercase tracking-widest opacity-60">Email Address</p>
                  <p className="font-display text-base uppercase">{booking.customer.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="w-5 h-5 opacity-40" />
                <div>
                  <p className="text-[10px] uppercase tracking-widest opacity-60">Phone Number</p>
                  <p className="font-display text-base uppercase">{booking.customer.phone}</p>
                </div>
              </div>
            </div>
          </section>

          <section className="border-2 border-black bg-white overflow-hidden">
            <div className="p-4 bg-sand-50 border-b-2 border-black">
              <h2 className="font-display text-xl uppercase tracking-tight">Payment History</h2>
            </div>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-black bg-sand-50/50">
                  <th className="p-4 font-display text-[10px] uppercase tracking-widest border-r-2 border-black">Date</th>
                  <th className="p-4 font-display text-[10px] uppercase tracking-widest border-r-2 border-black">Type</th>
                  <th className="p-4 font-display text-[10px] uppercase tracking-widest border-r-2 border-black">Method</th>
                  <th className="p-4 font-display text-[10px] uppercase tracking-widest text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-black">
                {booking.paymentHistory.map((payment) => (
                  <tr key={payment.id} className="hover:bg-sand-50 transition-colors">
                    <td className="p-4 border-r-2 border-black font-display text-xs uppercase">{payment.date}</td>
                    <td className="p-4 border-r-2 border-black font-display text-xs uppercase">{payment.type}</td>
                    <td className="p-4 border-r-2 border-black font-display text-xs uppercase">{payment.method}</td>
                    <td className="p-4 font-display text-xs uppercase text-right">€{payment.amount.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>

        <div className="space-y-8">
          <section className="border-2 border-black bg-white p-6 space-y-6 sticky top-8">
            <h2 className="font-display text-xl uppercase tracking-tight border-b-2 border-black pb-2">Payment Status</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[10px] uppercase tracking-widest opacity-60">Total Amount</span>
                <span className="font-display text-lg uppercase">€{booking.pricing.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] uppercase tracking-widest opacity-60">Deposit Paid</span>
                <span className="font-display text-lg uppercase text-green-600">€{booking.pricing.deposit.toFixed(2)}</span>
              </div>
              <div className="pt-4 border-t-2 border-black flex justify-between items-center">
                <span className="font-display text-xs uppercase tracking-widest">Remaining Balance</span>
                <span className={cn(
                  "font-display text-2xl uppercase",
                  isFullyPaid ? "text-green-600" : "text-red-600"
                )}>
                  €{booking.pricing.remaining.toFixed(2)}
                </span>
              </div>
            </div>

            {isFullyPaid ? (
              <div className="flex items-center gap-3 p-4 bg-green-50 border-2 border-green-200 text-green-800">
                <CheckCircle2 className="w-5 h-5" />
                <span className="font-display text-xs uppercase tracking-widest">Fully Paid</span>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 bg-yellow-50 border-2 border-yellow-200 text-yellow-800">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span className="font-display text-[10px] uppercase tracking-widest leading-tight">
                    Balance of €{booking.pricing.remaining.toFixed(2)} is due on arrival.
                  </span>
                </div>
                <button 
                  onClick={handleMarkAsPaid}
                  disabled={isProcessing}
                  className="w-full py-4 bg-black text-white font-display text-xs uppercase tracking-widest hover:bg-accent transition-colors disabled:opacity-50"
                >
                  {isProcessing ? "Processing..." : "Mark Remaining Paid"}
                </button>
              </div>
            )}

            <div className="pt-6 space-y-3">
              <button className="w-full py-3 border-2 border-black bg-white font-display text-[10px] uppercase tracking-widest hover:bg-sand-100 transition-colors">
                Resend Confirmation
              </button>
              <button className="w-full py-3 border-2 border-black bg-white font-display text-[10px] uppercase tracking-widest text-red-600 hover:bg-red-50 transition-colors">
                Cancel Booking
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
