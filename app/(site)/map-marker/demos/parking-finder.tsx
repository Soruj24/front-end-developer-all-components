"use client";

import { useState } from "react";
import { Car } from "lucide-react";

export function ParkingFinder() {
  const [selectedSpot, setSelectedSpot] = useState<number | null>(null);
  const spots = [
    { id: 1, name: "Lot A", type: "covered", price: 200, available: 15 },
    { id: 2, name: "Lot B", type: "open", price: 100, available: 42 },
    { id: 3, name: "Lot C", type: "valet", price: 350, available: 5 },
  ];

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
          <Car className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
        </div>
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Parking Finder</h3>
      </div>
      <div className="space-y-2">
        {spots.map((spot) => (
          <div
            key={spot.id}
            onClick={() => setSelectedSpot(spot.id)}
            className={`cursor-pointer rounded-lg border p-4 transition-all ${
              selectedSpot === spot.id
                ? "border-zinc-400 bg-zinc-50 shadow-sm dark:border-zinc-600 dark:bg-zinc-900"
                : "border-zinc-200 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                  spot.available > 20
                    ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400"
                    : spot.available > 10
                    ? "bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400"
                    : "bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400"
                }`}>
                  <Car className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{spot.name}</p>
                  <p className="text-xs capitalize text-zinc-500 dark:text-zinc-400">{spot.type}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{"\u20B9"}{spot.price}/hr</p>
                <p className={`text-xs font-medium ${
                  spot.available > 20 ? "text-emerald-600 dark:text-emerald-400" : spot.available > 10 ? "text-amber-600 dark:text-amber-400" : "text-red-600 dark:text-red-400"
                }`}>
                  {spot.available} spots
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
