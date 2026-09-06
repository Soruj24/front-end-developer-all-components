import type { Metadata } from "next";
import Link from "next/link";
import { auth } from "@/features/auth";
import { SectionPanel, ProfileForm } from "@/features/auth/components/account";
import { roleLabel } from "@/features/auth";
import { findUserById, toPublicUser } from "@/features/auth/server/service";

export const metadata: Metadata = {
  title: "Profile",
  description: "Manage your profile.",
};

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export default async function AccountProfile() {
  const session = await auth();
  const user = session?.user?.id ? await findUserById(session.user.id) : null;
  const profile = user ? toPublicUser(user) : null;

  const name = profile?.name ?? "Unnamed user";
  const email = profile?.email ?? "";

  return (
    <div className="flex min-w-0 flex-col gap-6">
      <div className="flex min-w-0 items-center gap-4">
        <span
          aria-hidden="true"
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-foreground text-lg font-bold text-background shadow-sm"
        >
          {initials(name)}
        </span>
        <div className="min-w-0">
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
            Account
          </p>
          <h1 className="truncate text-2xl font-semibold tracking-tight text-foreground">
            {name}
          </h1>
          <div className="mt-1.5 flex min-w-0 flex-wrap items-center gap-2">
            {email && (
              <span className="truncate text-sm text-muted-foreground">{email}</span>
            )}
            {profile && (
              <span className="shrink-0 rounded-full bg-primary-soft px-2.5 py-0.5 text-[11px] font-medium text-primary">
                {roleLabel(profile.role)}
              </span>
            )}
          </div>
        </div>
      </div>

      <SectionPanel title="Account details" subtitle="Your public identity. Saving updates it everywhere.">
        <ProfileForm name={profile?.name ?? ""} />
      </SectionPanel>

      <SectionPanel title="Email address" subtitle="Used to sign in and receive notifications.">
        <div className="flex min-h-[44px] min-w-0 items-center gap-3">
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-medium text-foreground">
              {email || "No email on file"}
            </span>
            <span className="block truncate text-xs text-muted-foreground">
              {profile?.emailVerified
                ? "Verified — publishing and creator tools are unlocked."
                : "Not verified — confirm your inbox to unlock publishing."}
            </span>
          </span>
          {profile?.emailVerified ? (
            <span className="shrink-0 rounded-full bg-success-soft px-2.5 py-1 text-[11px] font-medium text-success">
              Verified
            </span>
          ) : (
            <Link
              href="/account/security"
              className="shrink-0 rounded-md bg-primary px-3 py-2 text-[13px] font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Verify email
            </Link>
          )}
        </div>
      </SectionPanel>
    </div>
  );
}
