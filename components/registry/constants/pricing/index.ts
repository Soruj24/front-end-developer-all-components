import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const pricingThreeColumn: RegistryEntry = entry({
  id: "pricing-three-column",
  title: "3-Column Standard",
  description: "Classic 3-tier pricing with highlighted popular plan.",
  source: `export default function ThreeColumnStandard() {
  const plans = [
    { name: "Free", price: "$0", period: "/mo", desc: "Perfect for getting started", features: ["1 project", "1,000 requests/mo", "Community support", "Basic analytics", "2 team members"], cta: "Get Started", popular: false },
    { name: "Pro", price: "$19", period: "/mo", desc: "For growing teams", features: ["Unlimited projects", "100,000 requests/mo", "Priority support", "Advanced analytics", "Unlimited team members", "Custom domains", "API access"], cta: "Start Free Trial", popular: true },
    { name: "Enterprise", price: "$99", period: "/mo", desc: "For large organizations", features: ["Everything in Pro", "Unlimited requests", "24/7 dedicated support", "Custom integrations", "SLA guarantee", "SSO & SCIM", "Dedicated account manager"], cta: "Contact Sales", popular: false },
  ];
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {plans.map((plan) => (
        <div key={plan.name} className={\`relative rounded-2xl border p-6 \${plan.popular ? "border-blue-500 bg-blue-50/70 ring-2 ring-blue-500/20" : "border-border bg-white"}\`}>
          {plan.popular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-4 py-1 text-xs font-semibold text-white">Most Popular</span>}
          <h3 className="text-lg font-bold">{plan.name}</h3>
          <div className="mt-3 flex items-baseline gap-1">
            <span className="text-4xl font-bold">{plan.price}</span>
            <span className="text-sm text-muted-foreground">{plan.period}</span>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{plan.desc}</p>
          <ul className="mt-6 space-y-3">
            {plan.features.map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm">✓ {f}</li>
            ))}
          </ul>
          <button className={\`mt-8 w-full rounded-xl py-2.5 text-sm font-semibold \${plan.popular ? "bg-blue-600 text-white" : "bg-foreground text-background"}\`}>{plan.cta}</button>
        </div>
      ))}
    </div>
  );
}`,
});

export const pricingFourColumn: RegistryEntry = entry({
  id: "pricing-four-column",
  title: "4-Column Grid",
  description: "4-tier pricing grid with starter tier included.",
  source: `export default function FourColumnGrid() {
  const plans = [
    { name: "Starter", price: "$9", period: "/mo", desc: "For small side projects", features: ["3 projects", "10,000 requests/mo", "Community support", "Basic analytics", "10 team members"], cta: "Start Free Trial", popular: false },
    { name: "Free", price: "$0", period: "/mo", desc: "Perfect for getting started", features: ["1 project", "1,000 requests/mo", "Community support", "Basic analytics", "2 team members"], cta: "Get Started", popular: false },
    { name: "Pro", price: "$29", period: "/mo", desc: "For growing teams", features: ["Unlimited projects", "100,000 requests/mo", "Priority support", "Advanced analytics", "Unlimited team members", "Custom domains"], cta: "Start Free Trial", popular: true },
    { name: "Enterprise", price: "$99", period: "/mo", desc: "For large organizations", features: ["Unlimited everything", "Unlimited requests", "24/7 dedicated support", "Custom integrations", "SLA guarantee", "SSO & SCIM"], cta: "Contact Sales", popular: false },
  ];
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {plans.map((plan) => (
        <div key={plan.name} className={\`relative rounded-2xl border p-6 \${plan.popular ? "border-blue-500 bg-blue-50/70 ring-2 ring-blue-500/20" : "border-border bg-white"}\`}>
          {plan.popular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">Most Popular</span>}
          <h3 className="text-lg font-bold">{plan.name}</h3>
          <div className="mt-3 flex items-baseline gap-1">
            <span className="text-3xl font-bold">{plan.price}</span>
            <span className="text-sm text-muted-foreground">{plan.period}</span>
          </div>
          <ul className="mt-6 space-y-2">
            {plan.features.map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm">✓ {f}</li>
            ))}
          </ul>
          <button className={\`mt-6 w-full rounded-xl py-2.5 text-sm font-semibold \${plan.popular ? "bg-blue-600 text-white" : "border border-border text-zinc-800"}\`}>{plan.cta}</button>
        </div>
      ))}
    </div>
  );
}`,
});

