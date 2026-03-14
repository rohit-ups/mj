import { ArrowRight, Waves, Sun, Wind } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex-1 flex flex-col">
      <header className="p-6 flex justify-between items-center border-b-2 border-black">
        <Link href="/" className="flex items-center gap-2">
          <Waves className="w-8 h-8 text-accent" />
          <span className="font-display text-2xl tracking-tighter uppercase">Surf School</span>
        </Link>
        <button className="bg-black text-white px-4 py-2 font-display text-sm uppercase tracking-widest hover:bg-accent transition-colors">
          Menu
        </button>
      </header>

      <section className="flex-1 flex flex-col p-6 md:p-12 gap-12">
        <div className="space-y-4">
          <h1 className="font-display text-6xl md:text-9xl leading-[0.9] tracking-tighter uppercase text-balance">
            Ride the <br />
            <span className="text-accent italic">Unstoppable</span> <br />
            Wave.
          </h1>
          <p className="max-w-md text-lg md:text-xl font-medium leading-relaxed opacity-80">
            Professional surf coaching for those who dare to challenge the ocean. 
            From first pop-up to barrel riding.
          </p>
        </div>

        <div className="mt-auto flex flex-col md:flex-row gap-4">
          <Link href="/booking" className="group relative bg-accent text-white p-6 md:p-8 flex items-center justify-between overflow-hidden transition-all hover:pr-12 flex-1 md:flex-none md:min-w-[320px]">
            <span className="font-display text-3xl md:text-4xl uppercase tracking-tighter">Book Now</span>
            <ArrowRight className="w-8 h-8 transition-transform group-hover:translate-x-2" />
            <div className="absolute inset-0 bg-black/10 translate-y-full transition-transform group-hover:translate-y-0" />
          </Link>

          <div className="grid grid-cols-3 gap-4 flex-1">
            <div className="border-2 border-black p-4 flex flex-col justify-between aspect-square md:aspect-auto">
              <Sun className="w-6 h-6" />
              <span className="font-display text-xs uppercase opacity-60">Conditions</span>
              <span className="font-display text-xl uppercase">Epic</span>
            </div>
            <div className="border-2 border-black p-4 flex flex-col justify-between aspect-square md:aspect-auto">
              <Wind className="w-6 h-6" />
              <span className="font-display text-xs uppercase opacity-60">Wind</span>
              <span className="font-display text-xl uppercase">Offshore</span>
            </div>
            <div className="border-2 border-black p-4 flex flex-col justify-between aspect-square md:aspect-auto">
              <Waves className="w-6 h-6" />
              <span className="font-display text-xs uppercase opacity-60">Swell</span>
              <span className="font-display text-xl uppercase">6-8ft</span>
            </div>
          </div>
        </div>
      </section>

      <footer className="p-6 border-t-2 border-black flex flex-col md:flex-row justify-between gap-4">
        <div className="font-display text-sm uppercase tracking-widest">
          © 2026 Surf School. All Rights Reserved.
        </div>
        <div className="flex gap-6 font-display text-sm uppercase tracking-widest">
          <a href="#" className="hover:text-accent transition-colors">Instagram</a>
          <a href="#" className="hover:text-accent transition-colors">Contact</a>
        </div>
      </footer>
    </div>
  );
}
