"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Phone, Check, AlertCircle, ChevronDown } from "lucide-react";

const installCommand = `npx component-library@latest add phone-input`;

const usageCode = `import { PhoneInput } from "@/components/ui";

<PhoneInput
  value={phone}
  onChange={setPhone}
  defaultCountry="US"
/>`;

const countries = [
  { code: "US", name: "United States", dial: "+1", flag: "🇺🇸" },
  { code: "GB", name: "United Kingdom", dial: "+44", flag: "🇬🇧" },
  { code: "CA", name: "Canada", dial: "+1", flag: "🇨🇦" },
  { code: "AU", name: "Australia", dial: "+61", flag: "🇦🇺" },
  { code: "DE", name: "Germany", dial: "+49", flag: "🇩🇪" },
  { code: "FR", name: "France", dial: "+33", flag: "🇫🇷" },
  { code: "JP", name: "Japan", dial: "+81", flag: "🇯🇵" },
  { code: "IN", name: "India", dial: "+91", flag: "🇮🇳" },
  { code: "BR", name: "Brazil", dial: "+55", flag: "🇧🇷" },
  { code: "KR", name: "South Korea", dial: "+82", flag: "🇰🇷" },
];

function BasicPhoneDemo() {
  const [phone, setPhone] = useState("");
  const country = countries[0];

  return (
    <div className="w-full max-w-sm space-y-2">
      <div className="flex items-center gap-2 rounded-lg border border-border bg-background">
        <span className="pl-3 text-lg">{country.flag}</span>
        <span className="text-sm text-muted-foreground">{country.dial}</span>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="(555) 123-4567"
          className="flex-1 bg-transparent px-2 py-3 text-sm outline-none placeholder:text-muted-foreground"
        />
        <Phone className="mr-3 h-4 w-4 text-muted-foreground" />
      </div>
      {phone && <p className="text-xs text-muted-foreground">{country.dial} {phone}</p>}
    </div>
  );
}

function WithCountryCodesDemo() {
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [phone, setPhone] = useState("");
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full max-w-sm">
      <div className="flex items-center gap-2 rounded-lg border border-border bg-background">
        <div className="relative">
          <button onClick={() => setOpen(!open)}
            className="flex items-center gap-2 border-r border-border px-3 py-3">
            <span className="text-lg">{selectedCountry.flag}</span>
            <span className="text-sm">{selectedCountry.dial}</span>
            <ChevronDown className="h-3 w-3 text-muted-foreground" />
          </button>
          {open && (
            <div className="absolute z-10 mt-1 w-64 max-h-60 overflow-auto rounded-lg border border-border bg-background shadow-lg">
              {countries.map((c) => (
                <button key={c.code}
                  onClick={() => { setSelectedCountry(c); setOpen(false); }}
                  className="flex w-full items-center gap-3 px-3 py-2 text-left text-sm hover:bg-muted">
                  <span className="text-lg">{c.flag}</span>
                  <span className="flex-1">{c.name}</span>
                  <span className="text-muted-foreground">{c.dial}</span>
                </button>
              ))}
            </div>
          )}
        </div>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Enter phone number"
          className="flex-1 bg-transparent px-3 py-3 text-sm outline-none placeholder:text-muted-foreground"
        />
      </div>
    </div>
  );
}

function ValidationDemo() {
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState(countries[0]);

  const isValid = phone.length >= 7;
  const isEmpty = phone.length === 0;

  return (
    <div className="w-full max-w-sm space-y-3">
      <div className={`flex items-center gap-2 rounded-lg border bg-background ${isEmpty ? "border-border" : isValid ? "border-green-500" : "border-red-500"}`}>
        <span className="pl-3 text-lg">{country.flag}</span>
        <span className="text-sm text-muted-foreground">{country.dial}</span>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="(555) 123-4567"
          className="flex-1 bg-transparent px-2 py-3 text-sm outline-none placeholder:text-muted-foreground"
        />
        {!isEmpty && (
          <span className="mr-3">
            {isValid ? <Check className="h-4 w-4 text-green-600" /> : <AlertCircle className="h-4 w-4 text-red-500" />}
          </span>
        )}
      </div>
      <div className="flex gap-2">
        {countries.slice(0, 4).map((c) => (
          <button key={c.code} onClick={() => setCountry(c)}
            className={`rounded-lg border px-2 py-1 text-xs ${country.code === c.code ? "border-primary bg-primary/10" : "border-border"}`}>
            {c.flag} {c.code}
          </button>
        ))}
      </div>
      {phone && (
        <p className={`text-xs ${isValid ? "text-green-600" : "text-red-500"}`}>
          {isValid ? "Valid phone number" : "Please enter a valid phone number"}
        </p>
      )}
    </div>
  );
}

export default function PhoneInputPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Phone Input</h1>
          <Badge variant="primary">Forms</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          An international phone number input with country code selection, formatting, and built-in validation.
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
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Basic Phone</h2>
          <p className="mt-1 text-sm text-muted-foreground">Simple phone input with default country.</p>
        </div>
        <ComponentPreview id="phone-input-basic">
          <BasicPhoneDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">With Country Codes</h2>
          <p className="mt-1 text-sm text-muted-foreground">Dropdown to select country and dial code.</p>
        </div>
        <ComponentPreview id="phone-input-country">
          <WithCountryCodesDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Validation</h2>
          <p className="mt-1 text-sm text-muted-foreground">Real-time validation with visual feedback.</p>
        </div>
        <ComponentPreview id="phone-input-validation">
          <ValidationDemo />
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
                <td className="px-4 py-3 font-mono text-xs">value</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;&quot;</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">onChange</td>
                <td className="px-4 py-3 text-muted-foreground">(value: string) =&gt; void</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">defaultCountry</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;US&quot;</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">placeholder</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;Enter phone number&quot;</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">disabled</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">false</td>
                <td className="px-4 py-3">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
