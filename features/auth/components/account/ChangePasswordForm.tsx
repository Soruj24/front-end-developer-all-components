"use client";

import { useActionState } from "react";
import { Button, Input } from "@/components/ui";
import { changePasswordAction, type AuthFormState } from "../../actions";

export function ChangePasswordForm() {
  const [state, formAction, pending] = useActionState<AuthFormState, FormData>(
    changePasswordAction,
    {}
  );

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <Input
        name="currentPassword"
        type="password"
        label="Current password"
        autoComplete="current-password"
        error={state.errors?.currentPassword?.[0]}
      />
      <Input
        name="newPassword"
        type="password"
        label="New password"
        autoComplete="new-password"
        helperText="At least 8 characters with a letter and a number."
        error={state.errors?.newPassword?.[0]}
      />
      <Input
        name="confirmPassword"
        type="password"
        label="Confirm new password"
        autoComplete="new-password"
        error={state.errors?.confirmPassword?.[0]}
      />
      {state.message && (
        <p
          className={
            state.message === "Password updated."
              ? "text-sm text-emerald-600 dark:text-emerald-400"
              : "text-sm text-danger"
          }
        >
          {state.message}
        </p>
      )}
      <div>
        <Button type="submit" disabled={pending}>
          {pending ? "Updating…" : "Update password"}
        </Button>
      </div>
    </form>
  );
}