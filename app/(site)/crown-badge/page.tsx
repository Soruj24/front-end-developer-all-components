"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Crown, Star, Trophy, Gem, Award } from "lucide-react";

const installCommand = `npx component-library@latest add crown-badge`;
const usageCode = `import { CrownBadge } from "@/components/crown-badge";

<CrownBadge tier="gold" label="Premium" />`;

type CrownTier = "bronze" | "silver" | "gold" | "platinum" | "diamond";

const tierConfig: Record<CrownTier, { gradient: string; icon: typeof Crown; text: string; glow: string }> = {
  bronze: { gradient: "from-amber-600 to-amber-800", icon: Award, text: "text-amber-100", glow: "shadow-amber-500/30" },
  silver: { gradient: "from-gray-400 to-gray-600", icon: Star, text: "text-gray-100", glow: "shadow-gray-400/30" },
  gold: { gradient: "from-yellow-400 to-amber-500", icon: Crown, text: "text-amber-900", glow: "shadow-yellow-400/30" },
  platinum: { gradient: "from-slate-300 to-slate-500", icon: Trophy, text: "text-slate-900", glow: "shadow-slate-400/30" },
  diamond: { gradient: "from-cyan-300 to-blue-500", icon: Gem, text: "text-blue-900", glow: "shadow-cyan-400/30" },
};

function CrownBadgeDemo({ tier }: { tier: CrownTier }) {
  const config = tierConfig[tier];
  const Icon = config.icon;
  return (
    <div className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${config.gradient} px-4 py-1.5 shadow-md ${config.glow} ${config.text}`}>
      <Icon className="h-4 w-4" />
      <span className="text-sm font-bold">{tier.charAt(0).toUpperCase() + tier.slice(1)}</span>
    </div>
  );
}

function CrownTierShowcase() {
  return (
    <div className="flex flex-wrap gap-3">
      {(["bronze", "silver", "gold", "platinum", "diamond"] as CrownTier[]).map((t) => (
        <CrownBadgeDemo key={t} tier={t} />
      ))}
    </div>
  );
}

function CrownWithDetailsDemo() {
  const features = [
    { tier: "gold" as CrownTier, label: "Gold", perks: "Priority support", icon: "⭐" },
    { tier: "platinum" as CrownTier, label: "Platinum", perks: "Custom branding", icon: "💎" },
    { tier: "diamond" as CrownTier, label: "Diamond", perks: "Dedicated manager", icon: "👑" },
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {features.map((f) => {
        const config = tierConfig[f.tier];
        return (
          <div key={f.tier} className="flex flex-col items-center gap-2 rounded-xl border bg-card p-4">
            <span className="text-2xl">{f.icon}</span>
            <CrownBadgeDemo tier={f.tier} />
            <p className="text-xs text-center text-muted-foreground">{f.perks}</p>
          </div>
        );
      })}
    </div>
  );
}

function AnimatedCrownDemo() {
  const [hovered, setHovered] = useState<CrownTier | null>(null);
  return (
    <div className="flex gap-4">
      {(["bronze", "gold", "diamond"] as CrownTier[]).map((t) => {
        const config = tierConfig[t];
        const Icon = config.icon;
        return (
          <button
            key={t}
            onMouseEnter={() => setHovered(t)}
            onMouseLeave={() => setHovered(null)}
            className={`flex flex-col items-center gap-2 rounded-xl border bg-card p-4 transition-all duration-300 ${hovered === t ? "scale-105 shadow-lg" : ""}`}
          >
            <Icon className={`h-8 w-8 ${hovered === t ? "animate-bounce" : ""}`} />
            <span className="text-sm font-semibold capitalize">{t}</span>
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
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Crown Badge</h1>
          <Badge variant="primary">Feedback</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Crown-themed tier badges with gradient styling, metallic effects, and animated interactions for premium levels.
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
        <h2 className="text-xl font-semibold tracking-tight text-foreground">All Tiers</h2>
        <ComponentPreview>
          <CrownTierShowcase />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Tier Details</h2>
        <ComponentPreview>
          <CrownWithDetailsDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Interactive Crown</h2>
        <ComponentPreview>
          <AnimatedCrownDemo />
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
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">tier</td><td className="px-4 py-3 text-muted-foreground">{'"bronze" | "silver" | "gold" | "platinum" | "diamond"'}</td><td className="px-4 py-3 text-muted-foreground">{'"gold"'}</td><td className="px-4 py-3">No</td></tr>
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">label</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr>
              <tr><td className="px-4 py-3 font-mono text-xs">className</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
