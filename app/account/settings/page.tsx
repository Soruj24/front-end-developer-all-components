import type { Metadata } from "next";
import { auth } from "@/features/auth";
import { SectionPanel, ProfileForm } from "@/features/auth/components/account";
import { findUserById, toPublicUser } from "@/features/auth/server/service";
import { ThemeSwitcher } from "@/components/layout/header";
import { SettingsRow } from "./SettingsRow";

export const metadata: Metadata = {
  title: "Settings",
  description: "Preferences for your account and workspace.",
};

const MANAGE_ROWS = [
  {
    href: "/account/security",
    label: "Security",
    description: "Password, email verification, and two-factor authentication.",
    icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z",
  },
  {
    href: "/account/sessions",
    label: "Active sessions",
    description: "Review and revoke devices signed in to your account.",
    icon: "M4 5h16a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm8 15h-4m4 0h4m-4 0v-4",
  },
  {
    href: "/account/history",
    label: "Login history",
    description: "Recent sign-in attempts from the last 90 days.",
    icon: "M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
  },
  {
    href: "/account/notifications",
    label: "Notifications",
    description: "Activity alerts, security notices, and product updates.",
    icon: "M12 3a5 5 0 0 1 5 5c0 6 2 7 2 7H5s2-1 2-7a5 5 0 0 1 5-5Zm-2 14a2 2 0 0 0 4 0",
  },
  {
    href: "/account/api-keys",
    label: "API keys",
    description: "Tokens for the registry API and command-line tools.",
    icon: "m8 8-5 4 5 4m8-8 5 4-5 4",
  },
  {
    href: "/account/ai-usage",
    label: "AI usage",
    description: "Model consumption, limits, and billing period.",
    icon: "M12 4l1.7 4.3L18 10l-4.3 1.7L12 16l-1.7-4.3L6 10l4.3-1.7L12 4Zm7 11 1 2.5L22.5 18.5 20 19.5 19 22l-1-2.5-2.5-1L18 17.5 19 15Z",
  },
];

export default async function AccountSettings() {
  const session = await auth();
  const user = session?.user?.id ? await findUserById(session.user.id) : null;
  const profile = user ? toPublicUser(user) : null;

  return (
    <div className="flex min-w-0 flex-col gap-6">
      <div className="max-w-2xl">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
          Account
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Settings
        </h1>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
          Preferences for your account and workspace. Changes save immediately
          unless a form says otherwise.
        </p>
      </div>

      <SectionPanel title="Appearance" subtitle="Theme applies instantly on this device.">
        <div className="flex min-h-[44px] items-center gap-3">
          <span
            aria-hidden="true"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted"
          >
            <svg
              className="h-4 w-4 text-muted-foreground"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M6.3 17.7l-1.4 1.4M19.1 4.9l-1.4 1.4" />
            </svg>
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-medium text-foreground">
              Theme
            </span>
            <span className="block truncate text-xs text-muted-foreground">
              Light, dark, or follow your system.
            </span>
          </span>
          <ThemeSwitcher />
        </div>
      </SectionPanel>

      <SectionPanel title="Account details" subtitle="How you appear across the platform.">
        <ProfileForm name={profile?.name ?? ""} />
        <div className="mt-5 flex min-h-[44px] items-center gap-3 border-t border-border/60 pt-5">
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-medium text-foreground">
              {profile?.email ?? "No email on file"}
            </span>
            <span className="block truncate text-xs text-muted-foreground">
              {profile?.emailVerified
                ? "Verified — publishing and creator tools are unlocked."
                : "Not verified — confirm your inbox to unlock publishing."}
            </span>
          </span>
          <span
            className={
              profile?.emailVerified
                ? "shrink-0 rounded-full bg-success-soft px-2.5 py-1 text-[11px] font-medium text-success"
                : "shrink-0 rounded-full bg-warning-soft px-2.5 py-1 text-[11px] font-medium text-warning"
            }
          >
            {profile?.emailVerified ? "Verified" : "Action needed"}
          </span>
        </div>
      </SectionPanel>

      <SectionPanel title="Manage" subtitle="Security, sessions, and workspace tools.">
        <ul className="flex min-w-0 flex-col divide-y divide-border/60">
          {MANAGE_ROWS.map((row) => (
            <li key={row.href}>
              <SettingsRow
                href={row.href}
                icon={row.icon}
                label={row.label}
                description={row.description}
                badge={
                  row.href === "/account/security" && !profile?.emailVerified
                    ? "Action needed"
                    : undefined
                }
              />
            </li>
          ))}
        </ul>
      </SectionPanel>
    </div>
  );
}
