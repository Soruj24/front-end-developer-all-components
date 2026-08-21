"use client";

import { useState } from "react";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";
import { InputOTP } from "@/components/ui/InputOTP";

const INPUTOTP_SOURCE = `"use client";

import { useRef, useCallback } from "react";
import { cn } from "@/lib/cn";
import type { InputOTPProps } from "./InputOTP.types";

export function InputOTP({ length = 6, value = "", onValueChange, className }: InputOTPProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = useCallback((index: number, digit: string) => {
    if (!/^\\d*$/.test(digit)) return;
    const chars = value.split("");
    chars[index] = digit;
    const next = chars.join("").slice(0, length);
    onValueChange?.(next);
    if (digit && index < length - 1) inputRefs.current[index + 1]?.focus();
  }, [value, length, onValueChange]);

  const handleKeyDown = useCallback((index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !value[index] && index > 0) inputRefs.current[index - 1]?.focus();
  }, [value]);

  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\\D/g, "").slice(0, length);
    onValueChange?.(pasted);
    inputRefs.current[Math.min(pasted.length, length - 1)]?.focus();
  }, [length, onValueChange]);

  return (
    <div className={cn("flex gap-2", className)} role="group" aria-label={\`One-time password, \${length} digits\`}>
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={(el) => { inputRefs.current[i] = el; }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          aria-label={\`Digit \${i + 1}\`}
          autoComplete="one-time-code"
          value={value[i] ?? ""}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste}
          className={cn(
            "h-12 w-10 rounded-xl border border-border bg-card text-center text-lg font-semibold text-foreground",
            "transition-all duration-200",
            "placeholder:text-muted-foreground/50",
            "hover:border-muted-foreground/30",
            "focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none",
            "aria-[value]:border-primary/60 aria-[value]:bg-primary/5",
          )}
        />
      ))}
    </div>
  );
}`;

function OtpDisplay({ value, length }: { value: string; length: number }) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length }).map((_, i) => (
        <div
          key={i}
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-sm font-semibold text-primary"
        >
          {value[i] ?? ""}
        </div>
      ))}
    </div>
  );
}

export default function InputOTPPage() {
  const [value4, setValue4] = useState("");
  const [value6, setValue6] = useState("");
  const [value8, setValue8] = useState("");
  const [valueWithGroup, setValueWithGroup] = useState("");

  return (
    <ComponentDocPage
      name="Input OTP"
      category="Forms"
      description="One-time password input with separate character boxes. Ideal for verification codes, PINs, and security tokens."
    >
      <PreviewPanel filename="input-otp-preview.tsx">
        <div className="flex flex-col items-center gap-4">
          <InputOTP length={6} value={value6} onValueChange={setValue6} />
          <OtpDisplay value={value6} length={6} />
        </div>
      </PreviewPanel>

      <SourceCodeViewer
        source={INPUTOTP_SOURCE}
        filename="components/ui/InputOTP/InputOTP.tsx"
        defaultExpanded
      />

      <section className="flex flex-col gap-8">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Examples
        </h2>

        <ExampleBlock
          title="4-digit OTP"
          description="Short verification code for simple PINs."
          code={`import { useState } from "react";
import { InputOTP } from "@/components/ui/InputOTP";

function FourDigitOTP() {
  const [value, setValue] = useState("");
  return <InputOTP length={4} value={value} onValueChange={setValue} />;
}`}
          filename="four-digit.tsx"
        >
          <div className="flex flex-col items-center gap-3">
            <InputOTP length={4} value={value4} onValueChange={setValue4} />
            <OtpDisplay value={value4} length={4} />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="6-digit OTP"
          description="Standard verification code for most services."
          code={`import { useState } from "react";
import { InputOTP } from "@/components/ui/InputOTP";

function SixDigitOTP() {
  const [value, setValue] = useState("");
  return <InputOTP length={6} value={value} onValueChange={setValue} />;
}`}
          filename="six-digit.tsx"
        >
          <div className="flex flex-col items-center gap-3">
            <InputOTP length={6} value={value6} onValueChange={setValue6} />
            <OtpDisplay value={value6} length={6} />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="8-digit OTP"
          description="Extended code for high-security applications."
          code={`import { useState } from "react";
import { InputOTP } from "@/components/ui/InputOTP";

function EightDigitOTP() {
  const [value, setValue] = useState("");
  return <InputOTP length={8} value={value} onValueChange={setValue} />;
}`}
          filename="eight-digit.tsx"
        >
          <div className="flex flex-col items-center gap-3">
            <InputOTP length={8} value={value8} onValueChange={setValue8} />
            <OtpDisplay value={value8} length={8} />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Grouped Input"
          description="Group digits with a separator for readability."
          code={`import { useState } from "react";
import { InputOTP } from "@/components/ui/InputOTP";

function GroupedOTP() {
  const [value, setValue] = useState("");
  return (
    <div className="flex items-center gap-3">
      <InputOTP length={3} value={value.slice(0, 3)} onValueChange={(v) => setValue(v + value.slice(3))} />
      <span className="text-xl font-semibold text-muted-foreground">-</span>
      <InputOTP length={3} value={value.slice(3, 6)} onValueChange={(v) => setValue(value.slice(0, 3) + v)} />
    </div>
  );
}`}
          filename="grouped.tsx"
        >
          <div className="flex items-center gap-3">
            <InputOTP length={3} value={valueWithGroup.slice(0, 3)} onValueChange={(v) => setValueWithGroup(v + valueWithGroup.slice(3))} />
            <span className="text-xl font-semibold text-muted-foreground">-</span>
            <InputOTP length={3} value={valueWithGroup.slice(3, 6)} onValueChange={(v) => setValueWithGroup(valueWithGroup.slice(0, 3) + v)} />
          </div>
        </ExampleBlock>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          API Reference
        </h2>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-left font-medium text-foreground">
                  Prop
                </th>
                <th className="px-4 py-3 text-left font-medium text-foreground">
                  Type
                </th>
                <th className="px-4 py-3 text-left font-medium text-foreground">
                  Default
                </th>
                <th className="px-4 py-3 text-left font-medium text-foreground">
                  Required
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">
                  length
                </td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">6</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">
                  value
                </td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">
                  onValueChange
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  (value: string) =&gt; void
                </td>
                <td className="px-4 py-3 text-muted-foreground">—</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">
                  className
                </td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">—</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </ComponentDocPage>
  );
}
