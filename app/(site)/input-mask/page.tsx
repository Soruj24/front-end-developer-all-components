"use client";
import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Hash, CreditCard, Phone, Mail, Calendar, Lock, Type } from "lucide-react";

const installCommand = `npx component-library@latest add input-mask`;
const usageCode = `import { InputMask } from "@/components/input-mask";

<InputMask mask="(999) 999-9999" placeholder="Phone number" />
`;

function PhoneMask() {
  const [value, setValue] = useState("");
  const format = (v: string) => {
    const digits = v.replace(/\D/g, "").slice(0, 10);
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  };
  return (
    <div className="w-full max-w-sm p-4">
      <label className="text-sm font-medium text-foreground flex items-center gap-2 mb-1.5">
        <Phone className="h-4 w-4 text-muted-foreground" />
        Phone Number
      </label>
      <input
        value={value}
        onChange={(e) => setValue(format(e.target.value))}
        className="w-full px-3 py-2 rounded-lg border bg-background text-sm outline-none placeholder:text-muted-foreground font-mono"
        placeholder="(555) 123-4567"
      />
      <p className="mt-1.5 text-xs text-muted-foreground">Format: (XXX) XXX-XXXX</p>
    </div>
  );
}

function CreditCardMask() {
  const [value, setValue] = useState("");
  const format = (v: string) => {
    const digits = v.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
  };
  return (
    <div className="w-full max-w-sm p-4">
      <label className="text-sm font-medium text-foreground flex items-center gap-2 mb-1.5">
        <CreditCard className="h-4 w-4 text-muted-foreground" />
        Card Number
      </label>
      <div className="relative">
        <input
          value={value}
          onChange={(e) => setValue(format(e.target.value))}
          className="w-full pl-10 pr-3 py-2 rounded-lg border bg-background text-sm outline-none placeholder:text-muted-foreground font-mono tracking-wider"
          placeholder="4242 4242 4242 4242"
        />
        <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      </div>
      <p className="mt-1.5 text-xs text-muted-foreground">{value.replace(/\s/g, "").length}/16 digits</p>
    </div>
  );
}

function DateMask() {
  const [value, setValue] = useState("");
  const format = (v: string) => {
    const digits = v.replace(/\D/g, "").slice(0, 8);
    if (digits.length <= 2) return digits;
    if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
  };
  return (
    <div className="w-full max-w-sm p-4">
      <label className="text-sm font-medium text-foreground flex items-center gap-2 mb-1.5">
        <Calendar className="h-4 w-4 text-muted-foreground" />
        Expiry Date
      </label>
      <input
        value={value}
        onChange={(e) => setValue(format(e.target.value))}
        className="w-full px-3 py-2 rounded-lg border bg-background text-sm outline-none placeholder:text-muted-foreground font-mono"
        placeholder="MM/DD/YYYY"
      />
      <p className="mt-1.5 text-xs text-muted-foreground">Format: MM/DD/YYYY</p>
    </div>
  );
}

function EmailMask() {
  const [value, setValue] = useState("");
  return (
    <div className="w-full max-w-sm p-4">
      <label className="text-sm font-medium text-foreground flex items-center gap-2 mb-1.5">
        <Mail className="h-4 w-4 text-muted-foreground" />
        Email Address
      </label>
      <div className="relative">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type="email"
          className="w-full pl-10 pr-3 py-2 rounded-lg border bg-background text-sm outline-none placeholder:text-muted-foreground"
          placeholder="user@example.com"
        />
        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      </div>
      {value && !value.includes("@") && (
        <p className="mt-1.5 text-xs text-red-500">Please include an @ symbol</p>
      )}
    </div>
  );
}

