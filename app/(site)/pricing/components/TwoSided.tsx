import { CheckIcon } from "../data";

export function TwoSided() {
  return (
    <div className="grid gap-0 overflow-hidden rounded-2xl border shadow-sm md:grid-cols-2">
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
  );
}
