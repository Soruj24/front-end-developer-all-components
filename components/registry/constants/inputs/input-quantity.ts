import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const inputQuantity: RegistryEntry = entry({
    id: "input-quantity",
    title: "Input Group (Quantity)",
    description: "Stepper buttons flanking a numeric input.",
    source: `import { useState } from "react";

export default function InputQuantity() {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="flex items-center">
      <button
        type="button"
        onClick={() => setQuantity(Math.max(0, quantity - 1))}
        disabled={quantity <= 0}
        aria-label="Decrease"
        className="flex h-10 w-10 items-center justify-center rounded-l-lg border border-black/[.08] text-zinc-600 hover:bg-black/[.04] disabled:opacity-40 dark:border-white/[.145] dark:text-zinc-400 dark:hover:bg-white/[.06]"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
        </svg>
      </button>
      <input
        type="number"
        value={quantity}
        min={0}
        onChange={(e) => setQuantity(Math.max(0, parseInt(e.target.value) || 0))}
        className="h-10 w-16 border-y border-black/[.08] bg-transparent text-center text-sm outline-none dark:border-white/[.145] [&::-webkit-inner-spin-button]:appearance-none"
      />
      <button
        type="button"
        onClick={() => setQuantity((q) => q + 1)}
        aria-label="Increase"
        className="flex h-10 w-10 items-center justify-center rounded-r-lg border border-black/[.08] text-zinc-600 hover:bg-black/[.04] dark:border-white/[.145] dark:text-zinc-400 dark:hover:bg-white/[.06]"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  );
}`,
  });
