
import { useState } from "react";
import { 
  Search, 
  Filter, 
  Calendar as CalendarIcon, 
  ChevronDown, 
  MoreHorizontal,
  ArrowUpDown,
  Download,
  Plus
} from "lucide-react";
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
    course: "Beginner Lesson",
    stay: "1 Day",
    status: "Confirmed",
    amount: "$85.00",
  },
  {
    id: "BK-002",
    date: "2026-03-15",
    name: "Sarah Smith",
    email: "sarah@example.com",
    course: "Intermediate Surf",
    stay: "3 Days",
    status: "Pending",
    amount: "$240.00",
  },
  {
    id: "BK-003",
    date: "2026-03-16",
    name: "Mike Johnson",
    email: "mike@example.com",
    course: "Private Coaching",
    stay: "1 Day",
    status: "Cancelled",
    amount: "$120.00",
  },
  {
    id: "BK-004",
    date: "2026-03-17",
    name: "Emma Wilson",
    email: "emma@example.com",
    course: "Beginner Lesson",
    stay: "5 Days",
    status: "Confirmed",
    amount: "$380.00",
  },
  {
    id: "BK-005",
    date: "2026-03-18",
    name: "David Brown",
    email: "david@example.com",
    course: "Surf Camp",
    stay: "7 Days",
    status: "Confirmed",
    amount: "$550.00",
  },
  {
    id: "BK-006",
    date: "2026-03-19",
    name: "Lisa Garcia",
    email: "lisa@example.com",
    course: "Intermediate Surf",
    stay: "2 Days",
    status: "Pending",
    amount: "$160.00",
  },
];

const statusColors = {
  Confirmed: "bg-green-100 text-green-800 border-green-200",
  Pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
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
    <div className="p-8 space-y-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="font-display text-5xl uppercase tracking-tighter">Bookings</h1>
          <p className="font-display text-sm uppercase tracking-widest opacity-60">Manage your surf school reservations</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border-2 border-black bg-white font-display text-xs uppercase tracking-widest hover:bg-sand-100 transition-colors">
            <Download className="w-4 h-4" />
            Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border-2 border-black bg-black text-white font-display text-xs uppercase tracking-widest hover:bg-accent transition-colors">
            <Plus className="w-4 h-4" />
            New Booking
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-2 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40" />
          <input 
            type="text" 
            placeholder="Search by name or ID..."
            className="w-full pl-12 pr-4 py-3 border-2 border-black bg-white font-display text-sm uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-accent/20"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40" />
          <select 
            className="w-full pl-12 pr-4 py-3 border-2 border-black bg-white font-display text-sm uppercase tracking-widest focus:outline-none appearance-none"
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
            className="w-full pl-12 pr-4 py-3 border-2 border-black bg-white font-display text-sm uppercase tracking-widest focus:outline-none"
          />
        </div>
      </div>

      <div className="border-2 border-black bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-black bg-sand-50">
                <th className="p-4 font-display text-xs uppercase tracking-widest border-r-2 border-black">
                  <div className="flex items-center gap-2">
                    Date <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="p-4 font-display text-xs uppercase tracking-widest border-r-2 border-black">Customer</th>
                <th className="p-4 font-display text-xs uppercase tracking-widest border-r-2 border-black">Course</th>
                <th className="p-4 font-display text-xs uppercase tracking-widest border-r-2 border-black">Stay</th>
                <th className="p-4 font-display text-xs uppercase tracking-widest border-r-2 border-black">Status</th>
                <th className="p-4 font-display text-xs uppercase tracking-widest border-r-2 border-black text-right">Amount</th>
                <th className="p-4 font-display text-xs uppercase tracking-widest"></th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-black">
              {filteredBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-sand-50 transition-colors group">
                  <td className="p-4 border-r-2 border-black">
                    <div className="font-display text-sm uppercase">{booking.date}</div>
                    <div className="text-[10px] opacity-40 uppercase tracking-tighter">{booking.id}</div>
                  </td>
                  <td className="p-4 border-r-2 border-black">
                    <div className="font-display text-sm uppercase">{booking.name}</div>
                    <div className="text-xs opacity-60">{booking.email}</div>
                  </td>
                  <td className="p-4 border-r-2 border-black">
                    <div className="font-display text-sm uppercase">{booking.course}</div>
                  </td>
                  <td className="p-4 border-r-2 border-black">
                    <div className="font-display text-sm uppercase">{booking.stay}</div>
                  </td>
                  <td className="p-4 border-r-2 border-black">
                    <span className={cn(
                      "px-2 py-1 border font-display text-[10px] uppercase tracking-widest",
                      statusColors[booking.status as keyof typeof statusColors]
                    )}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="p-4 border-r-2 border-black text-right">
                    <div className="font-display text-sm uppercase">{booking.amount}</div>
                  </td>
                  <td className="p-4 text-center">
                    <button className="p-2 hover:bg-black hover:text-white transition-colors border border-transparent hover:border-black">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredBookings.length === 0 && (
          <div className="p-12 text-center space-y-4">
            <div className="font-display text-xl uppercase opacity-40">No bookings found</div>
            <button 
              onClick={() => {setSearchQuery(""); setStatusFilter("All");}}
              className="font-display text-xs uppercase tracking-widest underline hover:text-accent"
            >
              Clear all filters
            </button>
          </div>
        )}
        <div className="p-4 border-t-2 border-black bg-sand-50 flex justify-between items-center">
          <span className="font-display text-[10px] uppercase tracking-widest opacity-60">
            Showing {filteredBookings.length} of {bookings.length} bookings
          </span>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-black bg-white font-display text-[10px] uppercase tracking-widest disabled:opacity-30" disabled>Prev</button>
            <button className="px-3 py-1 border border-black bg-white font-display text-[10px] uppercase tracking-widest">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
