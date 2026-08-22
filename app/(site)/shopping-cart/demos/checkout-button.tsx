"use client";

import { useState } from "react";
import { CreditCard, Loader2 } from "lucide-react";

export function CheckoutButton() {
  const [processing, setProcessing] = useState(false);

  return (
    <button
      onClick={() => { setProcessing(true); setTimeout(() => setProcessing(false), 2000); }}
      disabled={processing}
      className="flex items-center gap-2 rounded-xl bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-zinc-800 active:scale-[0.97] disabled:opacity-50 disabled:active:scale-100 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
    >
      {processing ? <Loader2 className="h-4 w-4 animate-spin" /> : <CreditCard className="h-4 w-4" />}
      {processing ? "Processing..." : "Proceed to Checkout"}
    </button>
  );
}
