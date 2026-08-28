 
export const ACTIVITY_FEED_SOURCE = `"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export interface ActivityFeedItem {
  id: string;
  user: string;
  action: React.ReactNode;
  target?: React.ReactNode;
  time: React.ReactNode;
  avatar?: string;
  avatarFallback?: string;
  color?:
    | "blue"
    | "emerald"
    | "violet"
    | "amber"
    | "rose"
    | "cyan"
    | "primary";
  icon?: React.ReactNode;
  details?: React.ReactNode;
  disabled?: boolean;
}

export type ActivityFeedVariant =
  | "default"
  | "compact"
  | "minimal";

export interface ActivityFeedProps {
  /**
   * Activity items displayed in the feed.
   */
  items: ActivityFeedItem[];

  /**
   * Visual style of the activity feed.
   */
  variant?: ActivityFeedVariant;

  /**
   * Show all items up to maxItems.
   * When false, only the first 3 items are shown.
   */
  showAll?: boolean;

  /**
   * Maximum number of items rendered.
   */
  maxItems?: number;

  /**
   * Custom empty-state message.
   */
  emptyMessage?: React.ReactNode;

  /**
   * Called when an activity item is clicked.
   */
  onItemClick?: (
    item: ActivityFeedItem,
    index: number,
  ) => void;

  /**
   * Additional class names for the root element.
   */
  className?: string;

  /**
   * Additional class names for individual items.
   */
  itemClassName?: string;

  /**
   * Additional class names for the activity content.
   */
  contentClassName?: string;
}

const COLOR_CLASSES: Record<
  NonNullable<ActivityFeedItem["color"]>,
  string
> = {
  blue: "bg-blue-500",
  emerald: "bg-emerald-500",
  violet: "bg-violet-500",
  amber: "bg-amber-500",
  rose: "bg-rose-500",
  cyan: "bg-cyan-500",
  primary: "bg-primary",
};

function getInitials(name: string): string {
  const normalized = name.trim();

  if (!normalized) {
    return "?";
  }

  return normalized
    .split(/\\s+/)
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function ChevronIcon({
  expanded,
}: {
  expanded: boolean;
}) {
  return (
    <svg
      aria-hidden="true"
      className={cn(
        "h-3.5 w-3.5 shrink-0",
        "transition-transform duration-200",
        "motion-reduce:transition-none",
        expanded && "rotate-90",
      )}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 5 7 7-7 7" />
    </svg>
  );
}

export function ActivityFeed({
  items,
  variant = "default",
  showAll = true,
  maxItems = 50,
  emptyMessage = "No activity yet.",
  onItemClick,
  className,
  itemClassName,
  contentClassName,
}: ActivityFeedProps) {
  const [expandedItems, setExpandedItems] =
    React.useState<Set<string>>(
      () => new Set(),
    );

  const baseId = React.useId();

  const safeMaxItems = Math.max(
    0,
    Math.floor(maxItems),
  );

  const visibleItems = showAll
    ? items.slice(0, safeMaxItems)
    : items.slice(0, Math.min(3, safeMaxItems));

  const toggleDetails = React.useCallback(
    (id: string) => {
      setExpandedItems((previous) => {
        const next = new Set(previous);

        if (next.has(id)) {
          next.delete(id);
        } else {
          next.add(id);
        }

        return next;
      });
    },
    [],
  );

  const isCompact = variant === "compact";
  const isMinimal = variant === "minimal";

  if (!visibleItems.length) {
    return (
      <div
        className={cn(
          "flex items-center justify-center",
          "py-8 text-sm text-muted-foreground",
          className,
        )}
        data-slot="activity-feed"
        data-variant={variant}
      >
        {emptyMessage}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex flex-col",
        className,
      )}
      data-slot="activity-feed"
      data-variant={variant}
    >
      {visibleItems.map((item, index) => {
        const isLast =
          index === visibleItems.length - 1;

        const isExpanded =
          expandedItems.has(item.id);

        const hasDetails =
          item.details !== undefined &&
          item.details !== null;

        const isClickable =
          typeof onItemClick === "function";

        const colorClass =
          COLOR_CLASSES[item.color ?? "primary"];

        const itemId =
          \`\${baseId}-item-\${index}\`;

        const detailsId =
          \`\${itemId}-details\`;

        const content = (
          <>
            <div
              className={cn(
                "flex items-start justify-between gap-3",
                contentClassName,
              )}
            >
              <p
                className={cn(
                  "min-w-0 flex-1",
                  "text-sm leading-snug",
                )}
              >
                <span className="font-semibold text-foreground">
                  {item.user}
                </span>

                {item.action && (
                  <>
                    {" "}
                    <span className="text-muted-foreground">
                      {item.action}
                    </span>
                  </>
                )}

                {item.target && (
                  <>
                    {" "}
                    <span className="font-medium text-foreground">
                      {item.target}
                    </span>
                  </>
                )}
              </p>

              <time className="shrink-0 text-xs tabular-nums text-muted-foreground">
                {item.time}
              </time>
            </div>

            {hasDetails && (
              <div className="mt-1.5">
                <button
                  type="button"
                  aria-expanded={isExpanded}
                  aria-controls={detailsId}
                  onClick={() =>
                    toggleDetails(item.id)
                  }
                  className={cn(
                    "inline-flex items-center gap-1",
                    "rounded-md px-1.5 py-0.5",
                    "text-xs font-medium",
                    "text-muted-foreground",
                    "transition-colors duration-150",
                    "hover:bg-muted",
                    "hover:text-foreground",
                    "focus-visible:outline-none",
                    "focus-visible:ring-2",
                    "focus-visible:ring-ring",
                    "focus-visible:ring-offset-2",
                    "focus-visible:ring-offset-background",
                  )}
                >
                  <ChevronIcon
                    expanded={isExpanded}
                  />

                  <span>
                    {isExpanded
                      ? "Less"
                      : "Details"}
                  </span>
                </button>

                <div
                  id={detailsId}
                  aria-hidden={!isExpanded}
                  className={cn(
                    "grid overflow-hidden",
                    "transition-[grid-template-rows]",
                    "duration-300",
                    "ease-[cubic-bezier(0.87,0,0.13,1)]",
                    "motion-reduce:transition-none",
                    isExpanded
                      ? "grid-rows-[1fr]"
                      : "grid-rows-[0fr]",
                  )}
                >
                  <div className="min-h-0 overflow-hidden">
                    <div
                      className={cn(
                        "mt-1.5 rounded-lg",
                        "border border-border",
                        "bg-muted/30",
                        "px-3 py-2",
                        "text-xs leading-5",
                        "text-muted-foreground",
                      )}
                    >
                      {item.details}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        );

        return (
          <div
            key={item.id}
            id={itemId}
            className={cn(
              "relative flex gap-3",
              item.disabled && "opacity-50",
              itemClassName,
            )}
            data-slot="activity-feed-item"
            data-state={
              isExpanded
                ? "expanded"
                : "collapsed"
            }
            data-disabled={
              item.disabled || undefined
            }
          >
            {!isMinimal && !isLast && (
              <div
                aria-hidden="true"
                className={cn(
                  "absolute w-px bg-border",
                  isCompact
                    ? "left-4 top-8 h-[calc(100%-1rem)]"
                    : "left-5 top-10 h-[calc(100%-1rem)]",
                )}
              />
            )}

            {isMinimal ? (
              <div
                className={cn(
                  "relative z-10 mt-1.5",
                  "flex h-2.5 w-2.5 shrink-0",
                  "items-center justify-center",
                  "rounded-full",
                  "border-2 border-background",
                  colorClass,
                )}
                aria-hidden="true"
              />
            ) : (
              <div
                className={cn(
                  "relative z-10 flex shrink-0",
                  "items-center justify-center",
                  "overflow-hidden rounded-full",
                  "bg-muted",
                  "text-xs font-semibold",
                  "text-white",
                  isCompact
                    ? "h-8 w-8"
                    : "h-10 w-10",
                  !item.avatar &&
                    colorClass,
                )}
                aria-hidden={
                  item.avatar
                    ? true
                    : undefined
                }
              >
                {item.avatar ? (
                  <img
                    src={item.avatar}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                ) : item.icon ? (
                  <span>
                    {item.icon}
                  </span>
                ) : (
                  <span>
                    {item.avatarFallback ??
                      getInitials(
                        item.user,
                      )}
                  </span>
                )}
              </div>
            )}

            <div
              className={cn(
                "min-w-0 flex-1",
                isCompact
                  ? "py-1"
                  : "py-1.5",
                !isMinimal &&
                  !isLast &&
                  "pb-5",
                isClickable &&
                  "cursor-pointer",
              )}
              onClick={
                isClickable
                  ? () =>
                      onItemClick?.(
                        item,
                        index,
                      )
                  : undefined
              }
            >
              {content}
            </div>
          </div>
        );
      })}
    </div>
  );
}
`;

