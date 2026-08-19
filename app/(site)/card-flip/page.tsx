"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";

const CARD_FLIP_SOURCE = `"use client";

import { useState } from "react";
import type { ReactNode } from "react";

interface CardFlipProps {
  front: ReactNode;
  back: ReactNode;
  direction?: "horizontal" | "vertical";
  trigger?: "hover" | "click";
  className?: string;
}

export function CardFlip({
  front,
  back,
  direction = "horizontal",
  trigger = "hover",
  className = "",
}: CardFlipProps) {
  const [flipped, setFlipped] = useState(false);
  const isVertical = direction === "vertical";
  const rotate = isVertical ? "rotateX(180deg)" : "rotateY(180deg)";

  const faceClass =
    "absolute inset-0 rounded-xl border border-border flex items-center justify-center [backface-visibility:hidden]";
  const wrapperClass =
    "relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d]" +
    (trigger === "hover"
      ? isVertical
        ? " hover:[transform:rotateX(180deg)]"
        : " hover:[transform:rotateY(180deg)]"
      : flipped
        ? " [transform:rotateY(180deg)]"
        : " [transform:rotateY(0deg)]");

  return (
    <div
      className={"group h-40 w-56 [perspective:600px]" + (className ? " " + className : "")}
      onClick={() => trigger === "click" && setFlipped((v) => !v)}
    >
      <div className={wrapperClass}>
        <div className={faceClass + " bg-card"}>{front}</div>
        <div className={faceClass + " bg-muted"} style={{ transform: rotate }}>
          {back}
        </div>
      </div>
    </div>
  );
}`;

function HoverFlipDemo() {
  return (
    <div className="flex gap-4 justify-center">
      {[
        { title: "Front Side", back: "Back Side" },
        { title: "React", back: "A JavaScript library" },
      ].map((card, i) => (
        <div key={i} className="group h-40 w-56 [perspective:600px]">
          <div className="relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
            <div className="absolute inset-0 rounded-xl border border-border bg-card flex items-center justify-center [backface-visibility:hidden]">
              <span className="text-sm font-medium">{card.title}</span>
            </div>
            <div className="absolute inset-0 rounded-xl border border-border flex items-center justify-center [backface-visibility:hidden] [transform:rotateY(180deg)]" style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)" }}>
              <span className="text-sm font-medium">{card.back}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function VerticalFlipDemo() {
  return (
    <div className="h-48 w-64 mx-auto [perspective:600px]">
      <div className="relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d] hover:[transform:rotateX(180deg)]">
        <div className="absolute inset-0 rounded-xl border border-border bg-card flex flex-col items-center justify-center gap-2 [backface-visibility:hidden]">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">★</div>
          <span className="text-sm font-medium">Premium Plan</span>
          <span className="text-xs text-muted-foreground">$29/mo</span>
        </div>
        <div className="absolute inset-0 rounded-xl border border-primary bg-primary/5 flex flex-col items-center justify-center gap-2 [backface-visibility:hidden] [transform:rotateX(180deg)]">
          <span className="text-sm font-medium text-primary">Includes:</span>
          <span className="text-xs text-muted-foreground">Unlimited projects</span>
          <span className="text-xs text-muted-foreground">Priority support</span>
        </div>
      </div>
    </div>
  );
}

function ClickFlipDemo() {
  return (
    <div className="flex gap-4 justify-center">
      {["Profile Card", "Stats Card"].map((label, i) => (
        <div key={i} className="h-44 w-56 [perspective:600px] cursor-pointer">
          <div className="relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d]" style={{ transform: "rotateY(0deg)" }}>
            <div className="absolute inset-0 rounded-xl border border-border bg-card flex flex-col items-center justify-center gap-2 [backface-visibility:hidden]">
              <div className="h-12 w-12 rounded-full bg-primary/10" />
              <span className="text-sm font-medium">{label}</span>
              <span className="text-xs text-muted-foreground">Click to flip</span>
            </div>
            <div className="absolute inset-0 rounded-xl border border-border bg-muted flex flex-col items-center justify-center gap-2 [backface-visibility:hidden] [transform:rotateY(180deg)]">
              <span className="text-sm font-medium">Back content</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function CardFlipPage() {
  return (
    <ComponentDocPage
      name="Card Flip"
      category="Animation"
      description="An interactive card flip animation component for revealing content on hover or click with 3D perspective effects."
    >
      <PreviewPanel filename="card-flip.tsx">
        <HoverFlipDemo />
      </PreviewPanel>

      <SourceCodeViewer
        source={CARD_FLIP_SOURCE}
        filename="components/ui/CardFlip/CardFlip.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock
          title="Vertical Flip"
          description="Cards that flip vertically on hover."
          code={`<CardFlip front={<PremiumPlan />} back={<Includes />} direction="vertical" trigger="hover" />`}
        >
          <VerticalFlipDemo />
        </ExampleBlock>

        <ExampleBlock
          title="Click to Flip"
          description="Interactive cards that flip when clicked."
          code={`<CardFlip front={<ProfileCard />} back={<BackContent />} trigger="click" />`}
        >
          <ClickFlipDemo />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}