"use client";

import { useState, useTransition } from "react";
import { cn } from "@/lib/cn";
import {
  BORDER,
  BG,
  RADIUS,
  FOCUS,
  TEXT,
  TRANSITION,
} from "@/constants/tokens";

export function FooterNewsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      return;
    }
    startTransition(() => {
      setStatus("success");
      setEmail("");
      setTimeout(() => setStatus("idle"), 3000);
    });
  };

  return (
    <div className={cn("border-t pt-6", BORDER.default)}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-sm">
          <h3 className={cn("font-semibold text-foreground", TEXT.brand)}>
            Stay updated.
          </h3>
          <p className={cn("mt-1 text-muted-foreground", TEXT.body)}>
            Get updates about new components, templates and developer tools.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <label htmlFor="footer-email" className="sr-only">
            Email address
          </label>
          <input
            id="footer-email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status !== "idle") setStatus("idle");
            }}
            placeholder="you@example.com"
            disabled={isPending}
            className={cn(
              "h-9 w-full border bg-background px-3 text-foreground",
              RADIUS.sm,
              "placeholder:text-muted-foreground/60",
              TRANSITION.colors,
              FOCUS.ringInput,
              "disabled:opacity-50",
              status === "error"
                ? "border-destructive"
                : BORDER.default,
              "sm:w-56",
              TEXT.body,
            )}
          />
          <button
            type="submit"
            disabled={isPending}
            className={cn(
              "h-9 shrink-0 px-4 font-medium",
              RADIUS.sm,
              TEXT.body,
              TRANSITION.colors,
              FOCUS.ring,
              "disabled:opacity-50",
              status === "success"
                ? `${BG.accent} text-success-foreground`
                : `${BG.primary} text-background hover:bg-foreground/90`,
            )}
          >
            {isPending ? "..." : status === "success" ? "Subscribed" : "Subscribe"}
          </button>
        </form>
      </div>
      {status === "error" && (
        <p className={cn("mt-2 text-destructive", TEXT.fine)}>
          Please enter a valid email address.
        </p>
      )}
    </div>
  );
}
