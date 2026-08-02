"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui";
import { revokeSessionAction } from "../../actions";

export function RevokeSessionButton({ sessionId }: { sessionId: string }) {
  const [pending, startTransition] = useTransition();

  return (
    <Button
      variant="outline"
      size="sm"
      disabled={pending}
      onClick={() => startTransition(() => revokeSessionAction(sessionId))}
    >
      {pending ? "Revoking…" : "Revoke"}
    </Button>
  );
}