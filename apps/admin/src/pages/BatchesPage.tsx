import { useState, useEffect } from "react";
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
  Loader2,
  X,
  Save,
  Edit2
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const API_URL = "http://localhost:4000";

export default function BatchesPage() {
  const [batches, setBatches] = useState<any[]>([]);
  const [instructors, setInstructors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBatchId, setSelectedBatchId] = useState<string | null>(null);
  const [showEditModal, setShowAddModal] = useState(false);
  const [editForm, setEditForm] = useState<any>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [bRes, iRes] = await Promise.all([
        fetch(`${API_URL}/bookings/batches`),
        fetch(`${API_URL}/management/instructors`)
      ]);
      const bData = await bRes.json();
      const iData = await iRes.json();
      setBatches(bData);
      setInstructors(iData);
      if (bData.length > 0 && !selectedBatchId) {
        setSelectedBatchId(bData[0].id);
      }
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const handleUpdateBatch = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement PUT /management/batches/:id in API
    console.log("Update batch:", editForm);
    setShowAddModal(false);
  };

  const selectedBatch = batches.find(b => b.id === selectedBatchId) || batches[0];

  if (loading) return <div className="p-8 font-mono text-xs animate-pulse uppercase text-center mt-20">Accessing Sector Data...</div>;

  return (
    <div className="p-8 space-y-10 max-w-7xl mx-auto pb-20">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
          <h1 className="font-display text-6xl uppercase tracking-tighter leading-none">Session <span className="text-mj-accent">Control</span></h1>
          <p className="font-display text-sm uppercase tracking-widest opacity-60">Batch Management / Instructor Assignment</p>
        </div>
        <button className="brutalist-button px-8 py-4 bg-black text-white flex items-center gap-3">
          <Zap className="w-5 h-5 text-mj-yellow" />
          <span>Sync Session</span>
        </button>
      </header>

      {/* EDIT MODAL */}
      <AnimatePresence>
        {showEditModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm font-sans text-mj-black">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-xl bg-white border-[3px] border-black brutalist-shadow p-10 space-y-8"
            >
              <div className="flex justify-between items-center border-b-[3px] border-black pb-4">
                <h2 className="font-display text-3xl uppercase tracking-tighter font-black">Edit Sector</h2>
                <button onClick={() => setShowAddModal(false)} className="hover:text-mj-accent transition-colors">
                  <X className="w-8 h-8" />
                </button>
              </div>

              <form onSubmit={handleUpdateBatch} className="space-y-6">
                <div className="space-y-2">
                  <label className="font-mono text-[10px] font-black uppercase tracking-widest block opacity-60">Sector Name</label>
                  <input 
                    required
                    className="w-full border-[3px] border-black p-4 focus:bg-sand-50 outline-none font-display text-sm uppercase font-bold"
                    value={editForm?.name}
                    onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-mono text-[10px] font-black uppercase tracking-widest block opacity-60">Lead Instructor</label>
                  <select 
                    required
                    className="w-full border-[3px] border-black p-4 focus:bg-sand-50 outline-none font-display text-xs uppercase font-bold appearance-none"
                    value={editForm?.instructorId}
                    onChange={e => setEditForm({ ...editForm, instructorId: e.target.value })}
                  >
                    {instructors.map(i => <option key={i.id} value={i.id}>{i.name}</option>)}
                  </select>
                </div>
                <button 
                  type="submit"
                  className="w-full brutalist-button bg-mj-black text-white py-6 text-xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-none"
                >
                  SAVE MANIFEST
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* SIDEBAR */}
        <div className="lg:col-span-4 space-y-6">
          <div className="space-y-4">
            {batches.map((batch) => (
              <button
                key={batch.id}
                onClick={() => setSelectedBatchId(batch.id)}
                className={cn(
                  "w-full text-left p-6 border-[3px] border-black transition-all relative group",
                  selectedBatchId === batch.id 
                    ? "bg-mj-black text-white translate-x-1 translate-y-1 shadow-none" 
                    : "bg-white hover:bg-sand-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                )}
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="font-mono text-[10px] font-black opacity-40 uppercase tracking-widest">ID: {batch.id}</span>
                  <div className="bg-mj-yellow text-mj-black px-2 py-0.5 border border-black font-display text-[10px] font-black">
                    {new Date(batch.startDate).toLocaleDateString()}
                  </div>
                </div>
                <h3 className="font-display text-2xl uppercase tracking-tighter leading-none mb-2">{batch.name}</h3>
                <p className="font-mono text-[10px] uppercase font-bold opacity-60 italic">{batch.instructor?.name}</p>
              </button>
            ))}
          </div>
        </div>

        {/* MAIN CONSOLE */}
        <div className="lg:col-span-8">
          {selectedBatch && (
            <motion.div 
              layoutId="console"
              className="brutalist-border bg-white p-10 brutalist-shadow space-y-10"
            >
              <div className="flex flex-col md:flex-row justify-between gap-8 border-b-[3px] border-black pb-8">
                <div className="space-y-4">
                  <h2 className="font-display text-5xl uppercase tracking-tighter font-black leading-none">{selectedBatch.name}</h2>
                  <div className="flex flex-wrap gap-6 font-mono text-[10px] font-black uppercase">
                    <div className="flex items-center gap-2 bg-sand-50 px-3 py-1 brutalist-border">
                      <User className="w-3 h-3 text-mj-accent" />
                      <span>{selectedBatch.instructor?.name}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-sand-50 px-3 py-1 brutalist-border">
                      <Clock className="w-3 h-3 text-mj-accent" />
                      <span>{new Date(selectedBatch.startDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - {new Date(selectedBatch.endDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    setEditForm({ ...selectedBatch });
                    setShowAddModal(true);
                  }}
                  className="brutalist-button px-6 py-2 text-xs bg-mj-yellow flex items-center gap-2 self-start"
                >
                  <Edit2 className="w-4 h-4" /> Edit Batch
                </button>
              </div>

              <div className="space-y-6">
                <h3 className="font-display text-2xl uppercase tracking-widest flex items-center gap-3">
                  <Users className="w-6 h-6 text-mj-blue" />
                  Assigned Units
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  {/* Since Batch model in schema doesn't directly have bookings, 
                      this would usually involve a join table or filter. 
                      Displaying a placeholder list for now. */}
                  <div className="border-2 border-dashed border-black/20 p-12 text-center space-y-4">
                    <p className="font-mono text-xs uppercase font-bold opacity-40 italic text-mj-black">No student units assigned to this session window yet.</p>
                    <button className="brutalist-button px-6 py-2 text-[10px]">Assign from Registry</button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
