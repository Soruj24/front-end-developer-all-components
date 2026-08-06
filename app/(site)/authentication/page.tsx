"use client";

import { useState, type ComponentType } from "react";
import { ComponentPreview } from "@/components/preview";
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

export default function Authentication() {
  const [activePattern, setActivePattern] = useState(0);
  const { Render: Active, registryId } = AUTH_PATTERNS[activePattern];

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 p-6 sm:p-10 lg:p-14">
      <div className="text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Authentication</h1>
        <p className="mt-2 text-muted-foreground dark:text-muted-foreground/70">Comprehensive auth form examples with validation and flows</p>
      </div>

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
    </div>
  );
}
