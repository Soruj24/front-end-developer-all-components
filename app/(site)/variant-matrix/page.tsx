"use client";

import { ComponentPreview } from "@/components/preview";
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

export default function VariantMatrixPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Variant Matrix
        </h1>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          A documentation-ready comparison grid for component variants. Define
          rows and columns, drop live previews into each cell, then let people
          search, filter by tag, and copy the exact JSX config. On small screens
          the table collapses into stacked cards, and everything adapts to dark
          mode.
        </p>
      </header>

      <ComponentPreview id="variant-matrix-buttons">
        <div className="flex w-full flex-col">
          <VariantMatrix
            rows={buttonRows}
            columns={buttonColumns}
            cells={buttonCells}
          />
        </div>
      </ComponentPreview>

      <ComponentPreview id="variant-matrix-inputs">
        <div className="flex w-full flex-col">
          <VariantMatrix
            rows={inputRows}
            columns={inputColumns}
            cells={inputCells}
          />
        </div>
      </ComponentPreview>

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
  );
}
