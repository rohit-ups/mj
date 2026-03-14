import { ArrowRight, MapPin, Anchor, Zap } from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex-1 flex flex-col">
      <header className="p-6 flex justify-between items-center border-b-[3px] border-black bg-white sticky top-0 z-[60]">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-12 h-12 brutalist-border bg-white p-1">
            <img src="/logo.png" alt="Mambo Jambo Logo" className="w-full h-full object-contain" />
          </div>
          <span className="font-display text-2xl sm:text-3xl font-black tracking-tighter uppercase">Mambo Jambo</span>
        </Link>
        <button className="brutalist-button px-4 py-2 text-xs">
          Menu
        </button>
      </header>

      <section className="flex-1 flex flex-col p-6 md:p-12 gap-12 max-w-7xl mx-auto w-full">
        <div className="space-y-8 pt-8 md:pt-20">
          <div className="inline-block brutalist-border bg-[#f0db4f] px-4 py-1 font-display font-bold text-xs uppercase tracking-widest brutalist-shadow-sm">
            Live from Mulki, Karnataka
          </div>
          
          <h1 className="text-7xl sm:text-8xl md:text-[10rem] font-black leading-[0.8] tracking-[0.02em]">
            SLOW <span className="text-mj-accent italic">DOWN</span> <br />
            CATCH A <br />
            <span className="text-stroke">BREATH</span>
          </h1>
          
          <div className="max-w-2xl">
            <p className="text-xl md:text-3xl font-bold leading-tight uppercase border-l-[6px] border-black pl-8 py-4 bg-white brutalist-border brutalist-shadow-sm">
              Professional surf coaching and community hostel for those who seek the thrill of the ocean and the peace of the coastline.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12">
          <div className="lg:col-span-7">
            <Link href="/booking" className="group relative block w-full brutalist-card bg-mj-accent p-8 md:p-12 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
              <div className="flex justify-between items-start mb-12">
                <span className="font-display text-2xl md:text-4xl text-white font-black uppercase tracking-tighter">Start Your <br />Adventure</span>
                <div className="w-16 h-16 brutalist-border bg-white flex items-center justify-center group-hover:rotate-12 transition-transform">
                  <ArrowRight className="w-10 h-10 text-black" />
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <span className="bg-black text-white px-3 py-1 font-mono text-xs uppercase tracking-widest">3-10 Day Packages</span>
                <span className="bg-white text-black px-3 py-1 font-mono text-xs brutalist-border font-bold uppercase tracking-widest">Limited Slots</span>
              </div>
            </Link>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-6">
            <div className="brutalist-card p-6 flex flex-col justify-between aspect-square bg-[#0070f3] text-white">
              <Zap className="w-8 h-8 fill-current" />
              <div className="space-y-1 uppercase tracking-tighter">
                <span className="font-display text-[10px] font-bold opacity-80 block">Current Swell</span>
                <span className="font-display text-3xl font-black">6-8FT</span>
              </div>
            </div>
            <div className="brutalist-card p-6 flex flex-col justify-between aspect-square bg-[#f5f5f5]">
              <Anchor className="w-8 h-8 text-black" />
              <div className="space-y-1 uppercase tracking-tighter">
                <span className="font-display text-[10px] font-bold opacity-60 block">Daily Lessons</span>
                <span className="font-display text-3xl font-black">7:30AM</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 mb-20">
          {[
            { title: "The Hostel", icon: <MapPin className="w-6 h-6" />, desc: "AC dorms, community kitchen, and high-speed fiber WiFi for remote work." },
            { title: "The Lessons", icon: <Zap className="w-6 h-6" />, desc: "Personalized coaching from first pop-up to intermediate wave reading." },
            { title: "The Vibe", icon: <Anchor className="w-6 h-6" />, desc: "A whole lotta Mambo Jambo. Community movie nights and beach bonfires." }
          ].map((item, idx) => (
            <div key={idx} className="brutalist-card p-8 bg-white space-y-4">
              <div className="w-12 h-12 brutalist-border bg-mj-yellow flex items-center justify-center brutalist-shadow-sm">
                {item.icon}
              </div>
              <h3 className="text-2xl font-black tracking-tight">{item.title}</h3>
              <p className="font-mono text-sm opacity-80 leading-relaxed uppercase">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="p-12 border-t-[3px] border-black bg-white flex flex-col md:flex-row justify-between items-start md:items-center gap-12 mt-20 relative z-10">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain" />
            <span className="font-display text-2xl font-black tracking-tighter uppercase">Mambo Jambo</span>
          </div>
          <p className="font-mono text-xs uppercase tracking-widest opacity-60">© 2026 Mambo Jambo Surf School. Mulki, India.</p>
        </div>
        
        <div className="flex flex-wrap gap-8 font-display text-sm font-black uppercase tracking-widest">
          <a href="#" className="hover:text-mj-accent transition-colors underline decoration-[3px]">Instagram</a>
          <a href="#" className="hover:text-mj-accent transition-colors underline decoration-[3px]">WhatsApp</a>
          <a href="#" className="hover:text-mj-accent transition-colors underline decoration-[3px]">Contact</a>
        </div>
      </footer>
    </div>
  );
}
