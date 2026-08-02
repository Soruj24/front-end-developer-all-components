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
        <div className="rounded-2xl border border-border bg-background px-6 py-8 text-center text-sm text-muted-foreground">
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
        <Link href="/login" className="text-sm font-medium text-foreground underline-offset-4 hover:underline">
          ← Back to sign in
        </Link>
      }
    >
      <ResetPasswordForm token={token} />
    </AuthShell>
  );
}