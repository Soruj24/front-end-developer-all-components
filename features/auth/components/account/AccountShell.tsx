import Link from "next/link";
import type { ReactNode } from "react";
import type { PublicUser } from "../../types/role";
import { roleLabel } from "../../constants";
import { AccountNav } from "./AccountNav";
import { MobileAccountNav } from "./MobileAccountNav";
import { LogoutButton } from "./LogoutButton";

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function AccountShell({
  user,
  children,
}: {
  user: PublicUser;
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-border bg-background/80 px-4 backdrop-blur-xl sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80 text-[11px] font-bold text-primary-foreground">
            CL
          </span>
          <span className="hidden text-sm font-semibold tracking-tight text-foreground sm:inline">
            Component Library
          </span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/account/notifications"
            aria-label="Notifications"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3a5 5 0 0 1 5 5c0 6 2 7 2 7H5s2-1 2-7a5 5 0 0 1 5-5Zm-2 14a2 2 0 0 0 4 0" />
            </svg>
          </Link>
          <span className="hidden rounded-full border border-border px-2.5 py-1 text-xs font-medium text-muted-foreground md:inline">
            {roleLabel(user.role)}
          </span>
          <Link
            href="/"
            className="hidden text-sm text-muted-foreground transition-colors hover:text-foreground sm:inline"
          >
            Back to site
          </Link>
          <span
            className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-foreground to-foreground/70 text-xs font-semibold text-background"
            title={user.email}
          >
            {initials(user.name)}
          </span>
        </div>
      </header>

      <MobileAccountNav />

      <div className="mx-auto flex w-full max-w-[1200px] flex-1 gap-6 px-4 py-6 sm:px-6">
        <aside className="sticky top-20 hidden h-fit w-60 shrink-0 flex-col border-r border-border pr-3 lg:flex">
          <AccountNav />
          <div className="mt-auto border-t border-border pt-3">
            <LogoutButton />
          </div>
        </aside>

        <main className="min-w-0 flex-1">
          <div className="mx-auto max-w-4xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
