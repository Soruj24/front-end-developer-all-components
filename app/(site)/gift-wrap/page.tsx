"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Gift, Tag, Percent, Star, Heart, PartyPopper, Sparkles } from "lucide-react";

const installCommand = `npx component-library@latest add gift-wrap`;
const usageCode = `import { GiftWrap } from "@/components/gift-wrap";

<GiftWrap>Content</GiftWrap>`;

function GiftCardDemo() {
  const [opened, setOpened] = useState(false);

  return (
    <div className="w-full max-w-sm">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
        <div className="relative h-32 bg-gradient-to-br from-pink-100 to-rose-100 dark:from-pink-950/20 dark:to-rose-950/20">
          <div className="absolute top-4 left-1/2 -translate-x-1/2">
            <div className="text-4xl">🎁</div>
          </div>
          <div className="absolute top-2 right-4 w-0.5 h-12 bg-gradient-to-b from-red-400 to-red-500 rotate-12" />
          <div className="absolute top-2 left-4 w-0.5 h-12 bg-gradient-to-b from-red-400 to-red-500 -rotate-12" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-4 bg-gradient-to-r from-red-400 via-red-500 to-red-400 rounded-b-lg" />
        </div>
        <div className="p-5 text-center">
          <h3 className="text-lg font-extrabold">Happy Birthday!</h3>
          <p className="mt-1 text-xs text-muted-foreground">
            A special gift just for you. Click to reveal your surprise.
          </p>
          <button onClick={() => setOpened(!opened)} className="mt-4 rounded-lg bg-foreground px-4 py-2 text-xs font-medium text-background shadow-sm hover:bg-foreground/90">
            {opened ? "Close Gift" : "Open Gift"}
          </button>
          {opened && (
            <div className="mt-4 rounded-lg bg-primary/5 border border-primary/20 p-4">
              <p className="text-sm font-bold text-primary">You received $50!</p>
              <p className="text-[10px] text-muted-foreground mt-1">Code: BIRTHDAY50</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function PromotionalBannerDemo() {
  const [copied, setCopied] = useState(false);

  return (
    <div className="w-full max-w-lg">
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-purple-100 to-pink-100 border border-black/[.08] p-6 dark:from-purple-950/20 dark:to-pink-950/20 dark:border-white/[.145]">
        <div className="absolute top-4 right-4">
          <Gift className="h-16 w-16 text-purple-300 opacity-50" />
        </div>
        <div className="relative z-10">
          <Badge variant="secondary" className="mb-2">
            <Sparkles className="mr-1 h-3 w-3" />
            Limited Time
          </Badge>
          <h2 className="text-2xl font-extrabold">Holiday Sale</h2>
          <p className="mt-1 max-w-sm text-sm text-muted-foreground">
            Get 30% off on all items. Use code at checkout.
          </p>
          <div className="mt-3 flex items-center gap-2">
            <div className="rounded-lg border border-dashed border-primary/50 bg-background px-3 py-1.5 font-mono text-sm font-bold">
              HOLIDAY30
            </div>
            <button
              onClick={() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="rounded-lg bg-foreground px-3 py-1.5 text-xs font-medium text-background hover:bg-foreground/90"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function UnboxingExperienceDemo() {
  const [step, setStep] = useState(0);
  const steps = [
    { label: "Wrapped", emoji: "🎁" },
    { label: "Unwrapping", emoji: "🎀" },
    { label: "Revealed", emoji: "✨" },
  ];

  return (
    <div className="w-full max-w-sm">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm p-6 dark:border-white/[.145]">
        <div className="flex justify-center mb-4">
          <div className="relative">
            <div className={`text-6xl transition-all duration-500 ${
              step === 0 ? "scale-100 rotate-0" : step === 1 ? "scale-110 rotate-5" : "scale-125"
            }`}>
              {steps[step].emoji}
            </div>
            {step === 2 && (
              <div className="absolute -top-2 -right-2">
                <Sparkles className="h-6 w-6 text-yellow-500 animate-pulse" />
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-center gap-2 mb-4">
          {steps.map((s, i) => (
            <div key={i} className={`flex items-center gap-1 ${
              i <= step ? "text-primary" : "text-muted-foreground"
            }`}>
              <div className={`h-2 w-2 rounded-full ${
                i <= step ? "bg-primary" : "bg-muted"
              }`} />
              <span className="text-[10px]">{s.label}</span>
            </div>
          ))}
        </div>
        <button
          onClick={() => setStep((s) => (s >= 2 ? 0 : s + 1))}
          className="w-full rounded-lg bg-foreground px-4 py-2 text-xs font-medium text-background hover:bg-foreground/90"
        >
          {step === 2 ? "Reset" : "Next Step"}
        </button>
      </div>
    </div>
  );
}

function GiftRegistryDemo() {
  const gifts = [
    { name: "Blender", price: 89, bought: true, icon: "🍳" },
    { name: "Towels Set", price: 45, bought: false, icon: "🛁" },
    { name: "Coffee Maker", price: 120, bought: false, icon: "☕" },
    { name: "Knife Set", price: 150, bought: true, icon: "🔪" },
  ];

  return (
    <div className="w-full max-w-md">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
        <div className="border-b border-black/[.06] px-4 py-3 dark:border-white/[.1]">
          <div className="flex items-center gap-2">
            <Gift className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold">Wedding Registry</h3>
            <span className="ml-auto text-[10px] text-muted-foreground">2/4 bought</span>
          </div>
        </div>
        <div className="p-4 space-y-2">
          {gifts.map((g) => (
            <div key={g.name} className={`flex items-center gap-3 rounded-lg border p-3 ${
              g.bought ? "border-primary/30 bg-primary/5" : "border-black/[.08] dark:border-white/[.145]"
            }`}>
              <div className="text-2xl">{g.icon}</div>
              <div className="flex-1">
                <p className="text-xs font-bold">{g.name}</p>
                <p className="text-[10px] text-muted-foreground">${g.price}</p>
              </div>
              {g.bought ? (
                <span className="text-[10px] font-medium text-primary">Bought</span>
              ) : (
                <button className="rounded-md bg-foreground px-3 py-1 text-[10px] font-medium text-background hover:bg-foreground/90">
                  Buy Gift
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CouponCodeDemo() {
  const [redeemed, setRedeemed] = useState(false);
  const coupons = [
    { code: "SAVE20", discount: "20% Off", expires: "Dec 31", color: "from-green-100 to-emerald-100 dark:from-green-950/20 dark:to-emerald-950/20" },
    { code: "FREESHIP", discount: "Free Shipping", expires: "Jan 15", color: "from-blue-100 to-cyan-100 dark:from-blue-950/20 dark:to-cyan-950/20" },
  ];

  return (
    <div className="w-full max-w-md">
      <div className="space-y-3">
        {coupons.map((c) => (
          <div key={c.code} className={`relative overflow-hidden rounded-xl bg-gradient-to-r ${c.color} border border-black/[.08] p-4 dark:border-white/[.145]`}>
            <div className="absolute top-0 left-0 h-full w-1 bg-foreground/20" />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-extrabold">{c.discount}</p>
                <p className="text-[10px] text-muted-foreground">Expires {c.expires}</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="rounded-lg border border-dashed border-foreground/30 bg-background/50 px-3 py-1.5 font-mono text-xs font-bold">
                  {c.code}
                </div>
                <button
                  onClick={() => setRedeemed(true)}
                  className="rounded-lg bg-foreground px-3 py-1.5 text-[10px] font-medium text-background hover:bg-foreground/90"
                >
                  {redeemed ? "Applied" : "Apply"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function HolidayThemeDemo() {
  const [theme, setTheme] = useState<"christmas" | "birthday" | "valentine">("christmas");
  const themes = {
    christmas: { emoji: "🎄", label: "Christmas", colors: "from-red-100 to-green-100 dark:from-red-950/20 dark:to-green-950/20" },
    birthday: { emoji: "🎂", label: "Birthday", colors: "from-pink-100 to-purple-100 dark:from-pink-950/20 dark:to-purple-950/20" },
    valentine: { emoji: "💝", label: "Valentine", colors: "from-rose-100 to-red-100 dark:from-rose-950/20 dark:to-red-950/20" },
  };

  return (
    <div className="w-full max-w-sm">
      <div className={`rounded-xl bg-gradient-to-br ${themes[theme].colors} border border-black/[.08] p-6 dark:border-white/[.145]`}>
        <div className="text-center mb-4">
          <div className="text-5xl mb-2">{themes[theme].emoji}</div>
          <h3 className="text-lg font-extrabold capitalize">{theme} Gift</h3>
        </div>
        <div className="flex gap-2 justify-center mb-4">
          {(Object.keys(themes) as Array<keyof typeof themes>).map((t) => (
            <button
              key={t}
              onClick={() => setTheme(t)}
              className={`rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                theme === t ? "bg-foreground text-background" : "bg-background/50 text-muted-foreground hover:bg-background"
              }`}
            >
              {themes[t].emoji}
            </button>
          ))}
        </div>
        <button className="w-full rounded-lg bg-foreground px-4 py-2 text-xs font-medium text-background hover:bg-foreground/90">
          Send Gift
        </button>
      </div>
    </div>
  );
}

function GiftListDemo() {
  const gifts = [
    { name: "Watch", recipient: "Dad", budget: 200, status: "purchased" as const },
    { name: "Book Set", recipient: "Mom", budget: 50, status: "wrapped" as const },
    { name: "Headphones", recipient: "Sister", budget: 150, status: "pending" as const },
  ];
  const statusColors = {
    purchased: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400",
    wrapped: "bg-blue-100 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400",
    pending: "bg-yellow-100 text-yellow-700 dark:bg-yellow-950/30 dark:text-yellow-400",
  };

  return (
    <div className="w-full max-w-md">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
        <div className="border-b border-black/[.06] px-4 py-3 dark:border-white/[.1]">
          <div className="flex items-center gap-2">
            <PartyPopper className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold">Gift Shopping List</h3>
          </div>
        </div>
        <div className="p-4 space-y-2">
          {gifts.map((g) => (
            <div key={g.name} className="flex items-center gap-3 rounded-lg border border-black/[.08] p-3 dark:border-white/[.145]">
              <div className="text-xl">🎁</div>
              <div className="flex-1">
                <p className="text-xs font-bold">{g.name}</p>
                <p className="text-[10px] text-muted-foreground">For {g.recipient} · ${g.budget}</p>
              </div>
              <span className={`rounded-full px-2 py-0.5 text-[9px] font-medium capitalize ${statusColors[g.status]}`}>
                {g.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function GiftWrapPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Gift Wrap
          </h1>
          <Badge variant="primary">Visual</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          A decorative gift wrap component with ribbon and bow visuals for promotional content.
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
          <h3 className="text-lg font-medium text-foreground">Gift Card</h3>
          <p className="text-sm text-muted-foreground">
            Birthday gift card with reveal animation.
          </p>
          <ComponentPreview id="gift-card">
            <GiftCardDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Promotional Banner</h3>
          <p className="text-sm text-muted-foreground">
            Holiday sale banner with coupon code.
          </p>
          <ComponentPreview id="gift-promo">
            <PromotionalBannerDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Unboxing Experience</h3>
          <p className="text-sm text-muted-foreground">
            Step-by-step gift reveal animation.
          </p>
          <ComponentPreview id="gift-unbox">
            <UnboxingExperienceDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Gift Registry</h3>
          <p className="text-sm text-muted-foreground">
            Wedding registry with purchase status.
          </p>
          <ComponentPreview id="gift-registry">
            <GiftRegistryDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Coupon Code</h3>
          <p className="text-sm text-muted-foreground">
            Discount codes with apply functionality.
          </p>
          <ComponentPreview id="gift-coupon">
            <CouponCodeDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Holiday Theme</h3>
          <p className="text-sm text-muted-foreground">
            Seasonal gift themes with emoji selector.
          </p>
          <ComponentPreview id="gift-holiday">
            <HolidayThemeDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Gift List</h3>
          <p className="text-sm text-muted-foreground">
            Shopping list with budget tracking.
          </p>
          <ComponentPreview id="gift-list">
            <GiftListDemo />
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
                <td className="px-4 py-3 font-mono text-xs">ribbon</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">false</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">color</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">"red"</td>
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
