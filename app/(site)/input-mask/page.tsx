"use client";

import { useState } from "react";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";
import { InputMask } from "@/components/ui/InputMask";

const INPUTMASK_SOURCE = `import { useCallback } from "react";
import { cn } from "@/lib/cn";

interface InputMaskProps {
  mask: string;
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const isDigit = (c: string) => /\\d/.test(c);
const isLetter = (c: string) => /[a-zA-Z]/.test(c);
const isAlnum = (c: string) => /[a-zA-Z0-9]/.test(c);

const isPlaceholder = (c: string) => c === "9" || c === "a" || c === "*";

function matchesPlaceholder(maskChar: string, c: string): boolean {
  if (maskChar === "9") return isDigit(c);
  if (maskChar === "a") return isLetter(c);
  if (maskChar === "*") return isAlnum(c);
  return false;
}

export function InputMask({ mask, value = "", onValueChange, placeholder, className }: InputMaskProps) {
  const applyMask = useCallback((input: string) => {
    let result = "";
    let idx = 0;
    for (let i = 0; i < mask.length; i++) {
      const m = mask[i];
      if (isPlaceholder(m)) {
        while (idx < input.length && !matchesPlaceholder(m, input[idx])) idx++;
        if (idx < input.length) result += input[idx++];
        else break;
      } else {
        result += m;
      }
    }
    return result;
  }, [mask]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onValueChange?.(applyMask(e.target.value));
    },
    [applyMask, onValueChange],
  );

  return (
    <input
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      className={cn(
        "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-mono outline-none placeholder:text-muted-foreground focus:ring-1 focus:ring-ring",
        className,
      )}
    />
  );
}`;

const CREDIT_CARD_CODE = `import { useState } from "react";
import { InputMask } from "@/components/ui/InputMask";

function CreditCardMask() {
  const [value, setValue] = useState("");
  return (
    <InputMask
      mask="9999 9999 9999 9999"
      value={value}
      onValueChange={setValue}
      placeholder="4242 4242 4242 4242"
    />
  );
}`;

const DATE_CODE = `import { useState } from "react";
import { InputMask } from "@/components/ui/InputMask";

function DateMask() {
  const [value, setValue] = useState("");
  return (
    <InputMask
      mask="99/99/9999"
      value={value}
      onValueChange={setValue}
      placeholder="MM/DD/YYYY"
    />
  );
}`;

const SERIAL_CODE = `import { useState } from "react";
import { InputMask } from "@/components/ui/InputMask";

function SerialMask() {
  const [value, setValue] = useState("");
  return (
    <InputMask
      mask="***-***-***"
      value={value}
      onValueChange={setValue}
      placeholder="ABCD-1234-EF56"
    />
  );
}`;

export default function InputMaskPage() {
  const [phone, setPhone] = useState("");
  const [card, setCard] = useState("");
  const [date, setDate] = useState("");
  const [serial, setSerial] = useState("");

  return (
    <ComponentDocPage
      name="Input Mask"
      category="Forms"
      description="Input masking components that format user input in real-time for phone numbers, dates, credit cards, and custom patterns."
    >
      <PreviewPanel filename="input-mask-preview.tsx">
        <div className="w-full max-w-sm">
          <InputMask
            mask="(999) 999-9999"
            value={phone}
            onValueChange={setPhone}
            placeholder="(555) 123-4567"
          />
        </div>
      </PreviewPanel>

      <SourceCodeViewer
        source={INPUTMASK_SOURCE}
        filename="components/ui/InputMask/InputMask.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock
          title="Credit Card"
          description="16-digit card number with space grouping."
          code={CREDIT_CARD_CODE}
          filename="credit-card.tsx"
        >
          <div className="w-full max-w-sm">
            <InputMask
              mask="9999 9999 9999 9999"
              value={card}
              onValueChange={setCard}
              placeholder="4242 4242 4242 4242"
            />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Date"
          description="Date input with MM/DD/YYYY formatting."
          code={DATE_CODE}
          filename="date.tsx"
        >
          <div className="w-full max-w-sm">
            <InputMask
              mask="99/99/9999"
              value={date}
              onValueChange={setDate}
              placeholder="MM/DD/YYYY"
            />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Custom Mask"
          description="Alphanumeric serial number with custom separators."
          code={SERIAL_CODE}
          filename="custom.tsx"
        >
          <div className="w-full max-w-sm">
            <InputMask
              mask="***-***-***"
              value={serial}
              onValueChange={setSerial}
              placeholder="ABCD-1234-EF56"
            />
          </div>
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}