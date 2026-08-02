/**
 * ChevronLeft + ChevronRight icon helpers. Interpolated into every source that
 * renders them so each emitted example stays self-contained.
 */
export const chevronSource = `function ChevronLeft() {
  return <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>;
}
function ChevronRight() {
  return <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>;
}`;

/**
 * Full pagination bar helper (with chevrons). Interpolated into every source
 * that renders a <PaginationBar /> so the emitted example is self-contained.
 */
export const paginationBarSource = `${chevronSource}

function PaginationBar({
  current, total, onChange, variant = "default", size = "md",
}: {
  current: number; total: number; onChange: (p: number) => void; variant?: string; size?: string;
}) {
  const pages = useMemo(() => {
    const p: (number | "...")[] = []; const delta = 1;
    const s = Math.max(2, current - delta); const e = Math.min(total - 1, current + delta);
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
    : "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900";
  const sizeClass = size === "sm" ? "h-7 min-w-[28px] text-xs" : size === "lg" ? "h-11 min-w-[44px] text-base" : "h-9 min-w-[36px] text-sm";
  const navClass = size === "sm" ? "h-7 text-xs" : size === "lg" ? "h-11 text-base" : "h-9 text-sm";

  return (
    <div className="flex items-center gap-1">
      <button onClick={() => onChange(1)} disabled={current === 1} className={\`\${btnClass} \${sizeClass} flex items-center justify-center border border-zinc-300 disabled:opacity-40 dark:border-zinc-700\`}>
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" /></svg>
      </button>
      <button onClick={() => onChange(Math.max(1, current - 1))} disabled={current === 1} className={\`\${btnClass} \${navClass} flex items-center gap-1 border border-zinc-300 px-2 disabled:opacity-40 dark:border-zinc-700\`}>
        <ChevronLeft /><span className="hidden sm:inline">{size === "sm" ? "" : "Prev"}</span>
      </button>
      <div className="flex items-center gap-1">
        {pages.map((page, i) => page === "..." ? (
          <span key={\`e\${i}\`} className={\`flex \${sizeClass} items-center justify-center text-sm text-zinc-400\`}>...</span>
        ) : (
          <button key={page} onClick={() => onChange(page)}
            className={\`\${btnClass} \${sizeClass} flex items-center justify-center border px-2 \${page === current ? activeClass : "border-zinc-300 hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"}\`}>
            {page}
          </button>
        ))}
      </div>
      <button onClick={() => onChange(Math.min(total, current + 1))} disabled={current === total} className={\`\${navClass} flex items-center gap-1 border border-zinc-300 px-2 disabled:opacity-40 dark:border-zinc-700\`}>
        <span className="hidden sm:inline">{size === "sm" ? "" : "Next"}</span><ChevronRight />
      </button>
      <button onClick={() => onChange(total)} disabled={current === total} className={\`\${btnClass} \${sizeClass} flex items-center justify-center border border-zinc-300 disabled:opacity-40 dark:border-zinc-700\`}>
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" /></svg>
      </button>
    </div>
  );
}`;
