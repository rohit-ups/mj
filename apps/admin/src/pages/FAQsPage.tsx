import { useState, useEffect } from "react";
import { Search, Plus, Edit2, Trash2, Save, X, HelpCircle, ArrowUp, ArrowDown, Loader2 } from "lucide-react";
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

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    try {
      const res = await fetch(`${API_URL}/faqs`);
      const data = await res.json();
      setFaqs(data);
    } catch (error) {
      console.error("Failed to fetch FAQs:", error);
    } finally {
      setLoading(false);
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

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newFaqs = [...faqs];
    [newFaqs[index - 1], newFaqs[index]] = [newFaqs[index], newFaqs[index - 1]];
    setFaqs(newFaqs);
    // TODO: Update order in DB
  };

  const moveDown = (index: number) => {
    if (index === faqs.length - 1) return;
    const newFaqs = [...faqs];
    [newFaqs[index + 1], newFaqs[index]] = [newFaqs[index], newFaqs[index + 1]];
    setFaqs(newFaqs);
    // TODO: Update order in DB
  };

  if (loading) return <div className="p-8 font-mono text-xs animate-pulse uppercase">Fetching Knowledge Base...</div>;

  return (
    <div className="p-8 space-y-8 max-w-4xl mx-auto">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="font-display text-5xl uppercase tracking-tighter leading-none">FAQs</h1>
          <p className="font-display text-sm uppercase tracking-widest opacity-60 mt-2">Manage customer help content</p>
        </div>
        <button className="brutalist-button px-6 py-3 text-xs bg-black text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none">
          Add FAQ
        </button>
      </header>

      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div key={faq.id} className="brutalist-border bg-white p-6 brutalist-shadow-sm flex gap-6 items-start group hover:bg-sand-50 transition-all">
            <div className="flex flex-col gap-2 opacity-20 group-hover:opacity-100 transition-opacity pt-2">
              <button onClick={() => moveUp(index)} className="hover:text-mj-accent"><ArrowUp className="w-4 h-4" /></button>
              <button onClick={() => moveDown(index)} className="hover:text-mj-accent"><ArrowDown className="w-4 h-4" /></button>
            </div>
            
            <div className="flex-1 space-y-4">
              {isEditing === faq.id ? (
                <>
                  <input 
                    className="w-full border-2 border-black p-3 font-display font-bold text-sm uppercase"
                    value={editForm.question}
                    onChange={e => setEditForm({ ...editForm, question: e.target.value })}
                  />
                  <textarea 
                    className="w-full border-2 border-black p-3 text-sm h-32 italic font-mono"
                    value={editForm.answer}
                    onChange={e => setEditForm({ ...editForm, answer: e.target.value })}
                  />
                </>
              ) : (
                <>
                  <h3 className="font-display text-xl uppercase tracking-tight">{faq.question}</h3>
                  <p className="text-sm opacity-70 leading-relaxed italic border-l-4 border-mj-yellow pl-6">{faq.answer}</p>
                </>
              )}
            </div>

            <div className="flex gap-2">
              {isEditing === faq.id ? (
                <button onClick={handleSave} className="p-3 bg-green-500 text-white brutalist-border shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <Save className="w-4 h-4" />
                </button>
              ) : (
                <>
                  <button onClick={() => handleEdit(faq)} className="p-3 hover:bg-mj-yellow brutalist-border transition-colors">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button className="p-3 hover:bg-red-500 hover:text-white brutalist-border transition-colors">
                    <Trash2 className="w-4 h-4" />
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
