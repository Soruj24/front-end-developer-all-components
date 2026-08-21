"use client";

import { useState } from "react";
import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { CurrencyInput } from "@/components/ui/CurrencyInput";
import { Button } from "@/components/ui";

const CURRENCY_INPUT_SOURCE = `"use client";

import { useState, useRef, useCallback } from "react";
import { cn } from "@/lib/cn";

export interface CurrencyInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "size"> {
  currency?: string;
  symbol?: string;
  value?: string;
  onChange?: (value: string, raw: string) => void;
  size?: "sm" | "md" | "lg";
  showCurrencyCode?: boolean;
  disabled?: boolean;
}

function formatWithCommas(raw: string): string {
  const [whole = "", decimal = ""] = raw.split(".");
  const grouped = whole.replace(/\\B(?=(\\d{3})+(?!\\d))/g, ",");
  return decimal ? grouped + "." + decimal.slice(0, 2) : grouped;
}

const sizeStyles = {
  sm: "h-9 gap-1.5 px-3 text-sm",
  md: "h-11 gap-2 px-3.5 text-base",
  lg: "h-13 gap-2.5 px-4 text-lg",
} as const;

const symbolStyles = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
} as const;

const codeStyles = {
  sm: "text-[10px]",
  md: "text-xs",
  lg: "text-sm",
} as const;

export function CurrencyInput({
  currency = "USD",
  symbol = "$",
  placeholder = "0.00",
  value: controlledValue,
  onChange,
  size = "md",
  showCurrencyCode = true,
  disabled = false,
  className,
  id,
  ...props
}: CurrencyInputProps) {
  const [internalValue, setInternalValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const value = controlledValue ?? internalValue;
  const rawValue = value.replace(/[^0-9.]/g, "");
  const displayValue = formatWithCommas(rawValue);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value.replace(/[^0-9.]/g, "");
      const [whole = "", decimal = ""] = raw.split(".");
      const clamped = decimal.length > 2 ? decimal.slice(0, 2) : decimal;
      const cleaned = clamped ? whole + "." + clamped : whole;
      setInternalValue(cleaned);
      onChange?.(cleaned, raw);
    },
    [onChange],
  );

  const handleFocus = () => inputRef.current?.select();

  return (
    <div
      className={cn(
        "group flex items-center rounded-xl border border-border bg-card transition-colors",
        "focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20",
        "hover:border-muted-foreground/30",
        disabled && "cursor-not-allowed opacity-50",
        sizeStyles[size],
        className,
      )}
    >
      <span
        className={cn(
          "flex-shrink-0 font-medium text-muted-foreground transition-colors",
          "group-focus-within:text-foreground",
          symbolStyles[size],
        )}
        aria-hidden="true"
      >
        {symbol}
      </span>

      <input
        ref={inputRef}
        id={id}
        type="text"
        inputMode="decimal"
        autoComplete="off"
        aria-label={\`Amount in \${currency}\`}
        placeholder={placeholder}
        disabled={disabled}
        value={displayValue}
        onChange={handleChange}
        onFocus={handleFocus}
        className={cn(
          "min-w-0 flex-1 bg-transparent font-mono tabular-nums text-foreground outline-none",
          "placeholder:text-muted-foreground",
          "disabled:cursor-not-allowed",
        )}
        {...props}
      />

      {showCurrencyCode && (
        <span
          className={cn(
            "flex-shrink-0 rounded-md bg-muted px-1.5 py-0.5 font-medium text-muted-foreground transition-colors",
            "group-focus-within:bg-primary/10 group-focus-within:text-primary",
            codeStyles[size],
          )}
        >
          {currency}
        </span>
      )}
    </div>
  );
}

export default CurrencyInput;`;

const BASIC_CODE = `import { CurrencyInput } from "@/components/ui/CurrencyInput";

<CurrencyInput currency="USD" symbol="$" />`;

const FORMATTED_CODE = `import { CurrencyInput } from "@/components/ui/CurrencyInput";

<CurrencyInput currency="EUR" symbol="€" />`;

const SELECTOR_CODE = `import { CurrencyInput } from "@/components/ui/CurrencyInput";
import { Button } from "@/components/ui";

const currencies = [
  { symbol: "$", code: "USD", name: "US Dollar" },
  { symbol: "€", code: "EUR", name: "Euro" },
  { symbol: "£", code: "GBP", name: "British Pound" },
  { symbol: "¥", code: "JPY", name: "Japanese Yen" },
];

function CurrencySelector() {
  const [selected, setSelected] = useState(0);
  const curr = currencies[selected];
  return (
    <div>
      <div className="mb-3 flex gap-2">
        {currencies.map((c, i) => (
          <Button key={c.code} variant={selected === i ? "default" : "outline"} size="sm" onClick={() => setSelected(i)}>
            {c.symbol} {c.code}
          </Button>
        ))}
      </div>
      <CurrencyInput currency={curr.code} symbol={curr.symbol} />
    </div>
  );
}`;

