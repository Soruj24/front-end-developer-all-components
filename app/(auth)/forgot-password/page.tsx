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
        <Link href="/login" className="text-sm font-medium text-foreground underline-offset-4 hover:underline">
          ← Back to sign in
        </Link>
      }
    >
      <ForgotPasswordForm />
    </AuthShell>
  );
}