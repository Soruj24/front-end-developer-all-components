"use client";

import { useState } from "react";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";

const BADGE_SOURCE = `import { HTMLAttributes, forwardRef } from "react";

type Variant = "default" | "primary" | "secondary" | "success" | "warning" | "error" | "outline";
type Size = "sm" | "md" | "lg";

const variantClasses: Record<Variant, string> = {
  default: "bg-secondary text-secondary-foreground",
  primary: "bg-primary text-primary-foreground",
  secondary: "bg-secondary text-secondary-foreground",
  success: "bg-success-soft text-success border border-success/25",
  warning: "bg-warning-soft text-warning border border-warning/25",
  error: "bg-danger-soft text-danger border border-danger/25",
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
  ({ className = "", variant = "default", size = "md", dot, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={\`inline-flex items-center gap-1.5 rounded-full font-medium \${variantClasses[variant]} \${sizeClasses[size]} \${className}\`}
        {...props}
      >
        {dot && <span className="h-1.5 w-1.5 rounded-full bg-current" />}
        {children}
      </span>
    );
  }
);
Badge.displayName = "Badge";

export default Badge;`;

const VARIANTS_SOURCE = `import Badge from "@/components/ui/Badge";

function BadgesShowcase() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Badge variant="default">Default</Badge>
      <Badge variant="primary">Primary</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="error">Error</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  );
}`;

const SIZES_SOURCE = `import Badge from "@/components/ui/Badge";

function SizesShowcase() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size="lg">Large</Badge>
    </div>
  );
}`;

const WITH_ICONS_SOURCE = `import Badge from "@/components/ui/Badge";
import { CheckIcon, StarIcon } from "lucide-react";

function IconsShowcase() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Badge variant="success">
        <CheckIcon className="h-3 w-3" />
        Verified
      </Badge>
      <Badge variant="primary">
        <StarIcon className="h-3 w-3" />
        Featured
      </Badge>
      <Badge variant="warning">
        <StarIcon className="h-3 w-3" />
        Popular
      </Badge>
    </div>
  );
}`;

const DISMISSIBLE_SOURCE = `"use client";

import { useState } from "react";
import Badge from "@/components/ui/Badge";

function DismissibleShowcase() {
  const [visible, setVisible] = useState([true, true, true]);
  const labels = ["New", "Beta", "Updated"];

  return (
    <div className="flex flex-wrap items-center gap-3">
      {labels.map((label, i) =>
        visible[i] ? (
          <Badge key={label} variant={i === 0 ? "primary" : i === 1 ? "secondary" : "success"}>
            {label}
            <button
              onClick={() => {
                const next = [...visible];
                next[i] = false;
                setVisible(next);
              }}
              className="ml-1 rounded-full p-0.5 hover:bg-black/10"
            >
              ✕
            </button>
          </Badge>
        ) : null
      )}
    </div>
  );
}`;

const DOT_SOURCE = `import Badge from "@/components/ui/Badge";

function DotShowcase() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Badge variant="success" dot>Online</Badge>
      <Badge variant="warning" dot>Away</Badge>
      <Badge variant="error" dot>Offline</Badge>
      <Badge variant="primary" dot>Active</Badge>
    </div>
  );
}`;

const PULSATING_SOURCE = `import Badge from "@/components/ui/Badge";

function PulsatingShowcase() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <span className="relative flex h-3 w-3">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
        <span className="relative inline-flex h-3 w-3 rounded-full bg-success" />
      </span>
      <span className="relative flex h-3 w-3">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
        <span className="relative inline-flex h-3 w-3 rounded-full bg-danger" />
      </span>
      <Badge variant="success">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
        </span>
        Live
      </Badge>
      <Badge variant="error">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-danger" />
        </span>
        Recording
      </Badge>
    </div>
  );
}`;

