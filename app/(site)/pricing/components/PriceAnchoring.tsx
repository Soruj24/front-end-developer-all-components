import { CheckIcon } from "../data";

export function PriceAnchoring() {
  const plans = [
    { name: "Enterprise", price: "$199", period: "/mo", features: ["Everything included", "Unlimited requests", "24/7 dedicated support", "Custom integrations", "SLA guarantee", "SSO & SCIM", "Dedicated manager"], cta: "Contact Sales", popular: false, anchor: true },
    { name: "Pro", price: "$29", period: "/mo", features: ["Unlimited projects", "100,000 requests/mo", "Priority support", "Advanced analytics", "Unlimited team members", "Custom domains"], cta: "Start Free Trial", popular: true },
    { name: "Starter", price: "$9", period: "/mo", features: ["3 projects", "10,000 requests/mo", "Community support", "Basic analytics", "10 team members"], cta: "Get Started", popular: false },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {plans.map((plan) => (
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
  );
}
