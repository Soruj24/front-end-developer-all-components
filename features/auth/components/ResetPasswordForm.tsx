"use client";

import Link from "next/link";
import { useActionState } from "react";
import { Button, Input } from "@/components/ui";
import { resetPassword, type AuthFormState } from "../actions";

export function ResetPasswordForm({ token }: { token: string }) {
  const [state, formAction, pending] = useActionState<AuthFormState, FormData>(
    resetPassword.bind(null, token),
    {}
  );

  return (
    <form action={formAction} className="flex flex-col gap-5" noValidate>
      <Input
        name="password"
        type="password"
        label="New password"
        placeholder="Create a new password"
        autoComplete="new-password"
        helperText="At least 8 characters with a letter and a number."
        error={state.errors?.password?.[0]}
      />
      <Input
        name="confirmPassword"
        type="password"
        label="Confirm password"
        placeholder="Repeat your password"
        autoComplete="new-password"
        error={state.errors?.confirmPassword?.[0]}
      />

      {state.message && (
        <div className="rounded-lg border border-danger/30 bg-danger/10 px-3 py-2.5 text-sm text-danger">
          {state.message}
        </div>
      )}

      <Button type="submit" size="lg" className="w-full" disabled={pending}>
        {pending ? (
          <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4z" />
          </svg>
        ) : (
          "Update password"
        )}
      </Button>

      <Link
        href="/login"
        className="text-center text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        ← Back to sign in
      </Link>
    </form>
  );
}