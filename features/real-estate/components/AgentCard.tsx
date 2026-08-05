"use client";

import { cn } from "@/lib/cn";
import { formatPrice } from "../constants/properties";
import { AGENT } from "../constants/market-data";

export function AgentCard() {
  return (
    <div className="rounded-xl border border-border/50 bg-background p-5">
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        Agent Profile
      </h3>
      <div className="flex flex-col items-center gap-4">
        <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary/80 to-primary" />

        <div className="text-center">
          <h4 className="text-base font-semibold text-foreground">{AGENT.name}</h4>
          <p className="text-sm text-muted-foreground">{AGENT.title}</p>
          <p className="text-xs text-muted-foreground/70">{AGENT.company}</p>
        </div>

        <div className="flex items-center gap-1 text-sm">
          <svg className="h-4 w-4 fill-amber-400 text-amber-400" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="font-medium text-foreground">{AGENT.rating}</span>
          <span className="text-muted-foreground/70">({AGENT.reviews} reviews)</span>
        </div>

        <div className="grid w-full grid-cols-2 gap-3 text-center text-sm">
          <div className="rounded-lg bg-muted/40 p-3">
            <span className="block text-lg font-bold text-foreground">{AGENT.listings}</span>
            <span className="text-muted-foreground">Listings</span>
          </div>
          <div className="rounded-lg bg-muted/40 p-3">
            <span className="block text-lg font-bold text-foreground">{AGENT.experience}</span>
            <span className="text-muted-foreground">Experience</span>
          </div>
        </div>

        <div className="flex w-full flex-col gap-2">
          <a
            href={`tel:${AGENT.phone}`}
            className="w-full rounded-lg bg-primary px-4 py-2.5 text-center text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 active:scale-[0.98]"
          >
            Call {AGENT.phone}
          </a>
          <a
            href={`mailto:${AGENT.email}`}
            className="w-full rounded-lg border border-border px-4 py-2.5 text-center text-sm font-medium text-muted-foreground transition-colors hover:bg-muted"
          >
            Email Agent
          </a>
        </div>
      </div>
    </div>
  );
}
