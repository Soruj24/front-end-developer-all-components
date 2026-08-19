"use client";

import { Masonry, MasonryItem } from "@/components/ui/Masonry";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";

const MASONRY_SOURCE = `import { cn } from "@/lib/cn";

interface MasonryProps {
  children: React.ReactNode;
  columns?: 2 | 3 | 4;
  gap?: number;
  className?: string;
}

interface MasonryItemProps {
  children: React.ReactNode;
  className?: string;
}

export function Masonry({ children, gap = 4, className }: MasonryProps) {
  return (
    <div
      className={cn("columns-2 md:columns-3 lg:columns-4", \`gap-\${gap}\`, className)}
    >
      {children}
    </div>
  );
}

export function MasonryItem({ children, className }: MasonryItemProps) {
  return (
    <div className={cn("break-inside-avoid mb-4", className)}>
      {children}
    </div>
  );
}`;

const BASIC_EXAMPLE = `<Masonry>
  <MasonryItem><div className="h-32 rounded-lg bg-muted p-4">Card 1</div></MasonryItem>
  <MasonryItem><div className="h-40 rounded-lg bg-muted p-4">Card 2</div></MasonryItem>
  <MasonryItem><div className="h-48 rounded-lg bg-muted p-4">Card 3</div></MasonryItem>
</Masonry>`;

const COLUMNS_EXAMPLE = `<Masonry columns={2}>
  {items.map((item) => (
    <MasonryItem key={item.id}>
      <div className="rounded-lg bg-muted p-4">{item.title}</div>
    </MasonryItem>
  ))}
</Masonry>`;

const GAP_EXAMPLE = `<Masonry gap={8}>
  {items.map((item) => (
    <MasonryItem key={item.id}>
      <div className="rounded-lg bg-muted p-4">{item.title}</div>
    </MasonryItem>
  ))}
</Masonry>`;

const heights = ["h-32", "h-40", "h-48", "h-56", "h-36", "h-44", "h-52", "h-36", "h-48"];
const card = "rounded-lg bg-muted p-4 text-sm font-medium text-muted-foreground dark:bg-muted/50";

export default function MasonryPage() {
  return (
    <ComponentDocPage
      name="Masonry"
      category="Layout"
      description="Pinterest-style masonry grid layout with variable height items. Perfect for image galleries, blog feeds, and card collections."
    >
      <PreviewPanel filename="masonry-preview">
        <div className="w-full">
          <Masonry>
            {heights.map((h, i) => (
              <MasonryItem key={i}>
                <div className={`${card} ${h}`}>Card {i + 1}</div>
              </MasonryItem>
            ))}
          </Masonry>
        </div>
      </PreviewPanel>

      <SourceCodeViewer source={MASONRY_SOURCE} filename="Masonry.tsx" defaultExpanded />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Basic" description="Default 3-column masonry grid." code={BASIC_EXAMPLE}>
          <div className="w-full max-w-2xl">
            <Masonry>
              <MasonryItem><div className={`${card} h-32`}>Card 1</div></MasonryItem>
              <MasonryItem><div className={`${card} h-40`}>Card 2</div></MasonryItem>
              <MasonryItem><div className={`${card} h-48`}>Card 3</div></MasonryItem>
            </Masonry>
          </div>
        </ExampleBlock>

        <ExampleBlock title="Columns" description="Control the number of columns (2, 3, or 4)." code={COLUMNS_EXAMPLE}>
          <div className="w-full max-w-2xl">
            <Masonry columns={2}>
              {heights.slice(0, 4).map((h, i) => (
                <MasonryItem key={i}>
                  <div className={`${card} ${h}`}>Item {i + 1}</div>
                </MasonryItem>
              ))}
            </Masonry>
          </div>
        </ExampleBlock>

        <ExampleBlock title="Gap" description="Adjust spacing between items." code={GAP_EXAMPLE}>
          <div className="w-full max-w-2xl">
            <Masonry gap={8}>
              {heights.slice(0, 4).map((h, i) => (
                <MasonryItem key={i}>
                  <div className={`${card} ${h}`}>Item {i + 1}</div>
                </MasonryItem>
              ))}
            </Masonry>
          </div>
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
