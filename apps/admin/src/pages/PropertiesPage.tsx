import { useState, useEffect } from "react";
import { Search, Plus, Edit2, Trash2, Save, X, Home, Bed, Loader2 } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const API_URL = "http://localhost:4000/management";

export default function PropertiesPage() {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditingProp, setIsEditingProp] = useState<string | null>(null);
  const [propForm, setPropForm] = useState<any>(null);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const res = await fetch(`${API_URL}/properties`);
      const data = await res.json();
      setProperties(data);
    } catch (error) {
      console.error("Failed to fetch properties:", error);
    } finally {
      setLoading(false);
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

  if (loading) return <div className="p-8 font-mono text-xs animate-pulse uppercase">Fetching Property Data...</div>;

  return (
    <div className="p-8 space-y-10 max-w-6xl mx-auto">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="font-display text-5xl uppercase tracking-tighter leading-none">Properties</h1>
          <p className="font-display text-sm uppercase tracking-widest opacity-60 mt-2">Manage hostel locations and accommodation units</p>
        </div>
        <button className="brutalist-button px-6 py-3 text-xs bg-black text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none">
          Add Property
        </button>
      </header>

      <div className="space-y-12">
        {properties.map((prop) => (
          <section key={prop.id} className="brutalist-border bg-white p-8 brutalist-shadow space-y-8">
            <div className="flex justify-between items-start border-b-2 border-black pb-6">
              <div className="space-y-2 flex-1">
                {isEditingProp === prop.id ? (
                  <div className="space-y-4 max-w-2xl">
                    <input 
                      className="w-full border-2 border-black p-3 font-display text-xl uppercase"
                      value={propForm.name}
                      onChange={e => setPropForm({ ...propForm, name: e.target.value })}
                    />
                    <input 
                      className="w-full border-2 border-black p-3 text-sm font-mono"
                      value={propForm.address}
                      onChange={e => setPropForm({ ...propForm, address: e.target.value })}
                    />
                    <textarea 
                      className="w-full border-2 border-black p-3 text-sm h-24 italic"
                      value={propForm.description}
                      onChange={e => setPropForm({ ...propForm, description: e.target.value })}
                    />
                  </div>
                ) : (
                  <>
                    <h2 className="font-display text-3xl uppercase tracking-tight">{prop.name}</h2>
                    <p className="font-mono text-xs opacity-60 uppercase">{prop.address}</p>
                    <p className="text-sm italic opacity-80">{prop.description}</p>
                  </>
                )}
              </div>
              <div className="flex gap-2">
                {isEditingProp === prop.id ? (
                  <>
                    <button onClick={handleSaveProp} className="p-3 bg-green-500 text-white brutalist-border">
                      <Save className="w-5 h-5" />
                    </button>
                    <button onClick={() => setIsEditingProp(null)} className="p-3 bg-black text-white brutalist-border">
                      <X className="w-5 h-5" />
                    </button>
                  </>
                ) : (
                  <button onClick={() => handleEditProp(prop)} className="p-3 hover:bg-mj-yellow brutalist-border transition-colors">
                    <Edit2 className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="font-display text-xl uppercase tracking-widest flex items-center gap-2">
                  <Bed className="w-5 h-5 text-mj-accent" />
                  Stay Options
                </h3>
                <button className="brutalist-button px-4 py-2 text-[10px]">Add Unit Type</button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {(prop.stayOptions || []).map((stay: any) => (
                  <div key={stay.id} className="brutalist-border p-6 bg-sand-50/50 flex justify-between items-start group hover:bg-white transition-all">
                    <div className="space-y-2">
                      <h4 className="font-display text-lg uppercase font-bold">{stay.name}</h4>
                      <p className="text-xs opacity-60">{stay.description}</p>
                      <div className="flex gap-4 pt-2">
                        <div className="bg-black text-white px-2 py-1 font-mono text-[10px] uppercase">
                          ₹{stay.pricePerNight} / Night
                        </div>
                        <div className="border border-black px-2 py-1 font-mono text-[10px] uppercase">
                          Max {stay.maxGuests} Guests
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-mj-yellow brutalist-border">
                        <Edit2 className="w-3 h-3" />
                      </button>
                      <button className="p-2 hover:bg-red-500 hover:text-white brutalist-border">
                        <Trash2 className="w-3 h-3" />
                      </button>
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
