"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import {
  Crown,
  Star,
  Trophy,
  Gem,
  Award,
  Check,
  Zap,
  Shield,
  Heart,
  Users,
  TrendingUp,
} from "lucide-react";

const installCommand = `npx component-library@latest add crown-badge`;
const usageCode = `import { CrownBadge } from "@/components/crown-badge";

<CrownBadge tier="gold" label="Premium" />`;

type CrownTier = "bronze" | "silver" | "gold" | "platinum" | "diamond";

const tierConfig: Record<CrownTier, { gradient: string; icon: typeof Crown; text: string; glow: string; bg: string }> = {
  bronze: { gradient: "from-amber-600 to-amber-800", icon: Award, text: "text-amber-100", glow: "shadow-amber-500/30", bg: "bg-amber-50 dark:bg-amber-950/30" },
  silver: { gradient: "from-gray-400 to-gray-600", icon: Star, text: "text-gray-100", glow: "shadow-gray-400/30", bg: "bg-gray-50 dark:bg-gray-950/30" },
  gold: { gradient: "from-yellow-400 to-amber-500", icon: Crown, text: "text-amber-900", glow: "shadow-yellow-400/30", bg: "bg-yellow-50 dark:bg-yellow-950/30" },
  platinum: { gradient: "from-slate-300 to-slate-500", icon: Trophy, text: "text-slate-900", glow: "shadow-slate-400/30", bg: "bg-slate-50 dark:bg-slate-950/30" },
  diamond: { gradient: "from-cyan-300 to-blue-500", icon: Gem, text: "text-blue-900", glow: "shadow-cyan-400/30", bg: "bg-cyan-50 dark:bg-cyan-950/30" },
};

