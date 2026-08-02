"use client";

import type { RegistryComponent } from "@/features/registry";
import { cliCommand, formatNumber } from "@/features/registry";
import { useRegistryActions } from "@/hooks";
import { cn } from "@/lib/cn";
import { HeartIcon, BookmarkIcon, DownloadIcon } from "./icons";

/** Like / bookmark / download controls with persisted user state. */
export function ComponentActions({ component }: { component: RegistryComponent }) {
  const { getActionState, toggleAction, markDownloaded } = useRegistryActions();
  const action = getActionState(component.slug);
  const isNew = action.downloaded;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <ActionButton
        label="Like"
        count={component.stats.likes + (action.liked ? 1 : 0)}
        active={action.liked}
        activeClass="text-danger"
        onClick={() => toggleAction(component.slug, "liked")}
      >
        <HeartIcon className="h-4 w-4" filled={action.liked} />
      </ActionButton>
      <ActionButton
        label="Bookmark"
        count={component.stats.bookmarks + (action.bookmarked ? 1 : 0)}
        active={action.bookmarked}
        activeClass="text-primary"
        onClick={() => toggleAction(component.slug, "bookmarked")}
      >
        <BookmarkIcon className="h-4 w-4" filled={action.bookmarked} />
      </ActionButton>
      <ActionButton
        label={isNew ? "Installed" : "Install"}
        count={component.stats.downloads}
        active={isNew}
        activeClass="text-success"
        onClick={() => {
          markDownloaded(component.slug);
          navigator.clipboard?.writeText(cliCommand(component.slug)).catch(() => {});
        }}
      >
        <DownloadIcon className="h-4 w-4" />
      </ActionButton>
    </div>
  );
}

function ActionButton({
  label,
  count,
  active,
  activeClass,
  onClick,
  children,
}: {
  label: string;
  count: number;
  active: boolean;
  activeClass: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3.5 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
        active && activeClass
      )}
    >
      {children}
      {label}
      <span className="font-mono text-[11px] text-muted-foreground/70">
        {formatNumber(count)}
      </span>
    </button>
  );
}
