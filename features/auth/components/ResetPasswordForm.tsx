"use client";

import { useActionState } from "react";
import { Button, Input } from "@/components/ui";
import { resetPassword, type AuthFormState } from "../actions";
import { AlertIcon } from "./icons";

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
        <div
          role="alert"
          className="flex items-start gap-2.5 rounded-lg bg-danger-soft px-3.5 py-3 text-sm text-danger"
        >
          <AlertIcon className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{state.message}</span>
        </div>
      )}

      <Button type="submit" size="lg" className="w-full" loading={pending}>
        {pending ? "Updating…" : "Update password"}
      </Button>
    </form>
  );
}
