"use client";

import { useState } from "react";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";
import { Bubble } from "@/components/_bubble";
import type { BubbleVariant, BubbleSize } from "@/components/_bubble";

const BUBBLE_SOURCE = `import * as React from "react";
import { cn } from "@/lib/cn";

type BubbleVariant = "default" | "primary" | "secondary" | "muted";
type BubbleSize = "sm" | "md" | "lg";

interface BubbleProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  variant?: BubbleVariant;
  size?: BubbleSize;
  icon?: ReactNode;
  tail?: boolean;
}

const BUBBLE_STYLES: Record<string, string> = {
  base: "inline-flex items-start gap-2.5 rounded-2xl border border-border/50 transition-colors duration-150",
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2.5 text-sm",
  lg: "px-5 py-3 text-base",
  default: "bg-muted text-foreground",
  primary: "border-primary/20 bg-primary text-primary-foreground shadow-sm shadow-primary/10",
  secondary: "bg-secondary text-secondary-foreground",
  muted: "border-dashed bg-muted/50 text-muted-foreground",
};

export function Bubble({ children, variant = "default", size = "md", icon, tail = true, className, ...props }: BubbleProps) {
  return (
    <div className={cn(BUBBLE_STYLES.base, BUBBLE_STYLES[size], BUBBLE_STYLES[variant], tail && "rounded-bl-md", className)} {...props}>
      {icon && <span className="flex-shrink-0 text-current/70">{icon}</span>}
      <span className="min-w-0 break-words">{children}</span>
    </div>
  );
}`;

const BASIC_EXAMPLE = `import { Bubble } from "@/components/_bubble";

<Bubble variant="default">Hey, how's the project going?</Bubble>
<Bubble variant="primary">It's going well!</Bubble>
<Bubble variant="default">Nice! Can you show me a demo?</Bubble>`;

const SIZES_EXAMPLE = `import { Bubble } from "@/components/_bubble";

<Bubble variant="default" size="sm">Small message</Bubble>
<Bubble variant="primary" size="md">Medium message</Bubble>
<Bubble variant="default" size="lg">Large message</Bubble>`;

const VARIANTS_EXAMPLE = `import { Bubble } from "@/components/_bubble";

<Bubble variant="default">Default bubble</Bubble>
<Bubble variant="primary">Primary bubble</Bubble>
<Bubble variant="secondary">Secondary bubble</Bubble>
<Bubble variant="muted">Muted bubble</Bubble>`;

const TAIL_EXAMPLE = `import { Bubble } from "@/components/_bubble";

<Bubble variant="default" tail>With tail (default)</Bubble>
<Bubble variant="primary" tail>With tail</Bubble>
<Bubble variant="default" tail={false}>Without tail</Bubble>`;

const ICON_EXAMPLE = `import { Bubble } from "@/components/_bubble";

<Bubble variant="default" icon={<UserIcon />}>Hello from the user</Bubble>
<Bubble variant="primary" icon={<BotIcon />}>Hello! I am the assistant.</Bubble>`;

const CHAT_LAYOUT_EXAMPLE = `<div className="flex flex-col items-start gap-2">
  <Bubble variant="default" tail>Hey!</Bubble>
</div>
<div className="flex flex-col items-end gap-2">
  <Bubble variant="primary" tail>Going great!</Bubble>
</div>`;

const PLAYGROUND_EXAMPLE = `<Bubble variant={variant} size={size} tail={withTail} icon={withIcon ? <Icon /> : undefined}>
  Hello, this is a preview bubble!
</Bubble>`;

