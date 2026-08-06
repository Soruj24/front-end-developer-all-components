const faqs = [
  { question: "How much does the Pro plan cost?", answer: "The Pro plan is $29/month or $290/year (save 17%). It includes unlimited projects, priority support, and advanced analytics." },
  { question: "What features are available on the Free plan?", answer: "The Free plan includes up to 3 projects, basic analytics, community support, and 1 GB of storage. No credit card required." },
  { question: "Can I switch plans at any time?", answer: "Yes, you can upgrade or downgrade anytime. Changes take effect at the start of your next billing cycle. No cancellation fees." },
  { question: "How does customer support work?", answer: "Free plan users get community support. Pro users get email support within 4 hours. Enterprise users get 24/7 priority support." },
  { question: "What is your refund policy?", answer: "We offer a 30-day money-back guarantee for all paid plans. Contact support within 30 days for a full refund." },
];

export function SimpleFaq() {
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
            {faq.answer}
          </div>
        </details>
      ))}
    </div>
  );
}
