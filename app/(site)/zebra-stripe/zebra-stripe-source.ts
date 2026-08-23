export const ZEBRA_STRIPE_SOURCE = `"use client";

export function BasicStripe() {
  return (
    <div className="mx-auto max-w-sm overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
      {["First item", "Second item", "Third item", "Fourth item", "Fifth item"].map((item, i) => (
        <div key={i} className={\`px-4 py-3 text-sm font-medium text-zinc-700 dark:text-zinc-300 \${i % 2 === 0 ? "bg-zinc-50 dark:bg-zinc-800/50" : ""} \${i !== 0 ? "border-t border-zinc-100 dark:border-zinc-800" : ""}\`}>
          {item}
        </div>
      ))}
    </div>
  );
}`;
