"use client";

import { useState, useMemo } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";

const installCommand = `npx component-library@latest add pagination`;

const usageCode = `import { useState } from "react";

function Pagination({ current, total, onChange }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: total }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onChange(page)}
          className={page === current ? "active" : ""}
        >
          {page}
        </button>
      ))}
    </div>
  );
}

// Usage
const [page, setPage] = useState(1);
<Pagination current={page} total={10} onChange={setPage} />`;

function ChevronLeft() {
  return <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>;
}

function ChevronRight() {
  return <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>;
}

function PaginationBar({
  current,
  total,
  onChange,
  variant = "default",
  size = "md",
}: {
  current: number;
  total: number;
  onChange: (p: number) => void;
  variant?: string;
  size?: string;
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

  const btnClass = variant === "pill" ? "rounded-full" : variant === "square" ? "rounded-none" : "rounded-md";
  const activeClass = variant === "outline"
    ? "border-indigo-600 text-primary bg-indigo-50 dark:border-indigo-400 dark:text-indigo-400"
    : "border-zinc-900 bg-foreground text-background dark:border-border dark:bg-muted dark:text-zinc-900";
  const sizeClass = size === "sm" ? "h-7 min-w-[28px] text-xs" : size === "lg" ? "h-11 min-w-[44px] text-base" : "h-9 min-w-[36px] text-sm";
  const navClass = size === "sm" ? "h-7 text-xs" : size === "lg" ? "h-11 text-base" : "h-9 text-sm";

  return (
    <div className="flex min-w-0 max-w-full items-center gap-1 overflow-x-auto pb-1 scrollbar-thin">
      <button onClick={() => onChange(1)} disabled={current === 1} className={`${btnClass} ${sizeClass} flex items-center justify-center border border-border disabled:opacity-40 dark:border-border`}>
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" /></svg>
      </button>
      <button onClick={() => onChange(Math.max(1, current - 1))} disabled={current === 1} className={`${btnClass} ${navClass} flex items-center gap-1 border border-border px-2 disabled:opacity-40 dark:border-border`}>
        <ChevronLeft /><span className="hidden sm:inline">{size === "sm" ? "" : "Prev"}</span>
      </button>
      <div className="flex items-center gap-1">
        {pages.map((page, i) => page === "..." ? (
          <span key={`e${i}`} className={`flex ${sizeClass} items-center justify-center text-sm text-muted-foreground/70`}>...</span>
        ) : (
          <button key={page} onClick={() => onChange(page)}
            className={`${btnClass} ${sizeClass} flex items-center justify-center border px-2 ${page === current ? activeClass : "border-border hover:bg-muted dark:border-border dark:hover:bg-muted"}`}>
            {page}
          </button>
        ))}
      </div>
      <button onClick={() => onChange(Math.min(total, current + 1))} disabled={current === total} className={`${navClass} flex items-center gap-1 border border-border px-2 disabled:opacity-40 dark:border-border`}>
        <span className="hidden sm:inline">{size === "sm" ? "" : "Next"}</span><ChevronRight />
      </button>
      <button onClick={() => onChange(total)} disabled={current === total} className={`${btnClass} ${sizeClass} flex items-center justify-center border border-border disabled:opacity-40 dark:border-border`}>
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" /></svg>
      </button>
    </div>
  );
}

export default function PaginationPage() {
  const [p1, setP1] = useState(1);
  const [p2, setP2] = useState(3);
  const [p3, setP3] = useState(5);
  const [p4, setP4] = useState(1);
  const [p5, setP5] = useState(1);
  const [p6, setP6] = useState(2);
  const [p7, setP7] = useState(4);
  const [p8, setP8] = useState(5);
  const [p9, setP9] = useState(1);
  const [p10, setP10] = useState(2);
  const [p11, setP11] = useState(1);
  const [p12, setP12] = useState(3);
  const [p13, setP13] = useState(6);
  const [p14, setP14] = useState(2);
  const [p15, setP15] = useState(1);
  const [p16, setP16] = useState(3);
  const [p17, setP17] = useState(3);
  const [p18, setP18] = useState(5);
  const [p19, setP19] = useState(1);
  const [p20, setP20] = useState(5);
  const [p21, setP21] = useState(1);
  const [p22, setP22] = useState(2);
  const [p23, setP23] = useState(4);
  const [p24, setP24] = useState(5);
  const [p25, setP25] = useState(2);
  const [p26, setP26] = useState(3);
  const [p27, setP27] = useState(1);
  const [p28, setP28] = useState(3);
  const [p29, setP29] = useState(4);
  const [p30, setP30] = useState(2);
  const [p31, setP31] = useState(4);
  const [p32, setP32] = useState(1);
  const [p33, setP33] = useState(2);
  const [p34, setP34] = useState(1);
  const [p35, setP35] = useState(3);
  const [p36, setP36] = useState(1);
  const [p37, setP37] = useState(1);
  const [p38, setP38] = useState(1);
  const [p39, setP39] = useState(3);
  const [p40, setP40] = useState(1);
  const [p41, setP41] = useState(1);
  const [p42, setP42] = useState(4);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Pagination</h1>
          <Badge variant="primary">12 examples</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Pagination variants — styles, sizes, page counts, tables, steppers,
          and layout patterns. Use the tabs to switch between the live preview,
          source code, CLI, installation, and dependency details for each
          example.
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

      {/* Style Variants */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Style Variants</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Different visual styles for pagination buttons.
          </p>
        </div>
        <ComponentPreview id="pagination-style-variants">
        <div className="grid w-full grid-cols-1 gap-6">
          {[
            { label: "Default (Rounded)", v: "default", s: [p1, setP1] as const },
            { label: "Pill (Fully Rounded)", v: "pill", s: [p2, setP2] as const },
            { label: "Square (No Radius)", v: "square", s: [p3, setP3] as const },
            { label: "Outline Active", v: "outline", s: [p4, setP4] as const },
          ].map((item) => (
            <div key={item.label} className="rounded-xl border border-border p-4 dark:border-border">
              <p className="mb-3 text-sm font-medium">{item.label}</p>
              <PaginationBar current={item.s[0]} total={10} onChange={item.s[1]} variant={item.v} />
            </div>
          ))}
        </div>
      </ComponentPreview>

      {/* Size Variants */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Size Variants</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Different sizes for pagination buttons.
          </p>
        </div>
        <ComponentPreview id="pagination-size-variants">
        <div className="flex w-full flex-col gap-6">
          <div className="grid grid-cols-1 gap-4">
            {[
              { label: "Small (sm)", z: "sm", s: [p5, setP5] as const },
              { label: "Medium (md, default)", z: "md", s: [p6, setP6] as const },
              { label: "Large (lg)", z: "lg", s: [p7, setP7] as const },
            ].map((item) => (
              <div key={item.label} className="rounded-xl border border-border p-4 dark:border-border">
                <p className="mb-3 text-sm font-medium">{item.label}</p>
                <PaginationBar current={item.s[0]} total={10} onChange={item.s[1]} size={item.z} />
              </div>
            ))}
          </div>
          <div className="rounded-xl border border-border p-4 dark:border-border">
            <p className="mb-3 text-sm font-medium">Sizes Comparison</p>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4"><span className="w-16 text-xs text-muted-foreground">Small</span><PaginationBar current={p8} total={10} onChange={setP8} size="sm" /></div>
              <div className="flex items-center gap-4"><span className="w-16 text-xs text-muted-foreground">Medium</span><PaginationBar current={p9} total={10} onChange={setP9} size="md" /></div>
              <div className="flex items-center gap-4"><span className="w-16 text-xs text-muted-foreground">Large</span><PaginationBar current={p10} total={10} onChange={setP10} size="lg" /></div>
            </div>
          </div>
        </div>
      </ComponentPreview>

      {/* Page Counts */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Page Counts</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Pagination with different total page counts.
          </p>
        </div>
        <ComponentPreview id="pagination-page-counts">
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
          {[
            { label: "Few Pages (3)", t: 3, s: [p11, setP11] as const },
            { label: "Medium (8)", t: 8, s: [p12, setP12] as const },
            { label: "Many (15)", t: 15, s: [p13, setP13] as const },
            { label: "Very Many (25)", t: 25, s: [p14, setP14] as const },
          ].map((item) => (
            <div key={item.label} className="rounded-xl border border-border p-4 dark:border-border">
              <p className="mb-3 text-sm font-medium">{item.label}</p>
              <PaginationBar current={item.s[0]} total={item.t} onChange={item.s[1]} />
            </div>
          ))}
        </div>
      </ComponentPreview>

      {/* Page Size Selector */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Page Size Selector</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Pagination with page size controls.
          </p>
        </div>
        <ComponentPreview id="pagination-page-size">
        <div className="flex w-full flex-col gap-6">
          <div className="rounded-xl border border-border p-4 dark:border-border">
            <p className="mb-3 text-sm font-medium">With Page Size Selector</p>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <label className="text-sm text-muted-foreground">Rows: 10</label>
                <span className="text-sm text-muted-foreground">1–10 of 143</span>
              </div>
              <PaginationBar current={p15} total={15} onChange={setP15} />
            </div>
          </div>
          <div className="rounded-xl border border-border p-4 dark:border-border">
            <p className="mb-3 text-sm font-medium">With Dropdown Per-Page</p>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground">Per page:</span>
                <select className="rounded border border-border px-2 py-1 text-xs dark:border-border dark:bg-muted">
                  <option>10</option><option>20</option><option>50</option>
                </select>
              </div>
              <PaginationBar current={p16} total={10} onChange={setP16} variant="pill" />
            </div>
          </div>
        </div>
      </ComponentPreview>

      {/* Jump to Page */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Jump to Page</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Pagination with jump-to-page functionality.
          </p>
        </div>
        <ComponentPreview id="pagination-jump-to-page">
        <div className="flex w-full flex-col gap-6">
          <div className="rounded-xl border border-border p-4 dark:border-border">
            <p className="mb-3 text-sm font-medium">With Jump-to-Page</p>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <PaginationBar current={p17} total={12} onChange={setP17} />
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Go to:</span>
                <input type="number" min={1} max={12} className="w-14 rounded-md border border-border px-2 py-1 text-xs dark:border-border dark:bg-muted" placeholder="#" />
                <button className="rounded-md bg-zinc-900 px-3 py-1 text-xs font-medium text-white dark:bg-muted dark:text-zinc-900">Go</button>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-border p-4 dark:border-border">
            <p className="mb-3 text-sm font-medium">With Page Input (Inline)</p>
            <div className="flex flex-wrap items-center gap-4">
              <PaginationBar current={p18} total={12} onChange={setP18} />
              <div className="flex items-center gap-1 text-sm">
                <span className="text-muted-foreground">Page</span>
                <input type="number" min={1} max={12} className="w-12 rounded border border-border px-2 py-1 text-center text-sm dark:border-border dark:bg-muted" value={p18} onChange={(e) => { const v = parseInt(e.target.value); if (v >= 1 && v <= 12) setP18(v); }} />
                <span className="text-muted-foreground">of 12</span>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-border p-4 dark:border-border">
            <p className="mb-3 text-sm font-medium">With Typed Input (Jump)</p>
            <div className="flex flex-wrap items-center gap-4">
              <PaginationBar current={p19} total={10} onChange={setP19} />
              <div className="flex items-center gap-1">
                <input type="number" min={1} max={10} placeholder="Page #" className="w-16 rounded border border-border px-2 py-1 text-xs dark:border-border dark:bg-muted" />
                <button className="rounded bg-zinc-900 px-2 py-1 text-xs font-medium text-white dark:bg-muted dark:text-zinc-900">Jump</button>
              </div>
            </div>
          </div>
        </div>
      </ComponentPreview>

      {/* Range Text */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Range Text</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Pagination with range text display.
          </p>
        </div>
        <ComponentPreview id="pagination-range-text">
        <div className="flex w-full flex-wrap items-center justify-between gap-4">
          <span className="text-sm text-muted-foreground">Showing {(p20 - 1) * 10 + 1}–{Math.min(p20 * 10, 87)} of 87</span>
          <PaginationBar current={p20} total={9} onChange={setP20} />
        </div>
      </ComponentPreview>

      {/* Table Integration */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Table Integration</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Pagination integrated with data tables.
          </p>
        </div>
        <ComponentPreview id="pagination-table">
        <div className="w-full">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-border">
              <thead className="bg-muted/40 dark:bg-zinc-900">
                <tr>{["ID", "Name", "Email", "Role", "Status"].map((h) => (
                  <th scope="col" key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">{h}</th>
                ))}</tr>
              </thead>
              <tbody className="divide-y divide-border">
                {Array.from({ length: 5 }, (_, i) => {
                  const id = (p21 - 1) * 5 + i + 1;
                  return (
                    <tr key={id} className="hover:bg-muted/40 dark:hover:bg-zinc-900/50">
                      <td className="whitespace-nowrap px-4 py-3 text-sm font-medium">#{id}</td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm">User {id}</td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm text-muted-foreground">user{id}@ex.com</td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm text-muted-foreground">{["Admin", "Editor", "Viewer"][id % 3]}</td>
                      <td className="whitespace-nowrap px-4 py-3">
                        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${id % 2 === 0 ? "bg-green-100 text-green-700 dark:bg-green-900/30" : "bg-muted text-muted-foreground dark:bg-muted"}`}>
                          {id % 2 === 0 ? "Active" : "Inactive"}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between border-t border-border px-4 py-3 dark:border-border">
            <span className="text-xs text-muted-foreground">Page {p21} of 8</span>
            <PaginationBar current={p21} total={8} onChange={setP21} />
          </div>
        </div>
      </ComponentPreview>

      {/* Skeleton Loading */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Skeleton Loading</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Pagination with skeleton loading state.
          </p>
        </div>
        <ComponentPreview id="pagination-skeleton">
        <div className="w-full">
          <div className="flex flex-col gap-3">
            {Array.from({ length: 3 }, (_, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="h-4 w-8 animate-pulse rounded bg-muted" />
                <div className="h-4 w-32 animate-pulse rounded bg-muted" />
                <div className="h-4 w-20 animate-pulse rounded bg-muted" />
              </div>
            ))}
          </div>
          <div className="mt-4">
            <PaginationBar current={p22} total={10} onChange={setP22} />
          </div>
        </div>
      </ComponentPreview>

      {/* Condensed */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Condensed</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Condensed pagination styles.
          </p>
        </div>
        <ComponentPreview id="pagination-condensed">
        <div className="flex w-full flex-col gap-6">
          <div className="rounded-xl border border-border p-4 dark:border-border">
            <p className="mb-3 text-sm font-medium">Condensed (No Label)</p>
            <PaginationBar current={p23} total={10} onChange={setP23} size="sm" />
          </div>
          <div className="rounded-xl border border-border p-4 dark:border-border">
            <p className="mb-3 text-sm font-medium">Icons Only (No Labels)</p>
            <div className="flex items-center gap-2">
              <button onClick={() => setP24(Math.max(1, p24 - 1))} disabled={p24 === 1} className="flex h-9 w-9 items-center justify-center rounded-lg border border-border disabled:opacity-40 dark:border-border"><ChevronLeft /></button>
              <div className="flex items-center gap-1 text-sm font-medium text-muted-foreground">Page {p24} of 10</div>
              <button onClick={() => setP24(Math.min(10, p24 + 1))} disabled={p24 === 10} className="flex h-9 w-9 items-center justify-center rounded-lg border border-border disabled:opacity-40 dark:border-border"><ChevronRight /></button>
            </div>
          </div>
          <div className="rounded-xl border border-border p-4 dark:border-border">
            <p className="mb-3 text-sm font-medium">Ghost / Minimal (No Borders)</p>
            <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-thin">
              <button onClick={() => setP25(Math.max(1, p25 - 1))} disabled={p25 === 1} className="flex h-8 w-8 items-center justify-center rounded text-sm text-muted-foreground/70 hover:bg-muted disabled:opacity-30 dark:hover:bg-muted"><ChevronLeft /></button>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                <button key={n} onClick={() => setP25(n)} className={`flex h-8 min-w-[32px] items-center justify-center rounded text-sm ${n === p25 ? "bg-muted font-medium text-zinc-900 dark:bg-muted dark:text-zinc-100" : "text-muted-foreground hover:text-foreground dark:hover:text-zinc-100"}`}>{n}</button>
              ))}
              <button onClick={() => setP25(Math.min(8, p25 + 1))} disabled={p25 === 8} className="flex h-8 w-8 items-center justify-center rounded text-sm text-muted-foreground/70 hover:bg-muted disabled:opacity-30 dark:hover:bg-muted"><ChevronRight /></button>
            </div>
          </div>
          <div className="rounded-xl border border-border p-4 dark:border-border">
            <p className="mb-3 text-sm font-medium">With Vertical Dividers</p>
            <div className="overflow-x-auto pb-1 scrollbar-thin">
              <div className="inline-flex items-center rounded-md border border-border dark:border-border">
              <button onClick={() => setP26(Math.max(1, p26 - 1))} disabled={p26 === 1} className="flex h-9 w-9 items-center justify-center disabled:opacity-40"><ChevronLeft /></button>
              <div className="h-5 w-px bg-muted" />
              {[1, 2, 3, 4, 5, 6, 7, 8].map((n, i) => (
                <span key={n} className="flex items-center">
                  <button onClick={() => setP26(n)} className={`flex h-9 min-w-[36px] items-center justify-center text-sm ${n === p26 ? "font-medium text-foreground" : "text-muted-foreground"}`}>{n}</button>
                  {i < 7 && <div className="h-5 w-px bg-muted" />}
                </span>
              ))}
              <div className="h-5 w-px bg-muted" />
              <button onClick={() => setP26(Math.min(8, p26 + 1))} disabled={p26 === 8} className="flex h-9 w-9 items-center justify-center disabled:opacity-40"><ChevronRight /></button>
              </div>
            </div>
          </div>
        </div>
      </ComponentPreview>

      {/* Card Grid */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Card Grid</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Pagination with card grid layout.
          </p>
        </div>
        <ComponentPreview id="pagination-card-grid">
        <div className="w-full">
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
            {Array.from({ length: 5 }, (_, i) => (
              <div key={i} className="rounded-lg border border-border p-3 text-center dark:border-border">
                <div className="text-lg font-bold text-muted-foreground/70">#{i + 1 + (p27 - 1) * 5}</div>
                <div className="text-xs text-muted-foreground">Item</div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-center">
            <PaginationBar current={p27} total={6} onChange={setP27} variant="pill" size="sm" />
          </div>
        </div>
      </ComponentPreview>

      {/* Comments */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Comments</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Pagination for comment sections.
          </p>
        </div>
        <ComponentPreview id="pagination-comments">
        <div className="w-full">
          <div className="flex flex-col gap-3">
            {Array.from({ length: 3 }, (_, i) => (
              <div key={i} className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium dark:bg-muted">
                  {["A", "B", "C"][i]}
                </div>
                <div>
                  <div className="text-sm font-medium">User {(p28 - 1) * 3 + i + 1}</div>
                  <div className="text-xs text-muted-foreground">This is a sample comment for demonstration.</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-xs text-muted-foreground/70">Page {p28} of 5</span>
            <PaginationBar current={p28} total={5} onChange={setP28} variant="outline" size="sm" />
          </div>
        </div>
      </ComponentPreview>

      {/* Search Results */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Search Results</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Pagination for search results.
          </p>
        </div>
        <ComponentPreview id="pagination-search-results">
        <div className="w-full">
          <p className="mb-3 text-sm text-muted-foreground">Showing results {(p29 - 1) * 10 + 1}–{Math.min(p29 * 10, 142)} of 142 for &ldquo;design&rdquo;</p>
          <div className="flex flex-col gap-2">
            {Array.from({ length: 3 }, (_, i) => (
              <div key={i} className="rounded-lg border border-border p-3 dark:border-border">
                <div className="text-sm font-medium">Result {(p29 - 1) * 3 + i + 1}</div>
                <div className="text-xs text-muted-foreground">Description of search result item.</div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <PaginationBar current={p29} total={15} onChange={setP29} />
          </div>
        </div>
      </ComponentPreview>

      {/* Minimal */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Minimal</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Minimal pagination styles.
          </p>
        </div>
        <ComponentPreview id="pagination-minimal">
        <div className="flex w-full flex-col gap-6">
          <div className="rounded-xl border border-border p-4 dark:border-border">
            <p className="mb-3 text-sm font-medium">Minimal (Only Prev/Next)</p>
            <div className="flex items-center justify-between">
              <button disabled className="flex items-center gap-1 rounded-lg border border-border px-3 py-1.5 text-sm disabled:opacity-40 dark:border-border">
                <ChevronLeft /> Previous
              </button>
              <span className="text-sm text-muted-foreground">Page 1 of 8</span>
              <button className="flex items-center gap-1 rounded-lg border border-border px-3 py-1.5 text-sm hover:bg-muted/40 dark:border-border dark:hover:bg-muted">
                Next <ChevronRight />
              </button>
            </div>
          </div>
          <div className="rounded-xl border border-border p-4 text-center dark:border-border">
            <p className="mb-3 text-sm font-medium">Centered</p>
            <div className="flex justify-center">
              <PaginationBar current={p30} total={8} onChange={setP30} />
            </div>
          </div>
          <div className="rounded-xl border border-border p-4 dark:border-border">
            <p className="mb-3 text-sm font-medium">Right-Aligned</p>
            <div className="flex justify-end">
              <PaginationBar current={p31} total={8} onChange={setP31} />
            </div>
          </div>
        </div>
      </ComponentPreview>

      {/* Total Badge */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Total Badge</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Pagination with total count badge.
          </p>
        </div>
        <ComponentPreview id="pagination-total-badge">
        <div className="flex w-full flex-col gap-6">
          <div className="rounded-xl border border-border p-4 dark:border-border">
            <p className="mb-3 text-sm font-medium">With Total Count Badge</p>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Total:</span>
                <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium dark:bg-muted">1,284 items</span>
              </div>
              <PaginationBar current={p32} total={15} onChange={setP32} />
            </div>
          </div>
          <div className="rounded-xl border border-border p-4 dark:border-border">
            <p className="mb-3 text-sm font-medium">Disabled State (less than 2 pages)</p>
            <PaginationBar current={1} total={1} onChange={() => {}} />
            <p className="mt-2 text-xs text-muted-foreground/70">Single page — controls are disabled.</p>
          </div>
        </div>
      </ComponentPreview>

      {/* Load More */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Load More</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Load more pagination pattern.
          </p>
        </div>
        <ComponentPreview id="pagination-load-more">
        <div className="flex w-full flex-col gap-2">
          {Array.from({ length: p33 * 3 }, (_, i) => (
            <div key={i} className="flex items-center gap-3 rounded-lg border border-border px-3 py-2 text-sm dark:border-border">
              <span className="flex h-6 w-6 items-center justify-center rounded bg-muted text-xs font-medium dark:bg-muted">{i + 1}</span>
              Item {i + 1}
            </div>
          ))}
          {p33 < 5 && (
            <button onClick={() => setP33(p33 + 1)} className="mt-3 w-full rounded-lg border border-dashed border-border py-2 text-sm text-muted-foreground hover:border-zinc-400 hover:text-muted-foreground dark:border-border dark:hover:border-foreground/20">
              + Load More ({p33 * 3} of 15)
            </button>
          )}
          {p33 >= 5 && <p className="mt-3 text-center text-xs text-muted-foreground/70">All 15 items loaded</p>}
        </div>
      </ComponentPreview>

      {/* Button Group */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Button Group</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Pagination as connected button group.
          </p>
        </div>
        <ComponentPreview id="pagination-button-group">
        <div className="w-full overflow-x-auto pb-1 scrollbar-thin">
          <div className="inline-flex -space-x-px overflow-hidden rounded-md border border-border shadow-sm dark:border-border">
            <button onClick={() => setP34(Math.max(1, p34 - 1))} disabled={p34 === 1} className="border-r border-border bg-white px-3 py-2 text-sm disabled:opacity-40 dark:border-border dark:bg-zinc-900"><ChevronLeft /></button>
            {[1, 2, 3, 4, 5, 6, 7].map((n) => (
              <button key={n} onClick={() => setP34(n)} className={`border-r border-border px-3 py-2 text-sm last:border-r-0 dark:border-border ${n === p34 ? "bg-zinc-900 font-medium text-white dark:bg-muted dark:text-zinc-900" : "bg-white hover:bg-muted/40 dark:bg-zinc-900 dark:hover:bg-muted"}`}>{n}</button>
            ))}
            <button onClick={() => setP34(Math.min(7, p34 + 1))} disabled={p34 === 7} className="bg-white px-3 py-2 text-sm disabled:opacity-40 dark:bg-zinc-900"><ChevronRight /></button>
          </div>
        </div>
      </ComponentPreview>

      {/* Progress */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Progress</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Pagination with progress indicator.
          </p>
        </div>
        <ComponentPreview id="pagination-progress">
        <div className="w-full">
          <div className="mb-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-zinc-900 transition-all dark:bg-muted" style={{ width: `${(p35 / 8) * 100}%` }} />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Progress: {Math.round((p35 / 8) * 100)}%</span>
            <PaginationBar current={p35} total={8} onChange={setP35} size="sm" />
          </div>
        </div>
      </ComponentPreview>

      {/* Color Themes */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Color Themes</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Pagination with different color themes.
          </p>
        </div>
        <ComponentPreview id="pagination-color-themes">
        <div className="flex w-full flex-col gap-4">
          {[
            { label: "Zinc (Default)", bg: "bg-zinc-900 dark:bg-muted", interactive: true },
            { label: "Indigo", bg: "bg-primary", interactive: false },
            { label: "Emerald", bg: "bg-emerald-600", interactive: false },
            { label: "Amber", bg: "bg-warning", interactive: false },
            { label: "Rose", bg: "bg-rose-600", interactive: false },
          ].map((c) => (
            <div key={c.label} className="flex flex-wrap items-center gap-4">
              <span className="w-24 text-xs text-muted-foreground">{c.label}</span>
              <div className="flex min-w-0 max-w-full items-center gap-1 overflow-x-auto pb-1 scrollbar-thin">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                  <button key={n} onClick={() => { if (c.interactive) setP36(n); }} className={`flex h-8 min-w-[32px] items-center justify-center rounded-md border px-2 text-xs ${n === p36 && c.interactive ? `${c.bg} border-transparent text-white` : "border-border dark:border-border"}`}>{n}</button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ComponentPreview>

      {/* Stepper */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Stepper</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Step-based pagination pattern.
          </p>
        </div>
        <ComponentPreview id="pagination-stepper">
        <div className="w-full">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4, 5].map((s) => (
              <div key={s} className="flex flex-1 items-center">
                <button onClick={() => setP37(s)} className={`relative flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium transition-all ${s === p37 ? "bg-foreground text-background shadow-md dark:bg-muted dark:text-zinc-900" : s < p37 ? "bg-zinc-700 text-white dark:bg-muted" : "border border-border bg-white text-muted-foreground/70 dark:border-border dark:bg-zinc-900"}`}>
                  {s < p37 ? <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg> : s}
                </button>
                {s < 5 && <div className={`h-0.5 flex-1 ${s < p37 ? "bg-zinc-700 dark:bg-muted" : "bg-muted"}`} />}
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
            <span>{["Start", "Details", "Review", "Confirm", "Done"][p37 - 1]}</span>
            <button onClick={() => setP37(Math.min(5, p37 + 1))} disabled={p37 === 5} className="rounded-md bg-zinc-900 px-4 py-1.5 text-sm font-medium text-white disabled:opacity-40 dark:bg-muted dark:text-zinc-900">Continue</button>
          </div>
        </div>
      </ComponentPreview>

      {/* Gradient */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Gradient</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Pagination with gradient styles.
          </p>
        </div>
        <ComponentPreview id="pagination-gradient">
        <div className="flex w-full flex-col gap-6">
          <div className="rounded-xl border border-border p-4 dark:border-border">
            <p className="mb-3 text-sm font-medium">Gradient Active Page</p>
            <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-thin">
              <button onClick={() => setP38(Math.max(1, p38 - 1))} disabled={p38 === 1} className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-sm disabled:opacity-40 dark:border-border"><ChevronLeft /></button>
              {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                <button key={n} onClick={() => setP38(n)} className={`flex h-9 min-w-[36px] items-center justify-center rounded-lg text-sm font-medium ${n === p38 ? "bg-gradient-to-br from-zinc-800 to-zinc-600 text-white shadow dark:from-zinc-200 dark:to-zinc-400" : "border border-border hover:bg-muted/40 dark:border-border dark:hover:bg-muted"}`}>{n}</button>
              ))}
              <button onClick={() => setP38(Math.min(7, p38 + 1))} disabled={p38 === 7} className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-sm disabled:opacity-40 dark:border-border"><ChevronRight /></button>
            </div>
          </div>
          <div className="rounded-xl border border-border p-4 dark:border-border">
            <p className="mb-3 text-sm font-medium">Counter Badge on Active</p>
            <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-thin">
              <button onClick={() => setP39(Math.max(1, p39 - 1))} disabled={p39 === 1} className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-sm disabled:opacity-40 dark:border-border"><ChevronLeft /></button>
              {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                <button key={n} onClick={() => setP39(n)} className={`relative flex h-9 min-w-[36px] items-center justify-center rounded-lg border text-sm ${n === p39 ? "border-zinc-900 bg-zinc-900 font-medium text-white dark:border-border dark:bg-muted dark:text-zinc-900" : "border-border hover:bg-muted/40 dark:border-border dark:hover:bg-muted"}`}>
                  {n}
                  {n === p39 && <span className="absolute -right-1.5 -top-1.5 flex h-4 min-w-[14px] items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white">●</span>}
                </button>
              ))}
              <button onClick={() => setP39(Math.min(7, p39 + 1))} disabled={p39 === 7} className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-sm disabled:opacity-40 dark:border-border"><ChevronRight /></button>
            </div>
          </div>
        </div>
      </ComponentPreview>

      {/* Thumbnails */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Thumbnails</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Pagination with thumbnail grid.
          </p>
        </div>
        <ComponentPreview id="pagination-thumbnails">
        <div className="w-full">
          <div className="grid grid-cols-4 gap-3 sm:grid-cols-6">
            {Array.from({ length: 8 }, (_, i) => (
              <div key={i} className="flex aspect-square items-center justify-center rounded-lg bg-muted text-2xl font-bold text-zinc-300 dark:bg-muted">
                {i + 1 + (p40 - 1) * 8}
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-xs text-muted-foreground/70">Page {p40} of 4</span>
            <PaginationBar current={p40} total={4} onChange={setP40} variant="pill" size="sm" />
          </div>
        </div>
      </ComponentPreview>

      {/* Mobile */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Mobile</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Mobile-optimized pagination patterns.
          </p>
        </div>
        <ComponentPreview id="pagination-mobile">
        <div className="flex w-full flex-col gap-6">
          <div className="rounded-xl border border-border p-4 dark:border-border">
            <p className="mb-3 text-sm font-medium">Mobile Optimized (Compact)</p>
            <div className="flex items-center gap-1">
              <button onClick={() => setP41(Math.max(1, p41 - 1))} disabled={p41 === 1} className="flex h-10 flex-1 items-center justify-center gap-1.5 rounded-lg border border-border text-sm font-medium disabled:opacity-40 dark:border-border">
                <ChevronLeft /> Prev
              </button>
              <span className="flex h-10 min-w-[80px] items-center justify-center text-sm font-medium">{p41} of 8</span>
              <button onClick={() => setP41(Math.min(8, p41 + 1))} disabled={p41 === 8} className="flex h-10 flex-1 items-center justify-center gap-1.5 rounded-lg border border-border text-sm font-medium disabled:opacity-40 dark:border-border">
                Next <ChevronRight />
              </button>
            </div>
          </div>
          <div className="rounded-xl border border-border p-4 dark:border-border">
            <p className="mb-3 text-sm font-medium">Full Featured Example</p>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <select className="rounded border border-border px-2 py-1 text-xs dark:border-border dark:bg-muted">
                  <option>10 / page</option><option>20 / page</option><option>50 / page</option>
                </select>
                <span className="text-xs text-muted-foreground">1–10 of 247</span>
              </div>
              <PaginationBar current={p42} total={25} onChange={setP42} />
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <span>Go to</span>
                <input type="number" min={1} max={25} className="w-12 rounded border border-border px-2 py-1 text-center text-xs dark:border-border dark:bg-muted" />
              </div>
            </div>
          </div>
        </div>
      </ComponentPreview>

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
                <td className="px-4 py-3 text-muted-foreground">(page: number) =&gt; void</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">variant</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;default&quot; | &quot;pill&quot; | &quot;square&quot; | &quot;outline&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;default&quot;</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">size</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;sm&quot; | &quot;md&quot; | &quot;lg&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;md&quot;</td>
                <td className="px-4 py-3">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
