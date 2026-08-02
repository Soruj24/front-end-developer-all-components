"use client";

import { useState } from "react";

const navItems = ["Product", "Features", "Pricing", "Resources", "Enterprise"];

const pricingPlans = [
  { name: "Starter", price: "$29", description: "Perfect for small teams getting started", features: ["Up to 5 seats", "100K API requests/mo", "Basic analytics", "Email support"], popular: false },
  { name: "Professional", price: "$99", description: "Best for growing businesses", features: ["Up to 20 seats", "1M API requests/mo", "Advanced analytics", "Priority support", "Custom integrations"], popular: true },
  { name: "Enterprise", price: "$249", description: "For large organizations with advanced needs", features: ["Unlimited seats", "Unlimited requests", "Real-time analytics", "24/7 dedicated support", "SSO & SAML", "Custom SLA"], popular: false },
];

const features = [
  { title: "Real-time Dashboards", description: "Monitor your metrics live with customizable dashboards that update in real-time.", icon: "chart" },
  { title: "Team Collaboration", description: "Work together seamlessly with shared workspaces, comments, and notifications.", icon: "team" },
  { title: "Advanced Analytics", description: "Deep insights powered by ML-driven anomaly detection and predictive forecasting.", icon: "analytics" },
  { title: "API Integration", description: "Connect with 200+ tools via our robust API and native integrations.", icon: "api" },
  { title: "Role-based Access", description: "Granular permissions and audit logs to keep your data secure and compliant.", icon: "security" },
  { title: "Automated Workflows", description: "Build custom automation pipelines with our drag-and-drop workflow builder.", icon: "automation" },
];

const testimonials = [
  { name: "Sarah Chen", role: "CTO, TechFlow Inc", content: "FlowState transformed how we analyze our product data. The real-time dashboards are incredible.", rating: 5 },
  { name: "Marcus Johnson", role: "VP Engineering, DataSync", content: "The best analytics platform we've used. Setup took minutes, not weeks.", rating: 5 },
  { name: "Emily Rodriguez", role: "Product Lead, ScaleUp", content: "We've seen a 40% improvement in team productivity since switching to FlowState.", rating: 5 },
  { name: "David Kim", role: "Head of Data, CloudBase", content: "The API integrations saved us months of development work.", rating: 4 },
  { name: "Lisa Thompson", role: "CEO, GrowthLab", content: "FlowState's predictive analytics helped us identify trends before they became obvious.", rating: 5 },
  { name: "James Wilson", role: "Engineering Manager, StackPath", content: "Enterprise-grade security with startup-level simplicity.", rating: 5 },
];

const faqs = [
  { q: "How does the free trial work?", a: "You get full access to all Professional features for 14 days. No credit card required." },
  { q: "Can I change plans later?", a: "Yes, you can upgrade or downgrade anytime. Changes take effect immediately." },
  { q: "What kind of support do you offer?", a: "All plans include email support. Professional plans get priority support, and Enterprise gets 24/7 dedicated support." },
  { q: "Is my data secure?", a: "We use AES-256 encryption at rest and TLS 1.3 in transit. SOC 2 Type II certified." },
  { q: "Do you offer custom integrations?", a: "Enterprise plans include custom integration development. We also have 200+ native integrations." },
  { q: "What is your uptime SLA?", a: "We guarantee 99.99% uptime for Professional and Enterprise plans." },
];

const integrations = [
  { name: "Slack", category: "Communication" },
  { name: "GitHub", category: "Development" },
  { name: "Jira", category: "Project Mgmt" },
  { name: "AWS", category: "Cloud" },
  { name: "Salesforce", category: "CRM" },
  { name: "Stripe", category: "Payments" },
  { name: "Figma", category: "Design" },
  { name: "Shopify", category: "Commerce" },
];

const stats = [
  { label: "Active Users", value: "50K+" },
  { label: "Data Points/day", value: "2.1B" },
  { label: "Integrations", value: "200+" },
  { label: "Uptime SLA", value: "99.99%" },
];

const caseStudies = [
  { company: "TechFlow Inc", industry: "SaaS", metric: "300%", description: "Increase in dashboard adoption after switching to FlowState" },
  { company: "DataSync Corp", industry: "Finance", metric: "60%", description: "Reduction in time spent on manual reporting" },
  { company: "CloudBase", industry: "E-commerce", metric: "2.5x", description: "Revenue growth attributed to better data insights" },
];