function StarIcon() {
  return (
    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg className="h-3 w-3 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function InlineBadge({
  variant = "default",
  size = "md",
  dot,
  children,
  className = "",
}: {
  variant?: string;
  size?: string;
  dot?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  const variantClasses: Record<string, string> = {
    default: "bg-secondary text-secondary-foreground",
    primary: "bg-primary text-primary-foreground",
    secondary: "bg-secondary text-secondary-foreground",
    success: "bg-success-soft text-success border border-success/25",
    warning: "bg-warning-soft text-warning border border-warning/25",
    error: "bg-danger-soft text-danger border border-danger/25",
    outline: "border border-border text-foreground",
  };
  const sizeClasses: Record<string, string> = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-0.5 text-sm",
    lg: "px-3 py-1 text-sm",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-medium ${variantClasses[variant] || variantClasses.default} ${sizeClasses[size] || sizeClasses.md} ${className}`}
    >
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
}

export default function BadgePage() {
  const [visibleBadges, setVisibleBadges] = useState([true, true, true]);

  return (
    <ComponentDocPage
      name="Badge"
      category="Elements"
      description="A versatile label component for status indicators, tags, and categories. Supports multiple variants, sizes, dot indicators, and dismissible state."
    >
      <PreviewPanel filename="badge-preview.tsx">
        <div className="flex flex-wrap items-center gap-3">
          <InlineBadge variant="default">Default</InlineBadge>
          <InlineBadge variant="primary">Primary</InlineBadge>
          <InlineBadge variant="secondary">Secondary</InlineBadge>
          <InlineBadge variant="success">Success</InlineBadge>
          <InlineBadge variant="warning">Warning</InlineBadge>
          <InlineBadge variant="error">Error</InlineBadge>
          <InlineBadge variant="outline">Outline</InlineBadge>
        </div>
      </PreviewPanel>

      <SourceCodeViewer
        source={BADGE_SOURCE}
        filename="components/ui/Badge.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock
          title="Variants"
          description="Seven built-in variants for different semantic contexts."
          code={VARIANTS_SOURCE}
          filename="variants.tsx"
        >
          <div className="flex flex-wrap items-center gap-3">
            <InlineBadge variant="default">Default</InlineBadge>
            <InlineBadge variant="primary">Primary</InlineBadge>
            <InlineBadge variant="secondary">Secondary</InlineBadge>
            <InlineBadge variant="success">Success</InlineBadge>
            <InlineBadge variant="warning">Warning</InlineBadge>
            <InlineBadge variant="error">Error</InlineBadge>
            <InlineBadge variant="outline">Outline</InlineBadge>
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Sizes"
          description="Three size options: sm, md, and lg."
          code={SIZES_SOURCE}
          filename="sizes.tsx"
        >
          <div className="flex flex-wrap items-center gap-3">
            <InlineBadge size="sm">Small</InlineBadge>
            <InlineBadge size="md">Medium</InlineBadge>
            <InlineBadge size="lg">Large</InlineBadge>
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="With Icons"
          description="Combine badges with inline icons for richer context."
          code={WITH_ICONS_SOURCE}
          filename="with-icons.tsx"
        >
          <div className="flex flex-wrap items-center gap-3">
            <InlineBadge variant="success">
              <CheckIcon /> Verified
            </InlineBadge>
            <InlineBadge variant="primary">
              <StarIcon /> Featured
            </InlineBadge>
            <InlineBadge variant="warning">
              <StarIcon /> Popular
            </InlineBadge>
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Dismissible"
          description="Badges that can be dismissed by the user."
          code={DISMISSIBLE_SOURCE}
          filename="dismissible.tsx"
        >
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-3">
              {[
                { label: "New", variant: "primary" },
                { label: "Beta", variant: "secondary" },
                { label: "Updated", variant: "success" },
              ].map((badge, i) =>
                visibleBadges[i] ? (
                  <InlineBadge key={badge.label} variant={badge.variant}>
                    {badge.label}
                    <button
                      type="button"
                      aria-label={`Dismiss ${badge.label} badge`}
                      onClick={() => {
                        const next = [...visibleBadges];
                        next[i] = false;
                        setVisibleBadges(next);
                      }}
                      className="ml-0.5 rounded-full p-0.5 hover:bg-black/10"
                    >
                      <XIcon />
                    </button>
                  </InlineBadge>
                ) : null
              )}
            </div>
            {!visibleBadges.every(Boolean) && (
              <button
                onClick={() => setVisibleBadges([true, true, true])}
                className="w-fit text-sm text-primary hover:underline"
              >
                Reset badges
              </button>
            )}
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Dot Status"
          description="Compact dot indicators for status displays."
          code={DOT_SOURCE}
          filename="dot-status.tsx"
        >
          <div className="flex flex-wrap items-center gap-3">
            <InlineBadge variant="success" dot>Online</InlineBadge>
            <InlineBadge variant="warning" dot>Away</InlineBadge>
            <InlineBadge variant="error" dot>Offline</InlineBadge>
            <InlineBadge variant="primary" dot>Active</InlineBadge>
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Pulsating"
          description="Animated pulsating indicators for real-time status."
          code={PULSATING_SOURCE}
          filename="pulsating.tsx"
        >
          <div className="flex flex-wrap items-center gap-4">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-success" />
            </span>
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-danger" />
            </span>
            <InlineBadge variant="success">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
              </span>
              Live
            </InlineBadge>
            <InlineBadge variant="error">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-danger" />
              </span>
              Recording
            </InlineBadge>
          </div>
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
