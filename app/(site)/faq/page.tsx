"use client"

import { useState } from "react"

const simpleFaqs = [
  { question: "How much does the Pro plan cost?", answer: "The Pro plan is $29/month or $290/year (save 17%). It includes unlimited projects, priority support, and advanced analytics." },
  { question: "What features are available on the Free plan?", answer: "The Free plan includes up to 3 projects, basic analytics, community support, and 1 GB of storage. No credit card required." },
  { question: "Can I switch plans at any time?", answer: "Yes, you can upgrade or downgrade anytime. Changes take effect at the start of your next billing cycle. No cancellation fees." },
  { question: "How does customer support work?", answer: "Free plan users get community support. Pro users get email support within 4 hours. Enterprise users get 24/7 priority support with a dedicated account manager." },
  { question: "What is your refund policy?", answer: "We offer a 30-day money-back guarantee for all paid plans. Contact support within 30 days of purchase for a full refund, no questions asked." },
  { question: "Is my data secure?", answer: "Absolutely. We use AES-256 encryption at rest and TLS 1.3 in transit. Our infrastructure is SOC 2 Type II certified and GDPR compliant." },
]

interface CategorizedFaqItem {
  question: string
  answer: string
}

const categorizedData: Record<string, CategorizedFaqItem[]> = {
  Account: [
    { question: "How do I create an account?", answer: "Click 'Sign Up' on the top right, enter your email and password, and verify your email address. The whole process takes under 2 minutes." },
    { question: "Can I delete my account?", answer: "Yes, go to Settings → Account → Delete Account. Your data will be permanently removed within 30 days." },
    { question: "How do I reset my password?", answer: "On the login page, click 'Forgot Password' and enter your email. We will send you a reset link valid for 1 hour." },
    { question: "Can I change my email address?", answer: "Yes, update it in Settings → Profile. We will send a verification link to the new address before the change takes effect." },
  ],
  Billing: [
    { question: "What payment methods do you accept?", answer: "We accept Visa, Mastercard, Amex, PayPal, and bank transfers for annual plans. All payments are processed securely via Stripe." },
    { question: "Do you offer student discounts?", answer: "Yes, students with a valid .edu email get 50% off the Pro plan for 12 months. Verify your student status on the pricing page." },
    { question: "How do I download an invoice?", answer: "Go to Settings → Billing → Invoices. All past invoices are available as PDF downloads." },
  ],
  Technical: [
    { question: "What browsers are supported?", answer: "We support Chrome 90+, Firefox 88+, Safari 14+, and Edge 90+. We do not support Internet Explorer." },
    { question: "Is there an API available?", answer: "Yes, our REST API is fully documented at docs.example.com. Rate limits: 1000 requests/hour for Pro, 100/hour for Free." },
    { question: "Can I self-host the platform?", answer: "Self-hosting is available on the Enterprise plan. We provide Docker images, deployment guides, and dedicated support for setup." },
    { question: "How do integrations work?", answer: "We integrate with Slack, GitHub, Jira, and Zapier. Go to Settings → Integrations and authorize each service with OAuth." },
  ],
}

const searchFaqs = [
  { question: "How do I upload a file?", answer: "Click the upload button in the toolbar or drag and drop files into the workspace. Supported formats include PDF, DOCX, and images up to 50 MB." },
  { question: "Can I collaborate with my team in real time?", answer: "Yes, multiple users can edit the same document simultaneously. Changes sync instantly with cursor presence indicators." },
  { question: "How do I export my work?", answer: "Go to File → Export and choose from PDF, DOCX, Markdown, or HTML formats. All formatting is preserved during export." },
  { question: "Is there a mobile app?", answer: "Yes, our mobile app is available on iOS and Android. It supports viewing, editing, and commenting on the go." },
  { question: "How do I invite team members?", answer: "Go to Settings → Team → Invite Members. Enter email addresses and assign roles (Admin, Editor, Viewer)." },
  { question: "What happens when I reach my storage limit?", answer: "You will receive email warnings at 80%, 90%, and 100% usage. Upgrade your plan for more storage or delete unused files." },
  { question: "Can I schedule posts in advance?", answer: "Yes, use the scheduler in the publishing panel. Set a future date and time, and the post will publish automatically." },
  { question: "Does the tool support keyboard shortcuts?", answer: "Yes, press ? or / to see the full list of keyboard shortcuts. Common shortcuts include Ctrl+S to save and Ctrl+Z to undo." },
  { question: "How do I restore a previous version?", answer: "Open the version history panel from the top menu. You can view, compare, and restore any saved version." },
]

