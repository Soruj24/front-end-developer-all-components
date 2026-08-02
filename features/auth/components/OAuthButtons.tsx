"use client";

import { useTransition, useState } from "react";
import { Button } from "@/components/ui";
import { signInWithProvider } from "../actions";
import { GitHubIcon, GoogleIcon } from "./icons";

export function OAuthButtons() {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handle(provider: "github" | "google") {
    setError(null);
    startTransition(async () => {
      const result = await signInWithProvider(provider);
      if (result?.error) setError(result.error);
    });
  }

  return (
    <div className="flex flex-col gap-2.5">
      <Button
        type="button"
        variant="outline"
        size="lg"
        className="w-full"
        disabled={pending}
        onClick={() => handle("github")}
      >
        <GitHubIcon className="h-4 w-4" />
        Continue with GitHub
      </Button>
      <Button
        type="button"
        variant="outline"
        size="lg"
        className="w-full"
        disabled={pending}
        onClick={() => handle("google")}
      >
        <GoogleIcon className="h-4 w-4" />
        Continue with Google
      </Button>
      {error && (
        <p role="alert" className="text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
