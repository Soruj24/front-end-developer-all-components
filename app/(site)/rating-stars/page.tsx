"use client";

import { useState } from "react";
import { Rating } from "@/components/ui/Rating";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";

const RATING_SOURCE = `"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/cn";

type RatingSize = "sm" | "md" | "lg";
type RatingColor = "amber" | "yellow" | "emerald" | "rose" | "primary";

interface RatingProps {
  value: number;
  max?: number;
  size?: RatingSize;
  color?: RatingColor;
  onChange?: (value: number) => void;
  disabled?: boolean;
  className?: string;
}

const SIZE_MAP = {
  sm: { icon: "h-4 w-4", gap: "gap-0.5" },
  md: { icon: "h-5 w-5", gap: "gap-1" },
  lg: { icon: "h-7 w-7", gap: "gap-1.5" },
};

const COLOR_MAP = {
  amber: { filled: "text-amber-500 dark:text-amber-400", empty: "text-muted-foreground/25" },
  yellow: { filled: "text-yellow-500 dark:text-yellow-400", empty: "text-muted-foreground/25" },
  emerald: { filled: "text-emerald-500 dark:text-emerald-400", empty: "text-muted-foreground/25" },
  rose: { filled: "text-rose-500 dark:text-rose-400", empty: "text-muted-foreground/25" },
  primary: { filled: "text-primary", empty: "text-muted-foreground/25" },
};

function StarIcon({ filled, half }) {
  if (filled) return (<svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>);
  if (half) return (<svg viewBox="0 0 24 24" className="h-full w-full"><defs><linearGradient id="half-grad"><stop offset="50%" stopColor="currentColor" /><stop offset="50%" stopColor="transparent" /></linearGradient></defs><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="url(#half-grad)" stroke="currentColor" strokeWidth="1" /></svg>);
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-full w-full"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>);
}

export function Rating({ value, max = 5, size = "md", color = "amber", onChange, disabled = false, className }: RatingProps) {
  const [hovered, setHovered] = useState(null);
  const interactive = !!onChange && !disabled;
  const handleMouseEnter = useCallback((i) => { if (interactive) setHovered(i); }, [interactive]);
  const handleMouseLeave = useCallback(() => { if (interactive) setHovered(null); }, [interactive]);
  const display = hovered !== null ? hovered + 1 : value;

  return (
    <div role={interactive ? "radiogroup" : "img"} aria-label={\`Rating: \${value} out of \${max}\`}
      className={cn("inline-flex items-center", SIZE_MAP[size].gap, disabled && "pointer-events-none opacity-50", className)}>
      {Array.from({ length: max }, (_, i) => {
        const filled = i < Math.floor(display);
        const half = !filled && i < display;
        return (
          <button key={i} type="button" disabled={!interactive} onClick={() => onChange?.(i + 1)}
            onMouseEnter={() => handleMouseEnter(i)} onMouseLeave={handleMouseLeave}
            aria-label={\`\${i + 1} star\${i + 1 > 1 ? "s" : ""}\`} role={interactive ? "radio" : undefined}
            aria-checked={interactive ? i < value : undefined}
            className={cn("relative inline-flex items-center justify-center rounded-md transition-all duration-150", SIZE_MAP[size].icon,
              interactive ? "cursor-pointer hover:scale-110 focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:outline-none" : "cursor-default",
              filled ? COLOR_MAP[color].filled : half ? COLOR_MAP[color].filled : COLOR_MAP[color].empty)}>
            <StarIcon filled={filled} half={half} />
          </button>
        );
      })}
    </div>
  );
}`;

export default function RatingStarsPage() {
  const [value, setValue] = useState(3);

  return (
    <ComponentDocPage
      name="Rating"
      category="Forms"
      description="Star rating with hover preview, read-only mode, accessible keyboard interaction, colors, and sizes."
    >
      <PreviewPanel filename="rating-preview.tsx">
        <div className="flex flex-col items-center gap-4 py-4">
          <Rating value={value} onChange={setValue} />
          <span className="text-sm text-muted-foreground">Value: {value}</span>
        </div>
      </PreviewPanel>

      <SourceCodeViewer
        source={RATING_SOURCE}
        filename="components/ui/Rating/Rating.tsx"
        defaultExpanded
      />

      <section className="flex flex-col gap-8">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Examples
        </h2>

        <ExampleBlock
          title="Basic"
          description="Read-only star rating."
          code={`import { Rating } from "@/components/ui/Rating";\n\n<Rating value={3} />`}
          filename="basic.tsx"
        >
          <div className="flex justify-center py-2">
            <Rating value={3} />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Interactive"
          description="Clickable stars with hover preview."
          code={`const [value, setValue] = useState(0);\n\n<Rating value={value} onChange={setValue} />`}
          filename="interactive.tsx"
        >
          <div className="flex flex-col items-center gap-2 py-2">
            <Rating value={value} onChange={setValue} />
            <span className="text-sm text-muted-foreground">{value}/5</span>
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Sizes"
          description="Three sizes: sm, md (default), lg."
          code={`<Rating value={3} size="sm" />\n<Rating value={3} size="md" />\n<Rating value={3} size="lg" />`}
          filename="sizes.tsx"
        >
          <div className="flex flex-col items-center gap-3 py-2">
            <Rating value={3} size="sm" />
            <Rating value={3} size="md" />
            <Rating value={3} size="lg" />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Colors"
          description="Color variants for different themes."
          code={`<Rating value={4} color="amber" />\n<Rating value={4} color="emerald" />\n<Rating value={4} color="rose" />\n<Rating value={4} color="primary" />`}
          filename="colors.tsx"
        >
          <div className="flex flex-col items-center gap-3 py-2">
            <Rating value={4} color="amber" />
            <Rating value={4} color="emerald" />
            <Rating value={4} color="rose" />
            <Rating value={4} color="primary" />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Disabled"
          description="Non-interactive state."
          code={`<Rating value={4} disabled />`}
          filename="disabled.tsx"
        >
          <div className="flex justify-center py-2">
            <Rating value={4} disabled />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Custom Max"
          description="Use 10 stars instead of the default 5."
          code={`<Rating value={7} max={10} />`}
          filename="custom-max.tsx"
        >
          <div className="flex justify-center py-2">
            <Rating value={7} max={10} />
          </div>
        </ExampleBlock>
      </section>


    </ComponentDocPage>
  );
}
