"use client";

import * as React from "react";
import { useState } from "react";
import { BentoGrid, type BentoCard, type BentoCardSpan } from "@/components/ui";
import { cn } from "@/lib/cn";

/* ------------------------------------------------------------------ */
/* Shared mini-widgets                                                 */
/* ------------------------------------------------------------------ */

function Sparkline({ d, className }: { d: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 120 40"
      className={cn("h-10 w-full", className)}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path d={`${d} L120 40 L0 40 Z`} fill="currentColor" opacity={0.12} />
      <path
        d={d}
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </svg>
  );
}

function Bars({
  values,
  className,
  barClassName,
}: {
  values: number[];
  className?: string;
  barClassName?: string;
}) {
  return (
    <div className={cn("flex h-full items-end gap-1", className)}>
      {values.map((v, i) => (
        <div
          key={i}
          className={cn("flex-1 rounded-full", barClassName)}
          style={{ height: `${v}%` }}
        />
      ))}
    </div>
  );
}

function Stat({
  label,
  value,
  delta,
  sparkline,
  className,
}: {
  label: string;
  value: string;
  delta?: string;
  sparkline?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex h-full flex-col justify-between p-4", className)}>
      <div className="flex items-center justify-between gap-2">
        <p className="text-[11px] font-medium uppercase tracking-wider opacity-70">
          {label}
        </p>
        {delta && (
          <span className="rounded-full bg-emerald-400/20 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-500 dark:text-emerald-300">
            {delta}
          </span>
        )}
      </div>
      <div className="flex items-end justify-between gap-3">
        <p className="text-2xl font-semibold leading-none">{value}</p>
        {sparkline && <Sparkline d={sparkline} />}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Analytics bento                                                     */
/* ------------------------------------------------------------------ */

const channelBars = [
  { label: "Search", value: 62 },
  { label: "Direct", value: 48 },
  { label: "Referral", value: 31 },
];

const channelContent = (
  <div className="flex h-full flex-col justify-between gap-3 p-4">
    <p className="text-[11px] font-medium uppercase tracking-wider opacity-70">
      Top channels
    </p>
    <div className="flex flex-col gap-2">
      {channelBars.map((row) => (
        <div key={row.label} className="flex items-center gap-2">
          <span className="w-16 shrink-0 text-xs opacity-70">{row.label}</span>
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-black/[0.06] dark:bg-white/[0.08]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 dark:from-indigo-400 dark:to-violet-400"
              style={{ width: `${row.value}%` }}
            />
          </div>
          <span className="w-8 shrink-0 text-right text-xs tabular-nums opacity-70">
            {row.value}
          </span>
        </div>
      ))}
    </div>
  </div>
);

const streakContent = (
  <div className="flex h-full flex-col justify-between p-4">
    <div className="flex items-center justify-between">
      <p className="text-[11px] font-medium uppercase tracking-wider opacity-70">
        Streak
      </p>
      <span className="text-lg">🔥</span>
    </div>
    <div>
      <p className="text-3xl font-semibold leading-none">12</p>
      <p className="mt-1 text-xs opacity-70">days in a row</p>
    </div>
  </div>
);

const teamTiles = [
  { initials: "JD", name: "John Doe", status: "Online", color: "from-sky-400 to-blue-600" },
  { initials: "AK", name: "Alice Kim", status: "Away", color: "from-emerald-400 to-teal-600" },
  { initials: "ML", name: "Mike Lee", status: "Online", color: "from-fuchsia-400 to-purple-600" },
  { initials: "RS", name: "Rachel Sun", status: "Busy", color: "from-amber-400 to-orange-600" },
];

const nestedTeam: BentoCard[] = teamTiles.map((m) => ({
  id: `team-${m.initials.toLowerCase()}`,
  content: (
    <div className="flex h-full flex-col items-center justify-center gap-2 rounded-xl bg-black/[0.03] p-2 text-center dark:bg-white/[0.05]">
      <div
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br text-xs font-semibold text-white",
          m.color
        )}
      >
        {m.initials}
      </div>
      <div className="leading-tight">
        <p className="truncate text-[11px] font-medium">{m.name}</p>
        <p className="text-[10px] opacity-60">{m.status}</p>
      </div>
    </div>
  ),
}));

