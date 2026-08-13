"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

interface BackInStockNotificationProps {
  productId: string;
  productTitle: string;
  className?: string;
}

export function BackInStockNotification({
  productId,
  productTitle,
  className,
}: BackInStockNotificationProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email.trim()) {
      setError("Email is required");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email");
      return;
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className={cn("rounded-xl border border-green-200 bg-green-50 p-4 text-center", className)}>
        <div className="mb-2 flex justify-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
            <svg className="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        <p className="text-sm font-medium text-green-800">You&apos;re on the list!</p>
        <p className="mt-1 text-xs text-green-600">
          We&apos;ll notify you at <span className="font-medium">{email}</span> when {productTitle} is back in stock.
        </p>
      </div>
    );
  }

  return (
    <div className={cn("rounded-xl border border-border/50 bg-muted/20 p-4", className)}>
      <div className="mb-3 flex items-center gap-2">
        <svg className="h-5 w-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        <p className="text-sm font-medium text-foreground">Out of Stock</p>
      </div>
      <p className="mb-3 text-xs text-muted-foreground">
        Get notified when this item becomes available again.
      </p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="flex-1">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary"
          />
          {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </div>
        <button
          type="submit"
          className="shrink-0 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Notify Me
        </button>
      </form>
    </div>
  );
}
