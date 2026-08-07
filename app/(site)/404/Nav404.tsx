"use client";

import Link from "next/link";
import { useState } from "react";
import { NotFoundLayout, GoHomeButton } from "./NotFoundShell";
import { popularPages, sitemapLinks } from "./data";

export function Search404() {
  const [query, setQuery] = useState("");
  const filtered = query
    ? popularPages.filter((p) =>
        p.label.toLowerCase().includes(query.toLowerCase()),
      )
    : popularPages;
  return (
    <NotFoundLayout className="py-16">
      <h1 className="text-8xl font-bold text-zinc-200 dark:text-muted-foreground">
        404
      </h1>
      <p className="mt-2 text-lg text-muted-foreground">
        Hmm, that page doesn&apos;t exist.
      </p>
      <div className="mt-8 w-full max-w-md">
        <div className="relative">
          <svg
            className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground/70"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search for what you need..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-xl border-2 border-border bg-muted/40 py-3.5 pl-12 pr-4 text-sm outline-none transition-colors focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 dark:border-border dark:bg-muted dark:text-zinc-100 dark:focus:border-indigo-400"
          />
        </div>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {filtered.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className="rounded-lg border bg-white px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-indigo-300 hover:text-indigo-600 dark:border-border dark:bg-muted dark:text-muted-foreground dark:hover:border-indigo-400"
            >
              {p.label}
            </Link>
          ))}
        </div>
      </div>
    </NotFoundLayout>
  );
}

