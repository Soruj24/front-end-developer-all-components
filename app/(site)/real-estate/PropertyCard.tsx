import { useState } from "react";
import { StatusBadge } from "./StatusBadge";
import { formatPrice } from "./formatPrice";
import type { properties } from "./data";

export function PropertyCard({ p, featured }: { p: typeof properties[number]; featured?: boolean }) {
  const [saved, setSaved] = useState(false);
  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-border bg-white transition-all hover:shadow-lg dark:border-border dark:bg-zinc-900">
      <div className="relative flex h-48 items-center justify-center bg-gradient-to-br from-blue-100 via-sky-100 to-cyan-100 dark:from-blue-950/50 dark:via-sky-950/50 dark:to-cyan-950/50">
        <svg className="h-12 w-12 text-blue-300 dark:text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        <div className="absolute right-3 top-3 flex gap-2">
          <StatusBadge status={p.status} />
          {p.featured && <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">Featured</span>}
        </div>
        <button
          onClick={() => setSaved(!saved)}
          className="absolute left-3 top-3 rounded-full bg-white/80 p-1.5 backdrop-blur-sm transition-colors hover:bg-white dark:bg-muted/80 dark:hover:bg-muted"
        >
          <svg className={`h-4 w-4 ${saved ? "text-red-500" : "text-muted-foreground"}`} fill={saved ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>
      <div className={`flex flex-1 flex-col gap-2 p-5 ${featured ? "bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20" : ""}`}>
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-zinc-900 transition-colors group-hover:text-blue-600 dark:text-zinc-100 dark:group-hover:text-blue-400">{p.title}</h2>
        </div>
        <p className="text-sm text-muted-foreground dark:text-muted-foreground/70">{p.address}</p>
        <p className="text-xl font-bold text-foreground">{formatPrice(p.price)}</p>
        {(p.beds > 0 || p.sqft > 0) && (
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            {p.beds > 0 && <span className="flex items-center gap-1"><svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>{p.beds} Beds</span>}
            {p.baths > 0 && <span className="flex items-center gap-1"><svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>{p.baths} Baths</span>}
            {p.sqft > 0 && <span className="flex items-center gap-1"><svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>{p.sqft.toLocaleString()} sqft</span>}
          </div>
        )}
        <span className="text-xs text-muted-foreground/70 dark:text-muted-foreground">{p.type} �� Built {p.year}</span>
      </div>
    </div>
  );
}