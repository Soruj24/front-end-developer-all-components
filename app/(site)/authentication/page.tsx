"use client";

import { useState, type ComponentType } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { SignInForm } from "./components/SignInForm";
import { SignUpForm } from "./components/SignUpForm";
import { PasswordResetForm } from "./components/PasswordResetForm";
import { TwoFactorForm } from "./components/TwoFactorForm";
import { LockedForm } from "./components/LockedForm";
import { MagicLinkForm } from "./components/MagicLinkForm";
import { SessionExpiredForm } from "./components/SessionExpiredForm";

const AUTH_PATTERNS: Array<{ label: string; Render: ComponentType; registryId: string }> = [
  { label: "Sign In", Render: SignInForm, registryId: "auth-sign-in" },
  { label: "Sign Up", Render: SignUpForm, registryId: "auth-sign-up" },
  { label: "Password Reset", Render: PasswordResetForm, registryId: "auth-password-reset" },
  { label: "Two-Factor", Render: TwoFactorForm, registryId: "auth-two-factor" },
  { label: "Account Locked", Render: LockedForm, registryId: "auth-locked" },
  { label: "Magic Link", Render: MagicLinkForm, registryId: "auth-magic-link" },
  { label: "Session Expired", Render: SessionExpiredForm, registryId: "auth-session-expired" },
];

const installCommand = `npx component-library@latest add authentication`;

const usageCode = `import { SignInForm } from "@/components/authentication/SignInForm";
import { SignUpForm } from "@/components/authentication/SignUpForm";
import { PasswordResetForm } from "@/components/authentication/PasswordResetForm";

// Use any auth form pattern
<SignInForm />
<SignUpForm />
<PasswordResetForm />`;

export default function Authentication() {
  const [activePattern, setActivePattern] = useState(0);
  const { Render: Active, registryId } = AUTH_PATTERNS[activePattern];

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Authentication</h1>
          <Badge variant="primary">{AUTH_PATTERNS.length} patterns</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Comprehensive auth form examples with validation and flows. Each pattern is
          interactive — use the tabs to switch between different authentication UIs.
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

      {/* Examples */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Examples</h2>
        <p className="text-sm text-muted-foreground">Each authentication pattern can be used independently as a standalone component.</p>

        <div className="flex flex-wrap justify-center gap-2">
          {AUTH_PATTERNS.map((pattern, i) => (
            <button
              key={pattern.label}
              onClick={() => setActivePattern(i)}
              className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
                activePattern === i
                  ? "bg-blue-600 text-white"
                  : "bg-muted text-muted-foreground hover:bg-muted dark:text-muted-foreground/70 dark:hover:bg-zinc-700"
              }`}
            >
              {pattern.label}
            </button>
          ))}
        </div>

        <ComponentPreview id={registryId} title={AUTH_PATTERNS[activePattern].label}>
          <Active />
        </ComponentPreview>

        <p className="text-center text-xs text-muted-foreground/70">
          Pattern {activePattern + 1} of {AUTH_PATTERNS.length} —{" "}
          <span className="font-medium">{AUTH_PATTERNS[activePattern].label}</span>
        </p>
      </section>

      {/* API Reference */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left font-medium">Pattern</th>
                <th className="px-4 py-3 text-left font-medium">Component</th>
                <th className="px-4 py-3 text-left font-medium">Registry ID</th>
                <th className="px-4 py-3 text-left font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              {AUTH_PATTERNS.map((pattern) => (
                <tr key={pattern.registryId} className="border-b">
                  <td className="px-4 py-3 font-mono text-xs">{pattern.label}</td>
                  <td className="px-4 py-3 text-muted-foreground">{pattern.Render.name || "Component"}</td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{pattern.registryId}</td>
                  <td className="px-4 py-3 text-muted-foreground">Authentication form for {pattern.label.toLowerCase()} flow</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
