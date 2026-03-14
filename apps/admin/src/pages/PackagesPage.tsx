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
      throw error; // Let ErrorBoundary handle it
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

  if (loading) return <div className="p-8 font-mono text-xs animate-pulse uppercase">Fetching Data Matrix...</div>;

  return (
    <div className="p-8 space-y-8 max-w-6xl mx-auto">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="font-display text-5xl uppercase tracking-tighter leading-none">Packages</h1>
          <p className="font-display text-sm uppercase tracking-widest opacity-60 mt-2">Configure course offerings and pricing</p>
        </div>
        <button 
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 px-6 py-3 border-2 border-black bg-black text-white font-display text-xs uppercase tracking-widest hover:bg-mj-accent transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none"
        >
          <Plus className="w-4 h-4" />
          Create Package
        </button>
      </header>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40" />
        <input 
          type="text" 
          placeholder="Filter packages..."
          className="w-full pl-12 pr-4 py-4 border-2 border-black bg-white font-display text-sm uppercase tracking-widest focus:outline-none focus:bg-sand-50"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="border-2 border-black bg-white overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b-2 border-black bg-sand-50">
              <th className="p-4 font-display text-xs uppercase tracking-widest border-r-2 border-black w-1/3">Name & Description</th>
              <th className="p-4 font-display text-xs uppercase tracking-widest border-r-2 border-black text-center">Price</th>
              <th className="p-4 font-display text-xs uppercase tracking-widest border-r-2 border-black text-center">Duration (Min)</th>
              <th className="p-4 font-display text-xs uppercase tracking-widest border-r-2 border-black text-center">Max Students</th>
              <th className="p-4 font-display text-xs uppercase tracking-widest text-center w-32">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y-2 divide-black">
            {filteredPackages.map((pkg) => (
              <tr key={pkg.id} className="hover:bg-sand-50 transition-colors">
                <td className="p-4 border-r-2 border-black">
                  {isEditing === pkg.id ? (
                    <div className="space-y-2">
                      <input 
                        className="w-full border border-black p-2 text-sm font-bold uppercase font-display"
                        value={editForm.name}
                        onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                      />
                      <textarea 
                        className="w-full border border-black p-2 text-xs h-20"
                        value={editForm.description}
                        onChange={e => setEditForm({ ...editForm, description: e.target.value })}
                      />
                    </div>
                  ) : (
                    <div>
                      <div className="font-display text-sm uppercase font-bold">{pkg.name}</div>
                      <div className="text-[10px] opacity-60 uppercase mt-1 leading-relaxed">{pkg.description}</div>
                    </div>
                  )}
                </td>
                <td className="p-4 border-r-2 border-black text-center">
                  {isEditing === pkg.id ? (
                    <input 
                      type="number"
                      className="w-24 border border-black p-2 text-sm text-center"
                      value={editForm.price}
                      onChange={e => setEditForm({ ...editForm, price: parseFloat(e.target.value) })}
                    />
                  ) : (
                    <div className="font-display text-sm font-bold italic text-mj-accent">₹{pkg.price.toLocaleString()}</div>
                  )}
                </td>
                <td className="p-4 border-r-2 border-black text-center">
                  {isEditing === pkg.id ? (
                    <input 
                      type="number"
                      className="w-24 border border-black p-2 text-sm text-center"
                      value={editForm.duration}
                      onChange={e => setEditForm({ ...editForm, duration: parseInt(e.target.value) })}
                    />
                  ) : (
                    <div className="text-xs font-mono">{pkg.duration}</div>
                  )}
                </td>
                <td className="p-4 border-r-2 border-black text-center">
                  {isEditing === pkg.id ? (
                    <input 
                      type="number"
                      className="w-20 border border-black p-2 text-sm text-center"
                      value={editForm.maxStudents}
                      onChange={e => setEditForm({ ...editForm, maxStudents: parseInt(e.target.value) })}
                    />
                  ) : (
                    <div className="text-xs font-mono">{pkg.maxStudents}</div>
                  )}
                </td>
                <td className="p-4 text-center">
                  <div className="flex justify-center gap-2">
                    {isEditing === pkg.id ? (
                      <>
                        <button onClick={handleSave} className="p-2 bg-green-500 text-white brutalist-border hover:bg-green-600">
                          <Save className="w-4 h-4" />
                        </button>
                        <button onClick={() => setIsEditing(null)} className="p-2 bg-black text-white brutalist-border hover:bg-red-500">
                          <X className="w-4 h-4" />
                        </button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => handleEdit(pkg)} className="p-2 hover:bg-mj-yellow brutalist-border transition-colors group">
                          <Edit2 className="w-4 h-4 group-hover:scale-110" />
                        </button>
                        <button onClick={() => handleDelete(pkg.id)} className="p-2 hover:bg-red-500 hover:text-white brutalist-border transition-colors group">
                          <Trash2 className="w-4 h-4 group-hover:scale-110" />
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
