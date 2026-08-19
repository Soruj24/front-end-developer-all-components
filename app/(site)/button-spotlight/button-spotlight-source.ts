export const BUTTON_SPOTLIGHT_SOURCE = `"use client";

import { useRef, useState } from "react";
import type { ReactNode } from "react";

interface ButtonSpotlightProps {
  children: ReactNode;
  variant?: "default" | "outline";
  className?: string;
}

export function ButtonSpotlight({
  children,
  variant = "default",
  className = "",
}: ButtonSpotlightProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [show, setShow] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const base =
    variant === "outline"
      ? "border border-border bg-background hover:bg-muted"
      : "bg-primary text-primary-foreground hover:bg-primary/90";

  return (
    <button
      ref={ref}
      className={"relative overflow-hidden rounded-lg px-6 py-3 font-medium transition-all " + base + " " + className}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {show && (
        <span
          className="pointer-events-none absolute rounded-full bg-white/20 blur-xl"
          style={{ left: pos.x - 50, top: pos.y - 50, width: 100, height: 100 }}
        />
      )}
      <span className="relative z-10">{children}</span>
    </button>
  );
}`;

export const DEFAULT_EXAMPLE = `<ButtonSpotlight>Hover me</ButtonSpotlight>`;

export const VARIANTS_EXAMPLE = `<ButtonSpotlight variant="default">Primary</ButtonSpotlight>
<ButtonSpotlight variant="outline">Outline</ButtonSpotlight>`;

export const CARD_EXAMPLE = `<div className="grid grid-cols-2 gap-4">
  <ButtonSpotlight>Get Started</ButtonSpotlight>
  <ButtonSpotlight variant="outline">Learn More</ButtonSpotlight>
  <ButtonSpotlight>Sign Up</ButtonSpotlight>
  <ButtonSpotlight variant="outline">Documentation</ButtonSpotlight>
</div>`;