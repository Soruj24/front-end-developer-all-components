"use client";

import { useState } from "react";
import { Home } from "lucide-react";

export function RealEstate() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const properties = [
    { id: 1, type: "apartment", price: 4500000, beds: 2, area: 1200, location: "Downtown" },
    { id: 2, type: "villa", price: 12000000, beds: 4, area: 3500, location: "Suburbs" },
    { id: 3, type: "apartment", price: 3200000, beds: 1, area: 800, location: "Midtown" },
  ];

  const filtered = selectedType ? properties.filter((p) => p.type === selectedType) : properties;

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
          <Home className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
        </div>
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Real Estate</h3>
      </div>
      <div className="mb-4 flex gap-1.5">
        {["apartment", "villa"].map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(selectedType === type ? null : type)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition-all ${
              selectedType === type
                ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
            }`}
          >
            {type}
          </button>
        ))}
      </div>
      <div className="space-y-2">
        {filtered.map((prop) => (
          <div key={prop.id} className="rounded-lg border border-zinc-200 p-3 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center rounded-full border border-zinc-200 px-2 py-0.5 text-[10px] font-medium capitalize text-zinc-700 dark:border-zinc-700 dark:text-zinc-300">
                    {prop.type}
                  </span>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">{prop.location}</span>
                </div>
                <p className="mt-1 text-lg font-bold text-zinc-900 dark:text-zinc-100">
                  {"\u20B9"}{(prop.price / 100000).toFixed(1)}L
                </p>
              </div>
              <div className="text-right text-xs text-zinc-500 dark:text-zinc-400">
                <p>{prop.beds} beds</p>
                <p>{prop.area} sq ft</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
