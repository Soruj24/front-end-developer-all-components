"use client";

import { useState } from "react";

export function BasicBadges() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {["Frontend", "Backend", "DevOps", "Design"].map((label) => (
        <span key={label} className="inline-flex items-center gap-1.5 rounded-full bg-zinc-900 px-3 py-1 text-xs font-medium text-white dark:bg-zinc-100 dark:text-zinc-900">
          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>
          {label}
        </span>
      ))}
    </div>
  );
}

export function BadgeColors() {
  const colors = [
    { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200", darkBg: "dark:bg-blue-950/40", darkText: "dark:text-blue-400", darkBorder: "dark:border-blue-800" },
    { bg: "bg-violet-50", text: "text-violet-700", border: "border-violet-200", darkBg: "dark:bg-violet-950/40", darkText: "dark:text-violet-400", darkBorder: "dark:border-violet-800" },
    { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", darkBg: "dark:bg-emerald-950/40", darkText: "dark:text-emerald-400", darkBorder: "dark:border-emerald-800" },
    { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200", darkBg: "dark:bg-amber-950/40", darkText: "dark:text-amber-400", darkBorder: "dark:border-amber-800" },
    { bg: "bg-rose-50", text: "text-rose-700", border: "border-rose-200", darkBg: "dark:bg-rose-950/40", darkText: "dark:text-rose-400", darkBorder: "dark:border-rose-800" },
    { bg: "bg-cyan-50", text: "text-cyan-700", border: "border-cyan-200", darkBg: "dark:bg-cyan-950/40", darkText: "dark:text-cyan-400", darkBorder: "dark:border-cyan-800" },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2">
      {colors.map((c, i) => (
        <span key={i} className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${c.bg} ${c.text} ${c.border} ${c.darkBg} ${c.darkText} ${c.darkBorder}`}>
          {["Alpha", "Beta", "Gamma", "Delta", "Epsilon", "Zeta"][i]}
        </span>
      ))}
    </div>
  );
}

export function BadgeSizes() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="inline-flex items-center rounded-full bg-zinc-900 px-2 py-0.5 text-[10px] font-medium text-white dark:bg-zinc-100 dark:text-zinc-900">XS</span>
      <span className="inline-flex items-center rounded-full bg-zinc-900 px-2.5 py-0.5 text-xs font-medium text-white dark:bg-zinc-100 dark:text-zinc-900">SM</span>
      <span className="inline-flex items-center rounded-full bg-zinc-900 px-3 py-1 text-xs font-medium text-white dark:bg-zinc-100 dark:text-zinc-900">MD</span>
      <span className="inline-flex items-center rounded-full bg-zinc-900 px-4 py-1.5 text-sm font-medium text-white dark:bg-zinc-100 dark:text-zinc-900">LG</span>
      <span className="inline-flex items-center rounded-full bg-zinc-900 px-5 py-2 text-base font-medium text-white dark:bg-zinc-100 dark:text-zinc-900">XL</span>
    </div>
  );
}

export function BadgeWithDot() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        Active
      </span>
      <span className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700 dark:bg-amber-950/40 dark:text-amber-400">
        <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
        Pending
      </span>
      <span className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-3 py-1 text-xs font-medium text-rose-700 dark:bg-rose-950/40 dark:text-rose-400">
        <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
        Error
      </span>
      <span className="inline-flex items-center gap-2 rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
        <span className="h-1.5 w-1.5 rounded-full bg-zinc-400" />
        Inactive
      </span>
    </div>
  );
}

export function BadgeWithIcon() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
        <svg className="h-3 w-3 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>
        Figma
      </span>
      <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
        <svg className="h-3 w-3 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
        Code
      </span>
      <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
        <svg className="h-3 w-3 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
        Premium
      </span>
    </div>
  );
}

export function BadgeRemovable() {
  const [badges, setBadges] = useState(["React", "TypeScript", "Tailwind", "Next.js"]);

  const remove = (label: string) => {
    setBadges((prev) => prev.filter((b) => b !== label));
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        {badges.map((label) => (
          <span key={label} className="inline-flex items-center gap-1.5 rounded-full bg-zinc-900 px-3 py-1 text-xs font-medium text-white dark:bg-zinc-100 dark:text-zinc-900">
            {label}
            <button onClick={() => remove(label)} className="ml-0.5 rounded-full p-0.5 transition-colors hover:bg-white/20 dark:hover:bg-zinc-900/20">
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </span>
        ))}
      </div>
      {badges.length === 0 && (
        <button onClick={() => setBadges(["React", "TypeScript", "Tailwind", "Next.js"])} className="inline-flex w-fit items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-600 transition-all hover:bg-zinc-50 active:scale-95 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800">
          Reset
        </button>
      )}
    </div>
  );
}