export const pricingAnnualToggle: RegistryEntry = entry({
  id: "pricing-annual-toggle",
  title: "Annual vs Monthly Toggle",
  description: "Billing toggle with 20% annual discount.",
  source: `"use client";
import { useState } from "react";

export default function AnnualMonthlyToggle() {
  const [billing, setBilling] = useState("monthly");
  const plans = [
    { name: "Free", price: 0, period: "/mo", features: ["1 project", "1,000 requests/mo", "Community support", "Basic analytics"], cta: "Get Started" },
    { name: "Pro", price: 19, period: "/mo", features: ["Unlimited projects", "100,000 requests/mo", "Priority support", "Advanced analytics", "Custom domains"], cta: "Start Free Trial", popular: true },
    { name: "Enterprise", price: 99, period: "/mo", features: ["Everything in Pro", "Unlimited requests", "24/7 dedicated support", "SLA guarantee", "SSO & SCIM"], cta: "Contact Sales" },
  ];
  return (
    <div>
      <div className="flex justify-center">
        <div className="inline-flex gap-4 rounded-full border bg-muted p-1.5">
          <button onClick={() => setBilling("monthly")} className={\`rounded-full px-5 py-2 text-sm \${billing === "monthly" ? "bg-white shadow-sm" : ""}\`}>Monthly</button>
          <button onClick={() => setBilling("annual")} className={\`rounded-full px-5 py-2 text-sm \${billing === "annual" ? "bg-white shadow-sm" : ""}\`}>
            Annual <span className="ml-1 rounded-full bg-emerald-500 px-2 py-0.5 text-xs text-white">Save 20%</span>
          </button>
        </div>
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {plans.map((plan) => {
          const adjusted = billing === "annual" ? (plan.price * 0.8).toFixed(0) : plan.price;
          return (
            <div key={plan.name} className={\`rounded-2xl border p-6 \${plan.popular ? "border-blue-500 bg-blue-50/70" : "border-border bg-white"}\`}>
              <h3 className="text-lg font-bold">{plan.name}</h3>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-4xl font-bold">\${adjusted}</span>
                <span className="text-sm text-muted-foreground">{billing === "annual" ? "/mo, billed annually" : plan.period}</span>
              </div>
              <ul className="mt-6 space-y-3">
                {plan.features.map((f) => <li key={f} className="text-sm">✓ {f}</li>)}
              </ul>
              <button className={\`mt-8 w-full rounded-xl py-2.5 text-sm font-semibold \${plan.popular ? "bg-blue-600 text-white" : "bg-foreground text-background"}\`}>{plan.cta}</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}`,
});

export const pricingFeatureComparison: RegistryEntry = entry({
  id: "pricing-feature-comparison",
  title: "Feature Comparison Table",
  description: "Feature comparison table with tooltips and highlighting.",
  source: `export default function FeatureComparisonTable() {
  const features = ["Projects", "Requests / month", "Team members", "Support", "Analytics", "Custom domains", "SSO / SCIM"];
  const plans = [
    { name: "Free", values: ["1", "1K", "2", "Community", "Basic", false, false] },
    { name: "Pro", values: ["Unlimited", "100K", "Unlimited", "Priority", "Advanced", true, false] },
    { name: "Enterprise", values: ["Unlimited", "Unlimited", "Unlimited", "24/7", "Advanced + AI", true, true] },
  ];
  return (
    <div className="overflow-x-auto rounded-2xl border bg-white">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b">
            <th className="px-6 py-4 font-semibold">Feature</th>
            {plans.map((p) => <th key={p.name} className="px-6 py-4 font-semibold">{p.name}</th>)}
          </tr>
        </thead>
        <tbody>
          {features.map((feat, fi) => (
            <tr key={feat} className="border-b last:border-0">
              <td className="px-6 py-4 font-medium">{feat}</td>
              {plans.map((p) => (
                <td key={p.name} className="px-6 py-4">
                  {typeof p.values[fi] === "boolean" ? (p.values[fi] ? "✓" : "✗") : p.values[fi]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}`,
});

