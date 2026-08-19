"use client";

import { useState } from "react";
import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { Input, Button } from "@/components/ui";
import {
  CURRENCY_INPUT_SOURCE,
  BASIC_EXAMPLE,
  FORMATTED_EXAMPLE,
  SELECTOR_EXAMPLE,
} from "./currency-input-source";

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
    <ComponentDocPage
      name="Currency Input"
      category="Forms"
      description="Formatted currency input with locale support, decimal handling, and real-time formatting."
    >
      <PreviewPanel filename="currency-input.tsx">
        <div className="flex w-full max-w-sm items-center gap-2">
          <span className="text-lg font-medium text-muted-foreground">{curr.symbol}</span>
          <Input value={amount} onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ""))} placeholder="0.00" className="text-lg font-mono" />
        </div>
      </PreviewPanel>

      <SourceCodeViewer source={CURRENCY_INPUT_SOURCE} filename="components/ui/CurrencyInput/CurrencyInput.tsx" defaultExpanded />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Basic Input" description="A minimal currency input with a leading symbol." code={BASIC_EXAMPLE}>
          <div className="flex w-full max-w-sm items-center gap-2">
            <span className="text-lg font-medium text-muted-foreground">{curr.symbol}</span>
            <Input value={amount} onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ""))} placeholder="0.00" className="text-lg font-mono" />
          </div>
        </ExampleBlock>

        <ExampleBlock title="Formatted Display" description="Live thousand separators and currency code hint." code={FORMATTED_EXAMPLE}>
          <div className="flex w-full max-w-sm items-center gap-2">
            <span className="text-lg font-medium text-muted-foreground">{curr.symbol}</span>
            <Input value={formatCurrency(amount, "")} onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ""))} placeholder="0.00" className="text-lg font-mono" />
            <span className="text-sm text-muted-foreground">{curr.code}</span>
          </div>
        </ExampleBlock>

        <ExampleBlock title="Currency Selector" description="Switch between currencies while keeping the value." code={SELECTOR_EXAMPLE}>
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
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}