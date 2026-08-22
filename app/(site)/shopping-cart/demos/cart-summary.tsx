"use client";

export function CartSummary() {
  const subtotal = 239.97;
  const shipping = 9.99;
  const tax = 19.20;
  const total = subtotal + shipping + tax;

  return (
    <div className="w-full max-w-sm overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-950">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Order Summary</h3>
      <div className="mt-4 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-zinc-500 dark:text-zinc-400">Subtotal (3 items)</span>
          <span className="font-medium text-zinc-900 dark:text-zinc-100">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-zinc-500 dark:text-zinc-400">Shipping</span>
          <span className="font-medium text-zinc-900 dark:text-zinc-100">${shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-zinc-500 dark:text-zinc-400">Tax</span>
          <span className="font-medium text-zinc-900 dark:text-zinc-100">${tax.toFixed(2)}</span>
        </div>
        <div className="border-t border-zinc-200 pt-3 dark:border-zinc-700">
          <div className="flex justify-between">
            <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Total</span>
            <span className="text-lg font-bold text-zinc-900 dark:text-zinc-100">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
