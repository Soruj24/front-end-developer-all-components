"use client";

const features = [
  { icon: "\u26A1", title: "Lightning Fast", desc: "Built on Next.js 14 with edge functions for sub-50ms response times globally." },
  { icon: "\u{1F512}", title: "Enterprise Security", desc: "SOC 2 compliant with end-to-end encryption, SSO, and role-based access control." },
  { icon: "\u{1F4CA}", title: "Real-time Analytics", desc: "Live dashboards with custom reports, cohort analysis, and revenue tracking." },
  { icon: "\u{1F916}", title: "AI-Powered", desc: "GPT-4 integration for automated insights, content generation, and smart predictions." },
  { icon: "\u{1F504}", title: "API First", desc: "RESTful and GraphQL APIs with webhooks, SDKs for Python, Node.js, and Go." },
  { icon: "\u{1F6E0}\uFE0F", title: "Extensible", desc: "Plugin architecture with 200+ integrations including Slack, GitHub, and Jira." },
];

const pricing = [
  { name: "Starter", price: "29", period: "mo", features: ["5 team members", "10GB storage", "Basic analytics", "Email support", "API access"], cta: "Start Free Trial", popular: false },
  { name: "Professional", price: "79", period: "mo", features: ["25 team members", "100GB storage", "Advanced analytics", "Priority support", "Custom integrations", "SSO & SAML"], cta: "Get Started", popular: true },
  { name: "Enterprise", price: "Custom", period: "", features: ["Unlimited members", "Unlimited storage", "Custom analytics", "Dedicated support", "On-premise option", "SLA guarantee", "Custom contracts"], cta: "Contact Sales", popular: false },
];

const logos = ["Vercel", "Stripe", "Linear", "Notion", "Figma", "Loom"];

export default function SaasLandingTemplate() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-zinc-100 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-violet-600" />
            <span className="text-lg font-bold text-zinc-900">Acme</span>
          </div>
          <div className="hidden items-center gap-8 md:flex">
            {["Features", "Pricing", "Docs", "Blog"].map((l) => (
              <a key={l} href="#" className="text-sm text-zinc-500 hover:text-zinc-900">{l}</a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <button className="hidden text-sm font-medium text-zinc-600 hover:text-zinc-900 sm:block">Sign In</button>
            <button className="rounded-full bg-zinc-900 px-5 py-2 text-sm font-medium text-white hover:bg-zinc-800">Get Started</button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-4 py-1.5 text-sm text-zinc-600">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500" /> Now in Public Beta
          </div>
          <h1 className="text-5xl font-bold tracking-tight text-zinc-900 sm:text-7xl">
            Ship faster with
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">modern tooling</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-500">
            The all-in-one platform that helps teams build, scale, and manage products.
            From prototype to production in hours, not weeks.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <button className="rounded-full bg-zinc-900 px-8 py-3 text-sm font-semibold text-white hover:bg-zinc-800">Start Free Trial</button>
            <button className="flex items-center gap-2 rounded-full border border-zinc-200 px-8 py-3 text-sm font-semibold text-zinc-700 hover:bg-zinc-50">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
              Watch Demo
            </button>
          </div>
          <div className="mt-16 flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
            {logos.map((l) => (
              <span key={l} className="text-sm font-semibold text-zinc-300">{l}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-zinc-100 bg-zinc-50 px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-sm font-medium text-blue-600">Features</p>
            <h2 className="mt-2 text-4xl font-bold text-zinc-900">Everything you need</h2>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="rounded-2xl border border-zinc-200 bg-white p-8 hover:shadow-lg transition-shadow">
                <div className="text-3xl">{f.icon}</div>
                <h3 className="mt-4 text-lg font-semibold text-zinc-900">{f.title}</h3>
                <p className="mt-2 text-sm text-zinc-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-sm font-medium text-blue-600">Pricing</p>
            <h2 className="mt-2 text-4xl font-bold text-zinc-900">Simple, transparent pricing</h2>
            <p className="mt-3 text-zinc-500">No hidden fees. Cancel anytime.</p>
          </div>
          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {pricing.map((p) => (
              <div key={p.name} className={`relative rounded-2xl border p-8 ${p.popular ? "border-blue-600 shadow-xl shadow-blue-600/10" : "border-zinc-200"}`}>
                {p.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-4 py-1 text-xs font-semibold text-white">Most Popular</div>}
                <h3 className="text-lg font-semibold text-zinc-900">{p.name}</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  {p.price !== "Custom" && <span className="text-sm text-zinc-400">$</span>}
                  <span className="text-4xl font-bold text-zinc-900">{p.price}</span>
                  {p.period && <span className="text-sm text-zinc-400">/{p.period}</span>}
                </div>
                <ul className="mt-8 space-y-3">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-zinc-600">
                      <svg className="h-4 w-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <button className={`mt-8 w-full rounded-full py-3 text-sm font-semibold transition-colors ${p.popular ? "bg-blue-600 text-white hover:bg-blue-700" : "border border-zinc-200 text-zinc-700 hover:bg-zinc-50"}`}>
                  {p.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-3xl bg-zinc-900 px-8 py-16 text-center sm:px-16">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Ready to get started?</h2>
          <p className="mt-4 text-zinc-400">Join 10,000+ teams already using Acme.</p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <button className="rounded-full bg-white px-8 py-3 text-sm font-semibold text-zinc-900 hover:bg-zinc-100">Start Free Trial</button>
            <button className="rounded-full border border-zinc-700 px-8 py-3 text-sm font-semibold text-white hover:bg-zinc-800">Talk to Sales</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-100 px-6 py-12 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
          <span className="text-sm text-zinc-400">&copy; 2026 Acme Inc. All rights reserved.</span>
          <div className="flex gap-6">
            {["Privacy", "Terms", "Contact"].map((l) => (
              <a key={l} href="#" className="text-sm text-zinc-400 hover:text-zinc-600">{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
