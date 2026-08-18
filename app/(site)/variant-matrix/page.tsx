"use client";

import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { VariantMatrix } from "@/components/ui";
import {
  buttonRows,
  buttonColumns,
  buttonCells,
  inputRows,
  inputColumns,
  inputCells,
  badgeRows,
  badgeColumns,
  badgeCells,
} from "@/components/variant-matrix/demo";

const installCommand = `npx component-library@latest add variant-matrix`;

const usageCode = `import { VariantMatrix } from "@/components/ui";

<VariantMatrix
  rows={buttonRows}
  columns={buttonColumns}
  cells={buttonCells}
/>`;

export default function VariantMatrixPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Variant Matrix
          </h1>
          <Badge variant="primary">3 examples</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          A documentation-ready comparison grid for component variants. Define
          rows and columns, drop live previews into each cell, then let people
          search, filter by tag, and copy the exact JSX config. On small screens
          the table collapses into stacked cards, and everything adapts to dark
          mode.
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Installation</h2>
        <CodeBlock code={installCommand} filename="Terminal" label="bash" variant="terminal" />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} filename="page.tsx" label="tsx" />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Examples</h2>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-medium text-foreground">Button Variants</h3>
            <p className="text-sm text-muted-foreground">Compare button styles across sizes and states.</p>
          </div>
          <ComponentPreview id="variant-matrix-buttons">
            <div className="flex w-full flex-col">
              <VariantMatrix
                rows={buttonRows}
                columns={buttonColumns}
                cells={buttonCells}
              />
            </div>
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-medium text-foreground">Input Variants</h3>
            <p className="text-sm text-muted-foreground">Side-by-side input component variants.</p>
          </div>
          <ComponentPreview id="variant-matrix-inputs">
            <div className="flex w-full flex-col">
              <VariantMatrix
                rows={inputRows}
                columns={inputColumns}
                cells={inputCells}
              />
            </div>
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-medium text-foreground">Badge Variants</h3>
            <p className="text-sm text-muted-foreground">Badge color and style matrix.</p>
          </div>
          <ComponentPreview id="variant-matrix-badges">
            <div className="flex w-full flex-col">
              <VariantMatrix
                rows={badgeRows}
                columns={badgeColumns}
                cells={badgeCells}
              />
            </div>
          </ComponentPreview>
        </div>
      </section>

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
                <td className="px-4 py-3 font-mono text-xs">rows</td>
                <td className="px-4 py-3 text-muted-foreground">MatrixRow[]</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">columns</td>
                <td className="px-4 py-3 text-muted-foreground">MatrixColumn[]</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">cells</td>
                <td className="px-4 py-3 text-muted-foreground">MatrixCell[]</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">className</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
