export const CURRENCY_INPUT_SOURCE = `"use client";

import { useState } from "react";

interface CurrencyInputProps {
  currency?: string;
  symbol?: string;
  placeholder?: string;
  className?: string;
}

export function CurrencyInput({
  currency = "USD",
  symbol = "$",
  placeholder = "0.00",
  className = "",
}: CurrencyInputProps) {
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9.]/g, "").replace(symbol, "");
    const [whole = "", decimal = ""] = raw.split(".");
    const grouped = whole.replace(/\\B(?=(\\d{3})+(?!\\d))/g, ",");
    const formatted = decimal ? grouped + "." + decimal.slice(0, 2) : grouped;
    setValue(symbol + formatted);
  };

  return (
    <div className={\`inline-flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 \${className}\`}>
      <span className="text-sm font-medium text-muted-foreground">{symbol}</span>
      <input
        type="text"
        inputMode="decimal"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-32 bg-transparent font-mono text-sm outline-none placeholder:text-muted-foreground"
      />
      <span className="text-xs text-muted-foreground">{currency}</span>
    </div>
  );
}`;

export const BASIC_EXAMPLE = `<CurrencyInput currency="USD" />`;

export const FORMATTED_EXAMPLE = `<CurrencyInput currency="EUR" symbol="€" />`;

export const SELECTOR_EXAMPLE = `const [currency, setCurrency] = useState(currencies[0]);

<div className="mb-3 flex gap-2">
  {currencies.map((c) => (
    <Button key={c.code} variant={currency.code === c.code ? "default" : "outline"} size="sm">
      {c.symbol} {c.code}
    </Button>
  ))}
</div>
<CurrencyInput currency={currency.code} symbol={currency.symbol} />`;