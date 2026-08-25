"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/cn";

interface BlogReadingProgressProps {
  className?: string;
}

export function BlogReadingProgress({
  className,
}: BlogReadingProgressProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const article = document.querySelector("article");
      if (!article) return;

      const rect = article.getBoundingClientRect();
      const articleTop = window.scrollY + rect.top;
      const articleHeight = rect.height;
      const windowHeight = window.innerHeight;
      const scrolled = window.scrollY - articleTop + windowHeight;
      const total = articleHeight;

      const percentage = Math.min(Math.max((scrolled / total) * 100, 0), 100);
      setProgress(percentage);
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();

    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div
      className={cn(
        "fixed top-0 left-0 right-0 z-50 h-1 bg-muted/50",
        className,
      )}
    >
      <div
        className="h-full bg-gradient-to-r from-primary to-primary/80 transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