export const DEFAULT_EXAMPLE = `
const feedItems = [
  {
    id: "1",
    user: "Sarah Chen",
    action: "created",
    target: "a new project",
    time: "2m ago",
  },
  {
    id: "2",
    user: "James Wilson",
    action: "updated",
    target: "the documentation",
    time: "15m ago",
  },
  {
    id: "3",
    user: "Emily Davis",
    action: "completed",
    target: "the onboarding flow",
    time: "1h ago",
  },
];

<ActivityFeed items={feedItems} />
`;

export const COMPACT_EXAMPLE = `
<ActivityFeed
  items={feedItems}
  variant="compact"
/>
`;

export const MINIMAL_EXAMPLE = `
<ActivityFeed
  items={feedItems}
  variant="minimal"
/>
`;

export const FILTERED_EXAMPLE = `
<ActivityFeed
  items={feedItems}
  showAll={false}
  maxItems={3}
/>
`;

export const DETAILS_EXAMPLE = `
const feedItems = [
  {
    id: "1",
    user: "Sarah Chen",
    action: "created",
    target: "a new project",
    time: "2m ago",
    details: (
      <div className="space-y-1">
        <p>
          Project: Marketing Website
        </p>
        <p>
          Status: Active
        </p>
      </div>
    ),
  },
];

<ActivityFeed items={feedItems} />
`;

