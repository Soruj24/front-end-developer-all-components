"use client";

import {
  CenteredHero, SplitHero, StatsHero,
  AnimatedGradientHero, ParticleHero, VideoBackgroundHero,
  GlassmorphismHero, NeonGlowHero, TypewriterHero,
  BentoGridHero, ParallaxHero, Card3DHero,
  IndustryCard, ContentHeroCard,
} from "@/features/hero";

const industries = [
  { title: "SaaS Platform", tag: "Enterprise", bg: "from-blue-500 to-indigo-600" },
  { title: "E-Commerce", tag: "Shop Now", bg: "from-amber-500 to-orange-600" },
  { title: "Portfolio", tag: "Creative", bg: "from-pink-500 to-rose-600" },
  { title: "Startup", tag: "Launching Soon", bg: "from-purple-500 to-violet-600" },
  { title: "Mobile App", tag: "App Store", bg: "from-teal-500 to-emerald-600" },
  { title: "Education", tag: "Learn", bg: "from-cyan-500 to-sky-600" },
];

const layouts = [
  { title: "Left-Aligned", align: "items-start text-left" },
  { title: "Center-Aligned", align: "items-center text-center" },
  { title: "Right-Aligned", align: "items-end text-right" },
];

const visuals = [
  { title: "Gradient", bg: "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500", text: "text-white" },
  { title: "Pattern", bg: "bg-zinc-900", text: "text-white", pattern: true },
  { title: "Dark Mode", bg: "bg-black", text: "text-white" },
  { title: "Light", bg: "bg-white", text: "text-black" },
];

const contentHeroes = [
  { title: "Search Bar", hasSearch: true },
  { title: "Email Capture", hasEmail: true },
  { title: "Video Button", hasVideo: true },
  { title: "Avatar Group", hasAvatars: true },
  { title: "Rating", hasRating: true },
  { title: "Badges", hasBadges: true },
];

export default function HeroPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Hero Sections</h1>
        <p className="mt-1 text-muted-foreground">40+ hero patterns — centered, split, animated, 3D, glassmorphism, and more.</p>
      </div>

      <section><h2 className="mb-4 text-lg font-semibold">1. Centered</h2><CenteredHero /></section>
      <section><h2 className="mb-4 text-lg font-semibold">2. Split</h2><SplitHero /></section>
      <section><h2 className="mb-4 text-lg font-semibold">3. Stats</h2><StatsHero /></section>

      <section>
        <h2 className="mb-4 text-lg font-semibold">4-9. Industry</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((h) => <IndustryCard key={h.title} {...h} />)}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold">10-12. Layout</h2>
        <div className="grid gap-6">
          {layouts.map((h) => (
            <div key={h.title} className={`flex min-h-36 flex-col justify-center gap-2 rounded-xl border border-border bg-muted/40 p-6 dark:bg-zinc-900/50 ${h.align}`}>
              <span className="rounded-full bg-indigo-100 px-3 py-0.5 text-xs font-medium text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400">{h.title}</span>
              <h3 className="text-2xl font-bold">Build Better Products</h3>
              <button className="mt-2 w-fit rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white dark:bg-foreground dark:text-background">Primary</button>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold">13-16. Visual Effects</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {visuals.map((h) => (
            <div key={h.title} className={`relative flex min-h-44 flex-col items-center justify-center gap-3 rounded-xl p-6 text-center ${h.bg} ${h.text}`}>
              {h.pattern && <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "20px 20px" }} />}
              <div className="relative z-10"><h3 className="text-2xl font-bold">{h.title}</h3></div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold">17-22. Animated & Interactive</h2>
        <div className="grid gap-6">
          <AnimatedGradientHero /><ParticleHero /><VideoBackgroundHero />
          <GlassmorphismHero /><NeonGlowHero /><TypewriterHero />
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold">23-25. Advanced Layouts</h2>
        <div className="grid gap-6"><BentoGridHero /><ParallaxHero /><Card3DHero /></div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold">26-31. Content-Focused</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {contentHeroes.map((h) => <ContentHeroCard key={h.title} {...h} />)}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold">32-33. CTA</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="flex min-h-40 flex-col items-center justify-center gap-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-center text-white">
            <h3 className="text-2xl font-bold">Ready to get started?</h3>
            <button className="rounded-lg bg-white px-5 py-2 text-sm font-medium text-indigo-600">Sign Up Free</button>
          </div>
          <div className="flex min-h-40 flex-col items-center justify-center gap-4 rounded-xl border border-border bg-white p-8 text-center dark:bg-zinc-900">
            <h3 className="text-2xl font-bold">Start your free trial</h3>
            <button className="rounded-lg bg-zinc-900 px-5 py-2 text-sm font-medium text-white dark:bg-foreground dark:text-background">Get Started</button>
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold">34-36. Mini</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {[{ t: "Page Hero", s: "Standard page header" }, { t: "Blog Hero", s: "With category and date" }, { t: "Profile Hero", s: "User profile header" }].map((m) => (
            <div key={m.t} className="rounded-xl border border-border bg-gradient-to-r from-zinc-50 to-white p-5 dark:from-zinc-900 dark:to-black">
              <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-[10px] font-medium text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400">{m.t}</span>
              <h4 className="mt-2 text-lg font-bold">Section Title</h4>
              <p className="text-xs text-muted-foreground">{m.s}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold">Trusted By Bar</h2>
        <div className="flex flex-col items-center gap-4 rounded-xl border border-border p-6">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground/70">Trusted by industry leaders</p>
          <div className="flex flex-wrap items-center justify-center gap-8 text-muted-foreground">
            {["AcmeCorp", "Globex", "Initech", "Umbrella", "Stark Ind.", "Wayne Ent."].map((c) => (
              <span key={c} className="text-base font-bold tracking-tight opacity-50">{c}</span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
