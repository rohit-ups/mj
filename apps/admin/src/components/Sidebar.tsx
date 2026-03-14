import { Waves, Calendar, Users, Settings, LogOut, Menu, X, LayoutDashboard, Package, Home, HelpCircle, FileText } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const sections = [
  {
    title: "Operations",
    items: [
      { name: "Dashboard", to: "/", icon: LayoutDashboard },
      { name: "Bookings", to: "/bookings", icon: Calendar },
      { name: "Batches", to: "/batches", icon: Users },
      { name: "Roster", to: "/roster", icon: Users },
    ]
  },
  {
    title: "Management",
    items: [
      { name: "Packages", to: "/packages", icon: Package },
      { name: "Properties", to: "/properties", icon: Home },
      { name: "Instructors", to: "/instructors", icon: Users },
    ]
  },
  {
    title: "Content",
    items: [
      { name: "FAQs", to: "/faqs", icon: HelpCircle },
      { name: "Site Settings", to: "/settings", icon: Settings },
    ]
  }
];

export function Sidebar() {
  const location = useLocation();
  const pathname = location.pathname;
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 right-4 z-50 p-2 bg-white border-2 border-black hover:bg-accent hover:text-white transition-colors"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-white border-r-2 border-black flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:h-screen",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-6 border-b-2 border-black flex items-center gap-2">
          <img src="/logo.png" alt="Mambo Jambo Logo" className="w-8 h-8 object-contain" />
          <span className="font-display text-xl tracking-tighter uppercase">Admin</span>
        </div>

        <nav className="flex-1 p-4 space-y-6 overflow-y-auto">
          {sections.map((section) => (
            <div key={section.title} className="space-y-2">
              <h3 className="px-4 font-mono text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">
                {section.title}
              </h3>
              <div className="space-y-1">
                {section.items.map((item) => {
                  const isActive = pathname === item.to;
                  return (
                    <Link
                      key={item.name}
                      to={item.to}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-4 py-2 font-display text-xs uppercase tracking-widest transition-all border-2",
                        isActive
                          ? "bg-black text-white border-black"
                          : "border-transparent hover:bg-mj-accent hover:text-white hover:border-black"
                      )}
                    >
                      <item.icon className="w-4 h-4" />
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="p-4 border-t-2 border-black">
          <Link
            to="/login"
            className="flex items-center gap-3 px-4 py-3 font-display text-sm uppercase tracking-widest hover:bg-black hover:text-white transition-colors border-2 border-black"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Link>
        </div>
      </aside>
    </>
  );
}
