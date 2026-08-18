"use client";

import { useState, useRef } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { InputOTP, Card, CardContent } from "@/components/ui";

const installCommand = "npx component-library@latest add pin-input";

const usageCode = `import { InputOTP } from "@/components/ui";

export default function Example() {
  return <InputOTP length={6} onComplete={(v) => console.log(v)} />;
}`;

export default function PinInputPage() {
  const [pin, setPin] = useState(["", "", "", "", "", ""]);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newPin = [...pin];
    newPin[index] = value.slice(-1);
    setPin(newPin);
    if (value && index < 5) inputs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6).split("");
    setPin([...pasted, ...Array(6 - pasted.length).fill("")]);
    inputs.current[Math.min(pasted.length, 5)]?.focus();
  };

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Pin Input</h1>
          <Badge variant="primary">Input</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          PIN/OTP digit input with auto-focus, paste support, and backspace handling for verification codes.
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
          <h3 className="text-lg font-medium text-foreground">6-Digit PIN</h3>
          <ComponentPreview id="pin-input-default">
            <div className="flex w-full justify-center gap-2">
              {pin.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => { inputs.current[i] = el; }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  onPaste={handlePaste}
                  className="h-12 w-12 rounded-lg border border-border bg-background text-center text-lg font-mono font-bold focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              ))}
            </div>
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">4-Digit OTP</h3>
          <ComponentPreview id="pin-input-short">
            <div className="flex w-full justify-center gap-3">
              {[0, 1, 2, 3].map((i) => (
                <input
                  key={i}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  className="h-14 w-14 rounded-xl border-2 border-border bg-background text-center text-xl font-mono font-bold focus:border-primary focus:outline-none"
                />
              ))}
            </div>
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Interactive</h3>
          <ComponentPreview id="pin-input-interactive">
            <Card className="w-full max-w-sm">
              <CardContent className="p-6">
                <p className="mb-4 text-center text-sm text-muted-foreground">Enter the 6-digit code sent to your phone</p>
                <div className="mb-4 flex justify-center gap-2">
                  {pin.map((digit, i) => (
                    <input
                      key={i}
                      ref={(el) => { inputs.current[i] = el; }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleChange(i, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(i, e)}
                      onPaste={handlePaste}
                      className={`h-12 w-12 rounded-lg border text-center text-lg font-mono font-bold focus:outline-none focus:ring-1 focus:ring-primary transition-colors ${digit ? "border-primary bg-primary/5" : "border-border"}`}
                    />
                  ))}
                </div>
                <p className="text-center text-xs text-muted-foreground">
                  {pin.filter(Boolean).length}/6 digits entered
                </p>
              </CardContent>
            </Card>
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
                <td className="px-4 py-3 font-mono text-xs text-foreground">length</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">6</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">onComplete</td>
                <td className="px-4 py-3 text-muted-foreground">(value: string) =&gt; void</td>
                <td className="px-4 py-3 text-muted-foreground">—</td>
                <td className="px-4 py-3 text-muted-foreground">Yes</td>
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