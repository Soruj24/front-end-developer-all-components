"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";
import { Button } from "@/components/design-system/Button";
import type { CheckoutAddress, CheckoutPayment, CheckoutShippingMethod } from "../types/checkout.types";
import type { CartItem } from "../types/ecommerce.types";

interface CheckoutReviewStepProps {
  items: CartItem[];
  shippingAddress: CheckoutAddress;
  billingAddress: CheckoutAddress | null;
  shippingMethod: CheckoutShippingMethod;
  payment: CheckoutPayment;
  subtotal: number;
  shippingCost: number;
  tax: number;
  discount: number;
  total: number;
  notes: string;
  isProcessing: boolean;
  onNotesChange: (notes: string) => void;
  onPlaceOrder: () => void;
  onBack: () => void;
  className?: string;
}

function Section({
  title,
  onEdit,
  children,
}: {
  title: string;
  onEdit?: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border/50 bg-muted/20 p-4">
      <div className="mb-2 flex items-center justify-between">
        <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          {title}
        </h4>
        {onEdit && (
          <button
            onClick={onEdit}
            className="text-xs font-medium text-primary hover:underline"
          >
            Edit
          </button>
        )}
      </div>
      {children}
    </div>
  );
}

export function CheckoutReviewStep({
  items,
  shippingAddress,
  billingAddress,
  shippingMethod,
  payment,
  subtotal,
  shippingCost,
  tax,
  discount,
  total,
  notes,
  isProcessing,
  onNotesChange,
  onPlaceOrder,
  onBack,
  className,
}: CheckoutReviewStepProps) {
  const [showItems, setShowItems] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const maskCard = (num: string) => {
    const cleaned = num.replace(/\s/g, "");
    return "\u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 " + cleaned.slice(-4);
  };

  return (
    <div className={cn("space-y-6", className)}>
      <div>
        <h2 className="text-lg font-semibold text-foreground">Review Your Order</h2>
        <p className="text-sm text-muted-foreground">Please verify all details before placing your order</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Section title="Shipping Address">
          <p className="text-sm font-medium text-foreground">
            {shippingAddress.firstName} {shippingAddress.lastName}
          </p>
          <p className="text-sm text-muted-foreground">{shippingAddress.address1}</p>
          {shippingAddress.address2 && (
            <p className="text-sm text-muted-foreground">{shippingAddress.address2}</p>
          )}
          <p className="text-sm text-muted-foreground">
            {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}
          </p>
          <p className="text-sm text-muted-foreground">{shippingAddress.country}</p>
          <p className="mt-2 text-sm text-muted-foreground">{shippingAddress.email}</p>
          {shippingAddress.phone && (
            <p className="text-sm text-muted-foreground">{shippingAddress.phone}</p>
          )}
        </Section>

        <Section title={billingAddress ? "Billing Address" : "Payment"}>
          {billingAddress ? (
            <>
              <p className="text-sm font-medium text-foreground">
                {billingAddress.firstName} {billingAddress.lastName}
              </p>
              <p className="text-sm text-muted-foreground">{billingAddress.address1}</p>
              <p className="text-sm text-muted-foreground">
                {billingAddress.city}, {billingAddress.state} {billingAddress.zipCode}
              </p>
            </>
          ) : (
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <svg className="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                <span className="text-sm font-medium text-foreground capitalize">
                  {payment.method === "card" ? "Credit Card" : payment.method.replace("-", " ")}
                </span>
              </div>
              {payment.method === "card" && (
                <p className="text-sm text-muted-foreground">
                  {maskCard(payment.cardNumber)}
                </p>
              )}
            </div>
          )}
        </Section>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Section title="Shipping Method">
          <p className="text-sm font-medium text-foreground">{shippingMethod.name}</p>
          <p className="text-sm text-muted-foreground">{shippingMethod.estimatedDays}</p>
          <p className="mt-1 text-sm font-medium text-foreground">
            {shippingMethod.price === 0 ? (
              <span className="text-green-600">Free</span>
            ) : (
              `$${shippingMethod.price.toFixed(2)}`
            )}
          </p>
        </Section>

        <Section title="Order Items">
          <button
            onClick={() => setShowItems(!showItems)}
            className="flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            <span>{items.length} item{items.length !== 1 ? "s" : ""}</span>
            <svg
              className={cn("h-4 w-4 transition-transform", showItems && "rotate-180")}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {showItems && (
            <div className="mt-3 space-y-3">
              {items.map((item) => (
                <div key={item.product.id} className="flex items-center gap-3">
                  <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-muted/30">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.title}
                      fill
                      className="object-cover"
                      sizes="40px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-foreground line-clamp-1">
                      {item.product.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="text-xs font-medium text-foreground">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </Section>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-foreground">
          Order Notes (optional)
        </label>
        <textarea
          value={notes}
          onChange={(e) => onNotesChange(e.target.value)}
          className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary"
          rows={2}
          placeholder="Special instructions for delivery..."
          maxLength={500}
        />
        <p className="mt-1 text-right text-xs text-muted-foreground">
          {notes.length}/500
        </p>
      </div>

      <div className="rounded-xl border border-border/50 bg-muted/20 p-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal ({items.length} items)</span>
            <span className="font-medium text-foreground">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Shipping</span>
            <span className="font-medium text-foreground">
              {shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Tax</span>
            <span className="font-medium text-foreground">${tax.toFixed(2)}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-sm text-green-600">
              <span>Discount</span>
              <span className="font-medium">-${discount.toFixed(2)}</span>
            </div>
          )}
          <div className="border-t border-border/50 pt-2">
            <div className="flex justify-between">
              <span className="font-semibold text-foreground">Total</span>
              <span className="text-xl font-bold text-foreground">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-start gap-2">
        <input
          type="checkbox"
          id="agreeTerms"
          checked={agreedToTerms}
          onChange={(e) => setAgreedToTerms(e.target.checked)}
          className="mt-0.5 accent-primary"
        />
        <label htmlFor="agreeTerms" className="text-sm text-muted-foreground">
          I agree to the{" "}
          <span className="font-medium text-foreground hover:underline cursor-pointer">
            Terms of Service
          </span>{" "}
          and{" "}
          <span className="font-medium text-foreground hover:underline cursor-pointer">
            Privacy Policy
          </span>
        </label>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={onBack} size="lg" className="flex-1" disabled={isProcessing}>
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </Button>
        <Button
          onClick={onPlaceOrder}
          size="lg"
          className="flex-1"
          disabled={!agreedToTerms || isProcessing}
        >
          {isProcessing ? (
            <>
              <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Processing...
            </>
          ) : (
            <>
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Place Order - ${total.toFixed(2)}
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
