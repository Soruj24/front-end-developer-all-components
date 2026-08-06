import { CheckIcon } from "../data";

export function GrandfatheredPricing() {
  return (
    <div className="mx-auto max-w-sm">
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
  );
}
