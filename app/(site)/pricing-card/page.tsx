"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";

const PRICING_CARD_SOURCE = `"use client";

interface PricingCardProps {
  name: string;
  price: string;
  period?: string;
  features: string[];
  highlight?: boolean;
  className?: string;
}

export function PricingCard({
  name,
  price,
  period = "/month",
  features,
  highlight = false,
  className,
}: PricingCardProps) {
  return (
    <div className={["flex w-full max-w-xs flex-col gap-4 rounded-xl border p-6", highlight ? "border-primary bg-primary/5 ring-2 ring-primary/20" : "", className].filter(Boolean).join(" ")}>
      <div>
        <p className="text-sm font-medium text-muted-foreground">{name}</p>
        <div className="mt-1 flex items-baseline gap-1">
          <span className="text-3xl font-bold text-foreground">{price}</span>
          <span className="text-sm text-muted-foreground">{period}</span>
        </div>
      </div>
      <ul className="flex-1 space-y-2.5">
        {features.map((feature) => (
          <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
            <svg className="h-4 w-4 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {feature}
          </li>
        ))}
      </ul>
      <button
        type="button"
        className={["w-full rounded-lg py-2.5 text-sm font-medium transition-colors", highlight ? "bg-primary text-primary-foreground hover:bg-primary/90" : "border hover:bg-muted"].join(" ")}
      >
        Get Started
      </button>
    </div>
  );
}`;

const PLANS_CODE = `const plans = [
  { name: "Starter", price: "$9", features: ["5 projects", "10GB storage", "Basic support"] },
  { name: "Pro", price: "$29", features: ["Unlimited projects", "100GB storage", "Priority support", "API access"], highlight: true },
  { name: "Enterprise", price: "$99", features: ["Everything in Pro", "Custom integrations", "Dedicated support", "SLA guarantee"] },
];

{plans.map((plan) => (
  <PricingCard
    key={plan.name}
    name={plan.name}
    price={plan.price}
    features={plan.features}
    highlight={plan.highlight}
  />
))}`;

const plans = [
  { name: "Starter", price: "$9", period: "/month", features: ["5 projects", "10GB storage", "Basic support"], highlight: false },
  { name: "Pro", price: "$29", period: "/month", features: ["Unlimited projects", "100GB storage", "Priority support", "API access"], highlight: true },
  { name: "Enterprise", price: "$99", period: "/month", features: ["Everything in Pro", "Custom integrations", "Dedicated support", "SLA guarantee"], highlight: false },
];

export default function PricingCardPage() {
  return (
    <ComponentDocPage
      name="Pricing Card"
      category="Commerce"
      description="A pricing card component with plan details, feature list, CTA button, and popular plan highlight."
    >
      <PreviewPanel filename="pricing-card.tsx">
        <div className="flex w-full flex-col items-center justify-center gap-6 py-4 sm:flex-row">
          {plans.map((plan, i) => (
            <div key={i} className={`w-full max-w-xs rounded-xl border p-6 flex flex-col gap-4 ${plan.highlight ? "border-primary bg-primary/5 ring-2 ring-primary/20" : ""}`}>
              <div>
                <p className="text-sm font-medium text-muted-foreground">{plan.name}</p>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-3xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-sm text-muted-foreground">{plan.period}</span>
                </div>
              </div>
              <ul className="space-y-2.5 flex-1">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <svg className="w-4 h-4 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-2.5 rounded-lg text-sm font-medium transition-colors ${plan.highlight ? "bg-primary text-primary-foreground hover:bg-primary/90" : "border hover:bg-muted"}`}>
                Get Started
              </button>
            </div>
          ))}
        </div>
      </PreviewPanel>

      <SourceCodeViewer source={PRICING_CARD_SOURCE} filename="components/ui/PricingCard/PricingCard.tsx" defaultExpanded />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Plan Comparison" description="Pricing cards with feature lists and a highlighted plan." code={PLANS_CODE} filename="plan-comparison.tsx">
          <div className="flex w-full flex-col items-center justify-center gap-6 py-4 sm:flex-row">
            {plans.map((plan, i) => (
              <div key={i} className={`w-full max-w-xs rounded-xl border p-6 flex flex-col gap-4 ${plan.highlight ? "border-primary bg-primary/5 ring-2 ring-primary/20" : ""}`}>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{plan.name}</p>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-3xl font-bold text-foreground">{plan.price}</span>
                    <span className="text-sm text-muted-foreground">{plan.period}</span>
                  </div>
                </div>
                <ul className="space-y-2.5 flex-1">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <svg className="w-4 h-4 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-2.5 rounded-lg text-sm font-medium transition-colors ${plan.highlight ? "bg-primary text-primary-foreground hover:bg-primary/90" : "border hover:bg-muted"}`}>
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}