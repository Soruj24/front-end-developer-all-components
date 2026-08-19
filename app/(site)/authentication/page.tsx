"use client";

import { useState, type ComponentType } from "react";
import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { SignInForm } from "./components/SignInForm";
import { SignUpForm } from "./components/SignUpForm";
import { PasswordResetForm } from "./components/PasswordResetForm";
import { TwoFactorForm } from "./components/TwoFactorForm";
import { LockedForm } from "./components/LockedForm";
import { MagicLinkForm } from "./components/MagicLinkForm";
import { SessionExpiredForm } from "./components/SessionExpiredForm";

const AUTH_PATTERNS: Array<{ label: string; Render: ComponentType }> = [
  { label: "Sign In", Render: SignInForm },
  { label: "Sign Up", Render: SignUpForm },
  { label: "Password Reset", Render: PasswordResetForm },
  { label: "Two-Factor", Render: TwoFactorForm },
  { label: "Account Locked", Render: LockedForm },
  { label: "Magic Link", Render: MagicLinkForm },
  { label: "Session Expired", Render: SessionExpiredForm },
];

const AUTH_SOURCE = `"use client";

import { useState } from "react";

interface SignInFormProps {
  onSuccess?: () => void;
}

export function SignInForm({ onSuccess }: SignInFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const inputClass =
    "w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSuccess?.();
    }, 1500);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto w-full max-w-md space-y-4 rounded-xl border border-border bg-card p-6 shadow-sm"
    >
      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-muted-foreground">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-muted-foreground">
          Password
        </label>
        <input
          id="password"
          type="password"
          required
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={inputClass}
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-primary py-2.5 text-sm font-medium text-primary-foreground transition hover:bg-primary/90 disabled:opacity-50"
      >
        {loading ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
}`;

export default function AuthenticationPage() {
  const [activePattern, setActivePattern] = useState(0);
  const { Render: Active } = AUTH_PATTERNS[activePattern];

  return (
    <ComponentDocPage
      name="Authentication"
      category="Forms"
      description="Comprehensive auth form examples with validation and flows. Each pattern is interactive — use the tabs to switch between different authentication UIs."
    >
      <PreviewPanel filename="authentication.tsx">
        <div className="flex w-full flex-col items-center gap-5">
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
          <Active />
        </div>
      </PreviewPanel>

      <SourceCodeViewer source={AUTH_SOURCE} filename="components/ui/Authentication/SignInForm.tsx" defaultExpanded />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Sign In" description="Email and password sign-in with validation and loading state." code="<SignInForm />"><SignInForm /></ExampleBlock>
        <ExampleBlock title="Sign Up" description="Create an account with name, email, and password fields." code="<SignUpForm />"><SignUpForm /></ExampleBlock>
        <ExampleBlock title="Password Reset" description="Request a password reset link by email." code="<PasswordResetForm />"><PasswordResetForm /></ExampleBlock>
        <ExampleBlock title="Two-Factor" description="Verify identity with a one-time authentication code." code="<TwoFactorForm />"><TwoFactorForm /></ExampleBlock>
        <ExampleBlock title="Account Locked" description="Notify users their account was temporarily locked." code="<LockedForm />"><LockedForm /></ExampleBlock>
        <ExampleBlock title="Magic Link" description="Passwordless sign-in via an emailed magic link." code="<MagicLinkForm />"><MagicLinkForm /></ExampleBlock>
        <ExampleBlock title="Session Expired" description="Prompt users to re-authenticate after an idle timeout." code="<SessionExpiredForm />"><SessionExpiredForm /></ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}