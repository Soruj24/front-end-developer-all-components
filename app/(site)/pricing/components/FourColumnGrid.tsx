import { fourTierPlans, CheckIcon } from "../data";

export function FourColumnGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
  );
}
