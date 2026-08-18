"use client"

import { useState } from "react"
import { Badge } from "@/components/design-system/Badge"
import { ComponentPreview } from "@/components/preview"
import { CodeBlock } from "@/components/home/CodeBlock"
import { GridTestimonials } from "./components/GridTestimonials"
import { CarouselTestimonials } from "./components/CarouselTestimonials"
import { FeaturedSidebarTestimonials } from "./components/FeaturedSidebarTestimonials"
import { MasonryTestimonials } from "./components/MasonryTestimonials"
import { TrustedByLogos } from "./components/TrustedByLogos"
import { StatsTestimonials } from "./components/StatsTestimonials"
import { FilterTestimonials } from "./components/FilterTestimonials"

const testimonialProps = [
  { prop: "variant", type: "\"grid\" | \"carousel\" | \"featured\" | \"masonry\" | \"trusted-by\"", default: "\"grid\"", required: "No" },
  { prop: "items", type: "TestimonialItem[]", default: "-", required: "Yes" },
  { prop: "showRatings", type: "boolean", default: "true", required: "No" },
  { prop: "columns", type: "number", default: "3", required: "No" },
  { prop: "autoplay", type: "boolean", default: "false", required: "No" },
];

const installCommand = `npx component-library@latest add testimonials`;

const usageCode = `import { TestimonialGrid } from "@/components/testimonials";

<TestimonialGrid items={testimonials} columns={3} />`;

const STYLES: Array<{ label: string; Render: React.ComponentType; registryId: string }> = [
  { label: "Grid Layout", Render: GridTestimonials, registryId: "testimonials-grid" },
  { label: "Carousel", Render: CarouselTestimonials, registryId: "testimonials-carousel" },
  { label: "Featured + Sidebar", Render: FeaturedSidebarTestimonials, registryId: "testimonials-featured-sidebar" },
  { label: "Masonry", Render: MasonryTestimonials, registryId: "testimonials-masonry" },
  { label: "Trusted By", Render: TrustedByLogos, registryId: "testimonials-trusted-by" },
  { label: "Stats", Render: StatsTestimonials, registryId: "testimonials-stats" },
  { label: "Filter", Render: FilterTestimonials, registryId: "testimonials-filter" },
]

export default function Testimonials() {
  const [activeStyle, setActiveStyle] = useState(0)
  const { Render: Active, registryId } = STYLES[activeStyle]

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-20 px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center">
        <div className="flex items-center justify-center gap-3">
          <h1 className="text-4xl font-bold tracking-tight">What our customers say</h1>
          <Badge variant="primary">{STYLES.length} layouts</Badge>
        </div>
        <p className="mt-3 text-lg text-muted-foreground">
          Trusted by thousands of teams worldwide.
        </p>
      </div>

      {/* Installation */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Installation</h2>
        <CodeBlock code={installCommand} filename="Terminal" label="bash" variant="terminal" />
      </section>

      {/* Usage */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} filename="page.tsx" label="tsx" />
      </section>

      {/* Examples */}
      <section className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Examples</h2>

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

      {/* API Reference */}
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
              {testimonialProps.map((row, i) => (
                <tr key={row.prop} className={i < testimonialProps.length - 1 ? "border-b" : ""}>
                  <td className="px-4 py-3 font-mono text-xs">{row.prop}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.type}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.default}</td>
                  <td className="px-4 py-3">{row.required}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
