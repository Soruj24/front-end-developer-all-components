"use client";

import { useState } from "react";
import { ComponentPreview } from "@/components/preview";
import { ThreeColumnStandard } from "./components/ThreeColumnStandard";
import { FourColumnGrid } from "./components/FourColumnGrid";
import { AnnualMonthlyToggle } from "./components/AnnualMonthlyToggle";
import { FeatureComparisonTable } from "./components/FeatureComparisonTable";
import { PerSeatPricing } from "./components/PerSeatPricing";
import { UsageBasedPricing } from "./components/UsageBasedPricing";
import { FreePlusAddons } from "./components/FreePlusAddons";
import { FlatRate } from "./components/FlatRate";
import { TwoSided } from "./components/TwoSided";
import { TieredFeatureReveal } from "./components/TieredFeatureReveal";
import { EnterpriseCustom } from "./components/EnterpriseCustom";
import { TeamPricing } from "./components/TeamPricing";
import { LifetimeDeal } from "./components/LifetimeDeal";
import { MoneyBackGuarantee } from "./components/MoneyBackGuarantee";
import { FreeTrial } from "./components/FreeTrial";
import { OpenSource } from "./components/OpenSource";
import { NonprofitDiscount } from "./components/NonprofitDiscount";
import { StudentPlan } from "./components/StudentPlan";
import { MultiCurrency } from "./components/MultiCurrency";
import { PricingFaq } from "./components/PricingFaq";
import { TestimonialRow } from "./components/TestimonialRow";
import { TrustBadges } from "./components/TrustBadges";
import { FeatureHoverCards } from "./components/FeatureHoverCards";
import { RadarChart } from "./components/RadarChart";
import { AddonsGrid } from "./components/AddonsGrid";
import { AnnualDiscountBadge } from "./components/AnnualDiscountBadge";
import { SeatBasedTeamDiscount } from "./components/SeatBasedTeamDiscount";
import { HybridPricing } from "./components/HybridPricing";
import { GrandfatheredPricing } from "./components/GrandfatheredPricing";
import { PriceAnchoring } from "./components/PriceAnchoring";

const STYLES: Array<{ label: string; Render: React.ComponentType; registryId: string }> = [
  { label: "3-Column Standard", Render: ThreeColumnStandard, registryId: "pricing-three-column" },
  { label: "4-Column Grid", Render: FourColumnGrid, registryId: "pricing-four-column" },
  { label: "Annual vs Monthly", Render: AnnualMonthlyToggle, registryId: "pricing-annual-toggle" },
  { label: "Feature Comparison", Render: FeatureComparisonTable, registryId: "pricing-feature-comparison" },
  { label: "Per-seat Pricing", Render: PerSeatPricing, registryId: "pricing-per-seat" },
  { label: "Usage-based", Render: UsageBasedPricing, registryId: "pricing-usage-based" },
  { label: "Free + Add-ons", Render: FreePlusAddons, registryId: "pricing-free-addons" },
  { label: "Flat Rate", Render: FlatRate, registryId: "pricing-flat-rate" },
  { label: "Two-sided", Render: TwoSided, registryId: "pricing-two-sided" },
  { label: "Tiered Feature Reveal", Render: TieredFeatureReveal, registryId: "pricing-tiered-reveal" },
  { label: "Enterprise Custom", Render: EnterpriseCustom, registryId: "pricing-enterprise" },
  { label: "Team Pricing", Render: TeamPricing, registryId: "pricing-team" },
  { label: "Lifetime Deal", Render: LifetimeDeal, registryId: "pricing-lifetime" },
  { label: "Money-back Guarantee", Render: MoneyBackGuarantee, registryId: "pricing-money-back" },
  { label: "Free Trial", Render: FreeTrial, registryId: "pricing-free-trial" },
  { label: "Open Source", Render: OpenSource, registryId: "pricing-open-source" },
  { label: "Nonprofit Discount", Render: NonprofitDiscount, registryId: "pricing-nonprofit" },
  { label: "Student Plan", Render: StudentPlan, registryId: "pricing-student" },
  { label: "Multi-currency", Render: MultiCurrency, registryId: "pricing-multi-currency" },
  { label: "FAQ", Render: PricingFaq, registryId: "pricing-faq" },
  { label: "Testimonial Row", Render: TestimonialRow, registryId: "pricing-testimonials" },
  { label: "Trust Badges", Render: TrustBadges, registryId: "pricing-trust-badges" },
  { label: "Feature Hover Cards", Render: FeatureHoverCards, registryId: "pricing-hover-cards" },
  { label: "Radar Chart", Render: RadarChart, registryId: "pricing-radar-chart" },
  { label: "Add-ons Grid", Render: AddonsGrid, registryId: "pricing-addons-grid" },
  { label: "Annual Discount Badge", Render: AnnualDiscountBadge, registryId: "pricing-annual-badge" },
  { label: "Seat-based Team Discount", Render: SeatBasedTeamDiscount, registryId: "pricing-seat-discount" },
  { label: "Hybrid Pricing", Render: HybridPricing, registryId: "pricing-hybrid" },
  { label: "Grandfathered Pricing", Render: GrandfatheredPricing, registryId: "pricing-grandfathered" },
  { label: "Price Anchoring", Render: PriceAnchoring, registryId: "pricing-anchoring" },
];

export default function Pricing() {
  const [activeStyle, setActiveStyle] = useState(0);
  const { Render: Active, registryId } = STYLES[activeStyle];

  return (
    <div className="mx-auto max-w-7xl space-y-24 px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight">Simple, transparent pricing</h1>
        <p className="mt-3 text-muted-foreground dark:text-muted-foreground/70">Choose the plan that fits your needs. No hidden fees. No surprises.</p>
      </div>

      <section>
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {STYLES.map((s, i) => (
            <button
              key={s.registryId}
              onClick={() => setActiveStyle(i)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition ${
                activeStyle === i
                  ? "bg-blue-500 text-white shadow"
                  : "bg-muted text-muted-foreground hover:bg-muted dark:text-muted-foreground/70 dark:hover:bg-muted"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        <ComponentPreview id={registryId}>
          <Active />
        </ComponentPreview>
      </section>
    </div>
  );
}
