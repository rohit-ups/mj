import { motion } from "framer-motion";
import { useState } from "react";
import { 
  Search, 
  Filter, 
  Calendar as CalendarIcon, 
  ChevronDown, 
  MoreHorizontal,
  ArrowUpDown,
  Download,
  Plus,
  ArrowRight,
  User,
  CreditCard,
  History
} from "lucide-react";
import { Link } from "react-router-dom";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const bookings = [
  {
    id: "BK-001",
    date: "2026-03-14",
    name: "John Doe",
    email: "john@example.com",
    course: "3-Day Mambo Jambo",
    stay: "AC Dorm Bed",
    status: "Confirmed",
    amount: "₹6,000",
    payment: "Partial"
  },
  {
    id: "BK-002",
    date: "2026-03-15",
    name: "Sarah Smith",
    email: "sarah@example.com",
    course: "5-Day Mambo Jambo",
    stay: "AC Dorm Bed",
    status: "Pending",
    amount: "₹9,700",
    payment: "Unpaid"
  },
  {
    id: "BK-003",
    date: "2026-03-16",
    name: "Mike Johnson",
    email: "mike@example.com",
    course: "7-Day Mambo Jambo",
    stay: "Non-AC Dorm Bed",
    status: "Cancelled",
    amount: "₹13,700",
    payment: "Refunded"
  },
  {
    id: "BK-004",
    date: "2026-03-17",
    name: "Emma Wilson",
    email: "emma@example.com",
    course: "3-Day Mambo Jambo",
    stay: "AC Dorm Bed",
    status: "Confirmed",
    amount: "₹6,000",
    payment: "Full"
  }
];

const statusStyles = {
  Confirmed: "bg-green-100 text-green-800 border-green-200",
  Pending: "bg-mj-yellow text-black border-black",
  Cancelled: "bg-red-100 text-red-800 border-red-200",
};

export default function BookingsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch = booking.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         booking.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
          <h1 className="font-display text-6xl uppercase tracking-tighter leading-none">Reservations</h1>
          <p className="font-mono text-xs uppercase tracking-widest opacity-60">Database / Incoming Transmissions</p>
        </div>
        <div className="flex gap-4">
          <button className="brutalist-button px-6 py-3 text-xs flex items-center gap-2">
            <Download className="w-4 h-4" /> Export CSV
          </button>
          <button className="brutalist-button px-6 py-3 text-xs bg-black text-white flex items-center gap-2">
            <Plus className="w-4 h-4" /> New Intake
          </button>
        </div>
      </header>

      {/* FILTER TERMINAL */}
      <div className="brutalist-border bg-white p-6 brutalist-shadow-sm grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-2 relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40 group-focus-within:text-mj-accent transition-colors" />
          <input 
            type="text" 
            placeholder="Search Identifier / Name..."
            className="w-full pl-12 pr-4 py-4 border-2 border-black bg-[#f5f5f5] font-mono text-xs uppercase focus:bg-white outline-none transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40" />
          <select 
            className="w-full pl-12 pr-4 py-4 border-2 border-black bg-[#f5f5f5] font-mono text-xs uppercase focus:bg-white outline-none appearance-none cursor-pointer"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Pending">Pending</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40 pointer-events-none" />
        </div>
        <div className="relative">
          <CalendarIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40" />
          <input 
            type="date" 
            className="w-full pl-12 pr-4 py-4 border-2 border-black bg-[#f5f5f5] font-mono text-xs uppercase focus:bg-white outline-none"
          />
        </div>
      </div>

      {/* BOOKINGS GRID */}
      <div className="grid grid-cols-1 gap-6">
        {filteredBookings.map((booking, i) => (
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            key={booking.id}
            className="brutalist-border bg-white brutalist-shadow-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all group"
          >
            <div className="flex flex-col lg:flex-row divide-y-2 lg:divide-y-0 lg:divide-x-2 divide-black">
              {/* ID & STATUS */}
              <div className="p-6 lg:w-48 bg-[#f5f5f5] flex flex-col justify-between gap-4">
                <span className="font-mono text-[10px] font-bold opacity-40 uppercase">UID: {booking.id}</span>
                <span className={cn(
                  "px-3 py-1 border-2 border-black font-display text-[10px] uppercase font-black text-center",
                  statusStyles[booking.status as keyof typeof statusStyles]
                )}>
                  {booking.status}
                </span>
              </div>

              {/* CUSTOMER */}
              <div className="p-6 flex-1 flex items-center gap-6">
                <div className="w-12 h-12 brutalist-border bg-mj-yellow flex items-center justify-center shrink-0">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-display text-2xl uppercase tracking-tighter leading-none group-hover:text-mj-accent transition-colors">{booking.name}</h3>
                  <p className="font-mono text-[10px] opacity-60 uppercase mt-1">{booking.email}</p>
                </div>
              </div>

              {/* DETAILS */}
              <div className="p-6 flex-1 grid grid-cols-2 gap-4 items-center">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 opacity-40">
                    <History className="w-3 h-3" />
                    <span className="font-mono text-[9px] uppercase font-bold">Package</span>
                  </div>
                  <p className="font-display text-xs uppercase">{booking.course}</p>
                </div>
                <div className="space-y-1 border-l-2 border-black/10 pl-4">
                  <div className="flex items-center gap-2 opacity-40">
                    <CalendarIcon className="w-3 h-3" />
                    <span className="font-mono text-[9px] uppercase font-bold">Start Sequence</span>
                  </div>
                  <p className="font-display text-xs uppercase">{booking.date}</p>
                </div>
              </div>

              {/* FINANCIALS */}
              <div className="p-6 lg:w-64 flex flex-col justify-center gap-2 bg-sand-50/50">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-[9px] uppercase font-bold opacity-40">Total</span>
                  <span className="font-display text-xl font-black">{booking.amount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-mono text-[9px] uppercase font-bold opacity-40">Payment</span>
                  <span className="px-2 py-0.5 bg-black text-white font-mono text-[9px] uppercase font-bold">{booking.payment}</span>
                </div>
              </div>

              {/* ACTION */}
              <Link 
                to={`/bookings/${booking.id}`}
                className="p-6 lg:w-20 flex items-center justify-center bg-white hover:bg-mj-accent hover:text-white transition-colors border-t-2 lg:border-t-0"
              >
                <ArrowRight className="w-6 h-6" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredBookings.length === 0 && (
        <div className="brutalist-border border-dashed p-20 text-center space-y-4 opacity-40">
          <Activity className="w-12 h-12 mx-auto" />
          <p className="font-display text-2xl uppercase">No records found in current sector</p>
        </div>
      )}

      {/* PAGINATION */}
      <footer className="flex justify-between items-center pt-10">
        <span className="font-mono text-[10px] uppercase font-bold opacity-40 italic">Sector Trace: 1-{filteredBookings.length} of {bookings.length}</span>
        <div className="flex gap-4">
          <button className="brutalist-button px-4 py-2 text-[10px] disabled:opacity-20" disabled>PREV_BLOCK</button>
          <button className="brutalist-button px-4 py-2 text-[10px]">NEXT_BLOCK</button>
        </div>
      </footer>
    </div>
  );
}
