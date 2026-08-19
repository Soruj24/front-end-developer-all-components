"use client";

import { useState, useMemo } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";

const PAGINATION_BAR_SOURCE = `import { useState, useMemo } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

type Variant = "default" | "pill" | "outline";
type Size = "sm" | "md" | "lg";

const isPill = (v) => v === "pill";
const isOutline = (v) => v === "outline";
const btnClass = (v, s) => `${isPill(v) ? "rounded-full" : "rounded-md"} ${s === "sm" ? "h-8 min-w-[32px] text-xs" : s === "lg" ? "h-11 min-w-[44px] text-base" : "h-9 min-w-[36px] text-sm"}`;
const navClass = (s) => s === "sm" ? "h-8 text-xs" : s === "lg" ? "h-11 text-base" : "h-9 text-sm";
const activeClass = (v) => isOutline(v) ? "border-primary text-primary bg-primary/10" : "bg-foreground text-background dark:bg-muted dark:text-zinc-900";

export interface PaginationBarProps {
  current: number; total: number; onChange: (p: number) => void; variant?: Variant; size?: Size; showFirstLast?: boolean; showInfo?: boolean;
}

export function PaginationBar({ current, total, onChange, variant = "default", size = "md", showFirstLast = true, showInfo }) {
  const pages = useMemo(() => {
    const p: (number | "...")[] = [];
    const delta = 1; const s = Math.max(2, current - delta); const e = Math.min(total - 1, current + delta);
    p.push(1); if (s > 2) p.push("..."); for (let i = s; i <= e; i++) p.push(i); if (e < total - 1) p.push("..."); if (total > 1) p.push(total);
    return p;
  }, [current, total]);
  return (
    <div className="flex min-w-0 max-w-full items-center gap-1 overflow-x-auto pb-1">
      {showInfo && (
        <span className="mr-2 whitespace-nowrap text-xs text-muted-foreground">
          Page {current} of {total}
        </span>
      )}
      {showFirstLast && (
        <button onClick={() => onChange(1)} disabled={current === 1} className={`${btnClass(variant, size)} flex items-center justify-center border border-border disabled:opacity-40`}>
          <ChevronsLeft className="h-4 w-4" />
        </button>
      )}
      <button onClick={() => onChange(Math.max(1, current - 1))} disabled={current === 1} className={`${btnClass(variant, navClass(size))} flex items-center gap-1 border border-border px-2 disabled:opacity-40`}>
        <ChevronLeft className="h-4 w-4" />
        <span className="hidden sm:inline">Prev</span>
      </button>
      <div className="flex items-center gap-1">
        {pages.map((page, i) =>
          page === "..." ? (
            <span key={`e${i}`} className={`flex ${btnClass(variant, size)} items-center justify-center text-sm text-muted-foreground/70`}>
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onChange(page)}
              className={`${btnClass(variant, size)} flex items-center justify-center border px-2 ${page === current ? activeClass(variant) : "border-border hover:bg-muted"}`}
            >
              {page}
            </button>
          )
        )}
      </div>
      <button onClick={() => onChange(Math.min(total, current + 1))} disabled={current === total} className={`${navClass(size)} flex items-center gap-1 border border-border px-2 disabled:opacity-40`}>
        <span className="hidden sm:inline">Next</span>
        <ChevronRight className="h-4 w-4" />
      </button>
      {showFirstLast && (
        <button onClick={() => onChange(total)} disabled={current === total} className={`${btnClass(variant, size)} flex items-center justify-center border border-border disabled:opacity-40`}>
          <ChevronsRight className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

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
        <ExampleBlock title="Default" description="Standard pagination with page numbers and navigation buttons." code={<PaginationBar current={p1} total={10} onChange={setP1} />}>
          <PaginationBar current={p1} total={10} onChange={setP1} />
        </ExampleBlock>

        <ExampleBlock title="Sizes" description="Small, medium, and large pagination bars." code={<div className="flex flex-col gap-4"><PaginationBar current={p2} total={10} onChange={setP2} size="sm" /><PaginationBar current={p3} total={10} onChange={setP3} size="md" /><PaginationBar current={p4} total={10} onChange={setP4} size="lg" /></div>}>
          <div className="flex flex-col gap-4">
            <PaginationBar current={p2} total={10} onChange={setP2} size="sm" />
            <PaginationBar current={p3} total={10} onChange={setP3} size="md" />
            <PaginationBar current={p4} total={10} onChange={setP4} size="lg" />
          </div>
        </ExampleBlock>

        <ExampleBlock title="Pill Variant" description="Fully rounded pill-shaped page buttons." code={<PaginationBar current={p5} total={10} onChange={setP5} variant="pill" />}>
          <PaginationBar current={p5} total={10} onChange={setP5} variant="pill" />
        </ExampleBlock>

        <ExampleBlock title="Outline" description="Active page highlighted with outline style." code={<PaginationBar current={p6} total={10} onChange={setP6} variant="outline" />}>
          <PaginationBar current={p6} total={10} onChange={setP6} variant="outline" />
        </ExampleBlock>

        <ExampleBlock title="With Info" description="Pagination with page info text." code={<PaginationBar current={p7} total={12} onChange={setP7} showInfo />}>
          <PaginationBar current={p7} total={12} onChange={setP7} showInfo />
        </ExampleBlock>

        <ExampleBlock title="Without First/Last" description="Compact pagination without first/last buttons." code={<PaginationBar current={p8} total={10} onChange={setP8} showFirstLast={false} />}>
          <PaginationBar current={p8} total={10} onChange={setP8} showFirstLast={false} />
        </ExampleBlock>

        <ExampleBlock title="Few Pages" description="Pagination with only a few total pages." code={<PaginationBar current={p9} total={3} onChange={setP9} />}>
          <PaginationBar current={p9} total={3} onChange={setP9} />
        </ExampleBlock>

        <ExampleBlock title="Many Pages" description="Pagination with ellipsis for large page counts." code={<PaginationBar current={p10} total={50} onChange={setP10} />}>
          <PaginationBar current={p10} total={50} onChange={setP10} />
        </ExampleBlock>

        <ExampleBlock title="Table Footer" description="Pagination integrated into a table footer." code={<div className="w-full rounded-lg border border-border"><table className="min-w-full divide-y divide-border"><thead className="bg-muted/40"><tr><th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">Name</th><th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">Status</th><th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">Role</th></tr></thead><tbody>{Array.from({ length: 5 }, (_, i) => <tr key={i} className="hover:bg-muted/30"><td className="whitespace-nowrap px-4 py-2.5 text-sm">User {(p11 - 1) * 5 + i + 1}</td><td className="whitespace-nowrap px-4 py-2.5"><span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">Active</span></td><td className="whitespace-nowrap px-4 py-2.5 text-sm text-muted-foreground">{["Admin", "Editor", "Viewer"][i % 3]}</td></tr>))}</tbody></table><div className="flex items-center justify-between border-t border-border px-4 py-3"><span className="text-xs text-muted-foreground">Showing {(p11 - 1) * 5 + 1}–{Math.min(p11 * 5, 23)} of 23</span><PaginationBar current={p11} total={5} onChange={setP11} size="sm" showFirstLast={false} /></div></div>}>}
          <div className="w-full rounded-lg border border-border"><table className="min-w-full divide-y divide-border"><thead className="bg-muted/40"><tr><th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">Name</th><th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">Status</th><th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">Role</th></tr></thead><tbody>{Array.from({ length: 5 }, (_, i) => <tr key={i} className="hover:bg-muted/30"><td className="whitespace-nowrap px-4 py-2.5 text-sm">User {(p11 - 1) * 5 + i + 1}</td><td className="whitespace-nowrap px-4 py-2.5"><span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">Active</span></td><td className="whitespace-nowrap px-4 py-2.5 text-sm text-muted-foreground">{["Admin", "Editor", "Viewer"][i % 3]}</td></tr>))}</tbody></table><div className="flex items-center justify-between border-t border-border px-4 py-3"><span className="text-xs text-muted-foreground">Showing {(p11 - 1) * 5 + 1}–{Math.min(p11 * 5, 23)} of 23</span><PaginationBar current={p11} total={5} onChange={setP11} size="sm" showFirstLast={false} /></div></div>
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}