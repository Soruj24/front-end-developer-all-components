"use client";

import { useState, useTransition } from "react";
import { cn } from "@/lib/cn";

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
    <div className="border-t border-border/60 pt-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-sm">
          <h3 className="text-sm font-semibold text-foreground">Stay updated.</h3>
          <p className="mt-1 text-[13px] text-muted-foreground">
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
              "h-9 w-full rounded-lg border bg-background px-3 text-[13px] text-foreground",
              "placeholder:text-muted-foreground/60",
              "transition-colors",
              "focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring/60",
              "disabled:opacity-50",
              status === "error"
                ? "border-destructive"
                : "border-border/60",
              "sm:w-56",
            )}
          />
          <button
            type="submit"
            disabled={isPending}
            className={cn(
              "h-9 shrink-0 rounded-lg px-4 text-[13px] font-medium",
              "transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              "focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              "disabled:opacity-50",
              status === "success"
                ? "bg-success text-success-foreground"
                : "bg-foreground text-background hover:bg-foreground/90",
            )}
          >
            {isPending ? "..." : status === "success" ? "Subscribed" : "Subscribe"}
          </button>
        </form>
      </div>
      {status === "error" && (
        <p className="mt-2 text-[12px] text-destructive">
          Please enter a valid email address.
        </p>
      )}
    </div>
  );
}
