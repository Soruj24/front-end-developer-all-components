"use client";

import { useState } from "react";
import {
  Activity,
  Heart,
  GitCommit,
  Star,
  MessageCircle,
  GitPullRequest,
  GitMerge,
  AlertCircle,
  Rocket,
  Eye,
  Users,
  Clock,
} from "lucide-react";

export type ActivityType =
  | "commit"
  | "like"
  | "star"
  | "comment"
  | "merge"
  | "pull_request"
  | "review"
  | "deploy"
  | "issue"
  | "follow";

export interface FeedItem {
  id: string;
  avatar: string;
  avatarColor: string;
  userName: string;
  action: string;
  target: string;
  timestamp: string;
  type: ActivityType;
  description?: string;
}

export const realisticFeedItems: FeedItem[] = [
  {
    id: "1",
    avatar: "SC",
    avatarColor: "from-blue-400 to-blue-600",
    userName: "Sarah Chen",
    action: "pushed 3 commits to",
    target: "main",
    timestamp: "2m ago",
    type: "commit",
    description: "feat: add user authentication flow",
  },
  {
    id: "2",
    avatar: "AR",
    avatarColor: "from-purple-400 to-purple-600",
    userName: "Alex Rivera",
    action: "opened a pull request in",
    target: "frontend-app",
    timestamp: "12m ago",
    type: "pull_request",
    description: "Refactor dashboard components for better performance",
  },
  {
    id: "3",
    avatar: "JW",
    avatarColor: "from-amber-400 to-orange-500",
    userName: "James Wilson",
    action: "reviewed pull request",
    target: "#38",
    timestamp: "28m ago",
    type: "review",
    description: "Changes look good! Left a few suggestions on the API layer.",
  },
  {
    id: "4",
    avatar: "MJ",
    avatarColor: "from-emerald-400 to-green-500",
    userName: "Maya Johnson",
    action: "merged pull request",
    target: "#35",
    timestamp: "1h ago",
    type: "merge",
    description: "fix: resolve hydration mismatch in SSR components",
  },
  {
    id: "5",
    avatar: "KL",
    avatarColor: "from-pink-400 to-rose-500",
    userName: "Kai Lee",
    action: "deployed",
    target: "v2.4.0",
    timestamp: "2h ago",
    type: "deploy",
    description: "Production deployment completed successfully",
  },
  {
    id: "6",
    avatar: "NP",
    avatarColor: "from-cyan-400 to-blue-500",
    userName: "Nina Patel",
    action: "starred",
    target: "ui-components",
    timestamp: "3h ago",
    type: "star",
  },
  {
    id: "7",
    avatar: "TB",
    avatarColor: "from-red-400 to-pink-500",
    userName: "Tom Brooks",
    action: "commented on issue",
    target: "#128",
    timestamp: "4h ago",
    type: "comment",
    description: "I can reproduce this on Safari. Looking into it now.",
  },
  {
    id: "8",
    avatar: "LH",
    avatarColor: "from-violet-400 to-purple-600",
    userName: "Luna Hall",
    action: "created a branch",
    target: "feature/dark-mode",
    timestamp: "5h ago",
    type: "commit",
  },
  {
    id: "9",
    avatar: "RK",
    avatarColor: "from-teal-400 to-emerald-500",
    userName: "Ryan Kim",
    action: "opened issue in",
    target: "design-system",
    timestamp: "6h ago",
    type: "issue",
    description: "Button hover states inconsistent across themes",
  },
  {
    id: "10",
    avatar: "DM",
    avatarColor: "from-sky-400 to-indigo-500",
    userName: "Diana Moss",
    action: "approved pull request",
    target: "#41",
    timestamp: "8h ago",
    type: "review",
  },
  {
    id: "11",
    avatar: "EW",
    avatarColor: "from-orange-400 to-red-500",
    userName: "Ethan Wright",
    action: "liked your post",
    target: "Building Scalable Design Systems",
    timestamp: "10h ago",
    type: "like",
  },
  {
    id: "12",
    avatar: "ZC",
    avatarColor: "from-fuchsia-400 to-pink-500",
    userName: "Zoe Carter",
    action: "started following you",
    target: "",
    timestamp: "12h ago",
    type: "follow",
  },
];

