export const SCROLLPROGRESS_SOURCE = `"use client";

import { useState, useEffect } from "react";

interface ScrollProgressProps {
  className?: string;
  showLabel?: boolean;
}

export function ScrollProgress({ className = "", showLabel = false }: ScrollProgressProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onScroll);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className={\`relative w-full overflow-hidden \${className}\`} role="progressbar" aria-valuenow={Math.round(progress)}>
      <div className="h-1 w-full bg-muted" />
      <div className="absolute left-0 top-0 h-1 bg-primary transition-all duration-300" style={{ width: \`\${progress}%\` }} />
      {showLabel && (
        <span className="absolute -top-6 right-0 text-xs tabular-nums text-muted-foreground">
          {Math.round(progress)}%
        </span>
      )}
    </div>
  );
}`;

export const READING_EXAMPLE = `<ScrollProgress value={progress} max={100} showLabel />`;

export const PAGE_EXAMPLE = `<ScrollProgress className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500" />`;

export const BAR_EXAMPLE = `<div
  className="w-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-300"
  style={{ height: "4px", width: "75%" }}
/>`;

export const INDICATOR_EXAMPLE = `<div
  className="absolute left-4 right-4 h-8 rounded-md bg-primary/20 border-2 border-dashed border-primary/50 transition-all duration-300"
  style={{ top: \`\${position}%\` }}
/>`;

export const TOTOP_EXAMPLE = `<button
  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90"
  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
>
  <ArrowUp className="h-5 w-5" />
</button>`;

export const CONTENT_EXAMPLE = `const [expanded, setExpanded] = useState(3);

<div className="space-y-2 rounded-lg border p-4">
  {paragraphs.slice(0, expanded).map((p, i) => (
    <p key={i} className="text-sm text-muted-foreground">{p}</p>
  ))}
</div>
<button onClick={() => setExpanded(Math.min(paragraphs.length, expanded + 1))}>
  Load more content
</button>`;

export const SECTION_EXAMPLE = `const [activeSection, setActiveSection] = useState(0);
const sections = ["Overview", "Features", "Pricing", "FAQ", "Contact"];

<button
  onClick={() => setActiveSection(i)}
  className={\`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors \${activeSection === i ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"}\`}
>
  {s}
</button>`;
