"use client";

import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";

const ICON_SOURCE = `import type { ReactNode } from "react";

type IconSize = "xs" | "sm" | "md" | "lg" | "xl";

interface IconProps {
  children: ReactNode;
  size?: IconSize;
  className?: string;
}

const sizeClasses: Record<IconSize, string> = {
  xs: "h-3 w-3",
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
  xl: "h-8 w-8",
};

export function Icon({ children, size = "md", className }: IconProps) {
  return (
    <span
      className={\`inline-flex items-center justify-center \${sizeClasses[size]} \${className ?? ""}\`}
    >
      {children}
    </span>
  );
}`;

const SIZES_SOURCE = `import { Icon } from "@/components/ui/Icon";

<div className="flex items-center gap-4">
  <Icon size="xs">XS</Icon>
  <Icon size="sm">SM</Icon>
  <Icon size="md">MD</Icon>
  <Icon size="lg">LG</Icon>
  <Icon size="xl">XL</Icon>
</div>`;

const CUSTOM_SOURCE = `import { Icon } from "@/components/ui/Icon";

<div className="flex items-center gap-4">
  <Icon size="lg" className="text-primary">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <circle cx="12" cy="12" r="10" />
    </svg>
  </Icon>
  <Icon size="lg" className="text-success">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  </Icon>
  <Icon size="lg" className="text-danger">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  </Icon>
</div>`;

const sizes: Record<string, string> = { xs: "h-3 w-3", sm: "h-4 w-4", md: "h-5 w-5", lg: "h-6 w-6", xl: "h-8 w-8" };

function I({ size = "md", className = "", children }: { size?: string; className?: string; children: React.ReactNode }) {
  return <span className={`inline-flex items-center justify-center ${sizes[size] || sizes.md} ${className}`}>{children}</span>;
}

const svg = (d: React.ReactNode) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">{d}</svg>
);

const Plus = () => svg(<><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></>);
const Star = () => svg(<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />);
const Heart = () => svg(<path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />);
const Bell = () => svg(<><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 01-3.46 0" /></>);

export default function IconButtonPage() {
  return (
    <ComponentDocPage
      name="Icon"
      category="Data Display"
      description="A lightweight wrapper for consistent icon sizing. Provides five size variants and accepts any SVG or icon child."
    >
      <PreviewPanel filename="icon-preview.tsx">
        <div className="flex items-center gap-4">
          <I size="xs"><Plus /></I>
          <I size="sm"><Plus /></I>
          <I size="md"><Plus /></I>
          <I size="lg"><Plus /></I>
          <I size="xl"><Plus /></I>
        </div>
      </PreviewPanel>

      <SourceCodeViewer source={ICON_SOURCE} filename="components/ui/Icon.tsx" defaultExpanded />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Sizes" description="Five size variants from xs to xl for different contexts." code={SIZES_SOURCE} filename="sizes.tsx">
          <div className="flex items-center gap-4">
            {(["xs", "sm", "md", "lg", "xl"] as const).map((s) => (
              <div key={s} className="flex flex-col items-center gap-1">
                <I size={s}><Star /></I>
                <span className="text-xs text-muted-foreground">{s}</span>
              </div>
            ))}
          </div>
        </ExampleBlock>

        <ExampleBlock title="Custom Styling" description="Apply custom colors and styles via className." code={CUSTOM_SOURCE} filename="custom.tsx">
          <div className="flex items-center gap-4">
            <I size="lg" className="text-primary"><Plus /></I>
            <I size="lg" className="text-success"><Heart /></I>
            <I size="lg" className="text-danger"><Bell /></I>
          </div>
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
