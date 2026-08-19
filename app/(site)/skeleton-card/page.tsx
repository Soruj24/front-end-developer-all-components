"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";

const SKELETONCARD_SOURCE = `"use client";

interface SkeletonCardProps {
  className?: string;
}

export function SkeletonCard({ className = "" }: SkeletonCardProps) {
  return (
    <div className={\`max-w-sm overflow-hidden rounded-lg border \${className}\`}>
      <div className="h-40 animate-pulse bg-muted" />
      <div className="space-y-3 p-4">
        <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
        <div className="h-3 w-full animate-pulse rounded bg-muted" />
        <div className="h-3 w-2/3 animate-pulse rounded bg-muted" />
      </div>
    </div>
  );
}`;

const SKELETON_EXAMPLE = `<SkeletonCard />`;

function SkeletonCardDemo() {
  return (
    <div className="w-full max-w-sm">
      <div className="max-w-sm overflow-hidden rounded-lg border">
        <div className="h-40 animate-pulse bg-muted" />
        <div className="space-y-3 p-4">
          <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
          <div className="h-3 w-full animate-pulse rounded bg-muted" />
          <div className="h-3 w-2/3 animate-pulse rounded bg-muted" />
        </div>
      </div>
    </div>
  );
}

export default function SkeletonCardPage() {
  return (
    <ComponentDocPage
      name="Skeleton Card"
      category="Feedback"
      description="A loading placeholder that mimics the shape of a card with image and text."
    >
      <PreviewPanel filename="skeleton-card.tsx">
        <SkeletonCardDemo />
      </PreviewPanel>

      <SourceCodeViewer
        source={SKELETONCARD_SOURCE}
        filename="components/ui/SkeletonCard/SkeletonCard.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Skeleton Card" description="Card-shaped loading placeholder with image and text lines." code={SKELETON_EXAMPLE}>
          <SkeletonCardDemo />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
