import { useState, useEffect } from "react";
import { Search, Plus, Edit2, Trash2, Save, X, User, Phone, Mail, Award, Loader2 } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const API_URL = "http://localhost:4000/management";

export default function InstructorsPage() {
  const [instructors, setInstructors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<any>(null);

  useEffect(() => {
    fetchInstructors();
  }, []);

  const fetchInstructors = async () => {
    try {
      const res = await fetch(`${API_URL}/instructors`);
      const data = await res.json();
      setInstructors(data);
    } catch (error) {
      console.error("Failed to fetch instructors:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (inst: any) => {
    setIsEditing(inst.id);
    setEditForm({ ...inst });
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`${API_URL}/instructors/${isEditing}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });
      if (res.ok) {
        await fetchInstructors();
        setIsEditing(null);
        setEditForm(null);
      }
    } catch (error) {
      console.error("Failed to save instructor:", error);
    }
  };

  const filtered = instructors.filter(i => 
    i.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    i.specialty?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <div className="p-8 font-mono text-xs animate-pulse uppercase">Fetching Instructor Intel...</div>;

  return (
    <div className="p-8 space-y-8 max-w-6xl mx-auto">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="font-display text-5xl uppercase tracking-tighter leading-none">Instructors</h1>
          <p className="font-display text-sm uppercase tracking-widest opacity-60 mt-2">Manage your surf coaching team</p>
        </div>
        <button className="brutalist-button px-6 py-3 text-xs bg-black text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none">
          Add Instructor
        </button>
      </header>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40" />
        <input 
          type="text" 
          placeholder="Filter team members..."
          className="w-full pl-12 pr-4 py-4 border-2 border-black bg-white font-display text-sm uppercase tracking-widest focus:outline-none focus:bg-sand-50"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((inst) => (
          <div key={inst.id} className="brutalist-border bg-white p-8 brutalist-shadow space-y-6 group hover:bg-sand-50 transition-all">
            <div className="flex justify-between items-start">
              {isEditing === inst.id ? (
                <input 
                  className="w-full border-2 border-black p-2 font-display text-xl uppercase"
                  value={editForm.name}
                  onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                />
              ) : (
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 brutalist-border bg-mj-yellow flex items-center justify-center font-display text-xl font-black">
                    {inst.name.charAt(0)}
                  </div>
                  <h2 className="font-display text-2xl uppercase tracking-tight">{inst.name}</h2>
                </div>
              )}
              <div className="flex gap-2">
                {isEditing === inst.id ? (
                  <button onClick={handleSave} className="p-2 bg-green-500 text-white brutalist-border">
                    <Save className="w-4 h-4" />
                  </button>
                ) : (
                  <button onClick={() => handleEdit(inst)} className="p-2 opacity-0 group-hover:opacity-100 hover:bg-mj-yellow brutalist-border transition-all">
                    <Edit2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            <div className="space-y-4 font-mono text-xs uppercase font-bold">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-mj-accent" />
                {isEditing === inst.id ? (
                  <input 
                    className="flex-1 border border-black p-1 uppercase"
                    value={editForm.email}
                    onChange={e => setEditForm({ ...editForm, email: e.target.value })}
                  />
                ) : (
                  <span className="lowercase">{inst.email}</span>
                )}
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-mj-accent" />
                {isEditing === inst.id ? (
                  <input 
                    className="flex-1 border border-black p-1"
                    value={editForm.phone}
                    onChange={e => setEditForm({ ...editForm, phone: e.target.value })}
                  />
                ) : (
                  <span>{inst.phone}</span>
                )}
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-black/10">
                <Award className="w-4 h-4 text-mj-accent" />
                {isEditing === inst.id ? (
                  <input 
                    className="flex-1 border border-black p-1 uppercase"
                    value={editForm.specialty}
                    onChange={e => setEditForm({ ...editForm, specialty: e.target.value })}
                  />
                ) : (
                  <span className="text-mj-accent">{inst.specialty}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
