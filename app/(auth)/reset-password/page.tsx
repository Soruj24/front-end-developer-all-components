import type { Metadata } from "next";
import Link from "next/link";
import { AuthShell } from "@/features/auth";
import { ResetPasswordForm } from "@/features/auth/components";

export const metadata: Metadata = {
  title: "Reset password",
  description: "Choose a new password.",
};

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  if (!token) {
    return (
      <AuthShell
        title="Reset your password"
        subtitle="This link is missing its token."
        footer={
          <Link href="/forgot-password" className="text-sm font-medium text-foreground underline-offset-4 hover:underline">
            Request a new link
          </Link>
        }
      >
        <div className="rounded-lg bg-muted/50 px-6 py-8 text-center text-sm text-muted-foreground">
          Open the full link from your email, or request a new one.
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      title="Choose a new password"
      subtitle="Make it strong — at least 8 characters with a letter and a number."
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
      <ResetPasswordForm token={token} />
    </AuthShell>
  );
}