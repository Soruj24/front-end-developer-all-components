"use client";

import { useState } from "react";
import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { PAGINATION_BAR_SOURCE } from "./pagination-source";
import { PaginationBar } from "@/components/ui/PaginationBar";

export default function PaginationBarPage() {
  const [p1, setP1] = useState(1);
  const [p2, setP2] = useState(1);
  const [p3, setP3] = useState(1);
  const [p4, setP4] = useState(1);
  const [p5, setP5] = useState(1);
  const [p6, setP6] = useState(1);
  const [p7, setP7] = useState(1);
  const [p8, setP8] = useState(1);
  const [p9, setP9] = useState(1);
  const [p10, setP10] = useState(1);
  const [p11, setP11] = useState(1);

  return (
    <ComponentDocPage
      name="Pagination Bar"
      category="Navigation"
      description="A horizontal pagination navigation bar with page numbers, first/prev/next/last buttons, and responsive overflow handling."
    >
      <PreviewPanel filename="pagination-bar.tsx">
        <PaginationBar current={p1} total={10} onChange={setP1} />
      </PreviewPanel>

      <SourceCodeViewer
        source={PAGINATION_BAR_SOURCE}
        filename="components/ui/PaginationBar/PaginationBar.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Default" description="Standard pagination with page numbers and navigation buttons." code={PAGINATION_BAR_SOURCE}>
          <PaginationBar current={p1} total={10} onChange={setP1} />
        </ExampleBlock>

        <ExampleBlock title="Sizes" description="Small, medium, and large pagination bars." code={PAGINATION_BAR_SOURCE}>
          <div className="flex flex-col gap-4">
            <PaginationBar current={p2} total={10} onChange={setP2} size="sm" />
            <PaginationBar current={p3} total={10} onChange={setP3} size="md" />
            <PaginationBar current={p4} total={10} onChange={setP4} size="lg" />
          </div>
        </ExampleBlock>

        <ExampleBlock title="Pill Variant" description="Fully rounded pill-shaped page buttons." code={PAGINATION_BAR_SOURCE}>
          <PaginationBar current={p5} total={10} onChange={setP5} variant="pill" />
        </ExampleBlock>

        <ExampleBlock title="Outline" description="Active page highlighted with outline style." code={PAGINATION_BAR_SOURCE}>
          <PaginationBar current={p6} total={10} onChange={setP6} variant="outline" />
        </ExampleBlock>

        <ExampleBlock title="With Info" description="Pagination with page info text." code={PAGINATION_BAR_SOURCE}>
          <PaginationBar current={p7} total={12} onChange={setP7} showInfo />
        </ExampleBlock>

        <ExampleBlock title="Without First/Last" description="Compact pagination without first/last buttons." code={PAGINATION_BAR_SOURCE}>
          <PaginationBar current={p8} total={10} onChange={setP8} showFirstLast={false} />
        </ExampleBlock>

        <ExampleBlock title="Few Pages" description="Pagination with only a few total pages." code={PAGINATION_BAR_SOURCE}>
          <PaginationBar current={p9} total={3} onChange={setP9} />
        </ExampleBlock>

        <ExampleBlock title="Many Pages" description="Pagination with ellipsis for large page counts." code={PAGINATION_BAR_SOURCE}>
          <PaginationBar current={p10} total={50} onChange={setP10} />
        </ExampleBlock>

        <ExampleBlock title="Table Footer" description="Pagination integrated into a table footer." code={PAGINATION_BAR_SOURCE}>
          <div className="w-full rounded-lg border border-border">
            <table className="min-w-full divide-y divide-border">
              <thead className="bg-muted/40">
                <tr>
                  <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">Name</th>
                  <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">Status</th>
                  <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">Role</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 5 }, (_, i) => (
                  <tr key={i} className="hover:bg-muted/30">
                    <td className="whitespace-nowrap px-4 py-2.5 text-sm">User {(p11 - 1) * 5 + i + 1}</td>
                    <td className="whitespace-nowrap px-4 py-2.5">
                      <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">Active</span>
                    </td>
                    <td className="whitespace-nowrap px-4 py-2.5 text-sm text-muted-foreground">{["Admin", "Editor", "Viewer"][i % 3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex items-center justify-between border-t border-border px-4 py-3">
              <span className="text-xs text-muted-foreground">Showing {(p11 - 1) * 5 + 1}–{Math.min(p11 * 5, 23)} of 23</span>
              <PaginationBar current={p11} total={5} onChange={setP11} size="sm" showFirstLast={false} />
            </div>
          </div>
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
