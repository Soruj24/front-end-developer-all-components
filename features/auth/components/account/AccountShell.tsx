import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { FOCUS } from "@/constants/tokens";
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
      <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-border/60 bg-background px-4 sm:px-6">
        <Link
          href="/"
          className={cn("flex items-center gap-2.5 rounded-md", FOCUS.ring)}
          aria-label="Component Library home"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-foreground text-[11px] font-bold text-background">
            CL
          </span>
          <span className="hidden text-sm font-semibold tracking-tight text-foreground sm:inline">
            Component Library
          </span>
        </Link>

        <div className="flex items-center gap-0.5 sm:gap-1">
          <Link
            href="/account/notifications"
            aria-label="Notifications"
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:h-8 sm:w-8",
              FOCUS.ring,
            )}
          >
            <svg className="h-5 w-5 sm:h-4 sm:w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 3a5 5 0 0 1 5 5c0 6 2 7 2 7H5s2-1 2-7a5 5 0 0 1 5-5Zm-2 14a2 2 0 0 0 4 0" />
            </svg>
          </Link>
          <span className="mr-1 hidden rounded-md border border-border/60 px-2 py-1 text-xs font-medium text-muted-foreground md:inline">
            {roleLabel(user.role)}
          </span>
          <Link
            href="/"
            className={cn(
              "hidden rounded-md px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground sm:inline",
              FOCUS.ring,
            )}
          >
            Back to site
          </Link>
          <span
            className="flex h-8 w-8 items-center justify-center rounded-md bg-foreground text-xs font-semibold text-background"
            title={user.email}
          >
            {initials(user.name)}
          </span>
        </div>
      </header>

      <MobileAccountNav />

      <div className="mx-auto flex w-full max-w-[1200px] min-w-0 flex-1 gap-8 px-4 py-6 sm:px-6 lg:py-8">
        <aside className="sticky top-28 hidden h-fit w-60 shrink-0 lg:flex lg:flex-col">
          <AccountNav />
          <div className="mt-6 border-t border-border/60 pt-4">
            <LogoutButton />
          </div>
        </aside>

        <main className="min-w-0 flex-1">
          <div className="mx-auto max-w-4xl min-w-0">{children}</div>
        </main>
      </div>
    </div>
  );
}
