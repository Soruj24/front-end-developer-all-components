"use client";

import { useState, type FormEvent } from "react";
import { Mail, CheckCircle } from "lucide-react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (email) setSubscribed(true);
  };

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
          <Mail className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
        </div>
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Newsletter</h3>
      </div>
      {subscribed ? (
        <div className="py-8 text-center">
          <CheckCircle className="mx-auto mb-3 h-12 w-12 text-emerald-500" />
          <p className="font-medium text-zinc-900 dark:text-zinc-100">You&apos;re subscribed!</p>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Check your inbox for confirmation</p>
        </div>
      ) : (
        <form onSubmit={handleSubscribe} className="space-y-4">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Get the latest updates delivered to your inbox.</p>
          <div className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="flex-1 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-zinc-600 dark:focus:ring-zinc-800"
              required
            />
            <button type="submit" className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-zinc-800 active:scale-[0.98] dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200">
              Subscribe
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
