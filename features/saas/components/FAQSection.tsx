"use client";

import { useState } from "react";
import { faqs } from "../constants/saas-data";

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="space-y-12">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">Frequently asked questions</h2>
        <p className="mt-3 text-zinc-500 dark:text-zinc-400">Everything you need to know about FlowState.</p>
      </div>
      <div className="mx-auto max-w-2xl space-y-3">
        {faqs.map((faq) => (
          <div key={faq.id} className="rounded-xl border border-zinc-200 dark:border-zinc-800">
            <button onClick={() => setOpen(open === faq.id ? null : faq.id)} className="flex w-full items-center justify-between px-5 py-4 text-left">
              <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{faq.q}</span>
              <svg className={`h-5 w-5 shrink-0 text-zinc-400 transition-transform ${open === faq.id ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>
            {open === faq.id && (
              <div className="px-5 pb-4">
                <p className="text-sm text-zinc-500 dark:text-zinc-400">{faq.a}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
