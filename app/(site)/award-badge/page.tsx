"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Trophy, Medal, Award, Star, Sparkles } from "lucide-react";

const installCommand = `npx component-library@latest add award-badge`;
const usageCode = `import { AwardBadge } from "@/components/award-badge";

<AwardBadge type="gold" label="Top Contributor" icon="trophy" />`;

type AwardType = "gold" | "silver" | "bronze" | "platinum" | "diamond";

const awardConfig: Record<AwardType, { bg: string; border: string; text: string; icon: typeof Trophy; glow: string }> = {
  gold: { bg: "bg-yellow-50 dark:bg-yellow-950/30", border: "border-yellow-300 dark:border-yellow-700", text: "text-yellow-700 dark:text-yellow-300", icon: Trophy, glow: "shadow-yellow-200/50 dark:shadow-yellow-900/50" },
  silver: { bg: "bg-gray-50 dark:bg-gray-950/30", border: "border-gray-300 dark:border-gray-700", text: "text-gray-700 dark:text-gray-300", icon: Medal, glow: "shadow-gray-200/50 dark:shadow-gray-900/50" },
  bronze: { bg: "bg-orange-50 dark:bg-orange-950/30", border: "border-orange-300 dark:border-orange-700", text: "text-orange-700 dark:text-orange-300", icon: Award, glow: "shadow-orange-200/50 dark:shadow-orange-900/50" },
  platinum: { bg: "bg-slate-50 dark:bg-slate-950/30", border: "border-slate-300 dark:border-slate-700", text: "text-slate-700 dark:text-slate-300", icon: Star, glow: "shadow-slate-200/50 dark:shadow-slate-900/50" },
  diamond: { bg: "bg-cyan-50 dark:bg-cyan-950/30", border: "border-cyan-300 dark:border-cyan-700", text: "text-cyan-700 dark:text-cyan-300", icon: Sparkles, glow: "shadow-cyan-200/50 dark:shadow-cyan-900/50" },
};

function AwardBadgeDemo({ type, label }: { type: AwardType; label: string }) {
  const config = awardConfig[type];
  const Icon = config.icon;
  return (
    <div className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 shadow-md ${config.bg} ${config.border} ${config.glow}`}>
      <Icon className={`h-4 w-4 ${config.text}`} />
      <span className={`text-sm font-semibold ${config.text}`}>{label}</span>
    </div>
  );
}

function StackedAwardsDemo() {
  return (
    <div className="flex flex-wrap gap-3">
      {(["gold", "silver", "bronze", "platinum", "diamond"] as AwardType[]).map((type) => (
        <AwardBadgeDemo key={type} type={type} label={type.charAt(0).toUpperCase() + type.slice(1)} />
      ))}
    </div>
  );
}

function CompactAwardDemo() {
  return (
    <div className="flex gap-2">
      {(["gold", "silver", "bronze"] as AwardType[]).map((type) => {
        const config = awardConfig[type];
        const Icon = config.icon;
        return (
          <div key={type} className={`flex h-8 w-8 items-center justify-center rounded-full border ${config.bg} ${config.border}`}>
            <Icon className={`h-4 w-4 ${config.text}`} />
          </div>
        );
      })}
    </div>
  );
}

function AnimatedAwardDemo() {
  const [hovered, setHovered] = useState<AwardType | null>(null);
  return (
    <div className="flex gap-3">
      {(["gold", "silver", "bronze"] as AwardType[]).map((type) => {
        const config = awardConfig[type];
        const Icon = config.icon;
        return (
          <button
            key={type}
            onMouseEnter={() => setHovered(type)}
            onMouseLeave={() => setHovered(null)}
            className={`flex items-center gap-2 rounded-full border px-4 py-2 transition-all duration-300 ${config.bg} ${config.border} ${hovered === type ? "scale-110 shadow-lg" : "shadow-sm"}`}
          >
            <Icon className={`h-4 w-4 ${config.text} ${hovered === type ? "animate-spin" : ""}`} />
            <span className={`text-sm font-medium ${config.text}`}>{type}</span>
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
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Award Badge</h1>
          <Badge variant="primary">Feedback</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Visual award badges for achievements, rankings, and recognition with metallic styling and tier variants.
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

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">All Award Types</h2>
        <ComponentPreview>
          <StackedAwardsDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Compact Icons</h2>
        <ComponentPreview>
          <CompactAwardDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Interactive Awards</h2>
        <ComponentPreview>
          <AnimatedAwardDemo />
        </ComponentPreview>
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
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">type</td><td className="px-4 py-3 text-muted-foreground">{'"gold" | "silver" | "bronze" | "platinum" | "diamond"'}</td><td className="px-4 py-3 text-muted-foreground">{'"gold"'}</td><td className="px-4 py-3">No</td></tr>
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">label</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">Yes</td></tr>
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">icon</td><td className="px-4 py-3 text-muted-foreground">{'"trophy" | "medal" | "award" | "star" | "sparkles"'}</td><td className="px-4 py-3 text-muted-foreground">{'"trophy"'}</td><td className="px-4 py-3">No</td></tr>
              <tr><td className="px-4 py-3 font-mono text-xs">className</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
