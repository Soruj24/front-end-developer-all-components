"use client";

import Link from "next/link";
import { useState } from "react";
import { NotFoundLayout } from "./NotFoundShell";
import { popularPages, sitemapLinks } from "./data";

export function Search404() {
  const [query, setQuery] = useState("");
  const filtered = query
    ? popularPages.filter((p) => p.label.toLowerCase().includes(query.toLowerCase()))
    : popularPages;
  return (
    <NotFoundLayout className="py-16">
      <h1 className="text-8xl font-bold text-zinc-200 dark:text-muted-foreground">404</h1>
      <p className="mt-2 text-lg text-muted-foreground">Hmm, that page doesn&apos;t exist.</p>
      <div className="mt-8 w-full max-w-md">
        <div className="relative">
          <svg className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
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
            <Link key={p.href} href={p.href} className="rounded-lg border bg-white px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-indigo-300 hover:text-indigo-600 dark:border-border dark:bg-muted dark:text-muted-foreground dark:hover:border-indigo-400">
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
      <p className="mt-1 text-muted-foreground">Page not found. Try one of these:</p>
      <div className="mx-auto mt-8 grid max-w-lg grid-cols-3 gap-6 text-left">
        {sitemapLinks.map((section) => (
          <div key={section.category}>
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">{section.category}</h3>
            <ul className="space-y-1.5">
              {section.links.map((l) => (
                <li key={l}>
                  <Link href="/" className="text-sm text-indigo-500 hover:text-indigo-600 hover:underline">{l}</Link>
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
          <Link key={p.href} href={p.href} className="group rounded-xl border-2 border-transparent bg-muted/40 p-4 text-left transition-all hover:border-indigo-300 hover:shadow-md dark:bg-muted dark:hover:border-indigo-400">
            <h3 className="font-semibold text-zinc-800 group-hover:text-indigo-600 dark:text-zinc-100 dark:group-hover:text-indigo-300">{p.label}</h3>
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
      <p className="mt-1 text-sm text-muted-foreground">Looking for something? Try these:</p>
      <div className="mx-auto mt-8 grid max-w-lg grid-cols-3 gap-3">
        {gridItems.map((item, i) => (
          <Link
            key={item.id}
            href={item.href}
            className="rounded-lg border bg-muted/40 p-3 text-left transition-all hover:border-indigo-300 hover:shadow-md dark:border-border dark:bg-muted dark:hover:border-indigo-400"
            style={{ gridRow: `span ${i % 2 + 1}` }}
          >
            <div className="text-xs font-semibold text-muted-foreground dark:text-zinc-200">{item.label}</div>
            <div className="mt-0.5 text-[10px] text-muted-foreground/70">{item.desc}</div>
          </Link>
        ))}
      </div>
      <Link href="/" className="mt-8 inline-block text-sm text-indigo-500 underline underline-offset-2 hover:text-indigo-600">Go Home</Link>
    </NotFoundLayout>
  );
}