export const analyticsCards: BentoCard[] = [
  {
    id: "traffic",
    title: "Traffic",
    span: { cols: 2, rows: 2 },
    className:
      "bg-gradient-to-br from-indigo-500 to-violet-600 text-white dark:from-indigo-500 dark:to-violet-700",
    content: (
      <div className="flex h-full flex-col justify-between p-4">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-medium uppercase tracking-wider opacity-80">
            Traffic
          </p>
          <span className="rounded-full bg-white/20 px-1.5 py-0.5 text-[10px] font-semibold">
            +18%
          </span>
        </div>
        <div className="flex items-end justify-between gap-3">
          <p className="text-4xl font-semibold leading-none">48,290</p>
          <Sparkline
            d="M0 34 L18 28 L36 30 L54 22 L72 24 L90 14 L108 16 L120 8"
            className="h-12 w-28"
          />
        </div>
        <p className="text-xs opacity-80">visits this month</p>
      </div>
    ),
  },
  {
    id: "channel",
    title: "Top channels",
    span: { cols: 2, rows: 1 },
    content: channelContent,
  },
  {
    id: "followers",
    title: "Followers",
    span: { cols: 1, rows: 1 },
    content: (
      <Stat
        label="Followers"
        value="8,214"
        delta="+4.2%"
        sparkline="M0 30 L24 26 L48 28 L72 20 L96 22 L120 12"
      />
    ),
  },
  {
    id: "views",
    title: "Views",
    span: { cols: 1, rows: 1 },
    content: (
      <Stat
        label="Views"
        value="129k"
        delta="+9%"
        sparkline="M0 34 L24 30 L48 32 L72 18 L96 20 L120 10"
      />
    ),
  },
  {
    id: "streak",
    title: "Streak",
    span: { cols: 1, rows: 2 },
    className: "bg-gradient-to-b from-amber-400/90 to-orange-500/90 text-white",
    content: streakContent,
  },
  {
    id: "team",
    title: "Team activity",
    span: { cols: 2, rows: 2 },
    content: (
      <div className="flex h-full flex-col gap-2 p-3">
        <p className="text-[11px] font-medium uppercase tracking-wider opacity-70">
          Team activity
        </p>
        <div className="flex flex-1 items-center">
          <BentoGrid
            cards={nestedTeam}
            columns={2}
            tabletColumns={2}
            mobileColumns={2}
            rowHeight={46}
            gap={8}
            draggable={false}
            resizable={false}
            ariaLabel="Team activity grid"
          />
        </div>
      </div>
    ),
  },
  {
    id: "target",
    title: "Monthly target",
    span: { cols: 2, rows: 1 },
    content: (
      <div className="flex h-full flex-col justify-between gap-2 p-4">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-medium uppercase tracking-wider opacity-70">
            Monthly target
          </p>
          <span className="text-xs tabular-nums opacity-70">68%</span>
        </div>
        <div className="h-2.5 overflow-hidden rounded-full bg-black/[0.06] dark:bg-white/[0.08]">
          <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-emerald-400 to-teal-500" />
        </div>
        <p className="text-xs opacity-60">34 of 50 milestones delivered</p>
      </div>
    ),
  },
  {
    id: "devices",
    title: "Devices",
    span: { cols: 1, rows: 1 },
    content: (
      <div className="flex h-full flex-col justify-between p-4">
        <p className="text-[11px] font-medium uppercase tracking-wider opacity-70">
          Devices
        </p>
        <Bars values={[55, 80, 38]} barClassName="bg-zinc-400 dark:bg-zinc-500" />
        <div className="flex justify-between text-[10px] opacity-60">
          <span>iOS</span>
          <span>Web</span>
          <span>Android</span>
        </div>
      </div>
    ),
  },
  {
    id: "speed",
    title: "Speed",
    span: { cols: 1, rows: 1 },
    content: (
      <div className="flex h-full flex-col justify-between p-4">
        <p className="text-[11px] font-medium uppercase tracking-wider opacity-70">
          Speed
        </p>
        <p className="text-3xl font-semibold leading-none">
          0.8<span className="text-base font-normal opacity-70">s</span>
        </p>
        <p className="text-xs text-emerald-500 dark:text-emerald-400">p95 load</p>
      </div>
    ),
  },
];

