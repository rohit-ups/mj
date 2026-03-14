import { useState, useEffect } from "react";
import { Search, Plus, Edit2, Trash2, Save, X, Package as PackageIcon, Loader2 } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const API_URL = "http://localhost:4000/management";

export default function PackagesPage() {
  const [packages, setPackages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<any>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPkgForm, setNewPkgForm] = useState({
    name: "",
    description: "",
    price: 0,
    duration: 0,
    maxStudents: 14
  });

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const res = await fetch(`${API_URL}/courses`);
      if (!res.ok) throw new Error(`API Error: ${res.status} ${res.statusText}`);
      const data = await res.json();
      setPackages(data);
    } catch (error: any) {
      console.error("Failed to fetch packages:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (pkg: any) => {
    setIsEditing(pkg.id);
    setEditForm({ ...pkg });
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`${API_URL}/courses/${isEditing}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });
      if (res.ok) {
        await fetchPackages();
        setIsEditing(null);
        setEditForm(null);
      }
    } catch (error) {
      console.error("Failed to save package:", error);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/courses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPkgForm),
      });
      if (res.ok) {
        await fetchPackages();
        setShowAddForm(false);
        setNewPkgForm({ name: "", description: "", price: 0, duration: 0, maxStudents: 14 });
      }
    } catch (error) {
      console.error("Failed to create package:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this package?")) {
      try {
        const res = await fetch(`${API_URL}/courses/${id}`, { method: "DELETE" });
        if (res.ok) fetchPackages();
      } catch (error) {
        console.error("Failed to delete package:", error);
      }
    }
  };

  const filteredPackages = (packages || []).filter(p => 
    p.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <div className="p-8 font-mono text-xs animate-pulse uppercase text-center mt-20">Fetching Data Matrix...</div>;

  return (
    <div className="p-8 space-y-8 max-w-6xl mx-auto pb-20">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="font-display text-5xl uppercase tracking-tighter leading-none text-mj-black">Packages</h1>
          <p className="font-display text-sm uppercase tracking-widest opacity-60 mt-2">Configure course offerings and pricing</p>
        </div>
        <button 
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 px-8 py-4 border-[3px] border-black bg-mj-black text-white font-display text-xs uppercase tracking-widest hover:bg-mj-accent transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none"
        >
          <Plus className="w-5 h-5" />
          Create Package
        </button>
      </header>

      {/* CREATE MODAL */}
      {showAddForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm font-sans">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-xl bg-white border-[3px] border-black brutalist-shadow p-10 space-y-8"
          >
            <div className="flex justify-between items-center border-b-[3px] border-black pb-4">
              <h2 className="font-display text-3xl uppercase tracking-tighter font-black">New Package</h2>
              <button onClick={() => setShowAddForm(false)} className="hover:text-mj-accent transition-colors">
                <X className="w-8 h-8" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-6">
              <div className="space-y-2">
                <label className="font-mono text-[10px] font-black uppercase tracking-widest block opacity-60">Package Name</label>
                <input 
                  required
                  className="w-full border-[3px] border-black p-4 focus:bg-sand-50 outline-none font-display text-sm uppercase font-bold"
                  placeholder="e.g. 10-DAY MASTERY QUEST"
                  value={newPkgForm.name}
                  onChange={e => setNewPkgForm({ ...newPkgForm, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="font-mono text-[10px] font-black uppercase tracking-widest block opacity-60">Manifest Description</label>
                <textarea 
                  required
                  className="w-full border-[3px] border-black p-4 focus:bg-sand-50 outline-none text-sm h-32 italic"
                  placeholder="What's included in this flow?"
                  value={newPkgForm.description}
                  onChange={e => setNewPkgForm({ ...newPkgForm, description: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="font-mono text-[10px] font-black uppercase tracking-widest block opacity-60">Price (INR)</label>
                  <input 
                    type="number"
                    required
                    className="w-full border-[3px] border-black p-4 focus:bg-sand-50 outline-none font-mono"
                    value={newPkgForm.price}
                    onChange={e => setNewPkgForm({ ...newPkgForm, price: parseFloat(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-mono text-[10px] font-black uppercase tracking-widest block opacity-60">Duration (Min)</label>
                  <input 
                    type="number"
                    required
                    className="w-full border-[3px] border-black p-4 focus:bg-sand-50 outline-none font-mono"
                    value={newPkgForm.duration}
                    onChange={e => setNewPkgForm({ ...newPkgForm, duration: parseInt(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-mono text-[10px] font-black uppercase tracking-widest block opacity-60">Unit Cap</label>
                  <input 
                    type="number"
                    required
                    className="w-full border-[3px] border-black p-4 focus:bg-sand-50 outline-none font-mono"
                    value={newPkgForm.maxStudents}
                    onChange={e => setNewPkgForm({ ...newPkgForm, maxStudents: parseInt(e.target.value) })}
                  />
                </div>
              </div>
              <button 
                type="submit"
                className="w-full brutalist-button bg-mj-accent text-white py-6 text-xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-none"
              >
                INITIALIZE PACKAGE
              </button>
            </form>
          </motion.div>
        </div>
      )}

      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-40 group-focus-within:text-mj-accent transition-all" />
        <input 
          type="text" 
          placeholder="FILTER PACKAGE DATA..."
          className="w-full pl-14 pr-4 py-5 border-[3px] border-black bg-white font-mono text-xs uppercase outline-none focus:bg-sand-50 transition-all brutalist-shadow-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="border-[3px] border-black bg-white overflow-hidden shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b-[3px] border-black bg-[#f5f5f5]">
              <th className="p-6 font-display text-[10px] uppercase tracking-[0.2em] border-r-[3px] border-black w-1/3">Name & Manifest</th>
              <th className="p-6 font-display text-[10px] uppercase tracking-[0.2em] border-r-[3px] border-black text-center">Value</th>
              <th className="p-6 font-display text-[10px] uppercase tracking-[0.2em] border-r-[3px] border-black text-center">Time</th>
              <th className="p-6 font-display text-[10px] uppercase tracking-[0.2em] border-r-[3px] border-black text-center">Cap</th>
              <th className="p-6 font-display text-[10px] uppercase tracking-[0.2em] text-center w-32">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y-[2px] divide-black">
            {filteredPackages.map((pkg) => (
              <tr key={pkg.id} className="hover:bg-sand-50 transition-colors">
                <td className="p-6 border-r-[3px] border-black">
                  {isEditing === pkg.id ? (
                    <div className="space-y-4">
                      <input 
                        className="w-full border-2 border-black p-3 text-sm font-black uppercase font-display bg-white"
                        value={editForm.name}
                        onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                      />
                      <textarea 
                        className="w-full border-2 border-black p-3 text-xs h-24 italic bg-white"
                        value={editForm.description}
                        onChange={e => setEditForm({ ...editForm, description: e.target.value })}
                      />
                    </div>
                  ) : (
                    <div>
                      <div className="font-display text-lg uppercase font-black leading-tight tracking-tight">{pkg.name}</div>
                      <div className="text-[10px] opacity-60 uppercase mt-2 leading-relaxed font-mono font-bold italic">{pkg.description}</div>
                    </div>
                  )}
                </td>
                <td className="p-6 border-r-[3px] border-black text-center">
                  {isEditing === pkg.id ? (
                    <input 
                      type="number"
                      className="w-28 border-2 border-black p-3 text-sm text-center font-mono"
                      value={editForm.price}
                      onChange={e => setEditForm({ ...editForm, price: parseFloat(e.target.value) })}
                    />
                  ) : (
                    <div className="font-display text-xl font-black italic text-mj-accent">₹{pkg.price.toLocaleString()}</div>
                  )}
                </td>
                <td className="p-6 border-r-[3px] border-black text-center text-xs font-mono font-bold">
                  {isEditing === pkg.id ? (
                    <input 
                      type="number"
                      className="w-24 border-2 border-black p-3 text-sm text-center font-mono"
                      value={editForm.duration}
                      onChange={e => setEditForm({ ...editForm, duration: parseInt(e.target.value) })}
                    />
                  ) : (
                    <span className="bg-mj-blue text-white px-2 py-1">{pkg.duration} MIN</span>
                  )}
                </td>
                <td className="p-6 border-r-[3px] border-black text-center text-xs font-mono font-bold">
                  {isEditing === pkg.id ? (
                    <input 
                      type="number"
                      className="w-20 border-2 border-black p-3 text-sm text-center font-mono"
                      value={editForm.maxStudents}
                      onChange={e => setEditForm({ ...editForm, maxStudents: parseInt(e.target.value) })}
                    />
                  ) : (
                    <span className="bg-black text-white px-2 py-1">{pkg.maxStudents}</span>
                  )}
                </td>
                <td className="p-6 text-center">
                  <div className="flex justify-center gap-3">
                    {isEditing === pkg.id ? (
                      <>
                        <button onClick={handleSave} className="p-3 bg-green-500 text-white brutalist-border shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:shadow-none">
                          <Save className="w-5 h-5" />
                        </button>
                        <button onClick={() => setIsEditing(null)} className="p-3 bg-mj-black text-white brutalist-border shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:shadow-none">
                          <X className="w-5 h-5" />
                        </button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => handleEdit(pkg)} className="p-3 hover:bg-mj-yellow brutalist-border transition-all shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1">
                          <Edit2 className="w-5 h-5" />
                        </button>
                        <button onClick={() => handleDelete(pkg.id)} className="p-3 hover:bg-red-500 hover:text-white brutalist-border transition-all shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
