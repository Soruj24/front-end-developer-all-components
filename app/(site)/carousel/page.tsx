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
      ? "absolute inset-0 transition-opacity duration-500"
      : "w-full shrink-0 transition-transform duration-500";

  return (
    <div
      className="relative overflow-hidden rounded-2xl"
      onMouseEnter={() => pauseOnHover && setPaused(true)}
      onMouseLeave={() => pauseOnHover && setPaused(false)}
    >
      <div
        className={variant === "slide" ? "flex" : "relative aspect-video overflow-hidden"}
        style={
          variant === "slide"
            ? { transform: \`translateX(-\${current * 100}%)\` }
            : undefined
        }
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            className={slideClasses}
            style={
              variant === "fade"
                ? { opacity: i === current ? 1 : 0 }
                : undefined
            }
          >
            {slide.content}
            {slide.alt && (
              <span className="sr-only">{slide.alt}</span>
            )}
          </div>
        ))}
      </div>
      {showArrows && slides.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-surface/80 text-foreground shadow transition-colors hover:bg-surface dark:hover:bg-muted"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-surface/80 text-foreground shadow transition-colors hover:bg-surface dark:hover:bg-muted"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </>
      )}
      {showDots && slides.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={\`h-2 rounded-full transition-all \${
                i === current
                  ? "w-6 bg-white"
                  : "w-2 bg-white/50 hover:bg-white/80"
              }\`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;`;

const slides = [{ content: "One", alt: "One" }, { content: "Two", alt: "Two" }, { content: "Three", alt: "Three" }];
const SLIDE_CODE = `<Carousel slides={slides} />`;
const FADE_CODE = `<Carousel slides={slides} variant="fade" autoPlay />`;

export default function CarouselPage() {
  return (
    <ComponentDocPage
      name="Carousel"
      category="Data Display"
      description="Image and card sliders with slide/fade transitions, arrows, dots, and auto-play."
    >
      <PreviewPanel filename="carousel-preview">
        <div className="w-full max-w-sm">
          <Carousel slides={slides} />
        </div>
      </PreviewPanel>

      <SourceCodeViewer source={CAROUSEL_SOURCE} filename="Carousel.tsx" defaultExpanded />

      <div className="flex flex-col gap-6">
        <ExampleBlock
          title="Slide Transition"
          description="Horizontal slide with arrows and dots."
          code={SLIDE_CODE}
        >
          <PreviewPanel>
            <div className="w-full max-w-sm">
              <Carousel slides={slides} />
            </div>
          </PreviewPanel>
        </ExampleBlock>

        <ExampleBlock
          title="Fade Transition"
          description="Cross-fade between slides with auto-play."
          code={FADE_CODE}
        >
          <PreviewPanel>
            <div className="w-full max-w-sm">
              <Carousel slides={slides} variant="fade" autoPlay />
            </div>
          </PreviewPanel>
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
