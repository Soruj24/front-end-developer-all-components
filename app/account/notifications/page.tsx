import type { Metadata } from "next";
import Link from "next/link";
import EmptyState from "@/components/ui/EmptyState";
import { SectionPanel } from "@/features/auth/components/account";

export const metadata: Metadata = {
  title: "Notifications",
  description: "Activity alerts, security notices, and product updates.",
};

const CHANNELS = [
  {
    title: "Security notices",
    body: "New sign-ins, password changes, and session revocations.",
    icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z",
  },
  {
    title: "Activity alerts",
    body: "Publishes, downloads, and updates to components you follow.",
    icon: "M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
  },
  {
    title: "Product updates",
    body: "Changelog entries and new template drops, at most weekly.",
    icon: "M12 4l1.7 4.3L18 10l-4.3 1.7L12 16l-1.7-4.3L6 10l4.3-1.7L12 4Z",
  },
];

function BellIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 3a5 5 0 0 1 5 5c0 6 2 7 2 7H5s2-1 2-7a5 5 0 0 1 5-5Zm-2 14a2 2 0 0 0 4 0" />
    </svg>
  );
}

export default function AccountNotifications() {
  return (
    <div className="flex min-w-0 flex-col gap-6">
      <div className="max-w-2xl">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
          Account
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Notifications
        </h1>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
          Activity alerts, security notices, and product updates — all in one place.
        </p>
      </div>

      <SectionPanel title="Inbox" subtitle="Newest first. Nothing here yet.">
        <EmptyState
          icon={<BellIcon className="h-full w-full" />}
          title="You're all caught up"
          description="Security notices, activity alerts, and updates about your components will appear here."
          action={
            <Link
              href="/components"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Browse components
            </Link>
          }
        />
      </SectionPanel>

      <SectionPanel title="What you'll get" subtitle="Three channels, no spam.">
        <ul className="flex min-w-0 flex-col divide-y divide-border/60">
          {CHANNELS.map((channel) => (
            <li key={channel.title} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
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
                  <path d={channel.icon} />
                </svg>
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-medium text-foreground">
                  {channel.title}
                </span>
                <span className="block truncate text-xs text-muted-foreground">
                  {channel.body}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </SectionPanel>
    </div>
  );
}
