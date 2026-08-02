import Link from "next/link";
import type { Metadata } from "next";
import { auth } from "@/features/auth";
import { VerifyBanner } from "@/features/auth/components/account";
import { roleLabel, type PublicUser } from "@/features/auth";
import { findUserById, listLoginEvents, listSessions, toPublicUser } from "@/features/auth/server/service";

export const metadata: Metadata = {
  title: "Overview",
  description: "Your Component Library dashboard.",
};

const CONTENT_SECTIONS = [
  {
    label: "My Components",
    href: "/account/components",
    desc: "Drafts and published work",
    icon: "M21 8l-9-5-9 5v8l9 5 9-5V8ZM3 8l9 5 9-5M12 13v9",
  },
  {
    label: "Drafts",
    href: "/account/drafts",
    desc: "In progress",
    icon: "M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5Z",
  },
  {
    label: "Published",
    href: "/account/published",
    desc: "Live on the registry",
    icon: "M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4 12 14.01l-3-3",
  },
  {
    label: "Collections",
    href: "/account/collections",
    desc: "Organized groups",
    icon: "M4 5h6l2 2h8v12H4V5Z",
  },
  {
    label: "Bookmarks",
    href: "/account/bookmarks",
    desc: "Saved for later",
    icon: "M12 5l2.5 5 5.5.8-4 3.9.9 5.5L12 17.9 7.1 20.2l.9-5.5-4-3.9L9.5 10 12 5Z",
  },
  {
    label: "Downloads",
    href: "/account/downloads",
    desc: "Installed via CLI",
    icon: "M12 3v12m0 0 4-4m-4 4-4-4M4 21h16",
  },
];

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function StatCard({ label, value, note }: { label: string; value: string; note?: string }) {
  return (
    <div className="rounded-2xl border border-border bg-background p-5">
      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="mt-2 text-2xl font-semibold tracking-tight text-foreground">{value}</p>
      {note && <p className="mt-1 text-xs text-muted-foreground">{note}</p>}
    </div>
  );
}

function formatTime(date: Date): string {
  return new Intl.RelativeTimeFormat("en", { numeric: "auto" }).format(
    Math.round((date.getTime() - Date.now()) / 86_400_000),
    "day"
  );
}

export default async function AccountOverview() {
  const session = await auth();
  if (!session?.user?.id) return null;

  const [user, sessions, events] = await Promise.all([
    findUserById(session.user.id),
    listSessions(session.user.id),
    listLoginEvents(session.user.id, 6),
  ]);
  if (!user) return null;
  const profile: PublicUser = toPublicUser(user);

  return (
    <div className="flex flex-col gap-6">
      <section className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-primary-soft via-background to-background p-6 sm:p-8">
        <div className="relative z-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-foreground text-lg font-bold text-background shadow-sm">
              {initials(profile.name)}
            </span>
            <div>
              <h1 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                Welcome back, {profile.name}
              </h1>
              <div className="mt-1.5 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                <span className="rounded-full bg-primary-soft px-2.5 py-0.5 font-medium text-primary">
                  {roleLabel(profile.role)}
                </span>
                <span className="h-1 w-1 rounded-full bg-border" />
                <span>{profile.emailVerified ? "Email verified" : "Email not verified"}</span>
              </div>
            </div>
          </div>
          <Link
            href="/playground"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-foreground px-5 text-sm font-medium text-background shadow-sm transition-colors hover:bg-foreground/90"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
            Build a component
          </Link>
        </div>
      </section>

      {!profile.emailVerified && <VerifyBanner />}

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Components" value="0" note="Drafts and published" />
        <StatCard label="Active sessions" value={String(sessions.length)} note="Manage in Security" />
        <StatCard label="Sign-ins (30d)" value={String(events.length)} note="Login history" />
        <StatCard label="Role" value={roleLabel(profile.role)} note="Platform access level" />
      </div>

      <section className="rounded-2xl border border-border bg-background p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold tracking-tight text-foreground">Your content</h2>
          <Link
            href="/account/components"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Manage components
          </Link>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {CONTENT_SECTIONS.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              className="group flex flex-col gap-3 rounded-xl border border-border p-4 transition-colors hover:border-ring/60 hover:bg-muted"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted transition-colors group-hover:bg-primary-soft">
                <svg
                  className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d={section.icon} />
                </svg>
              </span>
              <div>
                <p className="text-sm font-medium text-foreground">{section.label}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{section.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-background p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold tracking-tight text-foreground">Recent activity</h2>
          <Link href="/account/history" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            View all
          </Link>
        </div>
        <ul className="mt-4 flex flex-col divide-y divide-border">
          {events.length === 0 && (
            <li className="py-3 text-sm text-muted-foreground">No sign-in activity yet.</li>
          )}
          {events.map((event) => (
            <li key={String(event._id)} className="flex items-center justify-between gap-4 py-3 text-sm">
              <div className="flex items-center gap-3">
                <span
                  className={`h-2 w-2 rounded-full ${event.status === "success" ? "bg-emerald-500" : "bg-danger"}`}
                />
                <span className="text-foreground">
                  {event.status === "success" ? "Signed in" : "Failed sign-in"} · {event.method}
                </span>
              </div>
              <span className="text-xs text-muted-foreground">
                {event.createdAt ? formatTime(new Date(event.createdAt)) : ""} · {event.ip ?? "unknown"}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
