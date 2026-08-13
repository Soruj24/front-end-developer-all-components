"use client";

import { cn } from "@/lib/cn";
import type { CheckoutPayment } from "../types/checkout.types";

interface CheckoutExpressCheckoutProps {
  onExpressPayment: (payment: CheckoutPayment) => void;
  className?: string;
}

const EXPRESS_METHODS = [
  {
    id: "apple-pay" as const,
    label: "Apple Pay",
    bg: "bg-black text-white hover:bg-black/90",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
      </svg>
    ),
  },
  {
    id: "google-pay" as const,
    label: "Google Pay",
    bg: "bg-white text-foreground border border-border hover:bg-muted",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24">
        <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z" fill="#4285F4" />
      </svg>
    ),
  },
  {
    id: "paypal" as const,
    label: "PayPal",
    bg: "bg-[#0070ba] text-white hover:bg-[#005ea6]",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106z" />
      </svg>
    ),
  },
];

export function CheckoutExpressCheckout({
  onExpressPayment,
  className,
}: CheckoutExpressCheckoutProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border/50" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-background px-3 text-muted-foreground">or checkout with</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {EXPRESS_METHODS.map((method) => (
          <button
            key={method.id}
            onClick={() =>
              onExpressPayment({
                method: method.id,
                cardNumber: "",
                cardName: "",
                expiry: "",
                cvv: "",
              })
            }
            className={cn(
              "flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition-all",
              method.bg
            )}
          >
            {method.icon}
            <span className="hidden sm:inline">{method.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
