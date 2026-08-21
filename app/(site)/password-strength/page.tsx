"use client";

import { useState } from "react";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";
import { PasswordStrength } from "@/components/ui/PasswordStrength";

const PASSWORD_STRENGTH_SOURCE = `"use client";

import { useState, useMemo } from "react";
import { cn } from "@/lib/cn";

interface Requirement { label: string; test: (pw: string) => boolean }

const REQUIREMENTS: Requirement[] = [
  { label: "8+ characters", test: (pw) => pw.length >= 8 },
  { label: "Uppercase letter", test: (pw) => /[A-Z]/.test(pw) },
  { label: "Number", test: (pw) => /[0-9]/.test(pw) },
  { label: "Special character", test: (pw) => /[^A-Za-z0-9]/.test(pw) },
];

const STRENGTH_COLORS = { 1: "bg-red-500", 2: "bg-orange-500", 3: "bg-yellow-500", 4: "bg-emerald-500" };

function getStrength(pw) {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return { score, label: ["Weak", "Fair", "Good", "Strong"][score - 1] || "Too short", color: STRENGTH_COLORS[score] || "bg-muted-foreground/30" };
}

export function PasswordStrength({ value, onChange, showToggle = true, showChecklist = true, placeholder = "Enter password...", className }) {
  const [internalValue, setInternalValue] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const currentValue = value !== undefined ? value : internalValue;
  const handleChange = (next) => { if (value === undefined) setInternalValue(next); onChange?.(next); };
  const { score, label, color } = useMemo(() => getStrength(currentValue), [currentValue]);
  const met = useMemo(() => REQUIREMENTS.map((r) => r.test(currentValue)), [currentValue]);

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="relative">
        <input type={showPassword ? "text" : "password"} value={currentValue} onChange={(e) => handleChange(e.target.value)} placeholder={placeholder}
          className="flex h-11 w-full rounded-xl border border-border bg-card px-3.5 py-2.5 pr-12 text-sm text-foreground placeholder:text-muted-foreground/50 transition-colors hover:border-muted-foreground/30 focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:outline-none" />
        {showToggle && currentValue.length > 0 && (
          <button type="button" onClick={() => setShowPassword((s) => !s)} aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex h-7 items-center justify-center rounded-lg px-2 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors focus-visible:ring-2 focus-visible:ring-primary/50">
            {showPassword ? "Hide" : "Show"}
          </button>
        )}
      </div>
      {currentValue.length > 0 && (
        <>
          <div className="flex gap-1.5">
            {[1, 2, 3, 4].map((i) => <div key={i} className={cn("h-1.5 flex-1 rounded-full transition-all duration-300", i <= score ? color : "bg-muted")} />)}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">{label}</span>
            <span className="inline-flex h-5 items-center rounded-md bg-muted px-1.5 text-xs font-medium text-muted-foreground">{score}/4</span>
          </div>
        </>
      )}
      {showChecklist && currentValue.length > 0 && (
        <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
          {REQUIREMENTS.map((req, i) => (
            <div key={req.label} className={cn("flex items-center gap-2 text-xs transition-colors", met[i] ? "text-emerald-600 dark:text-emerald-400" : "text-muted-foreground")}>
              <span className={cn("inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[10px] font-medium transition-colors",
                met[i] ? "bg-emerald-500 text-white" : "bg-muted text-muted-foreground")}>
                {met[i] ? "✓" : "○"}
              </span>
              {req.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}`;

export default function PasswordStrengthPage() {
  const [pw, setPw] = useState("");

  return (
    <ComponentDocPage
      name="Password Strength"
      category="Security"
      description="Password strength meter with visual indicator, requirement checklist, and real-time feedback."
    >
      <PreviewPanel filename="password-strength-preview.tsx">
        <div className="w-full max-w-sm">
          <PasswordStrength value={pw} onChange={setPw} />
        </div>
      </PreviewPanel>

      <SourceCodeViewer source={PASSWORD_STRENGTH_SOURCE} filename="components/ui/PasswordStrength/PasswordStrength.tsx" defaultExpanded />

      <section className="flex flex-col gap-8">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Examples
        </h2>

        <ExampleBlock
          title="Default"
          description="Password input with strength meter and requirement checklist."
          code={`import { PasswordStrength } from "@/components/ui/PasswordStrength";

<PasswordStrength value={pw} onChange={setPw} />`}
          filename="default.tsx"
        >
          <div className="w-full max-w-sm">
            <PasswordStrength value={pw} onChange={setPw} />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Meter Only"
          description="Show only the strength meter without checklist."
          code={`<PasswordStrength value={pw} onChange={setPw} showChecklist={false} />`}
          filename="meter-only.tsx"
        >
          <div className="w-full max-w-sm">
            <PasswordStrength value={pw} onChange={setPw} showChecklist={false} />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="No Toggle"
          description="Hide the show/hide password toggle."
          code={`<PasswordStrength value={pw} onChange={setPw} showToggle={false} />`}
          filename="no-toggle.tsx"
        >
          <div className="w-full max-w-sm">
            <PasswordStrength value={pw} onChange={setPw} showToggle={false} />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Custom Placeholder"
          description="Custom placeholder text."
          code={`<PasswordStrength value={pw} onChange={setPw} placeholder="Create a strong password..." />`}
          filename="custom-placeholder.tsx"
        >
          <div className="w-full max-w-sm">
            <PasswordStrength value={pw} onChange={setPw} placeholder="Create a strong password..." />
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
                <th className="px-4 py-3 text-left font-medium text-foreground">Prop</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Type</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Default</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Required</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">value</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">—</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">onChange</td>
                <td className="px-4 py-3 text-muted-foreground">(value: string) =&gt; void</td>
                <td className="px-4 py-3 text-muted-foreground">—</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">showToggle</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">true</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">showChecklist</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">true</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">placeholder</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;Enter password...&quot;</td>
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
