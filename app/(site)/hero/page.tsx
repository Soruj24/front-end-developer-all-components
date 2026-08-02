"use client"

import Link from "next/link"

export default function HeroPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Hero Sections</h1>
        <p className="mt-1 text-muted-foreground">30+ hero patterns — centered, split, stats, animated, and industry-specific.</p>
      </div>

      <section>
        <h2 className="mb-4 text-lg font-semibold">1. Centered Hero</h2>
        <div className="flex min-h-[50vh] flex-col items-center justify-center gap-6 rounded-xl border border-border bg-gradient-to-b from-zinc-50 to-white p-8 text-center dark:border-border dark:from-zinc-900 dark:to-black">
          <span className="rounded-full bg-blue-100 px-4 py-1.5 text-sm font-medium text-blue-700 dark:bg-blue-900 dark:text-blue-200">Now in public beta</span>
          <h2 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">Build modern web apps <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">faster.</span></h2>
          <p className="max-w-xl text-muted-foreground">A powerful platform that gives you everything you need to build, deploy, and scale your web applications.</p>
          <div className="flex gap-4">
            <Link href="/dashboard" className="rounded-lg bg-zinc-900 px-6 py-3 font-medium text-white hover:bg-muted dark:bg-foreground dark:text-background dark:hover:bg-muted">Get Started</Link>
            <Link href="/pricing" className="rounded-lg border border-border px-6 py-3 font-medium text-muted-foreground hover:bg-muted dark:border-border dark:text-muted-foreground dark:hover:bg-muted">Learn More</Link>
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold">2. Split Hero (Left Content + Right Visual)</h2>
        <div className="flex min-h-[50vh] flex-col overflow-hidden rounded-xl border border-border lg:flex-row">
          <div className="flex flex-1 flex-col justify-center gap-6 p-8 lg:p-12">
            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700 dark:bg-green-900 dark:text-green-200">New release v3.0</span>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Design. Build. <span className="bg-gradient-to-r from-green-500 to-teal-500 bg-clip-text text-transparent">Ship.</span></h2>
            <p className="max-w-md text-muted-foreground">From concept to production in record time. Our integrated workflow keeps your team in sync.</p>
            <div className="flex gap-3">
              <button className="rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-foreground dark:text-background dark:hover:bg-muted">Start Building</button>
              <button className="rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted dark:border-border dark:text-muted-foreground dark:hover:bg-muted">Watch Demo</button>
            </div>
          </div>
          <div className="flex flex-1 items-center justify-center bg-gradient-to-br from-green-200 via-teal-100 to-cyan-200 p-8 dark:from-green-900 dark:via-teal-900 dark:to-cyan-900">
            <div className="flex h-64 w-full max-w-md items-center justify-center rounded-xl bg-white/30 backdrop-blur-sm dark:bg-black/20">
              <span className="text-6xl">🎨</span>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold">3. Stats Hero</h2>
        <div className="flex min-h-[40vh] flex-col items-center justify-center gap-8 rounded-xl border border-border bg-gradient-to-b from-zinc-50 to-white p-8 text-center dark:border-border dark:from-zinc-900 dark:to-black">
          <h2 className="text-3xl font-bold tracking-tight">Trusted by teams worldwide</h2>
          <p className="max-w-lg text-muted-foreground">Join thousands of companies that rely on our platform to build better products.</p>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {[{ v: "50K+", l: "Active users" }, { v: "120+", l: "Countries" }, { v: "2M+", l: "Projects" }, { v: "99.9%", l: "Uptime" }].map((s) => (
              <div key={s.l} className="flex flex-col items-center gap-1"><span className="text-3xl font-bold text-foreground">{s.v}</span><span className="text-xs text-muted-foreground">{s.l}</span></div>
            ))}
          </div>
          <div className="flex gap-3">
            <button className="rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-foreground dark:text-background dark:hover:bg-muted">Get Started Free</button>
            <button className="rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted dark:border-border dark:text-muted-foreground dark:hover:bg-muted">Talk to Sales</button>
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold">4–9. Industry Heroes</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "SaaS Platform", tag: "Enterprise", bg: "from-blue-500 to-indigo-600", text: "text-white" },
            { title: "E-Commerce", tag: "Shop Now", bg: "from-amber-500 to-orange-600", text: "text-white" },
            { title: "Portfolio", tag: "Creative", bg: "from-pink-500 to-rose-600", text: "text-white" },
            { title: "Startup Landing", tag: "Launching Soon", bg: "from-purple-500 to-violet-600", text: "text-white" },
            { title: "Mobile App", tag: "App Store", bg: "from-teal-500 to-emerald-600", text: "text-white" },
            { title: "Education Platform", tag: "Learn", bg: "from-cyan-500 to-sky-600", text: "text-white" },
          ].map((h) => (
            <div key={h.title} className={`flex min-h-48 flex-col items-center justify-center gap-3 rounded-xl bg-gradient-to-br p-6 text-center ${h.bg} ${h.text}`}>
              <span className="rounded-full bg-white/20 px-3 py-0.5 text-xs font-medium">{h.tag}</span>
              <h3 className="text-2xl font-bold">{h.title}</h3>
              <p className="text-sm text-white/80">Build something amazing today.</p>
              <button className="mt-2 rounded-lg bg-white/20 px-4 py-1.5 text-sm font-medium backdrop-blur-sm hover:bg-white/30">Get Started</button>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold">10–15. Layout Variations</h2>
        <div className="grid gap-6">
          {[
            { title: "Left-Aligned", align: "items-start text-left", sub: "All content aligned to the left for a classic marketing look." },
            { title: "Center-Aligned", align: "items-center text-center", sub: "Content centered for maximum visual impact and focus." },
            { title: "Right-Aligned", align: "items-end text-right", sub: "Right-aligned hero for asymmetrical, modern layouts." },
          ].map((h) => (
            <div key={h.title} className={`flex min-h-36 flex-col justify-center gap-2 rounded-xl border border-border bg-muted/40 p-6 dark:border-border dark:bg-zinc-900/50 ${h.align}`}>
              <span className="rounded-full bg-indigo-100 px-3 py-0.5 text-xs font-medium text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400">{h.title}</span>
              <h3 className="text-2xl font-bold">Build Better Products</h3>
              <p className="max-w-lg text-sm text-muted-foreground">{h.sub}</p>
              <div className="mt-2 flex gap-3">
                <button className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white dark:bg-foreground dark:text-background">Primary</button>
                <button className="rounded-lg border border-border px-4 py-2 text-sm font-medium dark:border-border">Secondary</button>
              </div>
            </div>
          ))}
          {[
            { title: "Full-Width", bg: "bg-zinc-900 dark:bg-muted", text: "text-white dark:text-black" },
            { title: "Narrow Container", bg: "bg-background", text: "text-black dark:text-white", narrow: true },
            { title: "With Side Image", bg: "bg-muted/40 dark:bg-zinc-900/50", text: "" },
          ].map((h) => (
            <div key={h.title} className={`flex min-h-36 items-center justify-center rounded-xl border border-border p-6 dark:border-border ${h.bg} ${h.text || ""} ${h.narrow ? "max-w-3xl mx-auto w-full" : "w-full"}`}>
              <div className="flex flex-col items-center gap-2 text-center">
                <h3 className="text-xl font-bold">{h.title}</h3>
                <p className="text-sm text-muted-foreground">A {h.title.toLowerCase()} hero section.</p>
                <button className="rounded-lg bg-indigo-600 px-4 py-1.5 text-sm font-medium text-white">Action</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold">16–22. Visual Effects</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Gradient Background", bg: "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500", text: "text-white" },
            { title: "With Pattern Overlay", bg: "bg-zinc-900", text: "text-white", pattern: true },
            { title: "Blurred Background", bg: "bg-zinc-900", text: "text-white", blur: true },
            { title: "Dark Mode Hero", bg: "bg-black", text: "text-white" },
            { title: "Light & Airy", bg: "bg-white", text: "text-black" },
            { title: "With Background Image", bg: "bg-cover", text: "text-white", img: true },
            { title: "Minimal White", bg: "bg-white border border-border", text: "text-black" },
          ].map((h) => (
            <div key={h.title} className={`flex min-h-44 flex-col items-center justify-center gap-3 rounded-xl p-6 text-center ${h.bg} ${h.text} ${h.img ? "bg-[url('/api/placeholder/800/400')]" : ""}`}>
              {h.pattern && <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "20px 20px" }} />}
              {h.blur && <div className="absolute inset-0 backdrop-blur-sm" />}
              <div className="relative z-10">
                <h3 className="text-2xl font-bold">{h.title}</h3>
                <p className="mt-1 text-sm opacity-80">A beautiful hero section for your landing page.</p>
                <button className="mt-3 rounded-lg bg-white/20 px-4 py-1.5 text-sm font-medium backdrop-blur-sm hover:bg-white/30">Learn More</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold">23–28. Content-Focused</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "With Search Bar", sub: "Search across documentation", hasSearch: true },
            { title: "With Email Capture", sub: "Subscribe to newsletter", hasEmail: true },
            { title: "With Video Button", sub: "Watch product demo", hasVideo: true },
            { title: "With Avatar Group", sub: "Join 12K+ developers", hasAvatars: true },
            { title: "With Rating", sub: "4.9 out of 5 stars", hasRating: true },
            { title: "With Badges", sub: "Featured in multiple publications", hasBadges: true },
          ].map((h) => (
            <div key={h.title} className="flex min-h-44 flex-col items-center justify-center gap-3 rounded-xl border border-border bg-white p-6 text-center dark:border-border dark:bg-zinc-900">
              <h3 className="text-xl font-bold">{h.title}</h3>
              <p className="text-sm text-muted-foreground">{h.sub}</p>
              {h.hasSearch && (
                <div className="flex w-full max-w-xs gap-2">
                  <input className="flex-1 rounded-lg border border-border px-3 py-2 text-sm dark:border-border dark:bg-muted" placeholder="Search..." />
                  <button className="rounded-lg bg-zinc-900 px-3 py-2 text-sm text-white dark:bg-foreground dark:text-background">Go</button>
                </div>
              )}
              {h.hasEmail && (
                <div className="flex w-full max-w-xs gap-2">
                  <input className="flex-1 rounded-lg border border-border px-3 py-2 text-sm dark:border-border dark:bg-muted" placeholder="your@email.com" />
                  <button className="rounded-lg bg-indigo-600 px-3 py-2 text-sm text-white">Subscribe</button>
                </div>
              )}
              {h.hasVideo && (
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 cursor-pointer">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                </div>
              )}
              {h.hasAvatars && (
                <div className="flex -space-x-2">
                  {["A", "B", "C", "D"].map((a, i) => (
                    <div key={i} className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-muted text-xs font-medium dark:border-zinc-900 dark:bg-muted">{a}</div>
                  ))}
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-indigo-100 text-xs font-medium text-indigo-600 dark:border-zinc-900 dark:bg-indigo-900/30">+</div>
                </div>
              )}
              {h.hasRating && (
                <div className="flex items-center gap-1 text-amber-400">
                  {[1, 2, 3, 4, 5].map((r) => (
                    <svg key={r} className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                  ))}
                </div>
              )}
              {h.hasBadges && (
                <div className="flex flex-wrap gap-2">
                  {["TechCrunch", "Forbes", "Wired"].map((b) => (
                    <span key={b} className="rounded-full bg-muted px-2.5 py-0.5 text-[10px] font-medium text-muted-foreground dark:bg-muted dark:text-muted-foreground/70">{b}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold">29–30. CTA Focused</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="flex min-h-40 flex-col items-center justify-center gap-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-center text-white">
            <h3 className="text-2xl font-bold">Ready to get started?</h3>
            <p className="text-sm text-white/80">Join thousands of happy customers today.</p>
            <div className="flex gap-3">
              <button className="rounded-lg bg-white px-5 py-2 text-sm font-medium text-indigo-600 hover:bg-white/90">Sign Up Free</button>
              <button className="rounded-lg border border-white/30 px-5 py-2 text-sm font-medium text-white hover:bg-white/10">Contact Sales</button>
            </div>
          </div>
          <div className="flex min-h-40 flex-col items-center justify-center gap-4 rounded-xl border border-border bg-white p-8 text-center dark:border-border dark:bg-zinc-900">
            <h3 className="text-2xl font-bold text-foreground">Start your free trial</h3>
            <p className="text-sm text-muted-foreground">No credit card required. Cancel anytime.</p>
            <div className="flex gap-3">
              <button className="rounded-lg bg-zinc-900 px-5 py-2 text-sm font-medium text-white dark:bg-foreground dark:text-background">Get Started</button>
              <button className="rounded-lg border border-border px-5 py-2 text-sm font-medium dark:border-border">Learn More</button>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold">31–33. Mini Heroes</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { title: "Page Hero", sub: "Standard page header" },
            { title: "Blog Hero", sub: "With category and date" },
            { title: "Profile Hero", sub: "User profile header" },
          ].map((m) => (
            <div key={m.title} className="rounded-xl border border-border bg-gradient-to-r from-zinc-50 to-white p-5 dark:border-border dark:from-zinc-900 dark:to-black">
              <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-[10px] font-medium text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400">{m.title}</span>
              <h4 className="mt-2 text-lg font-bold">Section Title</h4>
              <p className="text-xs text-muted-foreground">{m.sub}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold">Trusted By Bar</h2>
        <div className="flex flex-col items-center gap-4 rounded-xl border border-border p-6 dark:border-border">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground/70">Trusted by industry leaders</p>
          <div className="flex flex-wrap items-center justify-center gap-8 text-muted-foreground">
            {["AcmeCorp", "Globex", "Initech", "Umbrella", "Stark Ind.", "Wayne Ent.", "Cyberdyne", "Oscorp"].map((c) => (
              <span key={c} className="text-base font-bold tracking-tight opacity-50">{c}</span>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
