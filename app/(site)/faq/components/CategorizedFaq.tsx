"use client";

import { useState } from "react";

const categorizedData: Record<string, Array<{ question: string; answer: string }>> = {
  Account: [
    { question: "How do I create an account?", answer: "Click 'Sign Up' on the top right, enter your email and password, and verify your email address." },
    { question: "Can I delete my account?", answer: "Yes, go to Settings → Account → Delete Account. Your data will be permanently removed within 30 days." },
    { question: "How do I reset my password?", answer: "On the login page, click 'Forgot Password' and enter your email. We will send you a reset link valid for 1 hour." },
  ],
  Billing: [
    { question: "What payment methods do you accept?", answer: "We accept Visa, Mastercard, Amex, PayPal, and bank transfers for annual plans." },
    { question: "Do you offer student discounts?", answer: "Yes, students with a valid .edu email get 50% off the Pro plan for 12 months." },
  ],
  Technical: [
    { question: "What browsers are supported?", answer: "We support Chrome 90+, Firefox 88+, Safari 14+, and Edge 90+." },
    { question: "Is there an API available?", answer: "Yes, our REST API is fully documented at docs.example.com." },
  ],
};

export function CategorizedFaq() {
  const [activeCategory, setActiveCategory] = useState("Account");

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-2">
        {Object.keys(categorizedData).map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
              activeCategory === cat
                ? "border-zinc-900 bg-foreground text-background dark:border-border dark:bg-muted dark:text-zinc-900"
                : "border-border hover:bg-muted dark:border-border dark:hover:bg-muted"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="space-y-2">
        {categorizedData[activeCategory].map((faq, i) => (
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
    </div>
  );
}
