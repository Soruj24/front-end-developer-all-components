"use client";

import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";

const CARD_SOURCE = `import type { ReactNode } from "react";

type CardPadding = "none" | "sm" | "md" | "lg";

interface CardProps {
  children: ReactNode;
  padding?: CardPadding;
  className?: string;
}

const paddingClasses: Record<string, string> = {
  none: "",
  sm: "p-3",
  md: "p-6",
  lg: "p-8",
};

function Card({ children, padding = "md", className = "" }: CardProps) {
  return (
    <div
      className={\`rounded-lg border bg-white shadow-sm dark:bg-zinc-900 \${
        paddingClasses[padding]
      } \${className}\`}
    >
      {children}
    </div>
  );
}

function CardHeader({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={\`flex flex-col space-y-1.5 p-6 \${className}\`}>
      {children}
    </div>
  );
}

function CardTitle({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <h3 className={\`text-2xl font-semibold leading-none tracking-tight \${className}\`}>
      {children}
    </h3>
  );
}

function CardDescription({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={\`text-sm text-zinc-500 dark:text-zinc-400 \${className}\`}>
      {children}
    </p>
  );
}

function CardContent({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={\`p-6 pt-0 \${className}\`}>
      {children}
    </div>
  );
}

function CardFooter({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={\`flex items-center p-6 pt-0 \${className}\`}>
      {children}
    </div>
  );
}

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };`;

const BASIC_CARD_SOURCE = `import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";

export default function BasicCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Basic Card</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          A simple card with title and content.
        </p>
      </CardContent>
    </Card>
  );
}`;

const IMAGE_CARD_SOURCE = `import { Card, CardContent } from "@/components/ui";

export default function ImageCard() {
  return (
    <Card padding="none">
      <div className="flex h-40 items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200">
        <span className="text-5xl">🖼️</span>
      </div>
      <CardContent>
        <h3 className="font-semibold">Image Card</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Card with image at the top, content below.
        </p>
      </CardContent>
    </Card>
  );
}`;

const PRICING_CARD_SOURCE = `import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui";

function CheckIcon() {
  return (
    <svg className="h-4 w-4 shrink-0 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
}

export default function PricingCard() {
  return (
    <Card className="border-primary">
      <CardHeader>
        <span className="rounded-full bg-primary px-2.5 py-0.5 text-xs font-medium text-primary-foreground w-fit">
          Popular
        </span>
        <CardTitle>Pro</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold">$49<span className="text-sm font-normal text-muted-foreground">/mo</span></p>
        <ul className="mt-4 space-y-2">
          {["Unlimited projects", "100GB storage", "Priority support"].map((f) => (
            <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckIcon />
              {f}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <button className="w-full rounded-md bg-primary py-2 text-sm font-medium text-primary-foreground">
          Choose Pro
        </button>
      </CardFooter>
    </Card>
  );
}`;

const PROFILE_CARD_SOURCE = `import { Card, CardContent } from "@/components/ui";

export default function ProfileCard() {
  return (
    <Card>
      <CardContent>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-purple-500 text-sm font-bold text-white">
            AK
          </div>
          <div>
            <p className="font-semibold">Alex Kim</p>
            <p className="text-xs text-muted-foreground">Product Designer</p>
          </div>
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          Building beautiful user interfaces with modern tools.
        </p>
      </CardContent>
    </Card>
  );
}`;

