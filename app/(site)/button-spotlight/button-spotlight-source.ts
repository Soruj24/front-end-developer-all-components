export const BUTTON_SPOTLIGHT_SOURCE = `"use client";

import { useRef, useState, useCallback } from "react";
import { cn } from "@/lib/cn";

type ButtonSpotlightVariant = "default" | "outline" | "ghost";

interface ButtonSpotlightProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonSpotlightVariant;
  spotlightSize?: number;
  spotlightBlur?: number;
}

export function ButtonSpotlight({
  children,
  variant = "default",
  spotlightSize = 160,
  spotlightBlur = 40,
  className,
  ...props
}: ButtonSpotlightProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [show, setShow] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  return (
    <button
      ref={ref}
      className={cn(
        "group relative inline-flex items-center justify-center overflow-hidden rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "active:scale-[0.97]",
        variant === "default" && "bg-primary text-primary-foreground shadow-sm shadow-primary/20 hover:bg-primary/90",
        variant === "outline" && "border border-border bg-background text-foreground shadow-sm hover:bg-muted",
        variant === "ghost" && "bg-transparent text-foreground hover:bg-muted",
        className,
      )}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onMouseMove={handleMouseMove}
      {...props}
    >
      {show && (
        <span
          className="pointer-events-none absolute rounded-full bg-white/15 transition-opacity duration-200"
          style={{ left: pos.x - spotlightSize / 2, top: pos.y - spotlightSize / 2, width: spotlightSize, height: spotlightSize, filter: \`blur(\${spotlightBlur}px)\` }}
          aria-hidden="true"
        />
      )}
      <span className="relative z-10">{children}</span>
    </button>
  );
}`;

export const DEFAULT_EXAMPLE = `<ButtonSpotlight>Hover me</ButtonSpotlight>`;

export const VARIANTS_EXAMPLE = `<ButtonSpotlight variant="default">Primary</ButtonSpotlight>
<ButtonSpotlight variant="outline">Outline</ButtonSpotlight>
<ButtonSpotlight variant="ghost">Ghost</ButtonSpotlight>`;

export const CARD_EXAMPLE = `<div className="grid grid-cols-2 gap-4">
  <ButtonSpotlight>Get Started</ButtonSpotlight>
  <ButtonSpotlight variant="outline">Learn More</ButtonSpotlight>
  <ButtonSpotlight variant="outline">Documentation</ButtonSpotlight>
  <ButtonSpotlight>Sign Up</ButtonSpotlight>
</div>`;