export const AVATAR_EXAMPLE = `
const feedItems = [
  {
    id: "1",
    user: "Sarah Chen",
    action: "uploaded",
    target: "a new avatar",
    time: "5m ago",
    avatar: "/avatars/sarah.jpg",
  },
];

<ActivityFeed items={feedItems} />
`;

export const ICON_EXAMPLE = `
import {
  Check,
  FilePlus,
  Settings,
} from "lucide-react";

const feedItems = [
  {
    id: "1",
    user: "System",
    action: "completed",
    target: "deployment",
    time: "2m ago",
    icon: (
      <Check className="h-4 w-4" />
    ),
    color: "emerald",
  },
  {
    id: "2",
    user: "Admin",
    action: "created",
    target: "a document",
    time: "20m ago",
    icon: (
      <FilePlus className="h-4 w-4" />
    ),
    color: "violet",
  },
  {
    id: "3",
    user: "System",
    action: "changed",
    target: "settings",
    time: "1h ago",
    icon: (
      <Settings className="h-4 w-4" />
    ),
    color: "amber",
  },
];

<ActivityFeed
  items={feedItems}
  variant="compact"
/>
`;

export const CUSTOM_CONTENT_EXAMPLE = `
<ActivityFeed
  items={feedItems}
  className="max-w-2xl"
  itemClassName="rounded-lg"
  contentClassName="pr-2"
/>
`;

export const CLICK_HANDLER_EXAMPLE = `
<ActivityFeed
  items={feedItems}
  onItemClick={(item) => {
    console.log(
      "Selected activity:",
      item,
    );
  }}
/>
`;

export const EMPTY_EXAMPLE = `
<ActivityFeed
  items={[]}
  emptyMessage="No recent activity."
/>
`;
 