export const pricingPerSeat: RegistryEntry = entry({
  id: "pricing-per-seat",
  title: "Per-seat Pricing",
  description: "Per-user pricing with slider calculator.",
  source: `"use client";
import { useState } from "react";

export default function PerSeatPricing() {
  const [seatCount, setSeatCount] = useState(5);
  const seatPrice = 19;
  const seatTotal = seatCount * seatPrice;
  return (
    <div className="mx-auto max-w-md rounded-2xl border bg-white p-8">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Number of users</span>
        <span className="rounded-full bg-blue-100 px-3 py-1 text-lg font-bold text-blue-700">{seatCount}</span>
      </div>
      <input type="range" min={1} max={100} value={seatCount} onChange={(e) => setSeatCount(Number(e.target.value))} className="mt-4 w-full" />
      <div className="mt-6 flex items-center justify-between border-t pt-4">
        <span className="text-sm text-muted-foreground">Total</span>
        <span className="text-3xl font-bold">\${seatTotal}<span className="text-base font-normal text-muted-foreground">/mo</span></span>
      </div>
      <button className="mt-6 w-full rounded-xl bg-zinc-900 py-2.5 text-sm font-semibold text-white">Get Started</button>
    </div>
  );
}`,
});

export const pricingUsageBased: RegistryEntry = entry({
  id: "pricing-usage-based",
  title: "Usage-based Pricing",
  description: "Usage-based pricing with tier selector.",
  source: `"use client";
import { useState } from "react";

export default function UsageBasedPricing() {
  const [usageSlider, setUsageSlider] = useState(2);
  const labels = ["100K/mo", "500K/mo", "1M/mo", "5M/mo"];
  const prices = [29, 99, 199, 699];
  return (
    <div className="mx-auto max-w-md rounded-2xl border bg-white p-8">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Monthly requests</span>
        <span className="rounded-full bg-violet-100 px-3 py-1 text-sm font-bold text-violet-700">{labels[usageSlider]}</span>
      </div>
      <input type="range" min={0} max={3} value={usageSlider} onChange={(e) => setUsageSlider(Number(e.target.value))} className="mt-4 w-full" />
      <div className="mt-6 flex items-center justify-between border-t pt-4">
        <span className="text-sm text-muted-foreground">Total</span>
        <span className="text-3xl font-bold">\${prices[usageSlider]}<span className="text-base font-normal text-muted-foreground">/mo</span></span>
      </div>
      <button className="mt-6 w-full rounded-xl bg-violet-600 py-2.5 text-sm font-semibold text-white">Get Started</button>
    </div>
  );
}`,
});

export const pricingFreeAddons: RegistryEntry = entry({
  id: "pricing-free-addons",
  title: "Free + Paid Add-ons",
  description: "Free plan with optional paid add-ons.",
  source: `"use client";
import { useState } from "react";

export default function FreePlusAddons() {
  const [addons, setAddons] = useState({ storage: false, support: false, domain: false });
  const total = (addons.storage ? 5 : 0) + (addons.support ? 10 : 0) + (addons.domain ? 3 : 0);
  return (
    <div className="mx-auto max-w-md rounded-2xl border bg-white p-8">
      <div className="text-center">
        <h3 className="text-lg font-bold">Free Plan</h3>
        <div className="mt-2 flex items-baseline justify-center gap-1">
          <span className="text-4xl font-bold">$0</span>
          <span className="text-sm text-muted-foreground">/mo</span>
        </div>
      </div>
      <div className="mt-6 space-y-3">
        {[
          { label: "Extra Storage (5 GB)", key: "storage", price: 5 },
          { label: "Priority Support", key: "support", price: 10 },
          { label: "Custom Domain", key: "domain", price: 3 },
        ].map((a) => (
          <label key={a.key} className="flex items-center justify-between rounded-lg border p-3">
            <div className="flex items-center gap-3">
              <input type="checkbox" checked={addons[a.key as keyof typeof addons]} onChange={() => setAddons({ ...addons, [a.key]: !addons[a.key as keyof typeof addons] })} />
              <span className="text-sm font-medium">{a.label}</span>
            </div>
            <span className="text-sm text-muted-foreground">\${a.price}/mo</span>
          </label>
        ))}
      </div>
      <div className="mt-6 flex items-center justify-between border-t pt-4">
        <span className="text-sm text-muted-foreground">Monthly total</span>
        <span className="text-2xl font-bold">\${total}<span className="text-sm text-muted-foreground">/mo</span></span>
      </div>
      <button className="mt-6 w-full rounded-xl bg-zinc-900 py-2.5 text-sm font-semibold text-white">Get Started Free</button>
    </div>
  );
}`,
});

