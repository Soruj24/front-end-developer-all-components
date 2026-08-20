"use client";

import { useState } from "react";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";
import { ButtonGroup } from "@/components/_button-group";
import type { ButtonGroupVariant, ButtonGroupOrientation } from "@/components/_button-group";

const BUTTONGROUP_SOURCE = `import * as React from "react";
import { cn } from "@/lib/cn";

type ButtonGroupVariant = "default" | "outline" | "ghost";
type ButtonGroupSize = "sm" | "md" | "lg";
type ButtonGroupOrientation = "horizontal" | "vertical";

interface ButtonGroupProps {
  variant?: ButtonGroupVariant;
  size?: ButtonGroupSize;
  orientation?: ButtonGroupOrientation;
  rounded?: boolean;
  gap?: "none" | "xs" | "sm" | "md";
  children: ReactNode;
  className?: string;
}

const BUTTON_GROUP_GAPS: Record<string, string> = {
  none: "gap-0",
  xs: "gap-px",
  sm: "gap-0.5",
  md: "gap-1",
};

export function ButtonGroup({
  variant = "default",
  size = "md",
  orientation = "horizontal",
  rounded = true,
  gap = "sm",
  children,
  className,
}: ButtonGroupProps) {
  const isVertical = orientation === "vertical";
  return (
    <div
      role="group"
      aria-label="Button group"
      className={cn(
        "inline-flex items-center",
        isVertical ? "flex-col" : "flex-row",
        BUTTON_GROUP_GAPS[gap],
        rounded && "rounded-xl",
        variant === "default" && "bg-muted p-0.5",
        variant === "outline" && "border border-border",
        variant === "ghost" && "bg-transparent",
        className,
      )}
    >
      {children}
    </div>
  );
}`;

const DEFAULT_SOURCE = `import { ButtonGroup } from "@/components/_button-group";

<ButtonGroup>
  <button className="rounded-lg bg-background px-4 py-2 text-sm font-medium shadow-sm">Left</button>
  <button className="rounded-lg bg-background px-4 py-2 text-sm font-medium shadow-sm">Center</button>
  <button className="rounded-lg bg-background px-4 py-2 text-sm font-medium shadow-sm">Right</button>
</ButtonGroup>`;

const VERTICAL_SOURCE = `import { ButtonGroup } from "@/components/_button-group";

<ButtonGroup orientation="vertical">
  <button className="rounded-lg bg-background px-4 py-2 text-sm font-medium shadow-sm">Top</button>
  <button className="rounded-lg bg-background px-4 py-2 text-sm font-medium shadow-sm">Middle</button>
  <button className="rounded-lg bg-background px-4 py-2 text-sm font-medium shadow-sm">Bottom</button>
</ButtonGroup>`;

const OUTLINE_SOURCE = `import { ButtonGroup } from "@/components/_button-group";

<ButtonGroup variant="outline">
  <button className="px-4 py-2 text-sm font-medium hover:bg-muted">Left</button>
  <button className="px-4 py-2 text-sm font-medium hover:bg-muted">Center</button>
  <button className="px-4 py-2 text-sm font-medium hover:bg-muted">Right</button>
</ButtonGroup>`;

const GHOST_SOURCE = `import { ButtonGroup } from "@/components/_button-group";

<ButtonGroup variant="ghost">
  <button className="px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground">Left</button>
  <button className="px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground">Center</button>
  <button className="px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground">Right</button>
</ButtonGroup>`;

const ICONS_SOURCE = `import { ButtonGroup } from "@/components/_button-group";

<ButtonGroup variant="outline">
  <button className="px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground"><EditIcon /></button>
  <button className="px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground"><CopyIcon /></button>
  <button className="px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground"><TrashIcon /></button>
</ButtonGroup>`;

