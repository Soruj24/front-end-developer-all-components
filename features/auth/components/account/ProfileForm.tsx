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
      {state.message && (
        <p className="text-sm text-muted-foreground">{state.message}</p>
      )}
      <div>
        <Button type="submit" disabled={pending}>
          {pending ? "Saving…" : "Save changes"}
        </Button>
      </div>
    </form>
  );
}