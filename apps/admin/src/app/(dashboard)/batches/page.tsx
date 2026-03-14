"use client";

import { useState } from "react";
import { 
  Users, 
  Calendar, 
  Clock, 
  ChevronRight, 
  Search,
  Filter,
  ArrowRight,
  User
} from "lucide-react";
import Link from "next/link";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const batches = [
  {
    id: "B-001",
    name: "Morning Session",
    course: "Beginner Lesson",
    instructor: "Rodrigo",
    time: "09:00 AM - 11:00 AM",
    capacity: 10,
    enrolled: 8,
    days: [
      {
        date: "2026-03-14",
        bookings: [
          { id: "BK-001", name: "John Doe", status: "Confirmed" },
          { id: "BK-004", name: "Emma Wilson", status: "Confirmed" },
          { id: "BK-007", name: "Alice Brown", status: "Confirmed" },
        ]
      },
      {
        date: "2026-03-15",
        bookings: [
          { id: "BK-001", name: "John Doe", status: "Confirmed" },
          { id: "BK-002", name: "Sarah Smith", status: "Pending" },
        ]
      }
    ]
  },
  {
    id: "B-002",
    name: "Midday Session",
    course: "Intermediate Surf",
    instructor: "Tiago",
    time: "12:00 PM - 02:00 PM",
    capacity: 10,
    enrolled: 5,
    days: [
      {
        date: "2026-03-14",
        bookings: [
          { id: "BK-002", name: "Sarah Smith", status: "Pending" },
          { id: "BK-005", name: "David Brown", status: "Confirmed" },
        ]
      }
    ]
  }
];

export default function BatchesPage() {
  const [selectedBatchId, setSelectedBatchId] = useState(batches[0].id);
  const selectedBatch = batches.find(b => b.id === selectedBatchId) || batches[0];

  return (
    <div className="p-8 space-y-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="font-display text-5xl uppercase tracking-tighter">Batches</h1>
          <p className="font-display text-sm uppercase tracking-widest opacity-60">Manage course sessions and student assignments</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-4">
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40" />
            <input 
              type="text" 
              placeholder="Search batches..."
              className="w-full pl-12 pr-4 py-3 border-2 border-black bg-white font-display text-sm uppercase tracking-widest focus:outline-none"
            />
          </div>

          <div className="space-y-3">
            {batches.map((batch) => (
              <button
                key={batch.id}
                onClick={() => setSelectedBatchId(batch.id)}
                className={cn(
                  "w-full text-left p-4 border-2 border-black transition-all group relative overflow-hidden",
                  selectedBatchId === batch.id 
                    ? "bg-black text-white translate-x-2" 
                    : "bg-white hover:bg-sand-50"
                )}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="font-display text-[10px] uppercase tracking-widest opacity-60 group-hover:opacity-100">
                    {batch.id}
                  </span>
                  <span className={cn(
                    "px-2 py-0.5 border font-display text-[8px] uppercase tracking-widest",
                    selectedBatchId === batch.id ? "border-white" : "border-black"
                  )}>
                    {batch.enrolled}/{batch.capacity}
                  </span>
                </div>
                <h3 className="font-display text-lg uppercase tracking-tight mb-1">{batch.name}</h3>
                <p className={cn(
                  "font-display text-[10px] uppercase tracking-widest",
                  selectedBatchId === batch.id ? "opacity-60" : "opacity-40"
                )}>
                  {batch.course} • {batch.instructor}
                </p>
                
                {selectedBatchId === batch.id && (
                  <div className="absolute right-4 bottom-4">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-8 space-y-8">
          <section className="border-2 border-black bg-white p-8 relative overflow-hidden">
            <div className="absolute -right-12 -top-12 w-48 h-48 bg-sand-100 rounded-full opacity-50 -z-0" />
            
            <div className="relative z-10 space-y-6">
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div>
                  <h2 className="font-display text-4xl uppercase tracking-tighter mb-2">{selectedBatch.name}</h2>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 opacity-40" />
                      <span className="font-display text-xs uppercase tracking-widest">{selectedBatch.instructor}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 opacity-40" />
                      <span className="font-display text-xs uppercase tracking-widest">{selectedBatch.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 opacity-40" />
                      <span className="font-display text-xs uppercase tracking-widest">{selectedBatch.enrolled}/{selectedBatch.capacity} Students</span>
                    </div>
                  </div>
                </div>
                <button className="px-6 py-2 border-2 border-black bg-black text-white font-display text-xs uppercase tracking-widest hover:bg-accent transition-colors self-start">
                  Edit Batch
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t-2 border-black">
                {selectedBatch.days.map((day) => (
                  <div key={day.date} className="space-y-4">
                    <div className="flex items-center gap-3 pb-2 border-b border-black/10">
                      <Calendar className="w-4 h-4 opacity-40" />
                      <h4 className="font-display text-sm uppercase tracking-widest">{day.date}</h4>
                    </div>
                    
                    <div className="space-y-2">
                      {day.bookings.map((booking) => (
                        <Link 
                          key={booking.id}
                          href={`/bookings/${booking.id}`}
                          className="flex items-center justify-between p-3 border border-black bg-sand-50/30 hover:bg-white hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-white border border-black flex items-center justify-center font-display text-xs">
                              {booking.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-display text-[10px] uppercase tracking-widest">{booking.name}</p>
                              <p className="text-[8px] opacity-40 uppercase tracking-tighter">{booking.id}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={cn(
                              "px-2 py-0.5 border font-display text-[8px] uppercase tracking-widest",
                              booking.status === "Confirmed" ? "bg-green-100 text-green-800 border-green-200" : "bg-yellow-100 text-yellow-800 border-yellow-200"
                            )}>
                              {booking.status}
                            </span>
                            <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </Link>
                      ))}
                      
                      <button className="w-full py-2 border border-dashed border-black/40 font-display text-[8px] uppercase tracking-widest opacity-40 hover:opacity-100 hover:bg-sand-50 transition-all">
                        + Assign Student
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="border-2 border-black bg-white p-6">
            <h3 className="font-display text-sm uppercase tracking-widest mb-4">Batch Capacity</h3>
            <div className="h-12 border-2 border-black bg-sand-100 relative overflow-hidden">
              <div 
                className="h-full bg-accent transition-all duration-1000 ease-out"
                style={{ width: `${(selectedBatch.enrolled / selectedBatch.capacity) * 100}%` }}
              />
              <div className="absolute inset-0 flex items-center justify-center font-display text-xs uppercase tracking-widest mix-blend-difference text-white">
                {selectedBatch.enrolled} / {selectedBatch.capacity} Slots Filled
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
