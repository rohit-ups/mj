import { useState, useEffect } from "react";
import { Search, Plus, Edit2, Trash2, Save, X, Home, Bed, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const API_URL = "http://localhost:4000/management";

export default function PropertiesPage() {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Property Editing State
  const [isEditingProp, setIsEditingProp] = useState<string | null>(null);
  const [propForm, setPropForm] = useState<any>(null);

  // Stay Option Editing State
  const [isEditingStay, setIsEditingStay] = useState<string | null>(null);
  const [stayForm, setStayForm] = useState<any>(null);

  // Modal State
  const [showAddProp, setShowAddProp] = useState(false);
  const [newProp, setNewProp] = useState({ name: "", address: "", description: "" });

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const res = await fetch(`${API_URL}/properties`);
      if (!res.ok) throw new Error(`API Error: ${res.status} ${res.statusText}`);
      const data = await res.json();
      setProperties(data);
    } catch (error: any) {
      console.error("Failed to fetch properties:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/properties`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProp),
      });
      if (res.ok) {
        await fetchProperties();
        setShowAddProp(false);
        setNewProp({ name: "", address: "", description: "" });
      }
    } catch (error) {
      console.error("Failed to create property:", error);
    }
  };

  const handleEditProp = (prop: any) => {
    setIsEditingProp(prop.id);
    setPropForm({ ...prop });
  };

  const handleSaveProp = async () => {
    try {
      const res = await fetch(`${API_URL}/properties/${isEditingProp}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(propForm),
      });
      if (res.ok) {
        await fetchProperties();
        setIsEditingProp(null);
        setPropForm(null);
      }
    } catch (error) {
      console.error("Failed to save property:", error);
    }
  };

  const handleEditStay = (stay: any) => {
    setIsEditingStay(stay.id);
    setStayForm({ ...stay });
  };

  const handleSaveStay = async () => {
    try {
      const res = await fetch(`${API_URL}/stay-options/${isEditingStay}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(stayForm),
      });
      if (res.ok) {
        await fetchProperties();
        setIsEditingStay(null);
        setStayForm(null);
      }
    } catch (error) {
      console.error("Failed to save stay option:", error);
    }
  };

  if (loading) return <div className="p-8 font-mono text-xs animate-pulse uppercase text-center mt-20">Fetching Property Data...</div>;

  return (
    <div className="p-8 space-y-10 max-w-6xl mx-auto pb-20">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="font-display text-5xl uppercase tracking-tighter leading-none">Properties</h1>
          <p className="font-display text-sm uppercase tracking-widest opacity-60 mt-2">Manage hostel locations and accommodation units</p>
        </div>
        <button 
          onClick={() => setShowAddProp(true)}
          className="brutalist-button px-8 py-4 bg-black text-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-none"
        >
          Add Property
        </button>
      </header>

      {/* ADD PROPERTY MODAL */}
      {showAddProp && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm font-sans">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-xl bg-white border-[3px] border-black brutalist-shadow p-10 space-y-8"
          >
            <div className="flex justify-between items-center border-b-[3px] border-black pb-4">
              <h2 className="font-display text-3xl uppercase tracking-tighter font-black">Register Base</h2>
              <button onClick={() => setShowAddProp(false)} className="hover:text-mj-accent transition-colors">
                <X className="w-8 h-8" />
              </button>
            </div>

            <form onSubmit={handleCreateProp} className="space-y-6">
              <div className="space-y-2">
                <label className="font-mono text-[10px] font-black uppercase tracking-widest block opacity-60">Base Name</label>
                <input 
                  required
                  className="w-full border-[3px] border-black p-4 focus:bg-sand-50 outline-none font-display text-sm uppercase font-bold"
                  placeholder="e.g. MAMBO JAMBO MAIN CAMPUS"
                  value={newProp.name}
                  onChange={e => setNewProp({ ...newProp, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="font-mono text-[10px] font-black uppercase tracking-widest block opacity-60">Physical Address</label>
                <input 
                  required
                  className="w-full border-[3px] border-black p-4 focus:bg-sand-50 outline-none font-mono text-xs uppercase"
                  placeholder="GPS coordinates or full address"
                  value={newProp.address}
                  onChange={e => setNewProp({ ...newProp, address: e.target.value })}
                />
              </div>
              <button 
                type="submit"
                className="w-full brutalist-button bg-mj-blue text-white py-6 text-xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-none"
              >
                INITIALIZE BASE
              </button>
            </form>
          </motion.div>
        </div>
      )}

      <div className="space-y-16">
        {properties.map((prop) => (
          <section key={prop.id} className="brutalist-border bg-white p-10 brutalist-shadow space-y-10">
            <div className="flex justify-between items-start border-b-[3px] border-black pb-8">
              <div className="space-y-4 flex-1">
                {isEditingProp === prop.id ? (
                  <div className="space-y-4 max-w-2xl">
                    <input 
                      className="w-full border-[3px] border-black p-4 font-display text-2xl uppercase bg-sand-50 outline-none"
                      value={propForm.name}
                      onChange={e => setPropForm({ ...propForm, name: e.target.value })}
                    />
                    <input 
                      className="w-full border-[3px] border-black p-4 text-sm font-mono bg-sand-50 outline-none uppercase"
                      value={propForm.address}
                      onChange={e => setPropForm({ ...propForm, address: e.target.value })}
                    />
                  </div>
                ) : (
                  <>
                    <h2 className="font-display text-4xl uppercase tracking-tighter leading-none">{prop.name}</h2>
                    <div className="flex items-center gap-2 opacity-60 font-mono text-xs uppercase font-bold">
                      <MapPin className="w-4 h-4" />
                      {prop.address}
                    </div>
                  </>
                )}
              </div>
              <div className="flex gap-3">
                {isEditingProp === prop.id ? (
                  <>
                    <button onClick={handleSaveProp} className="p-4 bg-green-500 text-white brutalist-border shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none">
                      <Save className="w-6 h-6" />
                    </button>
                    <button onClick={() => setIsEditingProp(null)} className="p-4 bg-black text-white brutalist-border shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none">
                      <X className="w-6 h-6" />
                    </button>
                  </>
                ) : (
                  <button onClick={() => handleEditProp(prop)} className="p-4 hover:bg-mj-yellow brutalist-border transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1">
                    <Edit2 className="w-6 h-6" />
                  </button>
                )}
              </div>
            </div>

            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <h3 className="font-display text-2xl uppercase tracking-widest flex items-center gap-3">
                  <Bed className="w-6 h-6 text-mj-accent" />
                  Unit Inventory
                </h3>
                <button className="brutalist-button px-6 py-2 text-xs bg-mj-yellow">Inject Unit Type</button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {(prop.stayOptions || []).map((stay: any) => (
                  <div key={stay.id} className="brutalist-border p-8 bg-sand-50/30 flex justify-between items-start group hover:bg-white transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                    <div className="space-y-4 flex-1 mr-6">
                      {isEditingStay === stay.id ? (
                        <div className="space-y-4">
                          <input 
                            className="w-full border-[3px] border-black p-3 font-display text-sm uppercase bg-white outline-none"
                            value={stayForm.name}
                            onChange={e => setStayForm({ ...stayForm, name: e.target.value })}
                          />
                          <div className="flex gap-4">
                            <div className="flex-1">
                              <label className="text-[9px] uppercase font-black block mb-1">VAL_INR</label>
                              <input 
                                type="number"
                                className="w-full border-[3px] border-black p-3 text-sm bg-white font-mono"
                                value={stayForm.pricePerNight}
                                onChange={e => setStayForm({ ...stayForm, pricePerNight: parseFloat(e.target.value) })}
                              />
                            </div>
                            <div className="flex-1">
                              <label className="text-[9px] uppercase font-black block mb-1">CAP_UNIT</label>
                              <input 
                                type="number"
                                className="w-full border-[3px] border-black p-3 text-sm bg-white font-mono"
                                value={stayForm.maxGuests}
                                onChange={e => setStayForm({ ...stayForm, maxGuests: parseInt(e.target.value) })}
                              />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <>
                          <h4 className="font-display text-xl uppercase font-black tracking-tight">{stay.name}</h4>
                          <p className="text-[10px] opacity-60 uppercase font-mono font-bold leading-relaxed">{stay.description}</p>
                          <div className="flex gap-4 pt-4">
                            <div className="bg-mj-black text-white px-3 py-1 font-mono text-[10px] font-black uppercase">
                              ₹{stay.pricePerNight} / Night
                            </div>
                            <div className="border-[2px] border-black px-3 py-1 font-mono text-[10px] font-black uppercase">
                              MAX_LOAD: {stay.maxGuests}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                    
                    <div className="flex gap-2">
                      {isEditingStay === stay.id ? (
                        <>
                          <button onClick={handleSaveStay} className="p-3 bg-green-500 text-white brutalist-border shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:shadow-none">
                            <Save className="w-4 h-4" />
                          </button>
                          <button onClick={() => setIsEditingStay(null)} className="p-3 bg-black text-white brutalist-border shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:shadow-none">
                            <X className="w-4 h-4" />
                          </button>
                        </>
                      ) : (
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => handleEditStay(stay)} className="p-3 hover:bg-mj-yellow brutalist-border shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button className="p-3 hover:bg-red-500 hover:text-white brutalist-border shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

const MapPin = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
);
