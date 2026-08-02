"use client";

import { useState } from "react";
import { ComponentPreview } from "@/components/preview";

const variants = [
  { name: "default", class: "bg-muted text-zinc-900 dark:bg-muted dark:text-zinc-100" },
  { name: "primary", class: "bg-primary-soft text-blue-800 dark:bg-blue-900 dark:text-blue-100" },
  { name: "secondary", class: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100" },
  { name: "success", class: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100" },
  { name: "warning", class: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100" },
  { name: "error", class: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100" },
  { name: "outline", class: "border border-border text-muted-foreground dark:border-border dark:text-muted-foreground" },
];

const sizes = ["sm", "md", "lg"] as const;
const sizeClasses = { sm: "px-1.5 py-0.5 text-xs", md: "px-2 py-1 text-sm", lg: "px-3 py-1.5 text-base" };

function BellIcon() {
  return (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg className="h-3 w-3 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

export default function BadgePage() {
  const [visibleBadges, setVisibleBadges] = useState([true, true, true]);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Badge</h1>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Badge variants, sizes, and usage on icons and buttons. Each example is
          interactive — use the tabs to inspect source, CLI, installation, and
          dependencies.
        </p>
      </header>

      <ComponentPreview id="badge-variants">
        <div className="flex flex-wrap items-center gap-4">
          {variants.map((v) => (
            <span key={v.name} className={`rounded-full font-medium ${sizeClasses.md} ${v.class}`}>
              {v.name}
            </span>
          ))}
        </div>
      </ComponentPreview>

      <ComponentPreview id="badge-sizes">
        <div className="flex flex-wrap items-center gap-4">
          {sizes.map((s) => (
            <span key={s} className={`rounded-full bg-muted font-medium dark:bg-muted ${sizeClasses[s]}`}>
              {s} badge
            </span>
          ))}
        </div>
      </ComponentPreview>

      <ComponentPreview id="badge-with-icon">
        <div className="flex flex-wrap items-center gap-4">
          {variants.slice(0, 5).map((v) => (
            <span key={v.name} className={`inline-flex items-center gap-1 rounded-full font-medium ${sizeClasses.md} ${v.class}`}>
              {v.name === "success" ? <CheckIcon /> : <StarIcon />}
              {v.name}
            </span>
          ))}
        </div>
      </ComponentPreview>

      <ComponentPreview id="badge-dismissible">
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-4">
            {variants.slice(0, 3).map((v, i) => (
              visibleBadges[i] && (
                <span key={v.name} className={`inline-flex items-center gap-1 rounded-full font-medium ${sizeClasses.md} ${v.class}`}>
                  {v.name}
                  <button
                    type="button"
                    aria-label={`Dismiss ${v.name} badge`}
                    onClick={() => { const next = [...visibleBadges]; next[i] = false; setVisibleBadges(next); }}
                    className="rounded-full p-0.5 focus-visible:ring-ring outline-none focus-visible:ring-2"
                  >
                    <XIcon />
                  </button>
                </span>
              )
            ))}
          </div>
          {!visibleBadges.every(Boolean) && (
            <button
              onClick={() => setVisibleBadges([true, true, true])}
              className="text-sm text-primary hover:underline dark:text-blue-400"
            >
              Reset badges
            </button>
          )}
        </div>
      </ComponentPreview>

      <ComponentPreview id="badge-as-link">
        <div className="flex flex-wrap items-center gap-4">
          <a href="#" className={`rounded-full font-medium ${sizeClasses.md} bg-primary-soft text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-100 dark:hover:bg-blue-800`}>
            Documentation
          </a>
          <a href="#" className={`rounded-full font-medium ${sizeClasses.md} bg-purple-100 text-purple-800 hover:bg-purple-200 dark:bg-purple-900 dark:text-purple-100 dark:hover:bg-purple-800`}>
            API Reference
          </a>
          <a href="#" className={`rounded-full font-medium ${sizeClasses.md} bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-100 dark:hover:bg-green-800`}>
            Changelog
          </a>
        </div>
      </ComponentPreview>

      <ComponentPreview id="badge-on-bell">
        <div className="flex flex-wrap items-center gap-6">
          <div className="group relative">
            <BellIcon />
            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-danger text-xs font-bold text-danger-foreground">3</span>
          </div>
          <div className="group relative">
            <BellIcon />
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-danger text-[10px] font-bold text-danger-foreground">9+</span>
          </div>
          <div className="group relative">
            <button className="rounded-md bg-zinc-900 px-4 py-2 text-sm text-white dark:bg-muted dark:text-zinc-900">
              Notifications
            </button>
            <span className={`${sizeClasses.sm} absolute -right-2 -top-2 rounded-full bg-danger font-medium text-danger-foreground`}>
              12
            </span>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="badge-dot">
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-success"></span>
            <span className="text-sm">Online</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500"></span>
            <span className="text-sm">Away</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-danger"></span>
            <span className="text-sm">Offline</span>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-6">
          {variants.slice(0, 5).map((v) => (
            <div key={v.name} className="flex items-center gap-2">
              <span className={`h-2.5 w-2.5 rounded-full ${v.class.replace(/text-\w+(-\d+)?\s*/g, "").replace(/bg-\w+-\d+/g, (m) => m).split(" ").filter(c => c.startsWith("bg-")).join(" ")}`}></span>
              <span className="text-sm">{v.name}</span>
            </div>
          ))}
        </div>
      </ComponentPreview>

      <ComponentPreview id="badge-pulsating">
        <div className="flex flex-wrap items-center gap-6">
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex h-3 w-3 rounded-full bg-success"></span>
          </span>
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex h-3 w-3 rounded-full bg-danger"></span>
          </span>
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex h-3 w-3 rounded-full bg-blue-500"></span>
            </span>
            <span className="text-sm font-medium">Live</span>
          </div>
          <span className={`inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800 dark:bg-green-900 dark:text-green-100`}>
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-success"></span>
            </span>
            Live
          </span>
          <span className={`inline-flex items-center gap-1.5 rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-800 dark:bg-red-900 dark:text-red-100`}>
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-danger"></span>
            </span>
            Recording
          </span>
        </div>
      </ComponentPreview>
    </div>
  );
}
