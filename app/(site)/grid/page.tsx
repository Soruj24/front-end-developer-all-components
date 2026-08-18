"use client";

import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Grid, GridItem } from "@/components/ui/Grid";

const installCommand = `npx component-library@latest add grid`;

const usageCode = `import { Grid, GridItem } from "@/components/ui/Grid";

<Grid columns={3} gap={4}>
  <GridItem>Item 1</GridItem>
  <GridItem span={2}>Wide item</GridItem>
  <GridItem>Tall item</GridItem>
</Grid>`;

const cardClass = "flex items-center justify-center rounded-lg bg-muted p-4 text-sm font-medium text-muted-foreground dark:bg-muted/50";

function GridBasic() {
  return (
    <Grid columns={3}>
      <GridItem className={cardClass}>1</GridItem>
      <GridItem className={cardClass}>2</GridItem>
      <GridItem className={cardClass}>3</GridItem>
      <GridItem className={cardClass}>4</GridItem>
      <GridItem className={cardClass}>5</GridItem>
      <GridItem className={cardClass}>6</GridItem>
    </Grid>
  );
}

function GridTwoColumns() {
  return (
    <Grid columns={2}>
      <GridItem className={cardClass}>Column 1</GridItem>
      <GridItem className={cardClass}>Column 2</GridItem>
      <GridItem className={cardClass}>Column 1</GridItem>
      <GridItem className={cardClass}>Column 2</GridItem>
    </Grid>
  );
}

function GridFourColumns() {
  return (
    <Grid columns={4}>
      <GridItem className={cardClass}>1</GridItem>
      <GridItem className={cardClass}>2</GridItem>
      <GridItem className={cardClass}>3</GridItem>
      <GridItem className={cardClass}>4</GridItem>
      <GridItem className={cardClass}>5</GridItem>
      <GridItem className={cardClass}>6</GridItem>
      <GridItem className={cardClass}>7</GridItem>
      <GridItem className={cardClass}>8</GridItem>
    </Grid>
  );
}

function GridSpanning() {
  return (
    <Grid columns={3}>
      <GridItem span={3} className={cardClass}>Full width (span 3)</GridItem>
      <GridItem span={2} className={cardClass}>2 columns wide</GridItem>
      <GridItem className={cardClass}>1 column</GridItem>
      <GridItem className={cardClass}>1 column</GridItem>
      <GridItem span={2} className={cardClass}>2 columns wide</GridItem>
    </Grid>
  );
}

function GridRowSpanning() {
  return (
    <Grid columns={3}>
      <GridItem className={cardClass}>Normal</GridItem>
      <GridItem rowSpan={2} className="col-span-1 row-span-2 flex items-center justify-center rounded-lg bg-muted p-4 text-sm font-medium text-muted-foreground dark:bg-muted/50">
        Tall (2 rows)
      </GridItem>
      <GridItem className={cardClass}>Normal</GridItem>
      <GridItem className={cardClass}>Normal</GridItem>
      <GridItem className={cardClass}>Normal</GridItem>
    </Grid>
  );
}

function GridResponsive() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 8 }, (_, i) => (
        <div key={i} className={cardClass}>Responsive {i + 1}</div>
      ))}
    </div>
  );
}

function GridAutoFlow() {
  return (
    <div className="grid grid-cols-4 auto-rows-[80px] gap-4">
      <GridItem className={cardClass}>1</GridItem>
      <GridItem className={cardClass}>2</GridItem>
      <GridItem className={cardClass}>3</GridItem>
      <GridItem className={cardClass}>4</GridItem>
      <GridItem span={2} rowSpan={2} className="col-span-2 row-span-2 flex items-center justify-center rounded-lg bg-muted p-4 text-sm font-medium text-muted-foreground dark:bg-muted/50">
        2x2 Block
      </GridItem>
      <GridItem className={cardClass}>6</GridItem>
      <GridItem className={cardClass}>7</GridItem>
      <GridItem className={cardClass}>8</GridItem>
    </div>
  );
}

function GridGapVariants() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="mb-2 text-xs font-medium text-muted-foreground">Gap: 2</p>
        <Grid columns={3} gap={2}>
          <GridItem className={cardClass}>A</GridItem>
          <GridItem className={cardClass}>B</GridItem>
          <GridItem className={cardClass}>C</GridItem>
        </Grid>
      </div>
      <div>
        <p className="mb-2 text-xs font-medium text-muted-foreground">Gap: 4</p>
        <Grid columns={3} gap={4}>
          <GridItem className={cardClass}>A</GridItem>
          <GridItem className={cardClass}>B</GridItem>
          <GridItem className={cardClass}>C</GridItem>
        </Grid>
      </div>
      <div>
        <p className="mb-2 text-xs font-medium text-muted-foreground">Gap: 8</p>
        <Grid columns={3} gap={8}>
          <GridItem className={cardClass}>A</GridItem>
          <GridItem className={cardClass}>B</GridItem>
          <GridItem className={cardClass}>C</GridItem>
        </Grid>
      </div>
    </div>
  );
}

