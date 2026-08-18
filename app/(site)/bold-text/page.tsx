"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import {
  Bold,
  Italic,
  Type,
  Heading1,
  Heading2,
  Heading3,
  AlignLeft,
  Star,
  Check,
  Zap,
} from "lucide-react";

const installCommand = `npx component-library@latest add bold-text`;
const usageCode = `import { BoldText } from "@/components/bold-text";

<BoldText size="lg" weight="bold">
  Important heading
</BoldText>`;

type Weight = "normal" | "medium" | "semibold" | "bold" | "extrabold";
type Size = "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl";

const weights: { value: Weight; label: string; css: string; pixels: string }[] = [
  { value: "normal", label: "Normal", css: "font-normal", pixels: "400" },
  { value: "medium", label: "Medium", css: "font-medium", pixels: "500" },
  { value: "semibold", label: "Semibold", css: "font-semibold", pixels: "600" },
  { value: "bold", label: "Bold", css: "font-bold", pixels: "700" },
  { value: "extrabold", label: "Extrabold", css: "font-extrabold", pixels: "800" },
];

const sizes: { value: Size; label: string; css: string; px: string }[] = [
  { value: "xs", label: "XS", css: "text-xs", px: "12px" },
  { value: "sm", label: "SM", css: "text-sm", px: "14px" },
  { value: "base", label: "Base", css: "text-base", px: "16px" },
  { value: "lg", label: "LG", css: "text-lg", px: "18px" },
  { value: "xl", label: "XL", css: "text-xl", px: "20px" },
  { value: "2xl", label: "2XL", css: "text-2xl", px: "24px" },
  { value: "3xl", label: "3XL", css: "text-3xl", px: "30px" },
  { value: "4xl", label: "4XL", css: "text-4xl", px: "36px" },
];

function WeightSelectorDemo() {
  const [selected, setSelected] = useState<Weight>("bold");
  return (
    <div className="flex w-full max-w-lg flex-col gap-4 rounded-xl border border-black/[.08] bg-card p-5 shadow-sm dark:border-white/[.145]">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold">Font Weight</span>
        <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium tabular-nums text-muted-foreground">
          {weights.find((w) => w.value === selected)?.pixels}
        </span>
      </div>
      <div className="flex gap-1.5">
        {weights.map((w) => (
          <button
            key={w.value}
            onClick={() => setSelected(w.value)}
            className={`flex-1 rounded-lg px-2 py-2 text-xs font-medium transition-all ${
              selected === w.value
                ? "bg-foreground text-background shadow-sm"
                : "text-muted-foreground hover:bg-muted"
            }`}
          >
            {w.label}
          </button>
        ))}
      </div>
      <div className="rounded-lg bg-muted/50 p-4">
        <p className={`${weights.find((w) => w.value === selected)?.css} text-xl text-foreground`}>
          The quick brown fox jumps over the lazy dog
        </p>
      </div>
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span>Current:</span>
        <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[11px]">
          {weights.find((w) => w.value === selected)?.css}
        </code>
      </div>
    </div>
  );
}

