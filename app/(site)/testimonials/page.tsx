"use client"

import { useState, useEffect, useCallback } from "react"

interface Testimonial {
  quote: string
  name: string
  title: string
  company: string
  category: "Startups" | "Enterprise" | "Agencies"
}

const testimonials: Testimonial[] = [
  {
    quote:
      "This platform completely transformed how our team builds and ships products. The developer experience is unmatched and we cut our release cycle in half within the first month.",
    name: "Sarah Chen",
    title: "CTO",
    company: "TechStart",
    category: "Startups",
  },
  {
    quote:
      "We migrated our entire infrastructure in two days. The documentation is fantastic and support is incredibly responsive. Enterprise-grade reliability without the complexity.",
    name: "Marcus Johnson",
    title: "Engineering Lead",
    company: "DataFlow",
    category: "Enterprise",
  },
  {
    quote:
      "The analytics and monitoring tools gave us insights we never had before. It's become an essential part of our stack and our clients have noticed the difference.",
    name: "Emily Rodriguez",
    title: "VP of Product",
    company: "CloudScale",
    category: "Enterprise",
  },
  {
    quote:
      "Best decision we made this year. The performance improvements alone justified the switch, and the team loved how easy it was to adopt.",
    name: "James Park",
    title: "Founder",
    company: "Launchpad",
    category: "Startups",
  },
  {
    quote:
      "Enterprise-grade features with startup-friendly pricing. A rare combination that actually delivers on its promises. Our compliance team was impressed too.",
    name: "Aisha Patel",
    title: "Director of Engineering",
    company: "FinCore",
    category: "Enterprise",
  },
  {
    quote:
      "The collaboration features are outstanding. Our distributed team feels more connected than ever before. It has become our single source of truth.",
    name: "Tom Andersen",
    title: "DevOps Manager",
    company: "Streamline",
    category: "Agencies",
  },
  {
    quote:
      "We switched from three different tools to one unified platform. Our workflow is simpler, our team is happier, and our clients are seeing faster delivery times.",
    name: "Lisa Kim",
    title: "Creative Director",
    company: "Brightside Studio",
    category: "Agencies",
  },
  {
    quote:
      "The onboarding was seamless. Within a week we were fully operational and our team was shipping features faster than ever. Truly a game changer for us.",
    name: "David Okafor",
    title: "VP of Technology",
    company: "NexGen Solutions",
    category: "Enterprise",
  },
  {
    quote:
      "As a small team we needed something powerful yet simple. This platform gave us the capabilities of a large enterprise without the overhead. Highly recommend.",
    name: "Priya Sharma",
    title: "Co-Founder",
    company: "EcoLabs",
    category: "Startups",
  },
  {
    quote:
      "We run campaigns for Fortune 500 companies and this tool has become indispensable. The reliability and speed are unmatched in the industry.",
    name: "Carlos Mendez",
    title: "Head of Growth",
    company: "Pinnacle Agency",
    category: "Agencies",
  },
  {
    quote:
      "The API is a dream to work with. We built a custom integration in an afternoon that would have taken us weeks with any other platform.",
    name: "Yuki Tanaka",
    title: "Senior Engineer",
    company: "Quantum Labs",
    category: "Startups",
  },
  {
    quote:
      "We evaluated a dozen solutions before choosing this one. Two years later we are still discovering new features that make our work easier.",
    name: "Rachel Cohen",
    title: "CEO",
    company: "Meridian Health",
    category: "Enterprise",
  },
  {
    quote:
      "Our design team adopted this immediately. The collaborative tools and real-time feedback loops have improved our creative output significantly.",
    name: "Michael Torres",
    title: "Design Lead",
    company: "Radius Agency",
    category: "Agencies",
  },
  {
    quote:
      "From zero to production in record time. The templates and starter kits gave us a huge head start and the flexibility to customize everything.",
    name: "Olivia Wright",
    title: "Technical Product Manager",
    company: "Atlas Digital",
    category: "Startups",
  },
]

const companies = [
  "TechStart",
  "DataFlow",
  "CloudScale",
  "Launchpad",
  "FinCore",
  "Streamline",
  "Brightside Studio",
  "NexGen Solutions",
  "Pinnacle Agency",
  "Quantum Labs",
  "Meridian Health",
  "Radius Agency",
]