const PAGINATION_SOURCE = `import { ButtonGroup } from "@/components/_button-group";

<ButtonGroup>
  <button className="px-3 py-2 text-sm font-medium text-muted-foreground" disabled>&#8592;</button>
  {[1, 2, 3].map((page) => (
    <button key={page}
      className={\`px-4 py-2 text-sm font-medium shadow-sm \${
        page === 1 ? "bg-primary text-primary-foreground" : "bg-background hover:bg-background/80"
      }\`}>
      {page}
    </button>
  ))}
  <button className="px-3 py-2 text-sm font-medium text-muted-foreground">&#8594;</button>
</ButtonGroup>`;

const SIZES_SOURCE = `import { ButtonGroup } from "@/components/_button-group";

<ButtonGroup size="sm">
  <button className="rounded-md bg-background px-3 py-1 text-xs font-medium shadow-sm">Small</button>
  <button className="rounded-md bg-background px-3 py-1 text-xs font-medium shadow-sm">Group</button>
</ButtonGroup>

<ButtonGroup size="lg">
  <button className="rounded-xl bg-background px-5 py-2.5 text-base font-medium shadow-sm">Large</button>
  <button className="rounded-xl bg-background px-5 py-2.5 text-base font-medium shadow-sm">Group</button>
</ButtonGroup>`;

const PLAYGROUND_SOURCE = `<ButtonGroup variant={variant} orientation={orientation} rounded={withRounded}>
  <button className="px-4 py-2 text-sm font-medium hover:bg-muted">Left</button>
  <button className="px-4 py-2 text-sm font-medium hover:bg-muted">Center</button>
  <button className="px-4 py-2 text-sm font-medium hover:bg-muted">Right</button>
</ButtonGroup>`;

function EditIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  );
}

