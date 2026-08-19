import { useState } from "react";
import {
  Trophy,
  Medal,
  Award,
  Sparkles,
  Target,
  Gem,
  CheckCircle2,
} from "lucide-react";

export const AWARDBADGE_SOURCE = `"use client";

import { Trophy, Medal, Award, Sparkles, Gem } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type AwardTier = "bronze" | "silver" | "gold" | "platinum" | "diamond";

interface AwardBadgeProps {
  tier?: AwardTier;
  label: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const TIER_STYLES: Record<AwardTier, { icon: LucideIcon; bg: string; border: string; text: string }> = {
  bronze: { icon: Award, bg: "bg-orange-50 dark:bg-orange-950/30", border: "border-orange-200 dark:border-orange-800", text: "text-orange-700 dark:text-orange-300" },
  silver: { icon: Medal, bg: "bg-slate-50 dark:bg-slate-950/30", border: "border-slate-200 dark:border-slate-700", text: "text-slate-700 dark:text-slate-300" },
  gold: { icon: Trophy, bg: "bg-yellow-50 dark:bg-yellow-950/30", border: "border-yellow-200 dark:border-yellow-800", text: "text-yellow-700 dark:text-yellow-300" },
  platinum: { icon: Gem, bg: "bg-indigo-50 dark:bg-indigo-950/30", border: "border-indigo-200 dark:border-indigo-800", text: "text-indigo-700 dark:text-indigo-300" },
  diamond: { icon: Sparkles, bg: "bg-cyan-50 dark:bg-cyan-950/30", border: "border-cyan-200 dark:border-cyan-800", text: "text-cyan-700 dark:text-cyan-300" },
};

export function AwardBadge({ tier = "gold", label, size = "md", className = "" }: AwardBadgeProps) {
  const style = TIER_STYLES[tier];
  const Icon = style.icon;
  const padding = size === "sm" ? "px-2 py-0.5 text-xs" : size === "lg" ? "px-4 py-2 text-base" : "px-3 py-1 text-sm";
  return (
    <span className={"inline-flex items-center gap-1.5 rounded-full border font-semibold " + style.bg + " " + style.border + " " + padding + " " + className}>
      <Icon className={"h-3.5 w-3.5 " + style.text} />
      <span className={style.text}>{label}</span>
    </span>
  );
}`;

export const TIERS_EXAMPLE = `<AwardBadge tier="gold" label="Top Contributor" />
<AwardBadge tier="platinum" label="Code Reviewer" />
<AwardBadge tier="diamond" label="Open Source Hero" />`;

export const ACHIEVEMENTS_EXAMPLE = `<div className="flex items-start gap-3 rounded-xl border p-4">
  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-amber-500">
    <Trophy className="h-5 w-5 text-white" />
  </div>
  <div>
    <span className="text-sm font-semibold">Top Contributor</span>
    <span className="mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-bold uppercase">gold</span>
  </div>
</div>`;

export const LEADERBOARD_EXAMPLE = `<div className="flex items-center gap-3 px-4 py-3">
  <span className="w-6 text-center text-sm font-bold">1</span>
  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 text-xs font-bold text-white">SC</div>
  <div className="flex-1 min-w-0">
    <div className="text-sm font-medium">Sarah Chen</div>
    <div className="text-xs text-muted-foreground">2,840 pts</div>
  </div>
  <AwardBadge tier="diamond" label="diamond" />
</div>`;

export const COMPACT_EXAMPLE = `<AwardBadge tier="bronze" label="Bronze" />
<AwardBadge tier="silver" label="Silver" />
<AwardBadge tier="gold" label="Gold" />
<AwardBadge tier="platinum" label="Platinum" />
<AwardBadge tier="diamond" label="Diamond" />`;

export const DESCRIPTION_EXAMPLE = `<div className="rounded-xl border p-4 shadow-sm">
  <div className="flex items-center gap-2">
    <span className="text-sm font-semibold">Open Source Champion</span>
    <span className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase">diamond</span>
  </div>
  <p className="mt-1 text-xs">Contributed to 25+ open source projects</p>
  <span className="mt-2 inline-block text-[11px] text-muted-foreground">Dec 2025</span>
</div>`;

export const PROGRESS_EXAMPLE = `<div className="relative h-2.5 overflow-hidden rounded-full bg-muted">
  <div className="absolute inset-y-0 left-0 w-3/4 rounded-full bg-gradient-to-r from-indigo-400 to-purple-500" />
</div>`;

export const STACK_EXAMPLE = `<div className="flex flex-wrap gap-2">
  <AwardBadge tier="diamond" label="x2" />
  <AwardBadge tier="platinum" label="x5" />
  <AwardBadge tier="gold" label="x12" />
  <AwardBadge tier="silver" label="x8" />
  <AwardBadge tier="bronze" label="x3" />
</div>`;

