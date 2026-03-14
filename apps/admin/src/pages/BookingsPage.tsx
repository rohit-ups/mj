import React, { useState, useMemo, useEffect } from "react";
import { 
  Search, 
  Filter, 
  Calendar as CalendarIcon, 
  ChevronDown, 
  MoreHorizontal,
  ArrowUpDown,
  Download,
  Plus,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  X
} from "lucide-react";
import { 
  useReactTable, 
  getCoreRowModel, 
  getFilteredRowModel, 
  getSortedRowModel, 
  getPaginationRowModel,
  flexRender,
  createColumnHelper,
  SortingState
} from "@tanstack/react-table";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type Booking = {
  id: string;
  date: string;
  name: string;
  email: string;
  course: string;
  stay: string;
  status: "Confirmed" | "Pending" | "Cancelled";
  amount: string;
};

const statusColors = {
  Confirmed: "bg-green-100 text-green-800 border-green-200",
  Pending: "bg-mj-yellow text-black border-black",
  Cancelled: "bg-red-100 text-red-800 border-red-200",
};

const ActionMenu = ({ bookingId }: { bookingId: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-black hover:text-white transition-colors border border-transparent hover:border-black rounded-full"
      >
        <MoreHorizontal className="w-4 h-4" />
      </button>
      
      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-48 bg-white border-2 border-black brutalist-shadow-sm z-20 overflow-hidden">
            <Link to={`/bookings/${bookingId}`} className="flex items-center gap-2 px-4 py-2 text-[10px] uppercase font-bold hover:bg-sand-50 border-b border-black/10">
              <Eye className="w-3 h-3" /> View Details
            </Link>
            <button className="w-full flex items-center gap-2 px-4 py-2 text-[10px] uppercase font-bold hover:bg-sand-50 border-b border-black/10 text-left">
              <Edit className="w-3 h-3" /> Edit Booking
            </button>
            <button className="w-full flex items-center gap-2 px-4 py-2 text-[10px] uppercase font-bold hover:bg-sand-50 border-b border-black/10 text-green-600 text-left">
              <CheckCircle className="w-3 h-3" /> Confirm
            </button>
            <button className="w-full flex items-center gap-2 px-4 py-2 text-[10px] uppercase font-bold hover:bg-sand-50 border-b border-black/10 text-yellow-600 text-left">
              <Clock className="w-3 h-3" /> Mark Pending
            </button>
            <button className="w-full flex items-center gap-2 px-4 py-2 text-[10px] uppercase font-bold hover:bg-red-50 text-red-600 text-left">
              <Trash2 className="w-3 h-3" /> Cancel
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default function BookingsPage() {
  const [bookingsData, setBookingsData] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newIntake, setNewIntake] = useState({
    customerName: "",
    customerEmail: "",
    startDate: "",
    courseId: "",
    stayOptionId: ""
  });

  const [metadata, setMetadata] = useState<{ courses: any[], stayOptions: any[] }>({
    courses: [],
    stayOptions: []
  });

  useEffect(() => {
    fetchData();
    fetchMetadata();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch('http://localhost:4000/bookings');
      if (res.ok) {
        const data = await res.json();
        // Transform for display
        const transformed = data.map((b: any) => ({
          id: b.id,
          date: new Date(b.startDate).toLocaleDateString(),
          name: b.customerName,
          email: b.customerEmail,
          course: b.course?.name || "N/A",
          stay: b.stayOption?.name || "N/A",
          status: b.status.charAt(0).toUpperCase() + b.status.slice(1),
          amount: `₹${b.totalPrice.toLocaleString()}`
        }));
        setBookingsData(transformed);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const fetchMetadata = async () => {
    try {
      const [cRes, sRes] = await Promise.all([
        fetch('http://localhost:4000/management/courses'),
        fetch('http://localhost:4000/management/properties')
      ]);
      const courses = await cRes.json();
      const properties = await sRes.json();
      const stayOptions = properties.flatMap((p: any) => p.stayOptions);
      setMetadata({ courses, stayOptions });
    } catch (e) { console.error(e); }
  };

  const handleCreateIntake = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Calculate end date (simplified for now as start + 3 days)
      const end = new Date(newIntake.startDate);
      end.setDate(end.getDate() + 3);

      const res = await fetch('http://localhost:4000/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newIntake,
          startDate: new Date(newIntake.startDate).toISOString(),
          endDate: end.toISOString()
        })
      });
      if (res.ok) {
        await fetchData();
        setShowAddModal(false);
        setNewIntake({ customerName: "", customerEmail: "", startDate: "", courseId: "", stayOptionId: "" });
      }
    } catch (e) { console.error(e); }
  };

  const columnHelper = createColumnHelper<Booking>();

  const columns = useMemo(() => [
    columnHelper.accessor("date", {
      header: ({ column }) => (
        <button className="flex items-center gap-2 hover:text-accent" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          DATE <ArrowUpDown className="w-3 h-3" />
        </button>
      ),
      cell: info => (
        <div className="flex flex-col">
          <span className="font-display text-sm uppercase font-bold tracking-tight">{info.getValue()}</span>
          <span className="text-[10px] opacity-40 uppercase tracking-tighter">{info.row.original.id}</span>
        </div>
      ),
    }),
    columnHelper.accessor("name", {
      header: "CUSTOMER",
      cell: info => (
        <div className="flex flex-col">
          <span className="font-display text-sm uppercase font-bold tracking-tight">{info.getValue()}</span>
          <span className="text-xs opacity-60 font-mono">{info.row.original.email}</span>
        </div>
      ),
    }),
    columnHelper.accessor("course", {
      header: "COURSE",
      cell: info => <span className="font-display text-sm uppercase">{info.getValue()}</span>,
    }),
    columnHelper.accessor("stay", {
      header: "STAY",
      cell: info => <span className="font-display text-sm uppercase">{info.getValue()}</span>,
    }),
    columnHelper.accessor("status", {
      header: "STATUS",
      cell: info => (
        <span className={cn(
          "px-2 py-1 border font-display text-[10px] uppercase tracking-widest font-black text-center block w-fit",
          statusColors[info.getValue() as keyof typeof statusColors]
        )}>
          {info.getValue()}
        </span>
      ),
    }),
    columnHelper.accessor("amount", {
      header: () => <div className="text-right">AMOUNT</div>,
      cell: info => <div className="text-right font-display text-sm font-black italic">{info.getValue()}</div>,
    }),
    columnHelper.display({
      id: "actions",
      cell: info => <ActionMenu bookingId={info.row.original.id} />,
    }),
  ], []);

  const table = useReactTable({
    data: bookingsData,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const exportCSV = () => {
    const headers = ["ID", "Date", "Name", "Email", "Course", "Stay", "Status", "Amount"];
    const rows = bookingsData.map(b => [b.id, b.date, b.name, b.email, b.course, b.stay, b.status, b.amount]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "mambojambo_bookings.csv");
    document.body.appendChild(link);
    link.click();
  };

  if (loading) return <div className="p-8 font-mono text-xs animate-pulse uppercase text-center mt-20">Scanning Reservations...</div>;

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto pb-20">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
          <h1 className="font-display text-6xl uppercase tracking-tighter leading-none">Reservations</h1>
          <p className="font-display text-sm uppercase tracking-widest opacity-60">Database / Incoming Transmissions</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={exportCSV}
            className="brutalist-button px-6 py-3 text-xs flex items-center gap-2"
          >
            <Download className="w-4 h-4" /> EXPORT_CSV
          </button>
          <button 
            onClick={() => setShowAddModal(true)}
            className="brutalist-button px-6 py-3 text-xs bg-black text-white flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> NEW_INTAKE
          </button>
        </div>
      </header>

      {/* NEW INTAKE MODAL */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm font-sans">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-2xl bg-white border-[3px] border-black brutalist-shadow p-10 space-y-8"
            >
              <div className="flex justify-between items-center border-b-[3px] border-black pb-4">
                <h2 className="font-display text-3xl uppercase tracking-tighter font-black">Manual Intake</h2>
                <button onClick={() => setShowAddModal(false)} className="hover:text-mj-accent transition-colors">
                  <X className="w-8 h-8" />
                </button>
              </div>

              <form onSubmit={handleCreateIntake} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="font-mono text-[10px] font-black uppercase tracking-widest block opacity-60">Customer Name</label>
                    <input 
                      required
                      className="w-full border-[3px] border-black p-4 focus:bg-sand-50 outline-none font-display text-sm uppercase font-bold"
                      value={newIntake.customerName}
                      onChange={e => setNewIntake({ ...newIntake, customerName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="font-mono text-[10px] font-black uppercase tracking-widest block opacity-60">Email Address</label>
                    <input 
                      type="email"
                      required
                      className="w-full border-[3px] border-black p-4 focus:bg-sand-50 outline-none font-mono text-xs uppercase"
                      value={newIntake.customerEmail}
                      onChange={e => setNewIntake({ ...newIntake, customerEmail: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="font-mono text-[10px] font-black uppercase tracking-widest block opacity-60">Start Date</label>
                    <input 
                      type="date"
                      required
                      className="w-full border-[3px] border-black p-4 focus:bg-sand-50 outline-none font-mono text-xs uppercase"
                      value={newIntake.startDate}
                      onChange={e => setNewIntake({ ...newIntake, startDate: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="font-mono text-[10px] font-black uppercase tracking-widest block opacity-60">Course / Flow</label>
                    <select 
                      required
                      className="w-full border-[3px] border-black p-4 focus:bg-sand-50 outline-none font-display text-xs uppercase font-bold appearance-none"
                      value={newIntake.courseId}
                      onChange={e => setNewIntake({ ...newIntake, courseId: e.target.value })}
                    >
                      <option value="">Select Package</option>
                      {metadata.courses.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="font-mono text-[10px] font-black uppercase tracking-widest block opacity-60">Stay Allocation</label>
                    <select 
                      required
                      className="w-full border-[3px] border-black p-4 focus:bg-sand-50 outline-none font-display text-xs uppercase font-bold appearance-none"
                      value={newIntake.stayOptionId}
                      onChange={e => setNewIntake({ ...newIntake, stayOptionId: e.target.value })}
                    >
                      <option value="">Select Stay</option>
                      {metadata.stayOptions.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                    </select>
                  </div>
                  <button 
                    type="submit"
                    className="w-full brutalist-button bg-mj-accent text-white py-8 text-xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-none mt-4"
                  >
                    COMMIT INTAKE
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* FILTERS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 brutalist-border bg-white p-6 brutalist-shadow-sm">
        <div className="md:col-span-2 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40" />
          <input 
            type="text" 
            placeholder="Search Identifier / Name..."
            className="w-full pl-12 pr-4 py-4 border-2 border-black bg-sand-50/30 font-mono text-xs uppercase focus:bg-white outline-none transition-all"
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40" />
          <select 
            className="w-full pl-12 pr-4 py-4 border-2 border-black bg-sand-50/30 font-mono text-xs uppercase focus:bg-white outline-none appearance-none cursor-pointer"
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
            className="w-full pl-12 pr-4 py-4 border-2 border-black bg-sand-50/30 font-mono text-xs uppercase focus:bg-white outline-none"
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="border-[3px] border-black bg-white overflow-hidden brutalist-shadow">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id} className="border-b-[3px] border-black bg-[#f5f5f5]">
                  {headerGroup.headers.map(header => (
                    <th key={header.id} className="p-6 font-display text-[10px] uppercase tracking-widest border-r-[3px] border-black last:border-r-0">
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y-[2px] divide-black">
              {table.getRowModel().rows.map(row => (
                <tr key={row.id} className="hover:bg-sand-50 transition-colors group">
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className="p-6 border-r-[3px] border-black last:border-r-0">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {table.getRowModel().rows.length === 0 && (
          <div className="p-20 text-center space-y-4 opacity-20">
            <Search className="w-12 h-12 mx-auto" />
            <p className="font-display text-2xl uppercase">No records found in sector</p>
          </div>
        )}

        <div className="p-6 border-t-[3px] border-black bg-[#f5f5f5] flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="font-mono text-[10px] uppercase font-black opacity-40 italic">
            Sector Trace: {table.getState().pagination.pageIndex + 1} of {table.getPageCount()} blocks
          </span>
          <div className="flex gap-4">
            <button 
              className="brutalist-button px-4 py-2 text-[10px] disabled:opacity-20 shadow-none active:translate-y-0"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              PREV_BLOCK
            </button>
            <button 
              className="brutalist-button px-4 py-2 text-[10px] disabled:opacity-20 shadow-none active:translate-y-0"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              NEXT_BLOCK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
