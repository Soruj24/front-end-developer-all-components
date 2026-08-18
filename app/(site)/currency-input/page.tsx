"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Input, Button } from "@/components/ui";

const installCommand = "npx component-library@latest add currency-input";

const usageCode = `import { CurrencyInput } from "@/components/ui";

export default function Example() {
  return <CurrencyInput currency="USD" onChange={(v) => console.log(v)} />;
}`;

const currencies = [
  { symbol: "$", code: "USD", name: "US Dollar" },
  { symbol: "€", code: "EUR", name: "Euro" },
  { symbol: "£", code: "GBP", name: "British Pound" },
  { symbol: "¥", code: "JPY", name: "Japanese Yen" },
];

function formatCurrency(value: string, symbol: string) {
  const num = value.replace(/[^0-9.]/g, "");
  if (!num) return "";
  const parts = num.split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return symbol + parts.join(".");
}

export default function CurrencyInputPage() {
  const [amount, setAmount] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState(0);
  const curr = currencies[selectedCurrency];

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Currency Input</h1>
          <Badge variant="primary">Input</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Formatted currency input with locale support, decimal handling, and real-time formatting.
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
          <h3 className="text-lg font-medium text-foreground">Basic Input</h3>
          <ComponentPreview id="currency-input-default">
            <div className="flex w-full max-w-sm items-center gap-2">
              <span className="text-lg font-medium text-muted-foreground">{curr.symbol}</span>
              <Input value={amount} onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ""))} placeholder="0.00" className="text-lg font-mono" />
            </div>
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Formatted Display</h3>
          <ComponentPreview id="currency-input-formatted">
            <div className="flex w-full max-w-sm items-center gap-2">
              <span className="text-lg font-medium text-muted-foreground">{curr.symbol}</span>
              <Input value={formatCurrency(amount, "")} onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ""))} placeholder="0.00" className="text-lg font-mono" />
              <span className="text-sm text-muted-foreground">{curr.code}</span>
            </div>
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Currency Selector</h3>
          <ComponentPreview id="currency-input-interactive">
            <div className="w-full max-w-md">
              <div className="mb-3 flex gap-2">
                {currencies.map((c, i) => (
                  <Button key={c.code} variant={selectedCurrency === i ? "default" : "outline"} size="sm" onClick={() => setSelectedCurrency(i)}>
                    {c.symbol} {c.code}
                  </Button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-muted-foreground">{curr.symbol}</span>
                <Input value={amount} onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ""))} placeholder="0.00" className="text-2xl font-mono font-bold" />
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{curr.name}</p>
            </div>
          </ComponentPreview>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-left font-medium text-foreground">Prop</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Type</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Default</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Required</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">currency</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">{'"USD"'}</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">className</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">undefined</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}