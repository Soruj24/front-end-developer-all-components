"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";

const CARD_SOURCE = `"use client";

import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

type CardPadding = "none" | "sm" | "md" | "lg";
type CardVariant = "default" | "elevated" | "outline" | "ghost";

interface CardProps {
  children: ReactNode;
  padding?: CardPadding;
  variant?: CardVariant;
  className?: string;
}

const paddingClasses: Record<string, string> = {
  none: "",
  sm: "p-3 sm:p-4",
  md: "p-4 sm:p-6",
  lg: "p-6 sm:p-8",
};

const variantClasses: Record<string, string> = {
  default: "border border-border bg-card text-card-foreground shadow-sm",
  elevated: "border border-border/60 bg-card text-card-foreground shadow-md shadow-black/[.03] dark:shadow-black/[.08]",
  outline: "border-2 border-border bg-transparent text-card-foreground",
  ghost: "border border-transparent bg-muted/40 text-card-foreground",
};

function Card({ children, padding = "md", variant = "default", className }: CardProps) {
  return (
    <div className={cn("rounded-xl transition-colors", variantClasses[variant], paddingClasses[padding], className)}>
      {children}
    </div>
  );
}

function CardHeader({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("flex flex-col space-y-1.5 p-4 sm:p-6", className)}>{children}</div>;
}

function CardTitle({ children, className }: { children: ReactNode; className?: string }) {
  return <h3 className={cn("text-lg font-semibold leading-none tracking-tight text-foreground sm:text-xl", className)}>{children}</h3>;
}

function CardDescription({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("text-sm text-muted-foreground", className)}>{children}</p>;
}

function CardContent({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("p-4 pt-0 sm:p-6", className)}>{children}</div>;
}

function CardFooter({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("flex items-center p-4 pt-0 sm:p-6", className)}>{children}</div>;
}

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };`;

const BASIC_CARD_SOURCE = `import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui";

export default function BasicCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Basic Card</CardTitle>
        <CardDescription>A simple card with title and content.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          This card uses the default variant with standard padding.
        </p>
      </CardContent>
    </Card>
  );
}`;

const IMAGE_CARD_SOURCE = `import { Card, CardContent } from "@/components/ui";

export default function ImageCard() {
  return (
    <Card padding="none" className="overflow-hidden">
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

const PRICING_CARD_SOURCE = `import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui";

