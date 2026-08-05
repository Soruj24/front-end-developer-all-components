"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";

const installCommand = `npx component-library@latest add input-otp`;

const usageCode = `import { InputOTP } from "@/components/_input-otp";

<InputOTP length={6} />
<InputOTP length={4} size="lg" />`;

export default function InputOTPPage() {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [otp6, setOtp6] = useState(["", "", "", "", "", ""]);

  function handleChange(index: number, value: string, setter: React.Dispatch<React.SetStateAction<string[]>>, arr: string[]) {
    if (value.length > 1) value = value.slice(-1);
    const next = [...arr];
    next[index] = value;
    setter(next);
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent, setter: React.Dispatch<React.SetStateAction<string[]>>, arr: string[]) {
    if (e.key === "Backspace" && !arr[index] && index > 0) {
      const next = [...arr];
      next[index - 1] = "";
      setter(next);
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Input OTP</h1>
          <Badge variant="primary">Forms</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          One-time password input with separate character boxes. Ideal for
          verification codes, PINs, and security tokens.
        </p>
      </header>

      {/* Installation */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Installation</h2>
        <CodeBlock code={installCommand} filename="Terminal" label="bash" variant="terminal" />
      </section>

      {/* Usage */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} filename="page.tsx" label="tsx" />
      </section>

      {/* 4-digit */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">4-digit OTP</h2>
          <p className="mt-1 text-sm text-muted-foreground">Simple 4-digit verification code.</p>
        </div>
        <ComponentPreview id="input-otp-4">
          <div className="flex gap-3">
            {otp.map((digit, i) => (
              <input
                key={i}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(i, e.target.value, setOtp, otp)}
                onKeyDown={(e) => handleKeyDown(i, e, setOtp, otp)}
                className="h-12 w-12 rounded-lg border border-black/[.08] bg-white text-center text-lg font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-ring dark:border-white/[.145] dark:bg-zinc-900"
              />
            ))}
          </div>
        </ComponentPreview>
      </section>

      {/* 6-digit */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">6-digit OTP</h2>
          <p className="mt-1 text-sm text-muted-foreground">Standard 6-digit verification code.</p>
        </div>
        <ComponentPreview id="input-otp-6">
          <div className="flex gap-2">
            {otp6.map((digit, i) => (
              <input
                key={i}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(i, e.target.value, setOtp6, otp6)}
                onKeyDown={(e) => handleKeyDown(i, e, setOtp6, otp6)}
                className="h-11 w-10 rounded-md border border-black/[.08] bg-white text-center text-base font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-ring dark:border-white/[.145] dark:bg-zinc-900"
              />
            ))}
          </div>
        </ComponentPreview>
      </section>

      {/* API Reference */}
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
                <td className="px-4 py-3 font-mono text-xs">length</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">6</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">size</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;sm&quot; | &quot;md&quot; | &quot;lg&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;md&quot;</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">value</td>
                <td className="px-4 py-3 text-muted-foreground">string[]</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">onChange</td>
                <td className="px-4 py-3 text-muted-foreground">(value: string[]) =&gt; void</td>
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
