"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";

const GLASS_CARD_SOURCE = `"use client";

import type { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  blur?: "sm" | "md" | "lg";
}

const blurClasses: Record<string, string> = {
  sm: "backdrop-blur-sm",
  md: "backdrop-blur-md",
  lg: "backdrop-blur-lg",
};

export function GlassCard({ children, className = "", blur = "md" }: GlassCardProps) {
  return (
    <div
      className={
        "rounded-2xl bg-white/10 dark:bg-white/5 border border-white/20 " +
        blurClasses[blur] +
        (className ? " " + className : "")
      }
    >
      {children}
    </div>
  );
}`;

function BasicGlassDemo() {
  return (
    <div className="relative max-w-sm mx-auto h-48 rounded-2xl overflow-hidden bg-gradient-to-br from-primary/30 via-purple-500/20 to-pink-500/30">
      <div className="absolute inset-4 rounded-xl bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/20 flex items-center justify-center">
        <p className="text-sm font-medium">Glass Card</p>
      </div>
    </div>
  );
}

function ContentGlassDemo() {
  return (
    <div className="relative max-w-sm mx-auto h-56 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-500/30 to-cyan-500/30">
      <div className="absolute inset-4 rounded-xl bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/20 p-5">
        <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center mb-3">🎨</div>
        <h3 className="text-sm font-semibold">Design System</h3>
        <p className="text-xs text-muted-foreground mt-1">Beautiful glassmorphism components for modern web apps.</p>
        <div className="mt-4 flex gap-2">
          <button className="px-3 py-1.5 rounded-lg bg-white/20 text-xs font-medium">Learn More</button>
        </div>
      </div>
    </div>
  );
}

function NestedGlassDemo() {
  return (
    <div className="relative max-w-sm mx-auto h-48 rounded-2xl overflow-hidden bg-gradient-to-br from-violet-500/30 to-fuchsia-500/30">
      <div className="absolute inset-6 rounded-xl bg-white/10 dark:bg-white/5 backdrop-blur-sm border border-white/20" />
      <div className="absolute inset-10 rounded-lg bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/20 flex items-center justify-center">
        <p className="text-xs font-medium">Nested Glass</p>
      </div>
    </div>
  );
}

export default function GlassCardPage() {
  return (
    <ComponentDocPage
      name="Glass Card"
      category="Data Display"
      description="A glassmorphism card component with blur effects, transparency, and frosted glass visual styling."
    >
      <PreviewPanel filename="glass-card.tsx">
        <BasicGlassDemo />
      </PreviewPanel>

      <SourceCodeViewer
        source={GLASS_CARD_SOURCE}
        filename="components/ui/GlassCard/GlassCard.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock
          title="With Content"
          description="Glass card with structured content."
          code={`<GlassCard blur="md" className="h-56 p-5">
  <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center mb-3">🎨</div>
  <h3 className="text-sm font-semibold">Design System</h3>
  <p className="text-xs text-muted-foreground mt-1">Beautiful glassmorphism components.</p>
  <button className="mt-4 px-3 py-1.5 rounded-lg bg-white/20 text-xs font-medium">Learn More</button>
</GlassCard>`}
        >
          <ContentGlassDemo />
        </ExampleBlock>

        <ExampleBlock
          title="Nested Glass"
          description="Multiple glass layers for depth effect."
          code={`<div className="relative h-48 rounded-2xl overflow-hidden bg-gradient-to-br from-violet-500/30 to-fuchsia-500/30">
  <GlassCard blur="sm" className="absolute inset-6" />
  <GlassCard blur="md" className="absolute inset-10 flex items-center justify-center">
    <p className="text-xs font-medium">Nested Glass</p>
  </GlassCard>
</div>`}
        >
          <NestedGlassDemo />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}