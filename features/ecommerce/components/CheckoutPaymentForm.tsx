"use client";

import { useState, useMemo } from "react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/design-system/Button";
import type { CheckoutPayment } from "../types/checkout.types";
import {
  detectCardBrand,
  formatCardNumber,
  formatExpiry,
  luhnCheck,
  isExpiredDate,
  getCvvLength,
  BRAND_LABELS,
  type CardBrand,
} from "../utils/card";

interface CheckoutPaymentFormProps {
  initialPayment?: CheckoutPayment | null;
  onPaymentSubmit: (payment: CheckoutPayment) => void;
  onNext: () => void;
  onBack: () => void;
  className?: string;
}

const PAYMENT_METHODS = [
  { id: "card" as const, label: "Credit/Debit Card" },
  { id: "paypal" as const, label: "PayPal" },
  { id: "apple-pay" as const, label: "Apple Pay" },
  { id: "google-pay" as const, label: "Google Pay" },
];

function CardBrandIcon({ brand }: { brand: CardBrand }) {
  const colors: Record<CardBrand, string> = {
    visa: "text-blue-600",
    mastercard: "text-orange-500",
    amex: "text-blue-500",
    discover: "text-orange-600",
    diners: "text-blue-700",
    jcb: "text-green-600",
    unknown: "text-muted-foreground",
  };

  return (
    <div className={cn("flex items-center gap-1.5", colors[brand])}>
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />
      </svg>
      <span className="text-xs font-medium">{BRAND_LABELS[brand]}</span>
    </div>
  );
}

function PaymentMethodIcon({ method }: { method: string }) {
  if (method === "paypal") {
    return (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106z" />
      </svg>
    );
  }
  if (method === "apple-pay") {
    return (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
      </svg>
    );
  }
  if (method === "google-pay") {
    return (
      <svg className="h-6 w-6" viewBox="0 0 24 24">
        <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z" fill="#4285F4" />
      </svg>
    );
  }
  return (
    <svg className="h-6 w-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
    </svg>
  );
}

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
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const brand = useMemo(
    () => detectCardBrand(payment.cardNumber),
    [payment.cardNumber]
  );

  const cvvLength = useMemo(() => getCvvLength(brand), [brand]);

  const cardValid = useMemo(() => {
    const cleaned = payment.cardNumber.replace(/\s/g, "");
    return cleaned.length >= 13 && luhnCheck(cleaned);
  }, [payment.cardNumber]);

  const expiryValid = useMemo(() => {
    if (payment.expiry.length < 5) return false;
    return !isExpiredDate(payment.expiry);
  }, [payment.expiry]);

  const update = (field: keyof CheckoutPayment, value: string | boolean) => {
    setPayment((prev) => ({ ...prev, [field]: value }));
    setTouched((prev) => ({ ...prev, [field]: true }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validate = () => {
    if (payment.method !== "card") return true;

    const newErrors: Record<string, string> = {};
    const cardNum = payment.cardNumber.replace(/\s/g, "");
    if (!cardNum || cardNum.length < 13) newErrors.cardNumber = "Card number is too short";
    else if (!luhnCheck(cardNum)) newErrors.cardNumber = "Invalid card number";
    if (!payment.cardName.trim()) newErrors.cardName = "Cardholder name is required";
    if (!payment.expiry || payment.expiry.length < 5) newErrors.expiry = "Invalid date";
    else if (isExpiredDate(payment.expiry)) newErrors.expiry = "Card has expired";
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
  const validClass = "border-green-500 focus:border-green-500 focus:ring-green-500";

  return (
    <div className={cn("space-y-6", className)}>
      <div>
        <h2 className="text-lg font-semibold text-foreground">Payment Method</h2>
        <p className="text-sm text-muted-foreground">Choose how you&apos;d like to pay</p>
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
            <PaymentMethodIcon method={method.id} />
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
                className={cn(
                  inputClass,
                  "pr-24",
                  errors.cardNumber && touched.cardNumber && errorClass,
                  cardValid && validClass
                )}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
                autoComplete="cc-number"
              />
              <div className="absolute right-3 top-1/2 flex items-center gap-2 -translate-y-1/2">
                {brand !== "unknown" && <CardBrandIcon brand={brand} />}
                {cardValid && (
                  <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
              </div>
            </div>
            {errors.cardNumber && touched.cardNumber && (
              <p className="mt-1 text-xs text-red-500">{errors.cardNumber}</p>
            )}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              Name on Card <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={payment.cardName}
              onChange={(e) => update("cardName", e.target.value)}
              className={cn(
                inputClass,
                errors.cardName && touched.cardName && errorClass
              )}
              placeholder="John Doe"
              autoComplete="cc-name"
            />
            {errors.cardName && touched.cardName && (
              <p className="mt-1 text-xs text-red-500">{errors.cardName}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                Expiry Date <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={payment.expiry}
                  onChange={(e) => update("expiry", formatExpiry(e.target.value))}
                  className={cn(
                    inputClass,
                    "pr-8",
                    errors.expiry && touched.expiry && errorClass,
                    expiryValid && validClass
                  )}
                  placeholder="MM/YY"
                  maxLength={5}
                  autoComplete="cc-exp"
                />
                {expiryValid && (
                  <svg className="absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              {errors.expiry && touched.expiry && (
                <p className="mt-1 text-xs text-red-500">{errors.expiry}</p>
              )}
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                CVV <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={payment.cvv}
                onChange={(e) => update("cvv", e.target.value.replace(/\D/g, ""))}
                className={cn(inputClass, errors.cvv && touched.cvv && errorClass)}
                placeholder={brand === "amex" ? "1234" : "123"}
                maxLength={cvvLength}
                autoComplete="cc-csc"
              />
              {errors.cvv && touched.cvv && (
                <p className="mt-1 text-xs text-red-500">{errors.cvv}</p>
              )}
              <p className="mt-1 text-xs text-muted-foreground">
                {brand === "amex" ? "4 digits on front" : "3 digits on back"}
              </p>
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
          <div className="mb-3 flex justify-center text-blue-600">
            <svg className="h-10 w-10" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106z" />
            </svg>
          </div>
          <p className="text-sm text-muted-foreground">
            You will be redirected to PayPal to complete your purchase securely.
          </p>
        </div>
      )}

      {payment.method === "apple-pay" && (
        <div className="rounded-xl border border-border/50 bg-muted/20 p-6 text-center">
          <div className="mb-3 flex justify-center">
            <svg className="h-10 w-10" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
            </svg>
          </div>
          <p className="text-sm text-muted-foreground">
            Click &quot;Continue to Review&quot; to complete your purchase with Apple Pay.
          </p>
        </div>
      )}

      {payment.method === "google-pay" && (
        <div className="rounded-xl border border-border/50 bg-muted/20 p-6 text-center">
          <div className="mb-3 flex justify-center">
            <svg className="h-10 w-10" viewBox="0 0 24 24">
              <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z" fill="#4285F4" />
            </svg>
          </div>
          <p className="text-sm text-muted-foreground">
            Click &quot;Continue to Review&quot; to complete your purchase with Google Pay.
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
