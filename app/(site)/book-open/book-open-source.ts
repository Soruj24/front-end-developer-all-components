export const BOOK_OPEN_SOURCE = `"use client";

import { useState } from "react";

interface BookOpenProps {
  title?: string;
  content?: string;
  pageSize?: number;
}

export function BookOpen({ title = "Chapter 1", content = "", pageSize = 200 }: BookOpenProps) {
  const [page, setPage] = useState(0);
  const total = Math.max(1, Math.ceil(content.length / pageSize));
  const start = page * pageSize;
  const chunk = content.slice(start, start + pageSize);

  return (
    <div className="flex w-full max-w-lg flex-col items-center gap-4">
      <div className="w-full rounded-xl border border-border bg-card p-6 shadow-lg">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-xs font-medium text-muted-foreground">{title}</span>
          <span className="text-xs text-muted-foreground">Page {page + 1} of {total}</span>
        </div>
        <p className="text-sm leading-relaxed text-foreground">{chunk}</p>
      </div>
      <button
        onClick={() => setPage((p) => (p + 1) % total)}
        className="rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-muted"
      >
        Next Page
      </button>
    </div>
  );
}`;

export const SPREAD_EXAMPLE = `<div className="flex w-full rounded-xl border bg-card shadow-lg overflow-hidden">
  <div className="w-1/2 border-r p-5">
    <span className="text-[10px] text-muted-foreground/60">Page 1</span>
    <p className="text-sm leading-relaxed">{page.left}</p>
  </div>
  <div className="w-1/2 p-5">
    <span className="text-[10px] text-muted-foreground/60">Page 2</span>
    <p className="text-sm leading-relaxed">{page.right}</p>
  </div>
</div>`;

export const EREADER_EXAMPLE = `const [fontSize, setFontSize] = useState(16);
const [darkMode, setDarkMode] = useState(false);

<button onClick={() => setFontSize((s) => Math.max(12, s - 2))}>A-</button>
<button onClick={() => setFontSize((s) => Math.min(24, s + 2))}>A+</button>
<button onClick={() => setDarkMode(!darkMode)}>{darkMode ? "Light" : "Dark"}</button>`;

export const LIBRARY_EXAMPLE = `<div className="grid gap-4 sm:grid-cols-2">
  {books.map((book) => (
    <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
      <div className={\`flex h-32 items-end p-4 \${book.color}\`}>
        <span className="text-xs font-bold text-white">{book.progress}%</span>
      </div>
      <div className="p-4">
        <h3 className="text-sm font-bold">{book.title}</h3>
        <p className="text-xs text-muted-foreground">{book.author}</p>
      </div>
    </div>
  ))}
</div>`;

export const TOC_EXAMPLE = `<button
  onClick={() => setExpanded((e) => ({ ...e, [i]: !e[i] }))}
  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium hover:bg-muted"
>
  <ChevronRight className={\`h-3.5 w-3.5 transition-transform \${expanded[i] ? "rotate-90" : ""}\`} />
  <span className="flex-1">{ch.title}</span>
  <span className="font-mono text-xs">p.{ch.page}</span>
</button>`;

export const PROGRESS_EXAMPLE = `<div className="h-2 rounded-full bg-muted overflow-hidden">
  <div
    className="h-full rounded-full bg-foreground transition-all duration-300"
    style={{ width: \`\${progress}%\` }}
  />
</div>
<input type="range" min={0} max={100} value={progress}
  onChange={(e) => setProgress(Number(e.target.value))} />`;

export const BOOKMARKS_EXAMPLE = `<button
  onClick={() => setBookmarks((b) => ({ ...b, [i]: !b[i] }))}
  className={bookmarks[i] ? "text-yellow-500" : "text-muted-foreground/40"}
>
  <Bookmark className="h-4 w-4" fill={bookmarks[i] ? "currentColor" : "none"} />
</button>`;

export const NOTES_EXAMPLE = `<div className="rounded-lg border-l-2 p-3 border-l-yellow-400 bg-yellow-50/50">
  <span className="rounded bg-yellow-100 px-1.5 py-0.5 text-[10px] font-bold text-yellow-700">
    p. {note.page}
  </span>
  <p className="text-sm leading-relaxed">{note.text}</p>
</div>`;