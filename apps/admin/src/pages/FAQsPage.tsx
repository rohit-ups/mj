import { useState, useEffect } from "react";
import { Search, Plus, Edit2, Trash2, Save, X, HelpCircle, ArrowUp, ArrowDown, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const API_URL = "http://localhost:4000/management";

export default function FAQsPage() {
  const [faqs, setFaqs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<any>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newFaq, setNewFaq] = useState({ question: "", answer: "" });

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    try {
      const res = await fetch(`${API_URL}/faqs`);
      if (!res.ok) throw new Error(`API Error: ${res.status} ${res.statusText}`);
      const data = await res.json();
      setFaqs(data);
    } catch (error: any) {
      console.error("Failed to fetch FAQs:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/faqs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newFaq, order: faqs.length }),
      });
      if (res.ok) {
        await fetchFaqs();
        setShowAddModal(false);
        setNewFaq({ question: "", answer: "" });
      }
    } catch (error) {
      console.error("Failed to create FAQ:", error);
    }
  };

  const handleEdit = (faq: any) => {
    setIsEditing(faq.id);
    setEditForm({ ...faq });
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`${API_URL}/faqs/${isEditing}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });
      if (res.ok) {
        await fetchFaqs();
        setIsEditing(null);
        setEditForm(null);
      }
    } catch (error) {
      console.error("Failed to save FAQ:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Permanently delete this entry?")) {
      // TODO: Implement DELETE endpoint in API
      console.log("Delete FAQ:", id);
    }
  };

  if (loading) return <div className="p-8 font-mono text-xs animate-pulse uppercase text-center mt-20">Accessing Knowledge Database...</div>;

  return (
    <div className="p-8 space-y-10 max-w-4xl mx-auto pb-20">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="font-display text-5xl uppercase tracking-tighter leading-none">FAQs</h1>
          <p className="font-display text-sm uppercase tracking-widest opacity-60 mt-2">Manage customer help content</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="brutalist-button px-8 py-4 bg-black text-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-none"
        >
          <Plus className="w-5 h-5" />
          Add FAQ
        </button>
      </header>

      {/* ADD MODAL */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm font-sans">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-xl bg-white border-[3px] border-black brutalist-shadow p-10 space-y-8"
            >
              <div className="flex justify-between items-center border-b-[3px] border-black pb-4">
                <h2 className="font-display text-3xl uppercase tracking-tighter font-black">Inject Knowledge</h2>
                <button onClick={() => setShowAddModal(false)} className="hover:text-mj-accent transition-colors">
                  <X className="w-8 h-8" />
                </button>
              </div>

              <form onSubmit={handleCreate} className="space-y-6">
                <div className="space-y-2">
                  <label className="font-mono text-[10px] font-black uppercase tracking-widest block opacity-60">The Query</label>
                  <input 
                    required
                    className="w-full border-[3px] border-black p-4 focus:bg-sand-50 outline-none font-display text-sm uppercase font-bold"
                    placeholder="e.g. WHAT IS THE CANCELLATION POLICY?"
                    value={newFaq.question}
                    onChange={e => setNewFaq({ ...newFaq, question: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-mono text-[10px] font-black uppercase tracking-widest block opacity-60">The Intel</label>
                  <textarea 
                    required
                    className="w-full border-[3px] border-black p-4 focus:bg-sand-50 outline-none text-sm h-40 italic"
                    placeholder="Provide the answer..."
                    value={newFaq.answer}
                    onChange={e => setNewFaq({ ...newFaq, answer: e.target.value })}
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full brutalist-button bg-mj-yellow text-black py-6 text-xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-none"
                >
                  INITIALIZE FAQ
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="space-y-8">
        {faqs.map((faq, index) => (
          <div key={faq.id} className="brutalist-border bg-white p-8 brutalist-shadow-sm flex gap-8 items-start group hover:bg-sand-50 transition-all">
            <div className="flex flex-col gap-3 opacity-20 group-hover:opacity-100 transition-opacity pt-2">
              <button className="hover:text-mj-accent"><ArrowUp className="w-5 h-5" /></button>
              <button className="hover:text-mj-accent"><ArrowDown className="w-5 h-5" /></button>
            </div>
            
            <div className="flex-1 space-y-6">
              {isEditing === faq.id ? (
                <>
                  <input 
                    className="w-full border-[3px] border-black p-4 font-display font-bold text-sm uppercase bg-white outline-none"
                    value={editForm.question}
                    onChange={e => setEditForm({ ...editForm, question: e.target.value })}
                  />
                  <textarea 
                    className="w-full border-[3px] border-black p-4 text-sm h-40 italic font-mono bg-white outline-none"
                    value={editForm.answer}
                    onChange={e => setEditForm({ ...editForm, answer: e.target.value })}
                  />
                </>
              ) : (
                <>
                  <h3 className="font-display text-2xl uppercase tracking-tighter leading-tight font-black">{faq.question}</h3>
                  <p className="text-sm md:text-base opacity-70 leading-relaxed italic border-l-[6px] border-mj-yellow pl-8 py-2 bg-sand-50/30">{faq.answer}</p>
                </>
              )}
            </div>

            <div className="flex gap-3">
              {isEditing === faq.id ? (
                <button onClick={handleSave} className="p-4 bg-green-500 text-white brutalist-border shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none">
                  <Save className="w-6 h-6" />
                </button>
              ) : (
                <>
                  <button onClick={() => handleEdit(faq)} className="p-4 hover:bg-mj-yellow brutalist-border transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1">
                    <Edit2 className="w-6 h-6" />
                  </button>
                  <button onClick={() => handleDelete(faq.id)} className="p-4 hover:bg-red-500 hover:text-white brutalist-border transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1">
                    <Trash2 className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
