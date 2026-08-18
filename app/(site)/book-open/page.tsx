"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { BookOpen, Bookmark, ChevronLeft, ChevronRight, Share2 } from "lucide-react";

const installCommand = `npx component-library@latest add book-open`;
const usageCode = `import { BookOpen } from "@/components/book-open";

<BookOpen
  title="Chapter 1"
  content="Once upon a time..."
  pageSize={200}
/>`;

interface Page {
  left: string;
  right: string;
}

const samplePages: Page[] = [
  { left: "In the beginning, there was nothing but the vast expanse of darkness. The stars had yet to be born, and the planets had not yet begun their eternal dance around the sun.", right: "Then came the light—a single brilliant spark that pierced through the void. It spread like wildfire, illuminating everything it touched. The universe was born in that moment." },
  { left: "Galaxies spiraled into existence, each one a swirling masterpiece of billions of stars. Nebulae painted the cosmos in hues of purple, blue, and gold.", right: "On a small blue planet, life began to stir. First as simple organisms, then as complex creatures that would one day look up at the stars and wonder." },
  { left: "The oceans formed first, vast and deep. Within their mysterious depths, the building blocks of life combined and recombined in an endless dance of chemistry.", right: "Mountains rose from the seas, their peaks piercing the clouds. Valleys carved by rivers that had been flowing for millions of years." },
];

function BookPagesDemo() {
  const [currentPage, setCurrentPage] = useState(0);
  const page = samplePages[currentPage];

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-lg">
      <div className="flex w-full rounded-lg border bg-card shadow-lg overflow-hidden" style={{ minHeight: 200 }}>
        <div className="w-1/2 border-r p-4 text-sm leading-relaxed text-foreground">
          {page.left}
        </div>
        <div className="w-1/2 p-4 text-sm leading-relaxed text-foreground">
          {page.right}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
          disabled={currentPage === 0}
          className="rounded-md border p-2 hover:bg-muted disabled:opacity-50"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span className="text-sm text-muted-foreground">
          Page {currentPage * 2 + 1}–{currentPage * 2 + 2} of {samplePages.length * 2}
        </span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(samplePages.length - 1, p + 1))}
          disabled={currentPage === samplePages.length - 1}
          className="rounded-md border p-2 hover:bg-muted disabled:opacity-50"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function SinglePageDemo() {
  return (
    <div className="w-full max-w-sm rounded-xl border bg-card p-6 shadow-md">
      <div className="flex items-center gap-2 mb-3">
        <BookOpen className="h-5 w-5 text-primary" />
        <span className="text-sm font-semibold">Chapter 1: The Beginning</span>
      </div>
      <p className="text-sm leading-relaxed text-muted-foreground">
        Once upon a time, in a land far beyond the mountains and seas, there lived a curious inventor who spent their days crafting extraordinary machines from scraps of metal and dreams of the impossible.
      </p>
      <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
        <Bookmark className="h-3 w-3" />
        <span>Bookmark this page</span>
      </div>
    </div>
  );
}

function BookmarkBarDemo() {
  const [bookmarked, setBookmarked] = useState<Record<number, boolean>>({});
  const chapters = ["Introduction", "Getting Started", "Advanced Topics", "Conclusion"];

  return (
    <div className="flex flex-col gap-2 w-full max-w-sm">
      {chapters.map((ch, i) => (
        <div key={i} className="flex items-center gap-3 rounded-lg border bg-card px-3 py-2">
          <button
            onClick={() => setBookmarked((b) => ({ ...b, [i]: !b[i] }))}
            className={`transition-colors ${bookmarked[i] ? "text-yellow-500" : "text-muted-foreground"}`}
          >
            <Bookmark className="h-4 w-4" fill={bookmarked[i] ? "currentColor" : "none"} />
          </button>
          <span className="text-sm flex-1">{ch}</span>
          <Share2 className="h-3 w-3 text-muted-foreground" />
        </div>
      ))}
    </div>
  );
}

function ReadingProgressDemo() {
  const [progress, setProgress] = useState(0);
  return (
    <div className="flex flex-col gap-3 w-full max-w-md">
      <div className="h-2 rounded-full bg-muted overflow-hidden">
        <div className="h-full bg-primary rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
      </div>
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>{Math.round(progress)}% read</span>
        <span>{Math.round(progress * 3.5)} of 350 pages</span>
      </div>
      <input
        type="range" min={0} max={100} value={progress}
        onChange={(e) => setProgress(Number(e.target.value))}
        className="w-full accent-primary"
      />
    </div>
  );
}

export default function BookOpenPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Book Open</h1>
          <Badge variant="primary">Layout</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Book-style page layout with two-column spread, pagination, bookmarks, and reading progress tracking.
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
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Two-Page Spread</h2>
        <ComponentPreview>
          <BookPagesDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Single Chapter</h2>
        <ComponentPreview>
          <SinglePageDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Bookmark Bar</h2>
        <ComponentPreview>
          <BookmarkBarDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Reading Progress</h2>
        <ComponentPreview>
          <ReadingProgressDemo />
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
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">title</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">Yes</td></tr>
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">content</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">Yes</td></tr>
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">pageSize</td><td className="px-4 py-3 text-muted-foreground">number</td><td className="px-4 py-3 text-muted-foreground">200</td><td className="px-4 py-3">No</td></tr>
              <tr><td className="px-4 py-3 font-mono text-xs">className</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
