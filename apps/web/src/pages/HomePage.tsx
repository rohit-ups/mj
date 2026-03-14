import { motion } from "framer-motion";
import { ArrowRight, MapPin, Anchor, Zap, Instagram, MessageCircle, Wifi, Coffee, Clock, Users, Shield, Car, Plane, Train, Plus, Minus, Camera, Waves } from "lucide-react";
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
  { q: "Do I need to know swimming?", a: "You don't need to know how to swim to learn to surf. The water is at the max shoulder level depth and your instructor will always be around you. Your board keeps you afloat." },
  { q: "Is remote working feasible?", a: "Yes. We have good WiFi connectivity and common workspaces for remote working. But make sure all your work commitments are scheduled post 1pm." },
  { q: "What is typical batch size?", a: "Maximum students in a batch is 14, divided amongst 4 instructors for personalized coaching." },
  { q: "What about food?", a: "Tea and fruits are served before surf. A heavy, delicious brunch is served back at the hostel. Dinner is not included, but we have an open kitchen and local delivery options (10 min walk)." },
  { q: "Cancellation Policy?", a: "Inform us 3 weeks prior for a refund of the advance amount. Otherwise, you can reschedule or gift the booking to a friend." }
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="flex-1 flex flex-col selection:bg-mj-accent selection:text-white overflow-x-hidden bg-[#fbf8f1]">
      {/* HEADER */}
      <header className="p-6 md:px-12 flex justify-between items-center border-b-[3px] border-black bg-white sticky top-0 z-[60]">
        <Link href="/" className="flex items-center gap-4 group">
          <motion.div 
            whileHover={{ rotate: 180, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="w-16 h-16 brutalist-border bg-mj-yellow p-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          >
            <img src="/logo.png" alt="Mambo Jambo Logo" className="w-full h-full object-contain" />
          </motion.div>
          <div className="flex flex-col">
            <span className="font-display text-2xl md:text-4xl font-black tracking-tighter uppercase leading-none">Mambo Jambo</span>
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] opacity-60">Surf & Stay • Mulki</span>
          </div>
        </Link>
        <div className="flex gap-4">
          <Link to="/booking" className="brutalist-button px-6 py-3 text-sm bg-mj-accent text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]">
            Book Session
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
              <span>Live from Mulki, Karnataka</span>
              <span className="text-mj-accent">●</span>
              <span>Surf lessons daily 07:30 - 12:30</span>
              <span className="text-mj-accent">●</span>
              <span>Slow down catch a breath</span>
              <span className="text-mj-accent">●</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* HERO SECTION */}
      <section className="relative flex flex-col p-6 md:p-12 gap-12 max-w-7xl mx-auto w-full min-h-[90vh] justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7 space-y-10 relative z-10">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-3 brutalist-border bg-mj-yellow px-4 py-2 font-display font-bold text-sm uppercase tracking-widest brutalist-shadow-sm"
            >
              <Camera className="w-4 h-4" />
              Est. 2024 • Mulki's Original Vibe
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-7xl sm:text-8xl md:text-[12rem] font-black leading-[0.7] tracking-[-0.02em]"
            >
              WHOLE <br />
              <span className="text-mj-accent italic">LOTTA</span> <br />
              <span className="text-stroke">MAMBO</span>
            </motion.h1>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl"
            >
              <p className="text-2xl md:text-4xl font-bold leading-none uppercase border-l-[8px] border-mj-accent pl-8 py-6 bg-white brutalist-border brutalist-shadow">
                Professional surf coaching and community hostel for those who seek the thrill of the ocean.
              </p>
            </motion.div>

            <motion.div className="flex flex-wrap gap-6 pt-4">
              <Link to="/booking" className="group brutalist-button bg-mj-accent text-white flex items-center gap-6 text-2xl py-8 px-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[8px] hover:translate-y-[8px]">
                Initialize Journey
                <ArrowRight className="w-10 h-10 group-hover:translate-x-2 transition-transform" />
              </Link>
            </motion.div>
          </div>

          <div className="lg:col-span-5 relative">
            <motion.div 
              initial={{ opacity: 0, rotate: 5 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ duration: 1 }}
              className="w-full aspect-[4/5] brutalist-border brutalist-shadow-sm overflow-hidden bg-mj-yellow relative z-10"
            >
              <img src="/surf-action-2.jpg" alt="Surf Action" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
            </motion.div>
            {/* Floating Branded Element */}
            <motion.div 
              animate={{ y: [0, -30, 0], rotate: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-16 -right-16 w-48 h-48 brutalist-border bg-mj-accent z-20 flex flex-col items-center justify-center p-6 brutalist-shadow rounded-full"
            >
              <img src="/logo.png" alt="Logo" className="w-20 h-20 object-contain invert brightness-0" />
              <span className="font-display font-black text-white text-center leading-none text-xs uppercase mt-2">Mambo <br/>Jambo</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PACKAGES SECTION */}
      <section className="p-6 md:p-12 max-w-7xl mx-auto w-full space-y-16 py-32">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="space-y-4 text-center md:text-left">
            <h2 className="text-6xl md:text-9xl font-black tracking-tighter">PACKAGES</h2>
            <p className="font-mono text-lg uppercase font-bold opacity-60">Integrated: Lessons + AC Dorm + Heavy Brunch</p>
          </div>
          <div className="brutalist-border bg-mj-yellow p-6 rotate-2 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <span className="font-display font-black text-2xl uppercase">2hr Daily Surf Time</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {[
            { days: 3, price: "6,000", desc: "3 Lessons + 2 Nights", color: "bg-white" },
            { days: 5, price: "9,700", desc: "5 Lessons + 4 Nights", color: "bg-mj-yellow" },
            { days: 7, price: "13,700", desc: "7 Lessons + 6 Nights", color: "bg-mj-blue text-white" },
            { days: 10, price: "18,700", desc: "10 Lessons + 9 Nights", color: "bg-mj-accent text-white" }
          ].map((pkg, i) => (
            <motion.div 
              key={i}
              whileHover={{ scale: 1.02, rotate: i % 2 === 0 ? 1 : -1 }}
              className={`brutalist-card p-10 flex flex-col gap-10 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] ${pkg.color}`}
            >
              <div className="space-y-2">
                <span className="font-mono text-xs uppercase font-bold opacity-60 italic">{pkg.desc}</span>
                <h3 className="text-6xl font-black tracking-tighter">{pkg.days} DAY</h3>
              </div>
              <div className="mt-auto pt-10 border-t-4 border-current">
                <span className="text-4xl font-black">₹{pkg.price}</span>
                <p className="font-mono text-xs uppercase font-bold mt-2 opacity-60">Complete Protocol</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* THE HOSTEL SECTION (NEW) */}
      <section className="bg-mj-black text-white py-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="relative order-2 lg:order-1">
            <motion.div 
              whileInView={{ x: 0, opacity: 1 }}
              initial={{ x: -100, opacity: 0 }}
              className="brutalist-border bg-white p-2 shadow-[12px_12px_0px_0px_#ff5c00]"
            >
              <img src="/hostel-1.jpg" alt="Mambo Jambo Hostel" className="w-full h-[600px] object-cover" />
            </motion.div>
            <div className="absolute -top-10 -left-10 brutalist-border bg-mj-blue p-8 shadow-[8px_8px_0px_0px_white]">
              <h4 className="text-4xl font-black text-white uppercase">The Base</h4>
            </div>
          </div>
          <div className="space-y-12 order-1 lg:order-2">
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-mj-accent">SURF HOSTEL</h2>
            <p className="text-xl md:text-2xl font-bold uppercase leading-tight opacity-80">
              Our base at Kolachikambla Road is designed for the modern nomad. AC Dorms, high-speed fiber WiFi, and a community that feels like family.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {[
                { title: "Remote Ready", desc: "Fiber WiFi + dedicated workspaces. Work post 1PM." },
                { title: "Open Kitchen", desc: "Cook your own catch or order in via local apps." },
                { title: "Power Up", desc: "Full power backup for uninterrupted work & stay." },
                { title: "Chill Zones", desc: "Hammocks, TT table, and common resting areas." }
              ].map((feature, i) => (
                <div key={i} className="space-y-2 border-l-4 border-mj-yellow pl-6">
                  <h5 className="text-xl font-black uppercase text-mj-yellow">{feature.title}</h5>
                  <p className="font-mono text-xs uppercase opacity-60 leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ACTIVITIES SECTION (NEW) */}
      <section className="py-32 px-6 bg-mj-yellow border-y-[3px] border-black">
        <div className="max-w-7xl mx-auto space-y-20">
          <div className="text-center space-y-4">
            <h2 className="text-6xl md:text-9xl font-black tracking-tighter uppercase">Beyond Surf</h2>
            <p className="font-mono text-lg uppercase font-bold">Mulki is more than just waves. Explore the backwaters.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: "Kayaking", desc: "Paddle through the silent backwaters for epic sunsets.", img: "/activities-1.jpg" },
              { title: "SUP", desc: "Stand-up paddling across the Mulki coastline.", img: "/surf-lessons.jpg" },
              { title: "Scooter Trip", desc: "Rent a scooter and drive along the scenic coast.", img: "/hero-surf.jpg" }
            ].map((act, i) => (
              <motion.div key={i} whileHover={{ y: -15 }} className="brutalist-card bg-white overflow-hidden shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                <div className="h-64 overflow-hidden border-b-[3px] border-black">
                  <img src={act.img} className="w-full h-full object-cover" />
                </div>
                <div className="p-8 space-y-4">
                  <h4 className="text-3xl font-black uppercase">{act.title}</h4>
                  <p className="font-mono text-sm uppercase opacity-60 italic">{act.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SCHEDULE & VIBE SECTION */}
      <section className="bg-[#f5f5f5] py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-16">
            <div className="space-y-4">
              <h2 className="text-6xl md:text-8xl font-black tracking-tighter">THE PROTOCOL</h2>
              <p className="font-mono text-lg uppercase font-bold opacity-60 italic">Precision timing for maximum stoke.</p>
            </div>
            <div className="space-y-10">
              {[
                { time: "07:30", task: "Tea & Intel", desc: "Fuel up and check tide conditions at base." },
                { time: "08:00", task: "The Session", desc: "Pick up and drop back included. 2hrs in the water." },
                { time: "11:30", task: "Heavy Brunch", desc: "The legendary Mambo Jambo brunch is served." },
                { time: "13:00", task: "Base Ops", desc: "Remote work, TT tournaments, or backwater kayaking." }
              ].map((step, i) => (
                <div key={i} className="flex gap-8 items-start group">
                  <span className="bg-mj-black text-white px-4 py-2 font-mono text-lg font-black shadow-[4px_4px_0px_0px_#ff5c00] group-hover:translate-x-1 group-hover:translate-y-1 group-hover:shadow-none transition-all">{step.time}</span>
                  <div className="space-y-1">
                    <h4 className="text-3xl font-black uppercase group-hover:text-mj-accent transition-colors">{step.task}</h4>
                    <p className="font-mono text-sm opacity-60 uppercase font-bold">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <motion.div 
              whileHover={{ rotate: 0 }}
              className="brutalist-card aspect-[4/5] overflow-hidden rotate-3 shadow-[20px_20px_0px_0px_rgba(0,0,0,1)]"
            >
              <img src="/surf-1.jpg" alt="Surf Lesson" className="w-full h-full object-cover" />
            </motion.div>
            <motion.div 
              animate={{ x: [0, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -bottom-10 -left-10 brutalist-card bg-mj-yellow p-8 -rotate-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
            >
              <span className="font-display font-black text-3xl uppercase leading-none">NO SWIMMING <br/>REQUIRED</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* AMENITIES SECTION */}
      <section className="p-6 md:p-12 max-w-7xl mx-auto w-full space-y-20 py-32">
        <h2 className="text-6xl md:text-[10rem] font-black text-center tracking-tighter">GEAR / INFO</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {[
            { label: "Fiber WiFi", icon: <Wifi /> },
            { label: "Heavy Brunch", icon: <Coffee /> },
            { label: "Power Backup", icon: <Zap /> },
            { label: "TT Table", icon: <Anchor /> },
            { label: "Movie Nights", icon: <Users /> },
            { label: "Workout Area", icon: <Clock /> },
            { label: "Slack Line", icon: <Shield /> },
            { label: "Scooter Rent", icon: <Car /> },
            { label: "Parking", icon: <MapPin /> },
            { label: "Indoor Games", icon: <Zap /> },
            { label: "Hammocks", icon: <Anchor /> },
            { label: "Library", icon: <Users /> }
          ].map((item, i) => (
            <motion.div 
              whileHover={{ y: -8, scale: 1.02 }}
              key={i} 
              className="brutalist-card p-8 bg-white flex flex-col items-center justify-center text-center gap-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:bg-mj-yellow transition-colors"
            >
              <div className="w-12 h-12 text-mj-accent group-hover:scale-110 transition-transform">{item.icon}</div>
              <span className="font-display font-black text-[10px] uppercase tracking-widest leading-tight">{item.label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TRAVEL SECTION */}
      <section className="bg-mj-black text-white p-12 py-32 mt-24 border-y-[3px] border-black">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-12">
            <h2 className="text-6xl md:text-9xl font-black text-mj-accent tracking-tighter">NAVIGATE</h2>
            <div className="space-y-10">
              {[
                { type: "Airport", val: "Mangalore (IXE)", desc: "40 mins taxi / Uber (30kms)", icon: <Plane /> },
                { type: "Railway", val: "Mulki Station", desc: "15 mins via rickshaw", icon: <Train /> },
                { type: "Bus", val: "Mulki Stand", desc: "10 mins walk / 3 mins rickshaw", icon: <Car /> }
              ].map((way, i) => (
                <div key={i} className="flex gap-8 items-center border-b-2 border-white/10 pb-8">
                  <div className="w-16 h-16 brutalist-border bg-white flex items-center justify-center shadow-[4px_4px_0px_0px_#ff5c00]"><span className="text-black">{way.icon}</span></div>
                  <div className="space-y-1">
                    <h4 className="text-2xl font-black uppercase text-mj-yellow">{way.type}</h4>
                    <p className="font-display font-black text-lg uppercase">{way.val}</p>
                    <p className="font-mono text-xs opacity-40 uppercase">{way.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="brutalist-border bg-white p-2 h-[600px] shadow-[20px_20px_0px_0px_#ff5c00]">
            <a href="https://shorturl.at/wcRl8" target="_blank" className="relative block w-full h-full group overflow-hidden">
              <img src="/hero-surf.jpg" className="w-full h-full object-cover grayscale brightness-50 contrast-125 transition-all duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
                <div className="w-24 h-24 brutalist-border bg-white p-2 rounded-full shadow-xl">
                  <img src="/logo.png" className="w-full h-full object-contain" />
                </div>
                <span className="brutalist-button bg-mj-yellow text-black text-xl px-10 py-5">Launch Map Protocol</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="p-6 md:p-12 max-w-5xl mx-auto w-full space-y-16 py-32">
        <h2 className="text-6xl md:text-9xl font-black text-center tracking-tighter uppercase underline decoration-mj-accent underline-offset-8">INTEL</h2>
        <div className="grid grid-cols-1 gap-6">
          {FAQ_DATA.map((faq, i) => (
            <motion.div key={i} layout className="brutalist-card bg-white overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <button 
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full p-8 flex justify-between items-center text-left hover:bg-mj-white transition-colors"
              >
                <span className="font-display font-black text-xl md:text-2xl uppercase tracking-tighter">{faq.q}</span>
                <div className="w-10 h-10 brutalist-border bg-black text-white flex items-center justify-center">
                  {openFaq === i ? <Minus className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
                </div>
              </button>
              {openFaq === i && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="p-8 pt-0 font-mono text-sm md:text-base uppercase font-bold opacity-80 leading-relaxed border-t-[3px] border-black bg-mj-white italic"
                >
                  {faq.a}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="p-12 border-t-[3px] border-black bg-white flex flex-col md:flex-row justify-between items-start md:items-center gap-12 mt-20 relative z-10">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 brutalist-border bg-mj-yellow p-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-3xl font-black tracking-tighter uppercase leading-none">Mambo Jambo</span>
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest opacity-60">Professional Surf Collective</span>
            </div>
          </div>
          <div className="space-y-1">
            <p className="font-mono text-[10px] uppercase font-bold opacity-60">Kolachikambla Road, Karnad, Mulki</p>
            <p className="font-mono text-[10px] uppercase font-bold opacity-60">Karnataka, India 574154</p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-10">
          <motion.a whileHover={{ scale: 1.1, rotate: 5 }} href="https://instagram.com/mambojambo.surf" target="_blank" className="flex items-center gap-3 font-display font-black text-sm uppercase tracking-widest hover:text-mj-accent underline decoration-[3px]">
            <Instagram className="w-6 h-6" />
            IG
          </motion.a>
          <motion.a whileHover={{ scale: 1.1, rotate: -5 }} href="https://wa.me/917022129460" target="_blank" className="flex items-center gap-3 font-display font-black text-sm uppercase tracking-widest hover:text-mj-accent underline decoration-[3px]">
            <MessageCircle className="w-6 h-6" />
            WA
          </motion.a>
          <motion.a whileHover={{ y: -5 }} href="mailto:mambojambosurf@gmail.com" className="font-display font-black text-sm uppercase tracking-widest hover:text-mj-accent underline decoration-[3px]">
            Email Base
          </motion.a>
        </div>
      </footer>
    </div>
  );
}
