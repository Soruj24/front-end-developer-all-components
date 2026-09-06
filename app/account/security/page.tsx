import type { Metadata } from "next";
import Link from "next/link";
import { auth } from "@/features/auth";
import { SectionPanel, ChangePasswordForm, ResendVerificationForm } from "@/features/auth/components/account";
import { findUserById, toPublicUser } from "@/features/auth/server/service";

export const metadata: Metadata = {
  title: "Security",
  description: "Manage password, verification, and two-factor authentication.",
};

export default async function AccountSecurity() {
  const session = await auth();
  const user = session?.user?.id ? await findUserById(session.user.id) : null;
  const profile = user ? toPublicUser(user) : null;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Security</h1>
        <p className="text-sm text-muted-foreground">Password, verification, and 2FA.</p>
      </div>

      <SectionPanel title="Email verification" subtitle="Required to unlock publishing.">
        {profile?.emailVerified ? (
          <p className="flex items-center gap-2 text-sm text-success">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6 9 17l-5-5" />
            </svg>
            Email confirmed
          </p>
        ) : (
          <ResendVerificationForm email={profile?.email} />
        )}
      </SectionPanel>

      <SectionPanel title="Password" subtitle="Change the password you sign in with.">
        <ChangePasswordForm />
      </SectionPanel>

      <SectionPanel title="Two-factor authentication" subtitle="Add an extra layer of security.">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-foreground">
              Available in Phase 2
            </p>
            <p className="mt-0.5 text-sm text-muted-foreground">
              TOTP codes from an authenticator app, plus recovery codes.
            </p>
          </div>
          <span className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground">
            Coming soon
          </span>
        </div>
      </SectionPanel>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Link
          href="/account/sessions"
          className="rounded-lg border border-border/60 bg-surface p-5 shadow-sm transition-colors hover:border-ring/60 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <h2 className="text-base font-semibold tracking-tight text-foreground">Active sessions</h2>
          <p className="mt-1 text-sm text-muted-foreground">Review and revoke devices.</p>
        </Link>
        <Link
          href="/account/history"
          className="rounded-lg border border-border/60 bg-surface p-5 shadow-sm transition-colors hover:border-ring/60 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <h2 className="text-base font-semibold tracking-tight text-foreground">Login history</h2>
          <p className="mt-1 text-sm text-muted-foreground">Review recent sign-ins.</p>
        </Link>
      </div>
    </div>
  );
}