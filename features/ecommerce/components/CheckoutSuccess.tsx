"use client";

import Link from "next/link";
import { cn } from "@/lib/cn";
import { Button } from "@/components/design-system/Button";

interface CheckoutSuccessProps {
  orderId: string;
  email: string;
  className?: string;
}

export function CheckoutSuccess({ orderId, email, className }: CheckoutSuccessProps) {
  return (
    <div className={cn("flex flex-col items-center text-center", className)}>
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10">
        <svg className="h-10 w-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>

      <h1 className="mb-2 text-2xl font-bold text-foreground">Order Confirmed!</h1>
      <p className="mb-6 text-muted-foreground">
        Thank you for your purchase. Your order has been received.
      </p>

      <div className="mb-8 rounded-xl border border-border/50 bg-muted/30 px-6 py-4">
        <p className="text-sm text-muted-foreground">Order Number</p>
        <p className="font-mono text-lg font-bold text-foreground">{orderId}</p>
      </div>

      <div className="mb-8 rounded-xl border border-border/50 bg-muted/30 px-6 py-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span>
            A confirmation email will be sent to <span className="font-medium text-foreground">{email}</span>
          </span>
        </div>
      </div>

      <div className="mb-8 grid w-full max-w-md gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-border/50 bg-background p-4">
          <svg className="mx-auto mb-2 h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-xs text-muted-foreground">Order Confirmed</p>
        </div>
        <div className="rounded-xl border border-border/50 bg-background p-4">
          <svg className="mx-auto mb-2 h-6 w-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
          <p className="text-xs text-muted-foreground">Processing</p>
        </div>
        <div className="rounded-xl border border-border/50 bg-background p-4">
          <svg className="mx-auto mb-2 h-6 w-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-xs text-muted-foreground">Delivered</p>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Link href="/e-commerce">
          <Button variant="outline" size="lg">
            Continue Shopping
          </Button>
        </Link>
        <Button size="lg">
          Track Order
        </Button>
      </div>
    </div>
  );
}
