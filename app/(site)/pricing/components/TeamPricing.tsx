"use client";

import { useState } from "react";

export function TeamPricing() {
  const [teamBase, setTeamBase] = useState(1);
  const teamBasePrice = 29;
  const teamPerAdditional = 9;
  const teamTotal = teamBasePrice + Math.max(0, teamBase - 1) * teamPerAdditional;

  return (
    <div className="mx-auto max-w-md rounded-2xl border bg-white p-8 shadow-sm dark:border-border dark:bg-zinc-900">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Team members</span>
        <div className="flex items-center gap-3">
          <button onClick={() => setTeamBase(Math.max(1, teamBase - 1))} className="flex h-8 w-8 items-center justify-center rounded-full border text-lg font-bold transition hover:bg-muted dark:border-border dark:hover:bg-muted">−</button>
          <span className="min-w-[2ch] text-center text-xl font-bold">{teamBase}</span>
          <button onClick={() => setTeamBase(teamBase + 1)} className="flex h-8 w-8 items-center justify-center rounded-full border text-lg font-bold transition hover:bg-muted dark:border-border dark:hover:bg-muted">+</button>
        </div>
      </div>
      <div className="mt-4 space-y-2 text-sm text-muted-foreground">
        <div className="flex justify-between"><span>Base plan (1 member)</span><span>$29/mo</span></div>
        {teamBase > 1 && <div className="flex justify-between"><span>{teamBase - 1} additional member{(teamBase - 1) > 1 ? "s" : ""}</span><span>+${(teamBase - 1) * teamPerAdditional}/mo</span></div>}
      </div>
      <div className="mt-4 flex items-center justify-between border-t border-border pt-4 dark:border-border">
        <span className="text-sm font-medium">Total</span>
        <span className="text-3xl font-bold">${teamTotal}<span className="text-base font-normal text-muted-foreground">/mo</span></span>
      </div>
      <button className="mt-6 w-full rounded-xl bg-zinc-900 py-2.5 text-sm font-semibold text-white transition hover:bg-muted dark:bg-foreground dark:text-background">Start Team Plan</button>
    </div>
  );
}
