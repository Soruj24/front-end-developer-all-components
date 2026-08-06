import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const testimonialsGrid: RegistryEntry = entry({
  id: "testimonials-grid",
  title: "Grid Layout",
  description: "Responsive grid of testimonial cards with ratings, badges, and avatars.",
  source: `export default function GridTestimonials() {
  const testimonials = [
    { quote: "This platform completely transformed how our team builds and ships products.", name: "Sarah Chen", title: "CTO", company: "TechStart", category: "Startups" },
    { quote: "We migrated our entire infrastructure in two days.", name: "Marcus Johnson", title: "Engineering Lead", company: "DataFlow", category: "Enterprise" },
    { quote: "The analytics and monitoring tools gave us insights we never had before.", name: "Emily Rodriguez", title: "VP of Product", company: "CloudScale", category: "Enterprise" },
    { quote: "Best decision we made this year.", name: "James Park", title: "Founder", company: "Launchpad", category: "Startups" },
    { quote: "Enterprise-grade features with startup-friendly pricing.", name: "Aisha Patel", title: "Director of Engineering", company: "FinCore", category: "Enterprise" },
    { quote: "The collaboration features are outstanding.", name: "Tom Andersen", title: "DevOps Manager", company: "Streamline", category: "Agencies" },
  ];
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {testimonials.map((t, i) => (
        <div key={i} className="flex flex-col gap-4 rounded-xl border border-border bg-white p-6 shadow-sm">
          <p className="flex-1 text-sm leading-relaxed text-muted-foreground">"{t.quote}"</p>
          <p className="text-sm font-medium">{t.name}</p>
          <p className="text-xs text-muted-foreground">{t.title}, {t.company}</p>
        </div>
      ))}
    </div>
  );
}`,
});

export const testimonialsCarousel: RegistryEntry = entry({
  id: "testimonials-carousel",
  title: "Carousel",
  description: "Rotating carousel with navigation controls and dot indicators.",
  source: `"use client";
import { useState, useEffect, useCallback } from "react";

export default function CarouselTestimonials() {
  const [idx, setIdx] = useState(0);
  const testimonials = [
    { quote: "This platform completely transformed how our team builds.", name: "Sarah Chen", title: "CTO", company: "TechStart", category: "Startups" },
    { quote: "We migrated our entire infrastructure in two days.", name: "Marcus Johnson", title: "Engineering Lead", company: "DataFlow", category: "Enterprise" },
  ];

  const goNext = useCallback(() => setIdx((p) => (p + 1) % testimonials.length), []);
  useEffect(() => { const timer = setInterval(goNext, 5000); return () => clearInterval(timer); }, [goNext]);

  const t = testimonials[idx];
  return (
    <div className="relative mx-auto max-w-2xl rounded-xl border border-border bg-white p-8">
      <p className="text-xl leading-relaxed text-muted-foreground">"{t.quote}"</p>
      <p className="mt-4 text-lg font-semibold">{t.name}</p>
      <p className="text-sm text-muted-foreground">{t.title}, {t.company}</p>
      <div className="mt-6 flex justify-center gap-2">
        {testimonials.map((_, i) => (
          <button key={i} onClick={() => setIdx(i)} className={\`h-2.5 rounded-full \${i === idx ? "w-8 bg-blue-500" : "w-2.5 bg-muted"}\`} />
        ))}
      </div>
    </div>
  );
}`,
});

export const testimonialsFeaturedSidebar: RegistryEntry = entry({
  id: "testimonials-featured-sidebar",
  title: "Featured + Sidebar",
  description: "Featured large card with smaller sidebar testimonials.",
  source: `export default function FeaturedSidebarTestimonials() {
  const featured = { quote: "This platform completely transformed how our team builds.", name: "Sarah Chen", title: "CTO", company: "TechStart", category: "Startups" };
  const sidebar = [
    { quote: "We migrated our entire infrastructure in two days.", name: "Marcus Johnson", title: "Engineering Lead", company: "DataFlow", category: "Enterprise" },
    { quote: "Best decision we made this year.", name: "James Park", title: "Founder", company: "Launchpad", category: "Startups" },
    { quote: "Enterprise-grade features with startup-friendly pricing.", name: "Aisha Patel", title: "Director of Engineering", company: "FinCore", category: "Enterprise" },
  ];
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2 rounded-xl border border-border bg-white p-8">
        <p className="text-lg leading-relaxed text-muted-foreground">"{featured.quote}"</p>
        <p className="mt-4 font-medium">{featured.name}</p>
      </div>
      <div className="flex flex-col gap-6">
        {sidebar.map((t, i) => (
          <div key={i} className="rounded-xl border border-border bg-white p-6">
            <p className="text-sm leading-relaxed text-muted-foreground">"{t.quote}"</p>
            <p className="mt-3 text-sm font-medium">{t.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}`,
});

