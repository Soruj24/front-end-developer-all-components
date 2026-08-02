"use client";

import { useCallback, useEffect, useState } from "react";
import { ComponentPreview } from "@/components/preview";

const COLORS = ["bg-red-400", "bg-blue-400", "bg-green-400", "bg-yellow-400", "bg-purple-400", "bg-pink-400"];
const LABELS = ["Red", "Blue", "Green", "Yellow", "Purple", "Pink"];
const TRANSITIONS = ["slide", "fade", "scale", "slide-3d"] as const;

function Carousel({
  slides = LABELS, colors = COLORS, autoPlay = false, interval = 3000, transition = "slide",
  showDots = true, showArrows = true, showCounter = true, showThumbs = false, loop = true,
  height = "h-64",
}: {
  slides?: string[]; colors?: string[]; autoPlay?: boolean; interval?: number;
  transition?: (typeof TRANSITIONS)[number]; showDots?: boolean; showArrows?: boolean;
  showCounter?: boolean; showThumbs?: boolean; loop?: boolean; height?: string;
}) {
  const [idx, setIdx] = useState(0);
  const [hovered, setHovered] = useState(false);
  const len = slides.length;

  const prev = useCallback(() => setIdx((i) => (i === 0 ? (loop ? len - 1 : i) : i - 1)), [len, loop]);
  const next = useCallback(() => setIdx((i) => (i === len - 1 ? (loop ? 0 : i) : i + 1)), [len, loop]);

  useEffect(() => {
    if (!autoPlay || hovered) return;
    const t = setInterval(next, interval);
    return () => clearInterval(t);
  }, [autoPlay, hovered, interval, next]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [prev, next]);

  const transClass =
    transition === "slide" || transition === "slide-3d"
      ? "transition-transform duration-500"
      : transition === "fade"
        ? "transition-opacity duration-500"
        : "transition-all duration-500";

  return (
    <div
      className={`relative mx-auto w-full max-w-2xl overflow-hidden rounded-xl ${height}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      tabIndex={0} role="region" aria-label="Carousel"
    >
      <div className="relative flex h-full w-full items-center justify-center">
        {transition === "slide" && (
          <div className="flex h-full w-full" style={{ transform: `translateX(-${idx * 100}%)` }}>
            {slides.map((s, i) => (
              <div key={i} className={`flex h-full w-full shrink-0 items-center justify-center text-2xl font-bold text-white ${colors[i % colors.length]}`}>
                {s}
              </div>
            ))}
          </div>
        )}
        {transition === "fade" && slides.map((s, i) => (
          <div key={i} className={`absolute inset-0 flex items-center justify-center text-2xl font-bold text-white ${colors[i % colors.length]} ${transClass} ${i === idx ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
            {s}
          </div>
        ))}
        {transition === "scale" && slides.map((s, i) => (
          <div key={i} className={`absolute inset-0 flex items-center justify-center text-2xl font-bold text-white ${colors[i % colors.length]} ${transClass} ${i === idx ? "scale-100 opacity-100" : "scale-75 opacity-0 pointer-events-none"}`}>
            {s}
          </div>
        ))}
        {transition === "slide-3d" && (
          <div className="flex h-full w-full" style={{ transform: `translateX(-${idx * 100}%)` }}>
            {slides.map((s, i) => (
              <div key={i} className={`flex h-full w-full shrink-0 items-center justify-center text-2xl font-bold text-white ${colors[i % colors.length]}`} style={{ perspective: "1000px", transform: "rotateY(0deg)" }}>
                {s}
              </div>
            ))}
          </div>
        )}
      </div>

      {showArrows && (
        <>
          <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white hover:bg-black/60" aria-label="Previous">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white hover:bg-black/60" aria-label="Next">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </>
      )}

      {showDots && (
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
          {slides.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)} className={`h-2.5 w-2.5 rounded-full transition-colors ${i === idx ? "bg-white" : "bg-white/40"}`} aria-label={`Go to slide ${i + 1}`} />
          ))}
        </div>
      )}

      {showCounter && (
        <div className="absolute left-1/2 top-3 -translate-x-1/2 rounded bg-black/40 px-2 py-0.5 text-xs text-white">
          {idx + 1} / {len}
        </div>
      )}

      {showThumbs && (
        <div className="absolute bottom-12 left-1/2 flex -translate-x-1/2 gap-1.5">
          {slides.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)} className={`h-6 w-8 rounded ${colors[i % colors.length]} ${i === idx ? "ring-2 ring-white" : "opacity-60"}`} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function CarouselPage() {
  const [demoIdx, setDemoIdx] = useState(0);
  const [autoState, setAutoState] = useState(false);
  const [external, setExternal] = useState(0);

  const transitionVariants = [
    { label: "Slide Transition", desc: "Standard horizontal slide", trans: "slide" as const },
    { label: "Fade Transition", desc: "Cross-fade between slides", trans: "fade" as const },
    { label: "Scale Transition", desc: "Zoom in/out effect", trans: "scale" as const },
    { label: "Slide 3D Effect", desc: "Perspective slide", trans: "slide-3d" as const },
  ];

  const autoplays = [
    { label: "Auto-Play", desc: "Automatic rotation every 3s", interval: 3000 },
    { label: "Fast Auto-Play", desc: "1.5s interval", interval: 1500 },
  ];

  const navVariants = [
    { label: "No Arrows", desc: "Dots navigation only", arrows: false },
    { label: "No Dots", desc: "Arrows navigation only", dots: false },
    { label: "Minimal UI", desc: "Counter only, no arrows/dots", arrows: false, dots: false, counter: true },
    { label: "No Loop", desc: "Stops at first/last", loop: false },
  ];

  const thumbnails = [
    { label: "With Thumbnails", desc: "Bottom thumb strip", auto: false },
    { label: "Thumbnails + Auto", desc: "Thumbs with autoplay", auto: true },
  ];

  const sizes = [
    { label: "Short (3 slides)", desc: "Minimal set", slides: ["A", "B", "C"] },
    { label: "Long (8 slides)", desc: "Extended set", slides: ["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight"] },
    { label: "Tall Slides", desc: "Increased height", height: "h-96" },
    { label: "Compact", desc: "Small height", height: "h-40" },
  ];

  const contentGroups = [
    { label: "Nature Gallery", desc: "Mountain, ocean, forest", slides: ["🏔 Mountain", "🌊 Ocean", "🌲 Forest", "🏜 Desert", "🏙 City", "🌅 Sunset"], colors: ["bg-emerald-500", "bg-sky-500", "bg-success", "bg-warning", "bg-indigo-500", "bg-orange-500"] },
    { label: "Product Showcase", desc: "Featured products", slides: ["📱 Phone", "💻 Laptop", "🎧 Headphones", "⌚ Watch", "📷 Camera"], colors: ["bg-zinc-700", "bg-zinc-600", "bg-muted/400", "bg-zinc-700", "bg-zinc-600"] },
    { label: "Team Showcase", desc: "Team member cards", slides: ["👩 Alice - Design", "👨 Bob - Dev", "👩 Carol - PM", "👨 Dave - QA"], colors: ["bg-violet-500", "bg-fuchsia-500", "bg-rose-500", "bg-pink-500"] },
    { label: "Testimonials", desc: "Customer quotes", slides: ['"Great product!" - John', '"Love this!" - Sarah', '"Amazing!" - Mike', '"Highly recommend" - Lisa'], colors: ["bg-teal-500", "bg-cyan-500", "bg-sky-500", "bg-blue-500"] },
  ];

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Carousel</h1>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Image and card sliders with transitions, auto-play, navigation, and
          layout variants. Use the tabs to switch between the live preview,
          source code, CLI, installation, and dependency details for each
          example.
        </p>
      </header>

      <ComponentPreview id="carousel-interactive">
        <div className="flex w-full flex-col gap-4">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setAutoState((v) => !v)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium ${autoState ? "bg-success text-success-foreground" : "border border-border dark:border-border"}`}
            >
              {autoState ? "Auto-Play On" : "Auto-Play Off"}
            </button>
            {TRANSITIONS.map((t) => (
              <button
                key={t}
                onClick={() => setDemoIdx(TRANSITIONS.indexOf(t))}
                className={`rounded-lg border px-3 py-1.5 text-xs font-medium ${TRANSITIONS[demoIdx] === t ? "bg-foreground text-background dark:bg-muted dark:text-zinc-900" : "border-border dark:border-border"}`}
              >
                {t}
              </button>
            ))}
          </div>
          <Carousel slides={LABELS} colors={COLORS} transition={TRANSITIONS[demoIdx]} autoPlay={autoState} />
        </div>
      </ComponentPreview>

      <ComponentPreview id="carousel-transitions">
        <div className="grid w-full gap-6 sm:grid-cols-2">
          {transitionVariants.map((t) => (
            <div key={t.label}>
              <p className="mb-1 text-sm font-medium">{t.label}</p>
              <p className="mb-2 text-xs text-muted-foreground">{t.desc}</p>
              <Carousel slides={LABELS} colors={COLORS} transition={t.trans} />
            </div>
          ))}
        </div>
      </ComponentPreview>

      <ComponentPreview id="carousel-autoplay">
        <div className="grid w-full gap-6 sm:grid-cols-2">
          {autoplays.map((a) => (
            <div key={a.label}>
              <p className="mb-1 text-sm font-medium">{a.label}</p>
              <p className="mb-2 text-xs text-muted-foreground">{a.desc}</p>
              <Carousel slides={LABELS} colors={COLORS} autoPlay interval={a.interval} />
            </div>
          ))}
        </div>
      </ComponentPreview>

      <ComponentPreview id="carousel-navigation">
        <div className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {navVariants.map((v) => (
            <div key={v.label}>
              <p className="mb-1 text-sm font-medium">{v.label}</p>
              <p className="mb-2 text-xs text-muted-foreground">{v.desc}</p>
              <Carousel slides={LABELS} colors={COLORS} showArrows={v.arrows ?? true} showDots={v.dots ?? true} showCounter={v.counter ?? false} loop={v.loop ?? true} />
            </div>
          ))}
        </div>
      </ComponentPreview>

      <ComponentPreview id="carousel-thumbnails">
        <div className="grid w-full gap-6 sm:grid-cols-2">
          {thumbnails.map((t) => (
            <div key={t.label}>
              <p className="mb-1 text-sm font-medium">{t.label}</p>
              <p className="mb-2 text-xs text-muted-foreground">{t.desc}</p>
              <Carousel slides={LABELS} colors={COLORS} showThumbs showCounter={false} autoPlay={t.auto} />
            </div>
          ))}
        </div>
      </ComponentPreview>

      <ComponentPreview id="carousel-sizes">
        <div className="grid w-full gap-6 sm:grid-cols-2">
          {sizes.map((s) => (
            <div key={s.label}>
              <p className="mb-1 text-sm font-medium">{s.label}</p>
              <p className="mb-2 text-xs text-muted-foreground">{s.desc}</p>
              <Carousel slides={s.slides || LABELS} colors={COLORS} height={s.height || "h-64"} showDots={!s.slides || s.slides.length <= 6} />
            </div>
          ))}
        </div>
      </ComponentPreview>

      <ComponentPreview id="carousel-content">
        <div className="grid w-full gap-6 sm:grid-cols-2">
          {contentGroups.map((g) => (
            <div key={g.label}>
              <p className="mb-1 text-sm font-medium">{g.label}</p>
              <p className="mb-2 text-xs text-muted-foreground">{g.desc}</p>
              <Carousel slides={g.slides} colors={g.colors} height="h-56" />
            </div>
          ))}
        </div>
      </ComponentPreview>

      <ComponentPreview id="carousel-styles">
        <div className="grid w-full gap-6 sm:grid-cols-2">
          <div>
            <p className="mb-1 text-sm font-medium">Rounded Corners</p>
            <p className="mb-2 text-xs text-muted-foreground">Extra rounded with shadow</p>
            <Carousel slides={["Rounded", "Corners", "Demo"]} colors={["bg-indigo-400", "bg-violet-400", "bg-purple-400"]} transition="fade" />
          </div>
          <div>
            <p className="mb-1 text-sm font-medium">With Shadow</p>
            <p className="mb-2 text-xs text-muted-foreground">Box shadow effect</p>
            <Carousel slides={["Shadow", "Effect", "Demo"]} colors={["bg-rose-400", "bg-pink-400", "bg-fuchsia-400"]} transition="scale" />
          </div>
          <div>
            <p className="mb-1 text-sm font-medium">Dot Style: Square</p>
            <p className="mb-2 text-xs text-muted-foreground">Square navigation dots</p>
            <Carousel slides={["Square", "Dots", "Demo"]} colors={["bg-cyan-400", "bg-teal-400", "bg-emerald-400"]} transition="slide" />
          </div>
          <div className="relative overflow-hidden rounded-xl">
            <div className="pointer-events-none absolute inset-0 z-10 rounded-xl bg-black/30" />
            <p className="mb-1 text-sm font-medium">Dark Overlay</p>
            <p className="mb-2 text-xs text-muted-foreground">Darker overlay on slides</p>
            <Carousel slides={["Dark", "Overlay", "Demo"]} colors={["bg-warning", "bg-orange-500", "bg-yellow-500"]} transition="slide" height="h-56" />
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="carousel-full-featured">
        <div className="flex w-full justify-center">
          <Carousel slides={LABELS} colors={COLORS} transition="slide" autoPlay interval={2500} showThumbs showArrows showDots showCounter />
        </div>
      </ComponentPreview>

      <ComponentPreview id="carousel-controlled">
        <div className="flex w-full flex-col gap-4">
          <div className="flex items-center gap-2">
            <button onClick={() => setExternal((i) => Math.max(0, i - 1))} className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium dark:border-border">Prev</button>
            <button onClick={() => setExternal((i) => Math.min(5, i + 1))} className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium dark:border-border">Next</button>
            <span className="self-center text-xs text-muted-foreground">External index: {external + 1}/6</span>
          </div>
          <Carousel slides={LABELS} colors={COLORS} showArrows={false} showDots={false} showCounter />
        </div>
      </ComponentPreview>
    </div>
  );
}