export const pricingFlatRate: RegistryEntry = entry({
  id: "pricing-flat-rate",
  title: "Flat Rate",
  description: "Single flat-rate plan with all features included.",
  source: `export default function FlatRate() {
  return (
    <div className="mx-auto max-w-sm">
      <div className="relative rounded-2xl border-2 border-amber-400 bg-white p-8 shadow-lg">
        <span className="absolute -right-3 -top-3 rounded-full bg-amber-400 px-3 py-1 text-xs font-bold text-zinc-900">All-inclusive</span>
        <h3 className="text-lg font-bold">Unlimited Plan</h3>
        <div className="mt-3 flex items-baseline gap-1">
          <span className="text-5xl font-bold">$29</span>
          <span className="text-sm text-muted-foreground">/mo</span>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">All features, no limits, no hidden fees.</p>
        <ul className="mt-6 space-y-3">
          {["Unlimited projects", "Unlimited requests", "Priority support", "Advanced analytics", "Custom domains", "API access"].map((f) => (
            <li key={f} className="flex items-center gap-2 text-sm">✓ {f}</li>
          ))}
        </ul>
        <button className="mt-8 w-full rounded-xl bg-amber-500 py-3 text-sm font-bold text-zinc-900">Get Started</button>
      </div>
    </div>
  );
}`,
});

export const pricingTwoSided: RegistryEntry = entry({
  id: "pricing-two-sided",
  title: "Two-sided: Free vs Premium",
  description: "Side-by-side free vs premium comparison.",
  source: `export default function TwoSided() {
  return (
    <div className="grid gap-0 overflow-hidden rounded-2xl border md:grid-cols-2">
      <div className="bg-white p-8">
        <h3 className="text-2xl font-bold">Free</h3>
        <div className="mt-3 flex items-baseline gap-1">
          <span className="text-5xl font-bold">$0</span>
          <span className="text-sm text-muted-foreground">forever</span>
        </div>
        <ul className="mt-6 space-y-3">
          {["1 project", "1,000 requests/mo", "Community support", "Basic analytics", "2 team members"].map((f) => (
            <li key={f} className="text-sm">✓ {f}</li>
          ))}
        </ul>
        <button className="mt-8 w-full rounded-xl border py-3 text-sm font-semibold">Get Started Free</button>
      </div>
      <div className="bg-blue-600 p-8 text-white">
        <h3 className="text-2xl font-bold">Premium</h3>
        <div className="mt-3 flex items-baseline gap-1">
          <span className="text-5xl font-bold">$19</span>
          <span className="text-sm text-blue-200">/mo</span>
        </div>
        <ul className="mt-6 space-y-3">
          {["Unlimited projects", "100,000 requests/mo", "Priority support", "Advanced analytics", "Custom domains", "API access"].map((f) => (
            <li key={f} className="text-sm">✓ {f}</li>
          ))}
        </ul>
        <button className="mt-8 w-full rounded-xl bg-white py-3 text-sm font-bold text-blue-600">Start Premium Free Trial</button>
      </div>
    </div>
  );
}`,
});

export const pricingTieredReveal: RegistryEntry = entry({
  id: "pricing-tiered-reveal",
  title: "Tiered Feature Reveal",
  description: "Feature reveal on hover for locked features.",
  source: `export default function TieredFeatureReveal() {
  const plans = [
    { name: "Basic", price: "$0", features: ["1 project", "1,000 requests", "Community support", "Basic analytics"] },
    { name: "Pro", price: "$29", features: ["Unlimited projects", "100K requests", "Priority support", "Advanced analytics", "Custom domains", "API access"] },
    { name: "Enterprise", price: "$99", features: ["Unlimited projects", "Unlimited requests", "Priority support", "Advanced analytics", "Custom domains", "API access", "SSO & SCIM", "Dedicated manager"] },
  ];
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {plans.map((plan) => (
        <div key={plan.name} className="rounded-2xl border bg-background p-6">
          <h3 className="text-lg font-bold">{plan.name}</h3>
          <div className="mt-3 flex items-baseline gap-1">
            <span className="text-4xl font-bold">{plan.price}</span>
            <span className="text-sm text-muted-foreground">/mo</span>
          </div>
          <ul className="mt-6 space-y-3">
            {["1 project", "1,000 requests", "Community support", "Basic analytics", "Custom domains", "API access", "SSO & SCIM", "Dedicated manager"].map((f) => {
              const owned = plan.features.includes(f);
              return (
                <li key={f} className={\`group relative text-sm \${owned ? "" : "opacity-30"}\`}>
                  {owned ? "✓" : "✗"} {f}
                  {!owned && <span className="invisible absolute -top-8 left-0 z-10 rounded bg-zinc-800 px-2 py-1 text-xs text-white opacity-0 transition group-hover:visible group-hover:opacity-100">Upgrade to unlock</span>}
                </li>
              );
            })}
          </ul>
          <button className="mt-8 w-full rounded-xl bg-zinc-900 py-2.5 text-sm font-semibold text-white">Get Started</button>
        </div>
      ))}
    </div>
  );
}`,
});

