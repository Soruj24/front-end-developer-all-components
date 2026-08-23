"use client";

import { useState } from "react";

export function BasicStripe() {
  return (
    <div className="mx-auto max-w-sm overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
      {["First item", "Second item", "Third item", "Fourth item", "Fifth item"].map((item, i) => (
        <div key={i} className={`px-4 py-3 text-sm font-medium text-zinc-700 dark:text-zinc-300 ${i % 2 === 0 ? "bg-zinc-50 dark:bg-zinc-800/50" : ""} ${i !== 0 ? "border-t border-zinc-100 dark:border-zinc-800" : ""}`}>
          {item}
        </div>
      ))}
    </div>
  );
}

export function StripeColors() {
  return (
    <div className="mx-auto max-w-sm space-y-3">
      {[
        { name: "Zinc", even: "bg-zinc-50 dark:bg-zinc-800/50", border: "border-zinc-100 dark:border-zinc-800" },
        { name: "Blue", even: "bg-blue-50/50 dark:bg-blue-950/20", border: "border-blue-100 dark:border-blue-900/30" },
        { name: "Violet", even: "bg-violet-50/50 dark:bg-violet-950/20", border: "border-violet-100 dark:border-violet-900/30" },
        { name: "Emerald", even: "bg-emerald-50/50 dark:bg-emerald-950/20", border: "border-emerald-100 dark:border-emerald-900/30" },
      ].map((c) => (
        <div key={c.name} className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
          <div className="border-b border-zinc-200 bg-zinc-100 px-4 py-2 text-xs font-semibold text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400">{c.name}</div>
          {["Item A", "Item B", "Item C"].map((item, i) => (
            <div key={i} className={`px-4 py-2.5 text-sm font-medium text-zinc-700 dark:text-zinc-300 ${i % 2 === 0 ? c.even : ""} ${i !== 0 ? `border-t ${c.border}` : ""}`}>
              {item}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export function StripeWithIcons() {
  return (
    <div className="mx-auto max-w-sm overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
      {[
        { name: "Dashboard", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
        { name: "Analytics", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
        { name: "Settings", icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" },
        { name: "Users", icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" },
      ].map((item, i) => (
        <div key={i} className={`flex items-center gap-3 px-4 py-3 text-sm font-medium text-zinc-700 dark:text-zinc-300 ${i % 2 === 0 ? "bg-zinc-50 dark:bg-zinc-800/50" : ""} ${i !== 0 ? "border-t border-zinc-100 dark:border-zinc-800" : ""}`}>
          <svg className="h-4 w-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} /></svg>
          {item.name}
        </div>
      ))}
    </div>
  );
}

export function StripeTable() {
  return (
    <div className="mx-auto max-w-md overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-zinc-200 bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800">
            <th className="px-4 py-2.5 text-left text-xs font-semibold text-zinc-600 dark:text-zinc-400">Name</th>
            <th className="px-4 py-2.5 text-left text-xs font-semibold text-zinc-600 dark:text-zinc-400">Role</th>
            <th className="px-4 py-2.5 text-left text-xs font-semibold text-zinc-600 dark:text-zinc-400">Status</th>
          </tr>
        </thead>
        <tbody>
          {[
            { name: "Alice", role: "Admin", status: "Active" },
            { name: "Bob", role: "Editor", status: "Active" },
            { name: "Carol", role: "Viewer", status: "Inactive" },
            { name: "Dave", role: "Editor", status: "Active" },
          ].map((row, i) => (
            <tr key={i} className={`${i % 2 === 0 ? "bg-zinc-50 dark:bg-zinc-800/50" : ""} ${i !== 0 ? "border-t border-zinc-100 dark:border-zinc-800" : ""}`}>
              <td className="px-4 py-2.5 font-medium text-zinc-700 dark:text-zinc-300">{row.name}</td>
              <td className="px-4 py-2.5 text-zinc-500 dark:text-zinc-400">{row.role}</td>
              <td className="px-4 py-2.5">
                <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ${row.status === "Active" ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"}`}>{row.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function StripeInteractive() {
  const [stripe, setStripe] = useState(true);

  return (
    <div className="flex flex-col items-center gap-3">
      <button onClick={() => setStripe(!stripe)} className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all ${stripe ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900" : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"}`}>
        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
        {stripe ? "Stripes On" : "Stripes Off"}
      </button>
      <div className="mx-auto w-full max-w-sm overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
        {["React", "Vue", "Angular", "Svelte", "Solid"].map((item, i) => (
          <div key={i} className={`px-4 py-3 text-sm font-medium text-zinc-700 dark:text-zinc-300 transition-colors duration-200 ${stripe && i % 2 === 0 ? "bg-zinc-50 dark:bg-zinc-800/50" : ""} ${i !== 0 ? "border-t border-zinc-100 dark:border-zinc-800" : ""}`}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export function StripeGradient() {
  return (
    <div className="mx-auto max-w-sm overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
      {["Layout", "Spacing", "Colors", "Typography", "Components"].map((item, i) => (
        <div key={i} className={`px-4 py-3 text-sm font-medium text-zinc-700 dark:text-zinc-300 ${i % 2 === 0 ? `bg-gradient-to-r from-zinc-50 to-transparent dark:from-zinc-800/50` : ""} ${i !== 0 ? "border-t border-zinc-100 dark:border-zinc-800" : ""}`}>
          {item}
        </div>
      ))}
    </div>
  );
}
