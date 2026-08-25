"use client";

import { useState, useEffect, useCallback, ReactNode } from "react";
import { cn } from "@/lib/cn";

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
      className="group relative overflow-hidden rounded-xl border border-border/60 bg-card shadow-sm ring-1 ring-black/[0.04] dark:ring-white/[0.08]"
      onMouseEnter={() => pauseOnHover && setPaused(true)}
      onMouseLeave={() => pauseOnHover && setPaused(false)}
    >
      <div
        className={
          variant === "slide"
            ? "flex"
            : "relative aspect-video overflow-hidden"
        }
        style={
          variant === "slide"
            ? { transform: `translateX(-${current * 100}%)` }
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
            aria-label="Previous slide"
            className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 bg-background/80 text-muted-foreground shadow-sm backdrop-blur-sm transition-all duration-200 hover:bg-background hover:text-foreground hover:shadow-md active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={next}
            aria-label="Next slide"
            className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 bg-background/80 text-muted-foreground shadow-sm backdrop-blur-sm transition-all duration-200 hover:bg-background hover:text-foreground hover:shadow-md active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}
      {showDots && slides.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 rounded-full border border-border/60 bg-background/80 px-2.5 py-1.5 shadow-sm backdrop-blur-sm">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === current ? "true" : undefined}
              className={cn(
                "h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                i === current
                  ? "w-6 bg-foreground"
                  : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50",
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;
