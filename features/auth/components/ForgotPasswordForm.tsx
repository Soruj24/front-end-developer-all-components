"use client";

import { useActionState } from "react";
import { Button, Input } from "@/components/ui";
import { forgotPassword, type AuthFormState } from "../actions";
import { AlertIcon } from "./icons";

export function ForgotPasswordForm() {
  const [state, formAction, pending] = useActionState<AuthFormState, FormData>(
    forgotPassword,
    {}
  );

  // UI-only presentation hint: validation failures carry `errors`, and the
  // rate-limit message is the only other non-success copy this action returns.
  const isError =
    Boolean(state.errors && Object.keys(state.errors).length > 0) ||
    (state.message?.includes("Too many requests") ?? false);

  return (
    <form action={formAction} className="flex flex-col gap-5" noValidate>
      <Input
        name="email"
        type="email"
        label="Email"
        placeholder="you@example.com"
        autoComplete="email"
        defaultValue={state.field?.email}
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
          <div
            role="status"
            className="flex items-start gap-2.5 rounded-lg bg-success-soft px-3.5 py-3 text-sm text-success"
          >
            <svg
              className="mt-0.5 h-4 w-4 shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
            <span>{state.message}</span>
          </div>
        ))}

      <Button type="submit" size="lg" className="w-full" loading={pending}>
        {pending ? "Sending…" : "Send reset link"}
      </Button>
    </form>
  );
}
