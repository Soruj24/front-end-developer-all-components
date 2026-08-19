export const BACKTOTOP_SOURCE = `"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

interface BackToTopProps {
  threshold?: number;
  variant?: "round" | "square" | "pill";
  color?: string;
  showProgress?: boolean;
}

export function BackToTop({ threshold = 300, variant = "round", color = "#6366f1", showProgress = false }: BackToTopProps) {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
      setVisible(window.scrollY > threshold);
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const shapeClass = variant === "square" ? "rounded-lg" : "rounded-full";

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className={\`fixed bottom-6 right-6 flex h-12 w-12 items-center justify-center text-white shadow-lg transition-transform hover:scale-110 \${shapeClass}\`}
      style={{ backgroundColor: color }}
    >
      {showProgress && (
        <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 44 44">
          <circle cx="22" cy="22" r={radius} fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="3" />
          <circle cx="22" cy="22" r={radius} fill="none" stroke="#fff" strokeWidth="3" strokeDasharray={circumference} strokeDashoffset={circumference - (progress / 100) * circumference} strokeLinecap="round" />
        </svg>
      )}
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}`;

export const SHAPES_EXAMPLE = `<BackToTop variant="round" />
<BackToTop variant="square" />
<BackToTop variant="pill" />`;

export const COLORS_EXAMPLE = `<BackToTop color="#6366f1" />
<BackToTop color="#10b981" />
<BackToTop color="#f94144" />`;

export const PROGRESS_EXAMPLE = `<BackToTop showProgress />`;

export const USECASES_EXAMPLE = `<BackToTop /> // bottom-right placement
<BackToTop color="#111827" /> // bottom-left variant`;
