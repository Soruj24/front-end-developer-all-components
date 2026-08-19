"use client";

import {
  Skeleton,
  SkeletonCard,
  SkeletonListItem,
  SkeletonTable,
  SkeletonAvatar,
} from "@/components/ui/Skeleton";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";

const SKELETON_SOURCE = `import { HTMLAttributes } from "react";

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "circular" | "rectangular";
  width?: string | number;
  height?: string | number;
}

function Skeleton({ className = "", variant = "text", width, height, ...props }: SkeletonProps) {
  const variantClass =
    variant === "circular" ? "rounded-full" : variant === "rectangular" ? "rounded-lg" : "rounded-md h-4";
  return <div className={\`skeleton-shimmer \${variantClass} \${className}\`} style={{ width, height }} {...props} />;
}

function SkeletonCard({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={\`rounded-lg border border-border bg-surface p-4 \${className}\`} {...props}>
      <Skeleton variant="rectangular" width="100%" height={160} />
      <div className="mt-4 space-y-3">
        <Skeleton variant="text" width="60%" />
        <Skeleton variant="text" width="90%" />
        <Skeleton variant="text" width="40%" />
      </div>
    </div>
  );
}

function SkeletonListItem({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={\`flex items-center gap-3 px-4 py-3 \${className}\`} {...props}>
      <Skeleton variant="circular" width={40} height={40} />
      <div className="flex flex-1 flex-col gap-2">
        <Skeleton variant="text" width="40%" />
        <Skeleton variant="text" width="70%" />
      </div>
    </div>
  );
}

function SkeletonTable({ rows = 5, columns = 4, className = "" }: { rows?: number; columns?: number; className?: string }) {
  const colWidth = (i: number) => \`\${((i * 7) % 30) + 10}%\`;
  return (
    <div className={\`rounded-lg border border-border \${className}\`}>
      <div className="flex gap-4 border-b border-border bg-muted px-4 py-3">
        {Array.from({ length: columns }).map((_, i) => <Skeleton key={i} variant="text" width={colWidth(i)} />)}
      </div>
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} className="flex gap-4 border-b border-border px-4 py-3 last:border-0">
          {Array.from({ length: columns }).map((_, c) => <Skeleton key={c} variant="text" width={colWidth(r * 3 + c + 1)} />)}
        </div>
      ))}
    </div>
  );
}

function SkeletonAvatar({ size = 40, className = "" }: { size?: number; className?: string }) {
  return <Skeleton variant="circular" width={size} height={size} className={className} />;
}

export default Skeleton;
export { SkeletonCard, SkeletonListItem, SkeletonTable, SkeletonAvatar };`;

const TEXT_CODE = `<Skeleton className="h-4 w-72" />
<Skeleton className="h-4 w-full" />
<Skeleton className="h-4 w-3/4" />`;

const CIRCULAR_CODE = `<Skeleton variant="circular" width={40} height={40} />
<Skeleton variant="circular" width={56} height={56} />
<Skeleton variant="circular" width={80} height={80} />`;

const CARD_CODE = `<SkeletonCard />`;

const LIST_CODE = `<SkeletonListItem />\n<SkeletonListItem />\n<SkeletonListItem />`;

const TABLE_CODE = `<SkeletonTable rows={4} columns={4} />`;

export default function SkeletonPage() {
  return (
    <ComponentDocPage
      name="Skeleton"
      category="Feedback"
      description="Placeholder shapes that indicate content is loading. Supports text, circular, and rectangular variants along with composite layouts for cards, lists, tables, and avatars."
    >
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Preview</h2>
        <PreviewPanel filename="Skeleton.tsx">
          <div className="flex flex-col items-start gap-4">
            <Skeleton className="h-4 w-72" />
            <Skeleton className="h-4 w-full" />
            <Skeleton variant="circular" width={48} height={48} />
            <Skeleton variant="rectangular" width="100%" height={80} />
          </div>
        </PreviewPanel>
        <SourceCodeViewer source={SKELETON_SOURCE} filename="components/ui/Skeleton.tsx" defaultExpanded />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Examples</h2>

        <ExampleBlock title="Text" description="Lines of text with varying widths." code={TEXT_CODE} filename="TextExample.tsx">
          <div className="w-72 space-y-2">
            <Skeleton className="h-4 w-72" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </ExampleBlock>

        <ExampleBlock title="Circular" description="Round placeholders for avatars or icons." code={CIRCULAR_CODE} filename="CircularExample.tsx">
          <div className="flex items-end gap-4">
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="circular" width={56} height={56} />
            <Skeleton variant="circular" width={80} height={80} />
          </div>
        </ExampleBlock>

        <ExampleBlock title="Card" description="Pre-composed card skeleton with image and text lines." code={CARD_CODE} filename="CardExample.tsx">
          <SkeletonCard className="w-72" />
        </ExampleBlock>

        <ExampleBlock title="List" description="Pre-composed list rows with avatar and text lines." code={LIST_CODE} filename="ListExample.tsx">
          <div className="w-72 divide-y divide-border rounded-lg border border-border">
            <SkeletonListItem />
            <SkeletonListItem />
            <SkeletonListItem />
          </div>
        </ExampleBlock>

        <ExampleBlock title="Table" description="Pre-composed table skeleton with header and rows." code={TABLE_CODE} filename="TableExample.tsx">
          <SkeletonTable rows={3} columns={4} className="w-full" />
        </ExampleBlock>
      </section>
    </ComponentDocPage>
  );
}
