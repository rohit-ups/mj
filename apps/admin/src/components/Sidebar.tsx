"use client";

import { Waves, Calendar, Users, Settings, LogOut, Menu, X, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Bookings", href: "/bookings", icon: Calendar },
  { name: "Batches", href: "/batches", icon: Users },
  { name: "Roster", href: "/roster", icon: Users },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
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
          <Waves className="w-6 h-6 text-accent" />
          <span className="font-display text-xl tracking-tighter uppercase">Admin</span>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 font-display text-sm uppercase tracking-widest transition-all border-2",
                  isActive
                    ? "bg-black text-white border-black"
                    : "border-transparent hover:bg-accent hover:text-white hover:border-black"
                )}
              >
                <item.icon className="w-4 h-4" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t-2 border-black">
          <Link
            href="/login"
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
