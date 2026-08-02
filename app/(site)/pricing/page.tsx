"use client";

import { useState } from "react";

function CheckIcon({ className = "h-4 w-4 text-emerald-500" }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function CrossIcon({ className = "h-4 w-4 text-muted-foreground" }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function DashIcon({ className = "h-4 w-4 text-muted-foreground" }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>
  );
}

function GraduationIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342" />
    </svg>
  );
}

function SparklesIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423z" />
    </svg>
  );
}

function RadioChecked() {
  return (
    <svg className="h-4 w-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
    </svg>
  );
}

function RadioUnchecked() {
  return (
    <svg className="h-4 w-4 text-zinc-300" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
    </svg>
  );
}

const SectionHeader = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="text-center">
    <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
    {subtitle && <p className="mt-1 text-sm text-muted-foreground dark:text-muted-foreground/70">{subtitle}</p>}
  </div>
);

const standardPlans = [
  { name: "Free", price: "$0", period: "/mo", desc: "Perfect for getting started", features: ["1 project", "1,000 requests/mo", "Community support", "Basic analytics", "2 team members"], cta: "Get Started", popular: false },
  { name: "Pro", price: "$19", period: "/mo", desc: "For growing teams", features: ["Unlimited projects", "100,000 requests/mo", "Priority support", "Advanced analytics", "Unlimited team members", "Custom domains", "API access"], cta: "Start Free Trial", popular: true },
  { name: "Enterprise", price: "$99", period: "/mo", desc: "For large organizations", features: ["Everything in Pro", "Unlimited requests", "24/7 dedicated support", "Custom integrations", "SLA guarantee", "SSO & SCIM", "Dedicated account manager", "Custom contract"], cta: "Contact Sales", popular: false },
];

const fourTierPlans = [
  { name: "Starter", price: "$9", period: "/mo", desc: "For small side projects", features: ["3 projects", "10,000 requests/mo", "Community support", "Basic analytics", "10 team members"], cta: "Start Free Trial", popular: false },
  { name: "Free", price: "$0", period: "/mo", desc: "Perfect for getting started", features: ["1 project", "1,000 requests/mo", "Community support", "Basic analytics", "2 team members"], cta: "Get Started", popular: false },
  { name: "Pro", price: "$29", period: "/mo", desc: "For growing teams", features: ["Unlimited projects", "100,000 requests/mo", "Priority support", "Advanced analytics", "Unlimited team members", "Custom domains"], cta: "Start Free Trial", popular: true },
  { name: "Enterprise", price: "$99", period: "/mo", desc: "For large organizations", features: ["Unlimited everything", "Unlimited requests", "24/7 dedicated support", "Custom integrations", "SLA guarantee", "SSO & SCIM", "Dedicated account manager"], cta: "Contact Sales", popular: false },
];

const featureComparisonData = {
  features: ["Projects", "Requests / month", "Team members", "Support", "Analytics", "Custom domains", "API access", "SSO / SCIM", "SLA", "Dedicated manager"],
  plans: [
    { name: "Starter", values: ["3", "10K", "10", "Email", "Basic", false, false, false, false, false] },
    { name: "Free", values: ["1", "1K", "2", "Community", "Basic", false, false, false, false, false] },
    { name: "Pro", values: ["Unlimited", "100K", "Unlimited", "Priority", "Advanced", true, true, false, false, false] },
    { name: "Enterprise", values: ["Unlimited", "Unlimited", "Unlimited", "24/7 Dedicated", "Advanced + AI", true, true, true, true, true] },
  ],
};

