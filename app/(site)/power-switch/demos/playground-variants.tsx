"use client";

import { useState } from "react";
import { Power, Wifi, Bluetooth, Volume2 } from "lucide-react";

export function BasicVariant() {
  const [on, setOn] = useState(false);
  return (
    <button onClick={() => setOn(!on)} className="flex flex-col items-center gap-2 group">
      <div className={`flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300 ${on ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/25" : "bg-zinc-200 text-zinc-400 group-hover:bg-zinc-300 dark:bg-zinc-700 dark:text-zinc-500"}`}>
        <Power className="h-5 w-5" />
      </div>
      <span className={`text-[10px] font-medium ${on ? "text-emerald-600" : "text-zinc-400"}`}>{on ? "On" : "Off"}</span>
    </button>
  );
}

export function SwitchVariant() {
  const [on, setOn] = useState(false);
  return (
    <button onClick={() => setOn(!on)} className={`relative h-6 w-12 rounded-full transition-colors duration-300 ${on ? "bg-emerald-500" : "bg-zinc-200 dark:bg-zinc-700"}`} role="switch" aria-checked={on}>
      <div className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-md transition-transform duration-300 ${on ? "translate-x-6" : "translate-x-0.5"}`} />
    </button>
  );
}

export function LabelVariant() {
  const [items, setItems] = useState([{ l: "Power", on: true }, { l: "Wi-Fi", on: true }, { l: "BT", on: false }]);
  return (
    <div className="space-y-2 w-full">{items.map((item, i) => <div key={item.l} className="flex items-center justify-between">
      <span className="text-xs font-medium text-zinc-900 dark:text-zinc-100">{item.l}</span>
      <button onClick={() => setItems(items.map((x, idx) => idx === i ? { ...x, on: !x.on } : x))} className={`relative h-5 w-9 rounded-full transition-colors duration-300 ${item.on ? "bg-emerald-500" : "bg-zinc-200 dark:bg-zinc-700"}`} role="switch" aria-checked={item.on}>
        <div className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-300 ${item.on ? "translate-x-4" : "translate-x-0.5"}`} />
      </button>
    </div>)}</div>
  );
}

export function PowerButtonVariant() {
  const [on, setOn] = useState(false);
  return (
    <button onClick={() => setOn(!on)} className={`group relative flex h-16 w-16 items-center justify-center rounded-full transition-all duration-500 ${on ? "bg-emerald-500 shadow-xl shadow-emerald-500/30" : "bg-zinc-200 shadow-inner dark:bg-zinc-700"}`} aria-label={on ? "Power off" : "Power on"}>
      <div className={`absolute inset-1 rounded-full transition-all duration-500 ${on ? "bg-emerald-400 opacity-50" : "bg-zinc-300 opacity-0 dark:bg-zinc-600"}`} />
      <Power className={`relative z-10 h-6 w-6 transition-all duration-300 ${on ? "text-white scale-110" : "text-zinc-400"}`} />
    </button>
  );
}

export function LabeledVariant() {
  const [items, setItems] = useState([{ l: "Dark Mode", on: false }, { l: "Notifs", on: true }]);
  return (
    <div className="grid grid-cols-2 gap-2 w-full">{items.map((item, i) => <button key={item.l} onClick={() => setItems(items.map((x, idx) => idx === i ? { ...x, on: !x.on } : x))} className={`flex items-center justify-between rounded-xl border p-2.5 transition-all ${item.on ? "border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/30" : "border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950"}`}>
      <span className="text-[10px] font-medium text-zinc-900 dark:text-zinc-100">{item.l}</span>
      <div className={`relative h-4 w-7 rounded-full transition-colors duration-300 ${item.on ? "bg-emerald-500" : "bg-zinc-200 dark:bg-zinc-700"}`}><div className={`absolute top-0.5 h-3 w-3 rounded-full bg-white shadow-sm transition-transform duration-300 ${item.on ? "translate-x-3.5" : "translate-x-0.5"}`} /></div>
    </button>)}</div>
  );
}

export function PanelVariant() {
  const [controls, setControls] = useState([
    { id: 1, icon: Power, label: "Power", on: true },
    { id: 2, icon: Wifi, label: "Wi-Fi", on: true },
    { id: 3, icon: Bluetooth, label: "BT", on: false },
    { id: 4, icon: Volume2, label: "Sound", on: true },
  ]);
  return (
    <div className="space-y-1 w-full">{controls.map((c) => { const Icon = c.icon; return (
      <div key={c.id} className="flex items-center justify-between rounded-lg px-2 py-1.5 hover:bg-zinc-50 dark:hover:bg-zinc-900">
        <div className="flex items-center gap-2"><Icon className={`h-3.5 w-3.5 ${c.on ? "text-emerald-500" : "text-zinc-300 dark:text-zinc-600"}`} /><span className={`text-xs font-medium ${c.on ? "text-zinc-900 dark:text-zinc-100" : "text-zinc-400"}`}>{c.label}</span></div>
        <button onClick={() => setControls(controls.map((x) => x.id === c.id ? { ...x, on: !x.on } : x))} className={`relative h-5 w-9 rounded-full transition-colors duration-300 ${c.on ? "bg-emerald-500" : "bg-zinc-200 dark:bg-zinc-700"}`} role="switch" aria-checked={c.on}>
          <div className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-300 ${c.on ? "translate-x-4" : "translate-x-0.5"}`} />
        </button>
      </div>
    ); })}</div>
  );
}
