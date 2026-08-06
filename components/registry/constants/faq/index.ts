import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

const faqSimpleData = [
  { question: "How much does the Pro plan cost?", answer: "The Pro plan is $29/month or $290/year (save 17%). It includes unlimited projects, priority support, and advanced analytics." },
  { question: "What features are available on the Free plan?", answer: "The Free plan includes up to 3 projects, basic analytics, community support, and 1 GB of storage. No credit card required." },
  { question: "Can I switch plans at any time?", answer: "Yes, you can upgrade or downgrade anytime. Changes take effect at the start of your next billing cycle. No cancellation fees." },
  { question: "How does customer support work?", answer: "Free plan users get community support. Pro users get email support within 4 hours. Enterprise users get 24/7 priority support." },
  { question: "What is your refund policy?", answer: "We offer a 30-day money-back guarantee for all paid plans. Contact support within 30 days of purchase for a full refund." },
];

export const faqSimple: RegistryEntry = entry({
    id: "faq-simple",
    title: "Simple Accordion FAQ",
    description: "A basic accordion-style FAQ using native HTML details/summary elements.",
    source: `export default function FaqSimple() {
  const faqs = ${JSON.stringify(faqSimpleData, null, 2)};
  return (
    <div className="space-y-2">
      {faqs.map((faq, i) => (
        <details key={i} className="group rounded-lg border border-border bg-muted/40 transition hover:border-foreground/20 dark:border-border dark:bg-muted/50">
          <summary className="flex cursor-pointer items-center justify-between px-4 py-3 text-sm font-medium">
            {faq.question}
            <svg className="h-4 w-4 shrink-0 transition group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div className="border-t border-border px-4 py-3 text-sm leading-relaxed text-muted-foreground">
            {faq.answer}
          </div>
        </details>
      ))}
    </div>
  );
}`,
  });

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

export const faqCategorized: RegistryEntry = entry({
    id: "faq-categorized",
    title: "Categorized FAQ",
    description: "FAQ with category tabs to filter questions by topic.",
    source: `export default function FaqCategorized() {
  const [activeCategory, setActiveCategory] = useState("Account");
  const categories = ${JSON.stringify(Object.keys(categorizedData))};
  const data = ${JSON.stringify(categorizedData)};
  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button key={cat} onClick={() => setActiveCategory(cat)}
            className={\`rounded-lg border px-4 py-2 text-sm font-medium transition-colors \${
              activeCategory === cat ? "border-zinc-900 bg-foreground text-background" : "border-border hover:bg-muted"
            }\`}>
            {cat}
          </button>
        ))}
      </div>
      <div className="space-y-2">
        {data[activeCategory].map((faq, i) => (
          <details key={i} className="group rounded-lg border border-border bg-muted/40 transition hover:border-foreground/20">
            <summary className="flex cursor-pointer items-center justify-between px-4 py-3 text-sm font-medium">
              {faq.question}
              <svg className="h-4 w-4 shrink-0 transition group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="border-t border-border px-4 py-3 text-sm leading-relaxed text-muted-foreground">{faq.answer}</div>
          </details>
        ))}
      </div>
    </div>
  );
}`,
  });

const searchFaqs = [
  { question: "How do I upload a file?", answer: "Click the upload button in the toolbar or drag and drop files into the workspace." },
  { question: "Can I collaborate with my team in real time?", answer: "Yes, multiple users can edit the same document simultaneously." },
  { question: "How do I export my work?", answer: "Go to File → Export and choose from PDF, DOCX, Markdown, or HTML formats." },
  { question: "Is there a mobile app?", answer: "Yes, our mobile app is available on iOS and Android." },
  { question: "How do I invite team members?", answer: "Go to Settings → Team → Invite Members. Enter email addresses and assign roles." },
];

export const faqSearch: RegistryEntry = entry({
    id: "faq-search",
    title: "FAQ with Search",
    description: "A searchable FAQ with real-time filtering and empty state.",
    source: `export default function FaqSearch() {
  const [query, setQuery] = useState("");
  const faqs = ${JSON.stringify(searchFaqs)};
  const filtered = faqs.filter((f) => f.question.toLowerCase().includes(query.toLowerCase()));
  return (
    <div>
      <div className="relative mb-4">
        <input type="search" placeholder="Search questions..." value={query} onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-lg border border-border bg-white px-4 py-2.5 pl-10 text-sm outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 dark:border-border dark:bg-muted" />
        <svg className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      {filtered.length > 0 ? (
        <div className="space-y-2">
          {filtered.map((faq, i) => (
            <details key={i} className="group rounded-lg border border-border bg-muted/40 transition hover:border-foreground/20">
              <summary className="flex cursor-pointer items-center justify-between px-4 py-3 text-sm font-medium">{faq.question}</summary>
              <div className="border-t border-border px-4 py-3 text-sm text-muted-foreground">{faq.answer}</div>
            </details>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed border-border py-10 text-center">
          <p className="text-sm text-muted-foreground">No results found for "{query}"</p>
          <button onClick={() => setQuery("")} className="rounded-lg border border-border px-4 py-1.5 text-xs font-medium hover:bg-muted">Clear search</button>
        </div>
      )}
    </div>
  );
}`,
  });

