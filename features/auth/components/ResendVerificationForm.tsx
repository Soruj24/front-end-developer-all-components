"use client";

import { useActionState } from "react";
import { Button, Input } from "@/components/ui";
import { resendVerification, type AuthFormState } from "../actions";
import { AlertIcon } from "./icons";

export function ResendVerificationForm({ email }: { email?: string }) {
  const [state, formAction, pending] = useActionState<AuthFormState, FormData>(
    resendVerification,
    {}
  );

  // UI-only presentation hint: validation failures carry `errors`, and the
  // rate-limit message is the only other non-success copy this action returns.
  const isError =
    Boolean(state.errors && Object.keys(state.errors).length > 0) ||
    (state.message?.includes("Too many requests") ?? false);

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
      {state.message &&
        (isError ? (
          <div
            role="alert"
            className="flex items-start gap-2.5 rounded-lg bg-danger-soft px-3.5 py-3 text-sm text-danger"
          >
            <AlertIcon className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{state.message}</span>
          </div>
        ) : (
          <p
            role="status"
            className="rounded-lg bg-success-soft px-3.5 py-3 text-sm text-success"
          >
            {state.message}
          </p>
        ))}
      <Button type="submit" variant="secondary" loading={pending}>
        {pending ? "Sending…" : "Resend verification email"}
      </Button>
    </form>
  );
}
