"use client";

import { useState } from "react";

const faqs = [
  { question: "How do I set up two-factor authentication?", answer: "Go to Settings → Security → Two-Factor Authentication. Scan the QR code with your authenticator app." },
  { question: "Can I recover deleted items?", answer: "Deleted items go to the Trash folder where they remain for 30 days." },
  { question: "What languages are supported?", answer: "Our interface supports English, Spanish, French, German, Japanese, and Chinese." },
];

export function HelpfulFaq() {
  const [votes, setVotes] = useState<Record<number, "helpful" | "not-helpful" | null>>({});

  const handleVote = (index: number, type: "helpful" | "not-helpful") => {
    setVotes((prev) => ({
      ...prev,
      [index]: prev[index] === type ? null : type,
    }));
  };

  return (
    <div className="space-y-2">
      {faqs.map((faq, i) => (
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
            <p>{faq.answer}</p>
            <div className="mt-3 flex items-center gap-3 border-t border-border pt-3 text-xs text-muted-foreground dark:border-border">
              <span>Was this helpful?</span>
              <button
                onClick={(e) => { e.stopPropagation(); handleVote(i, "helpful"); }}
                className={`flex items-center gap-1 rounded-md border px-2.5 py-1 transition-colors ${
                  votes[i] === "helpful"
                    ? "border-green-500 bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                    : "border-border hover:bg-muted dark:border-border dark:hover:bg-muted"
                }`}
              >
                👍 Yes
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); handleVote(i, "not-helpful"); }}
                className={`flex items-center gap-1 rounded-md border px-2.5 py-1 transition-colors ${
                  votes[i] === "not-helpful"
                    ? "border-red-500 bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                    : "border-border hover:bg-muted dark:border-border dark:hover:bg-muted"
                }`}
              >
                👎 No
              </button>
            </div>
          </div>
        </details>
      ))}
    </div>
  );
}