export const HOVER_EXAMPLE = `<button className="inline-flex items-center gap-2 rounded-full border px-4 py-2 transition-all duration-200 hover:scale-110">
  <AwardBadge tier="gold" label="Gold" />
</button>`;

export type AwardTier = "bronze" | "silver" | "gold" | "platinum" | "diamond";

interface AwardConfig {
  bg: string;
  border: string;
  text: string;
  icon: React.ComponentType<{ className?: string }>;
  glow: string;
  gradient: string;
}

const tierConfig: Record<AwardTier, AwardConfig> = {
  bronze: {
    bg: "bg-orange-50 dark:bg-orange-950/30",
    border: "border-orange-200 dark:border-orange-800",
    text: "text-orange-700 dark:text-orange-300",
    icon: Award,
    glow: "shadow-orange-200/50 dark:shadow-orange-900/50",
    gradient: "from-orange-400 to-amber-600",
  },
  silver: {
    bg: "bg-slate-50 dark:bg-slate-950/30",
    border: "border-slate-200 dark:border-slate-700",
    text: "text-slate-700 dark:text-slate-300",
    icon: Medal,
    glow: "shadow-slate-200/50 dark:shadow-slate-900/50",
    gradient: "from-slate-300 to-slate-500",
  },
  gold: {
    bg: "bg-yellow-50 dark:bg-yellow-950/30",
    border: "border-yellow-200 dark:border-yellow-800",
    text: "text-yellow-700 dark:text-yellow-300",
    icon: Trophy,
    glow: "shadow-yellow-200/50 dark:shadow-yellow-900/50",
    gradient: "from-yellow-400 to-amber-500",
  },
  platinum: {
    bg: "bg-indigo-50 dark:bg-indigo-950/30",
    border: "border-indigo-200 dark:border-indigo-800",
    text: "text-indigo-700 dark:text-indigo-300",
    icon: Gem,
    glow: "shadow-indigo-200/50 dark:shadow-indigo-900/50",
    gradient: "from-indigo-400 to-purple-500",
  },
  diamond: {
    bg: "bg-cyan-50 dark:bg-cyan-950/30",
    border: "border-cyan-200 dark:border-cyan-800",
    text: "text-cyan-700 dark:text-cyan-300",
    icon: Sparkles,
    glow: "shadow-cyan-200/50 dark:shadow-cyan-900/50",
    gradient: "from-cyan-400 to-blue-500",
  },
};

const allTiers: AwardTier[] = ["bronze", "silver", "gold", "platinum", "diamond"];

