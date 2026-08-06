"use client";

import { useState, useEffect, useCallback } from "react";
import { testimonials } from "../data";
import { StarRating, Avatar, Badge } from "../helpers";

export function CarouselTestimonials() {
  const [idx, setIdx] = useState(0);

  const goNext = useCallback(() => setIdx((p) => (p + 1) % testimonials.length), []);
  const goPrev = useCallback(() => setIdx((p) => (p - 1 + testimonials.length) % testimonials.length), []);

  useEffect(() => {
    const timer = setInterval(goNext, 5000);
    return () => clearInterval(timer);
  }, [goNext]);

  const t = testimonials[idx];

  return (
    <div className="relative mx-auto max-w-2xl overflow-hidden rounded-xl border border-border bg-white p-8 shadow-sm dark:border-border dark:bg-zinc-900">
      <div className="flex flex-col items-center gap-5 text-center" key={idx}>
        <Avatar name={t.name} size="lg" />
        <StarRating size="lg" />
        <p className="text-xl leading-relaxed text-muted-foreground">&ldquo;{t.quote}&rdquo;</p>
        <div>
          <p className="text-lg font-semibold">{t.name}</p>
          <p className="text-sm text-muted-foreground dark:text-muted-foreground/70">{t.title}, {t.company}</p>
        </div>
        <Badge label={t.category} />
      </div>
      <button onClick={goPrev} className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-border bg-white/80 p-2 text-muted-foreground backdrop-blur hover:bg-white dark:border-border dark:bg-muted/80">
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
      </button>
      <button onClick={goNext} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-border bg-white/80 p-2 text-muted-foreground backdrop-blur hover:bg-white dark:border-border dark:bg-muted/80">
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
      </button>
      <div className="mt-6 flex items-center justify-center gap-2">
        {testimonials.map((_, i) => (
          <button key={i} onClick={() => setIdx(i)} className={`h-2.5 rounded-full transition-all ${i === idx ? "w-8 bg-blue-500" : "w-2.5 bg-muted dark:bg-muted"}`} />
        ))}
      </div>
    </div>
  );
}