function NumberMask() {
  const [value, setValue] = useState("");
  const format = (v: string) => {
    const digits = v.replace(/\D/g, "").slice(0, 10);
    return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  return (
    <div className="w-full max-w-sm p-4">
      <label className="text-sm font-medium text-foreground flex items-center gap-2 mb-1.5">
        <Hash className="h-4 w-4 text-muted-foreground" />
        Number
      </label>
      <input
        value={value}
        onChange={(e) => setValue(format(e.target.value))}
        className="w-full px-3 py-2 rounded-lg border bg-background text-sm outline-none placeholder:text-muted-foreground font-mono"
        placeholder="1,000,000"
      />
      <p className="mt-1.5 text-xs text-muted-foreground">Auto-formatted with commas</p>
    </div>
  );
}

function CurrencyMask() {
  const [value, setValue] = useState("");
  const format = (v: string) => {
    const digits = v.replace(/\D/g, "").slice(0, 10);
    if (!digits) return "";
    const num = parseInt(digits) / 100;
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(num);
  };
  return (
    <div className="w-full max-w-sm p-4">
      <label className="text-sm font-medium text-foreground flex items-center gap-2 mb-1.5">
        <span className="text-muted-foreground">$</span>
        Currency
      </label>
      <div className="relative">
        <input
          value={value}
          onChange={(e) => setValue(format(e.target.value))}
          className="w-full pl-7 pr-3 py-2 rounded-lg border bg-background text-sm outline-none placeholder:text-muted-foreground font-mono"
          placeholder="$0.00"
        />
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">$</span>
      </div>
      <p className="mt-1.5 text-xs text-muted-foreground">Enter cents, formatted as dollars</p>
    </div>
  );
}

function CustomMask() {
  const [serial, setSerial] = useState("");
  const [code, setCode] = useState("");
  const formatSerial = (v: string) => {
    const chars = v.replace(/[^A-Za-z0-9]/g, "").toUpperCase().slice(0, 12);
    return chars.replace(/(\w{4})(?=\w)/g, "$1-");
  };
  const formatCode = (v: string) => {
    const digits = v.replace(/\D/g, "").slice(0, 6);
    if (digits.length <= 3) return digits;
    return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  };
  return (
    <div className="w-full max-w-sm p-4 flex flex-col gap-4">
      <div>
        <label className="text-sm font-medium text-foreground flex items-center gap-2 mb-1.5">
          <Type className="h-4 w-4 text-muted-foreground" />
          Serial Number
        </label>
        <input
          value={serial}
          onChange={(e) => setSerial(formatSerial(e.target.value))}
          className="w-full px-3 py-2 rounded-lg border bg-background text-sm outline-none placeholder:text-muted-foreground font-mono tracking-wider"
          placeholder="ABCD-1234-EF56"
        />
        <p className="mt-1.5 text-xs text-muted-foreground">Format: XXXX-XXXX-XXXX</p>
      </div>
      <div>
        <label className="text-sm font-medium text-foreground flex items-center gap-2 mb-1.5">
          <Lock className="h-4 w-4 text-muted-foreground" />
          Verification Code
        </label>
        <input
          value={code}
          onChange={(e) => setCode(formatCode(e.target.value))}
          className="w-full px-3 py-2 rounded-lg border bg-background text-sm outline-none placeholder:text-muted-foreground font-mono tracking-widest"
          placeholder="123-456"
        />
        <p className="mt-1.5 text-xs text-muted-foreground">Format: XXX-XXX</p>
      </div>
    </div>
  );
}

export default function InputMaskPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Input Mask</h1>
          <Badge variant="primary">Forms</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Input masking components that format user input in real-time for phone numbers, dates, credit cards, and custom patterns.
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
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Phone Mask</h2>
          <p className="mt-1 text-sm text-muted-foreground">US phone number formatting with area code.</p>
        </div>
        <ComponentPreview id="phone-mask">
          <PhoneMask />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Credit Card Mask</h2>
          <p className="mt-1 text-sm text-muted-foreground">Credit card number with spacing every 4 digits.</p>
        </div>
        <ComponentPreview id="credit-card-mask">
          <CreditCardMask />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Date Mask</h2>
          <p className="mt-1 text-sm text-muted-foreground">Date input with MM/DD/YYYY formatting.</p>
        </div>
        <ComponentPreview id="date-mask">
          <DateMask />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Email Mask</h2>
          <p className="mt-1 text-sm text-muted-foreground">Email input with validation feedback.</p>
        </div>
        <ComponentPreview id="email-mask">
          <EmailMask />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Number Mask</h2>
          <p className="mt-1 text-sm text-muted-foreground">Number input with comma formatting.</p>
        </div>
        <ComponentPreview id="number-mask">
          <NumberMask />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Currency Mask</h2>
          <p className="mt-1 text-sm text-muted-foreground">Currency input with dollar formatting.</p>
        </div>
        <ComponentPreview id="currency-mask">
          <CurrencyMask />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Custom Mask</h2>
          <p className="mt-1 text-sm text-muted-foreground">Serial numbers and verification codes.</p>
        </div>
        <ComponentPreview id="custom-mask">
          <CustomMask />
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
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">mask</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">value</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">""</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">onChange</td>
                <td className="px-4 py-3 text-muted-foreground">{"(value: string) => void"}</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">placeholder</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">""</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
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