function CheckIcon() {
  return (
    <svg className="h-4 w-4 shrink-0 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
}

export default function PricingCard() {
  return (
    <Card variant="elevated" className="border-primary/40 ring-1 ring-primary/10">
      <CardHeader>
        <span className="w-fit rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
          Popular
        </span>
        <CardTitle>Pro</CardTitle>
        <CardDescription>For growing teams and projects.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold">$49<span className="text-sm font-normal text-muted-foreground">/mo</span></p>
        <ul className="mt-4 space-y-2.5">
          {["Unlimited projects", "100GB storage", "Priority support"].map((f) => (
            <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckIcon />
              {f}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <button className="w-full rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm shadow-primary/20 transition-all hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.97]">
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
            <p className="font-semibold text-foreground">Alex Kim</p>
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
    <svg className="h-4 w-4 shrink-0 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
}

function Star({ filled }: { filled: boolean }) {
  return (
    <svg
      className={`h-4 w-4 ${filled ? "text-amber-400" : "text-zinc-200 dark:text-zinc-600"}`}
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
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  return (
    <ComponentDocPage
      name="Cards"
      category="Surfaces"
      description="A collection of card patterns with multiple variants, responsive padding, and compound composition. Supports default, elevated, outline, and ghost styles."
    >
      <PreviewPanel filename="Card.tsx">
        <div className="grid w-full gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Basic Card</CardTitle>
              <CardDescription>A simple card with title and description.</CardDescription>
            </CardHeader>
          </Card>
          <Card padding="none" className="overflow-hidden">
            <div className="flex h-36 items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 text-5xl dark:from-blue-900 dark:to-purple-900">
              🖼️
            </div>
            <CardContent>
              <h3 className="font-semibold">Image Top</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Card with image at the top, content below.
              </p>
            </CardContent>
          </Card>
          <Card variant="elevated">
            <CardHeader>
              <CardTitle>Elevated Card</CardTitle>
              <CardDescription>Shadow for visual depth and hierarchy.</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </PreviewPanel>

      <SourceCodeViewer
        source={CARD_SOURCE}
        filename="components/ui/Card/Card.tsx"
        defaultExpanded
      />

      <section className="flex flex-col gap-8">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Examples
        </h2>

        <ExampleBlock title="Basic Card" code={BASIC_CARD_SOURCE} filename="basic-card.tsx">
          <div className="w-full max-w-sm">
            <Card>
              <CardHeader>
                <CardTitle>Basic Card</CardTitle>
                <CardDescription>A simple card with title and content.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  This card uses the default variant with standard padding.
                </p>
              </CardContent>
            </Card>
          </div>
        </ExampleBlock>

        <ExampleBlock title="Image Card" code={IMAGE_CARD_SOURCE} filename="image-card.tsx">
          <div className="w-full max-w-sm">
            <Card padding="none" className="overflow-hidden">
              <div className="flex h-40 items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 text-5xl dark:from-blue-900 dark:to-purple-900">
                🖼️
              </div>
              <CardContent>
                <h3 className="font-semibold">Image Card</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Card with image at the top, content below.
                </p>
              </CardContent>
            </Card>
          </div>
        </ExampleBlock>

        <ExampleBlock title="Pricing Card" code={PRICING_CARD_SOURCE} filename="pricing-card.tsx">
          <div className="w-full max-w-sm">
            <Card variant="elevated" className="border-primary/40 ring-1 ring-primary/10">
              <CardHeader>
                <span className="w-fit rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                  Popular
                </span>
                <CardTitle>Pro</CardTitle>
                <CardDescription>For growing teams and projects.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">
                  $49
                  <span className="text-sm font-normal text-muted-foreground">/mo</span>
                </p>
                <ul className="mt-4 space-y-2.5">
                  {["Unlimited projects", "100GB storage", "Priority support"].map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckIcon />
                      {f}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <button className="w-full rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm shadow-primary/20 transition-all hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.97]">
                  Choose Pro
                </button>
              </CardFooter>
            </Card>
          </div>
        </ExampleBlock>

        <ExampleBlock title="Profile Card" code={PROFILE_CARD_SOURCE} filename="profile-card.tsx">
          <div className="w-full max-w-sm">
            <Card>
              <CardContent>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-purple-500 text-sm font-bold text-white">
                    AK
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Alex Kim</p>
                    <p className="text-xs text-muted-foreground">Product Designer</p>
                  </div>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">
                  Building beautiful user interfaces with modern tools.
                </p>
              </CardContent>
            </Card>
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Features List"
          code={`import { Card, CardContent, CardTitle } from "@/components/ui";

function CheckIcon() {
  return (
    <svg className="h-4 w-4 shrink-0 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
}

export default function FeaturesCard() {
  const features = ["Unlimited projects", "Real-time collaboration", "Version control", "API access", "Priority support"];
  return (
    <Card>
      <CardContent>
        <CardTitle>Features</CardTitle>
        <ul className="mt-3 space-y-2.5">
          {features.map((f) => (
            <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckIcon />{f}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}`}
          filename="features-card.tsx"
        >
          <div className="w-full max-w-sm">
            <Card>
              <CardContent>
                <h3 className="font-semibold text-foreground">Features</h3>
                <ul className="mt-3 space-y-2.5">
                  {features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckIcon />
                      {f}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Rating Card"
          code={`import { Card, CardContent } from "@/components/ui";

function Star({ filled }: { filled: boolean }) {
  return (
    <svg className={\`h-4 w-4 \${filled ? "text-amber-400" : "text-zinc-200 dark:text-zinc-600"}\`} fill="currentColor" viewBox="0 0 20 20">
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
          filename="rating-card.tsx"
        >
          <div className="w-full max-w-sm">
            <Card>
              <CardContent>
                <div className="flex items-center gap-1">
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
              </CardContent>
            </Card>
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Variant Comparison"
          code={`import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";

const variants = ["default", "elevated", "outline", "ghost"] as const;

export default function VariantCards() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {variants.map((v) => (
        <Card key={v} variant={v}>
          <CardHeader>
            <CardTitle className="capitalize">{v}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">The {v} card variant.</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}`}
          filename="variant-cards.tsx"
        >
          <div className="grid w-full max-w-lg grid-cols-2 gap-4">
            {(["default", "elevated", "outline", "ghost"] as const).map((v) => (
              <Card key={v} variant={v}>
                <CardHeader>
                  <CardTitle className="capitalize text-base">{v}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">The {v} variant.</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Interactive Pricing"
          code={`import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui";

export default function PricingCards() {
  const [selected, setSelected] = useState<string | null>(null);
  const plans = [
    { name: "Starter", price: "$19", period: "/mo", features: ["5 projects", "10GB storage", "Basic support"], popular: false },
    { name: "Pro", price: "$49", period: "/mo", features: ["Unlimited projects", "100GB storage", "Priority support"], popular: true },
    { name: "Enterprise", price: "$99", period: "/mo", features: ["Everything in Pro", "1TB storage", "24/7 support"], popular: false },
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {plans.map((p) => (
        <Card
          key={p.name}
          variant={selected === p.name ? "elevated" : "default"}
          className={selected === p.name ? "ring-2 ring-primary" : ""}
        >
          <CardHeader>
            <CardTitle>{p.name}</CardTitle>
            <CardDescription>{p.price}{p.period}</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {p.features.map((f) => <li key={f} className="text-sm text-muted-foreground">{f}</li>)}
            </ul>
          </CardContent>
          <CardFooter>
            <button onClick={() => setSelected(p.name)}>Select</button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}`}
          filename="interactive-pricing.tsx"
        >
          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
            {plans.map((p) => (
              <Card
                key={p.name}
                variant={selectedPlan === p.name ? "elevated" : "default"}
                className={selectedPlan === p.name ? "ring-2 ring-primary/60" : ""}
              >
                <CardHeader>
                  {p.popular && (
                    <span className="w-fit rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
                      Popular
                    </span>
                  )}
                  <CardTitle className="text-base">{p.name}</CardTitle>
                  <CardDescription>
                    <span className="text-xl font-bold text-foreground">{p.price}</span>
                    <span className="text-sm text-muted-foreground">{p.period}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckIcon />
                        {f}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <button
                    onClick={() => setSelectedPlan(p.name)}
                    className="w-full rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm shadow-primary/20 transition-all hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.97]"
                  >
                    {selectedPlan === p.name ? "Selected" : "Select"}
                  </button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </ExampleBlock>
      </section>
    </ComponentDocPage>
  );
}
