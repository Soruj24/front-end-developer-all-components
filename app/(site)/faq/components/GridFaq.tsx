"use client";

import { useState } from "react";

const faqs = [
  { question: "What is the maximum file size for uploads?", answer: "Files up to 100 MB can be uploaded on the Pro plan." },
  { question: "Do you offer custom domains?", answer: "Custom domains are available on the Pro plan and above." },
  { question: "Can I use my own analytics tool?", answer: "Yes, you can integrate Google Analytics or any custom analytics." },
  { question: "How often are backups taken?", answer: "Automated backups run every 6 hours." },
];

export function GridFaq() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {faqs.map((faq, i) => (
        <div
          key={i}
          className={`rounded-lg border transition-colors ${
            expanded === i
              ? "border-zinc-900 dark:border-border"
              : "border-border"
          }`}
        >
          <button
            onClick={() => setExpanded(expanded === i ? null : i)}
            className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium"
          >
            {faq.question}
            <svg
              className={`h-4 w-4 shrink-0 text-muted-foreground/70 transition ${
                expanded === i ? "rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div
            className={`grid transition-all duration-200 ease-in-out ${
              expanded === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              <div className="border-t border-border px-4 py-3 text-sm leading-relaxed text-muted-foreground dark:border-border dark:text-muted-foreground/70">
                {faq.answer}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
