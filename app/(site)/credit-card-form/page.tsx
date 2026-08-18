"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { CreditCard, Lock, Check } from "lucide-react";

const installCommand = `npx component-library@latest add credit-card-form`;
const usageCode = `import { CreditCardForm } from "@/components/credit-card-form";

<CreditCardForm onSubmit={(data) => processPayment(data)} />`;

function CardPreviewDemo() {
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [flipped, setFlipped] = useState(false);

  const formatNumber = (v: string) => v.replace(/(\d{4})/g, "$1 ").trim().slice(0, 19);

  return (
    <div className="flex flex-col gap-4 w-full max-w-sm">
      <div className="perspective-1000 relative h-48 w-full" style={{ perspective: 1000 }}>
        <div className={`relative h-full w-full transition-transform duration-500 ${flipped ? "rotate-y-180" : ""}`} style={{ transformStyle: "preserve-3d" }}>
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-600 to-purple-700 p-6 text-white shadow-xl" style={{ backfaceVisibility: "hidden" }}>
            <div className="flex items-center justify-between">
              <CreditCard className="h-8 w-8" />
              <span className="text-xs opacity-70">VISA</span>
            </div>
            <div className="mt-6 font-mono text-lg tracking-widest">{number || "•••• •••• •••• ••••"}</div>
            <div className="mt-4 flex justify-between text-xs">
              <span className="opacity-70">{name || "CARDHOLDER NAME"}</span>
              <span className="opacity-70">{expiry || "MM/YY"}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <input placeholder="Card number" value={number} onChange={(e) => setNumber(formatNumber(e.target.value.replace(/\D/g, "")))} className="rounded-lg border bg-background px-3 py-2 text-sm font-mono" maxLength={19} />
        <input placeholder="Cardholder name" value={name} onChange={(e) => setName(e.target.value.toUpperCase())} className="rounded-lg border bg-background px-3 py-2 text-sm" />
        <div className="flex gap-2">
          <input placeholder="MM/YY" value={expiry} onChange={(e) => { let v = e.target.value.replace(/\D/g, ""); if (v.length > 2) v = v.slice(0, 2) + "/" + v.slice(2, 4); setExpiry(v); }} className="flex-1 rounded-lg border bg-background px-3 py-2 text-sm font-mono" maxLength={5} />
          <input placeholder="CVV" className="flex-1 rounded-lg border bg-background px-3 py-2 text-sm font-mono" maxLength={4} onFocus={() => setFlipped(true)} onBlur={() => setFlipped(false)} />
        </div>
        <button className="flex items-center justify-center gap-2 rounded-lg bg-primary py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          <Lock className="h-3.5 w-3.5" /> Pay Securely
        </button>
      </div>
    </div>
  );
}

function CardTypeDemo() {
  const types = [
    { name: "Visa", color: "bg-blue-600", text: "VISA" },
    { name: "Mastercard", color: "bg-orange-500", text: "MC" },
    { name: "Amex", color: "bg-blue-400", text: "AMEX" },
    { name: "Discover", color: "bg-orange-400", text: "DISC" },
  ];
  return (
    <div className="flex gap-3">
      {types.map((t) => (
        <div key={t.name} className={`flex h-10 w-16 items-center justify-center rounded-md ${t.color} text-xs font-bold text-white`}>
          {t.text}
        </div>
      ))}
    </div>
  );
}

function FormFieldsDemo() {
  const [valid, setValid] = useState<Record<string, boolean>>({});
  const fields = [
    { name: "number", label: "Card Number", placeholder: "4242 4242 4242 4242" },
    { name: "expiry", label: "Expiry", placeholder: "12/25" },
    { name: "cvv", label: "CVV", placeholder: "123" },
  ];
  return (
    <div className="flex flex-col gap-3 w-full max-w-xs">
      {fields.map((f) => (
        <div key={f.name}>
          <label className="mb-1 block text-xs font-medium">{f.label}</label>
          <div className="relative">
            <input
              placeholder={f.placeholder}
              className="w-full rounded-lg border bg-background px-3 py-2 pr-8 text-sm"
              onChange={(e) => setValid((v) => ({ ...v, [f.name]: e.target.value.length > 3 }))}
            />
            {valid[f.name] && <Check className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-emerald-500" />}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function CreditCardFormPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Credit Card Form</h1>
          <Badge variant="primary">Forms</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Credit card input form with live preview, card type detection, flip animation, and secure payment fields.
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

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Live Card Preview</h2>
        <ComponentPreview>
          <CardPreviewDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Card Types</h2>
        <ComponentPreview>
          <CardTypeDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Validated Fields</h2>
        <ComponentPreview>
          <FormFieldsDemo />
        </ComponentPreview>
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
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">onSubmit</td><td className="px-4 py-3 text-muted-foreground">(data: CardData) =&gt; void</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">Yes</td></tr>
              <tr><td className="px-4 py-3 font-mono text-xs">className</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
