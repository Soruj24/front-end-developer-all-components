"use client";

import { useState } from "react";
import Image from "next/image";
import { leads } from "../constants/crm-data";
import { Badge } from "./Badge";
import { SectionCard } from "./SectionCard";

export function LeadCards() {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? leads : leads.filter((l) => l.status === filter);

  return (
    <SectionCard title="Lead Cards" description="Qualified leads ranked by score">
      <div className="flex gap-2 pb-4">
        {["All", "Hot", "Warm", "Cold"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              filter === f
                ? "bg-blue-600 text-white"
                : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
            }`}
          >
            {f}
          </button>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((l) => (
          <div key={l.id} className="rounded-lg border border-zinc-200 p-4 transition-colors hover:border-blue-200 dark:border-zinc-800 dark:hover:border-blue-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Image src={l.image} alt={l.name} width={36} height={36} className="rounded-full object-cover" />
                <div>
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">{l.name}</h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">{l.company}</p>
                </div>
              </div>
              <Badge variant={l.status}>{l.status}</Badge>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                <div className="h-full rounded-full bg-blue-500" style={{ width: `${l.score}%` }} />
              </div>
              <span className="text-xs font-medium text-zinc-500">{l.score}</span>
            </div>
            <div className="mt-3 flex justify-between text-xs text-zinc-500 dark:text-zinc-400">
              <span>{l.source}</span>
              <span>{l.interest}</span>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
