import { CheckIcon } from "../data";

export function FlatRate() {
  return (
    <div className="mx-auto max-w-sm">
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
  );
}
