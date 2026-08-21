"use client";

import { useState } from "react";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";
import { PinInput } from "@/components/ui/PinInput";

const PIN_INPUT_SOURCE = `"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { cn } from "@/lib/cn";

interface PinInputProps {
  length?: number;
  value?: string[];
  onChange?: (value: string[]) => void;
  onComplete?: (value: string) => void;
  mask?: boolean;
  placeholder?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  className?: string;
}

export function PinInput({ length = 6, value, onChange, onComplete, mask = false, placeholder = "", disabled = false, autoFocus = false, className }: PinInputProps) {
  const [internalValue, setInternalValue] = useState(Array(length).fill(""));
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;
  const inputRefs = useRef([]);

  useEffect(() => { if (autoFocus) inputRefs.current[0]?.focus(); }, [autoFocus]);

  const handleChange = useCallback((index, digit) => {
    if (!/^\\d*$/.test(digit)) return;
    const next = [...currentValue];
    next[index] = digit.slice(-1);
    if (!isControlled) setInternalValue(next);
    onChange?.(next);
    if (digit && index < length - 1) inputRefs.current[index + 1]?.focus();
    if (next.filter(Boolean).length === length) onComplete?.(next.join(""));
  }, [currentValue, isControlled, length, onChange, onComplete]);

  const handleKeyDown = useCallback((index, e) => {
    if (e.key === "Backspace" && !currentValue[index] && index > 0) inputRefs.current[index - 1]?.focus();
  }, [currentValue]);

  const handlePaste = useCallback((e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\\D/g, "").slice(0, length).split("");
    const next = [...pasted, ...Array(length - pasted.length).fill("")];
    if (!isControlled) setInternalValue(next);
    onChange?.(next);
    inputRefs.current[Math.min(pasted.length, length - 1)]?.focus();
    if (pasted.length === length) onComplete?.(next.join(""));
  }, [length, isControlled, onChange, onComplete]);

  return (
    <div role="group" aria-label="PIN input" className={cn("flex items-center justify-center gap-2.5", className)}>
      {currentValue.map((digit, i) => (
        <input key={i} ref={(el) => { inputRefs.current[i] = el; }} type={mask ? "password" : "text"} inputMode="numeric"
          maxLength={1} value={digit} onChange={(e) => handleChange(i, e.target.value)} onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste} placeholder={placeholder} disabled={disabled} aria-label={\`Digit \${i + 1} of \${length}\`}
          className={cn("h-12 w-12 rounded-xl border bg-card text-center font-mono text-lg font-semibold tabular-nums text-foreground placeholder:text-muted-foreground/30 transition-all duration-200 hover:border-muted-foreground/30 focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
            digit ? "border-primary/40 bg-primary/5 shadow-sm shadow-primary/10" : "border-border")} />
      ))}
    </div>
  );
}`;

export default function PinInputPage() {
  const [pin, setPin] = useState(["", "", "", "", "", ""]);

  return (
    <ComponentDocPage
      name="Pin Input"
      category="Input"
      description="PIN/OTP digit input with auto-focus, paste support, backspace navigation, and masked input."
    >
      <PreviewPanel filename="pin-input-preview.tsx">
        <PinInput value={pin} onChange={setPin} autoFocus />
      </PreviewPanel>

      <SourceCodeViewer source={PIN_INPUT_SOURCE} filename="components/ui/PinInput/PinInput.tsx" defaultExpanded />

      <section className="flex flex-col gap-8">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Examples
        </h2>

        <ExampleBlock
          title="Default"
          description="6-digit PIN with auto-focus and paste support."
          code={`import { PinInput } from "@/components/ui/PinInput";

<PinInput value={pin} onChange={setPin} autoFocus />`}
          filename="default.tsx"
        >
          <PinInput value={pin} onChange={setPin} autoFocus />
        </ExampleBlock>

        <ExampleBlock
          title="4-Digit OTP"
          description="Shorter OTP input."
          code={`<PinInput length={4} onComplete={(v) => console.log(v)} />`}
          filename="4-digit.tsx"
        >
          <PinInput length={4} onComplete={() => {}} />
        </ExampleBlock>

        <ExampleBlock
          title="Masked"
          description="Mask input characters for sensitive PINs."
          code={`<PinInput mask length={6} onComplete={(v) => console.log(v)} />`}
          filename="masked.tsx"
        >
          <PinInput mask length={6} onComplete={() => {}} />
        </ExampleBlock>

        <ExampleBlock
          title="Disabled"
          description="Non-interactive pin input."
          code={`<PinInput disabled value={["1","2","3","4","5","6"]} />`}
          filename="disabled.tsx"
        >
          <PinInput disabled value={["1", "2", "3", "4", "5", "6"]} />
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
                <td className="px-4 py-3 font-mono text-xs text-foreground">value</td>
                <td className="px-4 py-3 text-muted-foreground">string[]</td>
                <td className="px-4 py-3 text-muted-foreground">—</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">onChange</td>
                <td className="px-4 py-3 text-muted-foreground">(value: string[]) =&gt; void</td>
                <td className="px-4 py-3 text-muted-foreground">—</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">onComplete</td>
                <td className="px-4 py-3 text-muted-foreground">(value: string) =&gt; void</td>
                <td className="px-4 py-3 text-muted-foreground">—</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">mask</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">false</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">placeholder</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">disabled</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">false</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">autoFocus</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">false</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">className</td>
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
