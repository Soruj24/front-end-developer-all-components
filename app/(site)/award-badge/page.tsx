"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import {
  Trophy,
  Medal,
  Award,
  Sparkles,
  Target,
  Gem,
  CheckCircle2,
} from "lucide-react";

const installCommand = `npx component-library@latest add award-badge`;
const usageCode = `import { AwardBadge } from "@/components/award-badge";

<AwardBadge type="gold" label="Top Contributor" icon="trophy" />`;

type AwardTier = "bronze" | "silver" | "gold" | "platinum" | "diamond";

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

function AllTiersDemo() {
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

function AchievementCardDemo() {
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

function LeaderboardDemo() {
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

function CompactIconsDemo() {
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

function WithDescriptionDemo() {
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

function ProgressToTierDemo() {
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

function StackedAchievementsDemo() {
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

function InteractiveHoverDemo() {
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

export default function AwardBadgePage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Award Badge
          </h1>
          <Badge variant="primary">Feedback</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Visual award badges for achievements, rankings, and recognition with metallic styling
          and tier variants.
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Installation</h2>
        <CodeBlock code={installCommand} filename="Terminal" label="bash" variant="terminal" />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} filename="page.tsx" label="tsx" />
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Examples</h2>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">All Tiers</h3>
          <p className="text-sm text-muted-foreground">
            Five award tiers from bronze to diamond with metallic gradient styling.
          </p>
          <ComponentPreview id="award-all-tiers">
            <AllTiersDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Achievement Cards</h3>
          <p className="text-sm text-muted-foreground">
            Achievement cards with gradient icons, descriptions, and earned status indicators.
          </p>
          <ComponentPreview id="award-achievements">
            <AchievementCardDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Leaderboard</h3>
          <p className="text-sm text-muted-foreground">
            Ranked user list with avatars, scores, and tier badges.
          </p>
          <ComponentPreview id="award-leaderboard">
            <LeaderboardDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Compact Icons</h3>
          <p className="text-sm text-muted-foreground">
            Small circular icons for embedding in tables, lists, or tight spaces.
          </p>
          <ComponentPreview id="award-compact">
            <CompactIconsDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">With Description</h3>
          <p className="text-sm text-muted-foreground">
            Award badges with title, description, and date in a card layout.
          </p>
          <ComponentPreview id="award-description">
            <WithDescriptionDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Progress to Next Tier</h3>
          <p className="text-sm text-muted-foreground">
            Progress bar showing points earned and distance to next award tier.
          </p>
          <ComponentPreview id="award-progress">
            <ProgressToTierDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">User Profile Stack</h3>
          <p className="text-sm text-muted-foreground">
            User profile card with stacked award counts and total points.
          </p>
          <ComponentPreview id="award-stack">
            <StackedAchievementsDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Interactive Hover</h3>
          <p className="text-sm text-muted-foreground">
            Hover to see scale and rotation animations on award badges.
          </p>
          <ComponentPreview id="award-interactive">
            <InteractiveHoverDemo />
          </ComponentPreview>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left font-medium">Prop</th>
                <th className="px-4 py-3 text-left font-medium">Type</th>
                <th className="px-4 py-3 text-left font-medium">Default</th>
                <th className="px-4 py-3 text-left font-medium">Required</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">tier</td>
                <td className="px-4 py-3 text-muted-foreground">{"\"bronze\" | \"silver\" | \"gold\" | \"platinum\" | \"diamond\""}</td>
                <td className="px-4 py-3 text-muted-foreground">{"\"gold\""}</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">label</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">description</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">icon</td>
                <td className="px-4 py-3 text-muted-foreground">ReactNode</td>
                <td className="px-4 py-3 text-muted-foreground">Tier default</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">size</td>
                <td className="px-4 py-3 text-muted-foreground">{"\"sm\" | \"md\" | \"lg\""}</td>
                <td className="px-4 py-3 text-muted-foreground">{"\"md\""}</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">earned</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">true</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">className</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
