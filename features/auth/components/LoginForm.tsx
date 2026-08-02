"use client";

import Link from "next/link";
import { useActionState } from "react";
import { Button, Input } from "@/components/ui";
import { login, type AuthFormState } from "../actions";
import { OAuthButtons } from "./OAuthButtons";
import { PasswordField } from "./PasswordField";
import { AlertIcon, MailIcon, SpinnerIcon } from "./icons";
import { useRememberMe } from "../hooks/useRememberMe";

export function LoginForm() {
  const [state, formAction, pending] = useActionState<AuthFormState, FormData>(login, {});
  const { email, remember, persist } = useRememberMe();

  const emailError = state.errors?.email?.[0];
  const passwordError = state.errors?.password?.[0];

  return (
    <div className="flex flex-col gap-5">
      <OAuthButtons />

      <div className="relative">
        <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-border" />
        <span className="relative mx-auto flex w-max items-center justify-center bg-surface px-3 text-xs font-medium uppercase tracking-widest text-muted-foreground">
          or continue with email
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
          name="email"
          type="email"
          label="Email"
          placeholder="you@example.com"
          autoComplete="email"
          icon={<MailIcon className="h-4 w-4" />}
          value={email}
          onChange={(e) => persist(e.target.value, remember)}
          aria-invalid={emailError ? true : undefined}
          error={emailError}
        />

        <PasswordField
          id="login-password"
          name="password"
          label="Password"
          placeholder="••••••••"
          autoComplete="current-password"
          error={passwordError}
          labelAction={
            <Link
              href="/forgot-password"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Forgot password?
            </Link>
          }
        />

        <label className="flex cursor-pointer select-none items-center gap-2.5 text-sm text-foreground">
          <input
            type="checkbox"
            name="remember"
            checked={remember}
            onChange={(e) => persist(email, e.target.checked)}
            className="h-4 w-4 rounded border-input accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          />
          <span>Remember me</span>
        </label>

        <Button type="submit" size="lg" className="w-full" disabled={pending} aria-busy={pending}>
          {pending && <SpinnerIcon className="h-4 w-4 animate-spin" />}
          {pending ? "Signing in…" : "Sign in"}
        </Button>
      </form>
    </div>
  );
}