const gridFaqs = [
  { question: "What is the maximum file size for uploads?", answer: "Files up to 100 MB can be uploaded on the Pro plan. The Free plan supports files up to 10 MB." },
  { question: "Do you offer custom domains?", answer: "Custom domains are available on the Pro plan and above. You can add up to 5 custom domains with SSL certificates included." },
  { question: "Can I use my own analytics tool?", answer: "Yes, you can integrate Google Analytics, Plausible, or any custom analytics by adding your tracking code in Settings → Analytics." },
  { question: "How often are backups taken?", answer: "Automated backups run every 6 hours. We retain backups for 30 days on Pro and 90 days on Enterprise plans." },
  { question: "Is there a limit on API calls?", answer: "Pro plans include 10,000 API calls per month. Enterprise plans have unlimited API calls with dedicated rate limits." },
  { question: "Can I white-label the platform?", answer: "White-labeling is available on the Enterprise plan. You can remove our branding and use your own logo, domain, and color scheme." },
]

const helpfulFaqs = [
  { question: "How do I set up two-factor authentication?", answer: "Go to Settings → Security → Two-Factor Authentication. Scan the QR code with your authenticator app and enter the verification code." },
  { question: "Can I recover deleted items?", answer: "Deleted items go to the Trash folder where they remain for 30 days. You can restore them anytime before permanent deletion." },
  { question: "What languages are supported?", answer: "Our interface supports English, Spanish, French, German, Japanese, and Chinese. Content can be written in any language." },
  { question: "How do I contact sales?", answer: "Fill out the contact form on our sales page, email sales@example.com, or book a demo directly through the calendar link." },
]

interface HelpfulState {
  helpful: number
  notHelpful: number
  voted: "helpful" | "not-helpful" | null
}

