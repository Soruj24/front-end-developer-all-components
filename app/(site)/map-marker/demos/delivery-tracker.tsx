"use client";

import { useState } from "react";
import { Car } from "lucide-react";

export function DeliveryTracker() {
  const [step, setStep] = useState(0);
  const steps = ["Order Placed", "Packed", "Shipped", "Out for Delivery", "Delivered"];

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
          <Car className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
        </div>
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Delivery Tracker</h3>
      </div>
      <div className="relative">
        <div className="flex items-center justify-between mb-8">
          {steps.map((s, i) => (
            <div key={i} className="flex flex-col items-center flex-1">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium transition-all ${
                  i <= step
                    ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                    : "bg-zinc-200 text-zinc-500 dark:bg-zinc-700 dark:text-zinc-400"
                }`}
              >
                {i < step ? (
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20,6 9,17 4,12" />
                  </svg>
                ) : (
                  i + 1
                )}
              </div>
              <span className="mt-2 text-center text-[10px] text-zinc-500 dark:text-zinc-400">{s}</span>
            </div>
          ))}
        </div>
        <div className="absolute top-4 left-4 right-4 h-0.5 bg-zinc-200 dark:bg-zinc-700">
          <div
            className="h-full bg-zinc-900 transition-all duration-500 dark:bg-zinc-100"
            style={{ width: `${(step / (steps.length - 1)) * 100}%` }}
          />
        </div>
      </div>
      <div className="flex gap-2 mt-4">
        <button
          onClick={() => setStep(Math.max(0, step - 1))}
          disabled={step === 0}
          className="flex-1 rounded-lg border border-zinc-200 px-3 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 disabled:opacity-40 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
        >
          Previous
        </button>
        <button
          onClick={() => setStep(Math.min(steps.length - 1, step + 1))}
          disabled={step === steps.length - 1}
          className="flex-1 rounded-lg bg-zinc-900 px-3 py-2 text-sm font-medium text-white transition-all hover:bg-zinc-800 active:scale-[0.98] disabled:opacity-40 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          Next
        </button>
      </div>
    </div>
  );
}