const SIZES_CODE = `import { CurrencyInput } from "@/components/ui/CurrencyInput";

<div className="flex flex-col gap-3">
  <CurrencyInput size="sm" />
  <CurrencyInput size="md" />
  <CurrencyInput size="lg" />
</div>`;

const NO_CODE_CODE = `import { CurrencyInput } from "@/components/ui/CurrencyInput";

<CurrencyInput showCurrencyCode={false} />`;

const DISABLED_CODE = `import { CurrencyInput } from "@/components/ui/CurrencyInput";

<CurrencyInput disabled />`;

const CONTROLLED_CODE = `"use client";
import { useState } from "react";
import { CurrencyInput } from "@/components/ui/CurrencyInput";

function ControlledExample() {
  const [value, setValue] = useState("");
  return (
    <div className="flex flex-col gap-2">
      <CurrencyInput value={value} onChange={setValue} />
      <p className="text-xs text-muted-foreground">
        Value: {value || "(empty)"}
      </p>
    </div>
  );
}`;

const CURRENCIES = [
  { symbol: "$", code: "USD", name: "US Dollar" },
  { symbol: "€", code: "EUR", name: "Euro" },
  { symbol: "£", code: "GBP", name: "British Pound" },
  { symbol: "¥", code: "JPY", name: "Japanese Yen" },
];

export default function CurrencyInputPage() {
  const [amount, setAmount] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState(0);
  const curr = CURRENCIES[selectedCurrency];

  return (
    <ComponentDocPage
      name="Currency Input"
      category="Forms"
      description="Formatted currency input with locale support, decimal handling, real-time comma formatting, size variants, and currency code badges."
    >
      <PreviewPanel filename="currency-input-preview.tsx">
        <div className="flex w-full max-w-sm items-center">
          <CurrencyInput currency={curr.code} symbol={curr.symbol} />
        </div>
      </PreviewPanel>

      <SourceCodeViewer
        source={CURRENCY_INPUT_SOURCE}
        filename="components/ui/CurrencyInput/CurrencyInput.tsx"
        defaultExpanded
      />

      <section className="flex flex-col gap-8">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Examples
        </h2>

        <ExampleBlock
          title="Basic Input"
          description="A minimal currency input with a leading symbol and trailing currency code badge."
          code={BASIC_CODE}
          filename="basic.tsx"
        >
          <div className="flex w-full max-w-sm items-center">
            <CurrencyInput currency="USD" symbol="$" />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Formatted Display"
          description="Live thousand-separator formatting as you type."
          code={FORMATTED_CODE}
          filename="formatted.tsx"
        >
          <div className="flex w-full max-w-sm items-center">
            <CurrencyInput
              currency="EUR"
              symbol="€"
              value={amount}
              onChange={setAmount}
            />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Currency Selector"
          description="Switch between currencies while keeping the value."
          code={SELECTOR_CODE}
          filename="selector.tsx"
        >
          <div className="w-full max-w-md">
            <div className="mb-3 flex gap-2">
              {CURRENCIES.map((c, i) => (
                <Button
                  key={c.code}
                  variant={selectedCurrency === i ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCurrency(i)}
                >
                  {c.symbol} {c.code}
                </Button>
              ))}
            </div>
            <CurrencyInput
              currency={curr.code}
              symbol={curr.symbol}
              size="lg"
            />
            <p className="mt-1.5 text-xs text-muted-foreground">
              {curr.name}
            </p>
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Sizes"
          description="Three size options: sm, md, and lg."
          code={SIZES_CODE}
          filename="sizes.tsx"
        >
          <div className="flex w-full max-w-sm flex-col gap-3">
            <CurrencyInput size="sm" />
            <CurrencyInput size="md" />
            <CurrencyInput size="lg" />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Without Currency Code"
          description="Hide the trailing currency code badge."
          code={NO_CODE_CODE}
          filename="no-code.tsx"
        >
          <div className="flex w-full max-w-sm items-center">
            <CurrencyInput showCurrencyCode={false} />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Disabled"
          description="Non-interactive input with reduced opacity."
          code={DISABLED_CODE}
          filename="disabled.tsx"
        >
          <div className="flex w-full max-w-sm items-center">
            <CurrencyInput disabled />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Controlled"
          description="Control the value externally with onChange."
          code={CONTROLLED_CODE}
          filename="controlled.tsx"
        >
          <ControlledExample />
        </ExampleBlock>
      </section>
    </ComponentDocPage>
  );
}

function ControlledExample() {
  const [value, setValue] = useState("");
  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      <CurrencyInput value={value} onChange={setValue} />
      <p className="text-xs text-muted-foreground">
        Value: {value || "(empty)"}
      </p>
    </div>
  );
}
