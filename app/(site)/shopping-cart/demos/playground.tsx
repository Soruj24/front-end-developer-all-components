"use client";

import { useState } from "react";
import { CartItemVariant, SummaryVariant, AddVariant, QtyVariant, BadgeVariant, CheckoutVariant, EmptyVariant } from "./playground-variants";

const VARIANTS = ["cartItem", "summary", "add", "qty", "badge", "checkout", "empty"] as const;
type Variant = (typeof VARIANTS)[number];

export function PlaygroundDemo() {
  const [variant, setVariant] = useState<Variant>("cartItem");

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex flex-wrap gap-1.5">
        {VARIANTS.map((v) => (
          <button key={v} onClick={() => setVariant(v)} className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${variant === v ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900" : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"}`}>
            {v}
          </button>
        ))}
      </div>
      <div className="mt-4 flex justify-center">
        {variant === "cartItem" && <CartItemVariant />}
        {variant === "summary" && <SummaryVariant />}
        {variant === "add" && <AddVariant />}
        {variant === "qty" && <QtyVariant />}
        {variant === "badge" && <BadgeVariant />}
        {variant === "checkout" && <CheckoutVariant />}
        {variant === "empty" && <EmptyVariant />}
      </div>
    </div>
  );
}
