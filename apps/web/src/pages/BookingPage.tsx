import { useState, useEffect } from "react";
import { useActionState } from "react";
import { ArrowRight, Calendar, Check, Loader2, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { submitBooking } from "./bookingActions";

const DURATIONS = [
  { days: 3, price: 6000, desc: "Quick Escape" },
  { days: 5, price: 9700, desc: "Standard Flow" },
  { days: 7, price: 13700, desc: "Deep Dive" },
  { days: 10, price: 18700, desc: "Mastery Quest" },
];

const STAY_OPTIONS = [
  {
    id: "1",
    name: "AC Dorm Bed",
    description: "Cool & community focused. High-speed WiFi included.",
    image: "https://images.unsplash.com/photo-1555854817-5b2247a8175f?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "2",
    name: "Non-AC Dorm Bed",
    description: "Natural breeze & community vibes. Budget friendly.",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=800",
  },
];

const initialState = {
  success: false,
  error: undefined,
  field: undefined,
  bookingId: undefined,
};

export default function BookingPage() {
  const [duration, setDuration] = useState<number | null>(null);
  const [stayId, setStayId] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<string>("");
  const [touched, setTouched] = useState<{ duration?: boolean; stay?: boolean; startDate?: boolean }>({});
  const [state, formAction, isPending] = useActionState(submitBooking, initialState);

  const getFieldError = (field: string) => {
    if (state?.field === field && state?.error) {
      return state.error;
    }
    return null;
  };

  const isFormValid = duration && stayId && startDate;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ duration: true, stay: true, startDate: true });

    if (!isFormValid) return;

    const formData = new FormData();
    formData.append("duration", duration!.toString());
    formData.append("stayId", stayId!);
    formData.append("startDate", startDate);

    formAction(formData);
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#f0f0f0]">
      <header className="p-6 flex justify-between items-center border-b-[3px] border-black bg-white sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 brutalist-border bg-white p-1 group-hover:rotate-12 transition-transform">
            <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
          </div>
          <span className="font-display text-xl font-black tracking-tighter uppercase">Mambo Jambo</span>
        </Link>
        <div className="hidden md:flex items-center gap-4">
          <div className="flex gap-1">
            {[1, 2, 3].map((step) => (
              <div 
                key={step} 
                className={`w-8 h-2 brutalist-border ${
                  (step === 1 && duration) || (step === 2 && stayId) || (step === 3 && startDate) 
                  ? "bg-mj-accent" : "bg-black/10"
                }`} 
              />
            ))}
          </div>
          <span className="font-mono text-[10px] uppercase font-bold tracking-widest">Protocol Progress</span>
        </div>
      </header>

      <main className="flex-1 p-6 md:p-12 max-w-5xl mx-auto w-full space-y-20">
        <div className="space-y-4">
          <Link href="/" className="inline-flex items-center gap-2 font-mono text-xs uppercase font-bold hover:text-mj-accent transition-colors mb-4">
            <ChevronLeft className="w-4 h-4" /> Back to Base
          </Link>
          <h1 className="text-5xl md:text-8xl font-black leading-none">
            RESERVE <br />
            <span className="text-mj-accent">SESSION</span>
          </h1>
          <p className="font-mono text-sm uppercase tracking-widest opacity-60">System Ready • Initialize Booking Sequence</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-24">
          {/* STEP 1: DURATION */}
          <section className="space-y-10">
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 brutalist-border bg-mj-yellow flex items-center justify-center font-display text-2xl font-black brutalist-shadow-sm">01</div>
              <h2 className="text-3xl font-black">PACKAGE DURATION</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {DURATIONS.map((d) => (
                <button
                  type="button"
                  key={d.days}
                  onClick={() => {
                    setDuration(d.days);
                    setTouched((t) => ({ ...t, duration: true }));
                  }}
                  className={`
                    relative p-8 brutalist-card text-left flex flex-col justify-between min-h-[200px]
                    ${duration === d.days ? "bg-mj-accent text-white" : "bg-white hover:translate-y-[-4px] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]"}
                  `}
                >
                  <div className="space-y-1">
                    <span className={`font-mono text-[10px] uppercase font-bold ${duration === d.days ? "text-white/80" : "opacity-40"}`}>{d.desc}</span>
                    <h3 className="text-4xl font-black leading-none">{d.days} DAYS</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="h-[2px] w-full bg-current opacity-20" />
                    <span className="text-2xl font-black">₹{d.price.toLocaleString()}</span>
                  </div>
                  {duration === d.days && (
                    <div className="absolute top-4 right-4 w-8 h-8 brutalist-border bg-white flex items-center justify-center">
                      <Check className="w-5 h-5 text-black" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </section>

          {/* STEP 2: STAY */}
          <section className="space-y-10">
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 brutalist-border bg-[#0070f3] text-white flex items-center justify-center font-display text-2xl font-black brutalist-shadow-sm">02</div>
              <h2 className="text-3xl font-black">SELECT STAY</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {STAY_OPTIONS.map((stay) => (
                <button
                  type="button"
                  key={stay.id}
                  onClick={() => {
                    setStayId(stay.id);
                    setTouched((t) => ({ ...t, stay: true }));
                  }}
                  className={`
                    group relative flex flex-col brutalist-card overflow-hidden text-left
                    ${stayId === stay.id ? "ring-[6px] ring-mj-accent" : "hover:translate-y-[-4px] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]"}
                  `}
                >
                  <div className="aspect-[16/9] overflow-hidden border-b-[3px] border-black">
                    <img
                      src={stay.image}
                      alt={stay.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-8 bg-white space-y-4">
                    <div className="flex justify-between items-start">
                      <h3 className="text-2xl font-black">{stay.name}</h3>
                      <span className="bg-black text-white px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest">Included</span>
                    </div>
                    <p className="font-mono text-xs uppercase opacity-60 leading-relaxed">{stay.description}</p>
                  </div>
                  {stayId === stay.id && (
                    <div className="absolute top-6 right-6 w-12 h-12 brutalist-border bg-mj-accent text-white flex items-center justify-center brutalist-shadow-sm rotate-12">
                      <Check className="w-8 h-8" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </section>

          {/* STEP 3: DATE */}
          <section className="space-y-10">
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 brutalist-border bg-mj-accent text-white flex items-center justify-center font-display text-2xl font-black brutalist-shadow-sm">03</div>
              <h2 className="text-3xl font-black">START DATE</h2>
            </div>

            <div className="max-w-md relative">
              <div className="absolute -left-4 -top-4 w-8 h-8 brutalist-border bg-mj-yellow z-10" />
              <input
                type="date"
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.target.value);
                  setTouched((t) => ({ ...t, startDate: true }));
                }}
                className={`w-full p-8 brutalist-border bg-white font-display text-2xl uppercase focus:outline-none transition-all brutalist-shadow-sm focus:brutalist-shadow-hover appearance-none ${
                  getFieldError("startDate") ? "border-red-500" : ""
                }`}
              />
              <Calendar className="absolute right-8 top-1/2 -translate-y-1/2 w-8 h-8 pointer-events-none text-black" />
            </div>
          </section>

          {/* FINAL SUMMARY & SUBMIT */}
          <div className="pt-20 border-t-[3px] border-black flex flex-col md:flex-row items-stretch md:items-center justify-between gap-12 mb-20">
            <div className="space-y-4">
              <p className="font-mono text-xs uppercase font-bold tracking-[0.2em] text-mj-accent">Configuration Summary</p>
              <div className="flex flex-wrap gap-4">
                <div className="brutalist-border bg-white px-4 py-2 font-display text-sm font-black uppercase tracking-tighter">
                  {duration ? `${duration} DAYS FLOW` : "NO DURATION"}
                </div>
                <div className="brutalist-border bg-white px-4 py-2 font-display text-sm font-black uppercase tracking-tighter">
                  {stayId ? STAY_OPTIONS.find((s) => s.id === stayId)?.name : "NO STAY"}
                </div>
                <div className="brutalist-border bg-[#f0db4f] px-4 py-2 font-display text-sm font-black uppercase tracking-tighter">
                  {startDate ? startDate : "NO DATE"}
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={!isFormValid || isPending}
              className={`
                group relative p-8 brutalist-border brutalist-shadow font-display text-4xl font-black uppercase tracking-tighter overflow-hidden transition-all
                ${!isFormValid || isPending
                  ? "bg-black/10 text-black/30 cursor-not-allowed border-black/20"
                  : "bg-mj-accent text-white hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] active:brutalist-shadow-active"}
              `}
            >
              <div className="flex items-center gap-6">
                {isPending ? (
                  <>
                    <Loader2 className="w-10 h-10 animate-spin" />
                    <span>Processing</span>
                  </>
                ) : (
                  <>
                    <span>Initialize</span>
                    <ArrowRight className="w-10 h-10 transition-transform group-hover:translate-x-2" />
                  </>
                )}
              </div>
            </button>
          </div>
        </form>
      </main>

      <footer className="p-12 border-t-[3px] border-black bg-white">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 font-mono text-[10px] uppercase font-bold tracking-[0.2em]">
          <span>© 2026 Mambo Jambo Protocol</span>
          <div className="flex gap-8">
            <a href="#" className="hover:text-mj-accent">Terms</a>
            <a href="#" className="hover:text-mj-accent">Privacy</a>
            <a href="#" className="hover:text-mj-accent">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
