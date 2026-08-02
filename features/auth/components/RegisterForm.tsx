"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { Button, Input } from "@/components/ui";
import { register, type AuthFormState } from "../actions";
import { OAuthButtons } from "./OAuthButtons";
import { PasswordField } from "./PasswordField";
import { PasswordStrengthMeter } from "./PasswordStrengthMeter";
import { AlertIcon, AtIcon, MailIcon, SpinnerIcon, UserIcon } from "./icons";

export function RegisterForm() {
  const [state, formAction, pending] = useActionState<AuthFormState, FormData>(register, {});
  const [password, setPassword] = useState("");
  const [terms, setTerms] = useState(false);

  const nameError = state.errors?.name?.[0];
  const usernameError = state.errors?.username?.[0];
  const emailError = state.errors?.email?.[0];
  const passwordError = state.errors?.password?.[0];
  const confirmError = state.errors?.confirmPassword?.[0];
  const termsError = state.errors?.terms?.[0];

  return (
    <div className="flex flex-col gap-5">
      <OAuthButtons />

      <div className="relative">
        <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-border" />
        <span className="relative mx-auto flex w-max items-center justify-center bg-surface px-3 text-xs font-medium uppercase tracking-widest text-muted-foreground">
          or sign up with email
        </span>
      </div>

      {state.message && (
        <div
          role="alert"
          className="flex items-start gap-2.5 rounded-lg border border-danger/30 bg-danger-soft px-3.5 py-3 text-sm text-danger"
        >
          <AlertIcon className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{state.message}</span>
        </div>
      )}

      <form action={formAction} className="flex flex-col gap-4" noValidate>
        <Input
          name="name"
          label="Full name"
          placeholder="John Doe"
          autoComplete="name"
          icon={<UserIcon className="h-4 w-4" />}
          defaultValue={state.field?.name}
          aria-invalid={nameError ? true : undefined}
          error={nameError}
        />
        <Input
          name="username"
          label="Username"
          placeholder="johndoe"
          autoComplete="username"
          icon={<AtIcon className="h-4 w-4" />}
          defaultValue={state.field?.username}
          helperText="Letters, numbers, hyphens, and underscores."
          aria-invalid={usernameError ? true : undefined}
          error={usernameError}
        />
        <Input
          name="email"
          type="email"
          label="Email"
          placeholder="you@example.com"
          autoComplete="email"
          icon={<MailIcon className="h-4 w-4" />}
          defaultValue={state.field?.email}
          aria-invalid={emailError ? true : undefined}
          error={emailError}
        />

        <div className="flex flex-col gap-2">
          <PasswordField
            id="register-password"
            name="password"
            label="Password"
            placeholder="Create a password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={passwordError}
          />
          <PasswordStrengthMeter password={password} />
        </div>

        <PasswordField
          id="register-confirm"
          name="confirmPassword"
          label="Confirm password"
          placeholder="Repeat your password"
          autoComplete="new-password"
          error={confirmError}
        />

        <div className="flex items-start gap-2.5 rounded-lg border border-border bg-muted/50 px-3.5 py-3 text-sm text-muted-foreground">
          <MailIcon className="mt-0.5 h-4 w-4 shrink-0 text-foreground" />
          <span>
            We&apos;ll email you a confirmation link. Verify your account to unlock publishing.
          </span>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="flex cursor-pointer select-none items-start gap-2.5 text-sm text-muted-foreground">
            <input
              type="checkbox"
              name="terms"
              checked={terms}
              onChange={(e) => setTerms(e.target.checked)}
              aria-invalid={termsError ? true : undefined}
              className="mt-0.5 h-4 w-4 rounded border-input accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            />
            <span>
              I agree to the{" "}
              <Link
                href="/terms"
                className="font-medium text-foreground underline-offset-4 hover:underline"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="font-medium text-foreground underline-offset-4 hover:underline"
              >
                Privacy Policy
              </Link>
              .
            </span>
          </label>
          {termsError && (
            <p role="alert" className="text-sm text-danger">
              {termsError}
            </p>
          )}
        </div>

        <Button type="submit" size="lg" className="w-full" disabled={pending} aria-busy={pending}>
          {pending && <SpinnerIcon className="h-4 w-4 animate-spin" />}
          {pending ? "Creating account…" : "Create account"}
        </Button>
      </form>
    </div>
  );
}
