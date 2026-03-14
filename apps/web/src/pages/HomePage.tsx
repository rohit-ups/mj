import { motion } from "framer-motion";
import { ArrowRight, MapPin, Anchor, Zap, Instagram, MessageCircle, Wifi, Coffee, Clock, Users, Shield, Car, Plane, Train, Plus, Minus } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const marqueeVariants = {
  animate: {
    x: [0, -1000],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 20,
        ease: "linear",
      },
    },
  },
};

const FAQ_DATA = [
  { q: "Do I need to know swimming?", a: "You don't need to know how to swim! The water is shoulder-level depth and your instructor is always around. Your board keeps you afloat." },
  { q: "Is remote working feasible?", a: "Yes! High-speed WiFi and common workspaces. Just schedule your calls post 1pm after the morning surf session." },
  { q: "What is typical batch size?", a: "Max 14 students per batch, divided among 4 instructors for personalized attention." },
  { q: "What about food?", a: "Tea/fruits before surf, heavy brunch after. Open kitchen for dinner or local delivery (10 min walk)." },
  { q: "Cancellation Policy?", a: "3 weeks prior notice for full refund of advance. Otherwise, reschedule or gift to a friend." }
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="flex-1 flex flex-col selection:bg-mj-accent selection:text-white overflow-x-hidden bg-[#f0f0f0]">
      {/* HEADER */}
      <header className="p-6 flex justify-between items-center border-b-[3px] border-black bg-white sticky top-0 z-[60]">
        <Link href="/" className="flex items-center gap-3">
          <motion.div 
            whileHover={{ rotate: 90 }}
            className="w-12 h-12 brutalist-border bg-white p-1"
          >
            <img src="/logo.png" alt="Mambo Jambo Logo" className="w-full h-full object-contain" />
          </motion.div>
          <span className="font-display text-2xl sm:text-3xl font-black tracking-tighter uppercase">Mambo Jambo</span>
        </Link>
        <div className="flex gap-4">
          <Link to="/booking" className="brutalist-button px-4 py-2 text-xs bg-mj-accent text-white">
            Book Now
          </Link>
        </div>
      </header>

      {/* MARQUEE */}
      <div className="bg-black text-white py-3 border-b-[3px] border-black overflow-hidden flex whitespace-nowrap">
        <motion.div 
          variants={marqueeVariants}
          animate="animate"
          className="flex gap-8 items-center"
        >
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex gap-8 items-center font-mono text-xs uppercase font-bold tracking-[0.2em]">
              <span>Live from Mulki</span>
              <span className="text-mj-accent">●</span>
              <span>Surf lessons daily</span>
              <span className="text-mj-accent">●</span>
              <span>Slow down catch a breath</span>
              <span className="text-mj-accent">●</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* HERO SECTION */}
      <section className="relative flex flex-col p-6 md:p-12 gap-12 max-w-7xl mx-auto w-full min-h-[80vh] justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-8 relative z-10">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-block brutalist-border bg-[#f0db4f] px-4 py-1 font-display font-bold text-xs uppercase tracking-widest brutalist-shadow-sm"
            >
              The Original Surf School of Mulki
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-7xl sm:text-8xl md:text-[11rem] font-black leading-[0.75] tracking-[0.02em]"
            >
              SLOW <span className="text-mj-accent italic">DOWN</span> <br />
              CATCH A <br />
              <span className="text-stroke">BREATH</span>
            </motion.h1>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="max-w-xl"
            >
              <p className="text-xl md:text-2xl font-bold leading-tight uppercase border-l-[6px] border-black pl-8 py-4 bg-white brutalist-border brutalist-shadow-sm">
                Mulki's most legendary surf & stay. Community, waves, and the lifestyle you've been searching for.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-6 pt-4"
            >
              <Link to="/booking" className="group brutalist-button bg-mj-accent text-white flex items-center gap-4 text-xl py-6 px-10">
                Start Sequence
                <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
              </Link>
            </motion.div>
          </div>

          <div className="lg:col-span-5 relative h-full min-h-[400px]">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="w-full h-full brutalist-border brutalist-shadow overflow-hidden bg-mj-yellow relative z-10"
            >
              <img src="/hero-surf.jpg" alt="Surfing in Mulki" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
            </motion.div>
            <motion.div 
              animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-10 -right-10 w-32 h-32 brutalist-border bg-mj-accent z-20 flex items-center justify-center p-4 brutalist-shadow-sm"
            >
              <span className="font-display font-black text-white text-center leading-none text-xl uppercase">Live <br/>Now</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PACKAGES SECTION */}
      <section className="p-6 md:p-12 max-w-7xl mx-auto w-full space-y-12">
        <div className="space-y-4">
          <h2 className="text-5xl md:text-8xl font-black">PACKAGES</h2>
          <p className="font-mono text-sm uppercase font-bold opacity-60">All-inclusive: Surf Lessons + AC Dorm Stay + Brunch</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { days: 3, price: "6,000", desc: "2 Nights AC Stay", color: "bg-white" },
            { days: 5, price: "9,700", desc: "4 Nights AC Stay", color: "bg-mj-yellow" },
            { days: 7, price: "13,700", desc: "6 Nights AC Stay", color: "bg-mj-blue text-white" },
            { days: 10, price: "18,700", desc: "9 Nights AC Stay", color: "bg-mj-accent text-white" }
          ].map((pkg, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className={`brutalist-card p-8 flex flex-col gap-8 ${pkg.color}`}
            >
              <div className="space-y-2">
                <span className="font-mono text-[10px] uppercase font-bold opacity-60 italic">{pkg.desc}</span>
                <h3 className="text-5xl font-black">{pkg.days} DAY</h3>
              </div>
              <div className="mt-auto pt-8 border-t-2 border-current">
                <span className="text-3xl font-black leading-none">₹{pkg.price}</span>
                <p className="font-mono text-[10px] uppercase font-bold mt-2 opacity-60 italic">Per Person</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SCHEDULE & VIBE SECTION */}
      <section className="border-y-[3px] border-black bg-white py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-12">
            <h2 className="text-5xl md:text-7xl font-black">THE DAILY<br/>PROTOCOL</h2>
            <div className="space-y-8">
              {[
                { time: "07:30", task: "Tea & Fruits", desc: "Fuel up before heading to the beach." },
                { time: "08:00", task: "Surf Session", desc: "2 hours of guided lessons in the ocean." },
                { time: "11:30", task: "Heavy Brunch", desc: "Legendary Mambo Jambo meals back at base." },
                { time: "13:00", task: "Remote Work / Explore", desc: "Schedule calls or go kayaking in backwaters." }
              ].map((step, i) => (
                <div key={i} className="flex gap-6 items-start">
                  <span className="bg-black text-white px-3 py-1 font-mono text-sm font-bold">{step.time}</span>
                  <div className="space-y-1">
                    <h4 className="text-2xl font-black">{step.task}</h4>
                    <p className="font-mono text-xs opacity-60 uppercase">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="brutalist-card aspect-[4/5] overflow-hidden rotate-2">
              <img src="/surf-lessons.jpg" alt="Surf Lesson Action" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -left-6 brutalist-card bg-mj-yellow p-6 -rotate-3 hidden md:block">
              <span className="font-display font-black text-xl uppercase">No Swimming <br/>Skills Needed</span>
            </div>
          </div>
        </div>
      </section>

      {/* AMENITIES SECTION */}
      <section className="p-6 md:p-12 max-w-7xl mx-auto w-full space-y-12 mt-12">
        <h2 className="text-5xl md:text-8xl font-black text-center">THE AMENITIES</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[
            { label: "High-Speed WiFi", icon: <Wifi /> },
            { label: "Heavy Brunch", icon: <Coffee /> },
            { label: "Power Backup", icon: <Zap /> },
            { label: "TT Table", icon: <Anchor /> },
            { label: "Movie Nights", icon: <Users /> },
            { label: "Yoga Space", icon: <Clock /> },
            { label: "Slack Line", icon: <Shield /> },
            { label: "Scooter Rent", icon: <Car /> },
            { label: "Parking", icon: <MapPin /> },
            { label: "Indoor Games", icon: <Zap /> },
            { label: "Hammocks", icon: <Anchor /> },
            { label: "Library", icon: <Users /> }
          ].map((item, i) => (
            <motion.div 
              whileHover={{ scale: 1.05, rotate: i % 2 === 0 ? 2 : -2 }}
              key={i} 
              className="brutalist-card p-6 bg-white flex flex-col items-center justify-center text-center gap-4"
            >
              <div className="w-10 h-10 text-mj-accent">{item.icon}</div>
              <span className="font-mono text-[10px] uppercase font-bold leading-tight">{item.label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="p-6 md:p-12 max-w-4xl mx-auto w-full space-y-12 mt-20">
        <h2 className="text-5xl md:text-7xl font-black text-center">INTEL / FAQ</h2>
        <div className="space-y-4">
          {FAQ_DATA.map((faq, i) => (
            <div key={i} className="brutalist-card bg-white overflow-hidden">
              <button 
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full p-6 flex justify-between items-center text-left"
              >
                <span className="font-display font-black text-lg uppercase tracking-tight">{faq.q}</span>
                {openFaq === i ? <Minus className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
              </button>
              {openFaq === i && (
                <div className="p-6 pt-0 font-mono text-sm uppercase opacity-80 leading-relaxed border-t-2 border-black/10">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* TRAVEL SECTION */}
      <section className="bg-black text-white p-12 mt-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-8">
            <h2 className="text-5xl md:text-7xl font-black text-mj-accent">HOW TO REACH</h2>
            <div className="space-y-6">
              <div className="flex gap-6 items-center">
                <div className="w-12 h-12 brutalist-border bg-mj-yellow flex items-center justify-center"><Plane className="text-black" /></div>
                <div>
                  <h4 className="text-xl font-black uppercase">Airport</h4>
                  <p className="font-mono text-xs opacity-60">Mangalore Airport (40 mins taxi)</p>
                </div>
              </div>
              <div className="flex gap-6 items-center">
                <div className="w-12 h-12 brutalist-border bg-mj-blue flex items-center justify-center"><Train className="text-white" /></div>
                <div>
                  <h4 className="text-xl font-black uppercase">Railway</h4>
                  <p className="font-mono text-xs opacity-60">Mulki Station (15 mins auto)</p>
                </div>
              </div>
              <div className="flex gap-6 items-center">
                <div className="w-12 h-12 brutalist-border bg-mj-accent flex items-center justify-center"><Car className="text-white" /></div>
                <div>
                  <h4 className="text-xl font-black uppercase">Bus</h4>
                  <p className="font-mono text-xs opacity-60">Mulki Stand (10 mins walk)</p>
                </div>
              </div>
            </div>
          </div>
          <div className="brutalist-border bg-white p-2 h-[400px]">
            {/* Embedded map placeholder or link */}
            <a href="https://shorturl.at/wcRl8" target="_blank" className="relative block w-full h-full group overflow-hidden">
              <img src="/hero-surf.jpg" className="w-full h-full object-cover grayscale brightness-50" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="brutalist-button bg-mj-yellow text-black text-lg">Open in Maps</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="p-12 border-t-[3px] border-black bg-white flex flex-col md:flex-row justify-between items-start md:items-center gap-12 relative z-10">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain" />
            <span className="font-display text-2xl font-black tracking-tighter uppercase">Mambo Jambo</span>
          </div>
          <p className="font-mono text-xs uppercase tracking-widest opacity-60 max-w-xs">
            Kolachikambla Road, Karnad, Mulki, Karnataka, India. Slow down and catch a breath.
          </p>
        </div>
        
        <div className="flex flex-wrap gap-8">
          <motion.a whileHover={{ y: -3 }} href="https://instagram.com/mambojambo.surf" target="_blank" className="flex items-center gap-2 font-display text-sm font-black uppercase tracking-widest hover:text-mj-accent">
            <Instagram className="w-5 h-5" />
            Instagram
          </motion.a>
          <motion.a whileHover={{ y: -3 }} href="https://wa.me/917022129460" target="_blank" className="flex items-center gap-2 font-display text-sm font-black uppercase tracking-widest hover:text-mj-accent">
            <MessageCircle className="w-5 h-5" />
            WhatsApp
          </motion.a>
          <motion.a whileHover={{ y: -3 }} href="#" className="font-display text-sm font-black uppercase tracking-widest hover:text-mj-accent underline decoration-[3px]">
            Contact
          </motion.a>
        </div>
      </footer>
    </div>
  );
}
