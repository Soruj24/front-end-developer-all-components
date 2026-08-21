"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { DATAGRID_SOURCE, PAGINATION_SOURCE, BASIC_EXAMPLE, COMPACT_STRIPED_EXAMPLE, ROW_NUMBERS_EXAMPLE } from "./data-grid-source";
import { BasicGridDemo, CompactGridDemo, RowNumbersDemo } from "./data-grid-demos";

export default function DataGridPage() {
  return (
    <ComponentDocPage
      name="Data Grid"
      category="Data Display"
      description="Sortable data grid with search, pagination, and column-based sorting. Handles large datasets with smooth interactions."
    >
      <PreviewPanel filename="data-grid-preview.tsx">
        <div className="w-full">
          <BasicGridDemo />
        </div>
      </PreviewPanel>

      <SourceCodeViewer
        source={DATAGRID_SOURCE}
        filename="components/ui/DataGrid/DataGrid.tsx"
        defaultExpanded
      />

      <SourceCodeViewer
        source={PAGINATION_SOURCE}
        filename="components/ui/DataGrid/PaginationControls.tsx"
        defaultExpanded={false}
      />

      <div className="flex flex-col gap-8">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">Examples</h2>

        <ExampleBlock
          title="Compact & Striped"
          description="Denser layout with alternating row backgrounds for scanning large datasets."
          code={COMPACT_STRIPED_EXAMPLE}
          filename="compact-grid.tsx"
        >
          <CompactGridDemo />
        </ExampleBlock>

        <ExampleBlock
          title="Row Numbers"
          description="Display row indices for easy reference in large tables."
          code={ROW_NUMBERS_EXAMPLE}
          filename="row-numbers.tsx"
        >
          <RowNumbersDemo />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