const gridFaqs = [
  { question: "What is the maximum file size for uploads?", answer: "Files up to 100 MB can be uploaded on the Pro plan." },
  { question: "Do you offer custom domains?", answer: "Custom domains are available on the Pro plan and above." },
  { question: "Can I use my own analytics tool?", answer: "Yes, you can integrate Google Analytics or any custom analytics." },
  { question: "How often are backups taken?", answer: "Automated backups run every 6 hours." },
];

export const faqGrid: RegistryEntry = entry({
    id: "faq-grid",
    title: "Two-Column FAQ Grid",
    description: "A two-column grid layout FAQ with expand/collapse animation.",
    source: `export default function FaqGrid() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const faqs = ${JSON.stringify(gridFaqs)};
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {faqs.map((faq, i) => (
        <div key={i} className={\`rounded-lg border transition-colors \${expanded === i ? "border-zinc-900 dark:border-border" : "border-border"}\`}>
          <button onClick={() => setExpanded(expanded === i ? null : i)}
            className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium">
            {faq.question}
            <svg className={\`h-4 w-4 shrink-0 text-muted-foreground/70 transition \${expanded === i ? "rotate-180" : ""}\`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div className={\`grid transition-all duration-200 \${expanded === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}\`}>
            <div className="overflow-hidden">
              <div className="border-t border-border px-4 py-3 text-sm text-muted-foreground">{faq.answer}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}`,
  });

const helpfulFaqs = [
  { question: "How do I set up two-factor authentication?", answer: "Go to Settings → Security → Two-Factor Authentication." },
  { question: "Can I recover deleted items?", answer: "Deleted items go to the Trash folder where they remain for 30 days." },
  { question: "What languages are supported?", answer: "Our interface supports English, Spanish, French, German, Japanese, and Chinese." },
];

export const faqHelpful: RegistryEntry = entry({
    id: "faq-helpful",
    title: "Helpful / Not Helpful",
    description: "FAQ with thumbs up/down voting to rate answer quality.",
    source: `export default function FaqHelpful() {
  const [votes, setVotes] = useState({});
  const faqs = ${JSON.stringify(helpfulFaqs)};
  return (
    <div className="space-y-2">
      {faqs.map((faq, i) => (
        <details key={i} className="group rounded-lg border border-border bg-muted/40 transition hover:border-foreground/20">
          <summary className="flex cursor-pointer items-center justify-between px-4 py-3 text-sm font-medium">{faq.question}</summary>
          <div className="border-t border-border px-4 py-3 text-sm text-muted-foreground">
            <p>{faq.answer}</p>
            <div className="mt-3 flex items-center gap-3 border-t border-border pt-3 text-xs">
              <span>Was this helpful?</span>
              <button className="rounded-md border border-border px-2.5 py-1 hover:bg-muted">👍 Yes</button>
              <button className="rounded-md border border-border px-2.5 py-1 hover:bg-muted">👎 No</button>
            </div>
          </div>
        </details>
      ))}
    </div>
  );
}`,
  });

const iconFaqs = [
  { category: "Getting Started", icon: "🚀", iconBg: "bg-blue-100 dark:bg-blue-900/30", question: "How do I get started?", answer: "Sign up for a free account and complete the onboarding wizard." },
  { category: "Security", icon: "🔒", iconBg: "bg-green-100 dark:bg-green-900/30", question: "How is my password stored?", answer: "Passwords are hashed using bcrypt with a cost factor of 12." },
  { category: "Integrations", icon: "🔗", iconBg: "bg-purple-100 dark:bg-purple-900/30", question: "Which tools do you integrate with?", answer: "We integrate with Slack, GitHub, Jira, and Zapier." },
  { category: "Performance", icon: "⚡", iconBg: "bg-amber-100 dark:bg-amber-900/30", question: "What is the uptime SLA?", answer: "We guarantee 99.9% uptime for Pro plans." },
];

export const faqIcons: RegistryEntry = entry({
    id: "faq-icons",
    title: "FAQ with Icons",
    description: "FAQ where each question has a colored category icon.",
    source: `export default function FaqIcons() {
  const faqs = ${JSON.stringify(iconFaqs)};
  return (
    <div className="space-y-2">
      {faqs.map((faq, i) => (
        <details key={i} className="group rounded-lg border border-border bg-muted/40 transition hover:border-foreground/20">
          <summary className="flex cursor-pointer items-center gap-3 px-4 py-3 text-sm font-medium">
            <span className={\`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-base \${faq.iconBg}\`}>{faq.icon}</span>
            <span className="flex-1">{faq.question}</span>
            <svg className="h-4 w-4 shrink-0 text-muted-foreground/70 transition group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div className="border-t border-border px-4 py-3 text-sm text-muted-foreground">{faq.answer}</div>
        </details>
      ))}
    </div>
  );
}`,
  });

export const faq: RegistryEntry[] = [
  faqSimple,
  faqCategorized,
  faqSearch,
  faqGrid,
  faqHelpful,
  faqIcons,
];
