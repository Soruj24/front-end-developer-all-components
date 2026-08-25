"use client";

import { useState } from "react";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";
import { Pagination } from "@/components/ui/Pagination";

const PAGINATION_SOURCE = `"use client";

import { useMemo } from "react";
import { cn } from "@/lib/cn";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  showFirstLast?: boolean;
  pageSize?: number;
  onPageSizeChange?: (size: number) => void;
  totalItems?: number;
  className?: string;
}

const range = (start, end) => Array.from({ length: end - start + 1 }, (_, i) => start + i);

export function Pagination({ currentPage, totalPages, onPageChange, siblingCount = 1, showFirstLast = true, pageSize = 10, onPageSizeChange, totalItems, className }: PaginationProps) {
  const pages = useMemo(() => {
    const totalSiblings = siblingCount * 2 + 3;
    if (totalPages <= totalSiblings) return range(1, totalPages);
    const leftSibling = Math.max(currentPage - siblingCount, 1);
    const rightSibling = Math.min(currentPage + siblingCount, totalPages);
    const showLeft = currentPage > siblingCount + 2;
    const showRight = currentPage < totalPages - siblingCount - 1;
    if (!showLeft && showRight) return [...range(1, totalSiblings - 2), "ellipsis", totalPages];
    if (showLeft && !showRight) return [1, "ellipsis", ...range(totalPages - (totalSiblings - 3), totalPages)];
    return [1, "ellipsis", ...range(leftSibling, rightSibling), "ellipsis", totalPages];
  }, [currentPage, totalPages, siblingCount]);

  return (
    <nav className={cn("flex flex-wrap items-center justify-between gap-4", className)} aria-label="Pagination">
      <div className="flex items-center gap-1" role="list">
        {showFirstLast && (
          <button disabled={currentPage === 1} onClick={() => onPageChange(1)} aria-label="First page"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary/50 disabled:pointer-events-none disabled:opacity-40">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="11 17 6 12 11 7" /><polyline points="18 17 13 12 18 7" /></svg>
          </button>
        )}
        <button disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)} aria-label="Previous page"
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary/50 disabled:pointer-events-none disabled:opacity-40">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="15 18 9 12 15 6" /></svg>
        </button>
        {pages.map((page, i) => page === "ellipsis" ? (
          <span key={\`ellipsis-\${i}\`} className="inline-flex h-9 w-9 items-center justify-center text-sm text-muted-foreground" aria-hidden="true">&#x2026;</span>
        ) : (
          <button key={page} onClick={() => onPageChange(page)} aria-label={\`Page \${page}\`} aria-current={page === currentPage ? "page" : undefined}
            className={cn("inline-flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium focus-visible:ring-2 focus-visible:ring-primary/50",
              page === currentPage ? "bg-foreground text-background shadow-sm" : "text-muted-foreground hover:bg-muted hover:text-foreground")}>
            {page}
          </button>
        ))}
        <button disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)} aria-label="Next page"
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary/50 disabled:pointer-events-none disabled:opacity-40">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="9 18 15 12 9 6" /></svg>
        </button>
        {showFirstLast && (
          <button disabled={currentPage === totalPages} onClick={() => onPageChange(totalPages)} aria-label="Last page"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary/50 disabled:pointer-events-none disabled:opacity-40">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="13 17 18 12 13 7" /><polyline points="6 17 11 12 6 7" /></svg>
          </button>
        )}
      </div>
      <div className="flex items-center gap-4">
        {totalItems !== undefined && <span className="text-sm text-muted-foreground">Showing {(currentPage - 1) * pageSize + 1}&ndash;{Math.min(currentPage * pageSize, totalItems)} of {totalItems}</span>}
        {onPageSizeChange && (
          <select value={pageSize} aria-label="Rows per page" onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="h-9 rounded-lg border border-border bg-card px-2.5 py-1 text-sm focus-visible:ring-2 focus-visible:ring-primary/50">
            {[5, 10, 20, 50, 100].map((size) => <option key={size} value={size}>{size} / page</option>)}
          </select>
        )}
      </div>
    </nav>
  );
}`;

export default function PaginationPage() {
  const [p1, setP1] = useState(1);
  const [p2, setP2] = useState(1);
  const [p3, setP3] = useState(1);
  const [p4, setP4] = useState(5);

  return (
    <ComponentDocPage
      name="Pagination"
      category="Navigation"
      description="Pagination with first/last navigation, ellipsis truncation, sibling count control, and optional page size selector."
    >
      <PreviewPanel filename="pagination-preview.tsx">
        <Pagination currentPage={p1} totalPages={10} onPageChange={setP1} />
      </PreviewPanel>

      <SourceCodeViewer source={PAGINATION_SOURCE} filename="components/ui/Pagination/Pagination.tsx" defaultExpanded />

      <section className="flex flex-col gap-8">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Examples
        </h2>

        <ExampleBlock
          title="Basic"
          description="Simple pagination with page navigation."
          code={`import { Pagination } from "@/components/ui/Pagination";

<Pagination currentPage={page} totalPages={10} onPageChange={setPage} />`}
          filename="basic.tsx"
        >
          <Pagination currentPage={p1} totalPages={10} onPageChange={setP1} />
        </ExampleBlock>

        <ExampleBlock
          title="Total Items"
          description="Show item count range alongside pagination."
          code={`<Pagination currentPage={page} totalPages={15} onPageChange={setPage} totalItems={142} pageSize={10} />`}
          filename="total-items.tsx"
        >
          <div className="flex flex-col gap-4">
            <span className="text-sm text-muted-foreground">
              Showing {(p2 - 1) * 10 + 1}&ndash;{Math.min(p2 * 10, 142)} of 142
            </span>
            <Pagination currentPage={p2} totalPages={15} onPageChange={setP2} totalItems={142} pageSize={10} />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Page Size Selector"
          description="Allow users to change items per page."
          code={`<Pagination currentPage={page} totalPages={Math.ceil(247 / size)} onPageChange={setPage}
  pageSize={size} onPageSizeChange={(s) => { setSize(s); setPage(1); }} totalItems={247} />`}
          filename="page-size.tsx"
        >
          <Pagination
            currentPage={p3}
            totalPages={25}
            onPageChange={setP3}
            pageSize={10}
            onPageSizeChange={() => setP3(1)}
            totalItems={247}
          />
        </ExampleBlock>

        <ExampleBlock
          title="Sibling Count"
          description="Control page buttons on each side of the current page."
          code={`<Pagination currentPage={5} totalPages={20} onPageChange={setPage} siblingCount={2} />`}
          filename="sibling-count.tsx"
        >
          <Pagination currentPage={p4} totalPages={20} onPageChange={setP4} siblingCount={2} />
        </ExampleBlock>
      </section>


    </ComponentDocPage>
  );
}
