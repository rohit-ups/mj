import { ArrowUpRight, Calendar, Users, Waves } from "lucide-react";
import { Link } from "react-router-dom";

export default function DashboardHome() {
  return (
    <div className="p-8 space-y-8">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="font-display text-5xl uppercase tracking-tighter">Dashboard</h1>
          <p className="font-display text-sm uppercase tracking-widest opacity-60">Welcome back, Admin</p>
        </div>
        <div className="border-2 border-black p-4 bg-white">
          <span className="font-display text-xs uppercase opacity-60 block">Current Conditions</span>
          <span className="font-display text-xl uppercase">Epic • 6-8ft • Offshore</span>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="border-2 border-black p-6 bg-white space-y-4">
          <div className="flex justify-between items-start">
            <Calendar className="w-6 h-6" />
            <ArrowUpRight className="w-4 h-4 opacity-40" />
          </div>
          <div>
            <span className="font-display text-4xl uppercase">12</span>
            <span className="font-display text-xs uppercase block opacity-60">Bookings Today</span>
          </div>
        </div>

        <div className="border-2 border-black p-6 bg-accent text-white space-y-4">
          <div className="flex justify-between items-start">
            <Users className="w-6 h-6" />
            <ArrowUpRight className="w-4 h-4 opacity-40" />
          </div>
          <div>
            <span className="font-display text-4xl uppercase">4</span>
            <span className="font-display text-xs uppercase block opacity-80">Instructors Active</span>
          </div>
        </div>

        <div className="border-2 border-black p-6 bg-white space-y-4">
          <div className="flex justify-between items-start">
            <Waves className="w-6 h-6" />
            <ArrowUpRight className="w-4 h-4 opacity-40" />
          </div>
          <div>
            <span className="font-display text-4xl uppercase">85%</span>
            <span className="font-display text-xs uppercase block opacity-60">Capacity Reached</span>
          </div>
        </div>
      </div>

      <div className="border-2 border-black bg-white">
        <div className="p-4 border-b-2 border-black flex justify-between items-center">
          <h2 className="font-display text-xl uppercase tracking-tight">Recent Bookings</h2>
          <Link to="/bookings" className="font-display text-xs uppercase tracking-widest hover:text-accent transition-colors">View All</Link>
        </div>
        <div className="divide-y-2 divide-black">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="p-4 flex justify-between items-center hover:bg-sand-100 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-black text-white flex items-center justify-center font-display text-xs">
                  {String(i).padStart(2, '0')}
                </div>
                <div>
                  <p className="font-display text-sm uppercase">John Doe</p>
                  <p className="text-xs opacity-60">Beginner Lesson • 10:00 AM</p>
                </div>
              </div>
              <span className="font-display text-xs uppercase px-2 py-1 border border-black">Confirmed</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