function AllTiersDemo() {
  return (
    <div className="flex flex-wrap gap-3">
      {(["bronze", "silver", "gold", "platinum", "diamond"] as CrownTier[]).map((t) => {
        const config = tierConfig[t];
        const Icon = config.icon;
        return (
          <div
            key={t}
            className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${config.gradient} px-4 py-1.5 shadow-md ${config.glow} ${config.text}`}
          >
            <Icon className="h-4 w-4" />
            <span className="text-sm font-bold">{t.charAt(0).toUpperCase() + t.slice(1)}</span>
          </div>
        );
      })}
    </div>
  );
}

function TierDetailsDemo() {
  const tiers = [
    { tier: "bronze" as CrownTier, label: "Bronze", perks: ["5GB storage", "Email support", "Basic analytics"], price: "Free" },
    { tier: "silver" as CrownTier, label: "Silver", perks: ["25GB storage", "Chat support", "Advanced analytics"], price: "$9/mo" },
    { tier: "gold" as CrownTier, label: "Gold", perks: ["100GB storage", "Priority support", "Custom domain"], price: "$29/mo" },
    { tier: "platinum" as CrownTier, label: "Platinum", perks: ["500GB storage", "Dedicated manager", "API access"], price: "$99/mo" },
    { tier: "diamond" as CrownTier, label: "Diamond", perks: ["Unlimited storage", "24/7 support", "White label"], price: "$299/mo" },
  ];

  return (
    <div className="grid grid-cols-5 gap-2">
      {tiers.map((t) => {
        const config = tierConfig[t.tier];
        const Icon = config.icon;
        return (
          <div key={t.tier} className={`flex flex-col items-center rounded-xl border border-black/[.08] p-3 shadow-sm dark:border-white/[.145] ${config.bg}`}>
            <div className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r ${config.gradient} ${config.text}`}>
              <Icon className="h-5 w-5" />
            </div>
            <span className="mt-2 text-xs font-bold">{t.label}</span>
            <span className="text-[10px] font-semibold text-muted-foreground">{t.price}</span>
            <div className="mt-2 space-y-1">
              {t.perks.map((p) => (
                <div key={p} className="flex items-center gap-1 text-[10px] text-muted-foreground">
                  <Check className="h-2.5 w-2.5 text-emerald-500" />
                  <span>{p}</span>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function LeaderboardDemo() {
  const [users] = useState([
    { name: "Sarah Chen", score: 12450, tier: "diamond" as CrownTier, avatar: "SC" },
    { name: "Marcus Johnson", score: 11200, tier: "platinum" as CrownTier, avatar: "MJ" },
    { name: "Emma Wilson", score: 9800, tier: "gold" as CrownTier, avatar: "EW" },
    { name: "Alex Rivera", score: 8500, tier: "gold" as CrownTier, avatar: "AR" },
    { name: "Lisa Park", score: 7200, tier: "silver" as CrownTier, avatar: "LP" },
  ]);

  return (
    <div className="w-full max-w-md">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
        <div className="flex items-center justify-between border-b border-black/[.06] px-4 py-3 dark:border-white/[.1]">
          <div className="flex items-center gap-2">
            <Trophy className="h-4 w-4" />
            <span className="text-sm font-semibold">Leaderboard</span>
          </div>
          <span className="text-[10px] text-muted-foreground">This week</span>
        </div>
        <div className="divide-y divide-black/[.06] dark:divide-white/[.08]">
          {users.map((user, i) => {
            const config = tierConfig[user.tier];
            const Icon = config.icon;
            return (
              <div key={i} className="flex items-center gap-3 px-4 py-3">
                <span className={`w-6 text-center text-sm font-bold ${
                  i === 0 ? "text-yellow-500" : i === 1 ? "text-gray-400" : i === 2 ? "text-amber-600" : "text-muted-foreground"
                }`}>{i + 1}</span>
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-xs font-bold">
                  {user.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{user.name}</p>
                  <div className="flex items-center gap-1.5">
                    <div className={`flex h-4 items-center gap-1 rounded-full bg-gradient-to-r ${config.gradient} px-2 ${config.text}`}>
                      <Icon className="h-2.5 w-2.5" />
                      <span className="text-[8px] font-bold">{user.tier}</span>
                    </div>
                  </div>
                </div>
                <span className="font-mono text-sm font-bold tabular-nums">{user.score.toLocaleString()}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function SubscriptionPlansDemo() {
  const [selected, setSelected] = useState("gold");
  const plans = [
    { id: "bronze", tier: "bronze" as CrownTier, name: "Starter", price: "$0", period: "forever", features: ["5GB storage", "Basic support", "1 project"] },
    { id: "gold", tier: "gold" as CrownTier, name: "Professional", price: "$29", period: "/month", features: ["100GB storage", "Priority support", "Unlimited projects", "Custom domain"] },
    { id: "diamond", tier: "diamond" as CrownTier, name: "Enterprise", price: "$99", period: "/month", features: ["Unlimited storage", "24/7 support", "White label", "API access", "Dedicated manager"] },
  ];

  return (
    <div className="w-full max-w-lg">
      <div className="grid grid-cols-3 gap-3">
        {plans.map((plan) => {
          const config = tierConfig[plan.tier];
          const Icon = config.icon;
          return (
            <button
              key={plan.id}
              onClick={() => setSelected(plan.id)}
              className={`relative flex flex-col rounded-xl border p-4 text-left transition-all ${
                selected === plan.id
                  ? "border-foreground shadow-lg scale-[1.02]"
                  : "border-black/[.08] hover:border-black/[.15] dark:border-white/[.145]"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r ${config.gradient} ${config.text}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className={`inline-flex items-center rounded-full bg-gradient-to-r ${config.gradient} px-2 py-0.5 ${config.text}`}>
                  <span className="text-[9px] font-bold">{plan.tier}</span>
                </div>
              </div>
              <span className="text-xs font-medium text-muted-foreground">{plan.name}</span>
              <div className="mt-1 flex items-baseline gap-0.5">
                <span className="text-2xl font-extrabold">{plan.price}</span>
                <span className="text-xs text-muted-foreground">{plan.period}</span>
              </div>
              <div className="mt-3 space-y-1.5">
                {plan.features.map((f) => (
                  <div key={f} className="flex items-center gap-1.5 text-[10px]">
                    <Check className="h-3 w-3 text-emerald-500" />
                    <span className="text-muted-foreground">{f}</span>
                  </div>
                ))}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function AchievementBadgesDemo() {
  const achievements = [
    { label: "First Purchase", tier: "bronze" as CrownTier, icon: Zap, unlocked: true },
    { label: "100 Reviews", tier: "silver" as CrownTier, icon: Star, unlocked: true },
    { label: "Top Contributor", tier: "gold" as CrownTier, icon: Crown, unlocked: true },
    { label: "Power User", tier: "platinum" as CrownTier, icon: Shield, unlocked: false },
    { label: "Legend", tier: "diamond" as CrownTier, icon: Gem, unlocked: false },
  ];

  return (
    <div className="flex flex-wrap gap-3">
      {achievements.map((a) => {
        const config = tierConfig[a.tier];
        const Icon = config.icon;
        return (
          <div
            key={a.label}
            className={`flex flex-col items-center gap-2 rounded-xl border border-black/[.08] p-4 shadow-sm transition-all dark:border-white/[.145] ${
              a.unlocked ? "" : "opacity-40 grayscale"
            }`}
          >
            <div className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r ${config.gradient} ${config.text} shadow-md ${config.glow}`}>
              <Icon className="h-6 w-6" />
            </div>
            <span className="text-xs font-semibold">{a.label}</span>
            <div className={`inline-flex items-center rounded-full bg-gradient-to-r ${config.gradient} px-2 py-0.5 ${config.text}`}>
              <span className="text-[8px] font-bold">{a.tier}</span>
            </div>
            {a.unlocked && (
              <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400">Unlocked</span>
            )}
            {!a.unlocked && (
              <span className="text-[10px] text-muted-foreground">Locked</span>
            )}
          </div>
        );
      })}
    </div>
  );
}

function VIPProfileDemo() {
  const user = {
    name: "Sarah Chen",
    email: "sarah@example.com",
    tier: "diamond" as CrownTier,
    joined: "Jan 2024",
    projects: 47,
    followers: 12400,
  };
  const config = tierConfig[user.tier];
  const Icon = config.icon;

  return (
    <div className="w-full max-w-sm">
      <div className={`rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]`}>
        <div className={`h-20 bg-gradient-to-r ${config.gradient}`} />
        <div className="px-5 pb-5">
          <div className="-mt-8 flex items-end gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-card bg-muted text-xl font-bold">
              SC
            </div>
            <div className="mb-1 flex items-center gap-2">
              <div className={`inline-flex items-center gap-1 rounded-full bg-gradient-to-r ${config.gradient} px-3 py-1 ${config.text}`}>
                <Icon className="h-3.5 w-3.5" />
                <span className="text-xs font-bold">{user.tier.charAt(0).toUpperCase() + user.tier.slice(1)} Member</span>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-lg font-bold">{user.name}</h3>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3">
            <div className="rounded-lg bg-muted/50 p-2.5 text-center">
              <p className="text-sm font-bold tabular-nums">{user.projects}</p>
              <p className="text-[10px] text-muted-foreground">Projects</p>
            </div>
            <div className="rounded-lg bg-muted/50 p-2.5 text-center">
              <p className="text-sm font-bold tabular-nums">{user.followers.toLocaleString()}</p>
              <p className="text-[10px] text-muted-foreground">Followers</p>
            </div>
            <div className="rounded-lg bg-muted/50 p-2.5 text-center">
              <p className="text-sm font-bold">{user.joined}</p>
              <p className="text-[10px] text-muted-foreground">Joined</p>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-2 rounded-lg bg-muted/30 px-3 py-2">
              <Crown className="h-4 w-4 text-yellow-500" />
              <span className="text-xs font-medium">Diamond Benefits Active</span>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-muted/30 px-3 py-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Top 1% of contributors</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InteractiveCrownDemo() {
  const [hovered, setHovered] = useState<CrownTier | null>(null);
  const tiers = [
    { tier: "bronze" as CrownTier, desc: "Getting started" },
    { tier: "gold" as CrownTier, desc: "Growing fast" },
    { tier: "diamond" as CrownTier, desc: "Elite status" },
  ];

  return (
    <div className="flex gap-4">
      {tiers.map((t) => {
        const config = tierConfig[t.tier];
        const Icon = config.icon;
        return (
          <button
            key={t.tier}
            onMouseEnter={() => setHovered(t.tier)}
            onMouseLeave={() => setHovered(null)}
            className={`flex flex-col items-center gap-2 rounded-xl border border-black/[.08] bg-card p-5 shadow-sm transition-all duration-300 dark:border-white/[.145] ${
              hovered === t.tier ? "scale-105 shadow-lg" : ""
            }`}
          >
            <div className={`flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r ${config.gradient} ${config.text} shadow-md transition-all ${
              hovered === t.tier ? "scale-110" : ""
            }`}>
              <Icon className={`h-7 w-7 ${hovered === t.tier ? "animate-bounce" : ""}`} />
            </div>
            <span className="text-sm font-bold capitalize">{t.tier}</span>
            <span className="text-[10px] text-muted-foreground">{t.desc}</span>
          </button>
        );
      })}
    </div>
  );
}

export default function CrownBadgePage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Crown Badge
          </h1>
          <Badge variant="primary">Feedback</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Crown-themed tier badges with gradient styling, metallic effects, and animated
          interactions for premium levels.
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
            Display all 5 crown tier badges with gradients.
          </p>
          <ComponentPreview id="crown-tiers">
            <AllTiersDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Tier Details</h3>
          <p className="text-sm text-muted-foreground">
            Pricing cards with tier badges and feature lists.
          </p>
          <ComponentPreview id="crown-details">
            <TierDetailsDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Leaderboard</h3>
          <p className="text-sm text-muted-foreground">
            User rankings with crown badges and scores.
          </p>
          <ComponentPreview id="crown-leaderboard">
            <LeaderboardDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Subscription Plans</h3>
          <p className="text-sm text-muted-foreground">
            Plan selector with tier indicators and pricing.
          </p>
          <ComponentPreview id="crown-plans">
            <SubscriptionPlansDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Achievement Badges</h3>
          <p className="text-sm text-muted-foreground">
            Unlocked and locked achievements with tier styling.
          </p>
          <ComponentPreview id="crown-achievements">
            <AchievementBadgesDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">VIP Profile</h3>
          <p className="text-sm text-muted-foreground">
            User profile with crown banner and tier badge.
          </p>
          <ComponentPreview id="crown-profile">
            <VIPProfileDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Interactive Crown</h3>
          <p className="text-sm text-muted-foreground">
            Hover animations with scale and bounce effects.
          </p>
          <ComponentPreview id="crown-interactive">
            <InteractiveCrownDemo />
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
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">size</td>
                <td className="px-4 py-3 text-muted-foreground">{"\"sm\" | \"md\" | \"lg\""}</td>
                <td className="px-4 py-3 text-muted-foreground">{"\"md\""}</td>
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
