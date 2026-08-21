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
  gap?: 2 | 4 | 6 | 8;
  className?: string;
}

interface MasonryItemProps {
  children: React.ReactNode;
  className?: string;
}

const COLUMN_MAP = { 2: "columns-2", 3: "columns-3", 4: "columns-4" } as const;
const GAP_MAP = { 2: "gap-2", 4: "gap-4", 6: "gap-6", 8: "gap-8" } as const;

export function Masonry({ children, columns = 3, gap = 4, className }: MasonryProps) {
  return (
    <div className={cn("w-full", COLUMN_MAP[columns], GAP_MAP[gap] ?? \`gap-\${gap}\`, className)}>
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

const heights = ["h-32", "h-40", "h-48", "h-56", "h-36", "h-44", "h-52", "h-36", "h-48"];
const card = "rounded-2xl bg-card border border-border p-4 text-sm font-medium text-foreground shadow-sm hover:shadow-md transition-shadow duration-200";

export default function MasonryPage() {
  return (
    <ComponentDocPage
      name="Masonry"
      category="Layout"
      description="Pinterest-style masonry grid layout with variable height items. Supports 2, 3, or 4 columns with adjustable spacing."
    >
      <PreviewPanel filename="masonry-preview.tsx">
        <div className="w-full">
          <Masonry columns={3} gap={4}>
            {heights.map((h, i) => (
              <MasonryItem key={i}>
                <div className={`${card} ${h}`}>Card {i + 1}</div>
              </MasonryItem>
            ))}
          </Masonry>
        </div>
      </PreviewPanel>

      <SourceCodeViewer source={MASONRY_SOURCE} filename="components/ui/Masonry/Masonry.tsx" defaultExpanded />

      <section className="flex flex-col gap-8">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Examples
        </h2>

        <ExampleBlock
          title="2 Columns"
          description="Compact two-column layout for side-by-side content."
          code={`import { Masonry, MasonryItem } from "@/components/ui/Masonry";

<Masonry columns={2} gap={4}>
  <MasonryItem><div className="h-32">Card 1</div></MasonryItem>
  <MasonryItem><div className="h-40">Card 2</div></MasonryItem>
  <MasonryItem><div className="h-48">Card 3</div></MasonryItem>
  <MasonryItem><div className="h-36">Card 4</div></MasonryItem>
</Masonry>`}
          filename="two-columns.tsx"
        >
          <div className="w-full">
            <Masonry columns={2} gap={4}>
              {heights.slice(0, 4).map((h, i) => (
                <MasonryItem key={i}>
                  <div className={`${card} ${h}`}>Item {i + 1}</div>
                </MasonryItem>
              ))}
            </Masonry>
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="4 Columns"
          description="Dense four-column layout for large galleries."
          code={`<Masonry columns={4} gap={4}>
  {items.map((item) => (
    <MasonryItem key={item.id}>
      <div className="h-32">{item.title}</div>
    </MasonryItem>
  ))}
</Masonry>`}
          filename="four-columns.tsx"
        >
          <div className="w-full">
            <Masonry columns={4} gap={4}>
              {heights.map((h, i) => (
                <MasonryItem key={i}>
                  <div className={`${card} ${h}`}>Card {i + 1}</div>
                </MasonryItem>
              ))}
            </Masonry>
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Large Gap"
          description="Increased spacing between items."
          code={`<Masonry columns={3} gap={8}>
  {items.map((item) => (
    <MasonryItem key={item.id}>
      <div className="h-36">{item.title}</div>
    </MasonryItem>
  ))}
</Masonry>`}
          filename="large-gap.tsx"
        >
          <div className="w-full">
            <Masonry columns={3} gap={8}>
              {heights.slice(0, 6).map((h, i) => (
                <MasonryItem key={i}>
                  <div className={`${card} ${h}`}>Card {i + 1}</div>
                </MasonryItem>
              ))}
            </Masonry>
          </div>
        </ExampleBlock>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          API Reference
        </h2>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-left font-medium text-foreground">Prop</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Type</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Default</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Required</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">children</td>
                <td className="px-4 py-3 text-muted-foreground">ReactNode</td>
                <td className="px-4 py-3 text-muted-foreground">—</td>
                <td className="px-4 py-3 text-muted-foreground">Yes</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">columns</td>
                <td className="px-4 py-3 text-muted-foreground">2 | 3 | 4</td>
                <td className="px-4 py-3 text-muted-foreground">3</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">gap</td>
                <td className="px-4 py-3 text-muted-foreground">2 | 4 | 6 | 8</td>
                <td className="px-4 py-3 text-muted-foreground">4</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">className</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">—</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </ComponentDocPage>
  );
}