export function AllTiersDemo() {
  return (
    <div className="flex flex-wrap gap-2.5">
      {allTiers.map((tier) => {
        const config = tierConfig[tier];
        const Icon = config.icon;
        return (
          <div
            key={tier}
            className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 shadow-sm ${config.bg} ${config.border} ${config.glow}`}
          >
            <Icon className={`h-4 w-4 ${config.text}`} />
            <span className={`text-sm font-semibold capitalize ${config.text}`}>{tier}</span>
          </div>
        );
      })}
    </div>
  );
}

export function AchievementCardDemo() {
  const achievements = [
    { tier: "gold" as AwardTier, label: "Top Contributor", description: "500+ contributions this year", earned: true },
    { tier: "platinum" as AwardTier, label: "Code Reviewer", description: "Reviewed 200+ pull requests", earned: true },
    { tier: "diamond" as AwardTier, label: "Open Source Hero", description: "Maintained 10+ projects", earned: false },
    { tier: "silver" as AwardTier, label: "Bug Hunter", description: "Found and reported 50+ bugs", earned: true },
  ];

  return (
    <div className="grid w-full gap-3 sm:grid-cols-2">
      {achievements.map((achievement) => {
        const config = tierConfig[achievement.tier];
        const Icon = config.icon;
        return (
          <div
            key={achievement.label}
            className={`flex items-start gap-3 rounded-xl border p-4 transition-all ${
              achievement.earned
                ? `${config.bg} ${config.border} shadow-sm`
                : "border-black/[.08] bg-muted/30 opacity-60 dark:border-white/[.145]"
            }`}
          >
            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${config.gradient} shadow-md`}>
              <Icon className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-foreground">{achievement.label}</span>
                {achievement.earned && (
                  <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                )}
              </div>
              <p className="mt-0.5 text-xs text-muted-foreground">{achievement.description}</p>
              <span className={`mt-1.5 inline-block rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${config.bg} ${config.text}`}>
                {achievement.tier}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function LeaderboardDemo() {
  const users = [
    { name: "Sarah Chen", score: 2840, tier: "diamond" as AwardTier, avatar: "SC", color: "from-cyan-400 to-blue-500" },
    { name: "Alex Rivera", score: 2150, tier: "platinum" as AwardTier, avatar: "AR", color: "from-indigo-400 to-purple-500" },
    { name: "Maya Johnson", score: 1890, tier: "gold" as AwardTier, avatar: "MJ", color: "from-yellow-400 to-amber-500" },
    { name: "James Wilson", score: 1520, tier: "gold" as AwardTier, avatar: "JW", color: "from-yellow-400 to-amber-500" },
    { name: "Nina Patel", score: 1280, tier: "silver" as AwardTier, avatar: "NP", color: "from-slate-300 to-slate-500" },
  ];

  return (
    <div className="w-full overflow-hidden rounded-xl border border-black/[.08] dark:border-white/[.145]">
      <div className="border-b border-black/[.08] bg-muted/30 px-4 py-3 dark:border-white/[.145]">
        <div className="flex items-center gap-2">
          <Trophy className="h-4 w-4 text-yellow-500" />
          <span className="text-sm font-semibold">Leaderboard</span>
          <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">Top 5</span>
        </div>
      </div>
      <div className="divide-y divide-black/[.06] dark:divide-white/[.08]">
        {users.map((user, index) => {
          const config = tierConfig[user.tier];
          const Icon = config.icon;
          return (
            <div key={user.name} className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-muted/30">
              <span className={`w-6 text-center text-sm font-bold ${
                index === 0 ? "text-yellow-500" : index === 1 ? "text-slate-400" : index === 2 ? "text-orange-500" : "text-muted-foreground"
              }`}>
                {index + 1}
              </span>
              <div className={`flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br ${user.color} text-xs font-bold text-white`}>
                {user.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-foreground">{user.name}</div>
                <div className="text-xs text-muted-foreground">{user.score.toLocaleString()} pts</div>
              </div>
              <div className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 ${config.bg} ${config.border} border`}>
                <Icon className={`h-3.5 w-3.5 ${config.text}`} />
                <span className={`text-xs font-semibold capitalize ${config.text}`}>{user.tier}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function CompactIconsDemo() {
  return (
    <div className="flex items-center gap-3">
      {allTiers.map((tier) => {
        const config = tierConfig[tier];
        const Icon = config.icon;
        return (
          <div
            key={tier}
            className={`flex h-9 w-9 items-center justify-center rounded-full border shadow-sm ${config.bg} ${config.border}`}
            title={tier.charAt(0).toUpperCase() + tier.slice(1)}
          >
            <Icon className={`h-4 w-4 ${config.text}`} />
          </div>
        );
      })}
    </div>
  );
}

export function WithDescriptionDemo() {
  const awards = [
    {
      tier: "diamond" as AwardTier,
      title: "Open Source Champion",
      description: "Contributed to 25+ open source projects with 10,000+ lines of code merged",
      date: "Dec 2025",
    },
    {
      tier: "gold" as AwardTier,
      title: "Sprint MVP",
      description: "Delivered 3 critical features ahead of schedule in Q4 sprint",
      date: "Nov 2025",
    },
    {
      tier: "platinum" as AwardTier,
      title: "Bug Bounty Hunter",
      description: "Identified and resolved 100+ production issues this quarter",
      date: "Oct 2025",
    },
  ];

  return (
    <div className="flex flex-col gap-3 w-full max-w-md">
      {awards.map((award) => {
        const config = tierConfig[award.tier];
        const Icon = config.icon;
        return (
          <div key={award.title} className={`flex items-start gap-3 rounded-xl border p-4 shadow-sm ${config.bg} ${config.border}`}>
            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${config.gradient}`}>
              <Icon className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-foreground">{award.title}</span>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${config.bg} ${config.text}`}>
                  {award.tier}
                </span>
              </div>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{award.description}</p>
              <span className="mt-2 inline-block text-[11px] text-muted-foreground/70">{award.date}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function ProgressToTierDemo() {
  const [currentPoints] = useState(7200);
  const tiers = [
    { name: "Bronze", min: 0, max: 1000, tier: "bronze" as AwardTier },
    { name: "Silver", min: 1000, max: 3000, tier: "silver" as AwardTier },
    { name: "Gold", min: 3000, max: 6000, tier: "gold" as AwardTier },
    { name: "Platinum", min: 6000, max: 9000, tier: "platinum" as AwardTier },
    { name: "Diamond", min: 9000, max: 12000, tier: "diamond" as AwardTier },
  ];

  const currentTier = tiers.find((t) => currentPoints >= t.min && currentPoints < t.max) || tiers[tiers.length - 1];
  const nextTier = tiers[tiers.indexOf(currentTier) + 1];
  const progress = nextTier
    ? ((currentPoints - currentTier.min) / (nextTier.min - currentTier.min)) * 100
    : 100;
  const remaining = nextTier ? nextTier.min - currentPoints : 0;

  return (
    <div className="w-full max-w-md rounded-xl border border-black/[.08] bg-card p-5 shadow-sm dark:border-white/[.145]">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold text-foreground">Your Progress</div>
          <div className="text-xs text-muted-foreground">{currentPoints.toLocaleString()} points earned</div>
        </div>
        <div className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 ${tierConfig[currentTier.tier].bg} ${tierConfig[currentTier.tier].border} border`}>
          {(() => { const Icon = tierConfig[currentTier.tier].icon; return <Icon className={`h-4 w-4 ${tierConfig[currentTier.tier].text}`} />; })()}
          <span className={`text-xs font-bold capitalize ${tierConfig[currentTier.tier].text}`}>{currentTier.name}</span>
        </div>
      </div>
      <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
        <span>{currentTier.name}</span>
        <span>{nextTier ? nextTier.name : "Max Tier"}</span>
      </div>
      <div className="relative h-2.5 overflow-hidden rounded-full bg-muted">
        <div
          className={`absolute inset-y-0 left-0 rounded-full bg-gradient-to-r ${tierConfig[currentTier.tier].gradient}`}
          style={{ width: `${progress}%` }}
        />
      </div>
      {nextTier && (
        <div className="mt-3 flex items-center gap-2 rounded-lg bg-muted/50 p-2.5">
          <Target className="h-4 w-4 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">{remaining.toLocaleString()}</span> points to {nextTier.name}
          </span>
        </div>
      )}
      <div className="mt-4 flex gap-1.5">
        {tiers.map((t) => {
          const isUnlocked = currentPoints >= t.min;
          const config = tierConfig[t.tier];
          const Icon = config.icon;
          return (
            <div
              key={t.name}
              className={`flex h-8 w-8 items-center justify-center rounded-full transition-all ${
                isUnlocked
                  ? `bg-gradient-to-br ${config.gradient} shadow-md`
                  : "bg-muted"
              }`}
            >
              <Icon className={`h-3.5 w-3.5 ${isUnlocked ? "text-white" : "text-muted-foreground/40"}`} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function StackedAchievementsDemo() {
  const user = {
    name: "Sarah Chen",
    avatar: "SC",
    role: "Senior Engineer",
    totalPoints: 8420,
    awards: [
      { tier: "diamond" as AwardTier, count: 2 },
      { tier: "platinum" as AwardTier, count: 5 },
      { tier: "gold" as AwardTier, count: 12 },
      { tier: "silver" as AwardTier, count: 8 },
      { tier: "bronze" as AwardTier, count: 3 },
    ],
  };

  return (
    <div className="w-full max-w-sm rounded-xl border border-black/[.08] bg-card p-5 shadow-sm dark:border-white/[.145]">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 text-sm font-bold text-white shadow-md">
          {user.avatar}
        </div>
        <div>
          <div className="text-sm font-semibold text-foreground">{user.name}</div>
          <div className="text-xs text-muted-foreground">{user.role}</div>
        </div>
        <div className="ml-auto text-right">
          <div className="text-lg font-bold tabular-nums text-foreground">{user.totalPoints.toLocaleString()}</div>
          <div className="text-[10px] text-muted-foreground">total points</div>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {user.awards.map(({ tier, count }) => {
          const config = tierConfig[tier];
          const Icon = config.icon;
          return (
            <div
              key={tier}
              className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 ${config.bg} ${config.border}`}
            >
              <Icon className={`h-3.5 w-3.5 ${config.text}`} />
              <span className={`text-xs font-bold ${config.text}`}>x{count}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function InteractiveHoverDemo() {
  const [hovered, setHovered] = useState<AwardTier | null>(null);

  return (
    <div className="flex flex-wrap gap-3">
      {allTiers.map((tier) => {
        const config = tierConfig[tier];
        const Icon = config.icon;
        return (
          <button
            key={tier}
            onMouseEnter={() => setHovered(tier)}
            onMouseLeave={() => setHovered(null)}
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 transition-all duration-200 ${
              hovered === tier
                ? `scale-110 shadow-lg ${config.bg} ${config.border}`
                : `shadow-sm ${config.bg} ${config.border}`
            }`}
          >
            <Icon className={`h-4 w-4 transition-transform duration-200 ${config.text} ${hovered === tier ? "rotate-12 scale-110" : ""}`} />
            <span className={`text-sm font-semibold capitalize ${config.text}`}>{tier}</span>
          </button>
        );
      })}
    </div>
  );
}