export default function ButtonGroupPage() {
  const [variant, setVariant] = useState<ButtonGroupVariant>("default");
  const [orientation, setOrientation] = useState<ButtonGroupOrientation>("horizontal");
  const [withRounded, setWithRounded] = useState(true);

  return (
    <ComponentDocPage
      name="Button Group"
      category="Elements"
      description="Groups related buttons together with shared border styling. Supports horizontal and vertical orientations, three visual variants, and configurable gaps."
    >
      <PreviewPanel filename="button-group-preview.tsx">
        <ButtonGroup>
          <button type="button" className="rounded-lg bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-background/80">Left</button>
          <button type="button" className="rounded-lg bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-background/80">Center</button>
          <button type="button" className="rounded-lg bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-background/80">Right</button>
        </ButtonGroup>
      </PreviewPanel>

      <SourceCodeViewer
        source={BUTTONGROUP_SOURCE}
        filename="components/_button-group/ButtonGroup.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-8">
        <ExampleBlock
          title="Default"
          description="Segmented control with muted background and rounded inner buttons."
          code={DEFAULT_SOURCE}
        >
          <ButtonGroup>
            <button type="button" className="rounded-lg bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-background/80">Left</button>
            <button type="button" className="rounded-lg bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-background/80">Center</button>
            <button type="button" className="rounded-lg bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-background/80">Right</button>
          </ButtonGroup>
        </ExampleBlock>

        <ExampleBlock
          title="Vertical"
          description="Stack buttons vertically with top-to-bottom flow."
          code={VERTICAL_SOURCE}
        >
          <ButtonGroup orientation="vertical">
            <button type="button" className="rounded-lg bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-background/80">Top</button>
            <button type="button" className="rounded-lg bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-background/80">Middle</button>
            <button type="button" className="rounded-lg bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-background/80">Bottom</button>
          </ButtonGroup>
        </ExampleBlock>

        <ExampleBlock
          title="Outline"
          description="Bordered container with transparent inner buttons."
          code={OUTLINE_SOURCE}
        >
          <ButtonGroup variant="outline">
            <button type="button" className="px-4 py-2 text-sm font-medium transition-colors hover:bg-muted">Left</button>
            <button type="button" className="px-4 py-2 text-sm font-medium transition-colors hover:bg-muted">Center</button>
            <button type="button" className="px-4 py-2 text-sm font-medium transition-colors hover:bg-muted">Right</button>
          </ButtonGroup>
        </ExampleBlock>

        <ExampleBlock
          title="Ghost"
          description="No container background, pure hover states."
          code={GHOST_SOURCE}
        >
          <ButtonGroup variant="ghost">
            <button type="button" className="px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">Left</button>
            <button type="button" className="px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">Center</button>
            <button type="button" className="px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">Right</button>
          </ButtonGroup>
        </ExampleBlock>

        <ExampleBlock
          title="With Icons"
          description="Group icon-only buttons for toolbar actions."
          code={ICONS_SOURCE}
        >
          <ButtonGroup variant="outline">
            <button type="button" className="px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"><EditIcon /></button>
            <button type="button" className="px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"><CopyIcon /></button>
            <button type="button" className="px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"><TrashIcon /></button>
          </ButtonGroup>
        </ExampleBlock>

        <ExampleBlock
          title="Pagination"
          description="Common pagination pattern using a button group."
          code={PAGINATION_SOURCE}
        >
          <ButtonGroup>
            <button type="button" className="px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-background/80" disabled>&#8592;</button>
            {[1, 2, 3].map((page) => (
              <button
                key={page}
                type="button"
                className={`px-4 py-2 text-sm font-medium shadow-sm transition-colors ${
                  page === 1
                    ? "bg-primary text-primary-foreground"
                    : "bg-background text-foreground hover:bg-background/80"
                }`}
              >
                {page}
              </button>
            ))}
            <button type="button" className="px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-background/80">&#8594;</button>
          </ButtonGroup>
        </ExampleBlock>

        <ExampleBlock
          title="Sizes"
          description="Three size options from compact to spacious."
          code={SIZES_SOURCE}
        >
          <div className="flex flex-col gap-4">
            <ButtonGroup size="sm">
              <button type="button" className="rounded-md bg-background px-3 py-1 text-xs font-medium shadow-sm transition-colors hover:bg-background/80">Small</button>
              <button type="button" className="rounded-md bg-background px-3 py-1 text-xs font-medium shadow-sm transition-colors hover:bg-background/80">Group</button>
            </ButtonGroup>
            <ButtonGroup size="md">
              <button type="button" className="rounded-lg bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-background/80">Medium</button>
              <button type="button" className="rounded-lg bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-background/80">Group</button>
            </ButtonGroup>
            <ButtonGroup size="lg">
              <button type="button" className="rounded-xl bg-background px-5 py-2.5 text-base font-medium shadow-sm transition-colors hover:bg-background/80">Large</button>
              <button type="button" className="rounded-xl bg-background px-5 py-2.5 text-base font-medium shadow-sm transition-colors hover:bg-background/80">Group</button>
            </ButtonGroup>
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Playground"
          description="Interactively change variant, orientation, and rounded."
          code={PLAYGROUND_SOURCE}
        >
          <div className="flex w-full max-w-md flex-col gap-4">
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
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Orientation</span>
              {(["horizontal", "vertical"] as const).map((o) => (
                <button
                  key={o}
                  onClick={() => setOrientation(o)}
                  className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                    orientation === o
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {o}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Options</span>
              <button
                onClick={() => setWithRounded(!withRounded)}
                className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                  withRounded ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                rounded: {withRounded ? "on" : "off"}
              </button>
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <ButtonGroup variant={variant} orientation={orientation} rounded={withRounded}>
                <button type="button" className="px-4 py-2 text-sm font-medium transition-colors hover:bg-muted">Left</button>
                <button type="button" className="px-4 py-2 text-sm font-medium transition-colors hover:bg-muted">Center</button>
                <button type="button" className="px-4 py-2 text-sm font-medium transition-colors hover:bg-muted">Right</button>
              </ButtonGroup>
            </div>
          </div>
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