const typeConfig: Record<ActivityType, { icon: typeof Activity; color: string; bgColor: string }> = {
  commit: { icon: GitCommit, color: "text-blue-500", bgColor: "bg-blue-50 dark:bg-blue-950" },
  like: { icon: Heart, color: "text-red-500", bgColor: "bg-red-50 dark:bg-red-950" },
  star: { icon: Star, color: "text-amber-500", bgColor: "bg-amber-50 dark:bg-amber-950" },
  comment: { icon: MessageCircle, color: "text-green-500", bgColor: "bg-green-50 dark:bg-green-950" },
  merge: { icon: GitMerge, color: "text-purple-500", bgColor: "bg-purple-50 dark:bg-purple-950" },
  pull_request: { icon: GitPullRequest, color: "text-emerald-500", bgColor: "bg-emerald-50 dark:bg-emerald-950" },
  review: { icon: Eye, color: "text-cyan-500", bgColor: "bg-cyan-50 dark:bg-cyan-950" },
  deploy: { icon: Rocket, color: "text-violet-500", bgColor: "bg-violet-50 dark:bg-violet-950" },
  issue: { icon: AlertCircle, color: "text-orange-500", bgColor: "bg-orange-50 dark:bg-orange-950" },
  follow: { icon: Users, color: "text-pink-500", bgColor: "bg-pink-50 dark:bg-pink-950" },
};

export function DefaultFeedCard({ item }: { item: FeedItem }) {
  const config = typeConfig[item.type];
  const Icon = config.icon;
  return (
    <div className="flex items-start gap-3 rounded-lg border border-black/[.08] bg-card p-4 shadow-sm transition-colors hover:bg-muted/50 dark:border-white/[.145]">
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${item.avatarColor} text-xs font-semibold text-white`}
      >
        {item.avatar}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm leading-relaxed">
          <span className="font-semibold text-foreground">{item.userName}</span>{" "}
          <span className="text-muted-foreground">{item.action}</span>{" "}
          <span className="font-medium text-foreground">{item.target}</span>
        </p>
        {item.description && (
          <p className="mt-1.5 text-sm text-muted-foreground/80 line-clamp-2">{item.description}</p>
        )}
        <div className="mt-2 flex items-center gap-2">
          <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ${config.bgColor} ${config.color}`}>
            <Icon className="h-3 w-3" />
            {item.type.replace("_", " ")}
          </span>
          <span className="flex items-center gap-1 text-xs text-muted-foreground/70">
            <Clock className="h-3 w-3" />
            {item.timestamp}
          </span>
        </div>
      </div>
    </div>
  );
}

export function CompactTimelineCard({ item }: { item: FeedItem }) {
  const config = typeConfig[item.type];
  const Icon = config.icon;
  return (
    <div className="flex items-center gap-3 rounded-md bg-muted/30 px-3 py-2.5 text-sm transition-colors hover:bg-muted/60">
      <div
        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${item.avatarColor} text-[10px] font-bold text-white`}
      >
        {item.avatar}
      </div>
      <div className="flex-1 min-w-0">
        <span className="font-medium text-foreground">{item.userName}</span>{" "}
        <span className="text-muted-foreground">{item.action}</span>{" "}
        <span className="font-medium text-foreground">{item.target}</span>
      </div>
      <div className="flex items-center gap-1.5 shrink-0">
        <Icon className={`h-3.5 w-3.5 ${config.color}`} />
        <span className="text-xs text-muted-foreground/70">{item.timestamp}</span>
      </div>
    </div>
  );
}

export function NotificationStyleCard({ item }: { item: FeedItem }) {
  const config = typeConfig[item.type];
  const Icon = config.icon;
  return (
    <div className="flex items-start gap-3 rounded-lg border border-black/[.08] bg-card p-4 shadow-sm dark:border-white/[.145]">
      <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${config.bgColor}`}>
        <Icon className={`h-4 w-4 ${config.color}`} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm">
          <span className="font-semibold text-foreground">{item.userName}</span>{" "}
          <span className="text-muted-foreground">{item.action}</span>{" "}
          <span className="font-medium text-foreground">{item.target}</span>
        </p>
        {item.description && (
          <p className="mt-1 text-sm text-muted-foreground/80">{item.description}</p>
        )}
      </div>
      <span className="shrink-0 text-xs text-muted-foreground/70">{item.timestamp}</span>
    </div>
  );
}

