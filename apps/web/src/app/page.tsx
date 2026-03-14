import { ArrowRight, Waves, Sun, Wind } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex-1 flex flex-col">
      <header className="p-6 flex justify-between items-center border-b-2 border-black sticky top-0 bg-[#fbf8f1] z-50">
        <Link href="/" className="flex items-center gap-2">
          <Waves className="w-8 h-8 text-accent" />
          <span className="font-display text-2xl tracking-tighter uppercase">Mambo Jambo</span>
        </Link>
        <button className="bg-black text-white px-4 py-2 font-display text-sm uppercase tracking-widest hover:bg-accent transition-colors">
          Menu
        </button>
      </header>

      <section className="flex-1 flex flex-col p-6 md:p-12 gap-12 max-w-7xl mx-auto w-full">
        <div className="space-y-6 md:space-y-8 pt-8 md:pt-16">
          <h1 className="font-display text-6xl sm:text-7xl md:text-9xl leading-[0.85] tracking-tighter uppercase text-balance">
            Slow down <br />
            <span className="text-accent italic">Catch a breath</span> <br />
            Mambo Jambo.
          </h1>
          <p className="max-w-xl text-lg md:text-2xl font-medium leading-relaxed opacity-80 border-l-4 border-black pl-6 py-2">
            Experience the thrill of Mulki's coastline. Community, surfing, and the calm of the ocean.
            Learn a lifestyle like no other.
          </p>
        </div>

        <div className="mt-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
          <div className="space-y-4 order-2 lg:order-1">
            <Link href="/booking" className="group relative bg-accent text-white p-8 flex items-center justify-between overflow-hidden transition-all hover:pr-12 w-full">
              <span className="font-display text-4xl uppercase tracking-tighter">Start Your Journey</span>
              <ArrowRight className="w-10 h-10 transition-transform group-hover:translate-x-2" />
              <div className="absolute inset-0 bg-black/10 translate-y-full transition-transform group-hover:translate-y-0" />
            </Link>
            <div className="flex gap-4 font-display text-xs uppercase tracking-widest opacity-60">
              <span>Mulki, Karnataka</span>
              <span>•</span>
              <span>All levels welcome</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 order-1 lg:order-2">
            <div className="border-2 border-black p-4 flex flex-col justify-between aspect-square md:aspect-video bg-white hover:bg-sand-100 transition-colors">
              <Sun className="w-6 h-6" />
              <div className="space-y-1">
                <span className="font-display text-[10px] uppercase opacity-60 block">Conditions</span>
                <span className="font-display text-xl uppercase leading-none">Epic</span>
              </div>
            </div>
            <div className="border-2 border-black p-4 flex flex-col justify-between aspect-square md:aspect-video bg-white hover:bg-sand-100 transition-colors">
              <Wind className="w-6 h-6" />
              <div className="space-y-1">
                <span className="font-display text-[10px] uppercase opacity-60 block">Wind</span>
                <span className="font-display text-xl uppercase leading-none">Offshore</span>
              </div>
            </div>
            <div className="border-2 border-black p-4 flex flex-col justify-between aspect-square md:aspect-video bg-white hover:bg-sand-100 transition-colors">
              <Waves className="w-6 h-6" />
              <div className="space-y-1">
                <span className="font-display text-[10px] uppercase opacity-60 block">Swell</span>
                <span className="font-display text-xl uppercase leading-none">6-8ft</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="p-6 md:p-12 border-t-2 border-black flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mt-12 md:mt-24">
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
