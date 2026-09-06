"use client";

import { useActionState } from "react";
import { Button, Input } from "@/components/ui";
import { updateProfileAction, type AuthFormState } from "../../actions";

export function ProfileForm({ name }: { name: string }) {
  const [state, formAction, pending] = useActionState<AuthFormState, FormData>(
    updateProfileAction,
    {}
  );

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <Input
        name="name"
        label="Full name"
        placeholder="John Doe"
        autoComplete="name"
        defaultValue={state.field?.name ?? name}
        error={state.errors?.name?.[0]}
      />
      {state.message &&
        (state.message === "Not signed in." ? (
          <p
            role="alert"
            className="rounded-lg bg-danger-soft px-3 py-2 text-sm text-danger"
          >
            {state.message}
          </p>
        ) : (
          <p
            role="status"
            className="rounded-lg bg-success-soft px-3 py-2 text-sm text-success"
          >
            {state.message}
          </p>
        ))}
      <div>
        <Button type="submit" loading={pending}>
          {pending ? "Saving…" : "Save changes"}
        </Button>
      </div>
    </form>
  );
}