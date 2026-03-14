"use client";

import { useState } from "react";
import { useActionState } from "react";
import { Waves, ArrowRight, Calendar, Home, Clock, Check, Loader2 } from "lucide-react";
import Link from "next/link";
import { submitBooking } from "./actions";

const DURATIONS = [3, 5, 7, 10];

const STAY_OPTIONS = [
  {
    id: "1",
    name: "AC Dorm Bed",
    description: "Cool and comfortable shared dorm with high-speed WiFi and power backup.",
    pricePerNight: "Incl.",
    image: "https://images.unsplash.com/photo-1555854817-5b2247a8175f?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "2",
    name: "Non-AC Dorm Bed",
    description: "Budget-friendly shared dorm with a natural breeze and community vibe.",
    pricePerNight: "Incl.",
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

    if (!isFormValid) {
      return;
    }

    const formData = new FormData();
    formData.append("duration", duration!.toString());
    formData.append("stayId", stayId!);
    formData.append("startDate", startDate);

    formAction(formData);
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <header className="p-6 flex justify-between items-center border-b-2 border-black sticky top-0 bg-[#fbf8f1] z-50">
        <Link href="/" className="flex items-center gap-2">
          <Waves className="w-8 h-8 text-accent" />
          <span className="font-display text-2xl tracking-tighter uppercase">Mambo Jambo</span>
        </Link>
        <button className="bg-black text-white px-4 py-2 font-display text-sm uppercase tracking-widest hover:bg-accent transition-colors">
          Menu
        </button>
      </header>

      <main className="flex-1 p-6 md:p-12 max-w-6xl mx-auto w-full space-y-16">
        <div className="space-y-4">
          <h1 className="font-display text-5xl md:text-7xl leading-[0.9] tracking-tighter uppercase">
            Book Your <br />
            <span className="text-accent italic">Adventure</span>
          </h1>
          <p className="max-w-md text-lg font-medium opacity-80">
            Select your course duration, accommodation, and start date to begin your journey.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <section className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full border-2 border-black flex items-center justify-center font-display text-xl">1</div>
              <h2 className="font-display text-3xl uppercase tracking-tight">Course Duration</h2>
            </div>

            {touched.duration && getFieldError("duration") && (
              <p className="text-red-500 text-sm font-sans mb-4">{getFieldError("duration")}</p>
            )}

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {DURATIONS.map((d) => (
                <button
                  type="button"
                  key={d}
                  onClick={() => {
                    setDuration(d);
                    setTouched((t) => ({ ...t, duration: true }));
                  }}
                  className={`
                  relative p-6 border-2 transition-all flex flex-col items-center gap-2
                  ${duration === d
                      ? "border-accent bg-accent text-white"
                      : "border-black hover:border-accent hover:text-accent"}
                `}
                >
                  <Clock className="w-6 h-6" />
                  <span className="font-display text-2xl">{d}</span>
                  <span className="font-display text-xs uppercase tracking-widest">Days</span>
                  {duration === d && (
                    <div className="absolute top-2 right-2">
                      <Check className="w-4 h-4" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </section>

          <section className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full border-2 border-black flex items-center justify-center font-display text-xl">2</div>
              <h2 className="font-display text-3xl uppercase tracking-tight">Select Your Stay</h2>
            </div>

            {touched.stay && getFieldError("stay") && (
              <p className="text-red-500 text-sm font-sans mb-4">{getFieldError("stay")}</p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {STAY_OPTIONS.map((stay) => (
                <button
                  type="button"
                  key={stay.id}
                  onClick={() => {
                    setStayId(stay.id);
                    setTouched((t) => ({ ...t, stay: true }));
                  }}
                  className={`
                  group relative flex flex-col text-left border-2 transition-all overflow-hidden
                  ${stayId === stay.id ? "border-accent" : "border-black hover:border-accent"}
                `}
                >
                  <div className="aspect-[4/3] overflow-hidden border-b-2 border-black">
                    <img
                      src={stay.image}
                      alt={stay.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6 space-y-4 flex-1 flex flex-col">
                    <div className="flex justify-between items-start">
                      <h3 className="font-display text-xl uppercase leading-none">{stay.name}</h3>
                      <span className="font-display text-accent text-xl">{stay.pricePerNight}</span>
                    </div>
                    <p className="text-sm opacity-70 flex-1">{stay.description}</p>
                    <div className="flex items-center gap-2 font-display text-xs uppercase tracking-widest">
                      <Home className="w-4 h-4" />
                      <span>{stay.pricePerNight === "Incl." ? "Package" : "Per Night"}</span>
                    </div>
                  </div>
                  {stayId === stay.id && (
                    <div className="absolute top-4 right-4 bg-accent text-white p-1">
                      <Check className="w-4 h-4" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </section>

          <section className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full border-2 border-black flex items-center justify-center font-display text-xl">3</div>
              <h2 className="font-display text-3xl uppercase tracking-tight">Start Date</h2>
            </div>

            {touched.startDate && getFieldError("startDate") && (
              <p className="text-red-500 text-sm font-sans mb-4">{getFieldError("startDate")}</p>
            )}

            <div className="max-w-md relative">
              <input
                type="date"
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.target.value);
                  setTouched((t) => ({ ...t, startDate: true }));
                }}
                className={`w-full p-6 border-2 border-black bg-transparent font-display text-xl uppercase focus:outline-none transition-colors appearance-none ${
                  getFieldError("startDate") ? "border-red-500" : "focus:border-accent"
                }`}
              />
              <Calendar className="absolute right-6 top-1/2 -translate-y-1/2 w-6 h-6 pointer-events-none" />
            </div>
          </section>

          {state?.error && !state.field && (
            <div className="p-4 bg-red-50 border border-red-200 text-red-600 font-sans">
              {state.error}
            </div>
          )}

          <div className="pt-12 border-t-2 border-black flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-2">
              <p className="font-display text-sm uppercase tracking-widest opacity-60">Your Selection</p>
              <div className="flex flex-wrap gap-4">
                <span className="px-3 py-1 border border-black/20 font-display text-xs uppercase">
                  {duration ? `${duration} Days Package` : "No duration selected"}
                </span>
                <span className="px-3 py-1 border border-black/20 font-display text-xs uppercase">
                  {stayId ? STAY_OPTIONS.find((s) => s.id === stayId)?.name : "No stay selected"}
                </span>
                <span className="px-3 py-1 border border-black/20 font-display text-xs uppercase">
                  {startDate ? startDate : "No date selected"}
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={!isFormValid || isPending}
              className={`
                group relative p-6 md:p-8 flex items-center justify-between overflow-hidden transition-all min-w-[240px]
                ${!isFormValid || isPending
                  ? "bg-black/10 text-black/30 cursor-not-allowed"
                  : "bg-accent text-white hover:pr-12"}
              `}
            >
              {isPending ? (
                <>
                  <Loader2 className="w-8 h-8 animate-spin" />
                  <span className="font-display text-3xl uppercase tracking-tighter">Processing...</span>
                </>
              ) : (
                <>
                  <span className="font-display text-3xl uppercase tracking-tighter">Continue</span>
                  <ArrowRight className="w-8 h-8 transition-transform group-hover:translate-x-2" />
                </>
              )}
              <div className="absolute inset-0 bg-black/10 translate-y-full transition-transform group-hover:translate-y-0" />
            </button>
          </div>
        </form>
      </main>

      <footer className="p-6 border-t-2 border-black flex flex-col md:flex-row justify-between gap-4 mt-24">
        <div className="font-display text-sm uppercase tracking-widest">
          © 2026 Mambo Jambo. All Rights Reserved.
        </div>
        <div className="flex gap-6 font-display text-sm uppercase tracking-widest">
          <a href="#" className="hover:text-accent transition-colors">Instagram</a>
          <a href="#" className="hover:text-accent transition-colors">Contact</a>
        </div>
      </footer>
    </div>
  );
}
