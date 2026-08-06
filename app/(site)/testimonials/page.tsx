"use client"

import { useState } from "react"
import { ComponentPreview } from "@/components/preview"
import { GridTestimonials } from "./components/GridTestimonials"
import { CarouselTestimonials } from "./components/CarouselTestimonials"
import { FeaturedSidebarTestimonials } from "./components/FeaturedSidebarTestimonials"
import { MasonryTestimonials } from "./components/MasonryTestimonials"
import { TrustedByLogos } from "./components/TrustedByLogos"
import { StatsTestimonials } from "./components/StatsTestimonials"
import { FilterTestimonials } from "./components/FilterTestimonials"

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
        <h1 className="text-4xl font-bold tracking-tight">What our customers say</h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Trusted by thousands of teams worldwide.
        </p>
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
  )
}
