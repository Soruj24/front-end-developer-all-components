import { Hammer } from "lucide-react";

const items = [
  { label: "Framing Labor", qty: 40, unit: "hrs", rate: 50 },
  { label: "Lumber", qty: 1, unit: "lot", rate: 1200 },
  { label: "Nails & Screws", qty: 1, unit: "box", rate: 45 },
  { label: "Drywall", qty: 20, unit: "sheets", rate: 15 },
];

export function ConstructionQuoteDemo() {
  const total = items.reduce((sum, i) => sum + i.qty * i.rate, 0);

  return (
    <div className="w-full max-w-md">
      <div className="rounded-xl border border-zinc-200 bg-white shadow-sm overflow-hidden dark:border-zinc-800 dark:bg-zinc-950">
        <div className="border-b border-zinc-100 px-5 py-3.5 dark:border-zinc-800/80">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-zinc-100 dark:bg-zinc-800">
              <Hammer className="h-3.5 w-3.5 text-zinc-600 dark:text-zinc-400" />
            </div>
            <h3 className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">Construction Quote</h3>
          </div>
        </div>
        <div className="p-5">
          <div className="space-y-1.5 mb-5">
            {items.map((item) => (
              <div key={item.label} className="flex items-center justify-between rounded-lg bg-zinc-50 px-3.5 py-2.5 dark:bg-zinc-900/50">
                <div>
                  <p className="text-[13px] font-medium text-zinc-900 dark:text-zinc-100">{item.label}</p>
                  <p className="text-[10px] text-zinc-500 dark:text-zinc-500">{item.qty} {item.unit} {`× $${item.rate}`}</p>
                </div>
                <p className="text-[13px] font-semibold tabular-nums text-zinc-900 dark:text-zinc-100">{`$${item.qty * item.rate}`}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900/50">
            <span className="text-[13px] font-medium text-zinc-600 dark:text-zinc-400">Total Estimate</span>
            <span className="text-xl font-bold tabular-nums text-zinc-900 dark:text-zinc-100">{`$${total.toLocaleString()}`}</span>
          </div>
          <button className="mt-4 w-full rounded-lg bg-zinc-900 px-4 py-2.5 text-[13px] font-medium text-white transition-colors hover:bg-zinc-800 active:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200 dark:active:bg-zinc-300">
            Request Quote
          </button>
        </div>
      </div>
    </div>
  );
}