const howItWorks = [
  { step: "01", title: "Connect your data", description: "Integrate with your existing tools in minutes. We support 200+ native integrations." },
  { step: "02", title: "Build your dashboard", description: "Drag and drop to create custom dashboards that show exactly what matters." },
  { step: "03", title: "Collaborate and decide", description: "Share insights with your team, set alerts, and make data-driven decisions faster." },
];

function IconChart() { return <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>; }
function IconTeam() { return <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" /></svg>; }
function IconAnalytics() { return <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>; }
function IconAPI() { return <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.25 6.75L22.5 12l-5.25 5.25M6.75 17.25L1.5 12l5.25-5.25M14.25 3.75l-4.5 16.5" /></svg>; }
function IconSecurity() { return <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>; }
function IconAutomation() { return <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.5 12a7.5 7.5 0 0115 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H19m-1.5 0H15m-1.5 0H9m-1.5 0H5.5" /></svg>; }
function IconCheck() { return <svg className="h-5 w-5 shrink-0 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>; }
function IconStar() { return <svg className="h-5 w-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>; }

const iconMap: Record<string, React.ReactNode> = {
  chart: <IconChart />,
  team: <IconTeam />,
  analytics: <IconAnalytics />,
  api: <IconAPI />,
  security: <IconSecurity />,
  automation: <IconAutomation />,
};

export default function SaasPage() {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="flex flex-col gap-16 p-8">
      {/* 1 */}
      <nav className="flex items-center justify-between rounded-xl border border-border bg-white/80 px-6 py-3 backdrop-blur dark:border-border dark:bg-zinc-900/80">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600" />
          <span className="text-lg font-bold text-foreground">FlowState</span>
        </div>
        <div className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <a key={item} href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground dark:text-muted-foreground/70 dark:hover:text-zinc-100">{item}</a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <button className="text-sm text-muted-foreground transition-colors hover:text-foreground dark:text-muted-foreground/70 dark:hover:text-zinc-100">Sign In</button>
          <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700">Get Started</button>
        </div>
      </nav>

      {/* 2 Hero */}
      <section className="flex flex-col items-center gap-6 rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 px-8 py-20 text-center text-white">
        <span className="rounded-full bg-white/20 px-4 py-1 text-xs font-medium backdrop-blur-sm">Now in Public Beta</span>
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">Make Data-Driven Decisions at Flow Speed</h1>
        <p className="max-w-xl text-base text-white/80">FlowState brings together analytics, collaboration, and automation in one powerful platform.</p>
        <div className="flex gap-4">
          <button className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-blue-700 transition-colors hover:bg-blue-50">Start Free Trial</button>
          <button className="rounded-lg border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10">Watch Demo</button>
        </div>
        <div className="flex items-center gap-4 text-xs text-white/60">
          <div className="flex -space-x-2">
            {[...Array(4)].map((_, i) => <div key={i} className="h-8 w-8 rounded-full border-2 border-white/30 bg-gradient-to-br from-blue-300 to-purple-400" />)}
          </div>
          <span>Trusted by 5,000+ teams worldwide</span>
        </div>
      </section>

      {/* 3 Trust badges */}
      <section className="flex flex-col items-center gap-6">
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground dark:text-muted-foreground/70">Trusted by industry leaders</p>
        <div className="flex flex-wrap items-center justify-center gap-8 opacity-50">
          {["TechFlow", "DataSync", "CloudBase", "ScaleUp", "StackPath", "GrowthLab"].map((name) => (
            <div key={name} className="flex items-center gap-2">
              <div className="h-6 w-6 rounded bg-muted dark:bg-muted" />
              <span className="text-sm font-bold text-muted-foreground">{name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 4 Stats row */}
      <section className="grid grid-cols-2 gap-4 rounded-xl border border-border bg-white p-8 dark:border-border dark:bg-zinc-900 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <div className="text-3xl font-bold text-foreground">{s.value}</div>
            <div className="mt-1 text-sm text-muted-foreground dark:text-muted-foreground/70">{s.label}</div>
          </div>
        ))}
      </section>

      {/* 5 How it works */}
      <section className="flex flex-col gap-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground">How it works</h2>
          <p className="mt-2 text-muted-foreground">Get up and running in three simple steps.</p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {howItWorks.map((step) => (
            <div key={step.step} className="relative flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-xl font-bold text-blue-600 dark:bg-blue-900/40 dark:text-blue-400">{step.step}</div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">{step.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6 Feature grid 3-col */}
      <section className="flex flex-col gap-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground">Everything you need to ship faster</h2>
          <p className="mt-2 text-muted-foreground">Built for modern teams that move at startup speed.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {features.slice(0, 3).map((f) => (
            <div key={f.title} className="rounded-xl border border-border bg-white p-6 transition-all hover:shadow-md dark:border-border dark:bg-zinc-900">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400">
                {iconMap[f.icon]}
              </div>
              <h3 className="text-lg font-semibold text-foreground">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 7 Feature grid 4-col */}
      <section className="flex flex-col gap-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground">Platform features</h2>
          <p className="mt-2 text-muted-foreground">Discover what makes FlowState different.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div key={f.title} className="rounded-xl border border-border bg-white p-5 dark:border-border dark:bg-zinc-900">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400">
                {iconMap[f.icon]}
              </div>
              <h3 className="font-semibold text-foreground">{f.title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 8 Alternating feature rows */}
      <section className="flex flex-col gap-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground">Built for the way you work</h2>
        </div>
        {[
          { title: "Real-time Collaboration", description: "Work together in real-time with shared dashboards, annotations, and live cursors. See changes as they happen across your entire team.", reverse: false },
          { title: "Powerful Automation Engine", description: "Build complex automation workflows with an intuitive drag-and-drop builder. No coding required, endless possibilities.", reverse: true },
          { title: "Enterprise-Grade Security", description: "SOC 2 Type II certified with end-to-end encryption. Role-based access controls and detailed audit logs keep your data safe.", reverse: false },
        ].map((row, i) => (
          <div key={i} className={`flex flex-col items-center gap-8 ${row.reverse ? "md:flex-row-reverse" : "md:flex-row"}`}>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-foreground">{row.title}</h3>
              <p className="mt-3 text-muted-foreground">{row.description}</p>
              <button className="mt-4 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">Learn more →</button>
            </div>
            <div className="flex flex-1 items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 p-12 dark:from-blue-950/30 dark:to-indigo-950/30">
              <div className="h-48 w-full max-w-sm rounded-lg border border-border bg-white/60 p-4 shadow-sm backdrop-blur dark:border-border dark:bg-muted/60">
                <div className="mb-3 h-3 w-24 rounded bg-blue-200 dark:bg-blue-800" />
                <div className="space-y-2">
                  <div className="h-2 w-full rounded bg-muted" />
                  <div className="h-2 w-3/4 rounded bg-muted" />
                  <div className="h-2 w-5/6 rounded bg-muted" />
                  <div className="h-2 w-1/2 rounded bg-muted" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* 9 Dashboard preview */}
      <section className="rounded-xl border border-border bg-gradient-to-br from-zinc-900 to-zinc-800 p-8 dark:border-border">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-white">See it in action</h2>
          <p className="text-muted-foreground/70">A glimpse inside your new analytics command center.</p>
        </div>
        <div className="overflow-hidden rounded-lg border border-zinc-700 bg-zinc-900">
          <div className="flex items-center gap-2 border-b border-zinc-700 px-4 py-3">
            <div className="h-3 w-3 rounded-full bg-red-500" />
            <div className="h-3 w-3 rounded-full bg-amber-500" />
            <div className="h-3 w-3 rounded-full bg-green-500" />
            <span className="ml-4 text-xs text-muted-foreground">FlowState Dashboard</span>
          </div>
          <div className="grid grid-cols-3 gap-4 p-6">
            <div className="col-span-2 rounded bg-zinc-800 p-4">
              <div className="mb-3 h-4 w-32 rounded bg-zinc-700" />
              <div className="flex gap-2">
                <div className="h-24 flex-1 rounded bg-blue-500/20" />
                <div className="h-24 flex-1 rounded bg-indigo-500/20" />
                <div className="h-24 flex-1 rounded bg-purple-500/20" />
              </div>
            </div>
            <div className="rounded bg-zinc-800 p-4">
              <div className="mb-3 h-4 w-20 rounded bg-zinc-700" />
              <div className="space-y-2">
                <div className="h-2 w-full rounded bg-zinc-700" />
                <div className="h-2 w-3/4 rounded bg-zinc-700" />
                <div className="h-2 w-5/6 rounded bg-zinc-700" />
                <div className="h-2 w-1/2 rounded bg-zinc-700" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10 Metrics highlight */}
      <section className="flex flex-col items-center gap-6 text-center">
        <h2 className="text-2xl font-bold text-foreground">Track what matters most</h2>
        <p className="text-muted-foreground">Monitor key metrics at a glance with customizable widgets.</p>
        <div className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Monthly Revenue", value: "$284.7K", change: "+12.5%", up: true },
            { label: "Active Users", value: "48,392", change: "+8.2%", up: true },
            { label: "Bounce Rate", value: "24.1%", change: "-3.4%", up: false },
            { label: "Conversion Rate", value: "4.8%", change: "+1.2%", up: true },
          ].map((m) => (
            <div key={m.label} className="rounded-xl border border-border bg-white p-5 text-left dark:border-border dark:bg-zinc-900">
              <div className="text-sm text-muted-foreground dark:text-muted-foreground/70">{m.label}</div>
              <div className="mt-1 text-2xl font-bold text-foreground">{m.value}</div>
              <div className={`mt-1 text-xs font-medium ${m.up ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>{m.change}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 11 Pricing */}
      <section className="flex flex-col items-center gap-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground">Simple, transparent pricing</h2>
          <p className="mt-2 text-muted-foreground">No hidden fees. No surprises.</p>
        </div>
        <div className="flex items-center gap-4 rounded-full border border-border p-1 dark:border-border">
          <button onClick={() => setBilling("monthly")} className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${billing === "monthly" ? "bg-foreground text-background dark:bg-foreground dark:text-background" : "text-muted-foreground hover:text-foreground dark:text-muted-foreground/70 dark:hover:text-zinc-100"}`}>Monthly</button>
          <button onClick={() => setBilling("annual")} className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${billing === "annual" ? "bg-foreground text-background dark:bg-foreground dark:text-background" : "text-muted-foreground hover:text-foreground dark:text-muted-foreground/70 dark:hover:text-zinc-100"}`}>Annual <span className="text-green-500">Save 20%</span></button>
        </div>
        <div className="grid w-full gap-6 md:grid-cols-3">
          {pricingPlans.map((plan) => (
            <div key={plan.name} className={`relative flex flex-col rounded-xl border p-6 ${plan.popular ? "border-blue-500 bg-blue-50 dark:border-blue-500 dark:bg-blue-950/30" : "border-border bg-white dark:border-border dark:bg-zinc-900"}`}>
              {plan.popular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-4 py-1 text-xs font-medium text-white">Most Popular</span>}
              <h3 className="text-lg font-semibold text-foreground">{plan.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground dark:text-muted-foreground/70">{plan.description}</p>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-foreground">{billing === "annual" ? `$${Math.round(parseInt(plan.price.slice(1)) * 0.8 * 12)}` : plan.price}</span>
                <span className="text-sm text-muted-foreground">/{billing === "annual" ? "yr" : "month"}</span>
              </div>
              <ul className="mt-6 flex-1 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <IconCheck />
                    {f}
                  </li>
                ))}
              </ul>
              <button className={`mt-6 w-full rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${plan.popular ? "bg-blue-600 text-white hover:bg-blue-700" : "border border-border text-zinc-900 hover:bg-muted/40 dark:border-border dark:text-zinc-100 dark:hover:bg-muted"}`}>
                Get Started {plan.name === "Enterprise" ? "→" : ""}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 12 Comparison table */}
      <section className="flex flex-col gap-6">
        <h2 className="text-center text-2xl font-bold text-foreground">Compare plans</h2>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40 dark:border-border dark:bg-zinc-900">
                <th scope="col" className="px-6 py-4 font-semibold text-foreground">Feature</th>
                <th scope="col" className="px-6 py-4 font-semibold text-foreground">Starter</th>
                <th scope="col" className="px-6 py-4 font-semibold text-blue-600">Professional</th>
                <th scope="col" className="px-6 py-4 font-semibold text-foreground">Enterprise</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                { f: "Seats", s: "5", p: "20", e: "Unlimited" },
                { f: "API Requests", s: "100K/mo", p: "1M/mo", e: "Unlimited" },
                { f: "Analytics", s: "Basic", p: "Advanced", e: "Real-time" },
                { f: "Support", s: "Email", p: "Priority", e: "24/7 Dedicated" },
                { f: "Custom Integrations", s: "—", p: "—", e: "✓" },
                { f: "SSO/SAML", s: "—", p: "—", e: "✓" },
                { f: "Custom SLA", s: "—", p: "—", e: "✓" },
              ].map((row) => (
                <tr key={row.f} className="bg-background/50">
                  <td className="px-6 py-3 font-medium text-foreground">{row.f}</td>
                  <td className="px-6 py-3 text-muted-foreground">{row.s}</td>
                  <td className="px-6 py-3 text-muted-foreground">{row.p}</td>
                  <td className="px-6 py-3 text-muted-foreground">{row.e}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 13 Testimonials */}
      <section className="flex flex-col gap-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground">Loved by teams everywhere</h2>
          <p className="mt-2 text-muted-foreground">See why thousands of companies choose FlowState.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t.name} className="rounded-xl border border-border bg-white p-6 dark:border-border dark:bg-zinc-900">
              <div className="flex gap-1">
                {Array.from({ length: t.rating }, (_, i) => <IconStar key={i} />)}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">&ldquo;{t.content}&rdquo;</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500" />
                <div>
                  <div className="text-sm font-semibold text-foreground">{t.name}</div>
                  <div className="text-xs text-muted-foreground dark:text-muted-foreground/70">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 14 FAQ */}
      <section className="flex flex-col gap-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground">Frequently asked questions</h2>
          <p className="mt-2 text-muted-foreground">Everything you need to know about FlowState.</p>
        </div>
        <div className="mx-auto w-full max-w-2xl space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="rounded-xl border border-border bg-white dark:border-border dark:bg-zinc-900">
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="flex w-full items-center justify-between px-6 py-4 text-left">
                <span className="font-medium text-foreground">{faq.q}</span>
                <svg className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform ${openFaq === i ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
              {openFaq === i && (
                <div className="border-t border-border px-6 py-4 text-sm text-muted-foreground dark:border-border dark:text-muted-foreground/70">{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 15 Integrations */}
      <section className="flex flex-col items-center gap-6">
        <h2 className="text-2xl font-bold text-foreground">Works with your favorite tools</h2>
        <p className="text-muted-foreground">Native integrations with the tools you already use.</p>
        <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-4">
          {integrations.map((i) => (
            <div key={i.name} className="flex items-center gap-3 rounded-xl border border-border bg-white p-4 dark:border-border dark:bg-zinc-900">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted text-xs font-bold text-muted-foreground dark:bg-muted dark:text-muted-foreground/70">
                {i.name.slice(0, 2)}
              </div>
              <div>
                <div className="text-sm font-medium text-foreground">{i.name}</div>
                <div className="text-xs text-muted-foreground dark:text-muted-foreground/70">{i.category}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 16 Newsletter */}
      <section className="rounded-xl border border-border bg-gradient-to-br from-blue-50 to-indigo-50 p-8 text-center dark:border-border dark:from-blue-950/30 dark:to-indigo-950/30">
        <h2 className="text-2xl font-bold text-foreground">Stay ahead of the curve</h2>
        <p className="mt-2 text-muted-foreground">Get product updates, tips, and insights delivered to your inbox.</p>
        <div className="mx-auto mt-6 flex max-w-md gap-3">
          <input type="email" placeholder="you@company.com" className="flex-1 rounded-lg border border-border bg-white px-4 py-2.5 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-border dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder-zinc-500" />
          <button className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700">Subscribe</button>
        </div>
        <p className="mt-3 text-xs text-muted-foreground/70">No spam, unsubscribe anytime.</p>
      </section>

      {/* 17 Demo request */}
      <section className="grid gap-8 rounded-xl border border-border bg-white p-8 dark:border-border dark:bg-zinc-900 md:grid-cols-2">
        <div className="flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-foreground">See FlowState in action</h2>
          <p className="mt-2 text-muted-foreground">Schedule a personalized demo with our team. See exactly how FlowState can transform your workflow.</p>
          <ul className="mt-6 space-y-3">
            {["Personalized walkthrough", "Q&A with our product team", "Custom pricing quote", "No commitment required"].map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                <IconCheck />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-4 rounded-lg border border-border bg-muted/40 p-6 dark:border-border dark:bg-muted/50">
          <input type="text" placeholder="Full name" className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-border dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder-zinc-500" />
          <input type="email" placeholder="Work email" className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-border dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder-zinc-500" />
          <input type="text" placeholder="Company name" className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-border dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder-zinc-500" />
          <select className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-border dark:bg-zinc-900 dark:text-zinc-100">
            <option>Team size</option>
            <option>1-10</option>
            <option>11-50</option>
            <option>51-200</option>
            <option>200+</option>
          </select>
          <button className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700">Request Demo</button>
        </div>
      </section>

      {/* 18 Waitlist / beta */}
      <section className="rounded-xl border border-border bg-gradient-to-br from-purple-600 to-indigo-700 p-8 text-center text-white dark:border-border">
        <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium">Limited Availability</span>
        <h2 className="mt-4 text-2xl font-bold">Join the waitlist for FlowState AI</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-white/80">Be among the first to experience our AI-powered predictive analytics module.</p>
        <div className="mx-auto mt-6 flex max-w-sm gap-3">
          <input type="email" placeholder="your@email.com" className="flex-1 rounded-lg bg-white/15 px-4 py-2.5 text-sm text-white placeholder-white/50 outline-none ring-1 ring-white/30 focus:ring-white/60" />
          <button className="rounded-lg bg-white px-6 py-2.5 text-sm font-semibold text-indigo-700 transition-colors hover:bg-indigo-50">Join Waitlist</button>
        </div>
        <p className="mt-4 text-xs text-white/50">2,847 people ahead of you</p>
      </section>

      {/* 19 Case studies */}
      <section className="flex flex-col gap-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground">Customer success stories</h2>
          <p className="mt-2 text-muted-foreground">See how teams are achieving remarkable results.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {caseStudies.map((cs) => (
            <div key={cs.company} className="group rounded-xl border border-border bg-white p-6 transition-all hover:shadow-lg dark:border-border dark:bg-zinc-900">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-sm font-bold text-muted-foreground dark:bg-muted dark:text-muted-foreground/70">{cs.company[0]}</div>
                <div>
                  <div className="text-sm font-semibold text-foreground">{cs.company}</div>
                  <div className="text-xs text-muted-foreground dark:text-muted-foreground/70">{cs.industry}</div>
                </div>
              </div>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{cs.metric}</div>
              <p className="mt-2 text-sm text-muted-foreground">{cs.description}</p>
              <span className="mt-4 inline-block text-sm font-medium text-blue-600 transition-colors group-hover:text-blue-700 dark:text-blue-400 dark:group-hover:text-blue-300">Read case study →</span>
            </div>
          ))}
        </div>
      </section>

      {/* 20 Split layout - AI feature */}
      <section className="flex flex-col items-center gap-8 rounded-xl border border-border bg-white p-8 dark:border-border dark:bg-zinc-900 md:flex-row">
        <div className="flex-1">
          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700 dark:bg-green-900/40 dark:text-green-300">New</span>
          <h2 className="mt-3 text-2xl font-bold text-foreground">AI-Powered Insights</h2>
          <p className="mt-3 text-muted-foreground">Our machine learning engine automatically surfaces trends, anomalies, and actionable recommendations so you can focus on what matters.</p>
          <div className="mt-6 space-y-4">
            {["Anomaly detection", "Trend forecasting", "Smart alerts", "Automated reports"].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <span className="text-sm text-muted-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="h-56 w-full max-w-sm rounded-xl bg-gradient-to-br from-blue-500/20 via-indigo-500/20 to-purple-500/20 p-6">
            <div className="flex items-center justify-between">
              <div className="h-3 w-20 rounded bg-white/30" />
              <div className="rounded-full bg-green-500/30 px-2 py-0.5 text-xs text-green-300">+12.5%</div>
            </div>
            <div className="mt-6 flex items-end gap-2">
              <div className="h-16 flex-1 rounded bg-blue-500/40" />
              <div className="h-24 flex-1 rounded bg-indigo-500/40" />
              <div className="h-12 flex-1 rounded bg-purple-500/40" />
              <div className="h-20 flex-1 rounded bg-blue-500/40" />
              <div className="h-28 flex-1 rounded bg-indigo-500/40" />
            </div>
          </div>
        </div>
      </section>

      {/* 21 Enterprise features */}
      <section className="flex flex-col gap-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground">Built for Enterprise</h2>
          <p className="mt-2 text-muted-foreground">Security, compliance, and scale out of the box.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { title: "SSO & SAML", desc: "Okta, Azure AD, Google Workspace" },
            { title: "SOC 2 Type II", desc: "Audited annually by independent firms" },
            { title: "99.99% Uptime", desc: "Guaranteed SLA with service credits" },
            { title: "Data Residency", desc: "Choose US, EU, or APAC regions" },
            { title: "Audit Logs", desc: "Detailed event trail for compliance" },
            { title: "RBAC", desc: "Granular role and permission management" },
            { title: "Encryption", desc: "AES-256 at rest, TLS 1.3 in transit" },
            { title: "Dedicated Support", desc: "24/7 with 15-minute response SLA" },
          ].map((item) => (
            <div key={item.title} className="rounded-lg border border-border bg-white p-4 dark:border-border dark:bg-zinc-900">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-muted text-muted-foreground dark:bg-muted dark:text-muted-foreground/70">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
              </div>
              <h3 className="mt-3 text-sm font-semibold text-foreground">{item.title}</h3>
              <p className="mt-1 text-xs text-muted-foreground dark:text-muted-foreground/70">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 22 Security compliance badges */}
      <section className="flex flex-col items-center gap-6 rounded-xl border border-border bg-white p-8 dark:border-border dark:bg-zinc-900">
        <h2 className="text-2xl font-bold text-foreground">Trusted and compliant</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {[
            { name: "SOC 2", desc: "Type II Certified" },
            { name: "ISO 27001", desc: "Certified" },
            { name: "GDPR", desc: "Compliant" },
            { name: "HIPAA", desc: "Compliant" },
            { name: "PCI DSS", desc: "Level 1" },
          ].map((badge) => (
            <div key={badge.name} className="flex flex-col items-center gap-1">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-border bg-muted/40 text-xs font-bold text-muted-foreground dark:border-border dark:bg-muted dark:text-muted-foreground/70">{badge.name}</div>
              <span className="text-xs text-muted-foreground dark:text-muted-foreground/70">{badge.desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 23 Mobile app */}
      <section className="rounded-xl border border-border bg-gradient-to-br from-zinc-900 to-zinc-800 p-8 text-center text-white dark:border-border">
        <h2 className="text-2xl font-bold">FlowState on the go</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground/70">Access your dashboards, respond to alerts, and collaborate from anywhere.</p>
        <div className="mt-6 flex items-center justify-center gap-4">
          <button className="flex items-center gap-3 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-zinc-900 transition-colors hover:bg-muted">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" /></svg>
            App Store
          </button>
          <button className="flex items-center gap-3 rounded-lg border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.807 1.626a1 1 0 010 1.732l-2.807 1.626L15.206 12l2.492-2.492zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z" /></svg>
            Google Play
          </button>
        </div>
      </section>

      {/* 24 API showcase */}
      <section className="flex flex-col gap-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground">Developer-first API</h2>
          <p className="mt-2 text-muted-foreground">Integrate FlowState into your stack in minutes.</p>
        </div>
        <div className="overflow-hidden rounded-xl border border-border">
          <div className="flex items-center gap-2 border-b border-border bg-muted/40 px-4 py-2 dark:border-border dark:bg-zinc-900">
            <span className="rounded bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground dark:bg-muted dark:text-muted-foreground">curl</span>
            <span className="text-xs text-muted-foreground">POST /api/v1/analytics/query</span>
            <span className="ml-auto rounded bg-green-100 px-2 py-0.5 text-xs text-green-700 dark:bg-green-900/40 dark:text-green-300">200 OK</span>
          </div>
          <pre className="overflow-x-auto bg-zinc-900 p-4 text-xs text-green-400">
{`{
  "query": "SELECT metric, value FROM analytics WHERE date > NOW() - INTERVAL 7 DAY",
  "response": {
    "metrics": [
      { "name": "page_views", "value": 284710, "change": 12.5 },
      { "name": "conversions", "value": 3842, "change": -3.2 },
      { "name": "revenue", "value": 94720, "change": 18.7 }
    ]
  }
}`}
          </pre>
        </div>
      </section>

      {/* 25 Video hero */}
      <section className="relative flex flex-col items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900 px-8 py-16 text-center">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.3),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(139,92,246,0.3),transparent_60%)]" />
        </div>
        <span className="relative rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/80">Product Tour</span>
        <h2 className="relative mt-4 text-2xl font-bold text-white">See FlowState in 90 seconds</h2>
        <p className="relative mt-2 max-w-md text-sm text-muted-foreground/70">Watch our quick product tour to see how FlowState can transform your analytics workflow.</p>
        <button className="relative mt-6 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-lg transition-transform hover:scale-105">
          <svg className="ml-0.5 h-6 w-6 text-zinc-900" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
        </button>
      </section>

      {/* 26 Floating CTA */}
      <section className="sticky bottom-4 z-10 mx-auto flex w-full max-w-3xl items-center justify-between rounded-xl border border-border bg-white/90 px-6 py-3 shadow-lg backdrop-blur-lg dark:border-border dark:bg-zinc-900/90">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/40">
            <span className="text-green-600 dark:text-green-400">✓</span>
          </div>
          <p className="text-sm font-medium text-foreground">Start your 14-day free trial. No credit card needed.</p>
        </div>
        <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700">Get Started Free</button>
      </section>

      {/* 27 Comparison checklist */}
      <section className="flex flex-col gap-6">
        <h2 className="text-center text-2xl font-bold text-foreground">Why FlowState?</h2>
        <p className="text-center text-muted-foreground">See how we compare to the competition.</p>
        <div className="mx-auto w-full max-w-2xl space-y-3">
          {[
            { feature: "Real-time data sync", ours: true, other: false },
            { feature: "Unlimited API requests", ours: true, other: false },
            { feature: "Role-based access control", ours: true, other: true },
            { feature: "Native integrations (200+)", ours: true, other: false },
            { feature: "AI-powered anomaly detection", ours: true, other: false },
            { feature: "Custom dashboards", ours: true, other: true },
            { feature: "24/7 support", ours: true, other: false },
            { feature: "SOC 2 compliance", ours: true, other: true },
          ].map((row) => (
            <div key={row.feature} className="flex items-center justify-between rounded-lg border border-border bg-white px-4 py-3 dark:border-border dark:bg-zinc-900">
              <span className="text-sm text-muted-foreground">{row.feature}</span>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold uppercase text-blue-600">FlowState</span>
                  <span className={row.ours ? "text-green-500" : "text-red-400"}>{row.ours ? "✓" : "✗"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold uppercase text-muted-foreground/70">Others</span>
                  <span className={row.other ? "text-green-500" : "text-red-400"}>{row.other ? "✓" : "✗"}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 28 Investor / social proof */}
      <section className="flex flex-col items-center gap-6 text-center">
        <h2 className="text-2xl font-bold text-foreground">Backed by top investors</h2>
        <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
          {["Sequoia Capital", "Andreessen Horowitz", "Accel Partners", "GV"].map((name) => (
            <div key={name} className="flex items-center gap-2">
              <div className="h-5 w-5 rounded bg-muted dark:bg-muted" />
              <span className="text-sm font-bold text-muted-foreground">{name}</span>
            </div>
          ))}
        </div>
        <p className="text-sm text-muted-foreground dark:text-muted-foreground/70">$120M Series C · Backed by industry leaders</p>
      </section>

      {/* 29 Two-column CTA */}
      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 p-8 text-white">
          <h3 className="text-xl font-bold">Start your free trial</h3>
          <p className="mt-2 text-sm text-white/80">Get full access to all features for 14 days. No credit card required.</p>
          <button className="mt-4 rounded-lg bg-white px-6 py-2.5 text-sm font-semibold text-blue-700 transition-colors hover:bg-blue-50">Start Free Trial</button>
        </div>
        <div className="rounded-xl border border-border bg-white p-8 dark:border-border dark:bg-zinc-900">
          <h3 className="text-xl font-bold text-foreground">Talk to sales</h3>
          <p className="mt-2 text-sm text-muted-foreground">Have questions? Our team is here to help you find the perfect plan.</p>
          <button className="mt-4 rounded-lg border border-border px-6 py-2.5 text-sm font-medium text-zinc-900 transition-colors hover:bg-muted/40 dark:border-border dark:text-zinc-100 dark:hover:bg-muted">Contact Sales</button>
        </div>
      </section>

      {/* 30 Single CTA */}
      <section className="flex flex-col items-center gap-4 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 px-8 py-12 text-center text-white">
        <h2 className="text-2xl font-bold">Ready to get started?</h2>
        <p className="max-w-md text-sm text-white/80">Join 5,000+ teams already using FlowState to make better decisions.</p>
        <div className="flex gap-3">
          <button className="rounded-lg bg-white px-6 py-2.5 text-sm font-semibold text-blue-700 transition-colors hover:bg-blue-50">Get Started Free</button>
          <button className="rounded-lg border border-white/30 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10">Talk to Sales</button>
        </div>
      </section>

      {/* 31 Footer */}
      <footer className="rounded-xl border border-border bg-white p-8 dark:border-border dark:bg-zinc-900">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600" />
              <span className="text-lg font-bold text-foreground">FlowState</span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">Modern analytics and collaboration platform for data-driven teams.</p>
            <div className="mt-4 flex gap-4">
              {["Twitter", "GitHub", "LinkedIn", "YouTube"].map((s) => (
                <a key={s} href="#" className="text-xs text-muted-foreground underline-offset-2 hover:underline dark:text-muted-foreground/70">{s}</a>
              ))}
            </div>
          </div>
          {[
            { title: "Product", links: ["Features", "Pricing", "Integrations", "Changelog"] },
            { title: "Company", links: ["About", "Blog", "Careers", "Press"] },
            { title: "Resources", links: ["Documentation", "API Reference", "Help Center", "Community"] },
          ].map((group) => (
            <div key={group.title}>
              <h4 className="mb-3 text-sm font-semibold text-foreground">{group.title}</h4>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground dark:text-muted-foreground/70 dark:hover:text-zinc-100">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-8 border-t border-border pt-6 text-center text-xs text-muted-foreground dark:border-border dark:text-muted-foreground/70">
          © 2026 FlowState, Inc. All rights reserved. Privacy Policy · Terms of Service
        </div>
      </footer>
    </div>
  );
}
