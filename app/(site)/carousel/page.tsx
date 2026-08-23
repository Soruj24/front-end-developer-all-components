"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { Carousel } from "@/components/ui";

const CAROUSEL_SOURCE = `"use client";

import { useState, useEffect, useCallback, ReactNode } from "react";

interface Slide {
  content: ReactNode;
  alt?: string;
}

export interface CarouselProps {
  slides: Slide[];
  autoPlay?: boolean;
  interval?: number;
  showArrows?: boolean;
  showDots?: boolean;
  pauseOnHover?: boolean;
  variant?: "slide" | "fade";
  onSlideChange?: (index: number) => void;
}

const Carousel = ({
  slides,
  autoPlay = false,
  interval = 3000,
  showArrows = true,
  showDots = true,
  pauseOnHover = true,
  variant = "slide",
  onSlideChange,
}: CarouselProps) => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      const idx = (index + slides.length) % slides.length;
      setCurrent(idx);
      onSlideChange?.(idx);
    },
    [slides.length, onSlideChange]
  );

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    if (!autoPlay || paused || slides.length <= 1) return;
    const id = setInterval(next, interval);
    return () => clearInterval(id);
  }, [autoPlay, paused, next, interval, slides.length]);

  const slideClasses =
    variant === "fade"
      ? "absolute inset-0 transition-opacity duration-500 ease-in-out"
      : "w-full shrink-0 transition-transform duration-500 ease-in-out";

  return (
    <div
      className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
      onMouseEnter={() => pauseOnHover && setPaused(true)}
      onMouseLeave={() => pauseOnHover && setPaused(false)}
    >
      <div
        className={variant === "slide" ? "flex" : "relative aspect-video overflow-hidden"}
        style={variant === "slide" ? { transform: \`translateX(-\${current * 100}%)\` } : undefined}
      >
        {slides.map((slide, i) => (
          <div key={i} className={slideClasses} style={variant === "fade" ? { opacity: i === current ? 1 : 0 } : undefined}>
            {slide.content}
            {slide.alt && <span className="sr-only">{slide.alt}</span>}
          </div>
        ))}
      </div>
      {showArrows && slides.length > 1 && (
        <>
          <button onClick={prev} aria-label="Previous slide" className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 bg-white/80 text-zinc-700 shadow-sm backdrop-blur-sm transition-all duration-200 hover:bg-white hover:shadow-md active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 dark:border-zinc-700 dark:bg-zinc-900/80 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:focus-visible:ring-zinc-300">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button onClick={next} aria-label="Next slide" className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 bg-white/80 text-zinc-700 shadow-sm backdrop-blur-sm transition-all duration-200 hover:bg-white hover:shadow-md active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 dark:border-zinc-700 dark:bg-zinc-900/80 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:focus-visible:ring-zinc-300">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}
      {showDots && slides.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white/80 px-2.5 py-1.5 shadow-sm backdrop-blur-sm dark:border-zinc-700 dark:bg-zinc-900/80">
          {slides.map((_, i) => (
            <button key={i} onClick={() => goTo(i)} aria-label={\`Go to slide \${i + 1}\`} aria-current={i === current ? "true" : undefined} className={\`h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 dark:focus-visible:ring-zinc-300 \${i === current ? "w-6 bg-zinc-900 dark:bg-zinc-100" : "w-2 bg-zinc-300 hover:bg-zinc-400 dark:bg-zinc-600 dark:hover:bg-zinc-500"}\`} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;`;

const SLIDES = [
  { content: <div className="flex h-64 items-center justify-center bg-gradient-to-br from-blue-500 to-violet-600"><span className="text-2xl font-bold text-white">Slide 1</span></div>, alt: "Slide 1" },
  { content: <div className="flex h-64 items-center justify-center bg-gradient-to-br from-emerald-500 to-teal-600"><span className="text-2xl font-bold text-white">Slide 2</span></div>, alt: "Slide 2" },
  { content: <div className="flex h-64 items-center justify-center bg-gradient-to-br from-amber-500 to-orange-600"><span className="text-2xl font-bold text-white">Slide 3</span></div>, alt: "Slide 3" },
];

const BASIC_CODE = `<Carousel slides={slides} />`;

const FADE_CODE = `<Carousel slides={slides} variant="fade" autoPlay />`;

const NO_DOTS_CODE = `<Carousel slides={slides} showDots={false} />`;

const NO_ARROWS_CODE = `<Carousel slides={slides} showArrows={false} />`;

export default function CarouselPage() {
  return (
    <ComponentDocPage
      name="Carousel"
      category="Data Display"
      description="Image and card sliders with slide/fade transitions, arrows, dots, and auto-play."
    >
      <PreviewPanel filename="carousel-preview">
        <div className="w-full">
          <Carousel slides={SLIDES} />
        </div>
      </PreviewPanel>

      <SourceCodeViewer source={CAROUSEL_SOURCE} filename="Carousel.tsx" defaultExpanded />

      <div className="flex flex-col gap-6">
        <ExampleBlock
          title="Basic Carousel"
          description="Default slide transition with arrows and dots."
          code={BASIC_CODE}
        >
          <div className="w-full">
            <Carousel slides={SLIDES} />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Fade Transition"
          description="Cross-fade between slides with auto-play enabled."
          code={FADE_CODE}
        >
          <div className="w-full">
            <Carousel slides={SLIDES} variant="fade" autoPlay />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="No Dots"
          description="Hide dot indicators for a cleaner look."
          code={NO_DOTS_CODE}
        >
          <div className="w-full">
            <Carousel slides={SLIDES} showDots={false} />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="No Arrows"
          description="Hide arrow navigation buttons."
          code={NO_ARROWS_CODE}
        >
          <div className="w-full">
            <Carousel slides={SLIDES} showArrows={false} />
          </div>
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
