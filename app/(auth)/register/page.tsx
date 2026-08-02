import type { Metadata } from "next";
import Link from "next/link";
import { AuthShell, RegisterForm } from "@/features/auth";

export const metadata: Metadata = {
  title: "Create an account",
  description: "Create your free Component Library account.",
};

export default function RegisterPage() {
  return (
    <AuthShell
      title="Create your account"
      subtitle="Join Component Library and start building with 1000+ components."
      footer={
        <>
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            Sign in
          </Link>
        </>
      }
    >
      <RegisterForm />
    </AuthShell>
  );
}