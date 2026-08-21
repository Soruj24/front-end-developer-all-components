"use client";

import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";
import { Grid, GridItem } from "@/components/ui/Grid";

const GRID_SOURCE = `import { cn } from "@/lib/cn";
import type { GridProps, GridItemProps } from "./Grid.types";

export function Grid({ children, columns = 3, gap = 4, className }: GridProps) {
  return (
    <div className={cn("grid", \`gap-\${gap}\`, className)}
      style={{ gridTemplateColumns: \`repeat(\${columns}, minmax(0, 1fr))\` }}>
      {children}
    </div>
  );
}

export function GridItem({ children, span = 1, rowSpan = 1, className }: GridItemProps) {
  return (
    <div className={cn("min-w-0", className)}
      style={{ gridColumn: \`span \${span}\`, gridRow: \`span \${rowSpan}\` }}>
      {children}
    </div>
  );
}`;

const cell =
  "flex items-center justify-center rounded-xl border border-border bg-card p-4 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:bg-muted/50 hover:text-foreground";

const BASIC_SRC = `import { Grid, GridItem } from "@/components/ui/Grid";

<Grid columns={3}>
  <GridItem className="cell">1</GridItem>
  <GridItem className="cell">2</GridItem>
  <GridItem className="cell">3</GridItem>
  <GridItem className="cell">4</GridItem>
  <GridItem className="cell">5</GridItem>
  <GridItem className="cell">6</GridItem>
</Grid>`;

const SPAN_SRC = `import { Grid, GridItem } from "@/components/ui/Grid";

<Grid columns={4}>
  <GridItem span={4} className="cell">Full width (span 4)</GridItem>
  <GridItem span={2} className="cell">2 columns</GridItem>
  <GridItem className="cell">1 column</GridItem>
  <GridItem className="cell">1 column</GridItem>
</Grid>`;

const ROW_SPAN_SRC = `import { Grid, GridItem } from "@/components/ui/Grid";

<Grid columns={3}>
  <GridItem className="cell">Normal</GridItem>
  <GridItem rowSpan={2} className="cell h-full">Tall (2 rows)</GridItem>
  <GridItem className="cell">Normal</GridItem>
  <GridItem className="cell">Normal</GridItem>
</Grid>`;

const GAP_SRC = `import { Grid, GridItem } from "@/components/ui/Grid";

<Grid columns={3} gap={2}><GridItem className="cell">Tight</GridItem>...</Grid>
<Grid columns={3} gap={4}><GridItem className="cell">Default</GridItem>...</Grid>
<Grid columns={3} gap={8}><GridItem className="cell">Spacious</GridItem>...</Grid>`;

const DASHBOARD_SRC = `import { Grid, GridItem } from "@/components/ui/Grid";

<Grid columns={4} gap={4}>
  <GridItem span={2} rowSpan={2} className="card-large">Main Chart</GridItem>
  <GridItem className="card">Users: 1,234</GridItem>
  <GridItem className="card">Revenue: $48K</GridItem>
  <GridItem className="card">Orders: 892</GridItem>
  <GridItem className="card">Sessions: 14.2K</GridItem>
</Grid>`;

const RESPONSIVE_SRC = `import { Grid, GridItem } from "@/components/ui/Grid";

<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
  {items.map((item) => <GridItem key={item.id} className="cell">{item.name}</GridItem>)}
</div>`;

const NESTED_SRC = `import { Grid, GridItem } from "@/components/ui/Grid";

<Grid columns={3} gap={4}>
  <GridItem span={2} className="cell">
    <Grid columns={2} gap={2}>
      <GridItem className="cell">Nested 1</GridItem>
      <GridItem className="cell">Nested 2</GridItem>
    </Grid>
  </GridItem>
  <GridItem className="cell">Side</GridItem>
</Grid>`;

