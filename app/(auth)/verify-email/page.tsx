import type { Metadata } from "next";
import Link from "next/link";
import { AuthShell } from "@/features/auth";
import { verifyEmail } from "@/features/auth/actions";
import { ResendVerificationForm } from "@/features/auth/components";

export const metadata: Metadata = {
  title: "Verify your email",
  description: "Confirm your email address.",
};

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;
  const result = token ? await verifyEmail(token) : { ok: false, reason: "missing" as const };

  const content =
    result.ok ? (
      <div
        role="status"
        className="flex flex-col items-center gap-3 rounded-lg border border-success/20 bg-success-soft px-6 py-10 text-center"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-success/15">
          <svg className="h-6 w-6 text-success" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </span>
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Email verified</h2>
        <p className="max-w-sm text-sm text-muted-foreground">
          You can now publish components and use creator tools.
        </p>
        <Link
          href="/account"
          className="mt-2 inline-flex min-h-[44px] items-center justify-center rounded-md bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          Go to your account
        </Link>
      </div>
    ) : (
      <div className="flex flex-col items-center gap-4 rounded-lg bg-muted/50 px-6 py-10 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
          <svg className="h-6 w-6 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16v14H4zM4 6l8 6 8-6" />
          </svg>
        </span>
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          {result.reason === "missing" ? "Confirm your email" : "Link invalid or expired"}
        </h2>
        <p className="max-w-sm text-sm text-muted-foreground">
          {result.reason === "missing"
            ? "Enter your email and we&apos;ll send you a fresh verification link."
            : "Request a new link and try again within 24 hours."}
        </p>
        <div className="w-full max-w-sm">
          <ResendVerificationForm />
        </div>
      </div>
    );

  return (
    <AuthShell
      title="Verify your email"
      subtitle="One quick step to unlock publishing."
      footer={
        <Link
          href="/login"
          className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-md text-sm font-medium text-foreground underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          Back to sign in
        </Link>
      }
    >
      {content}
    </AuthShell>
  );
}