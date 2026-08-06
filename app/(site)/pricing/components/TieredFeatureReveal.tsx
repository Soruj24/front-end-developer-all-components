import { CheckIcon, CrossIcon } from "../data";

export function TieredFeatureReveal() {
  const plans = [
    { name: "Basic", price: "$0", features: ["1 project", "1,000 requests", "Community support", "Basic analytics"], locked: [] },
    { name: "Pro", price: "$29", features: ["Unlimited projects", "100K requests", "Priority support", "Advanced analytics", "Custom domains", "API access"], locked: [] },
    { name: "Enterprise", price: "$99", features: ["Unlimited projects", "Unlimited requests", "Priority support", "Advanced analytics", "Custom domains", "API access", "SSO & SCIM", "Dedicated manager"], locked: [] },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {plans.map((plan, pi) => (
        <div key={plan.name} className="relative rounded-2xl border border-border bg-background p-6 shadow-card">
          <h3 className="text-lg font-bold">{plan.name}</h3>
          <div className="mt-3 flex items-baseline gap-1">
            <span className="text-4xl font-bold">{plan.price}</span>
            <span className="text-sm text-muted-foreground">/mo</span>
          </div>
          <ul className="mt-6 space-y-3">
            {["1 project", "1,000 requests", "Community support", "Basic analytics", "Custom domains", "API access", "SSO & SCIM", "Dedicated manager"].map((f) => {
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
  );
}
