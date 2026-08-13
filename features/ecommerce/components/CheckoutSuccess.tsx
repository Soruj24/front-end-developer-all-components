"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { Button } from "@/components/design-system/Button";

interface CheckoutSuccessProps {
  orderId: string;
  email: string;
  className?: string;
}

const CONFETTI_COLORS = [
  "bg-primary",
  "bg-green-500",
  "bg-blue-500",
  "bg-yellow-400",
  "bg-purple-500",
  "bg-pink-500",
];

function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

function Confetti() {
  const pieces = useMemo(
    () =>
      Array.from({ length: 40 }, (_, i) => ({
        id: i,
        left: `${seededRandom(i * 7 + 1) * 100}%`,
        delay: `${seededRandom(i * 13 + 3) * 0.5}s`,
        color: CONFETTI_COLORS[Math.floor(seededRandom(i * 11 + 5) * CONFETTI_COLORS.length)],
        size: `${seededRandom(i * 17 + 7) * 6 + 4}px`,
        round: seededRandom(i * 19 + 9) > 0.5,
      })),
    []
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {pieces.map((p) => (
        <div
          key={p.id}
          className={cn("confetti-piece absolute top-0", p.color)}
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            animationDelay: p.delay,
            borderRadius: p.round ? "50%" : "2px",
          }}
        />
      ))}
    </div>
  );
}

const ORDER_TIMELINE = [
  { label: "Order Placed", description: "We received your order", icon: "check" },
  { label: "Processing", description: "Preparing your items", icon: "package" },
  { label: "Shipped", description: "On its way to you", icon: "truck" },
  { label: "Delivered", description: "Enjoy your purchase!", icon: "home" },
];

export function CheckoutSuccess({ orderId, email, className }: CheckoutSuccessProps) {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const estimatedDate = new Date();
  estimatedDate.setDate(estimatedDate.getDate() + 5);
  const formattedDate = estimatedDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className={cn("flex flex-col items-center text-center", className)}>
      {showConfetti && <Confetti />}

      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10">
        <svg className="h-10 w-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>

      <h1 className="mb-2 text-2xl font-bold text-foreground">Order Confirmed!</h1>
      <p className="mb-6 text-muted-foreground">
        Thank you for your purchase. Your order has been received.
      </p>

      <div className="mb-6 rounded-xl border border-border/50 bg-muted/30 px-6 py-4">
        <p className="text-sm text-muted-foreground">Order Number</p>
        <p className="font-mono text-lg font-bold text-foreground">{orderId}</p>
      </div>

      {email && (
        <div className="mb-6 rounded-xl border border-border/50 bg-muted/30 px-6 py-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>
              Confirmation sent to <span className="font-medium text-foreground">{email}</span>
            </span>
          </div>
        </div>
      )}

      <div className="mb-8 w-full max-w-lg">
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Estimated Delivery
        </h3>
        <div className="rounded-xl border border-border/50 bg-background p-4">
          <p className="font-medium text-foreground">{formattedDate}</p>
          <p className="text-sm text-muted-foreground">
            You&apos;ll receive tracking updates via email
          </p>
        </div>
      </div>

      <div className="mb-8 w-full max-w-lg">
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          What Happens Next
        </h3>
        <div className="relative">
          <div className="absolute left-[15px] top-0 h-full w-0.5 bg-border" />
          <div className="space-y-4">
            {ORDER_TIMELINE.map((step, index) => (
              <div key={step.label} className="relative flex items-start gap-4">
                <div
                  className={cn(
                    "relative z-10 flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full border-2",
                    index === 0
                      ? "border-green-500 bg-green-500 text-white"
                      : "border-border bg-background text-muted-foreground"
                  )}
                >
                  {index === 0 ? (
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <span className="text-xs font-semibold">{index + 1}</span>
                  )}
                </div>
                <div className="flex-1 pt-0.5">
                  <p className={cn("text-sm font-medium", index === 0 ? "text-green-600" : "text-foreground")}>
                    {step.label}
                  </p>
                  <p className="text-xs text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/e-commerce">
          <Button variant="outline" size="lg">
            Continue Shopping
          </Button>
        </Link>
        <Link href="/e-commerce/tracking">
          <Button size="lg">
            Track Order
          </Button>
        </Link>
      </div>

      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span>Secure</span>
        </div>
        <div className="flex items-center gap-1">
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <span>Buyer Protection</span>
        </div>
        <div className="flex items-center gap-1">
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
          <span>Secure Payment</span>
        </div>
      </div>
    </div>
  );
}
