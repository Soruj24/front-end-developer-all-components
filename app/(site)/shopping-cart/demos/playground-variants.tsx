"use client";

import { useState } from "react";
import { Package, Minus, Plus, Trash2, ShoppingCart, Tag, Check, CreditCard, Loader2 } from "lucide-react";

export function CartItemVariant() {
  const [qty, setQty] = useState(2);
  return (
    <div className="w-full max-w-xs overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-950">
      <div className="flex items-center gap-3 p-3">
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800"><Package className="h-6 w-6 text-zinc-400" /></div>
        <div className="min-w-0 flex-1"><p className="truncate text-xs font-semibold text-zinc-900 dark:text-zinc-100">Headphones</p><p className="text-xs text-zinc-500">$79.99</p></div>
        <div className="flex items-center gap-1">
          <button onClick={() => setQty(Math.max(1, qty - 1))} className="flex h-7 w-7 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50 active:scale-95 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400"><Minus className="h-3 w-3" /></button>
          <span className="w-6 text-center text-xs font-semibold text-zinc-900 dark:text-zinc-100">{qty}</span>
          <button onClick={() => setQty(qty + 1)} className="flex h-7 w-7 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50 active:scale-95 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400"><Plus className="h-3 w-3" /></button>
        </div>
        <button className="rounded-lg p-1.5 text-zinc-400 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950/30 dark:hover:text-red-400"><Trash2 className="h-3.5 w-3.5" /></button>
      </div>
    </div>
  );
}

export function SummaryVariant() {
  return (
    <div className="w-full max-w-xs rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-950">
      <h3 className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Order Summary</h3>
      <div className="mt-3 space-y-2">
        <div className="flex justify-between text-xs"><span className="text-zinc-500">Subtotal</span><span className="font-medium text-zinc-900 dark:text-zinc-100">$239.97</span></div>
        <div className="flex justify-between text-xs"><span className="text-zinc-500">Shipping</span><span className="font-medium text-zinc-900 dark:text-zinc-100">$9.99</span></div>
        <div className="flex justify-between text-xs"><span className="text-zinc-500">Tax</span><span className="font-medium text-zinc-900 dark:text-zinc-100">$19.20</span></div>
        <div className="border-t border-zinc-200 pt-2 dark:border-zinc-700"><div className="flex justify-between"><span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">Total</span><span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">$269.16</span></div></div>
      </div>
    </div>
  );
}

export function AddVariant() {
  const [added, setAdded] = useState(false);
  return (
    <div className="flex gap-2">
      <button onClick={() => { setAdded(true); setTimeout(() => setAdded(false), 1500); }} className="flex items-center gap-1.5 rounded-xl bg-zinc-900 px-4 py-2 text-xs font-medium text-white transition-all hover:bg-zinc-800 active:scale-[0.97] dark:bg-zinc-100 dark:text-zinc-900">
        {added ? <Check className="h-3.5 w-3.5" /> : <ShoppingCart className="h-3.5 w-3.5" />}{added ? "Added!" : "Add to Cart"}
      </button>
      <button className="flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-4 py-2 text-xs font-medium text-zinc-700 hover:bg-zinc-50 active:scale-[0.97] dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"><Tag className="h-3.5 w-3.5" />Coupon</button>
    </div>
  );
}

export function QtyVariant() {
  const [qty, setQty] = useState(1);
  return (
    <div className="flex items-center gap-2">
      <span className="text-[11px] text-zinc-500">Qty:</span>
      <div className="flex items-center overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-900">
        <button onClick={() => setQty(Math.max(1, qty - 1))} className="flex h-8 w-8 items-center justify-center text-zinc-600 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:bg-zinc-800"><Minus className="h-3 w-3" /></button>
        <span className="flex h-8 w-10 items-center justify-center border-x border-zinc-200 text-xs font-semibold text-zinc-900 dark:border-zinc-700 dark:text-zinc-100">{qty}</span>
        <button onClick={() => setQty(Math.min(10, qty + 1))} className="flex h-8 w-8 items-center justify-center text-zinc-600 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:bg-zinc-800"><Plus className="h-3 w-3" /></button>
      </div>
    </div>
  );
}

export function BadgeVariant() {
  const [count, setCount] = useState(3);
  return (
    <div className="flex items-center gap-3">
      <div className="relative"><ShoppingCart className="h-5 w-5 text-zinc-700 dark:text-zinc-300" />{count > 0 && <span className="absolute -right-1.5 -top-1.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-red-500 px-0.5 text-[9px] font-bold text-white">{count}</span>}</div>
      <div className="flex gap-1.5">
        <button onClick={() => setCount(c => c + 1)} className="rounded-lg border border-zinc-200 bg-white px-3 py-1 text-[10px] font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">Add</button>
        <button onClick={() => setCount(Math.max(0, count - 1))} className="rounded-lg border border-zinc-200 bg-white px-3 py-1 text-[10px] font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">Remove</button>
      </div>
    </div>
  );
}

export function CheckoutVariant() {
  const [processing, setProcessing] = useState(false);
  return (
    <button onClick={() => { setProcessing(true); setTimeout(() => setProcessing(false), 2000); }} disabled={processing} className="flex items-center gap-1.5 rounded-xl bg-zinc-900 px-5 py-2.5 text-xs font-medium text-white transition-all hover:bg-zinc-800 active:scale-[0.97] disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900">
      {processing ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <CreditCard className="h-3.5 w-3.5" />}{processing ? "Processing..." : "Checkout"}
    </button>
  );
}

export function EmptyVariant() {
  return (
    <div className="w-full max-w-xs rounded-2xl border-2 border-dashed border-zinc-200 p-8 text-center dark:border-zinc-700">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-800"><ShoppingCart className="h-6 w-6 text-zinc-400" /></div>
      <p className="mt-3 text-xs font-semibold text-zinc-900 dark:text-zinc-100">Cart is empty</p>
      <p className="mt-0.5 text-[10px] text-zinc-500">Add items to get started</p>
    </div>
  );
}