const categories = ["Startups", "Enterprise", "Agencies"] as const

function StarRating({ size = "sm" }: { size?: "sm" | "lg" }) {
  const cls = size === "lg" ? "h-6 w-6" : "h-4 w-4"
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className={`${cls} fill-yellow-400 text-yellow-400`} viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

function Avatar({ name, size = "md" }: { name: string; size?: "sm" | "md" | "lg" }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
  const gradients = [
    "from-blue-400 to-purple-500",
    "from-emerald-400 to-cyan-500",
    "from-orange-400 to-pink-500",
    "from-indigo-400 to-violet-500",
    "from-rose-400 to-red-500",
    "from-teal-400 to-green-500",
  ]
  const idx = name.length % gradients.length
  const sizeMap = { sm: "h-8 w-8 text-xs", md: "h-10 w-10 text-sm", lg: "h-14 w-14 text-lg" }
  return (
    <div
      className={`flex items-center justify-center rounded-full bg-gradient-to-br ${gradients[idx]} font-bold text-white ${sizeMap[size]}`}
    >
      {initials}
    </div>
  )
}

function Badge({ label }: { label: string }) {
  const colors: Record<string, string> = {
    Startups: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
    Enterprise: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
    Agencies: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  }
  return (
    <span
      className={`inline-block rounded-full px-3 py-0.5 text-xs font-medium ${colors[label] || "bg-muted text-muted-foreground"}`}
    >
      {label}
    </span>
  )
}

function Card({ t, featured }: { t: Testimonial; featured?: boolean }) {
  return (
    <div
      className={`flex flex-col gap-4 rounded-xl border border-border bg-white p-6 shadow-sm transition hover:shadow-md dark:border-border dark:bg-zinc-900 ${featured ? "gap-5 p-8" : ""}`}
    >
      <div className="flex items-start justify-between">
        <StarRating size={featured ? "lg" : "sm"} />
        <Badge label={t.category} />
      </div>
      <p
        className={`flex-1 leading-relaxed text-muted-foreground ${featured ? "text-lg" : "text-sm"}`}
      >
        &ldquo;{t.quote}&rdquo;
      </p>
      <div className="flex items-center gap-3">
        <Avatar name={t.name} size={featured ? "lg" : "md"} />
        <div>
          <p className={`font-medium ${featured ? "text-base" : "text-sm"}`}>{t.name}</p>
          <p className={`text-muted-foreground dark:text-muted-foreground/70 ${featured ? "text-sm" : "text-xs"}`}>
            {t.title}, {t.company}
          </p>
        </div>
      </div>
    </div>
  )
}

function SectionHeading({ label }: { label: string }) {
  return (
    <div className="mb-8 text-center">
      <h2 className="text-2xl font-bold tracking-tight">{label}</h2>
      <div className="mx-auto mt-2 h-1 w-16 rounded-full bg-gradient-to-r from-blue-400 to-purple-500" />
    </div>
  )
}

export default function Testimonials() {
  const [carouselIdx, setCarouselIdx] = useState(0)
  const [filter, setFilter] = useState<string>("All")

  const filtered =
    filter === "All" ? testimonials : testimonials.filter((t) => t.category === filter)

  const goNext = useCallback(() => {
    setCarouselIdx((p) => (p + 1) % testimonials.length)
  }, [])
  const goPrev = useCallback(() => {
    setCarouselIdx((p) => (p - 1 + testimonials.length) % testimonials.length)
  }, [])

  useEffect(() => {
    const timer = setInterval(goNext, 5000)
    return () => clearInterval(timer)
  }, [goNext])

  const ct = testimonials[carouselIdx]

  const featured = testimonials[0]
  const sidebarItems = testimonials.slice(1, 4)

  const masonry = testimonials.slice(0, 6)

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-20 px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight">What our customers say</h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Trusted by thousands of teams worldwide.
        </p>
      </div>

      <section>
        <SectionHeading label="Grid Layout" />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.slice(0, 6).map((t, i) => (
            <Card key={i} t={t} />
          ))}
        </div>
      </section>

      <section>
        <SectionHeading label="Carousel / Slider" />
        <div className="relative mx-auto max-w-2xl overflow-hidden rounded-xl border border-border bg-white p-8 shadow-sm dark:border-border dark:bg-zinc-900">
          <div
            className="flex flex-col items-center gap-5 text-center transition-opacity duration-500"
            key={carouselIdx}
          >
            <Avatar name={ct.name} size="lg" />
            <StarRating size="lg" />
            <p className="text-xl leading-relaxed text-muted-foreground">
              &ldquo;{ct.quote}&rdquo;
            </p>
            <div>
              <p className="text-lg font-semibold">{ct.name}</p>
              <p className="text-sm text-muted-foreground dark:text-muted-foreground/70">
                {ct.title}, {ct.company}
              </p>
            </div>
            <Badge label={ct.category} />
          </div>
          <button
            onClick={goPrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-border bg-white/80 p-2 text-muted-foreground backdrop-blur hover:bg-white dark:border-border dark:bg-muted/80 dark:text-muted-foreground dark:hover:bg-muted"
            aria-label="Previous"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={goNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-border bg-white/80 p-2 text-muted-foreground backdrop-blur hover:bg-white dark:border-border dark:bg-muted/80 dark:text-muted-foreground dark:hover:bg-muted"
            aria-label="Next"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <div className="mt-6 flex items-center justify-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCarouselIdx(i)}
                className={`h-2.5 rounded-full transition-all ${
                  i === carouselIdx ? "w-8 bg-blue-500" : "w-2.5 bg-muted dark:bg-muted"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section>
        <SectionHeading label="Featured + Sidebar" />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card t={featured} featured />
          </div>
          <div className="flex flex-col gap-6">
            {sidebarItems.map((t, i) => (
              <Card key={i} t={t} />
            ))}
          </div>
        </div>
      </section>

      <section>
        <SectionHeading label="Masonry / Mixed Heights" />
        <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
          {masonry.map((t, i) => {
            const long = i % 3 === 1 ? "row-span-2" : ""
            return (
              <div key={i} className={`mb-6 break-inside-avoid ${long}`}>
                <div className="flex flex-col gap-4 rounded-xl border border-border bg-white p-6 shadow-sm transition hover:shadow-md dark:border-border dark:bg-zinc-900">
                  <div className="flex items-start justify-between">
                    <StarRating />
                    <Badge label={t.category} />
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <Avatar name={t.name} />
                    <div>
                      <p className="text-sm font-medium">{t.name}</p>
                      <p className="text-xs text-muted-foreground dark:text-muted-foreground/70">
                        {t.title}, {t.company}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <section>
        <SectionHeading label="Trusted by" />
        <div className="flex flex-wrap justify-center gap-4">
          {companies.map((c, i) => (
            <div
              key={i}
              className="flex items-center gap-2 rounded-xl border border-border bg-white px-5 py-3 shadow-sm transition hover:shadow-md dark:border-border dark:bg-zinc-900"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-zinc-100 to-zinc-200 text-xs font-bold text-muted-foreground dark:from-zinc-800 dark:to-zinc-700 dark:text-muted-foreground/70">
                {c.charAt(0)}
              </div>
              <span className="text-sm font-medium text-muted-foreground">{c}</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionHeading label="By the numbers" />
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {[
            { icon: "👥", value: "10,000+", label: "Customers" },
            { icon: "⭐", value: "4.9", label: "Avg Rating" },
            { icon: "✅", value: "99%", label: "Satisfaction" },
            { icon: "🌍", value: "50+", label: "Countries" },
          ].map((s, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-2 rounded-xl border border-border bg-white p-6 text-center shadow-sm dark:border-border dark:bg-zinc-900"
            >
              <span className="text-3xl">{s.icon}</span>
              <span className="text-2xl font-bold tracking-tight">{s.value}</span>
              <span className="text-sm text-muted-foreground dark:text-muted-foreground/70">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionHeading label="Filter by category" />
        <div className="mb-6 flex justify-center gap-2">
          {["All", ...categories].map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition ${
                filter === c
                  ? "bg-blue-500 text-white shadow"
                  : "bg-muted text-muted-foreground hover:bg-muted dark:text-muted-foreground/70 dark:hover:bg-muted"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((t, i) => (
            <Card key={i} t={t} />
          ))}
        </div>
      </section>
    </div>
  )
}
