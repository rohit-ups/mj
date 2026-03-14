import { motion } from "framer-motion";
import { ArrowRight, MapPin, Anchor, Zap, Instagram, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

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

export default function Home() {
  return (
    <div className="flex-1 flex flex-col selection:bg-mj-accent selection:text-white overflow-x-hidden">
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
          <button className="brutalist-button px-4 py-2 text-xs hidden md:block">
            Packages
          </button>
          <button className="brutalist-button px-4 py-2 text-xs bg-mj-accent text-white">
            Menu
          </button>
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
            {/* Decorative Floating Elements */}
            <motion.div 
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, 5, 0]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-10 -right-10 w-32 h-32 brutalist-border bg-mj-accent z-20 flex items-center justify-center p-4 brutalist-shadow-sm"
            >
              <span className="font-display font-black text-white text-center leading-none text-xl uppercase">Live <br/>Now</span>
            </motion.div>
            <div className="absolute -bottom-10 -left-10 w-48 h-48 brutalist-border bg-white z-0" />
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="border-y-[3px] border-black bg-mj-white py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "Ocean Swell", val: "6-8FT", color: "text-mj-blue" },
            { label: "Water Temp", val: "28°C", color: "text-mj-accent" },
            { label: "Next Session", val: "07:30", color: "text-black" },
            { label: "Slots Left", val: "04", color: "text-red-600" }
          ].map((stat, i) => (
            <motion.div 
              whileHover={{ y: -5 }}
              key={i} 
              className="text-center space-y-1"
            >
              <span className="font-mono text-[10px] uppercase font-bold opacity-40">{stat.label}</span>
              <p className={`font-display text-4xl font-black ${stat.color}`}>{stat.val}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PHOTO GRID SECTION */}
      <section className="p-6 md:p-12 max-w-7xl mx-auto w-full space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6">
          <h2 className="text-5xl md:text-7xl font-black max-w-md">THE VISUALS</h2>
          <p className="font-mono text-sm uppercase font-bold opacity-60 md:text-right max-w-xs">A snapshot of the Mambo Jambo lifestyle. No filters, just vibes.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-full md:h-[800px]">
          <motion.div 
            whileHover={{ scale: 0.98 }}
            className="md:col-span-8 brutalist-border brutalist-shadow relative overflow-hidden group"
          >
            <img src="/surf-1.jpg" alt="Mambo Jambo Surf" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-mj-accent/20 group-hover:bg-transparent transition-colors" />
            <div className="absolute bottom-6 left-6 bg-white brutalist-border px-4 py-2">
              <span className="font-display font-black uppercase text-xl">Surf Lessons</span>
            </div>
          </motion.div>
          
          <div className="md:col-span-4 grid grid-rows-2 gap-6">
            <motion.div 
              whileHover={{ scale: 0.98 }}
              className="brutalist-border brutalist-shadow relative overflow-hidden group"
            >
              <img src="/vibe-1.jpg" alt="Mambo Jambo Community" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute bottom-6 left-6 bg-mj-yellow brutalist-border px-4 py-2">
                <span className="font-display font-black uppercase text-sm">Community</span>
              </div>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 0.98 }}
              className="brutalist-border brutalist-shadow relative overflow-hidden group"
            >
              <img src="/vibe-2.jpg" alt="Mambo Jambo Vibe" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute bottom-6 left-6 bg-mj-blue text-white brutalist-border px-4 py-2">
                <span className="font-display font-black uppercase text-sm">Brunch</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="p-12 border-t-[3px] border-black bg-white flex flex-col md:flex-row justify-between items-start md:items-center gap-12 mt-20 relative z-10">
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
          <motion.a whileHover={{ y: -3 }} href="#" className="flex items-center gap-2 font-display text-sm font-black uppercase tracking-widest hover:text-mj-accent">
            <Instagram className="w-5 h-5" />
            Instagram
          </motion.a>
          <motion.a whileHover={{ y: -3 }} href="#" className="flex items-center gap-2 font-display text-sm font-black uppercase tracking-widest hover:text-mj-accent">
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
