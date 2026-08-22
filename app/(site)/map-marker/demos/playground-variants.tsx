"use client";

import { useState } from "react";
import { Home, Building2, Star, MapPin, Navigation, Utensils, Car } from "lucide-react";

export function LocationPinVariant() {
  const [sel, setSel] = useState<string | null>(null);
  const locs = [
    { id: "home", label: "Home", icon: Home, color: "bg-zinc-900 dark:bg-zinc-100" },
    { id: "office", label: "Office", icon: Building2, color: "bg-zinc-700 dark:bg-zinc-300" },
    { id: "gym", label: "Gym", icon: Star, color: "bg-zinc-500 dark:bg-zinc-400" },
  ];
  return (
    <div className="relative h-40 overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-900">
      {locs.map((loc) => {
        const Icon = loc.icon;
        return (
          <button
            key={loc.id}
            onClick={() => setSel(loc.id)}
            className={`absolute z-0 transform -translate-x-1/2 -translate-y-full transition-all ${sel === loc.id ? "z-10 scale-125" : "hover:scale-110"}`}
            style={{ left: loc.id === "home" ? "30%" : loc.id === "office" ? "60%" : "45%", top: loc.id === "home" ? "50%" : loc.id === "office" ? "35%" : "70%" }}
          >
            <div className="flex flex-col items-center">
              <div className={`${loc.color} flex h-8 w-8 items-center justify-center rounded-full text-white shadow-lg`}><Icon className="h-4 w-4" /></div>
              <div className="h-0 w-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-zinc-400" />
            </div>
          </button>
        );
      })}
    </div>
  );
}

export function DeliveryVariant() {
  const [step, setStep] = useState(0);
  const steps = ["Placed", "Packed", "Shipped", "Delivered"];
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        {steps.map((s, i) => (
          <div key={i} className="flex flex-col items-center flex-1">
            <div className={`flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-medium transition-all ${i <= step ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900" : "bg-zinc-200 text-zinc-500 dark:bg-zinc-700 dark:text-zinc-400"}`}>
              {i < step ? "\u2713" : i + 1}
            </div>
            <span className="mt-1 text-[10px] text-zinc-500 dark:text-zinc-400">{s}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0} className="flex-1 rounded-lg border border-zinc-200 px-3 py-1.5 text-xs font-medium transition-colors hover:bg-zinc-50 disabled:opacity-40 dark:border-zinc-700 dark:hover:bg-zinc-800">Prev</button>
        <button onClick={() => setStep(Math.min(steps.length - 1, step + 1))} disabled={step === steps.length - 1} className="flex-1 rounded-lg bg-zinc-900 px-3 py-1.5 text-xs font-medium text-white transition-all hover:bg-zinc-800 disabled:opacity-40 dark:bg-zinc-100 dark:text-zinc-900">Next</button>
      </div>
    </div>
  );
}

export function StoreVariant() {
  const [filter, setFilter] = useState<string | null>(null);
  const stores = [
    { id: 1, name: "Tech Store", dist: "0.5 km", type: "electronics", rating: 4.5 },
    { id: 2, name: "Fashion Hub", dist: "1.2 km", type: "clothing", rating: 4.2 },
  ];
  const filtered = filter ? stores.filter((s) => s.type === filter) : stores;
  return (
    <>
      <div className="mb-3 flex gap-1.5">
        {["electronics", "clothing"].map((t) => (
          <button key={t} onClick={() => setFilter(filter === t ? null : t)} className={`rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition-all ${filter === t ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900" : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400"}`}>{t}</button>
        ))}
      </div>
      <div className="space-y-1.5">
        {filtered.map((s) => (
          <div key={s.id} className="flex items-center gap-3 rounded-lg border border-zinc-200 p-2.5 dark:border-zinc-800">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800"><MapPin className="h-3.5 w-3.5 text-zinc-500" /></div>
            <div className="flex-1"><p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{s.name}</p><p className="text-[10px] text-zinc-500">{s.dist} &middot; {s.rating}</p></div>
          </div>
        ))}
      </div>
    </>
  );
}

export function EventVariant() {
  const [sel, setSel] = useState<number | null>(null);
  const events = [{ id: 1, name: "Conference", x: 25, y: 40 }, { id: 2, name: "Workshop", x: 70, y: 55 }];
  return (
    <div className="relative h-40 overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-900">
      {events.map((e) => (
        <button key={e.id} onClick={() => setSel(e.id)} className={`absolute z-0 transform -translate-x-1/2 -translate-y-1/2 transition-all ${sel === e.id ? "z-10 scale-110" : ""}`} style={{ left: `${e.x}%`, top: `${e.y}%` }}>
          <div className="whitespace-nowrap rounded-full bg-zinc-900 px-2.5 py-1 text-[10px] font-medium text-white shadow-lg dark:bg-zinc-100 dark:text-zinc-900">{e.name}</div>
        </button>
      ))}
    </div>
  );
}

export function ParkingVariant() {
  const [sel, setSel] = useState<number | null>(null);
  const spots = [{ id: 1, name: "Lot A", price: 200, avail: 15 }, { id: 2, name: "Lot B", price: 100, avail: 42 }];
  return (
    <div className="space-y-1.5">
      {spots.map((s) => (
        <div key={s.id} onClick={() => setSel(s.id)} className={`cursor-pointer rounded-lg border p-3 transition-all ${sel === s.id ? "border-zinc-400 bg-zinc-50 dark:border-zinc-600 dark:bg-zinc-900" : "border-zinc-200 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900"}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${s.avail > 20 ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"} dark:bg-zinc-800 dark:text-zinc-400`}><Car className="h-3.5 w-3.5" /></div>
              <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{s.name}</p>
            </div>
            <div className="text-right"><p className="text-xs font-bold text-zinc-900 dark:text-zinc-100">{"\u20B9"}{s.price}/hr</p><p className={`text-[10px] font-medium ${s.avail > 20 ? "text-emerald-600" : "text-amber-600"}`}>{s.avail} spots</p></div>
          </div>
        </div>
      ))}
    </div>
  );
}
