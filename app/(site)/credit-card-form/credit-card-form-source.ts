export const CREDIT_CARD_FORM_SOURCE = `"use client";

import { useState } from "react";
import { CreditCard, Lock, Shield } from "lucide-react";

interface CardFormData {
  number: string;
  name: string;
  expiry: string;
  cvv: string;
}

interface CreditCardFormProps {
  onSubmit?: (data: CardFormData) => void;
  showPreview?: boolean;
  className?: string;
}

const formatNumber = (value: string) =>
  value.replace(/\\D/g, "").replace(/(\\d{4})/g, "$1 ").trim().slice(0, 19);

const formatExpiry = (value: string) => {
  const digits = value.replace(/\\D/g, "").slice(0, 4);
  return digits.length > 2 ? digits.slice(0, 2) + "/" + digits.slice(2) : digits;
};

export function CreditCardForm({ onSubmit, showPreview = true, className = "" }: CreditCardFormProps) {
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [flipped, setFlipped] = useState(false);

  const digits = number.replace(/\\s/g, "");
  const brand = digits.startsWith("4") ? "VISA" : digits.startsWith("5") ? "MC" : digits.startsWith("3") ? "AMEX" : "CARD";

  const submit = () => onSubmit?.({ number, name, expiry, cvv });

  return (
    <div className={"w-full max-w-sm " + className}>
      {showPreview && (
        <div className="relative mb-6" style={{ perspective: 1000 }}>
          <div className={"relative h-48 w-full transition-transform duration-500 [transform-style:preserve-3d] " + (flipped ? "[transform:rotateY(180deg)]" : "")}>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 p-6 text-white shadow-xl [backface-visibility:hidden]">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                  <CreditCard className="h-5 w-5" />
                </div>
                <span className="text-lg font-bold italic">{brand}</span>
              </div>
              <div className="mt-6 font-mono text-xl tracking-[0.2em]">
                {number || "\u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022"}
              </div>
              <div className="mt-4 flex justify-between text-xs">
                <div>
                  <span className="text-[9px] uppercase opacity-50">Cardholder</span>
                  <p className="mt-0.5 font-medium tracking-wide">{name || "YOUR NAME"}</p>
                </div>
                <div className="text-right">
                  <span className="text-[9px] uppercase opacity-50">Expires</span>
                  <p className="mt-0.5 font-medium tracking-wide">{expiry || "MM/YY"}</p>
                </div>
              </div>
            </div>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-zinc-700 to-zinc-800 p-6 text-white shadow-xl [backface-visibility:hidden] [transform:rotateY(180deg)]">
              <div className="mt-6 h-10 bg-zinc-600" />
              <div className="mt-4 flex items-center gap-3">
                <div className="flex-1 rounded bg-zinc-500 px-3 py-2 text-right font-mono text-sm">{cvv || "\u2022\u2022\u2022"}</div>
                <span className="text-[10px] opacity-50">CVV</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-3">
        <div>
          <label className="mb-1 block text-[10px] font-medium text-muted-foreground">Card Number</label>
          <input
            value={number}
            onChange={(e) => setNumber(formatNumber(e.target.value))}
            placeholder="4242 4242 4242 4242"
            className="w-full rounded-lg border border-black/[.08] bg-background px-3 py-2 font-mono text-sm dark:border-white/[.145]"
          />
        </div>
        <div>
          <label className="mb-1 block text-[10px] font-medium text-muted-foreground">Cardholder Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value.toUpperCase())}
            placeholder="JOHN DOE"
            className="w-full rounded-lg border border-black/[.08] bg-background px-3 py-2 text-sm uppercase dark:border-white/[.145]"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-[10px] font-medium text-muted-foreground">Expiry</label>
            <input
              value={expiry}
              onChange={(e) => setExpiry(formatExpiry(e.target.value))}
              placeholder="MM/YY"
              className="w-full rounded-lg border border-black/[.08] bg-background px-3 py-2 font-mono text-sm dark:border-white/[.145]"
            />
          </div>
          <div>
            <label className="mb-1 block text-[10px] font-medium text-muted-foreground">CVV</label>
            <input
              value={cvv}
              onChange={(e) => setCvv(e.target.value.replace(/\\D/g, "").slice(0, 4))}
              placeholder="123"
              onFocus={() => setFlipped(true)}
              onBlur={() => setFlipped(false)}
              className="w-full rounded-lg border border-black/[.08] bg-background px-3 py-2 font-mono text-sm dark:border-white/[.145]"
            />
          </div>
        </div>
        <button type="button" onClick={submit} className="mt-1 flex items-center justify-center gap-2 rounded-lg bg-foreground py-2.5 text-sm font-medium text-background hover:bg-foreground/90 transition-colors">
          <Lock className="h-3.5 w-3.5" />
          Pay $99.00
        </button>
        <div className="flex items-center justify-center gap-1.5 text-[10px] text-muted-foreground">
          <Shield className="h-3 w-3" />
          <span>Secured by Stripe</span>
        </div>
      </div>
    </div>
  );
}`;

export const LIVE_PREVIEW_EXAMPLE = `<CreditCardForm
  onSubmit={(data) => processPayment(data)}
  showPreview
/>`;

export const CARD_TYPES_EXAMPLE = `<div className="flex flex-wrap gap-3">
  <div className="flex h-12 w-20 items-center justify-center rounded-xl bg-blue-600 text-xs font-bold text-white">VISA</div>
  <div className="flex h-12 w-20 items-center justify-center rounded-xl bg-gradient-to-r from-red-500 to-orange-500 text-xs font-bold text-white">MC</div>
  <div className="flex h-12 w-20 items-center justify-center rounded-xl bg-blue-500 text-xs font-bold text-white">AMEX</div>
</div>`;

export const VALIDATED_EXAMPLE = `<div className="relative">
  <input
    value={number}
    onChange={(e) => setNumber(formatNumber(e.target.value))}
    placeholder="4242 4242 4242 4242"
    className="w-full rounded-lg border px-3 py-2 font-mono text-sm"
  />
  {isValid && <Check className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-500" />}
</div>`;

export const CHECKOUT_EXAMPLE = `<div className="flex items-center gap-2">
  {[1, 2, 3].map((s) => (
    <div key={s} className={"h-1.5 w-8 rounded-full " + (s <= step ? "bg-foreground" : "bg-muted")} />
  ))}
</div>`;

export const METHODS_EXAMPLE = `<button className="flex w-full items-center gap-3 px-4 py-3 text-left">
  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
    <CreditCard className="h-5 w-5" />
  </div>
  <div className="flex-1">
    <p className="text-sm font-medium">Credit Card</p>
    <p className="text-[10px] text-muted-foreground">Visa, Mastercard, Amex</p>
  </div>
</button>`;

export const SAVED_EXAMPLE = `<div className="flex items-center gap-3 px-4 py-3">
  <div className="flex h-10 w-16 items-center justify-center rounded-lg bg-blue-600 text-[10px] font-bold text-white">VISA</div>
  <p className="text-sm font-medium">•••• 4242</p>
  <span className="ml-auto rounded-full bg-foreground px-2 py-0.5 text-[9px] font-bold text-background">DEFAULT</span>
</div>`;

export const SUBSCRIPTION_EXAMPLE = `<CreditCardForm
  onSubmit={(data) => subscribe(plan.id, data)}
  className="mt-4"
/>`;