function SizeScaleDemo() {
  return (
    <div className="w-full max-w-lg rounded-xl border border-black/[.08] bg-card p-5 shadow-sm dark:border-white/[.145]">
      <div className="mb-4 text-sm font-semibold">Type Scale</div>
      <div className="space-y-3">
        {sizes.map((s) => (
          <div key={s.value} className="flex items-baseline gap-3 border-b border-black/[.04] pb-3 last:border-0 dark:border-white/[.06]">
            <span className="w-10 shrink-0 text-[11px] font-medium text-muted-foreground">{s.label}</span>
            <span className={`${s.css} font-bold text-foreground`}>Heading Text</span>
            <span className="ml-auto shrink-0 text-[10px] font-mono text-muted-foreground/60">{s.px}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function HeadingHierarchyDemo() {
  return (
    <div className="w-full max-w-lg rounded-xl border border-black/[.08] bg-card p-5 shadow-sm dark:border-white/[.145]">
      <div className="mb-4 text-sm font-semibold">Document Structure</div>
      <div className="space-y-4">
        <div className="rounded-lg bg-muted/30 p-3">
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground">Page Title</h1>
          <span className="mt-1 inline-block rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
            text-4xl / extrabold / tracking-tight
          </span>
        </div>
        <div className="rounded-lg bg-muted/30 p-3">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Section Heading</h2>
          <span className="mt-1 inline-block rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
            text-2xl / bold / tracking-tight
          </span>
        </div>
        <div className="rounded-lg bg-muted/30 p-3">
          <h3 className="text-xl font-semibold text-foreground">Subsection</h3>
          <span className="mt-1 inline-block rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
            text-xl / semibold
          </span>
        </div>
        <div className="rounded-lg bg-muted/30 p-3">
          <h4 className="text-lg font-medium text-foreground">Card Title</h4>
          <span className="mt-1 inline-block rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
            text-lg / medium
          </span>
        </div>
        <div className="rounded-lg bg-muted/30 p-3">
          <p className="text-sm text-muted-foreground">Body text uses normal weight for comfortable reading. Regular weight provides the best legibility for longer paragraphs.</p>
          <span className="mt-1 inline-block rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
            text-sm / normal
          </span>
        </div>
      </div>
    </div>
  );
}

function ArticleTypographyDemo() {
  return (
    <div className="w-full max-w-lg rounded-xl border border-black/[.08] bg-card p-6 shadow-sm dark:border-white/[.145]">
      <div className="mb-1 flex items-center gap-2">
        <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:bg-blue-950 dark:text-blue-400">
          Guide
        </span>
        <span className="text-xs text-muted-foreground">8 min read</span>
      </div>
      <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground">
        Getting Started with React Server Components
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        React Server Components represent a fundamental shift in how we think about
        rendering. They allow components to execute on the server, reducing bundle
        size and improving initial load performance.
      </p>
      <h3 className="mt-5 text-lg font-semibold text-foreground">Key Benefits</h3>
      <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
        <li className="flex items-start gap-2">
          <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
          <span><span className="font-semibold text-foreground">Zero client-side JavaScript</span> for server-rendered components</span>
        </li>
        <li className="flex items-start gap-2">
          <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
          <span><span className="font-semibold text-foreground">Direct database access</span> without API layers</span>
        </li>
        <li className="flex items-start gap-2">
          <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
          <span><span className="font-semibold text-foreground">Automatic code splitting</span> at the component level</span>
        </li>
      </ul>
      <div className="mt-5 rounded-lg bg-muted/50 p-4">
        <p className="text-sm font-medium text-foreground">Note</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Server Components require Next.js 13+ or a compatible framework.
        </p>
      </div>
    </div>
  );
}

function CardTypographyDemo() {
  const cards = [
    {
      title: "Pro Plan",
      description: "Everything you need for production",
      price: "$49",
      period: "/month",
      features: ["Unlimited projects", "Priority support", "Advanced analytics"],
      highlight: true,
    },
    {
      title: "Starter Plan",
      description: "Perfect for side projects",
      price: "$19",
      period: "/month",
      features: ["5 projects", "Email support", "Basic analytics"],
      highlight: false,
    },
  ];

  return (
    <div className="grid w-full max-w-lg gap-4 sm:grid-cols-2">
      {cards.map((card) => (
        <div
          key={card.title}
          className={`flex flex-col rounded-xl border p-5 shadow-sm ${
            card.highlight
              ? "border-foreground bg-foreground text-background"
              : "border-black/[.08] bg-card dark:border-white/[.145]"
          }`}
        >
          <span className={`text-sm font-medium ${
            card.highlight ? "text-background/70" : "text-muted-foreground"
          }`}>{card.title}</span>
          <div className="mt-2 flex items-baseline gap-0.5">
            <span className="text-3xl font-extrabold tabular-nums">{card.price}</span>
            <span className={`text-sm ${
              card.highlight ? "text-background/60" : "text-muted-foreground"
            }`}>{card.period}</span>
          </div>
          <p className={`mt-1 text-sm ${
            card.highlight ? "text-background/70" : "text-muted-foreground"
          }`}>{card.description}</p>
          <div className="mt-4 flex-1 space-y-2">
            {card.features.map((f) => (
              <div key={f} className="flex items-center gap-2 text-sm">
                <Check className={`h-4 w-4 ${
                  card.highlight ? "text-background/70" : "text-emerald-500"
                }`} />
                <span>{f}</span>
              </div>
            ))}
          </div>
          <button
            className={`mt-4 w-full rounded-lg py-2.5 text-sm font-semibold transition-colors ${
              card.highlight
                ? "bg-background text-foreground hover:bg-background/90"
                : "bg-foreground text-background hover:bg-foreground/90"
            }`}
          >
            Get Started
          </button>
        </div>
      ))}
    </div>
  );
}

function InlineFormattingDemo() {
  return (
    <div className="w-full max-w-lg rounded-xl border border-black/[.08] bg-card p-5 shadow-sm dark:border-white/[.145]">
      <h3 className="text-lg font-semibold text-foreground">Formatting Options</h3>
      <div className="mt-4 space-y-4">
        <div className="flex items-center gap-3 rounded-lg border border-black/[.06] bg-muted/30 p-3 dark:border-white/[.08]">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-foreground text-background">
            <Bold className="h-4 w-4" />
          </div>
          <div>
            <span className="text-sm font-bold text-foreground">Bold Text</span>
            <p className="text-xs text-muted-foreground">font-weight: 700</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-lg border border-black/[.06] bg-muted/30 p-3 dark:border-white/[.08]">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted text-foreground">
            <Italic className="h-4 w-4" />
          </div>
          <div>
            <span className="text-sm italic text-foreground">Italic Text</span>
            <p className="text-xs text-muted-foreground">font-style: italic</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-lg border border-black/[.06] bg-muted/30 p-3 dark:border-white/[.08]">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted text-foreground">
            <Type className="h-4 w-4" />
          </div>
          <div>
            <span className="text-sm font-bold italic text-foreground">Bold Italic</span>
            <p className="text-xs text-muted-foreground">font-weight: 700 + italic</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-lg border border-black/[.06] bg-muted/30 p-3 dark:border-white/[.08]">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted text-foreground">
            <Heading1 className="h-4 w-4" />
          </div>
          <div>
            <span className="text-sm font-extrabold uppercase tracking-wider text-foreground">Uppercase Bold</span>
            <p className="text-xs text-muted-foreground">font-weight: 800 + uppercase</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function LabelVariantsDemo() {
  return (
    <div className="flex w-full max-w-lg flex-col gap-4 rounded-xl border border-black/[.08] bg-card p-5 shadow-sm dark:border-white/[.145]">
      <div className="text-sm font-semibold">Label Variants</div>
      <div className="flex flex-wrap gap-2">
        <span className="rounded-full bg-foreground px-3 py-1 text-xs font-bold text-background">Primary</span>
        <span className="rounded-full border border-black/[.08] px-3 py-1 text-xs font-semibold dark:border-white/[.145]">Outline</span>
        <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">Muted</span>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">Success</span>
        <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-600 dark:bg-red-950 dark:text-red-400">Error</span>
        <span className="rounded-full bg-yellow-50 px-3 py-1 text-xs font-bold text-yellow-600 dark:bg-yellow-950 dark:text-yellow-400">Warning</span>
      </div>
      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-1.5 text-sm">
          <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
          <span className="font-bold">4.9</span>
          <span className="text-muted-foreground">(2,847 reviews)</span>
        </div>
        <div className="flex items-center gap-1.5 text-sm">
          <Zap className="h-3.5 w-3.5 text-amber-500" />
          <span className="font-semibold">Pro</span>
          <span className="text-muted-foreground">feature</span>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Projects</span>
          <span className="font-bold tabular-nums">24</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Members</span>
          <span className="font-bold tabular-nums">128</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Storage</span>
          <span className="font-bold tabular-nums">2.4 GB</span>
        </div>
      </div>
    </div>
  );
}

export default function BoldTextPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Bold Text
          </h1>
          <Badge variant="primary">Typography</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Typography component with configurable font weights, sizes, and heading hierarchy
          for consistent text styling.
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
          <h3 className="text-lg font-medium text-foreground">Weight Selector</h3>
          <p className="text-sm text-muted-foreground">
            Interactive weight picker with live preview and CSS class reference.
          </p>
          <ComponentPreview id="bold-weight">
            <WeightSelectorDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Type Scale</h3>
          <p className="text-sm text-muted-foreground">
            Complete size scale from XS to 4XL with pixel equivalents.
          </p>
          <ComponentPreview id="bold-scale">
            <SizeScaleDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Document Structure</h3>
          <p className="text-sm text-muted-foreground">
            Heading hierarchy showing proper nesting from H1 to body text.
          </p>
          <ComponentPreview id="bold-hierarchy">
            <HeadingHierarchyDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Article Typography</h3>
          <p className="text-sm text-muted-foreground">
            Real article layout with headings, paragraphs, lists, and callouts.
          </p>
          <ComponentPreview id="bold-article">
            <ArticleTypographyDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Card Typography</h3>
          <p className="text-sm text-muted-foreground">
            Pricing cards demonstrating bold numbers, descriptions, and feature lists.
          </p>
          <ComponentPreview id="bold-cards">
            <CardTypographyDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Inline Formatting</h3>
          <p className="text-sm text-muted-foreground">
            Bold, italic, and combined formatting with icon labels.
          </p>
          <ComponentPreview id="bold-inline">
            <InlineFormattingDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Label Variants</h3>
          <p className="text-sm text-muted-foreground">
            Badges, ratings, stats, and metadata with appropriate font weights.
          </p>
          <ComponentPreview id="bold-labels">
            <LabelVariantsDemo />
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
                <td className="px-4 py-3 font-mono text-xs">weight</td>
                <td className="px-4 py-3 text-muted-foreground">{"\"normal\" | \"medium\" | \"semibold\" | \"bold\" | \"extrabold\""}</td>
                <td className="px-4 py-3 text-muted-foreground">{"\"bold\""}</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">size</td>
                <td className="px-4 py-3 text-muted-foreground">{"\"xs\" | \"sm\" | \"base\" | \"lg\" | \"xl\" | \"2xl\" | \"3xl\" | \"4xl\""}</td>
                <td className="px-4 py-3 text-muted-foreground">{"\"base\""}</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">as</td>
                <td className="px-4 py-3 text-muted-foreground">{"\"p\" | \"h1\" | \"h2\" | \"h3\" | \"h4\" | \"span\""}</td>
                <td className="px-4 py-3 text-muted-foreground">{"\"p\""}</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">tracking</td>
                <td className="px-4 py-3 text-muted-foreground">{"\"tight\" | \"normal\" | \"wide\""}</td>
                <td className="px-4 py-3 text-muted-foreground">{"\"normal\""}</td>
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