const iconFaqs = [
  { category: "Getting Started", icon: "🚀", iconBg: "bg-blue-100 dark:bg-blue-900/30", question: "How do I get started?", answer: "Sign up for a free account, complete the onboarding wizard, and explore the dashboard. We recommend starting with the quick-start guide." },
  { category: "Getting Started", icon: "🚀", iconBg: "bg-blue-100 dark:bg-blue-900/30", question: "Is there a setup guide?", answer: "Yes, our knowledge base includes video tutorials, step-by-step guides, and best practices for getting the most out of the platform." },
  { category: "Security", icon: "🔒", iconBg: "bg-green-100 dark:bg-green-900/30", question: "How is my password stored?", answer: "Passwords are hashed using bcrypt with a cost factor of 12. We never store plain-text passwords and enforce minimum strength requirements." },
  { category: "Security", icon: "🔒", iconBg: "bg-green-100 dark:bg-green-900/30", question: "Do you support SSO?", answer: "SSO via SAML or OIDC is supported on Enterprise plans. We integrate with Okta, Azure AD, Google Workspace, and OneLogin." },
  { category: "Integrations", icon: "🔗", iconBg: "bg-purple-100 dark:bg-purple-900/30", question: "Which third-party tools do you integrate with?", answer: "We offer native integrations with Slack, GitHub, GitLab, Bitbucket, Jira, Trello, Asana, Notion, and Zapier." },
  { category: "Integrations", icon: "🔗", iconBg: "bg-purple-100 dark:bg-purple-900/30", question: "Can I build a custom integration?", answer: "Yes, use our REST API or GraphQL API to build custom integrations. Webhooks are available for real-time event notifications." },
  { category: "Performance", icon: "⚡", iconBg: "bg-amber-100 dark:bg-amber-900/30", question: "What is the platform uptime SLA?", answer: "We guarantee 99.9% uptime for Pro plans and 99.99% for Enterprise. Our status page at status.example.com shows real-time metrics." },
  { category: "Performance", icon: "⚡", iconBg: "bg-amber-100 dark:bg-amber-900/30", question: "How fast is the platform?", answer: "Our global CDN ensures sub-100ms response times. Pages are server-side rendered for optimal Largest Contentful Paint (LCP) scores." },
]

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState("Account")
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedGridIndex, setExpandedGridIndex] = useState<number | null>(null)
  const [helpfulState, setHelpfulState] = useState<Record<number, HelpfulState>>({})

  const filteredSearch = searchFaqs.filter((f) =>
    f.question.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const voteHelpful = (index: number, type: "helpful" | "not-helpful") => {
    setHelpfulState((prev) => {
      const current = prev[index] || { helpful: 0, notHelpful: 0, voted: null }
      if (current.voted === type) {
        const updated = { ...current, voted: null as HelpfulState["voted"] }
        if (type === "helpful") updated.helpful--
        else updated.notHelpful--
        return { ...prev, [index]: updated }
      }
      const updated = { ...current, voted: type as HelpfulState["voted"] }
      if (current.voted) {
        if (current.voted === "helpful") updated.helpful--
        else updated.notHelpful--
      }
      if (type === "helpful") updated.helpful++
      else updated.notHelpful++
      return { ...prev, [index]: updated }
    })
  }

  return (
    <div className="flex flex-col gap-12 p-8">
      <div className="text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Frequently Asked Questions</h1>
        <p className="mt-2 text-muted-foreground">Find answers to common questions below.</p>
      </div>

      <section className="rounded-xl border border-border bg-white p-6 shadow-sm dark:border-border dark:bg-zinc-900">
        <h2 className="mb-1 text-xl font-semibold">Simple Accordion FAQ</h2>
        <p className="mb-4 text-sm text-muted-foreground">General questions about our product and service.</p>
        <div className="space-y-2">
          {simpleFaqs.map((faq, i) => (
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
      </section>

      <section className="rounded-xl border border-border bg-white p-6 shadow-sm dark:border-border dark:bg-zinc-900">
        <h2 className="mb-1 text-xl font-semibold">Categorized FAQ</h2>
        <p className="mb-4 text-sm text-muted-foreground">Browse questions by category.</p>
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
      </section>

      <section className="rounded-xl border border-border bg-white p-6 shadow-sm dark:border-border dark:bg-zinc-900">
        <h2 className="mb-1 text-xl font-semibold">FAQ with Search</h2>
        <p className="mb-4 text-sm text-muted-foreground">Search through frequently asked questions.</p>
        <div className="relative mb-4">
          <input
            type="search"
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-border bg-white px-4 py-2.5 pl-10 text-sm outline-none transition focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 dark:border-border dark:bg-muted dark:text-zinc-100 dark:focus:border-zinc-400"
          />
          <svg className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        {filteredSearch.length > 0 ? (
          <div className="space-y-2">
            {filteredSearch.map((faq, i) => (
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
            <p className="text-sm text-muted-foreground">No results found for &quot;{searchQuery}&quot;</p>
            <button
              onClick={() => setSearchQuery("")}
              className="rounded-lg border border-border px-4 py-1.5 text-xs font-medium hover:bg-muted dark:border-border dark:hover:bg-muted"
            >
              Clear search
            </button>
          </div>
        )}
      </section>

      <section className="rounded-xl border border-border bg-white p-6 shadow-sm dark:border-border dark:bg-zinc-900">
        <h2 className="mb-1 text-xl font-semibold">Two-Column FAQ Grid</h2>
        <p className="mb-4 text-sm text-muted-foreground">Click a question to reveal its answer. Only one open at a time.</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {gridFaqs.map((faq, i) => (
            <div
              key={i}
              className={`rounded-lg border transition-colors ${
                expandedGridIndex === i
                  ? "border-zinc-900 dark:border-border"
                  : "border-border"
              }`}
            >
              <button
                onClick={() => setExpandedGridIndex(expandedGridIndex === i ? null : i)}
                className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium"
              >
                {faq.question}
                <svg
                  className={`h-4 w-4 shrink-0 text-muted-foreground/70 transition ${
                    expandedGridIndex === i ? "rotate-180" : ""
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
                  expandedGridIndex === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
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
      </section>

      <section className="rounded-xl border border-border bg-white p-6 shadow-sm dark:border-border dark:bg-zinc-900">
        <h2 className="mb-1 text-xl font-semibold">Helpful / Not Helpful</h2>
        <p className="mb-4 text-sm text-muted-foreground">Rate each answer to help us improve.</p>
        <div className="space-y-2">
          {helpfulFaqs.map((faq, i) => {
            const state = helpfulState[i] || { helpful: 0, notHelpful: 0, voted: null }
            return (
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
                      onClick={(e) => { e.stopPropagation(); voteHelpful(i, "helpful") }}
                      className={`flex items-center gap-1 rounded-md border px-2.5 py-1 transition-colors ${
                        state.voted === "helpful"
                          ? "border-green-500 bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : "border-border hover:bg-muted dark:border-border dark:hover:bg-muted"
                      }`}
                    >
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                      </svg>
                      Yes ({state.helpful})
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); voteHelpful(i, "not-helpful") }}
                      className={`flex items-center gap-1 rounded-md border px-2.5 py-1 transition-colors ${
                        state.voted === "not-helpful"
                          ? "border-danger bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                          : "border-border hover:bg-muted dark:border-border dark:hover:bg-muted"
                      }`}
                    >
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
                      </svg>
                      No ({state.notHelpful})
                    </button>
                  </div>
                </div>
              </details>
            )
          })}
        </div>
      </section>

      <section className="rounded-xl border border-border bg-white p-6 shadow-sm dark:border-border dark:bg-zinc-900">
        <h2 className="mb-1 text-xl font-semibold">FAQ with Icons</h2>
        <p className="mb-4 text-sm text-muted-foreground">Each question includes a colored category icon.</p>
        <div className="space-y-2">
          {iconFaqs.map((faq, i) => (
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
      </section>
    </div>
  )
}
