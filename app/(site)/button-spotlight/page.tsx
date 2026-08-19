"use client";

import { useState, useRef } from "react";
import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { BUTTON_SPOTLIGHT_SOURCE, DEFAULT_EXAMPLE, VARIANTS_EXAMPLE, CARD_EXAMPLE } from "./button-spotlight-source";

function SpotlightButton({ children, className = "", variant = "default" }: { children: React.ReactNode; className?: string; variant?: string }) {
  const ref = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [show, setShow] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const base = variant === "outline" ? "border border-border bg-background hover:bg-muted" : "bg-primary text-primary-foreground hover:bg-primary/90";

  return (
    <button ref={ref} className={`relative overflow-hidden rounded-lg px-6 py-3 font-medium transition-all ${base} ${className}`} onMouseMove={handleMouseMove} onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      {show && <span className="pointer-events-none absolute rounded-full bg-white/20 blur-xl" style={{ left: pos.x - 50, top: pos.y - 50, width: 100, height: 100 }} />}
      <span className="relative z-10">{children}</span>
    </button>
  );
}

export default function ButtonSpotlightPage() {
  return (
    <ComponentDocPage
      name="Button Spotlight"
      category="Feedback"
      description="Buttons with spotlight hover effect that follows the cursor, creating dynamic illumination on interactive elements."
    >
      <PreviewPanel filename="button-spotlight.tsx">
        <div className="flex w-full items-center justify-center py-10">
          <SpotlightButton>Hover Me</SpotlightButton>
        </div>
      </PreviewPanel>

      <SourceCodeViewer source={BUTTON_SPOTLIGHT_SOURCE} filename="components/ui/ButtonSpotlight/ButtonSpotlight.tsx" defaultExpanded />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Variants" description="Default and outline spotlight button styles." code={VARIANTS_EXAMPLE} filename="button-spotlight-variants.tsx">
          <div className="flex w-full items-center justify-center gap-4 py-10">
            <SpotlightButton variant="default">Primary</SpotlightButton>
            <SpotlightButton variant="outline">Outline</SpotlightButton>
          </div>
        </ExampleBlock>

        <ExampleBlock title="Card Spotlight" description="Spotlight buttons in a card grid layout." code={CARD_EXAMPLE} filename="button-spotlight-card.tsx">
          <div className="flex w-full items-center justify-center py-10">
            <div className="grid grid-cols-2 gap-4">
              <SpotlightButton>Get Started</SpotlightButton>
              <SpotlightButton variant="outline">Learn More</SpotlightButton>
              <SpotlightButton>Sign Up</SpotlightButton>
              <SpotlightButton variant="outline">Documentation</SpotlightButton>
            </div>
          </div>
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}