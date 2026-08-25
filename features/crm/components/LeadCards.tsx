"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";
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
            className={cn(
              "rounded-full px-3 py-1 text-xs font-medium transition-all",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
              "active:scale-[0.97]",
              filter === f
                ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20"
                : "bg-muted text-muted-foreground hover:bg-accent hover:text-foreground",
            )}
          >
            {f}
          </button>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((l) => (
          <div key={l.id} className={cn(
            "rounded-lg border border-border/60 bg-card p-4",
            "shadow-sm ring-1 ring-black/[0.04] dark:ring-white/[0.08]",
            "transition-all",
            "hover:shadow-md hover:shadow-black/5 dark:hover:shadow-black/20",
            "hover:border-border hover:ring-black/[0.08] dark:hover:ring-white/[0.12]",
          )}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Image src={l.image} alt={l.name} width={36} height={36} className="rounded-full object-cover" />
                <div>
                  <h3 className="font-semibold text-foreground">{l.name}</h3>
                  <p className="text-xs text-muted-foreground">{l.company}</p>
                </div>
              </div>
              <Badge variant={l.status}>{l.status}</Badge>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                <div className="h-full rounded-full bg-blue-500 transition-all" style={{ width: `${l.score}%` }} />
              </div>
              <span className="text-xs font-medium text-muted-foreground">{l.score}</span>
            </div>
            <div className="mt-3 flex justify-between text-xs text-muted-foreground">
              <span>{l.source}</span>
              <span>{l.interest}</span>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
