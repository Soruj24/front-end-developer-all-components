"use client";

import { useState, useMemo } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

const installCommand = `npx component-library@latest add pagination-bar`;

const usageCode = `import { useState } from "react";

function PaginationBar({ current, total, onChange }) {
  return (
    <div className="flex items-center gap-1">
      <button onClick={() => onChange(1)} disabled={current === 1}>First</button>
      <button onClick={() => onChange(current - 1)} disabled={current === 1}>Prev</button>
      {Array.from({ length: total }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onChange(page)}
          className={page === current ? "active" : ""}
        >
          {page}
        </button>
      ))}
      <button onClick={() => onChange(current + 1)} disabled={current === total}>Next</button>
      <button onClick={() => onChange(total)} disabled={current === total}>Last</button>
    </div>
  );
}`;

function PaginationBar({
  current,
  total,
  onChange,
  variant = "default",
  size = "md",
  showFirstLast = true,
  showInfo = false,
}: {
  current: number;
  total: number;
  onChange: (p: number) => void;
  variant?: string;
  size?: "sm" | "md" | "lg";
  showFirstLast?: boolean;
  showInfo?: boolean;
}) {
  const pages = useMemo(() => {
    const p: (number | "...")[] = [];
    const delta = 1;
    const s = Math.max(2, current - delta);
    const e = Math.min(total - 1, current + delta);
    p.push(1);
    if (s > 2) p.push("...");
    for (let i = s; i <= e; i++) p.push(i);
    if (e < total - 1) p.push("...");
    if (total > 1) p.push(total);
    return p;
  }, [current, total]);

  const isPill = variant === "pill";
  const isOutline = variant === "outline";
  const btnClass = isPill ? "rounded-full" : "rounded-md";
  const sizeClass = size === "sm" ? "h-8 min-w-[32px] text-xs" : size === "lg" ? "h-11 min-w-[44px] text-base" : "h-9 min-w-[36px] text-sm";
  const navClass = size === "sm" ? "h-8 text-xs" : size === "lg" ? "h-11 text-base" : "h-9 text-sm";

  const activeClass = isOutline
    ? "border-primary text-primary bg-primary/10"
    : "bg-foreground text-background dark:bg-muted dark:text-zinc-900";

  return (
    <div className="flex min-w-0 max-w-full items-center gap-1 overflow-x-auto pb-1">
      {showInfo && (
        <span className="mr-2 whitespace-nowrap text-xs text-muted-foreground">
          Page {current} of {total}
        </span>
      )}
      {showFirstLast && (
        <button
          onClick={() => onChange(1)}
          disabled={current === 1}
          className={`${btnClass} ${sizeClass} flex items-center justify-center border border-border disabled:opacity-40`}
        >
          <ChevronsLeft className="h-4 w-4" />
        </button>
      )}
      <button
        onClick={() => onChange(Math.max(1, current - 1))}
        disabled={current === 1}
        className={`${btnClass} ${navClass} flex items-center gap-1 border border-border px-2 disabled:opacity-40`}
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="hidden sm:inline">Prev</span>
      </button>
      <div className="flex items-center gap-1">
        {pages.map((page, i) =>
          page === "..." ? (
            <span key={`e${i}`} className={`flex ${sizeClass} items-center justify-center text-sm text-muted-foreground/70`}>
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onChange(page)}
              className={`${btnClass} ${sizeClass} flex items-center justify-center border px-2 ${
                page === current ? activeClass : "border-border hover:bg-muted"
              }`}
            >
              {page}
            </button>
          )
        )}
      </div>
      <button
        onClick={() => onChange(Math.min(total, current + 1))}
        disabled={current === total}
        className={`${navClass} flex items-center gap-1 border border-border px-2 disabled:opacity-40`}
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight className="h-4 w-4" />
      </button>
      {showFirstLast && (
        <button
          onClick={() => onChange(total)}
          disabled={current === total}
          className={`${btnClass} ${sizeClass} flex items-center justify-center border border-border disabled:opacity-40`}
        >
          <ChevronsRight className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

export default function PaginationBarPage() {
  const [p1, setP1] = useState(1);
  const [p2, setP2] = useState(3);
  const [p3, setP3] = useState(5);
  const [p4, setP4] = useState(2);
  const [p5, setP5] = useState(1);
  const [p6, setP6] = useState(4);
  const [p7, setP7] = useState(3);
  const [p8, setP8] = useState(2);
  const [p9, setP9] = useState(1);
  const [p10, setP10] = useState(3);
  const [p11, setP11] = useState(6);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Pagination Bar</h1>
          <Badge variant="primary">Navigation</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          A horizontal pagination navigation bar with page numbers, first/prev/next/last buttons, and responsive overflow handling.
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
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Default</h2>
          <p className="mt-1 text-sm text-muted-foreground">Standard pagination with page numbers and navigation buttons.</p>
        </div>
        <ComponentPreview id="pag-bar-default">
          <PaginationBar current={p1} total={10} onChange={setP1} />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Sizes</h2>
          <p className="mt-1 text-sm text-muted-foreground">Small, medium, and large pagination bars.</p>
        </div>
        <ComponentPreview id="pag-bar-sizes">
          <div className="flex flex-col gap-4">
            <PaginationBar current={p2} total={10} onChange={setP2} size="sm" />
            <PaginationBar current={p3} total={10} onChange={setP3} size="md" />
            <PaginationBar current={p4} total={10} onChange={setP4} size="lg" />
          </div>
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Pill Variant</h2>
          <p className="mt-1 text-sm text-muted-foreground">Fully rounded pill-shaped page buttons.</p>
        </div>
        <ComponentPreview id="pag-bar-pill">
          <PaginationBar current={p5} total={10} onChange={setP5} variant="pill" />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Outline</h2>
          <p className="mt-1 text-sm text-muted-foreground">Active page highlighted with outline style.</p>
        </div>
        <ComponentPreview id="pag-bar-outline">
          <PaginationBar current={p6} total={10} onChange={setP6} variant="outline" />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">With Info</h2>
          <p className="mt-1 text-sm text-muted-foreground">Pagination with page info text.</p>
        </div>
        <ComponentPreview id="pag-bar-info">
          <PaginationBar current={p7} total={12} onChange={setP7} showInfo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Without First/Last</h2>
          <p className="mt-1 text-sm text-muted-foreground">Compact pagination without first/last buttons.</p>
        </div>
        <ComponentPreview id="pag-bar-no-first">
          <PaginationBar current={p8} total={10} onChange={setP8} showFirstLast={false} />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Few Pages</h2>
          <p className="mt-1 text-sm text-muted-foreground">Pagination with only a few total pages.</p>
        </div>
        <ComponentPreview id="pag-bar-few">
          <PaginationBar current={p9} total={3} onChange={setP9} />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Many Pages</h2>
          <p className="mt-1 text-sm text-muted-foreground">Pagination with ellipsis for large page counts.</p>
        </div>
        <ComponentPreview id="pag-bar-many">
          <PaginationBar current={p10} total={50} onChange={setP10} />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Table Footer</h2>
          <p className="mt-1 text-sm text-muted-foreground">Pagination integrated into a table footer.</p>
        </div>
        <ComponentPreview id="pag-bar-table">
          <div className="w-full rounded-lg border border-border">
            <table className="min-w-full divide-y divide-border">
              <thead className="bg-muted/40">
                <tr>
                  <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">Name</th>
                  <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">Status</th>
                  <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">Role</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
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
        </ComponentPreview>
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
                <td className="px-4 py-3 font-mono text-xs">current</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">total</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">onChange</td>
                <td className="px-4 py-3 text-muted-foreground">{`(page: number) => void`}</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">variant</td>
                <td className="px-4 py-3 text-muted-foreground">{`"default" | "pill" | "outline"`}</td>
                <td className="px-4 py-3 text-muted-foreground">{`"default"`}</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">size</td>
                <td className="px-4 py-3 text-muted-foreground">{`"sm" | "md" | "lg"`}</td>
                <td className="px-4 py-3 text-muted-foreground">{`"md"`}</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">showFirstLast</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">true</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">showInfo</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">false</td>
                <td className="px-4 py-3">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