export const pricingEnterprise: RegistryEntry = entry({
  id: "pricing-enterprise",
  title: "Enterprise Custom",
  description: "Enterprise contact sales card.",
  source: `export default function EnterpriseCustom() {
  return (
    <div className="mx-auto max-w-md rounded-2xl border-2 border-dashed bg-white p-8 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-100">
        <svg className="h-7 w-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
        </svg>
      </div>
      <h3 className="mt-4 text-xl font-bold">Enterprise Plan</h3>
      <p className="mt-2 text-sm text-muted-foreground">Custom pricing tailored to your needs. Volume discounts available.</p>
      <button className="mt-6 w-full rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white">Contact Sales</button>
    </div>
  );
}`,
});

export const pricingTeam: RegistryEntry = entry({
  id: "pricing-team",
  title: "Team Pricing",
  description: "Base plan + per-member pricing with counter.",
  source: `"use client";
import { useState } from "react";

export default function TeamPricing() {
  const [teamBase, setTeamBase] = useState(1);
  const teamTotal = 29 + Math.max(0, teamBase - 1) * 9;
  return (
    <div className="mx-auto max-w-md rounded-2xl border bg-white p-8">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Team members</span>
        <div className="flex items-center gap-3">
          <button onClick={() => setTeamBase(Math.max(1, teamBase - 1))} className="flex h-8 w-8 items-center justify-center rounded-full border text-lg">−</button>
          <span className="text-xl font-bold">{teamBase}</span>
          <button onClick={() => setTeamBase(teamBase + 1)} className="flex h-8 w-8 items-center justify-center rounded-full border text-lg">+</button>
        </div>
      </div>
      <div className="mt-4 space-y-2 text-sm text-muted-foreground">
        <div className="flex justify-between"><span>Base plan (1 member)</span><span>$29/mo</span></div>
        {teamBase > 1 && <div className="flex justify-between"><span>{teamBase - 1} additional</span><span>+\${(teamBase - 1) * 9}/mo</span></div>}
      </div>
      <div className="mt-4 flex items-center justify-between border-t pt-4">
        <span className="text-sm font-medium">Total</span>
        <span className="text-3xl font-bold">\${teamTotal}<span className="text-base font-normal text-muted-foreground">/mo</span></span>
      </div>
      <button className="mt-6 w-full rounded-xl bg-zinc-900 py-2.5 text-sm font-semibold text-white">Start Team Plan</button>
    </div>
  );
}`,
});

export const pricingLifetime: RegistryEntry = entry({
  id: "pricing-lifetime",
  title: "Lifetime Deal",
  description: "One-time payment lifetime deal.",
  source: `export default function LifetimeDeal() {
  return (
    <div className="mx-auto max-w-sm">
      <div className="relative overflow-hidden rounded-2xl border-2 border-rose-400 bg-white p-8 shadow-lg">
        <span className="absolute -right-8 top-4 rotate-45 bg-rose-500 px-10 py-1 text-xs font-bold text-white">Limited Time</span>
        <h3 className="text-lg font-bold">Lifetime Pro</h3>
        <div className="mt-4 flex items-baseline gap-2">
          <span className="text-3xl font-bold text-zinc-300 line-through">$999</span>
          <span className="text-5xl font-bold text-rose-500">$499</span>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">One-time payment. No recurring fees.</p>
        <ul className="mt-6 space-y-3">
          {["Unlimited projects", "Unlimited requests", "Priority support", "All future updates", "Lifetime access"].map((f) => (
            <li key={f} className="text-sm">✓ {f}</li>
          ))}
        </ul>
        <button className="mt-8 w-full rounded-xl bg-rose-500 py-3 text-sm font-bold text-white">Get Lifetime Access</button>
      </div>
    </div>
  );
}`,
});

