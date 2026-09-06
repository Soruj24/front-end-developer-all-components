"use client";

import { useTransition, useState } from "react";
import { Button } from "@/components/ui";
import { signInWithProvider } from "../actions";
import { AlertIcon, GitHubIcon, GoogleIcon } from "./icons";

type Provider = "github" | "google";

export function OAuthButtons() {
  const [pending, startTransition] = useTransition();
  const [activeProvider, setActiveProvider] = useState<Provider | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handle(provider: Provider) {
    setError(null);
    setActiveProvider(provider);
    startTransition(async () => {
      try {
        const result = await signInWithProvider(provider);
        if (result?.error) setError(result.error);
      } finally {
        setActiveProvider(null);
      }
    });
  }

  return (
    <div className="flex flex-col gap-2.5">
      <Button
        type="button"
        variant="outline"
        size="lg"
        className="w-full"
        loading={pending && activeProvider === "github"}
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
        loading={pending && activeProvider === "google"}
        disabled={pending}
        onClick={() => handle("google")}
      >
        <GoogleIcon className="h-4 w-4" />
        Continue with Google
      </Button>
      {error && (
        <div
          role="alert"
          className="flex items-start gap-2.5 rounded-lg bg-danger-soft px-3.5 py-3 text-sm text-danger"
        >
          <AlertIcon className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
