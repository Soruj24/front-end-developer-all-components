import type { Metadata } from "next";
import Link from "next/link";
import { AuthShell } from "@/features/auth";
import { ForgotPasswordForm } from "@/features/auth/components";

export const metadata: Metadata = {
  title: "Forgot password",
  description: "Request a password reset link.",
};

export default function ForgotPasswordPage() {
  return (
    <AuthShell
      title="Reset your password"
      subtitle="Enter your email and we&apos;ll send you a reset link."
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
      <ForgotPasswordForm />
    </AuthShell>
  );
}