export default function BubblePage() {
  const [variant, setVariant] = useState<BubbleVariant>("default");
  const [size, setSize] = useState<BubbleSize>("md");
  const [withTail, setWithTail] = useState(true);
  const [withIcon, setWithIcon] = useState(false);

  return (
    <ComponentDocPage
      name="Bubble"
      category="Data Display"
      description="Chat bubble component for displaying messages in a conversation UI. Supports sent/received variants, sender names, avatars, and timestamps."
    >
      <PreviewPanel filename="bubble-preview.tsx">
        <div className="flex w-full max-w-md flex-col gap-3">
          <Bubble variant="default">Hey, how&apos;s the project going?</Bubble>
          <Bubble variant="primary">It&apos;s going well! Just finished the new components.</Bubble>
          <Bubble variant="default">Nice! Can you show me a demo?</Bubble>
        </div>
      </PreviewPanel>

      <SourceCodeViewer
        source={BUBBLE_SOURCE}
        filename="components/_bubble/Bubble.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-8">
        <ExampleBlock
          title="Basic"
          description="Simple received and sent message bubbles."
          code={BASIC_EXAMPLE}
        >
          <div className="flex w-full max-w-md flex-col gap-3">
            <Bubble variant="default">Hey, how&apos;s the project going?</Bubble>
            <Bubble variant="primary">It&apos;s going well! Just finished the new components.</Bubble>
            <Bubble variant="default">Nice! Can you show me a demo?</Bubble>
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Sizes"
          description="Three sizes from compact to spacious."
          code={SIZES_EXAMPLE}
        >
          <div className="flex w-full max-w-md flex-col gap-3">
            <Bubble variant="default" size="sm">Small message</Bubble>
            <Bubble variant="primary" size="md">Medium message</Bubble>
            <Bubble variant="default" size="lg">Large message with more content</Bubble>
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Variants"
          description="Four visual styles for different contexts."
          code={VARIANTS_EXAMPLE}
        >
          <div className="flex w-full max-w-md flex-col gap-3">
            <Bubble variant="default">Default bubble</Bubble>
            <Bubble variant="primary">Primary bubble</Bubble>
            <Bubble variant="secondary">Secondary bubble</Bubble>
            <Bubble variant="muted">Muted bubble</Bubble>
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Tail"
          description="Optional speech bubble tail with rounded corner."
          code={TAIL_EXAMPLE}
        >
          <div className="flex w-full max-w-md flex-col gap-3">
            <Bubble variant="default" tail>With tail (default)</Bubble>
            <Bubble variant="primary" tail>With tail</Bubble>
            <Bubble variant="default" tail={false}>Without tail</Bubble>
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Icons"
          description="Leading icons inside bubbles."
          code={ICON_EXAMPLE}
        >
          <div className="flex w-full max-w-md flex-col gap-3">
            <Bubble variant="default" icon={<span className="text-xs">👤</span>}>Hello from the user</Bubble>
            <Bubble variant="primary" icon={<span className="text-xs">🤖</span>}>Hello! I am the assistant.</Bubble>
            <Bubble variant="secondary" icon={<span className="text-xs">✅</span>}>Task completed successfully</Bubble>
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Chat Layout"
          description="Full conversation layout with alignment and labels."
          code={CHAT_LAYOUT_EXAMPLE}
        >
          <div className="flex w-full max-w-md flex-col gap-4">
            <div className="flex flex-col items-start gap-2">
              <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Alice</span>
              <Bubble variant="default" size="sm" tail>Hey!</Bubble>
              <Bubble variant="default" tail>How&apos;s the new component library coming along?</Bubble>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Bob</span>
              <Bubble variant="primary" size="sm" tail>Going great!</Bubble>
              <Bubble variant="primary" tail>Just finished the Bubble component redesign.</Bubble>
            </div>
            <div className="flex flex-col items-start gap-2">
              <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Alice</span>
              <Bubble variant="default" tail>Awesome, can&apos;t wait to see it.</Bubble>
            </div>
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Playground"
          description="Interactively change variant, size, tail, and icon."
          code={PLAYGROUND_EXAMPLE}
        >
          <div className="flex w-full max-w-md flex-col gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                Variant
              </span>
              {(["default", "primary", "secondary", "muted"] as const).map((v) => (
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
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                Size
              </span>
              {(["sm", "md", "lg"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                    size === s
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                Options
              </span>
              <button
                onClick={() => setWithTail(!withTail)}
                className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                  withTail ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                tail: {withTail ? "on" : "off"}
              </button>
              <button
                onClick={() => setWithIcon(!withIcon)}
                className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                  withIcon ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                icon: {withIcon ? "on" : "off"}
              </button>
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <Bubble
                variant={variant}
                size={size}
                tail={withTail}
                icon={withIcon ? <span className="text-xs">💬</span> : undefined}
              >
                Hello, this is a preview bubble!
              </Bubble>
            </div>
          </div>
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
