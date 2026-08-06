import { CheckIcon } from "../data";

export function LifetimeDeal() {
  return (
    <div className="mx-auto max-w-sm">
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
  );
}
