"use client";

import { useActionState } from "react";
import { Button, Input } from "@/components/ui";
import { resendVerification, type AuthFormState } from "../actions";

export function ResendVerificationForm({ email }: { email?: string }) {
  const [state, formAction, pending] = useActionState<AuthFormState, FormData>(
    resendVerification,
    {}
  );

  return (
    <form action={formAction} className="flex w-full flex-col gap-4">
      <Input
        name="email"
        type="email"
        label="Email address"
        placeholder="you@example.com"
        defaultValue={state.field?.email ?? email}
        error={state.errors?.email?.[0]}
      />
      {state.message && (
        <p className="text-sm text-muted-foreground">{state.message}</p>
      )}
      <Button type="submit" variant="secondary" disabled={pending}>
        {pending ? "Sending…" : "Resend verification email"}
      </Button>
    </form>
  );
}