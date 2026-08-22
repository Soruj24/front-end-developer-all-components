"use client";

import { useState } from "react";
import { Megaphone } from "lucide-react";

export function PromotionCard() {
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [copied, setCopied] = useState(false);

  const applyPromo = () => {
    if (promoCode === "SAVE20") setDiscount(20);
    else if (promoCode === "SAVE10") setDiscount(10);
    else setDiscount(0);
  };

  const copyCode = () => {
    navigator.clipboard.writeText("SAVE20");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-50 dark:bg-purple-950/30">
          <Megaphone className="h-4 w-4 text-purple-500" />
        </div>
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Promotion Card</h3>
      </div>
      <div className="rounded-xl border border-purple-200 bg-gradient-to-br from-purple-50 to-white p-4 dark:border-purple-800 dark:from-purple-950/30 dark:to-zinc-950">
        <div className="mb-2 inline-flex items-center rounded-full bg-purple-600 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
          Limited Offer
        </div>
        <p className="text-lg font-bold text-zinc-900 dark:text-zinc-100">Get 20% OFF!</p>
        <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">Use code at checkout. Valid until end of month.</p>
        <div className="mt-3 flex items-center gap-2">
          <div className="flex-1 rounded-lg border border-zinc-200 bg-white px-3 py-2 font-mono text-sm text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100">SAVE20</div>
          <button onClick={copyCode} className="rounded-lg bg-zinc-900 px-3 py-2 text-xs font-medium text-white transition-all hover:bg-zinc-800 active:scale-[0.98] dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200">
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        {discount > 0 && <p className="mt-2 text-xs font-medium text-emerald-600 dark:text-emerald-400">{discount}% discount applied!</p>}
      </div>
      <div className="mt-4 flex gap-2">
        <input value={promoCode} onChange={(e) => setPromoCode(e.target.value.toUpperCase())} placeholder="Enter promo code" className="flex-1 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-zinc-600" />
        <button onClick={applyPromo} className="rounded-xl bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-zinc-800 active:scale-[0.98] dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200">
          Apply
        </button>
      </div>
    </div>
  );
}
