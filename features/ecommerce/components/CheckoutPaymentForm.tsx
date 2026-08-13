"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/design-system/Button";
import type { CheckoutPayment } from "../types/checkout.types";

interface CheckoutPaymentFormProps {
  initialPayment?: CheckoutPayment | null;
  onPaymentSubmit: (payment: CheckoutPayment) => void;
  onNext: () => void;
  onBack: () => void;
  className?: string;
}

const PAYMENT_METHODS = [
  { id: "card" as const, label: "Credit/Debit Card", icon: "💳" },
  { id: "paypal" as const, label: "PayPal", icon: "🅿️" },
  { id: "apple-pay" as const, label: "Apple Pay", icon: "🍎" },
  { id: "google-pay" as const, label: "Google Pay", icon: "🔵" },
];

export function CheckoutPaymentForm({
  initialPayment,
  onPaymentSubmit,
  onNext,
  onBack,
  className,
}: CheckoutPaymentFormProps) {
  const [payment, setPayment] = useState<CheckoutPayment>(
    initialPayment || {
      method: "card",
      cardNumber: "",
      cardName: "",
      expiry: "",
      cvv: "",
    }
  );

  const [errors, setErrors] = useState<Record<string, string>>({});

  const update = (field: keyof CheckoutPayment, value: string | boolean) => {
    setPayment((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(" ") : value;
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4);
    }
    return v;
  };

  const validate = () => {
    if (payment.method !== "card") return true;

    const newErrors: Record<string, string> = {};
    const cardNum = payment.cardNumber.replace(/\s/g, "");
    if (!cardNum || cardNum.length < 16) newErrors.cardNumber = "Invalid card number";
    if (!payment.cardName.trim()) newErrors.cardName = "Required";
    if (!payment.expiry || payment.expiry.length < 5) newErrors.expiry = "Invalid date";
    if (!payment.cvv || payment.cvv.length < 3) newErrors.cvv = "Invalid CVV";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onPaymentSubmit(payment);
      onNext();
    }
  };

  const inputClass = cn(
    "w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition-colors",
    "placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary"
  );

  const errorClass = "border-red-500 focus:border-red-500 focus:ring-red-500";

  return (
    <div className={cn("space-y-6", className)}>
      <div>
        <h2 className="text-lg font-semibold text-foreground">Payment Method</h2>
        <p className="text-sm text-muted-foreground">Choose how you'd like to pay</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {PAYMENT_METHODS.map((method) => (
          <button
            key={method.id}
            onClick={() => update("method", method.id)}
            className={cn(
              "flex items-center gap-3 rounded-xl border p-4 text-left transition-all",
              payment.method === method.id
                ? "border-primary bg-primary/5 shadow-sm"
                : "border-border/50 hover:border-border"
            )}
          >
            <span className="text-2xl">{method.icon}</span>
            <span className="font-medium text-foreground">{method.label}</span>
          </button>
        ))}
      </div>

      {payment.method === "card" && (
        <div className="space-y-4 rounded-xl border border-border/50 bg-muted/20 p-5">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              Card Number <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={payment.cardNumber}
                onChange={(e) => update("cardNumber", formatCardNumber(e.target.value))}
                className={cn(inputClass, "pr-12", errors.cardNumber && errorClass)}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <svg className="h-6 w-6 text-muted-foreground/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
            </div>
            {errors.cardNumber && <p className="mt-1 text-xs text-red-500">{errors.cardNumber}</p>}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              Name on Card <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={payment.cardName}
              onChange={(e) => update("cardName", e.target.value)}
              className={cn(inputClass, errors.cardName && errorClass)}
              placeholder="John Doe"
            />
            {errors.cardName && <p className="mt-1 text-xs text-red-500">{errors.cardName}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                Expiry Date <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={payment.expiry}
                onChange={(e) => update("expiry", formatExpiry(e.target.value))}
                className={cn(inputClass, errors.expiry && errorClass)}
                placeholder="MM/YY"
                maxLength={5}
              />
              {errors.expiry && <p className="mt-1 text-xs text-red-500">{errors.expiry}</p>}
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                CVV <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={payment.cvv}
                onChange={(e) => update("cvv", e.target.value.replace(/\D/g, ""))}
                className={cn(inputClass, errors.cvv && errorClass)}
                placeholder="123"
                maxLength={4}
              />
              {errors.cvv && <p className="mt-1 text-xs text-red-500">{errors.cvv}</p>}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="saveCard"
              checked={payment.saveCard || false}
              onChange={(e) => update("saveCard", e.target.checked)}
              className="accent-primary"
            />
            <label htmlFor="saveCard" className="text-sm text-muted-foreground">
              Save card for future purchases
            </label>
          </div>
        </div>
      )}

      {payment.method === "paypal" && (
        <div className="rounded-xl border border-border/50 bg-muted/20 p-6 text-center">
          <p className="text-sm text-muted-foreground">
            You will be redirected to PayPal to complete your purchase securely.
          </p>
        </div>
      )}

      {(payment.method === "apple-pay" || payment.method === "google-pay") && (
        <div className="rounded-xl border border-border/50 bg-muted/20 p-6 text-center">
          <p className="text-sm text-muted-foreground">
            Click "Continue to Review" to complete your purchase with {payment.method === "apple-pay" ? "Apple Pay" : "Google Pay"}.
          </p>
        </div>
      )}

      <div className="flex gap-3">
        <Button variant="outline" onClick={onBack} size="lg" className="flex-1">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </Button>
        <Button onClick={handleSubmit} size="lg" className="flex-1">
          Continue to Review
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Button>
      </div>
    </div>
  );
}
