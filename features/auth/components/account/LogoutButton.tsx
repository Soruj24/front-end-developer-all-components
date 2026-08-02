"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui";
import { logout } from "../../actions";

export function LogoutButton() {
  const [pending, startTransition] = useTransition();

  return (
    <Button
      variant="ghost"
      className="w-full justify-start text-danger"
      disabled={pending}
      onClick={() => startTransition(() => logout())}
    >
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4m7 14 5-5-5-5m5 5H9" />
      </svg>
      {pending ? "Signing out…" : "Sign out"}
    </Button>
  );
}