export default function GridPage() {
  return (
    <ComponentDocPage
      name="Grid"
      category="Layout"
      description="Responsive CSS grid layout with column/row spanning and gap customization. Ideal for dashboards, card layouts, and complex page structures."
    >
      <PreviewPanel filename="grid-preview.tsx">
        <Grid columns={3} gap={4}>
          <GridItem className={cell}>1</GridItem>
          <GridItem className={cell}>2</GridItem>
          <GridItem className={cell}>3</GridItem>
          <GridItem className={cell}>4</GridItem>
          <GridItem className={cell}>5</GridItem>
          <GridItem className={cell}>6</GridItem>
        </Grid>
      </PreviewPanel>

      <SourceCodeViewer
        source={GRID_SOURCE}
        filename="components/ui/Grid/Grid.tsx"
        defaultExpanded
      />

      <section className="flex flex-col gap-8">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Examples
        </h2>

        <ExampleBlock
          title="Basic Grid"
          description="Simple 3-column grid with equal-width items."
          code={BASIC_SRC}
          filename="basic.tsx"
        >
          <Grid columns={3} gap={4}>
            <GridItem className={cell}>1</GridItem>
            <GridItem className={cell}>2</GridItem>
            <GridItem className={cell}>3</GridItem>
            <GridItem className={cell}>4</GridItem>
            <GridItem className={cell}>5</GridItem>
            <GridItem className={cell}>6</GridItem>
          </Grid>
        </ExampleBlock>

        <ExampleBlock
          title="Column Spanning"
          description="Items spanning multiple columns."
          code={SPAN_SRC}
          filename="span.tsx"
        >
          <Grid columns={4} gap={4}>
            <GridItem span={4} className={cell}>
              Full width (span 4)
            </GridItem>
            <GridItem span={2} className={cell}>
              2 columns
            </GridItem>
            <GridItem className={cell}>1 column</GridItem>
            <GridItem className={cell}>1 column</GridItem>
          </Grid>
        </ExampleBlock>

        <ExampleBlock
          title="Row Spanning"
          description="Items spanning multiple rows."
          code={ROW_SPAN_SRC}
          filename="row-span.tsx"
        >
          <Grid columns={3} gap={4}>
            <GridItem className={cell}>Normal</GridItem>
            <GridItem rowSpan={2} className={`${cell} min-h-[148px]`}>
              Tall (2 rows)
            </GridItem>
            <GridItem className={cell}>Normal</GridItem>
            <GridItem className={cell}>Normal</GridItem>
          </Grid>
        </ExampleBlock>

        <ExampleBlock
          title="Gap Variants"
          description="Customizable spacing between grid items."
          code={GAP_SRC}
          filename="gap.tsx"
        >
          <div className="flex flex-col gap-4">
            <Grid columns={3} gap={2}>
              <GridItem className={cell}>Tight</GridItem>
              <GridItem className={cell}>Tight</GridItem>
              <GridItem className={cell}>Tight</GridItem>
            </Grid>
            <Grid columns={3} gap={4}>
              <GridItem className={cell}>Default</GridItem>
              <GridItem className={cell}>Default</GridItem>
              <GridItem className={cell}>Default</GridItem>
            </Grid>
            <Grid columns={3} gap={8}>
              <GridItem className={cell}>Spacious</GridItem>
              <GridItem className={cell}>Spacious</GridItem>
              <GridItem className={cell}>Spacious</GridItem>
            </Grid>
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Dashboard Layout"
          description="Common dashboard widget pattern with mixed spanning."
          code={DASHBOARD_SRC}
          filename="dashboard.tsx"
        >
          <Grid columns={4} gap={4}>
            <GridItem
              span={2}
              rowSpan={2}
              className="col-span-2 row-span-2 flex items-center justify-center rounded-2xl border border-border bg-gradient-to-br from-primary/10 to-primary/5 p-4 text-sm font-medium text-primary"
            >
              Main Chart
            </GridItem>
            <GridItem className="flex items-center justify-center rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-medium text-emerald-700 dark:border-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400">
              Users: 1,234
            </GridItem>
            <GridItem className="flex items-center justify-center rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm font-medium text-blue-700 dark:border-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
              Revenue: $48K
            </GridItem>
            <GridItem className="flex items-center justify-center rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm font-medium text-amber-700 dark:border-amber-800 dark:bg-amber-900/20 dark:text-amber-400">
              Orders: 892
            </GridItem>
            <GridItem className="flex items-center justify-center rounded-xl border border-purple-200 bg-purple-50 p-4 text-sm font-medium text-purple-700 dark:border-purple-800 dark:bg-purple-900/20 dark:text-purple-400">
              Sessions: 14.2K
            </GridItem>
          </Grid>
        </ExampleBlock>

        <ExampleBlock
          title="Responsive"
          description="Adapts from 1 to 4 columns based on screen width."
          code={RESPONSIVE_SRC}
          filename="responsive.tsx"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }, (_, i) => (
              <div key={i} className={cell}>
                Responsive {i + 1}
              </div>
            ))}
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Nested Grid"
          description="Grid items containing inner grids for complex layouts."
          code={NESTED_SRC}
          filename="nested.tsx"
        >
          <Grid columns={3} gap={4}>
            <GridItem span={2} className="min-h-[100px]">
              <Grid columns={2} gap={2}>
                <div className={cell}>Nested 1</div>
                <div className={cell}>Nested 2</div>
              </Grid>
            </GridItem>
            <GridItem className={cell}>Side</GridItem>
          </Grid>
        </ExampleBlock>
      </section>
    </ComponentDocPage>
  );
}