/* ------------------------------------------------------------------ */
/* Drag & resize playground                                            */
/* ------------------------------------------------------------------ */

export const playgroundCards: BentoCard[] = [
  { id: "hero", span: { cols: 2, rows: 2 }, title: "Hero" },
  { id: "side", span: { cols: 1, rows: 1 }, title: "Side" },
  { id: "note", span: { cols: 1, rows: 1 }, title: "Note" },
  { id: "wide", span: { cols: 2, rows: 1 }, title: "Wide" },
  { id: "tall", span: { cols: 1, rows: 2 }, title: "Tall" },
  { id: "small", span: { cols: 1, rows: 1 }, title: "Small" },
];

const tileColors: Record<string, string> = {
  hero: "from-sky-400 to-indigo-500",
  side: "from-emerald-400 to-teal-500",
  note: "from-amber-400 to-orange-500",
  wide: "from-fuchsia-400 to-purple-500",
  tall: "from-rose-400 to-pink-500",
  small: "from-cyan-400 to-sky-500",
};

export function BentoPlayground() {
  const [spans, setSpans] = useState<Record<string, BentoCardSpan>>({});
  const [moves, setMoves] = useState(0);

  const cards = playgroundCards.map((card) => ({
    ...card,
    content: (
      <div className="flex h-full flex-col items-center justify-center gap-1 bg-gradient-to-br p-3 text-center text-white">
        <span className="font-mono text-2xl font-semibold leading-none">
          {(spans[card.id]?.cols ?? card.span?.cols ?? 1)}×
          {(spans[card.id]?.rows ?? card.span?.rows ?? 1)}
        </span>
        <span className="text-[11px] font-medium uppercase tracking-wider opacity-80">
          {card.title}
        </span>
      </div>
    ),
    className: cn("border-transparent", tileColors[card.id]),
  }));

  return (
    <div className="flex w-full flex-col gap-4 py-4">
      <BentoGrid
        cards={cards}
        onResize={(id, span) => setSpans((prev) => ({ ...prev, [id]: span }))}
        onReorder={() => setMoves((m) => m + 1)}
        ariaLabel="Bento drag and resize playground"
      />
      <p className="text-center text-xs text-subtle">
        {moves > 0 && `Layout updated ${moves} time${moves === 1 ? "" : "s"} · `}
        Drag a card to reorder, pull the corner handle to resize. Focus a card
        and use{" "}
        <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono">←</kbd>{" "}
        <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono">→</kbd>{" "}
        <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono">↑</kbd>{" "}
        <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono">↓</kbd> to
        move, add{" "}
        <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono">⇧</kbd> to
        resize.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Nested grid demo                                                    */
/* ------------------------------------------------------------------ */

const nestedMini: BentoCard[] = [
  {
    id: "metric-1",
    content: (
      <div className="flex h-full flex-col justify-center gap-1 rounded-xl bg-black/[0.04] p-3 dark:bg-white/[0.06]">
        <p className="text-[10px] uppercase tracking-wider opacity-60">Open rate</p>
        <p className="text-lg font-semibold leading-none">42%</p>
      </div>
    ),
  },
  {
    id: "metric-2",
    content: (
      <div className="flex h-full flex-col justify-center gap-1 rounded-xl bg-black/[0.04] p-3 dark:bg-white/[0.06]">
        <p className="text-[10px] uppercase tracking-wider opacity-60">Click rate</p>
        <p className="text-lg font-semibold leading-none">18%</p>
      </div>
    ),
  },
  {
    id: "metric-3",
    content: (
      <div className="flex h-full flex-col justify-center gap-1 rounded-xl bg-black/[0.04] p-3 dark:bg-white/[0.06]">
        <p className="text-[10px] uppercase tracking-wider opacity-60">Unsub</p>
        <p className="text-lg font-semibold leading-none">0.9%</p>
      </div>
    ),
  },
  {
    id: "metric-4",
    content: (
      <div className="flex h-full flex-col justify-center gap-1 rounded-xl bg-black/[0.04] p-3 dark:bg-white/[0.06]">
        <p className="text-[10px] uppercase tracking-wider opacity-60">Bounces</p>
        <p className="text-lg font-semibold leading-none">2.1%</p>
      </div>
    ),
  },
];

const nestedInner: BentoCard[] = [
  {
    id: "metric-5",
    content: (
      <div className="flex h-full items-center justify-center rounded-xl bg-black/[0.04] text-lg font-semibold dark:bg-white/[0.06]">
        5.2k
      </div>
    ),
  },
  {
    id: "metric-6",
    content: (
      <div className="flex h-full items-center justify-center rounded-xl bg-black/[0.04] text-lg font-semibold dark:bg-white/[0.06]">
        1.8k
      </div>
    ),
  },
];

export const nestedCards: BentoCard[] = [
  {
    id: "campaign",
    title: "Campaign metrics",
    span: { cols: 2, rows: 2 },
    content: (
      <div className="flex h-full flex-col gap-2 p-3">
        <p className="text-[11px] font-medium uppercase tracking-wider opacity-70">
          Campaign metrics
        </p>
        <div className="flex flex-1 items-center">
          <BentoGrid
            cards={nestedMini}
            columns={2}
            tabletColumns={2}
            mobileColumns={2}
            rowHeight={50}
            gap={8}
            draggable={false}
            resizable={false}
            ariaLabel="Campaign metrics grid"
          />
        </div>
      </div>
    ),
  },
  {
    id: "summary",
    title: "Summary",
    span: { cols: 1, rows: 2 },
    className: "bg-gradient-to-b from-zinc-800 to-zinc-900 text-white dark:from-zinc-800 dark:to-zinc-900",
    content: (
      <div className="flex h-full flex-col justify-between p-4">
        <p className="text-[11px] font-medium uppercase tracking-wider opacity-70">
          Summary
        </p>
        <div>
          <p className="text-3xl font-semibold leading-none">+23%</p>
          <p className="mt-1 text-xs opacity-70">revenue vs last month</p>
        </div>
        <Bars values={[30, 45, 40, 60, 55, 75, 70, 90]} barClassName="bg-white/70" />
      </div>
    ),
  },
  {
    id: "email",
    title: "Emails sent",
    span: { cols: 1, rows: 1 },
    content: (
      <div className="flex h-full flex-col justify-between p-4">
        <p className="text-[11px] font-medium uppercase tracking-wider opacity-70">
          Emails sent
        </p>
        <p className="text-3xl font-semibold leading-none">12,4k</p>
      </div>
    ),
  },
  {
    id: "nested",
    title: "Two-level nest",
    span: { cols: 1, rows: 1 },
    content: (
      <div className="flex h-full items-center p-2">
        <BentoGrid
          cards={nestedInner}
          columns={1}
          mobileColumns={1}
          rowHeight={22}
          gap={4}
          draggable={false}
          resizable={false}
          ariaLabel="Nested summary grid"
        />
      </div>
    ),
  },
];

export function BentoNested() {
  return (
    <div className="flex w-full flex-col gap-4 py-4">
      <BentoGrid
        cards={nestedCards}
        columns={3}
        tabletColumns={2}
        mobileColumns={1}
        ariaLabel="Nested bento grid"
      />
      <p className="text-center text-xs text-subtle">
        A bento grid inside a bento grid — the nested grids are the same
        component, configured with their own columns, row height, and gap.
      </p>
    </div>
  );
}
