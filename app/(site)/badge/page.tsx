"use client";

import { useState } from "react";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";
import Badge from "@/components/ui/Badge";
import { cn } from "@/lib/cn";
import { X } from "lucide-react";

const BADGE_SOURCE = `import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";

type Variant = "default" | "primary" | "secondary" | "success" | "warning" | "error" | "outline";
type Size = "sm" | "md" | "lg";

const variantClasses: Record<Variant, string> = {
  default: "bg-secondary text-secondary-foreground",
  primary: "bg-primary text-primary-foreground shadow-sm shadow-primary/20",
  secondary: "bg-secondary text-secondary-foreground",
  success: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-400/20",
  warning: "bg-amber-50 text-amber-700 ring-1 ring-amber-600/20 dark:bg-amber-500/10 dark:text-amber-400 dark:ring-amber-400/20",
  error: "bg-rose-50 text-rose-700 ring-1 ring-rose-600/20 dark:bg-rose-500/10 dark:text-rose-400 dark:ring-rose-400/20",
  outline: "border border-border text-foreground",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-2.5 py-0.5 text-sm",
  lg: "px-3 py-1 text-sm",
};

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: Variant;
  size?: Size;
  dot?: boolean;
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", size = "md", dot, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full font-medium whitespace-nowrap",
          "transition-colors duration-150",
          variantClasses[variant],
          sizeClasses[size],
          className,
        )}
        {...props}
      >
        {dot && (
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-40" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-current" />
          </span>
        )}
        {children}
      </span>
    );
  },
);
Badge.displayName = "Badge";

export default Badge;
export { Badge };`;

const VARIANTS = [
  { variant: "default" as const, label: "Default" },
  { variant: "primary" as const, label: "Primary" },
  { variant: "secondary" as const, label: "Secondary" },
  { variant: "success" as const, label: "Success" },
  { variant: "warning" as const, label: "Warning" },
  { variant: "error" as const, label: "Error" },
  { variant: "outline" as const, label: "Outline" },
];

const STATUSES = [
  { variant: "success" as const, label: "Online", dot: true },
  { variant: "warning" as const, label: "Away", dot: true },
  { variant: "error" as const, label: "Offline", dot: true },
  { variant: "primary" as const, label: "Active", dot: true },
];

function VariantsExample() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {VARIANTS.map((v) => (
        <Badge key={v.variant} variant={v.variant}>
          {v.label}
        </Badge>
      ))}
    </div>
  );
}

function SizesExample() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex flex-col items-center gap-1.5">
        <Badge size="sm">Small</Badge>
        <span className="text-[10px] text-muted-foreground">sm</span>
      </div>
      <div className="flex flex-col items-center gap-1.5">
        <Badge size="md">Medium</Badge>
        <span className="text-[10px] text-muted-foreground">md</span>
      </div>
      <div className="flex flex-col items-center gap-1.5">
        <Badge size="lg">Large</Badge>
        <span className="text-[10px] text-muted-foreground">lg</span>
      </div>
    </div>
  );
}

function IconsExample() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant="success">
        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
        Verified
      </Badge>
      <Badge variant="primary">
        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
        Featured
      </Badge>
      <Badge variant="warning">
        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        Popular
      </Badge>
      <Badge variant="outline">
        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        New
      </Badge>
    </div>
  );
}

function DismissibleExample() {
  const [visible, setVisible] = useState([true, true, true]);
  const badges = [
    { label: "New", variant: "primary" as const },
    { label: "Beta", variant: "secondary" as const },
    { label: "Updated", variant: "success" as const },
  ];

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        {badges.map((badge, i) =>
          visible[i] ? (
            <Badge key={badge.label} variant={badge.variant}>
              {badge.label}
              <button
                type="button"
                aria-label={`Dismiss ${badge.label}`}
                onClick={() => {
                  const next = [...visible];
                  next[i] = false;
                  setVisible(next);
                }}
                className={cn(
                  "ml-0.5 -mr-1 rounded-full p-0.5",
                  "transition-colors duration-150",
                  "hover:bg-foreground/10",
                  "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-current",
                )}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ) : null,
        )}
      </div>
      {!visible.every(Boolean) && (
        <button
          onClick={() => setVisible([true, true, true])}
          className="w-fit text-xs font-medium text-primary hover:underline"
        >
          Reset badges
        </button>
      )}
    </div>
  );
}

function DotStatusExample() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {STATUSES.map((s) => (
        <Badge key={s.label} variant={s.variant} dot>
          {s.label}
        </Badge>
      ))}
    </div>
  );
}

function PulsatingExample() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex items-center gap-2">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
        </span>
        <span className="text-sm text-muted-foreground">Bare dot</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-rose-500" />
        </span>
        <span className="text-sm text-muted-foreground">Bare dot</span>
      </div>
      <Badge variant="success">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
        Live
      </Badge>
      <Badge variant="error">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-500" />
        </span>
        Recording
      </Badge>
    </div>
  );
}

