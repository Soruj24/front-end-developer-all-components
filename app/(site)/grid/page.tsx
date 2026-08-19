"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { Grid, GridItem } from "@/components/ui/Grid";

const GRID_SOURCE = `import { cn } from "@/lib/cn";

type GridProps = {
  children: React.ReactNode;
  columns?: number;
  gap?: number;
  className?: string;
};

type GridItemProps = {
  children: React.ReactNode;
  span?: number;
  rowSpan?: number;
  className?: string;
};

function Grid({ children, columns = 3, gap = 4, className }: GridProps) {
  return (
    <div
      className={cn("grid", \`gap-\${gap}\`, className)}
      style={{ gridTemplateColumns: \`repeat(\${columns}, minmax(0, 1fr))\` }}
    >
      {children}
    </div>
  );
}

function GridItem({ children, span = 1, rowSpan = 1, className }: GridItemProps) {
  return (
    <div
      className={cn(className)}
      style={{ gridColumn: \`span \${span}\`, gridRow: \`span \${rowSpan}\` }}
    >
      {children}
    </div>
  );
}

export { Grid, GridItem };`;

const CARD = "flex items-center justify-center rounded-lg bg-muted p-4 text-sm font-medium text-muted-foreground";

const BASIC_SOURCE = `import { Grid, GridItem } from "@/components/ui/Grid";

<Grid columns={3}>
  <GridItem className="${CARD}">1</GridItem>
  <GridItem className="${CARD}">2</GridItem>
  <GridItem className="${CARD}">3</GridItem>
</Grid>`;

const SPAN_SOURCE = `import { Grid, GridItem } from "@/components/ui/Grid";

<Grid columns={3}>
  <GridItem span={3} className="${CARD}">Full width</GridItem>
  <GridItem span={2} className="${CARD}">2 columns</GridItem>
  <GridItem className="${CARD}">1 column</GridItem>
</Grid>`;

const GAP_SOURCE = `import { Grid, GridItem } from "@/components/ui/Grid";

<Grid columns={3} gap={2}>
  <GridItem className="${CARD}">Gap 2</GridItem>
</Grid>
<Grid columns={3} gap={8}>
  <GridItem className="${CARD}">Gap 8</GridItem>
</Grid>`;

const DASHBOARD_SOURCE = `import { Grid, GridItem } from "@/components/ui/Grid";

<Grid columns={4} gap={4}>
  <GridItem span={2} rowSpan={2} className="...">
    Main Chart
  </GridItem>
  <GridItem className="...">Users: 1,234</GridItem>
  <GridItem className="...">Revenue: $48K</GridItem>
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
          <GridItem className={CARD}>1</GridItem>
          <GridItem className={CARD}>2</GridItem>
          <GridItem className={CARD}>3</GridItem>
          <GridItem className={CARD}>4</GridItem>
          <GridItem className={CARD}>5</GridItem>
          <GridItem className={CARD}>6</GridItem>
        </Grid>
      </PreviewPanel>

      <SourceCodeViewer source={GRID_SOURCE} filename="components/ui/Grid.tsx" defaultExpanded />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Basic Grid" description="Simple 3-column grid with equal-width items." code={BASIC_SOURCE}>
          <Grid columns={3} gap={4}>
            <GridItem className={CARD}>1</GridItem>
            <GridItem className={CARD}>2</GridItem>
            <GridItem className={CARD}>3</GridItem>
            <GridItem className={CARD}>4</GridItem>
            <GridItem className={CARD}>5</GridItem>
            <GridItem className={CARD}>6</GridItem>
          </Grid>
        </ExampleBlock>

        <ExampleBlock title="Column Spanning" description="Items spanning multiple columns." code={SPAN_SOURCE}>
          <Grid columns={3} gap={4}>
            <GridItem span={3} className={CARD}>Full width (span 3)</GridItem>
            <GridItem span={2} className={CARD}>2 columns wide</GridItem>
            <GridItem className={CARD}>1 column</GridItem>
            <GridItem className={CARD}>1 column</GridItem>
            <GridItem span={2} className={CARD}>2 columns wide</GridItem>
          </Grid>
        </ExampleBlock>

        <ExampleBlock title="Row Spanning" description="Items spanning multiple rows." code={SPAN_SOURCE}>
          <Grid columns={3} gap={4}>
            <GridItem className={CARD}>Normal</GridItem>
            <GridItem rowSpan={2} className={`${CARD} row-span-2`}>Tall (2 rows)</GridItem>
            <GridItem className={CARD}>Normal</GridItem>
            <GridItem className={CARD}>Normal</GridItem>
            <GridItem className={CARD}>Normal</GridItem>
          </Grid>
        </ExampleBlock>

        <ExampleBlock title="Gap Variants" description="Customizable spacing between grid items." code={GAP_SOURCE}>
          <div className="flex flex-col gap-4">
            <Grid columns={3} gap={2}>
              <GridItem className={CARD}>Gap 2</GridItem>
              <GridItem className={CARD}>Gap 2</GridItem>
              <GridItem className={CARD}>Gap 2</GridItem>
            </Grid>
            <Grid columns={3} gap={4}>
              <GridItem className={CARD}>Gap 4</GridItem>
              <GridItem className={CARD}>Gap 4</GridItem>
              <GridItem className={CARD}>Gap 4</GridItem>
            </Grid>
            <Grid columns={3} gap={8}>
              <GridItem className={CARD}>Gap 8</GridItem>
              <GridItem className={CARD}>Gap 8</GridItem>
              <GridItem className={CARD}>Gap 8</GridItem>
            </Grid>
          </div>
        </ExampleBlock>

        <ExampleBlock title="Dashboard Layout" description="Common dashboard widget pattern with mixed spanning." code={DASHBOARD_SOURCE}>
          <Grid columns={4} gap={4}>
            <GridItem span={2} rowSpan={2} className="col-span-2 row-span-2 flex items-center justify-center rounded-lg bg-primary/10 p-4 text-sm font-medium text-primary">
              Main Chart
            </GridItem>
            <GridItem className="flex items-center justify-center rounded-lg bg-green-50 p-4 text-sm font-medium text-green-700 dark:bg-green-900/20">
              Users: 1,234
            </GridItem>
            <GridItem className="flex items-center justify-center rounded-lg bg-blue-50 p-4 text-sm font-medium text-blue-700 dark:bg-blue-900/20">
              Revenue: $48K
            </GridItem>
            <GridItem className="flex items-center justify-center rounded-lg bg-amber-50 p-4 text-sm font-medium text-amber-700 dark:bg-amber-900/20">
              Orders: 892
            </GridItem>
            <GridItem className="flex items-center justify-center rounded-lg bg-purple-50 p-4 text-sm font-medium text-purple-700 dark:bg-purple-900/20">
              Sessions: 14.2K
            </GridItem>
          </Grid>
        </ExampleBlock>

        <ExampleBlock title="Responsive" description="Adapts from 1 to 4 columns based on screen width." code={BASIC_SOURCE}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }, (_, i) => (
              <div key={i} className={CARD}>Responsive {i + 1}</div>
            ))}
          </div>
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