function CheckIcon() {
  return (
    <svg className="h-4 w-4 shrink-0 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
}

function Star({ filled }: { filled: boolean }) {
  return (
    <svg
      className={`h-4 w-4 ${filled ? "text-warning" : "text-zinc-200 dark:text-muted-foreground"}`}
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

const features = [
  "Unlimited projects",
  "Real-time collaboration",
  "Version control",
  "API access",
  "Priority support",
];

const plans = [
  {
    name: "Starter",
    price: "$19",
    period: "/mo",
    features: ["5 projects", "10GB storage", "Basic support"],
    popular: false,
  },
  {
    name: "Pro",
    price: "$49",
    period: "/mo",
    features: ["Unlimited projects", "100GB storage", "Priority support"],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$99",
    period: "/mo",
    features: ["Everything in Pro", "1TB storage", "24/7 support"],
    popular: false,
  },
];

export default function CardsPage() {
  return (
    <ComponentDocPage
      name="Cards"
      category="Surfaces"
      description="A collection of card patterns — basic, interactive, pricing, profile, and more. Each example shows the complete self-contained source."
    >
      <PreviewPanel filename="Card.tsx">
        <div className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border border-black/[.08] p-5 dark:border-white/[.145]">
            <span className="text-3xl">📄</span>
            <h2 className="mt-3 font-semibold">Basic Card</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              A simple card with title and description.
            </p>
          </div>
          <div className="overflow-hidden rounded-lg border border-border">
            <div className="flex h-40 items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 text-5xl dark:from-blue-900 dark:to-purple-900">
              🖼️
            </div>
            <div className="p-4">
              <h2 className="font-semibold">Image Top</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Card with image at the top, content below.
              </p>
            </div>
          </div>
          <div className="rounded-lg bg-white p-5 shadow-lg dark:bg-zinc-900">
            <span className="text-3xl">📦</span>
            <h2 className="mt-3 font-semibold">Elevated Card</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Shadow for visual depth and hierarchy.
            </p>
          </div>
        </div>
      </PreviewPanel>

      <SourceCodeViewer
        source={CARD_SOURCE}
        filename="Card.tsx"
        defaultExpanded
      />

      <section className="flex flex-col gap-6">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Examples
        </h2>

        <ExampleBlock title="Basic Card" code={BASIC_CARD_SOURCE}>
          <div className="w-full max-w-sm rounded-lg border border-black/[.08] p-5 dark:border-white/[.145]">
            <h2 className="font-semibold">Basic Card</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              A simple card with title and content.
            </p>
          </div>
        </ExampleBlock>

        <ExampleBlock title="Image Card" code={IMAGE_CARD_SOURCE}>
          <div className="w-full max-w-sm overflow-hidden rounded-lg border border-border">
            <div className="flex h-40 items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 text-5xl dark:from-blue-900 dark:to-purple-900">
              🖼️
            </div>
            <div className="p-4">
              <h2 className="font-semibold">Image Card</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Card with image at the top, content below.
              </p>
            </div>
          </div>
        </ExampleBlock>

        <ExampleBlock title="Pricing Card" code={PRICING_CARD_SOURCE}>
          <div className="w-full max-w-sm rounded-lg border border-primary bg-blue-50 p-5 dark:border-blue-400 dark:bg-blue-950">
            <span className="rounded-full bg-primary px-2.5 py-0.5 text-xs font-medium text-primary-foreground">
              Popular
            </span>
            <h2 className="mt-2 font-semibold">Pro</h2>
            <p className="mt-1 text-3xl font-bold">
              $49
              <span className="text-sm font-normal text-muted-foreground">
                /mo
              </span>
            </p>
            <ul className="mt-4 space-y-2">
              {["Unlimited projects", "100GB storage", "Priority support"].map(
                (f) => (
                  <li
                    key={f}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <CheckIcon />
                    {f}
                  </li>
                )
              )}
            </ul>
            <button className="mt-6 w-full rounded-md bg-primary py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
              Choose Pro
            </button>
          </div>
        </ExampleBlock>

        <ExampleBlock title="Profile Card" code={PROFILE_CARD_SOURCE}>
          <div className="w-full max-w-sm rounded-lg border border-black/[.08] p-5 dark:border-white/[.145]">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-purple-500 text-sm font-bold text-white">
                AK
              </div>
              <div>
                <p className="font-semibold">Alex Kim</p>
                <p className="text-xs text-muted-foreground">
                  Product Designer
                </p>
              </div>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Building beautiful user interfaces with modern tools.
            </p>
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Features List"
          code={`import { Card, CardContent } from "@/components/ui";

function CheckIcon() {
  return (
    <svg className="h-4 w-4 shrink-0 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
}

export default function FeaturesCard() {
  const features = ["Unlimited projects", "Real-time collaboration", "Version control", "API access", "Priority support"];

  return (
    <Card>
      <CardContent>
        <h3 className="font-semibold">Features</h3>
        <ul className="mt-3 space-y-2">
          {features.map((f) => (
            <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckIcon />
              {f}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}`}
        >
          <div className="w-full max-w-sm rounded-lg border border-black/[.08] p-5 dark:border-white/[.145]">
            <h2 className="font-semibold">Features List</h2>
            <ul className="mt-3 space-y-2">
              {features.map((f) => (
                <li
                  key={f}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <CheckIcon />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Rating Card"
          code={`import { Card, CardContent } from "@/components/ui";

function Star({ filled }: { filled: boolean }) {
  return (
    <svg className={\`h-4 w-4 \${filled ? "text-warning" : "text-zinc-200"}\`} fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

export default function RatingCard() {
  return (
    <Card>
      <CardContent>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((s) => <Star key={s} filled={s <= 4} />)}
          <span className="ml-1 text-xs text-muted-foreground">4.0 (128 reviews)</span>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">Rating card with star ratings.</p>
      </CardContent>
    </Card>
  );
}`}
        >
          <div className="w-full max-w-sm rounded-lg border border-black/[.08] p-5 dark:border-white/[.145]">
            <span className="text-3xl">⭐</span>
            <div className="mt-2 flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} filled={s <= 4} />
              ))}
              <span className="ml-1 text-xs text-muted-foreground">
                4.0 (128 reviews)
              </span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Rating card with star ratings and review count.
            </p>
          </div>
        </ExampleBlock>
      </section>
    </ComponentDocPage>
  );
}