function GridDashboard() {
  return (
    <Grid columns={4} gap={4}>
      <GridItem span={2} rowSpan={2} className="col-span-2 row-span-2 flex items-center justify-center rounded-lg bg-primary/10 p-4 text-sm font-medium text-primary dark:bg-primary/20">
        Main Chart
      </GridItem>
      <GridItem className="flex items-center justify-center rounded-lg bg-green-50 p-4 text-sm font-medium text-green-700 dark:bg-green-900/20 dark:text-green-400">
        Users: 1,234
      </GridItem>
      <GridItem className="flex items-center justify-center rounded-lg bg-blue-50 p-4 text-sm font-medium text-blue-700 dark:bg-blue-900/20 dark:text-blue-400">
        Revenue: $48K
      </GridItem>
      <GridItem className="flex items-center justify-center rounded-lg bg-amber-50 p-4 text-sm font-medium text-amber-700 dark:bg-amber-900/20 dark:text-amber-400">
        Orders: 892
      </GridItem>
      <GridItem className="flex items-center justify-center rounded-lg bg-purple-50 p-4 text-sm font-medium text-purple-700 dark:bg-purple-900/20 dark:text-purple-400">
        Sessions: 14.2K
      </GridItem>
    </Grid>
  );
}

function GridCardLayout() {
  const cards = [
    { title: "Analytics", desc: "Track your metrics", color: "bg-blue-50 dark:bg-blue-900/20" },
    { title: "Users", desc: "Manage people", color: "bg-green-50 dark:bg-green-900/20" },
    { title: "Revenue", desc: "Financial data", color: "bg-amber-50 dark:bg-amber-900/20" },
    { title: "Reports", desc: "Generate reports", color: "bg-purple-50 dark:bg-purple-900/20" },
    { title: "Settings", desc: "Configuration", color: "bg-gray-50 dark:bg-gray-900/20" },
    { title: "Help", desc: "Support center", color: "bg-red-50 dark:bg-red-900/20" },
  ];

  return (
    <Grid columns={3}>
      {cards.map((card) => (
        <GridItem key={card.title} className={`rounded-lg p-4 ${card.color}`}>
          <div className="text-sm font-medium">{card.title}</div>
          <div className="mt-1 text-xs text-muted-foreground">{card.desc}</div>
        </GridItem>
      ))}
    </Grid>
  );
}

export default function GridPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Grid</h1>
          <Badge variant="primary">Layout</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Responsive CSS grid layout system with column spanning, row spanning, and gap customization. Perfect for dashboards, card layouts, and complex page structures.
        </p>
      </header>

      {/* Installation */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Installation</h2>
        <CodeBlock code={installCommand} filename="Terminal" label="bash" variant="terminal" />
      </section>

      {/* Usage */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} filename="page.tsx" label="tsx" />
      </section>

      {/* Basic Grid */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Basic Grid</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Simple 3-column grid with equal-width items.
          </p>
        </div>
        <ComponentPreview id="grid-basic">
          <GridBasic />
        </ComponentPreview>
      </section>

      {/* Two Columns */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Two Columns</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Side-by-side 2-column layout.
          </p>
        </div>
        <ComponentPreview id="grid-two-columns">
          <GridTwoColumns />
        </ComponentPreview>
      </section>

      {/* Four Columns */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Four Columns</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Dense 4-column grid for compact layouts.
          </p>
        </div>
        <ComponentPreview id="grid-four-columns">
          <GridFourColumns />
        </ComponentPreview>
      </section>

      {/* Column Spanning */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Column Spanning</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Items that span multiple columns.
          </p>
        </div>
        <ComponentPreview id="grid-column-spanning">
          <GridSpanning />
        </ComponentPreview>
      </section>

      {/* Row Spanning */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Row Spanning</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Items that span multiple rows.
          </p>
        </div>
        <ComponentPreview id="grid-row-spanning">
          <GridRowSpanning />
        </ComponentPreview>
      </section>

      {/* Responsive */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Responsive Grid</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Adapts from 1 to 4 columns based on screen width.
          </p>
        </div>
        <ComponentPreview id="grid-responsive">
          <GridResponsive />
        </ComponentPreview>
      </section>

      {/* Auto Flow */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Auto Flow</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Mixed spanning with automatic placement.
          </p>
        </div>
        <ComponentPreview id="grid-auto-flow">
          <GridAutoFlow />
        </ComponentPreview>
      </section>

      {/* Gap Variants */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Gap Variants</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Different spacing between grid items.
          </p>
        </div>
        <ComponentPreview id="grid-gap-variants">
          <GridGapVariants />
        </ComponentPreview>
      </section>

      {/* Dashboard */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Dashboard Layout</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Common dashboard widget layout pattern.
          </p>
        </div>
        <ComponentPreview id="grid-dashboard">
          <GridDashboard />
        </ComponentPreview>
      </section>

      {/* Card Layout */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Card Layout</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Card-based grid with colored backgrounds.
          </p>
        </div>
        <ComponentPreview id="grid-card-layout">
          <GridCardLayout />
        </ComponentPreview>
      </section>

      {/* API Reference */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left font-medium">Prop</th>
                <th className="px-4 py-3 text-left font-medium">Type</th>
                <th className="px-4 py-3 text-left font-medium">Default</th>
                <th className="px-4 py-3 text-left font-medium">Required</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">columns</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">3</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">gap</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">4</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">span</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">1</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">rowSpan</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">1</td>
                <td className="px-4 py-3">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