export default function Pricing() {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");
  const [seatCount, setSeatCount] = useState(5);
  const [usageSlider, setUsageSlider] = useState(2);
  const [addonStorage, setAddonStorage] = useState(false);
  const [addonSupport, setAddonSupport] = useState(false);
  const [addonDomain, setAddonDomain] = useState(false);
  const [teamBase, setTeamBase] = useState(1);
  const [currency, setCurrency] = useState<"USD" | "EUR" | "GBP">("USD");
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [overageUsage, setOverageUsage] = useState(5000);
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);
  const [seatTierSeats, setSeatTierSeats] = useState(3);

  const usageLabels = ["100K / mo", "500K / mo", "1M / mo", "5M / mo"];
  const usageBasePrices = [29, 99, 199, 699];
  const usagePrice = usageBasePrices[usageSlider];

  const currencyRates = { USD: 1, EUR: 0.92, GBP: 0.79 };
  const convert = (amount: number) => (amount * currencyRates[currency]).toFixed(2);

  const annualFactor = billing === "annual" ? 0.8 : 1;

  const seatPrice = 19;
  const seatTotal = seatCount * seatPrice * annualFactor;

  const addonTotal = (addonStorage ? 5 : 0) + (addonSupport ? 10 : 0) + (addonDomain ? 3 : 0);

  const teamBasePrice = 29;
  const teamPerAdditional = 9;
  const teamTotal = teamBasePrice + Math.max(0, teamBase - 1) * teamPerAdditional;

  const overageBase = 29;
  const overageIncluded = 1000;
  const overageRate = 0.01;
  const overageCost = overageBase + Math.max(0, overageUsage - overageIncluded) * overageRate;

  const tierDiscountSeats = seatTierSeats;
  let seatTierPrice: number;
  if (tierDiscountSeats <= 5) seatTierPrice = 19;
  else if (tierDiscountSeats <= 20) seatTierPrice = 15;
  else seatTierPrice = 12;
  const seatTierTotal = tierDiscountSeats * seatTierPrice;

  const featureTooltips: Record<string, string> = {
    Projects: "Number of active projects you can run simultaneously.",
    "API access": "RESTful API access for programmatic control.",
    "SSO / SCIM": "Single Sign-On and System for Cross-domain Identity Management.",
    "SLA": "Service Level Agreement guaranteeing uptime.",
  };

  return (
    <div className="mx-auto max-w-7xl space-y-24 px-4 py-12 sm:px-6 lg:px-8">
      {/* Hero */}
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight">Simple, transparent pricing</h1>
        <p className="mt-3 text-muted-foreground dark:text-muted-foreground/70">Choose the plan that fits your needs. No hidden fees. No surprises.</p>
      </div>

      {/* ───── 1. 3-column Standard ───── */}
      <section>
        <SectionHeader title="1. 3-Column Standard" subtitle="Choose your plan" />
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {standardPlans.map((plan) => (
            <div key={plan.name} className={`relative rounded-2xl border p-6 shadow-sm transition-all hover:shadow-lg ${plan.popular ? "border-blue-500 bg-blue-50/70 dark:border-blue-500 dark:bg-blue-950/40 ring-2 ring-blue-500/20" : "border-border bg-white dark:border-border dark:bg-zinc-900"}`}>
              {plan.popular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-4 py-1 text-xs font-semibold text-white">Most Popular</span>}
              <h3 className="text-lg font-bold">{plan.name}</h3>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-sm text-muted-foreground dark:text-muted-foreground/70">{plan.period}</span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{plan.desc}</p>
              <ul className="mt-6 space-y-3">
                {["1 project", "1,000 requests/mo", "Community support", "Basic analytics", "2 team members"].map((f, i) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    {i < plan.features.length && plan.features[i] ? <CheckIcon /> : <DashIcon />}
                    {f}
                  </li>
                ))}
              </ul>
              <button className={`mt-8 w-full rounded-xl py-2.5 text-sm font-semibold transition ${plan.popular ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-foreground text-background hover:bg-muted dark:bg-foreground dark:text-background dark:hover:bg-muted"}`}>{plan.cta}</button>
            </div>
          ))}
        </div>
      </section>

      {/* ───── 2. 4-column Grid ───── */}
      <section>
        <SectionHeader title="2. 4-Column Grid" subtitle="With Starter tier included" />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {fourTierPlans.map((plan) => (
            <div key={plan.name} className={`relative rounded-2xl border p-6 shadow-sm transition-all hover:shadow-lg ${plan.popular ? "border-blue-500 bg-blue-50/70 dark:border-blue-500 dark:bg-blue-950/40 ring-2 ring-blue-500/20" : "border-border bg-white dark:border-border dark:bg-zinc-900"}`}>
              {plan.popular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">Most Popular</span>}
              <h3 className="text-lg font-bold">{plan.name}</h3>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-3xl font-bold">{plan.price}</span>
                <span className="text-sm text-muted-foreground">{plan.period}</span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{plan.desc}</p>
              <ul className="mt-6 space-y-2">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm"><CheckIcon />{f}</li>
                ))}
              </ul>
              <button className={`mt-6 w-full rounded-xl py-2.5 text-sm font-semibold transition ${plan.popular ? "bg-blue-600 text-white hover:bg-blue-700" : "border border-border text-zinc-800 hover:bg-muted dark:border-border dark:text-zinc-200 dark:hover:bg-muted"}`}>{plan.cta}</button>
            </div>
          ))}
        </div>
      </section>

      {/* ───── 3. Annual vs Monthly Toggle ───── */}
      <section>
        <SectionHeader title="3. Annual vs Monthly Toggle" subtitle="Save 20% with annual billing" />
        <div className="mt-8 flex justify-center">
          <div className="inline-flex items-center gap-4 rounded-full border border-border bg-muted p-1.5 dark:border-border dark:bg-muted">
            <button onClick={() => setBilling("monthly")} className={`rounded-full px-5 py-2 text-sm font-medium transition ${billing === "monthly" ? "bg-white text-zinc-900 shadow-sm dark:bg-muted dark:text-white" : "text-muted-foreground hover:text-zinc-800 dark:text-muted-foreground/70"}`}>Monthly</button>
            <button onClick={() => setBilling("annual")} className={`rounded-full px-5 py-2 text-sm font-medium transition ${billing === "annual" ? "bg-white text-zinc-900 shadow-sm dark:bg-muted dark:text-white" : "text-muted-foreground hover:text-zinc-800 dark:text-muted-foreground/70"}`}>
              Annual <span className="ml-1 rounded-full bg-emerald-500 px-2 py-0.5 text-xs font-bold text-white">Save 20%</span>
            </button>
          </div>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {standardPlans.map((plan) => {
            const raw = parseFloat(plan.price.replace("$", ""));
            const adjusted = billing === "annual" ? (raw * 0.8).toFixed(0) : plan.price.replace("$", "");
            return (
              <div key={plan.name} className={`relative rounded-2xl border p-6 shadow-sm transition-all hover:shadow-lg ${plan.popular ? "border-blue-500 bg-blue-50/70 dark:border-blue-500 dark:bg-blue-950/40" : "border-border bg-white dark:border-border dark:bg-zinc-900"}`}>
                {plan.popular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-4 py-1 text-xs font-semibold text-white">Most Popular</span>}
                {billing === "annual" && raw > 0 && <span className="absolute -right-2 -top-2 rounded-full bg-emerald-500 px-2 py-0.5 text-xs font-bold text-white">Save 20%</span>}
                <h3 className="text-lg font-bold">{plan.name}</h3>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-4xl font-bold">${adjusted}</span>
                  <span className="text-sm text-muted-foreground">{billing === "annual" ? "/mo, billed annually" : plan.period}</span>
                </div>
                {billing === "annual" && raw > 0 && <p className="mt-1 text-xs text-emerald-600 dark:text-emerald-400">${(raw * 12).toFixed(0)}/yr — was ${(raw * 12 * 1.25).toFixed(0)}</p>}
                <p className="mt-1 text-sm text-muted-foreground">{plan.desc}</p>
                <ul className="mt-6 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm"><CheckIcon />{f}</li>
                  ))}
                </ul>
                <button className={`mt-8 w-full rounded-xl py-2.5 text-sm font-semibold transition ${plan.popular ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-foreground text-background hover:bg-muted dark:bg-foreground dark:text-background dark:hover:bg-muted"}`}>{plan.cta}</button>
              </div>
            );
          })}
        </div>
      </section>

      {/* ───── 4. Feature Comparison Table ───── */}
      <section>
        <SectionHeader title="4. Feature Comparison Table" subtitle="See exactly what you get" />
        <div className="mt-8 overflow-x-auto rounded-2xl border border-border bg-white shadow-sm dark:border-border dark:bg-zinc-900">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border">
                <th scope="col" className="sticky left-0 bg-white px-6 py-4 font-semibold dark:bg-zinc-900">Feature</th>
                {featureComparisonData.plans.map((p, i) => (
                  <th scope="col" key={p.name} className={`px-6 py-4 font-semibold ${i === 2 ? "bg-blue-50 text-blue-800 dark:bg-blue-950 dark:text-blue-200" : ""}`}>
                    {p.name}
                    {i === 2 && <span className="ml-2 rounded-full bg-blue-600 px-2 py-0.5 text-xs text-white">Best</span>}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {featureComparisonData.features.map((feat, fi) => (
                <tr key={feat} className="border-b border-border last:border-0">
                  <td
                    className="sticky left-0 bg-white px-6 py-4 font-medium dark:bg-zinc-900"
                    onMouseEnter={() => setHoveredFeature(feat)}
                    onMouseLeave={() => setHoveredFeature(null)}
                  >
                    <span className="relative cursor-help underline decoration-dotted underline-offset-2">
                      {feat}
                      {hoveredFeature === feat && featureTooltips[feat] && (
                        <span className="absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-zinc-900 px-3 py-1.5 text-xs text-white shadow-lg dark:bg-foreground dark:text-background">&#8593; {featureTooltips[feat]}</span>
                      )}
                    </span>
                  </td>
                  {featureComparisonData.plans.map((p, pi) => {
                    const val = p.values[fi];
                    return (
                      <td key={p.name} className={`px-6 py-4 ${pi === 2 ? "bg-blue-50/50 dark:bg-blue-950/20" : ""}`}>
                        {typeof val === "boolean" ? val ? <CheckIcon className="h-5 w-5 text-emerald-500" /> : <CrossIcon className="h-5 w-5" /> : <span className="font-medium">{val}</span>}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ───── 5. Per-seat Pricing ───── */}
      <section>
        <SectionHeader title="5. Per-seat Pricing" subtitle={`$${seatPrice}/user/month — ${seatCount} user${seatCount > 1 ? "s" : ""}`} />
        <div className="mx-auto mt-8 max-w-md rounded-2xl border bg-white p-8 shadow-sm dark:border-border dark:bg-zinc-900">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Number of users</span>
            <span className="rounded-full bg-blue-100 px-3 py-1 text-lg font-bold text-blue-700 dark:bg-blue-900 dark:text-blue-200">{seatCount}</span>
          </div>
          <input type="range" min={1} max={100} value={seatCount} onChange={(e) => setSeatCount(Number(e.target.value))} className="mt-4 w-full accent-blue-600" />
          <div className="mt-6 flex items-center justify-between border-t border-border pt-4 dark:border-border">
            <span className="text-sm text-muted-foreground">Total</span>
            <span className="text-3xl font-bold">${seatTotal.toFixed(0)}<span className="text-base font-normal text-muted-foreground">/mo</span></span>
          </div>
          <p className="mt-1 text-right text-xs text-muted-foreground/70">${seatPrice}/user × {seatCount} user{seatCount > 1 ? "s" : ""}</p>
          <button className="mt-6 w-full rounded-xl bg-zinc-900 py-2.5 text-sm font-semibold text-white transition hover:bg-muted dark:bg-foreground dark:text-background">Get Started</button>
        </div>
      </section>

      {/* ───── 6. Usage-based Pricing ───── */}
      <section>
        <SectionHeader title="6. Usage-based Pricing" subtitle="Pay as you grow" />
        <div className="mx-auto mt-8 max-w-md rounded-2xl border bg-white p-8 shadow-sm dark:border-border dark:bg-zinc-900">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Monthly requests</span>
            <span className="rounded-full bg-violet-100 px-3 py-1 text-sm font-bold text-violet-700 dark:bg-violet-900 dark:text-violet-200">{usageLabels[usageSlider]}</span>
          </div>
          <input type="range" min={0} max={3} value={usageSlider} onChange={(e) => setUsageSlider(Number(e.target.value))} className="mt-4 w-full accent-violet-600" />
          <div className="mt-2 flex justify-between text-xs text-muted-foreground/70">
            <span>100K</span><span>500K</span><span>1M</span><span>5M</span>
          </div>
          <div className="mt-6 flex items-center justify-between border-t border-border pt-4 dark:border-border">
            <span className="text-sm text-muted-foreground">Total</span>
            <span className="text-3xl font-bold">${usagePrice}<span className="text-base font-normal text-muted-foreground">/mo</span></span>
          </div>
          <button className="mt-6 w-full rounded-xl bg-violet-600 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700">Get Started</button>
        </div>
      </section>

      {/* ───── 7. Free + Paid Add-ons ───── */}
      <section>
        <SectionHeader title="7. Free + Paid Add-ons" subtitle="Start free, add what you need" />
        <div className="mx-auto mt-8 max-w-md rounded-2xl border bg-white p-8 shadow-sm dark:border-border dark:bg-zinc-900">
          <div className="text-center">
            <h3 className="text-lg font-bold">Free Plan</h3>
            <div className="mt-2 flex items-baseline justify-center gap-1">
              <span className="text-4xl font-bold">$0</span>
              <span className="text-sm text-muted-foreground">/mo</span>
            </div>
          </div>
          <div className="mt-6 space-y-3">
            {[
              { label: "Extra Storage (5 GB)", key: "storage", price: 5, state: addonStorage, set: setAddonStorage },
              { label: "Priority Support", key: "support", price: 10, state: addonSupport, set: setAddonSupport },
              { label: "Custom Domain", key: "domain", price: 3, state: addonDomain, set: setAddonDomain },
            ].map((a) => (
              <label key={a.key} className="flex cursor-pointer items-center justify-between rounded-lg border border-border p-3 transition hover:bg-muted/40 dark:border-border dark:hover:bg-muted">
                <div className="flex items-center gap-3">
                  <input type="checkbox" checked={a.state} onChange={() => a.set(!a.state)} className="h-4 w-4 accent-blue-600" />
                  <span className="text-sm font-medium">{a.label}</span>
                </div>
                <span className="text-sm font-semibold text-muted-foreground">${a.price}/mo</span>
              </label>
            ))}
          </div>
          <div className="mt-6 flex items-center justify-between border-t border-border pt-4 dark:border-border">
            <span className="text-sm text-muted-foreground">Monthly total</span>
            <span className="text-2xl font-bold">${addonTotal}<span className="text-sm font-normal text-muted-foreground">/mo</span></span>
          </div>
          <button className="mt-6 w-full rounded-xl bg-zinc-900 py-2.5 text-sm font-semibold text-white transition hover:bg-muted dark:bg-foreground dark:text-background">Get Started Free</button>
        </div>
      </section>

      {/* ───── 8. Flat Rate ───── */}
      <section>
        <SectionHeader title="8. Flat Rate" subtitle="One plan. Everything included." />
        <div className="mx-auto mt-8 max-w-sm">
          <div className="relative rounded-2xl border-2 border-amber-400 bg-white p-8 shadow-lg dark:bg-zinc-900">
            <span className="absolute -right-3 -top-3 rounded-full bg-amber-400 px-3 py-1 text-xs font-bold text-zinc-900">All-inclusive</span>
            <h3 className="text-lg font-bold">Unlimited Plan</h3>
            <div className="mt-3 flex items-baseline gap-1">
              <span className="text-5xl font-bold">$29</span>
              <span className="text-sm text-muted-foreground">/mo</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">All features, no limits, no hidden fees.</p>
            <ul className="mt-6 space-y-3">
              {["Unlimited projects", "Unlimited requests", "Unlimited team members", "Priority support", "Advanced analytics", "Custom domains", "API access", "SSO & SCIM", "SLA guarantee", "24/7 support"].map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm"><CheckIcon className="h-4 w-4 text-amber-500" />{f}</li>
              ))}
            </ul>
            <button className="mt-8 w-full rounded-xl bg-amber-500 py-3 text-sm font-bold text-zinc-900 transition hover:bg-amber-400">Get Started</button>
          </div>
        </div>
      </section>

      {/* ───── 9. Two-sided ───── */}
      <section>
        <SectionHeader title="9. Two-sided: Free vs Premium" subtitle="Compare side by side" />
        <div className="mt-8 grid gap-0 overflow-hidden rounded-2xl border shadow-sm md:grid-cols-2">
          <div className="bg-white p-8 dark:bg-zinc-900">
            <h3 className="text-2xl font-bold">Free</h3>
            <div className="mt-3 flex items-baseline gap-1">
              <span className="text-5xl font-bold">$0</span>
              <span className="text-sm text-muted-foreground">forever</span>
            </div>
            <ul className="mt-6 space-y-3">
              {["1 project", "1,000 requests/mo", "Community support", "Basic analytics", "2 team members"].map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm"><CheckIcon />{f}</li>
              ))}
            </ul>
            <button className="mt-8 w-full rounded-xl border border-border py-3 text-sm font-semibold transition hover:bg-muted/40 dark:border-border dark:hover:bg-muted">Get Started Free</button>
          </div>
          <div className="bg-blue-600 p-8 text-white">
            <h3 className="text-2xl font-bold">Premium</h3>
            <div className="mt-3 flex items-baseline gap-1">
              <span className="text-5xl font-bold">$19</span>
              <span className="text-sm text-blue-200">/mo</span>
            </div>
            <ul className="mt-6 space-y-3">
              {["Unlimited projects", "100,000 requests/mo", "Priority support", "Advanced analytics", "Unlimited team members", "Custom domains", "API access"].map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm"><CheckIcon className="h-4 w-4 text-blue-200" />{f}</li>
              ))}
            </ul>
            <button className="mt-8 w-full rounded-xl bg-white py-3 text-sm font-bold text-blue-600 transition hover:bg-blue-50">Start Premium Free Trial</button>
          </div>
        </div>
      </section>

      {/* ───── 10. Tiered Feature Reveal ───── */}
      <section>
        <SectionHeader title="10. Tiered Feature Reveal" subtitle="Hover locked features to learn more" />
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            { name: "Basic", price: "$0", features: ["1 project", "1,000 requests", "Community support", "Basic analytics"], locked: [] },
            { name: "Pro", price: "$29", features: ["Unlimited projects", "100K requests", "Priority support", "Advanced analytics", "Custom domains", "API access"], locked: [] },
            { name: "Enterprise", price: "$99", features: ["Unlimited projects", "Unlimited requests", "Priority support", "Advanced analytics", "Custom domains", "API access", "SSO & SCIM", "Dedicated manager"], locked: [] },
          ].map((plan, pi) => (
            <div key={plan.name} className="relative rounded-2xl border border-border bg-background p-6 shadow-card">
              <h3 className="text-lg font-bold">{plan.name}</h3>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-sm text-muted-foreground">/mo</span>
              </div>
              <ul className="mt-6 space-y-3">
                {["1 project", "1,000 requests", "Community support", "Basic analytics", "Custom domains", "API access", "SSO & SCIM", "Dedicated manager"].map((f, fi) => {
                  const owned = plan.features.includes(f);
                  return (
                    <li key={f} className={`group relative flex items-center gap-2 text-sm ${owned ? "" : "opacity-30"}`}>
                      {owned ? <CheckIcon /> : <CrossIcon />}
                      {f}
                      {!owned && (
                        <span className="invisible absolute -top-8 left-0 z-10 whitespace-nowrap rounded bg-zinc-800 px-2 py-1 text-xs text-white opacity-0 transition group-hover:visible group-hover:opacity-100 dark:bg-muted dark:text-zinc-900">Upgrade to unlock</span>
                      )}
                    </li>
                  );
                })}
              </ul>
              <button className="mt-8 w-full rounded-xl bg-zinc-900 py-2.5 text-sm font-semibold text-white transition hover:bg-muted dark:bg-foreground dark:text-background">{pi === 2 ? "Contact Sales" : "Get Started"}</button>
            </div>
          ))}
        </div>
      </section>

      {/* ───── 11. Enterprise Custom ───── */}
      <section>
        <SectionHeader title="11. Enterprise Custom" subtitle="Need something bespoke?" />
        <div className="mx-auto mt-8 max-w-md rounded-2xl border-2 border-dashed border-border bg-white p-8 text-center shadow-sm dark:border-border dark:bg-zinc-900">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
            <svg className="h-7 w-7 text-blue-600 dark:text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
          </div>
          <h3 className="mt-4 text-xl font-bold">Enterprise Plan</h3>
          <p className="mt-2 text-sm text-muted-foreground">Custom pricing tailored to your organization&apos;s needs. Volume discounts available.</p>
          <div className="mt-6 flex justify-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
              sales@company.com
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
              +1 (555) 000-0000
            </div>
          </div>
          <button className="mt-6 w-full rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">Contact Sales</button>
        </div>
      </section>

      {/* ───── 12. Team Pricing ───── */}
      <section>
        <SectionHeader title="12. Team Pricing" subtitle={`Base $29 + $9/additional member`} />
        <div className="mx-auto mt-8 max-w-md rounded-2xl border bg-white p-8 shadow-sm dark:border-border dark:bg-zinc-900">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Team members</span>
            <div className="flex items-center gap-3">
              <button onClick={() => setTeamBase(Math.max(1, teamBase - 1))} className="flex h-8 w-8 items-center justify-center rounded-full border text-lg font-bold transition hover:bg-muted dark:border-border dark:hover:bg-muted">−</button>
              <span className="min-w-[2ch] text-center text-xl font-bold">{teamBase}</span>
              <button onClick={() => setTeamBase(teamBase + 1)} className="flex h-8 w-8 items-center justify-center rounded-full border text-lg font-bold transition hover:bg-muted dark:border-border dark:hover:bg-muted">+</button>
            </div>
          </div>
          <div className="mt-4 space-y-2 text-sm text-muted-foreground">
            <div className="flex justify-between"><span>Base plan (1 member)</span><span>$29/mo</span></div>
            {teamBase > 1 && <div className="flex justify-between"><span>{teamBase - 1} additional member{(teamBase - 1) > 1 ? "s" : ""}</span><span>+${(teamBase - 1) * teamPerAdditional}/mo</span></div>}
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-border pt-4 dark:border-border">
            <span className="text-sm font-medium">Total</span>
            <span className="text-3xl font-bold">${teamTotal}<span className="text-base font-normal text-muted-foreground">/mo</span></span>
          </div>
          <button className="mt-6 w-full rounded-xl bg-zinc-900 py-2.5 text-sm font-semibold text-white transition hover:bg-muted dark:bg-foreground dark:text-background">Start Team Plan</button>
        </div>
      </section>

      {/* ───── 13. Lifetime Deal ───── */}
      <section>
        <SectionHeader title="13. Lifetime Deal" subtitle="Pay once, own forever" />
        <div className="mx-auto mt-8 max-w-sm">
          <div className="relative overflow-hidden rounded-2xl border-2 border-rose-400 bg-white p-8 shadow-lg dark:bg-zinc-900">
            <span className="absolute -right-8 top-4 rotate-45 bg-rose-500 px-10 py-1 text-xs font-bold text-white">Limited Time</span>
            <h3 className="text-lg font-bold">Lifetime Pro</h3>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-3xl font-bold text-zinc-300 line-through dark:text-muted-foreground">$999</span>
              <span className="text-5xl font-bold text-rose-500">$499</span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">One-time payment. No recurring fees.</p>
            <ul className="mt-6 space-y-3">
              {["Unlimited projects", "Unlimited requests", "Priority support", "All future updates", "Lifetime access"].map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm"><CheckIcon className="h-4 w-4 text-rose-500" />{f}</li>
              ))}
            </ul>
            <button className="mt-8 w-full rounded-xl bg-rose-500 py-3 text-sm font-bold text-white transition hover:bg-rose-600">Get Lifetime Access</button>
          </div>
        </div>
      </section>

      {/* ───── 14. Money-back Guarantee ───── */}
      <section>
        <SectionHeader title="14. Money-back Guarantee" subtitle="Risk-free commitment" />
        <div className="mx-auto mt-8 flex max-w-sm items-center gap-4 rounded-2xl border-2 border-emerald-400 bg-emerald-50 p-6 dark:border-emerald-600 dark:bg-emerald-950">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900">
            <ShieldIcon />
          </div>
          <div>
            <h3 className="text-lg font-bold text-emerald-800 dark:text-emerald-200">30-Day Money-Back Guarantee</h3>
            <p className="mt-1 text-sm text-emerald-600 dark:text-emerald-400">Not satisfied? Get a full refund within 30 days. No questions asked.</p>
          </div>
        </div>
      </section>

      {/* ───── 15. Free Trial ───── */}
      <section>
        <SectionHeader title="15. Free Trial" subtitle="No credit card required" />
        <div className="mx-auto mt-8 max-w-sm rounded-2xl border-2 border-blue-400 bg-gradient-to-br from-blue-50 to-white p-8 text-center shadow-sm dark:border-blue-600 dark:from-blue-950 dark:to-zinc-900">
          <SparklesIcon />
          <h3 className="mt-3 text-xl font-bold">Start Your 14-Day Free Trial</h3>
          <p className="mt-2 text-sm text-muted-foreground">Full access. No commitment. Cancel anytime.</p>
          <div className="mt-3 inline-block rounded-full bg-blue-100 px-4 py-1 text-sm font-bold text-blue-700 dark:bg-blue-900 dark:text-blue-200">14 days free</div>
          <button className="mt-6 w-full rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">Start Free Trial</button>
          <p className="mt-2 text-xs text-muted-foreground/70">No credit card required</p>
        </div>
      </section>

      {/* ───── 16. Open Source ───── */}
      <section>
        <SectionHeader title="16. Open Source" subtitle="Built for the community" />
        <div className="mx-auto mt-8 max-w-sm rounded-2xl border-2 border-pink-400 bg-gradient-to-br from-pink-50 to-white p-8 text-center shadow-sm dark:border-pink-600 dark:from-pink-950 dark:to-zinc-900">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-pink-100 dark:bg-pink-900"><HeartIcon /></div>
          <h3 className="mt-3 text-xl font-bold">Free for Open Source</h3>
          <p className="mt-2 text-sm text-muted-foreground">If your project is open source, you get the Pro plan for free. Forever.</p>
          <button className="mt-6 w-full rounded-xl border-2 border-pink-400 bg-white py-3 text-sm font-bold text-pink-600 transition hover:bg-pink-50 dark:border-pink-600 dark:bg-zinc-900 dark:text-pink-300">Apply for Open Source</button>
        </div>
      </section>

      {/* ───── 17. Nonprofit Discount ───── */}
      <section>
        <SectionHeader title="17. Nonprofit Discount" subtitle="Supporting good causes" />
        <div className="mx-auto mt-8 max-w-sm rounded-2xl border-2 border-teal-400 bg-gradient-to-br from-teal-50 to-white p-8 text-center shadow-sm dark:border-teal-600 dark:from-teal-950 dark:to-zinc-900">
          <svg className="mx-auto h-8 w-8 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
          </svg>
          <h3 className="mt-3 text-xl font-bold">50% Off for Nonprofits</h3>
          <p className="mt-2 text-sm text-muted-foreground">Verified nonprofit organizations receive 50% off all paid plans.</p>
          <p className="mt-1 text-sm font-semibold text-teal-600 dark:text-teal-400">Pro was $29 → now $14.50/mo</p>
          <button className="mt-6 w-full rounded-xl bg-teal-500 py-3 text-sm font-bold text-white transition hover:bg-teal-600">Verify Nonprofit</button>
        </div>
      </section>

      {/* ───── 18. Student Plan ───── */}
      <section>
        <SectionHeader title="18. Student Plan" subtitle="Learn without limits" />
        <div className="mx-auto mt-8 max-w-sm rounded-2xl border-2 border-indigo-400 bg-gradient-to-br from-indigo-50 to-white p-8 text-center shadow-sm dark:border-indigo-600 dark:from-indigo-950 dark:to-zinc-900">
          <GraduationIcon />
          <h3 className="mt-3 text-xl font-bold">Free for Students</h3>
          <p className="mt-2 text-sm text-muted-foreground">Full Pro plan access with a valid .edu email address.</p>
          <div className="mt-3 inline-flex items-center gap-2 rounded-lg border border-indigo-200 bg-white px-4 py-2 text-sm dark:border-indigo-800 dark:bg-muted">
            <span className="text-muted-foreground/70">you@</span><span className="font-bold text-indigo-600 dark:text-indigo-300">.edu</span>
          </div>
          <button className="mt-6 w-full rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700">Verify Student Email</button>
        </div>
      </section>

      {/* ───── 19. Multi-currency ───── */}
      <section>
        <SectionHeader title="19. Multi-currency" subtitle="Pay in your local currency" />
        <div className="mt-8 flex justify-center">
          <div className="inline-flex rounded-full border border-border bg-muted p-1 dark:border-border dark:bg-muted">
            {(["USD", "EUR", "GBP"] as const).map((c) => (
              <button key={c} onClick={() => setCurrency(c)} className={`rounded-full px-5 py-2 text-sm font-medium transition ${currency === c ? "bg-white text-zinc-900 shadow-sm dark:bg-muted dark:text-white" : "text-muted-foreground hover:text-zinc-800"}`}>{c}</button>
            ))}
          </div>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {standardPlans.map((plan) => {
            const raw = parseFloat(plan.price.replace("$", ""));
            return (
              <div key={plan.name} className={`rounded-2xl border bg-white p-6 shadow-sm dark:border-border dark:bg-zinc-900 ${plan.popular ? "ring-2 ring-blue-500" : ""}`}>
                <h3 className="text-lg font-bold">{plan.name}</h3>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-4xl font-bold">{currency === "USD" ? "$" : currency === "EUR" ? "\u20AC" : "\u00A3"}{convert(raw)}</span>
                  <span className="text-sm text-muted-foreground">/{currency.toLowerCase()}/mo</span>
                </div>
                <ul className="mt-6 space-y-3">
                  {plan.features.slice(0, 4).map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm"><CheckIcon />{f}</li>
                  ))}
                </ul>
                <button className={`mt-8 w-full rounded-xl py-2.5 text-sm font-semibold transition ${plan.popular ? "bg-blue-600 text-white hover:bg-blue-700" : "border border-border text-zinc-800 hover:bg-muted/40 dark:border-border dark:text-zinc-200"}`}>{plan.cta}</button>
              </div>
            );
          })}
        </div>
      </section>

      {/* ───── 20. FAQ ───── */}
      <section>
        <SectionHeader title="20. FAQ" subtitle="Got questions? We've got answers." />
        <div className="mx-auto mt-8 max-w-2xl space-y-2">
          {[
            { q: "Can I change my plan later?", a: "Yes, you can upgrade or downgrade at any time. Changes take effect immediately." },
            { q: "What happens when I exceed my request limit?", a: "We'll notify you. You can upgrade your plan or purchase additional credits." },
            { q: "Is there a refund policy?", a: "Absolutely. We offer a 30-day money-back guarantee on all paid plans." },
            { q: "Can I cancel anytime?", a: "Yes, you can cancel your subscription at any time. You'll retain access until the end of your billing period." },
          ].map((faq, i) => (
            <div key={i} className="rounded-xl border border-border bg-white dark:border-border dark:bg-zinc-900">
              <button onClick={() => setFaqOpen(faqOpen === i ? null : i)} className="flex w-full items-center justify-between px-6 py-4 text-left text-sm font-medium">
                {faq.q}
                <svg className={`h-4 w-4 transition ${faqOpen === i ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
              </button>
              {faqOpen === i && <div className="border-t border-border px-6 py-4 text-sm text-muted-foreground dark:border-border">{faq.a}</div>}
            </div>
          ))}
        </div>
      </section>

      {/* ───── 21. Testimonial Row ───── */}
      <section>
        <SectionHeader title="21. Testimonial Row" subtitle="Trusted by thousands" />
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            { text: "Switching to Pro was the best decision for our team. The priority support alone is worth it.", name: "Sarah Chen", role: "CTO, TechStart" },
            { text: "We've been using the Free plan for a year, and it's been great. When we needed more, upgrading was seamless.", name: "Marcus Johnson", role: "Founder, BuildCo" },
            { text: "Enterprise support is incredible. Our dedicated account manager responds within minutes.", name: "Emily Park", role: "VP Eng, DataFlow" },
          ].map((t, i) => (
            <div key={i} className="rounded-2xl border bg-white p-6 shadow-sm dark:border-border dark:bg-zinc-900">
              <div className="flex gap-1 text-amber-400">
                {[...Array(5)].map((_, s) => <span key={s}>&#9733;</span>)}
              </div>
              <p className="mt-3 text-sm italic text-muted-foreground">&ldquo;{t.text}&rdquo;</p>
              <div className="mt-4 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700 dark:bg-blue-900 dark:text-blue-200">{t.name.charAt(0)}</div>
                <div>
                  <p className="text-sm font-medium">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ───── 22. Trust Badges ───── */}
      <section>
        <SectionHeader title="22. Trust Badges" subtitle="Security and reliability you can count on" />
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {["PCI Compliant", "SOC 2 Type II", "99.9% Uptime SLA", "GDPR Compliant", "HIPAA Eligible", "ISO 27001"].map((badge) => (
            <div key={badge} className="flex items-center gap-2 rounded-full border border-border bg-white px-5 py-2 text-sm font-medium shadow-sm dark:border-border dark:bg-zinc-900">
              <svg className="h-4 w-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
              {badge}
            </div>
          ))}
        </div>
      </section>

      {/* ───── 23. Feature Hover Cards ───── */}
      <section>
        <SectionHeader title="23. Feature Hover Cards" subtitle="Hover any feature for details" />
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {[
            { name: "Unlimited Projects", desc: "Create as many projects as you need with no cap on active or archived projects." },
            { name: "Priority Support", desc: "Get responses within 1 hour during business hours. Dedicated Slack channel available." },
            { name: "Advanced Analytics", desc: "Detailed dashboards with custom reports, user behavior tracking, and exportable data." },
            { name: "SSO & SCIM", desc: "Single Sign-On via SAML/OIDC and automated user provisioning with SCIM." },
          ].map((f) => (
            <div key={f.name} className="group relative">
              <div className="cursor-pointer rounded-xl border border-border bg-white px-6 py-4 text-sm font-medium shadow-sm transition hover:shadow-md dark:border-border dark:bg-zinc-900">{f.name}</div>
              <div className="invisible absolute bottom-full left-1/2 z-10 mb-3 w-64 -translate-x-1/2 rounded-xl border bg-white p-4 text-left shadow-lg opacity-0 transition group-hover:visible group-hover:opacity-100 dark:border-border dark:bg-zinc-900">
                <p className="text-sm font-semibold">{f.name}</p>
                <p className="mt-1 text-xs text-muted-foreground">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ───── 24. Plan Comparison Radar Chart ───── */}
      <section>
        <SectionHeader title="24. Plan Comparison Radar Chart" subtitle="Visual feature comparison across 5 metrics" />
        <div className="mt-8 flex flex-wrap justify-center gap-8">
          {[
            { name: "Free", color: "fill-zinc-400/30 stroke-zinc-400", values: [20, 10, 20, 10, 15] },
            { name: "Pro", color: "fill-blue-400/30 stroke-blue-500", values: [80, 70, 80, 70, 90] },
            { name: "Enterprise", color: "fill-violet-400/30 stroke-violet-500", values: [100, 95, 100, 100, 100] },
          ].map((plan) => (
            <div key={plan.name} className="text-center">
              <svg viewBox="0 0 120 120" className="h-32 w-32">
                <polygon points="60,5 107,32 107,88 60,115 13,88 13,32" className="fill-zinc-100 stroke-zinc-200 dark:fill-zinc-800 dark:stroke-zinc-700" />
                <polygon points="60,5 107,32 107,88 60,115 13,88 13,32" className={`${plan.color} opacity-60`} />
                <polygon
                  points={`60,${5 + (100 - plan.values[0]) * 1.1} ${60 + plan.values[1] * 0.47},${32 + (100 - plan.values[1]) * 0.83} ${60 + plan.values[2] * 0.47},${88 - (100 - plan.values[2]) * 0.83} ${60},${115 - (100 - plan.values[3]) * 1.1} ${60 - plan.values[4] * 0.47},${88 - (100 - plan.values[4]) * 0.83}`}
                  className={`${plan.color} fill-opacity-40 stroke-2`}
                />
                <text x="60" y="3" textAnchor="middle" className="fill-zinc-400 text-[5px]">Features</text>
                <text x="60" y="119" textAnchor="middle" className="fill-zinc-400 text-[5px]">Support</text>
                <text x="118" y="60" textAnchor="end" className="fill-zinc-400 text-[5px]">Scale</text>
                <text x="2" y="60" textAnchor="start" className="fill-zinc-400 text-[5px]">Price</text>
                <text x="60" y="60" textAnchor="middle" className="fill-zinc-400 text-[5px]">Speed</text>
                {plan.values.map((v, i) => {
                  const pts = [
                    [60, 5 + (100 - v) * 1.1],
                    [60 + v * 0.47, 32 + (100 - v) * 0.83],
                    [60 + v * 0.47, 88 - (100 - v) * 0.83],
                    [60, 115 - (100 - v) * 1.1],
                    [60 - v * 0.47, 88 - (100 - v) * 0.83],
                  ];
                  const d = pts.map((p, j) => `${j === 0 ? "M" : "L"}${p[0]},${p[1]}`).join(" ") + "Z";
                  return <polygon key={i} points={pts.map(p => `${p[0]},${p[1]}`).join(" ")} className={plan.color} />;
                })}
              </svg>
              <p className="mt-1 text-xs font-medium">{plan.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ───── 25. Pricing with Add-ons Grid ───── */}
      <section>
        <SectionHeader title="25. Pricing with Add-ons Grid" subtitle="Optional add-ons" />
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border bg-white p-6 shadow-sm dark:border-border dark:bg-zinc-900">
            <h3 className="text-lg font-bold">Base Plan</h3>
            <p className="text-3xl font-bold">$0 <span className="text-sm font-normal text-muted-foreground">/mo</span></p>
            <ul className="mt-4 space-y-2 text-sm">
              {["1 project", "1,000 requests"].map((f) => <li key={f} className="flex items-center gap-2"><CheckIcon />{f}</li>)}
            </ul>
          </div>
          {[
            { name: "Extra Storage", price: "$5", desc: "5 GB additional storage" },
            { name: "Priority Support", price: "$10", desc: "1-hour response time" },
            { name: "Custom Domain", price: "$3", desc: "Use your own domain" },
            { name: "Team Seats (×5)", price: "$25", desc: "Add 5 team members" },
            { name: "API Access", price: "$15", desc: "Full REST API access" },
          ].map((a) => (
            <label key={a.name} className="flex cursor-pointer items-center justify-between rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-md dark:border-border dark:bg-zinc-900">
              <div>
                <p className="text-sm font-medium">{a.name}</p>
                <p className="text-xs text-muted-foreground">{a.desc}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold">{a.price}<span className="font-normal text-muted-foreground">/mo</span></p>
                <input type="checkbox" className="mt-1 accent-blue-600" />
              </div>
            </label>
          ))}
        </div>
      </section>

      {/* ───── 26. Annual Discount Badge ───── */}
      <section>
        <SectionHeader title="26. Annual Discount Badge" subtitle="2 months free with annual billing" />
        <div className="mt-8 flex justify-center">
          <div className="inline-flex items-center gap-4 rounded-full border border-border bg-muted p-1.5 dark:border-border dark:bg-muted">
            <button onClick={() => setBilling("monthly")} className={`rounded-full px-5 py-2 text-sm font-medium transition ${billing === "monthly" ? "bg-white text-zinc-900 shadow-sm dark:bg-muted dark:text-white" : "text-muted-foreground"}`}>Monthly</button>
            <button onClick={() => setBilling("annual")} className={`relative rounded-full px-5 py-2 text-sm font-medium transition ${billing === "annual" ? "bg-white text-zinc-900 shadow-sm dark:bg-muted dark:text-white" : "text-muted-foreground"}`}>
              Annual
              {billing === "annual" && <span className="absolute -right-10 -top-3 whitespace-nowrap rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-bold text-white">2 months free</span>}
            </button>
          </div>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {standardPlans.map((plan) => {
            const raw = parseFloat(plan.price.replace("$", ""));
            const monthly = raw;
            const annual = (raw * 12 * 0.8).toFixed(0);
            return (
              <div key={plan.name} className={`relative rounded-2xl border p-6 shadow-sm transition hover:shadow-lg ${plan.popular ? "border-blue-500 bg-blue-50/70 dark:border-blue-500 dark:bg-blue-950/40" : "border-border bg-white dark:border-border dark:bg-zinc-900"}`}>
                {plan.popular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-4 py-1 text-xs font-semibold text-white">Most Popular</span>}
                <h3 className="text-lg font-bold">{plan.name}</h3>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-4xl font-bold">{billing === "annual" && raw > 0 ? `$${(raw * 0.8).toFixed(0)}` : plan.price}</span>
                  <span className="text-sm text-muted-foreground">{billing === "annual" ? "/mo" : plan.period}</span>
                </div>
                {billing === "annual" && raw > 0 && <p className="mt-1 text-xs text-emerald-600 dark:text-emerald-400">${annual}/yr — Save ${(monthly * 12 - Number(annual)).toFixed(0)}</p>}
                <ul className="mt-6 space-y-3">
                  {plan.features.slice(0, 4).map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm"><CheckIcon />{f}</li>
                  ))}
                </ul>
                <button className={`mt-8 w-full rounded-xl py-2.5 text-sm font-semibold transition ${plan.popular ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-foreground text-background hover:bg-muted dark:bg-foreground dark:text-background"}`}>Choose Plan</button>
              </div>
            );
          })}
        </div>
      </section>

      {/* ───── 27. Seat-based with Team Discount ───── */}
      <section>
        <SectionHeader title="27. Seat-based with Team Discount" subtitle={`${tierDiscountSeats} seats × $${seatTierPrice}/seat = $${seatTierTotal}/mo`} />
        <div className="mx-auto mt-8 max-w-md rounded-2xl border bg-white p-8 shadow-sm dark:border-border dark:bg-zinc-900">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Seats</span>
            <span className="rounded-full bg-indigo-100 px-3 py-1 text-lg font-bold text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200">{tierDiscountSeats}</span>
          </div>
          <input type="range" min={1} max={50} value={tierDiscountSeats} onChange={(e) => setSeatTierSeats(Number(e.target.value))} className="mt-4 w-full accent-indigo-600" />
          <div className="mt-3 space-y-1 text-xs text-muted-foreground">
            <div className="flex justify-between"><span>1–5 seats</span><span>$19/seat</span></div>
            <div className="flex justify-between"><span>6–20 seats</span><span>$15/seat</span></div>
            <div className="flex justify-between"><span>21+ seats</span><span>$12/seat</span></div>
          </div>
          <div className="mt-4 rounded-lg bg-indigo-50 p-3 text-center text-sm dark:bg-indigo-950">
            <span className="font-semibold text-indigo-700 dark:text-indigo-200">Current tier: </span>
            {tierDiscountSeats <= 5 ? "$19/seat" : tierDiscountSeats <= 20 ? "$15/seat" : "$12/seat"}
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-border pt-4 dark:border-border">
            <span className="text-sm font-medium">Total</span>
            <span className="text-3xl font-bold">${seatTierTotal}<span className="text-base font-normal text-muted-foreground">/mo</span></span>
          </div>
          <button className="mt-6 w-full rounded-xl bg-indigo-600 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700">Get Started</button>
        </div>
      </section>

      {/* ───── 28. Hybrid Pricing ───── */}
      <section>
        <SectionHeader title="28. Hybrid Pricing" subtitle={`$${overageBase}/mo includes ${overageIncluded.toLocaleString()} API calls + $0.01 per extra call`} />
        <div className="mx-auto mt-8 max-w-md rounded-2xl border bg-white p-8 shadow-sm dark:border-border dark:bg-zinc-900">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">API calls / mo</span>
            <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-bold text-amber-700 dark:bg-amber-900 dark:text-amber-200">{overageUsage.toLocaleString()}</span>
          </div>
          <input type="range" min={0} max={100000} step={100} value={overageUsage} onChange={(e) => setOverageUsage(Number(e.target.value))} className="mt-4 w-full accent-amber-600" />
          <div className="mt-3 flex justify-between text-xs text-muted-foreground/70"><span>0</span><span>50K</span><span>100K</span></div>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between"><span>Base price</span><span>${overageBase}.00</span></div>
            <div className="flex justify-between"><span>Included calls</span><span>{overageIncluded.toLocaleString()}</span></div>
            {overageUsage > overageIncluded && <div className="flex justify-between text-amber-600 dark:text-amber-400"><span>Overage ({(overageUsage - overageIncluded).toLocaleString()} × $0.01)</span><span>+${((overageUsage - overageIncluded) * 0.01).toFixed(2)}</span></div>}
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-border pt-4 dark:border-border">
            <span className="text-sm font-medium">Total</span>
            <span className="text-3xl font-bold">${overageCost.toFixed(2)}<span className="text-base font-normal text-muted-foreground">/mo</span></span>
          </div>
          <button className="mt-6 w-full rounded-xl bg-amber-500 py-2.5 text-sm font-bold text-zinc-900 transition hover:bg-amber-400">Choose Plan</button>
        </div>
      </section>

      {/* ───── 29. Grandfathered Pricing ───── */}
      <section>
        <SectionHeader title="29. Grandfathered Pricing" subtitle="Lock in this price forever" />
        <div className="mx-auto mt-8 max-w-sm">
          <div className="relative overflow-hidden rounded-2xl border-2 border-purple-400 bg-gradient-to-br from-purple-50 to-white p-8 shadow-lg dark:border-purple-600 dark:from-purple-950 dark:to-zinc-900">
            <span className="absolute -right-12 top-6 rotate-45 bg-purple-500 px-12 py-1 text-xs font-bold text-white">Limited Early Adopters</span>
            <h3 className="text-lg font-bold">Founder&apos;s Plan</h3>
            <div className="mt-3 flex items-baseline gap-1">
              <span className="text-5xl font-bold">$14</span>
              <span className="text-sm text-muted-foreground">/mo</span>
            </div>
            <p className="mt-2 text-sm font-semibold text-purple-600 dark:text-purple-400">Lock in this price forever</p>
            <p className="mt-1 text-xs text-muted-foreground">Future price increases won&apos;t affect you. This rate is yours for life.</p>
            <ul className="mt-6 space-y-3">
              {["Unlimited projects", "100,000 requests/mo", "Priority support", "Advanced analytics", "Unlimited team members"].map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm"><CheckIcon className="h-4 w-4 text-purple-500" />{f}</li>
              ))}
            </ul>
            <button className="mt-8 w-full rounded-xl bg-purple-600 py-3 text-sm font-bold text-white transition hover:bg-purple-700">Lock In This Price</button>
          </div>
        </div>
      </section>

      {/* ───── 30. Price Anchoring ───── */}
      <section>
        <SectionHeader title="30. Price Anchoring" subtitle="See the best value first" />
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            { name: "Enterprise", price: "$199", period: "/mo", features: ["Everything included", "Unlimited requests", "24/7 dedicated support", "Custom integrations", "SLA guarantee", "SSO & SCIM", "Dedicated manager"], cta: "Contact Sales", popular: false, anchor: true },
            { name: "Pro", price: "$29", period: "/mo", features: ["Unlimited projects", "100,000 requests/mo", "Priority support", "Advanced analytics", "Unlimited team members", "Custom domains"], cta: "Start Free Trial", popular: true },
            { name: "Starter", price: "$9", period: "/mo", features: ["3 projects", "10,000 requests/mo", "Community support", "Basic analytics", "10 team members"], cta: "Get Started", popular: false },
          ].map((plan) => (
            <div key={plan.name} className={`relative rounded-2xl border p-6 shadow-sm transition-all hover:shadow-lg ${plan.popular ? "border-blue-500 bg-blue-50/70 dark:border-blue-500 dark:bg-blue-950/40 ring-2 ring-blue-500/20 order-first" : plan.anchor ? "border-border bg-white opacity-70 dark:border-border dark:bg-zinc-900" : "border-border bg-white dark:border-border dark:bg-zinc-900"}`}>
              {plan.popular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-4 py-1 text-xs font-semibold text-white">Best Value</span>}
              {plan.anchor && <span className="absolute -top-3 right-4 rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground dark:bg-muted dark:text-muted-foreground">Price Anchor</span>}
              <h3 className="text-lg font-bold">{plan.name}</h3>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-sm text-muted-foreground">{plan.period}</span>
              </div>
              <ul className="mt-6 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm"><CheckIcon />{f}</li>
                ))}
              </ul>
              <button className={`mt-8 w-full rounded-xl py-2.5 text-sm font-semibold transition ${plan.popular ? "bg-blue-600 text-white hover:bg-blue-700" : plan.anchor ? "bg-muted text-muted-foreground hover:bg-muted dark:bg-muted dark:text-muted-foreground" : "bg-foreground text-background hover:bg-muted dark:bg-foreground dark:text-background"}`}>{plan.cta}</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