export function Sitemap404() {
  return (
    <NotFoundLayout className="py-12">
      <h1 className="text-6xl font-bold text-muted-foreground">404</h1>
      <p className="mt-1 text-muted-foreground">
        Page not found. Try one of these:
      </p>
      <div className="mx-auto mt-8 grid max-w-lg grid-cols-3 gap-6 text-left">
        {sitemapLinks.map((section) => (
          <div key={section.category}>
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
              {section.category}
            </h3>
            <ul className="space-y-1.5">
              {section.links.map((l) => (
                <li key={l}>
                  <Link
                    href="/"
                    className="text-sm text-indigo-500 hover:text-indigo-600 hover:underline"
                  >
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </NotFoundLayout>
  );
}

export function Suggested404() {
  return (
    <NotFoundLayout className="py-12">
      <h1 className="text-5xl font-bold text-muted-foreground">404</h1>
      <p className="mt-1 text-muted-foreground">Try these instead</p>
      <div className="mx-auto mt-8 grid max-w-2xl grid-cols-2 gap-4">
        {popularPages.slice(0, 4).map((p) => (
          <Link
            key={p.href}
            href={p.href}
            className="group rounded-xl border-2 border-transparent bg-muted/40 p-4 text-left transition-all hover:border-indigo-300 hover:shadow-md dark:bg-muted dark:hover:border-indigo-400"
          >
            <h3 className="font-semibold text-zinc-800 group-hover:text-indigo-600 dark:text-zinc-100 dark:group-hover:text-indigo-300">
              {p.label}
            </h3>
            <p className="mt-0.5 text-xs text-muted-foreground/70">{p.desc}</p>
          </Link>
        ))}
      </div>
    </NotFoundLayout>
  );
}

export function Masonry404() {
  const gridItems = popularPages.map((p, i) => ({ ...p, id: i }));
  return (
    <NotFoundLayout className="py-12">
      <h1 className="text-5xl font-bold text-muted-foreground">404</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Looking for something? Try these:
      </p>
      <div className="mx-auto mt-8 grid max-w-lg grid-cols-3 gap-3">
        {gridItems.map((item, i) => (
          <Link
            key={item.id}
            href={item.href}
            className="rounded-lg border bg-muted/40 p-3 text-left transition-all hover:border-indigo-300 hover:shadow-md dark:border-border dark:bg-muted dark:hover:border-indigo-400"
            style={{ gridRow: `span ${(i % 2) + 1}` }}
          >
            <div className="text-xs font-semibold text-muted-foreground dark:text-zinc-200">
              {item.label}
            </div>
            <div className="mt-0.5 text-[10px] text-muted-foreground/70">
              {item.desc}
            </div>
          </Link>
        ))}
      </div>
      <Link
        href="/"
        className="mt-8 inline-block text-sm text-indigo-500 underline underline-offset-2 hover:text-indigo-600"
      >
        Go Home
      </Link>
    </NotFoundLayout>
  );
}

export function Chalkboard404() {
  return (
    <NotFoundLayout
      className="py-20"
      style={{
        background: "#2d5016",
        borderRadius: "12px",
        minHeight: "400px",
        fontFamily: "'Comic Sans MS', 'Chalkboard SE', cursive",
      }}
    >
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            'url(\'data:image/svg+xml,%3Csvg width="6" height="6" viewBox="0 0 6 6" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23fff" fillRule="evenodd"%3E%3Ccircle cx="1" cy="1" r="0.5"/%3E%3C/g%3E%3C/svg%3E\')',
        }}
      />
      <div className="relative z-10">
        <h1 className="text-[10rem] font-bold text-white/90">404</h1>
        <p className="mt-2 text-lg text-white/70">
          Page not found on the chalkboard
        </p>
        <p className="mt-1 text-sm text-white/50">
          Teacher says: &quot;This page doesn&apos;t exist!&quot;
        </p>
        <GoHomeButton className="mt-8 rounded bg-yellow-400 px-6 py-2.5 text-sm font-bold text-gray-900 hover:bg-yellow-300" />
      </div>
    </NotFoundLayout>
  );
}

export function Blueprint404() {
  return (
    <NotFoundLayout
      className="py-20"
      style={{
        background: "#1a3a5c",
        borderRadius: "12px",
        minHeight: "400px",
        border: "3px solid #4a8cc7",
      }}
    >
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#4a8cc7 1px, transparent 1px), linear-gradient(90deg, #4a8cc7 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />
      <div className="relative z-10">
        <h1 className="text-[10rem] font-bold text-white">404</h1>
        <p className="mt-2 text-lg text-blue-200">
          ARCHITECTURAL PLAN: PAGE NOT FOUND
        </p>
        <p className="mt-1 text-xs text-blue-300">BLUEPRINT REF: 404-NF-001</p>
        <div className="mt-4 flex gap-4 text-xs text-blue-300">
          <span>SCALE: N/A</span>
          <span>DATE: {new Date().toLocaleDateString()}</span>
          <span>STATUS: MISSING</span>
        </div>
        <GoHomeButton className="mt-8 rounded border-2 border-white bg-transparent px-6 py-2.5 text-sm font-medium text-white hover:bg-white/10" />
      </div>
    </NotFoundLayout>
  );
}

export function StickyNote404() {
  return (
    <NotFoundLayout className="py-16">
      <div className="flex flex-wrap justify-center gap-4">
        <div
          className="h-48 w-48 rotate-[-3deg] rounded-sm bg-yellow-200 p-4 shadow-lg"
          style={{ fontFamily: "'Comic Sans MS', cursive" }}
        >
          <p className="text-sm font-bold text-yellow-800">TODO:</p>
          <p className="mt-1 text-xs text-yellow-700">- Find missing page</p>
          <p className="text-xs text-yellow-700">- Check URL</p>
          <p className="text-xs text-yellow-700">- Go home</p>
        </div>
        <div
          className="h-48 w-48 rotate-[2deg] rounded-sm bg-pink-200 p-4 shadow-lg"
          style={{ fontFamily: "'Comic Sans MS', cursive" }}
        >
          <p className="text-sm font-bold text-pink-800">Note:</p>
          <p className="mt-1 text-xs text-pink-700">
            This page was never here.
          </p>
          <p className="mt-2 text-xs text-pink-700">Try another page! 🎯</p>
        </div>
        <div
          className="h-48 w-48 rotate-[-1deg] rounded-sm bg-green-200 p-4 shadow-lg"
          style={{ fontFamily: "'Comic Sans MS', cursive" }}
        >
          <p className="text-sm font-bold text-green-800">404</p>
          <p className="mt-1 text-xs text-green-700">Page not found.</p>
          <GoHomeButton className="mt-4 inline-block rounded bg-green-600 px-3 py-1 text-xs text-white hover:bg-green-500" />
        </div>
      </div>
    </NotFoundLayout>
  );
}

export function Map404() {
  return (
    <NotFoundLayout
      className="py-20"
      style={{
        background: "linear-gradient(135deg, #f5e6d3, #e8d5b7)",
        borderRadius: "12px",
        minHeight: "400px",
      }}
    >
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(139,90,43,0.1) 10px, rgba(139,90,43,0.1) 11px)",
        }}
      />
      <div className="relative z-10">
        <span className="text-6xl">🗺️</span>
        <h1 className="mt-4 text-[8rem] font-bold text-amber-900">404</h1>
        <p className="mt-2 text-lg text-amber-800">
          X marks the spot... but the treasure is gone!
        </p>
        <p className="mt-1 text-sm text-amber-700">
          This page has been lost at sea.
        </p>
        <GoHomeButton className="mt-8 rounded-lg bg-amber-900 px-6 py-2.5 text-sm font-medium text-white hover:bg-amber-800" />
      </div>
    </NotFoundLayout>
  );
}

export function Compass404() {
  return (
    <NotFoundLayout className="py-20">
      <div className="relative">
        <svg
          viewBox="0 0 200 200"
          className="h-40 w-40"
          style={{ animation: "compass-spin 4s ease-in-out infinite" }}
        >
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke="#d1d5db"
            strokeWidth="2"
          />
          <circle
            cx="100"
            cy="100"
            r="80"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="1"
          />
          <text
            x="100"
            y="30"
            textAnchor="middle"
            fontSize="14"
            fontWeight="bold"
            fill="#374151"
          >
            N
          </text>
          <text
            x="100"
            y="180"
            textAnchor="middle"
            fontSize="14"
            fontWeight="bold"
            fill="#374151"
          >
            S
          </text>
          <text
            x="20"
            y="105"
            textAnchor="middle"
            fontSize="14"
            fontWeight="bold"
            fill="#374151"
          >
            W
          </text>
          <text
            x="180"
            y="105"
            textAnchor="middle"
            fontSize="14"
            fontWeight="bold"
            fill="#374151"
          >
            E
          </text>
          <polygon points="100,20 95,100 100,95 105,100" fill="#ef4444" />
          <polygon points="100,180 95,100 100,105 105,100" fill="#6b7280" />
          <circle cx="100" cy="100" r="5" fill="#374151" />
        </svg>
      </div>
      <h1 className="mt-4 text-6xl font-bold text-foreground">404</h1>
      <p className="mt-2 text-lg text-muted-foreground">
        Compass points to nowhere.
      </p>
      <GoHomeButton className="mt-6 rounded-full bg-foreground px-8 py-3 text-sm font-medium text-background" />
      <style>{`@keyframes compass-spin { 0% { transform: rotate(0deg); } 25% { transform: rotate(20deg); } 50% { transform: rotate(-10deg); } 75% { transform: rotate(5deg); } 100% { transform: rotate(0deg); } }`}</style>
    </NotFoundLayout>
  );
}
