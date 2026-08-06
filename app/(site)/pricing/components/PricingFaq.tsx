"use client";

import { useState } from "react";

export function PricingFaq() {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const faqs = [
    { q: "Can I change my plan later?", a: "Yes, you can upgrade or downgrade at any time. Changes take effect immediately." },
    { q: "What happens when I exceed my request limit?", a: "We'll notify you. You can upgrade your plan or purchase additional credits." },
    { q: "Is there a refund policy?", a: "Absolutely. We offer a 30-day money-back guarantee on all paid plans." },
    { q: "Can I cancel anytime?", a: "Yes, you can cancel your subscription at any time. You'll retain access until the end of your billing period." },
  ];

  return (
    <div className="mx-auto max-w-2xl space-y-2">
      {faqs.map((faq, i) => (
        <div key={i} className="rounded-xl border border-border bg-white dark:border-border dark:bg-zinc-900">
          <button onClick={() => setFaqOpen(faqOpen === i ? null : i)} className="flex w-full items-center justify-between px-6 py-4 text-left text-sm font-medium">
            {faq.q}
            <svg className={`h-4 w-4 transition ${faqOpen === i ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
          </button>
          {faqOpen === i && <div className="border-t border-border px-6 py-4 text-sm text-muted-foreground dark:border-border">{faq.a}</div>}
        </div>
      ))}
    </div>
  );
}
