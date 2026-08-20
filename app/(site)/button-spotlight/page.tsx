"use client";

import { useState } from "react";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";
import { ButtonSpotlight } from "@/components/_button-spotlight";
import type { ButtonSpotlightVariant } from "@/components/_button-spotlight";

const BUTTON_SPOTLIGHT_SOURCE = `"use client";

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
`;

const VARIANTS_EXAMPLE = `import { ButtonSpotlight } from "@/components/_button-spotlight";

<ButtonSpotlight variant="default">Primary</ButtonSpotlight>
<ButtonSpotlight variant="outline">Outline</ButtonSpotlight>
<ButtonSpotlight variant="ghost">Ghost</ButtonSpotlight>`;

const SIZES_EXAMPLE = `import { ButtonSpotlight } from "@/components/_button-spotlight";

<ButtonSpotlight variant="outline" className="px-4 py-2 text-xs font-medium">Small</ButtonSpotlight>
<ButtonSpotlight variant="outline" className="px-6 py-3 text-sm font-semibold">Medium</ButtonSpotlight>
<ButtonSpotlight variant="outline" className="px-8 py-3.5 text-base font-semibold">Large</ButtonSpotlight>`;

const CARD_GRID_EXAMPLE = `<div className="grid grid-cols-2 gap-4">
  <ButtonSpotlight>Get Started</ButtonSpotlight>
  <ButtonSpotlight variant="outline">Learn More</ButtonSpotlight>
  <ButtonSpotlight variant="outline">Documentation</ButtonSpotlight>
  <ButtonSpotlight>Sign Up</ButtonSpotlight>
</div>`;

const PLAYGROUND_EXAMPLE = `<ButtonSpotlight variant={variant} spotlightSize={spotlightSize} spotlightBlur={spotlightBlur}>
  Hover me!
</ButtonSpotlight>`;

export default function ButtonSpotlightPage() {
  const [variant, setVariant] = useState<ButtonSpotlightVariant>("default");
  const [spotlightSize, setSpotlightSize] = useState(160);
  const [spotlightBlur, setSpotlightBlur] = useState(40);

  return (
    <ComponentDocPage
      name="Button Spotlight"
      category="Feedback"
      description="Buttons with spotlight hover effect that follows the cursor, creating dynamic illumination on interactive elements."
    >
      <PreviewPanel filename="button-spotlight.tsx">
        <div className="flex w-full items-center justify-center py-10">
          <ButtonSpotlight>Hover Me</ButtonSpotlight>
        </div>
      </PreviewPanel>

      <SourceCodeViewer
        source={BUTTON_SPOTLIGHT_SOURCE}
        filename="components/_button-spotlight/ButtonSpotlight.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-8">
        <ExampleBlock
          title="Variants"
          description="Default, outline, and ghost spotlight button styles."
          code={VARIANTS_EXAMPLE}
        >
          <div className="flex w-full flex-wrap items-center justify-center gap-4 py-10">
            <ButtonSpotlight variant="default">Primary</ButtonSpotlight>
            <ButtonSpotlight variant="outline">Outline</ButtonSpotlight>
            <ButtonSpotlight variant="ghost">Ghost</ButtonSpotlight>
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Sizes"
          description="Customizable via className for different button sizes."
          code={SIZES_EXAMPLE}
        >
          <div className="flex w-full flex-wrap items-center justify-center gap-4 py-10">
            <ButtonSpotlight variant="outline" className="px-4 py-2 text-xs font-medium">Small</ButtonSpotlight>
            <ButtonSpotlight variant="outline" className="px-6 py-3 text-sm font-semibold">Medium</ButtonSpotlight>
            <ButtonSpotlight variant="outline" className="px-8 py-3.5 text-base font-semibold">Large</ButtonSpotlight>
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Card Grid"
          description="Spotlight buttons in a card grid layout."
          code={CARD_GRID_EXAMPLE}
        >
          <div className="flex w-full items-center justify-center py-10">
            <div className="grid w-full max-w-md grid-cols-2 gap-4">
              <ButtonSpotlight>Get Started</ButtonSpotlight>
              <ButtonSpotlight variant="outline">Learn More</ButtonSpotlight>
              <ButtonSpotlight variant="outline">Documentation</ButtonSpotlight>
              <ButtonSpotlight>Sign Up</ButtonSpotlight>
            </div>
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Playground"
          description="Adjust spotlight size and blur to your liking."
          code={PLAYGROUND_EXAMPLE}
        >
          <div className="flex w-full max-w-md flex-col gap-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Variant</span>
              {(["default", "outline", "ghost"] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setVariant(v)}
                  className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                    variant === v
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Size</span>
                <input
                  type="range"
                  min={80}
                  max={240}
                  value={spotlightSize}
                  onChange={(e) => setSpotlightSize(Number(e.target.value))}
                  className="h-1.5 w-24 cursor-pointer appearance-none rounded-full bg-muted accent-primary"
                />
                <span className="w-8 text-xs tabular-nums text-muted-foreground">{spotlightSize}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Blur</span>
                <input
                  type="range"
                  min={10}
                  max={80}
                  value={spotlightBlur}
                  onChange={(e) => setSpotlightBlur(Number(e.target.value))}
                  className="h-1.5 w-24 cursor-pointer appearance-none rounded-full bg-muted accent-primary"
                />
                <span className="w-8 text-xs tabular-nums text-muted-foreground">{spotlightBlur}</span>
              </div>
            </div>
            <div className="flex w-full items-center justify-center rounded-xl border border-border bg-card py-12">
              <ButtonSpotlight
                variant={variant}
                spotlightSize={spotlightSize}
                spotlightBlur={spotlightBlur}
              >
                Hover me!
              </ButtonSpotlight>
            </div>
          </div>
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