export const testimonialsMasonry: RegistryEntry = entry({
  id: "testimonials-masonry",
  title: "Masonry",
  description: "Masonry-style columns with break-inside-avoid cards.",
  source: `export default function MasonryTestimonials() {
  const testimonials = [
    { quote: "This platform completely transformed how our team builds.", name: "Sarah Chen", company: "TechStart" },
    { quote: "We migrated our entire infrastructure in two days.", name: "Marcus Johnson", company: "DataFlow" },
    { quote: "Best decision we made this year.", name: "James Park", company: "Launchpad" },
  ];
  return (
    <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
      {testimonials.map((t, i) => (
        <div key={i} className="mb-6 break-inside-avoid rounded-xl border border-border bg-white p-6">
          <p className="text-sm leading-relaxed text-muted-foreground">"{t.quote}"</p>
          <p className="mt-3 text-sm font-medium">{t.name}</p>
          <p className="text-xs text-muted-foreground">{t.company}</p>
        </div>
      ))}
    </div>
  );
}`,
});

export const testimonialsTrustedBy: RegistryEntry = entry({
  id: "testimonials-trusted-by",
  title: "Trusted By Logos",
  description: "Logo strip showing trusted companies.",
  source: `export default function TrustedByLogos() {
  const companies = ["TechStart", "DataFlow", "CloudScale", "Launchpad", "FinCore", "Streamline"];
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {companies.map((c, i) => (
        <div key={i} className="flex items-center gap-2 rounded-xl border border-border bg-white px-5 py-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-xs font-bold text-muted-foreground">
            {c.charAt(0)}
          </div>
          <span className="text-sm font-medium text-muted-foreground">{c}</span>
        </div>
      ))}
    </div>
  );
}`,
});

export const testimonialsStats: RegistryEntry = entry({
  id: "testimonials-stats",
  title: "Stats",
  description: "Key statistics and numbers with icons.",
  source: `export default function StatsTestimonials() {
  const stats = [
    { icon: "👥", value: "10,000+", label: "Customers" },
    { icon: "⭐", value: "4.9", label: "Avg Rating" },
    { icon: "✅", value: "99%", label: "Satisfaction" },
    { icon: "🌍", value: "50+", label: "Countries" },
  ];
  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
      {stats.map((s, i) => (
        <div key={i} className="flex flex-col items-center gap-2 rounded-xl border border-border bg-white p-6 text-center">
          <span className="text-3xl">{s.icon}</span>
          <span className="text-2xl font-bold tracking-tight">{s.value}</span>
          <span className="text-sm text-muted-foreground">{s.label}</span>
        </div>
      ))}
    </div>
  );
}`,
});

export const testimonialsFilter: RegistryEntry = entry({
  id: "testimonials-filter",
  title: "Filter",
  description: "Category filter buttons for testimonials.",
  source: `"use client";
import { useState } from "react";

export default function FilterTestimonials() {
  const [filter, setFilter] = useState("All");
  const testimonials = [
    { quote: "This platform transformed our workflow.", name: "Sarah Chen", company: "TechStart", category: "Startups" },
    { quote: "Enterprise-grade reliability.", name: "Marcus Johnson", company: "DataFlow", category: "Enterprise" },
    { quote: "Outstanding collaboration features.", name: "Tom Andersen", company: "Streamline", category: "Agencies" },
  ];
  const filtered = filter === "All" ? testimonials : testimonials.filter((t) => t.category === filter);
  return (
    <div>
      <div className="mb-6 flex justify-center gap-2">
        {["All", "Startups", "Enterprise", "Agencies"].map((c) => (
          <button key={c} onClick={() => setFilter(c)}
            className={\`rounded-full px-5 py-2 text-sm font-medium \${filter === c ? "bg-blue-500 text-white" : "bg-muted text-muted-foreground"}\`}>
            {c}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((t, i) => (
          <div key={i} className="rounded-xl border border-border bg-white p-6">
            <p className="text-sm leading-relaxed text-muted-foreground">"{t.quote}"</p>
            <p className="mt-3 text-sm font-medium">{t.name}</p>
            <p className="text-xs text-muted-foreground">{t.company}</p>
          </div>
        ))}
      </div>
    </div>
  );
}`,
});

export const testimonials: RegistryEntry[] = [
  testimonialsGrid,
  testimonialsCarousel,
  testimonialsFeaturedSidebar,
  testimonialsMasonry,
  testimonialsTrustedBy,
  testimonialsStats,
  testimonialsFilter,
];
