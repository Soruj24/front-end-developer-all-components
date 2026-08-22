"use client";

import { useState } from "react";
import { MapPin, Star, Navigation } from "lucide-react";

export function StoreLocator() {
  const [filter, setFilter] = useState<string | null>(null);
  const stores = [
    { id: 1, name: "Tech Store", distance: "0.5 km", type: "electronics", rating: 4.5 },
    { id: 2, name: "Fashion Hub", distance: "1.2 km", type: "clothing", rating: 4.2 },
    { id: 3, name: "Grocery Mart", distance: "0.8 km", type: "grocery", rating: 4.8 },
    { id: 4, name: "Book Corner", distance: "2.1 km", type: "books", rating: 4.0 },
  ];

  const filtered = filter ? stores.filter((s) => s.type === filter) : stores;

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
          <Navigation className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
        </div>
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Store Locator</h3>
      </div>
      <div className="mb-4 flex flex-wrap gap-1.5">
        {["electronics", "clothing", "grocery", "books"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(filter === type ? null : type)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition-all ${
              filter === type
                ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
            }`}
          >
            {type}
          </button>
        ))}
      </div>
      <div className="space-y-1.5">
        {filtered.map((store) => (
          <div key={store.id} className="flex items-center gap-3 rounded-lg border border-zinc-200 p-3 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
              <MapPin className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{store.name}</p>
              <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                <span>{store.distance}</span>
                <span className="text-zinc-300 dark:text-zinc-600">&middot;</span>
                <span className="flex items-center gap-0.5">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  {store.rating}
                </span>
              </div>
            </div>
            <button className="rounded-lg bg-zinc-900 px-3 py-1.5 text-xs font-medium text-white transition-all hover:bg-zinc-800 active:scale-[0.98] dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200">
              Directions
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
