const faqs = [
  { category: "Getting Started", icon: "🚀", iconBg: "bg-blue-100 dark:bg-blue-900/30", question: "How do I get started?", answer: "Sign up for a free account and complete the onboarding wizard." },
  { category: "Security", icon: "🔒", iconBg: "bg-green-100 dark:bg-green-900/30", question: "How is my password stored?", answer: "Passwords are hashed using bcrypt with a cost factor of 12." },
  { category: "Integrations", icon: "🔗", iconBg: "bg-purple-100 dark:bg-purple-900/30", question: "Which tools do you integrate with?", answer: "We integrate with Slack, GitHub, Jira, and Zapier." },
  { category: "Performance", icon: "⚡", iconBg: "bg-amber-100 dark:bg-amber-900/30", question: "What is the uptime SLA?", answer: "We guarantee 99.9% uptime for Pro plans." },
];

export function IconFaq() {
  return (
    <div className="space-y-2">
      {faqs.map((faq, i) => (
        <details
          key={i}
          className="group rounded-lg border border-border bg-muted/40 transition hover:border-foreground/20 dark:border-border dark:bg-muted/50 dark:hover:border-foreground/20"
        >
          <summary className="flex cursor-pointer items-center gap-3 px-4 py-3 text-sm font-medium">
            <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-base ${faq.iconBg}`}>
              {faq.icon}
            </span>
            <span className="flex-1">{faq.question}</span>
            <svg className="h-4 w-4 shrink-0 text-muted-foreground/70 transition group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
