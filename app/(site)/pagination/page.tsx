"use client";

import { useState } from "react";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";

const PAGINATION_SOURCE = `import { useMemo } from "react";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  showFirstLast?: boolean;
  pageSize?: number;
  onPageSizeChange?: (size: number) => void;
  totalItems?: number;
}

const range = (start: number, end: number) =>
  Array.from({ length: end - start + 1 }, (_, i) => start + i);

const Pagination = ({
  currentPage, totalPages, onPageChange, siblingCount = 1,
  showFirstLast = true, pageSize = 10, onPageSizeChange, totalItems,
}: PaginationProps) => {
  const totalSiblings = siblingCount * 2 + 3;
  const showLeftEllipsis = currentPage > siblingCount + 2;
  const showRightEllipsis = currentPage < totalPages - siblingCount - 1;

  let pages: (number | "ellipsis")[];
  if (totalPages <= totalSiblings) {
    pages = range(1, totalPages);
  } else {
    const leftSibling = Math.max(currentPage - siblingCount, 1);
    const rightSibling = Math.min(currentPage + siblingCount, totalPages);
    if (!showLeftEllipsis && showRightEllipsis) {
      pages = [...range(1, totalSiblings - 2), "ellipsis", totalPages];
    } else if (showLeftEllipsis && !showRightEllipsis) {
      pages = [1, "ellipsis", ...range(totalPages - (totalSiblings - 3), totalPages)];
    } else {
      pages = [1, "ellipsis", ...range(leftSibling, rightSibling), "ellipsis", totalPages];
    }
  }

  const btnBase = "inline-flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none";
  const btnActive = "bg-foreground text-background";
  const btnInactive = "text-muted-foreground hover:bg-muted";
  const btnNav = "text-muted-foreground hover:bg-muted";
  const startItem = totalItems ? (currentPage - 1) * pageSize + 1 : 0;
  const endItem = totalItems ? Math.min(currentPage * pageSize, totalItems) : 0;

  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-1">
        {showFirstLast && (
          <button disabled={currentPage === 1} onClick={() => onPageChange(1)} className={btnNav} aria-label="First page">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="11 17 6 12 11 7" /><polyline points="18 17 13 12 18 7" /></svg>
          </button>
        )}
        <button disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)} className={btnNav} aria-label="Previous page">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
        </button>
        {pages.map((page, i) =>
          page === "ellipsis" ? (
            <span key={\`ellipsis-\${i}\`} className="inline-flex h-9 w-9 items-center justify-center text-sm text-muted-foreground">&#x2026;</span>
          ) : (
            <button key={page} onClick={() => onPageChange(page)} className={\`\${btnBase} \${page === currentPage ? btnActive : btnInactive}\`}>{page}</button>
          )
        )}
        <button disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)} className={btnNav} aria-label="Next page">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
        </button>
        {showFirstLast && (
          <button disabled={currentPage === totalPages} onClick={() => onPageChange(totalPages)} className={btnNav} aria-label="Last page">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="13 17 18 12 13 7" /><polyline points="6 17 11 12 6 7" /></svg>
          </button>
        )}
      </div>
      <div className="flex items-center gap-4">
        {totalItems !== undefined && (
          <span className="text-sm text-muted-foreground">Showing {startItem}&ndash;{endItem} of {totalItems}</span>
        )}
        {onPageSizeChange && (
          <select value={pageSize} aria-label="Rows per page" onChange={(e) => onPageSizeChange(Number(e.target.value))} className="rounded-lg border border-border bg-transparent px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
            {[5, 10, 20, 50, 100].map((size) => <option key={size} value={size}>{size} / page</option>)}
          </select>
        )}
      </div>
    </div>
  );
};

export default Pagination;`;

const BASIC_SOURCE = `import { useState } from "react";
import Pagination from "@/components/ui/Pagination";

function BasicExample() {
  const [page, setPage] = useState(1);
  return <Pagination currentPage={page} totalPages={10} onPageChange={setPage} />;
}`;

const TOTAL_ITEMS_SOURCE = `import { useState } from "react";
import Pagination from "@/components/ui/Pagination";

function TotalItemsExample() {
  const [page, setPage] = useState(1);
  return (
    <Pagination currentPage={page} totalPages={15} onPageChange={setPage} totalItems={142} pageSize={10} />
  );
}`;

const PAGE_SIZE_SOURCE = `import { useState } from "react";
import Pagination from "@/components/ui/Pagination";

function PageSizeExample() {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  return (
    <Pagination currentPage={page} totalPages={Math.ceil(247 / size)} onPageChange={setPage}
      pageSize={size} onPageSizeChange={(s) => { setSize(s); setPage(1); }} totalItems={247} />
  );
}`;

const SIBLING_SOURCE = `import { useState } from "react";
import Pagination from "@/components/ui/Pagination";

function SiblingExample() {
  const [page, setPage] = useState(5);
  return <Pagination currentPage={page} totalPages={20} onPageChange={setPage} siblingCount={2} />;
}`;

function PreviewPagination({ current, total, onChange }: { current: number; total: number; onChange: (p: number) => void }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: total }, (_, i) => i + 1).map((p) => (
        <button key={p} onClick={() => onChange(p)} className={`inline-flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition-colors ${p === current ? "bg-foreground text-background" : "text-muted-foreground hover:bg-muted"}`}>
          {p}
        </button>
      ))}
    </div>
  );
}

export default function PaginationPage() {
  const [p1, setP1] = useState(1);
  const [p2, setP2] = useState(1);
  const [p3, setP3] = useState(1);
  const [p4, setP4] = useState(5);

  return (
    <ComponentDocPage name="Pagination" category="Navigation" description="Pagination with first/last navigation, ellipsis truncation, sibling count control, and optional page size selector.">
      <PreviewPanel filename="pagination-preview.tsx">
        <PreviewPagination current={p1} total={10} onChange={setP1} />
      </PreviewPanel>
      <SourceCodeViewer source={PAGINATION_SOURCE} filename="components/ui/Pagination.tsx" defaultExpanded />
      <div className="flex flex-col gap-6">
        <ExampleBlock title="Basic" description="Simple pagination with page navigation." code={BASIC_SOURCE} filename="basic.tsx">
          <PreviewPagination current={p1} total={10} onChange={setP1} />
        </ExampleBlock>
        <ExampleBlock title="Total Items" description="Show item count range alongside pagination." code={TOTAL_ITEMS_SOURCE} filename="total-items.tsx">
          <div className="flex flex-col gap-4">
            <span className="text-sm text-muted-foreground">Showing {(p2 - 1) * 10 + 1}–{Math.min(p2 * 10, 142)} of 142</span>
            <PreviewPagination current={p2} total={15} onChange={setP2} />
          </div>
        </ExampleBlock>
        <ExampleBlock title="Page Size Selector" description="Allow users to change items per page." code={PAGE_SIZE_SOURCE} filename="page-size.tsx">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="text-sm text-muted-foreground">Per page: 10</span>
            <PreviewPagination current={p3} total={25} onChange={setP3} />
          </div>
        </ExampleBlock>
        <ExampleBlock title="Sibling Count" description="Control page buttons on each side of the current page." code={SIBLING_SOURCE} filename="sibling-count.tsx">
          <PreviewPagination current={p4} total={20} onChange={setP4} />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
