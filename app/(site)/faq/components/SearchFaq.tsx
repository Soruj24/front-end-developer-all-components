"use client";

import { useState } from "react";

const faqs = [
  { question: "How do I upload a file?", answer: "Click the upload button in the toolbar or drag and drop files into the workspace." },
  { question: "Can I collaborate with my team in real time?", answer: "Yes, multiple users can edit the same document simultaneously." },
  { question: "How do I export my work?", answer: "Go to File → Export and choose from PDF, DOCX, Markdown, or HTML formats." },
  { question: "Is there a mobile app?", answer: "Yes, our mobile app is available on iOS and Android." },
  { question: "How do I invite team members?", answer: "Go to Settings → Team → Invite Members. Enter email addresses and assign roles." },
];

export function SearchFaq() {
  const [query, setQuery] = useState("");

  const filtered = faqs.filter((f) =>
    f.question.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <div className="relative mb-4">
        <input
          type="search"
          placeholder="Search questions..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-lg border border-border bg-white px-4 py-2.5 pl-10 text-sm outline-none transition focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 dark:border-border dark:bg-muted dark:text-zinc-100 dark:focus:border-zinc-400"
        />
        <svg className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      {filtered.length > 0 ? (
        <div className="space-y-2">
          {filtered.map((faq, i) => (
            <details
              key={i}
              className="group rounded-lg border border-border bg-muted/40 transition hover:border-foreground/20 dark:border-border dark:bg-muted/50 dark:hover:border-foreground/20"
            >
              <summary className="flex cursor-pointer items-center justify-between px-4 py-3 text-sm font-medium">
                {faq.question}
                <svg className="h-4 w-4 shrink-0 transition group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="border-t border-border px-4 py-3 text-sm leading-relaxed text-muted-foreground dark:border-border dark:text-muted-foreground/70">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed border-border py-10 text-center dark:border-border">
          <svg className="h-8 w-8 text-muted-foreground/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
          </svg>
          <p className="text-sm text-muted-foreground">No results found for &quot;{query}&quot;</p>
          <button
            onClick={() => setQuery("")}
            className="rounded-lg border border-border px-4 py-1.5 text-xs font-medium hover:bg-muted dark:border-border dark:hover:bg-muted"
          >
            Clear search
          </button>
        </div>
      )}
    </div>
  );
}