export function GroupedByTimeDemo() {
  const grouped: Record<string, FeedItem[]> = {
    Today: realisticFeedItems.slice(0, 5),
    Yesterday: realisticFeedItems.slice(5, 8),
    "This Week": realisticFeedItems.slice(8, 12),
  };
  return (
    <div className="flex flex-col gap-5 w-full max-w-md">
      {Object.entries(grouped).map(([label, items]) => (
        <div key={label} className="flex flex-col gap-2">
          <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {label}
            <span className="rounded-full bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground/80">
              {items.length}
            </span>
          </span>
          <div className="flex flex-col gap-2">
            {items.map((item) => (
              <DefaultFeedCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function FilteredFeedDemo() {
  const [filter, setFilter] = useState<ActivityType | "all">("all");
  const filtered = filter === "all" ? realisticFeedItems.slice(0, 6) : realisticFeedItems.filter((i) => i.type === filter).slice(0, 4);

  const filters: { value: ActivityType | "all"; label: string; icon: typeof Activity }[] = [
    { value: "all", label: "All", icon: Activity },
    { value: "commit", label: "Commits", icon: GitCommit },
    { value: "pull_request", label: "PRs", icon: GitPullRequest },
    { value: "review", label: "Reviews", icon: Eye },
    { value: "deploy", label: "Deploys", icon: Rocket },
    { value: "comment", label: "Comments", icon: MessageCircle },
  ];

  return (
    <div className="flex flex-col gap-3 w-full max-w-md">
      <div className="flex flex-wrap gap-1.5 rounded-lg border border-black/[.08] bg-muted/30 p-1 dark:border-white/[.145]">
        {filters.map(({ value, label, icon: FilterIcon }) => (
          <button
            key={value}
            onClick={() => setFilter(value)}
            className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-all ${
              filter === value
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <FilterIcon className="h-3 w-3" />
            {label}
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-black/[.1] py-8 text-center dark:border-white/[.145]">
            <Activity className="mb-2 h-6 w-6 text-muted-foreground/50" />
            <p className="text-sm text-muted-foreground">No activity found</p>
          </div>
        ) : (
          filtered.map((item) => <DefaultFeedCard key={item.id} item={item} />)
        )}
      </div>
    </div>
  );
}

export function WithDetailsFeedDemo() {
  const detailedItems: FeedItem[] = [
    {
      id: "d1",
      avatar: "SC",
      avatarColor: "from-blue-400 to-blue-600",
      userName: "Sarah Chen",
      action: "pushed 3 commits to",
      target: "feature/auth",
      timestamp: "15m ago",
      type: "commit",
      description: "feat: implement OAuth2 provider support",
    },
    {
      id: "d2",
      avatar: "AR",
      avatarColor: "from-purple-400 to-purple-600",
      userName: "Alex Rivera",
      action: "opened a pull request in",
      target: "frontend-app",
      timestamp: "45m ago",
      type: "pull_request",
      description: "Refactor dashboard grid layout for better responsive behavior on mobile devices",
    },
    {
      id: "d3",
      avatar: "KL",
      avatarColor: "from-emerald-400 to-green-500",
      userName: "Kai Lee",
      action: "deployed",
      target: "v2.4.0 to production",
      timestamp: "2h ago",
      type: "deploy",
      description: "All checks passed. Release includes auth improvements and performance optimizations.",
    },
  ];

  return (
    <div className="flex flex-col gap-3 w-full max-w-md">
      {detailedItems.map((item) => (
        <DefaultFeedCard key={item.id} item={item} />
      ))}
    </div>
  );
}