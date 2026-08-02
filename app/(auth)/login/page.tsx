import type { Metadata } from "next";
import Link from "next/link";
import { AuthShell, LoginForm } from "@/features/auth";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to your Component Library account.",
};

export default function LoginPage() {
  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to your account to continue building."
      footer={
        <>
          New to Component Library?{" "}
          <Link
            href="/register"
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            Create an account
          </Link>
        </>
      }
    >
      <LoginForm />
    </AuthShell>
  );
}