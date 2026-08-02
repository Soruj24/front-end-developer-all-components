import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const nfSearch: RegistryEntry = entry({
    id: "nf-search",
    title: "Search 404",
    description: "A searchable 404 that lets visitors find the page they need.",
    source: `import { useState } from "react";

export default function NfSearch() {
  const [query, setQuery] = useState("");
  const pages = [
    { href: "#", label: "Home", desc: "Back to start" },
    { href: "#", label: "Charts", desc: "Visual data" },
    { href: "#", label: "Tooltips", desc: "Helpful hints" },
    { href: "#", label: "Timeline", desc: "Events in order" },
    { href: "#", label: "Dialog", desc: "Conversations" },
    { href: "#", label: "Drawer", desc: "Slide panels" },
    { href: "#", label: "Accordion", desc: "Collapsible" },
    { href: "#", label: "Carousel", desc: "Sliding cards" },
  ];
  const filtered = query
    ? pages.filter((p) => p.label.toLowerCase().includes(query.toLowerCase()))
    : pages;

  return (
    <div className="flex w-full flex-col items-center justify-center rounded-xl border border-zinc-200 p-8 text-center dark:border-zinc-800">
      <h1 className="text-7xl font-bold text-zinc-200 dark:text-zinc-700">404</h1>
      <p className="mt-2 text-sm text-zinc-500">Hmm, that page doesn&apos;t exist.</p>
      <div className="mt-6 w-full max-w-md">
        <div className="relative">
          <svg className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search for what you need..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-xl border-2 border-zinc-200 bg-zinc-50 py-3.5 pl-12 pr-4 text-sm outline-none transition-colors focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-100 dark:focus:border-indigo-400"
          />
        </div>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {filtered.map((p) => (
            <a key={p.href} href={p.href} className="rounded-lg border bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:border-indigo-300 hover:text-primary dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-300 dark:hover:border-indigo-400">
              {p.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}`,
  });