function UsageExample() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span className="text-sm text-foreground">Status:</span>
        <Badge variant="success" dot size="sm">Active</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-foreground">Role:</span>
        <Badge variant="primary" size="sm">Admin</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-foreground">Tags:</span>
        <Badge variant="outline" size="sm">react</Badge>
        <Badge variant="outline" size="sm">tailwind</Badge>
        <Badge variant="outline" size="sm">next.js</Badge>
      </div>
      <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
          JD
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-foreground">John Doe</span>
            <Badge variant="success" dot size="sm">Online</Badge>
          </div>
          <p className="text-xs text-muted-foreground">john@example.com</p>
        </div>
        <Badge variant="primary" size="sm">Admin</Badge>
      </div>
    </div>
  );
}

function PlaygroundDemo() {
  const [variant, setVariant] = useState<"default" | "primary" | "secondary" | "success" | "warning" | "error" | "outline">("primary");
  const [size, setSize] = useState<"sm" | "md" | "lg">("md");
  const [dot, setDot] = useState(false);
  const [text, setText] = useState("Badge");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-center py-4">
        <Badge variant={variant} size={size} dot={dot}>
          {text}
        </Badge>
      </div>

      <div className="flex flex-col gap-4">
        <div>
          <p className="mb-2 text-xs font-medium text-muted-foreground">Variant</p>
          <div className="flex flex-wrap gap-1.5">
            {VARIANTS.map((v) => (
              <button
                key={v.variant}
                onClick={() => setVariant(v.variant)}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  variant === v.variant
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-background text-foreground hover:bg-muted",
                )}
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs font-medium text-muted-foreground">Size</p>
          <div className="flex gap-1.5">
            {(["sm", "md", "lg"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  size === s
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-background text-foreground hover:bg-muted",
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-6">
          <div>
            <p className="mb-2 text-xs font-medium text-muted-foreground">Dot</p>
            <button
              onClick={() => setDot(!dot)}
              className={cn(
                "rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                dot
                  ? "bg-primary text-primary-foreground"
                  : "border border-border bg-background text-foreground hover:bg-muted",
              )}
            >
              {dot ? "On" : "Off"}
            </button>
          </div>
          <div className="flex-1">
            <p className="mb-2 text-xs font-medium text-muted-foreground">Text</p>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              placeholder="Badge text"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BadgePage() {
  return (
    <ComponentDocPage
      name="Badge"
      category="Elements"
      description="A versatile label component for status indicators, tags, and categories. Supports multiple variants, sizes, dot indicators, and dismissible state."
    >
      <PreviewPanel filename="badge-preview.tsx">
        <div className="flex flex-wrap items-center gap-2">
          {VARIANTS.map((v) => (
            <Badge key={v.variant} variant={v.variant}>
              {v.label}
            </Badge>
          ))}
        </div>
      </PreviewPanel>

      <SourceCodeViewer
        source={BADGE_SOURCE}
        filename="components/ui/Badge.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-8">
        <ExampleBlock
          title="Variants"
          description="Seven built-in variants for different semantic contexts."
          code={`<Badge variant="default">Default</Badge>
<Badge variant="primary">Primary</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="error">Error</Badge>
<Badge variant="outline">Outline</Badge>`}
        >
          <VariantsExample />
        </ExampleBlock>

        <ExampleBlock
          title="Sizes"
          description="Three size options: sm, md, and lg."
          code={`<Badge size="sm">Small</Badge>
<Badge size="md">Medium</Badge>
<Badge size="lg">Large</Badge>`}
        >
          <SizesExample />
        </ExampleBlock>

        <ExampleBlock
          title="With Icons"
          description="Combine badges with inline icons for richer context."
          code={`<Badge variant="success">
  <CheckIcon className="h-3 w-3" /> Verified
</Badge>
<Badge variant="primary">
  <StarIcon className="h-3 w-3" /> Featured
</Badge>`}
        >
          <IconsExample />
        </ExampleBlock>

        <ExampleBlock
          title="Dismissible"
          description="Badges that can be dismissed by the user."
          code={`<Badge variant="primary">
  New
  <button onClick={() => onDismiss()} className="ml-0.5 rounded-full p-0.5 hover:bg-foreground/10">
    <X className="h-3 w-3" />
  </button>
</Badge>`}
        >
          <DismissibleExample />
        </ExampleBlock>

        <ExampleBlock
          title="Dot Status"
          description="Animated dot indicators for real-time status."
          code={`<Badge variant="success" dot>Online</Badge>
<Badge variant="warning" dot>Away</Badge>
<Badge variant="error" dot>Offline</Badge>
<Badge variant="primary" dot>Active</Badge>`}
        >
          <DotStatusExample />
        </ExampleBlock>

        <ExampleBlock
          title="Pulsating"
          description="Animated ping indicators for live status."
          code={`<Badge variant="success">
  <span className="relative flex h-2 w-2">
    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
  </span>
  Live
</Badge>`}
        >
          <PulsatingExample />
        </ExampleBlock>

        <ExampleBlock
          title="Usage Patterns"
          description="Common badge patterns in real UIs."
          code={`<Badge variant="success" dot size="sm">Active</Badge>
<Badge variant="primary" size="sm">Admin</Badge>
<Badge variant="outline" size="sm">react</Badge>`}
        >
          <UsageExample />
        </ExampleBlock>

        <ExampleBlock
          title="Playground"
          description="Customize variant, size, dot, and text interactively."
          code={BADGE_SOURCE}
        >
          <PlaygroundDemo />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
