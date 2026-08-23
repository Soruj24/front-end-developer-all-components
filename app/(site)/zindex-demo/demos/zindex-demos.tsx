"use client";

import { useState } from "react";

export function BasicZindex() {
  return (
    <div className="mx-auto max-w-sm">
      <div className="relative h-48 overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
        {[10, 20, 30, 40, 50].map((z, i) => (
          <div key={z} className="absolute flex items-center justify-center rounded-lg border border-white/20 font-mono text-xs font-semibold text-white shadow-md transition-all duration-300" style={{ left: `${i * 15}%`, top: `${i * 12}%`, width: "100px", height: "60px", backgroundColor: `hsl(${220 + i * 20}, 70%, ${50 - i * 5}%)`, zIndex: z }}>
            z-{z}
          </div>
        ))}
      </div>
    </div>
  );
}

export function ZindexInteractive() {
  const [layers, setLayers] = useState([
    { id: 1, z: 10, color: "hsl(220, 70%, 50%)", label: "Layer 1" },
    { id: 2, z: 20, color: "hsl(240, 70%, 50%)", label: "Layer 2" },
    { id: 3, z: 30, color: "hsl(260, 70%, 50%)", label: "Layer 3" },
  ]);

  const bringForward = (id: number) => {
    setLayers((prev) => prev.map((l) => l.id === id ? { ...l, z: Math.max(...prev.map((x) => x.z)) + 10 } : l));
  };

  return (
    <div className="mx-auto max-w-sm space-y-3">
      <div className="relative h-40 overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
        {layers.map((l, i) => (
          <button key={l.id} onClick={() => bringForward(l.id)} className="absolute flex items-center justify-center rounded-lg border border-white/20 font-mono text-xs font-semibold text-white shadow-md transition-all duration-300 hover:scale-105" style={{ left: `${i * 20 + 5}%`, top: `${i * 15 + 5}%`, width: "100px", height: "60px", backgroundColor: l.color, zIndex: l.z }}>
            z-{l.z}
          </button>
        ))}
      </div>
      <p className="text-center text-[10px] text-zinc-500 dark:text-zinc-400">Click a layer to bring it forward</p>
    </div>
  );
}

export function ZindexContexts() {
  return (
    <div className="mx-auto max-w-sm space-y-2">
      <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
        <div className="border-b border-zinc-200 bg-zinc-50 px-4 py-2 dark:border-zinc-700 dark:bg-zinc-800">
          <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Context A</span>
        </div>
        <div className="relative h-24 p-3">
          <div className="absolute left-3 top-3 flex h-16 w-20 items-center justify-center rounded-lg bg-blue-500 font-mono text-xs font-semibold text-white shadow-md" style={{ zIndex: 10 }}>z-10</div>
          <div className="absolute left-12 top-8 flex h-16 w-20 items-center justify-center rounded-lg bg-violet-500 font-mono text-xs font-semibold text-white shadow-md" style={{ zIndex: 20 }}>z-20</div>
        </div>
      </div>
      <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
        <div className="border-b border-zinc-200 bg-zinc-50 px-4 py-2 dark:border-zinc-700 dark:bg-zinc-800">
          <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Context B</span>
        </div>
        <div className="relative h-24 p-3">
          <div className="absolute left-3 top-3 flex h-16 w-20 items-center justify-center rounded-lg bg-emerald-500 font-mono text-xs font-semibold text-white shadow-md" style={{ zIndex: 50 }}>z-50</div>
          <div className="absolute left-12 top-8 flex h-16 w-20 items-center justify-center rounded-lg bg-amber-500 font-mono text-xs font-semibold text-white shadow-md" style={{ zIndex: 1 }}>z-1</div>
        </div>
      </div>
    </div>
  );
}

export function ZindexValues() {
  const values = [
    { z: 0, color: "bg-zinc-400 dark:bg-zinc-500" },
    { z: 10, color: "bg-blue-500" },
    { z: 20, color: "bg-violet-500" },
    { z: 30, color: "bg-emerald-500" },
    { z: 40, color: "bg-amber-500" },
    { z: 50, color: "bg-rose-500" },
    { z: 9999, color: "bg-zinc-900 dark:bg-zinc-100" },
  ];

  return (
    <div className="mx-auto max-w-sm">
      <div className="grid grid-cols-4 gap-2">
        {values.map((v) => (
          <div key={v.z} className="flex flex-col items-center gap-1.5">
            <div className={`flex h-14 w-14 items-center justify-center rounded-xl font-mono text-xs font-bold text-white shadow-md ${v.color}`} style={{ zIndex: v.z }}>
              {v.z}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ZindexStacking() {
  const [selected, setSelected] = useState(0);

  return (
    <div className="mx-auto max-w-sm space-y-3">
      <div className="relative h-48 overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
        {[0, 1, 2, 3, 4].map((i) => (
          <button key={i} onClick={() => setSelected(i)} className="absolute flex items-center justify-center rounded-xl border-2 font-mono text-xs font-bold text-white shadow-lg transition-all duration-300" style={{ left: `${i * 18}%`, top: `${i * 18}%`, width: "110px", height: "70px", backgroundColor: `hsl(${i * 50}, 70%, 50%)`, borderColor: selected === i ? "white" : "transparent", zIndex: selected === i ? 100 : i * 10 }}>
            {selected === i ? "SELECTED" : `z-${i * 10}`}
          </button>
        ))}
      </div>
      <div className="flex gap-1.5">
        {[0, 1, 2, 3, 4].map((i) => (
          <button key={i} onClick={() => setSelected(i)} className={`flex-1 rounded-lg py-1.5 text-[10px] font-medium transition-all ${selected === i ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900" : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"}`}>
            z-{i * 10}
          </button>
        ))}
      </div>
    </div>
  );
}
