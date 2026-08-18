"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import {
  CreditCard,
  Lock,
  Check,
  Shield,
  AlertCircle,
  ChevronRight,
  Trash2,
  Plus,
  Wallet,
  Smartphone,
  Banknote,
} from "lucide-react";

const installCommand = `npx component-library@latest add credit-card-form`;
const usageCode = `import { CreditCardForm } from "@/components/credit-card-form";

<CreditCardForm onSubmit={(data) => processPayment(data)} />`;

function LiveCardPreviewDemo() {
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [flipped, setFlipped] = useState(false);

  const formatNumber = (v: string) => v.replace(/(\d{4})/g, "$1 ").trim().slice(0, 19);

  const cardType = (() => {
    const n = number.replace(/\s/g, "");
    if (n.startsWith("4")) return "visa";
    if (n.startsWith("5") || n.startsWith("2")) return "mastercard";
    if (n.startsWith("3")) return "amex";
    return null;
  })();

  return (
    <div className="w-full max-w-sm">
      <div className="rounded-xl border border-black/[.08] bg-card p-5 shadow-sm dark:border-white/[.145]">
        <div className="perspective-1000 relative mb-6" style={{ perspective: 1000 }}>
          <div
            className={`relative h-48 w-full transition-transform duration-500 [transform-style:preserve-3d] ${
              flipped ? "[transform:rotateY(180deg)]" : ""
            }`}
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 p-6 text-white shadow-xl [backface-visibility:hidden]">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
                  <CreditCard className="h-5 w-5" />
                </div>
                <div className="text-right">
                  {cardType === "visa" && <span className="text-lg font-bold italic">VISA</span>}
                  {cardType === "mastercard" && <span className="text-lg font-bold">MC</span>}
                  {cardType === "amex" && <span className="text-sm font-bold">AMEX</span>}
                  {!cardType && <span className="text-xs opacity-50">CARD</span>}
                </div>
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
                <div className="flex-1 rounded bg-zinc-500 px-3 py-2 text-right font-mono text-sm">
                  {flipped ? "\u2022\u2022\u2022" : "\u2022\u2022\u2022"}
                </div>
                <span className="text-[10px] opacity-50">CVV</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div>
            <label className="mb-1 block text-[10px] font-medium text-muted-foreground">Card Number</label>
            <input
              placeholder="4242 4242 4242 4242"
              value={number}
              onChange={(e) => setNumber(formatNumber(e.target.value.replace(/\D/g, "")))}
              className="w-full rounded-lg border border-black/[.08] bg-background px-3 py-2 font-mono text-sm dark:border-white/[.145]"
              maxLength={19}
            />
          </div>
          <div>
            <label className="mb-1 block text-[10px] font-medium text-muted-foreground">Cardholder Name</label>
            <input
              placeholder="JOHN DOE"
              value={name}
              onChange={(e) => setName(e.target.value.toUpperCase())}
              className="w-full rounded-lg border border-black/[.08] bg-background px-3 py-2 text-sm uppercase dark:border-white/[.145]"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-[10px] font-medium text-muted-foreground">Expiry</label>
              <input
                placeholder="MM/YY"
                value={expiry}
                onChange={(e) => {
                  let v = e.target.value.replace(/\D/g, "");
                  if (v.length > 2) v = v.slice(0, 2) + "/" + v.slice(2, 4);
                  setExpiry(v);
                }}
                className="w-full rounded-lg border border-black/[.08] bg-background px-3 py-2 font-mono text-sm dark:border-white/[.145]"
                maxLength={5}
              />
            </div>
            <div>
              <label className="mb-1 block text-[10px] font-medium text-muted-foreground">CVV</label>
              <input
                placeholder="123"
                className="w-full rounded-lg border border-black/[.08] bg-background px-3 py-2 font-mono text-sm dark:border-white/[.145]"
                maxLength={4}
                onFocus={() => setFlipped(true)}
                onBlur={() => setFlipped(false)}
              />
            </div>
          </div>
          <button className="mt-1 flex items-center justify-center gap-2 rounded-lg bg-foreground py-2.5 text-sm font-medium text-background hover:bg-foreground/90 transition-colors">
            <Lock className="h-3.5 w-3.5" />
            Pay $99.00
          </button>
          <div className="flex items-center justify-center gap-1.5 text-[10px] text-muted-foreground">
            <Shield className="h-3 w-3" />
            <span>Secured by Stripe</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function CardTypesDemo() {
  const types = [
    { name: "Visa", color: "bg-blue-600", text: "VISA", digits: "4" },
    { name: "Mastercard", color: "bg-gradient-to-r from-red-500 to-orange-500", text: "MC", digits: "5" },
    { name: "Amex", color: "bg-blue-500", text: "AMEX", digits: "3" },
    { name: "Discover", color: "bg-orange-500", text: "DISC", digits: "6" },
  ];
  return (
    <div className="flex flex-wrap gap-3">
      {types.map((t) => (
        <div key={t.name} className={`flex h-12 w-20 items-center justify-center rounded-xl ${t.color} text-xs font-bold text-white shadow-md`}>
          {t.text}
        </div>
      ))}
    </div>
  );
}

function ValidatedFieldsDemo() {
  const [valid, setValid] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const fields = [
    { name: "number", label: "Card Number", placeholder: "4242 4242 4242 4242", icon: CreditCard, validate: (v: string) => v.replace(/\s/g, "").length >= 16 },
    { name: "name", label: "Cardholder Name", placeholder: "John Doe", icon: CreditCard, validate: (v: string) => v.length >= 3 },
    { name: "expiry", label: "Expiry Date", placeholder: "12/25", icon: CreditCard, validate: (v: string) => /^\d{2}\/\d{2}$/.test(v) },
    { name: "cvv", label: "CVV", placeholder: "123", icon: Lock, validate: (v: string) => v.length >= 3 },
  ];

  const handleChange = (name: string, value: string) => {
    const field = fields.find((f) => f.name === name);
    const isValid = field?.validate(value) ?? false;
    setValid((v) => ({ ...v, [name]: isValid }));
    setErrors((e) => ({ ...e, [name]: isValid ? "" : value.length > 0 ? "Invalid input" : "" }));
  };

  return (
    <div className="w-full max-w-sm rounded-xl border border-black/[.08] bg-card p-5 shadow-sm dark:border-white/[.145]">
      <div className="mb-4 flex items-center gap-2">
        <Lock className="h-4 w-4" />
        <span className="text-sm font-semibold">Payment Details</span>
      </div>
      <div className="flex flex-col gap-3">
        {fields.map((f) => (
          <div key={f.name}>
            <label className="mb-1 block text-[10px] font-medium text-muted-foreground">{f.label}</label>
            <div className="relative">
              <input
                placeholder={f.placeholder}
                className={`w-full rounded-lg border bg-background px-3 py-2 pr-10 text-sm transition-colors ${
                  errors[f.name]
                    ? "border-red-500 focus:ring-red-500/20"
                    : valid[f.name]
                    ? "border-emerald-500 focus:ring-emerald-500/20"
                    : "border-black/[.08] dark:border-white/[.145]"
                }`}
                onChange={(e) => handleChange(f.name, e.target.value)}
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2">
                {valid[f.name] ? (
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                ) : errors[f.name] ? (
                  <AlertCircle className="h-4 w-4 text-red-500" />
                ) : null}
              </div>
            </div>
            {errors[f.name] && (
              <p className="mt-1 text-[10px] text-red-500">{errors[f.name]}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function CheckoutFormDemo() {
  const [step, setStep] = useState(1);

  return (
    <div className="w-full max-w-md">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
        <div className="border-b border-black/[.06] px-5 py-4 dark:border-white/[.1]">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold">Checkout</span>
            <div className="flex items-center gap-2">
              {[1, 2, 3].map((s) => (
                <div key={s} className={`h-1.5 w-8 rounded-full ${
                  s <= step ? "bg-foreground" : "bg-muted"
                }`} />
              ))}
            </div>
          </div>
        </div>
        <div className="p-5">
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-sm font-semibold">Contact Information</h3>
              <input placeholder="Email address" className="w-full rounded-lg border border-black/[.08] bg-background px-3 py-2 text-sm dark:border-white/[.145]" />
              <input placeholder="Phone number" className="w-full rounded-lg border border-black/[.08] bg-background px-3 py-2 text-sm dark:border-white/[.145]" />
            </div>
          )}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-sm font-semibold">Shipping Address</h3>
              <input placeholder="Full name" className="w-full rounded-lg border border-black/[.08] bg-background px-3 py-2 text-sm dark:border-white/[.145]" />
              <input placeholder="Address line 1" className="w-full rounded-lg border border-black/[.08] bg-background px-3 py-2 text-sm dark:border-white/[.145]" />
              <div className="grid grid-cols-2 gap-3">
                <input placeholder="City" className="rounded-lg border border-black/[.08] bg-background px-3 py-2 text-sm dark:border-white/[.145]" />
                <input placeholder="ZIP code" className="rounded-lg border border-black/[.08] bg-background px-3 py-2 text-sm dark:border-white/[.145]" />
              </div>
            </div>
          )}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-sm font-semibold">Payment</h3>
              <input placeholder="4242 4242 4242 4242" className="w-full rounded-lg border border-black/[.08] bg-background px-3 py-2 font-mono text-sm dark:border-white/[.145]" />
              <div className="grid grid-cols-2 gap-3">
                <input placeholder="MM/YY" className="rounded-lg border border-black/[.08] bg-background px-3 py-2 font-mono text-sm dark:border-white/[.145]" />
                <input placeholder="CVV" className="rounded-lg border border-black/[.08] bg-background px-3 py-2 font-mono text-sm dark:border-white/[.145]" />
              </div>
            </div>
          )}
        </div>
        <div className="border-t border-black/[.06] px-5 py-4 dark:border-white/[.1]">
          <button
            onClick={() => setStep((s) => Math.min(3, s + 1))}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-foreground py-2.5 text-sm font-medium text-background hover:bg-foreground/90 transition-colors"
          >
            {step === 3 ? (
              <>
                <Lock className="h-3.5 w-3.5" />
                Pay $149.00
              </>
            ) : (
              <>
                Continue
                <ChevronRight className="h-4 w-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

function PaymentMethodsDemo() {
  const [selected, setSelected] = useState("card");
  const methods = [
    { id: "card", label: "Credit Card", icon: CreditCard, desc: "Visa, Mastercard, Amex" },
    { id: "wallet", label: "Digital Wallet", icon: Wallet, desc: "Apple Pay, Google Pay" },
    { id: "bank", label: "Bank Transfer", icon: Banknote, desc: "Direct bank payment" },
    { id: "phone", label: "Mobile Payment", icon: Smartphone, desc: "Pay by phone" },
  ];

  return (
    <div className="w-full max-w-sm rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
      <div className="border-b border-black/[.06] px-4 py-3 dark:border-white/[.1]">
        <span className="text-sm font-semibold">Payment Method</span>
      </div>
      <div className="divide-y divide-black/[.06] dark:divide-white/[.08]">
        {methods.map((m) => (
          <button
            key={m.id}
            onClick={() => setSelected(m.id)}
            className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-colors ${
              selected === m.id ? "bg-muted/50" : "hover:bg-muted/30"
            }`}
          >
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
              selected === m.id ? "bg-foreground text-background" : "bg-muted text-muted-foreground"
            }`}>
              <m.icon className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{m.label}</p>
              <p className="text-[10px] text-muted-foreground">{m.desc}</p>
            </div>
            <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${
              selected === m.id ? "border-foreground" : "border-muted-foreground/30"
            }`}>
              {selected === m.id && <div className="h-2.5 w-2.5 rounded-full bg-foreground" />}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function SavedCardsDemo() {
  const [selected, setSelected] = useState("1");
  const cards = [
    { id: "1", type: "visa", last4: "4242", expiry: "12/25", isDefault: true },
    { id: "2", type: "mastercard", last4: "8888", expiry: "06/24", isDefault: false },
    { id: "3", type: "amex", last4: "1234", expiry: "03/26", isDefault: false },
  ];

  const typeColors: Record<string, string> = {
    visa: "bg-blue-600",
    mastercard: "bg-gradient-to-r from-red-500 to-orange-500",
    amex: "bg-blue-500",
  };

  return (
    <div className="w-full max-w-sm rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
      <div className="flex items-center justify-between border-b border-black/[.06] px-4 py-3 dark:border-white/[.1]">
        <span className="text-sm font-semibold">Saved Cards</span>
        <button className="flex items-center gap-1 rounded-lg bg-muted px-2.5 py-1 text-[10px] font-medium text-muted-foreground hover:bg-muted/80 transition-colors">
          <Plus className="h-3 w-3" />
          Add New
        </button>
      </div>
      <div className="divide-y divide-black/[.06] dark:divide-white/[.08]">
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => setSelected(card.id)}
            className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-colors ${
              selected === card.id ? "bg-muted/50" : "hover:bg-muted/30"
            }`}
          >
            <div className={`flex h-10 w-16 items-center justify-center rounded-lg ${typeColors[card.type]} text-[10px] font-bold text-white`}>
              {card.type.toUpperCase()}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">\u2022\u2022\u2022\u2022 {card.last4}</p>
              <p className="text-[10px] text-muted-foreground">Expires {card.expiry}</p>
            </div>
            {card.isDefault && (
              <span className="rounded-full bg-foreground px-2 py-0.5 text-[9px] font-bold text-background">DEFAULT</span>
            )}
            <Trash2 className="h-4 w-4 text-muted-foreground/40 hover:text-red-500 transition-colors" />
          </button>
        ))}
      </div>
    </div>
  );
}

function SubscriptionPlanDemo() {
  const [selected, setSelected] = useState("pro");
  const plans = [
    { id: "free", name: "Free", price: "$0", period: "forever", features: ["1 project", "1GB storage", "Community support"] },
    { id: "pro", name: "Pro", price: "$19", period: "/month", features: ["Unlimited projects", "100GB storage", "Priority support", "Advanced analytics"] },
    { id: "enterprise", name: "Enterprise", price: "$99", period: "/month", features: ["Everything in Pro", "Custom domain", "SSO authentication", "Dedicated support"] },
  ];

  return (
    <div className="w-full max-w-lg">
      <div className="grid grid-cols-3 gap-3">
        {plans.map((plan) => (
          <button
            key={plan.id}
            onClick={() => setSelected(plan.id)}
            className={`relative flex flex-col rounded-xl border p-4 text-left transition-all ${
              selected === plan.id
                ? "border-foreground bg-foreground text-background shadow-lg scale-[1.02]"
                : "border-black/[.08] bg-card hover:border-black/[.15] dark:border-white/[.145]"
            }`}
          >
            {plan.id === "pro" && (
              <span className="absolute -top-2.5 left-4 rounded-full bg-foreground px-2 py-0.5 text-[9px] font-bold text-background">
                POPULAR
              </span>
            )}
            <span className={`text-xs font-medium ${
              selected === plan.id ? "text-background/70" : "text-muted-foreground"
            }`}>{plan.name}</span>
            <div className="mt-2 flex items-baseline gap-0.5">
              <span className="text-2xl font-extrabold">{plan.price}</span>
              <span className={`text-xs ${
                selected === plan.id ? "text-background/60" : "text-muted-foreground"
              }`}>{plan.period}</span>
            </div>
            <div className="mt-3 space-y-1.5">
              {plan.features.map((f) => (
                <div key={f} className="flex items-center gap-1.5 text-[10px]">
                  <Check className={`h-3 w-3 ${
                    selected === plan.id ? "text-background/70" : "text-emerald-500"
                  }`} />
                  <span className={selected === plan.id ? "" : "text-muted-foreground"}>{f}</span>
                </div>
              ))}
            </div>
          </button>
        ))}
      </div>
      <div className="mt-4 rounded-xl border border-black/[.08] bg-card p-4 shadow-sm dark:border-white/[.145]">
        <div className="flex items-center gap-3">
          <input placeholder="4242 4242 4242 4242" className="flex-1 rounded-lg border border-black/[.08] bg-background px-3 py-2 font-mono text-sm dark:border-white/[.145]" />
          <input placeholder="MM/YY" className="w-20 rounded-lg border border-black/[.08] bg-background px-3 py-2 font-mono text-sm dark:border-white/[.145]" />
          <input placeholder="CVV" className="w-16 rounded-lg border border-black/[.08] bg-background px-3 py-2 font-mono text-sm dark:border-white/[.145]" />
        </div>
        <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-foreground py-2.5 text-sm font-medium text-background hover:bg-foreground/90 transition-colors">
          <Lock className="h-3.5 w-3.5" />
          Subscribe to {plans.find((p) => p.id === selected)?.name} - {plans.find((p) => p.id === selected)?.price}{plans.find((p) => p.id === selected)?.period}
        </button>
      </div>
    </div>
  );
}

export default function CreditCardFormPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Credit Card Form
          </h1>
          <Badge variant="primary">Forms</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Credit card input form with live preview, card type detection, flip animation, and
          secure payment fields.
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Installation</h2>
        <CodeBlock code={installCommand} filename="Terminal" label="bash" variant="terminal" />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} filename="page.tsx" label="tsx" />
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Examples</h2>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Live Card Preview</h3>
          <p className="text-sm text-muted-foreground">
            Interactive card with flip animation, type detection, and real-time preview.
          </p>
          <ComponentPreview id="card-preview">
            <LiveCardPreviewDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Card Types</h3>
          <p className="text-sm text-muted-foreground">
            Supported card brand indicators.
          </p>
          <ComponentPreview id="card-types">
            <CardTypesDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Validated Fields</h3>
          <p className="text-sm text-muted-foreground">
            Form fields with real-time validation and error feedback.
          </p>
          <ComponentPreview id="card-validated">
            <ValidatedFieldsDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Checkout Form</h3>
          <p className="text-sm text-muted-foreground">
            Multi-step checkout with progress indicator.
          </p>
          <ComponentPreview id="card-checkout">
            <CheckoutFormDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Payment Methods</h3>
          <p className="text-sm text-muted-foreground">
            Payment method selector with radio buttons.
          </p>
          <ComponentPreview id="card-methods">
            <PaymentMethodsDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Saved Cards</h3>
          <p className="text-sm text-muted-foreground">
            List of saved payment methods with default badge.
          </p>
          <ComponentPreview id="card-saved">
            <SavedCardsDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Subscription Plan</h3>
          <p className="text-sm text-muted-foreground">
            Plan selector with card form for subscription payments.
          </p>
          <ComponentPreview id="card-subscription">
            <SubscriptionPlanDemo />
          </ComponentPreview>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left font-medium">Prop</th>
                <th className="px-4 py-3 text-left font-medium">Type</th>
                <th className="px-4 py-3 text-left font-medium">Default</th>
                <th className="px-4 py-3 text-left font-medium">Required</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">onSubmit</td>
                <td className="px-4 py-3 text-muted-foreground">{"(data: CardData) => void"}</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">showPreview</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">true</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">secure</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">true</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">className</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