export const pricingMoneyBack: RegistryEntry = entry({
  id: "pricing-money-back",
  title: "Money-back Guarantee",
  description: "30-day money-back guarantee badge.",
  source: `export default function MoneyBackGuarantee() {
  return (
    <div className="mx-auto flex max-w-sm items-center gap-4 rounded-2xl border-2 border-emerald-400 bg-emerald-50 p-6">
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-emerald-100">
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      </div>
      <div>
        <h3 className="text-lg font-bold text-emerald-800">30-Day Money-Back Guarantee</h3>
        <p className="mt-1 text-sm text-emerald-600">Not satisfied? Get a full refund within 30 days. No questions asked.</p>
      </div>
    </div>
  );
}`,
});

export const pricingFreeTrial: RegistryEntry = entry({
  id: "pricing-free-trial",
  title: "Free Trial",
  description: "14-day free trial card.",
  source: `export default function FreeTrial() {
  return (
    <div className="mx-auto max-w-sm rounded-2xl border-2 border-blue-400 bg-gradient-to-br from-blue-50 to-white p-8 text-center">
      <h3 className="mt-3 text-xl font-bold">Start Your 14-Day Free Trial</h3>
      <p className="mt-2 text-sm text-muted-foreground">Full access. No commitment. Cancel anytime.</p>
      <div className="mt-3 inline-block rounded-full bg-blue-100 px-4 py-1 text-sm font-bold text-blue-700">14 days free</div>
      <button className="mt-6 w-full rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white">Start Free Trial</button>
      <p className="mt-2 text-xs text-muted-foreground">No credit card required</p>
    </div>
  );
}`,
});

export const pricingOpenSource: RegistryEntry = entry({
  id: "pricing-open-source",
  title: "Open Source",
  description: "Free for open source projects.",
  source: `export default function OpenSource() {
  return (
    <div className="mx-auto max-w-sm rounded-2xl border-2 border-pink-400 bg-gradient-to-br from-pink-50 to-white p-8 text-center">
      <h3 className="mt-3 text-xl font-bold">Free for Open Source</h3>
      <p className="mt-2 text-sm text-muted-foreground">If your project is open source, you get the Pro plan for free. Forever.</p>
      <button className="mt-6 w-full rounded-xl border-2 border-pink-400 bg-white py-3 text-sm font-bold text-pink-600">Apply for Open Source</button>
    </div>
  );
}`,
});

export const pricingNonprofit: RegistryEntry = entry({
  id: "pricing-nonprofit",
  title: "Nonprofit Discount",
  description: "50% off for verified nonprofits.",
  source: `export default function NonprofitDiscount() {
  return (
    <div className="mx-auto max-w-sm rounded-2xl border-2 border-teal-400 bg-gradient-to-br from-teal-50 to-white p-8 text-center">
      <h3 className="mt-3 text-xl font-bold">50% Off for Nonprofits</h3>
      <p className="mt-2 text-sm text-muted-foreground">Verified nonprofit organizations receive 50% off all paid plans.</p>
      <p className="mt-1 text-sm font-semibold text-teal-600">Pro was $29 → now $14.50/mo</p>
      <button className="mt-6 w-full rounded-xl bg-teal-500 py-3 text-sm font-bold text-white">Verify Nonprofit</button>
    </div>
  );
}`,
});

export const pricingStudent: RegistryEntry = entry({
  id: "pricing-student",
  title: "Student Plan",
  description: "Free for students with .edu email.",
  source: `export default function StudentPlan() {
  return (
    <div className="mx-auto max-w-sm rounded-2xl border-2 border-indigo-400 bg-gradient-to-br from-indigo-50 to-white p-8 text-center">
      <h3 className="mt-3 text-xl font-bold">Free for Students</h3>
      <p className="mt-2 text-sm text-muted-foreground">Full Pro plan access with a valid .edu email address.</p>
      <div className="mt-3 inline-flex items-center gap-2 rounded-lg border border-indigo-200 bg-white px-4 py-2 text-sm">
        <span className="text-muted-foreground">you@</span><span className="font-bold text-indigo-600">.edu</span>
      </div>
      <button className="mt-6 w-full rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white">Verify Student Email</button>
    </div>
  );
}`,
});

export const pricing: RegistryEntry[] = [
  pricingThreeColumn,
  pricingFourColumn,
  pricingAnnualToggle,
  pricingFeatureComparison,
  pricingPerSeat,
  pricingUsageBased,
  pricingFreeAddons,
  pricingFlatRate,
  pricingTwoSided,
  pricingTieredReveal,
  pricingEnterprise,
  pricingTeam,
  pricingLifetime,
  pricingMoneyBack,
  pricingFreeTrial,
  pricingOpenSource,
  pricingNonprofit,
  pricingStudent,
];
