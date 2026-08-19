"use client";

import { useState } from "react";
import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import {
  BookOpen,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Share2,
  Clock,
  Eye,
  Star,
  MoreHorizontal,
  Check,
} from "lucide-react";
import {
  BOOK_OPEN_SOURCE,
  SPREAD_EXAMPLE,
  EREADER_EXAMPLE,
  LIBRARY_EXAMPLE,
  TOC_EXAMPLE,
  PROGRESS_EXAMPLE,
  BOOKMARKS_EXAMPLE,
  NOTES_EXAMPLE,
} from "./book-open-source";

interface Page {
  left: string;
  right: string;
}

const samplePages: Page[] = [
  {
    left: "In the beginning, there was nothing but the vast expanse of darkness. The stars had yet to be born, and the planets had not yet begun their eternal dance around the sun.",
    right: "Then came the light\u2014a single brilliant spark that pierced through the void. It spread like wildfire, illuminating everything it touched. The universe was born in that moment.",
  },
  {
    left: "Galaxies spiraled into existence, each one a swirling masterpiece of billions of stars. Nebulae painted the cosmos in hues of purple, blue, and gold.",
    right: "On a small blue planet, life began to stir. First as simple organisms, then as complex creatures that would one day look up at the stars and wonder.",
  },
  {
    left: "The oceans formed first, vast and deep. Within their mysterious depths, the building blocks of life combined and recombined in an endless dance of chemistry.",
    right: "Mountains rose from the seas, their peaks piercing the clouds. Valleys carved by rivers that had been flowing for millions of years.",
  },
];

function TwoPageSpreadDemo() {
  const [currentPage, setCurrentPage] = useState(0);
  const page = samplePages[currentPage];

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-lg">
      <div className="flex w-full rounded-xl border border-black/[.08] bg-card shadow-lg overflow-hidden dark:border-white/[.145]" style={{ minHeight: 220 }}>
        <div className="w-1/2 border-r border-black/[.06] p-5 dark:border-white/[.1]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-medium text-muted-foreground/60">{currentPage * 2 + 1}</span>
            <span className="text-[10px] text-muted-foreground/60">Chapter 1</span>
          </div>
          <p className="text-sm leading-relaxed text-foreground">{page.left}</p>
        </div>
        <div className="w-1/2 p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] text-muted-foreground/60">The Beginning</span>
            <span className="text-[10px] font-medium text-muted-foreground/60">{currentPage * 2 + 2}</span>
          </div>
          <p className="text-sm leading-relaxed text-foreground">{page.right}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
          disabled={currentPage === 0}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-black/[.08] hover:bg-muted disabled:opacity-50 dark:border-white/[.145]"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="flex gap-1">
          {samplePages.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === currentPage ? "w-6 bg-foreground" : "w-1.5 bg-muted-foreground/30"
              }`}
            />
          ))}
        </div>
        <button
          onClick={() => setCurrentPage((p) => Math.min(samplePages.length - 1, p + 1))}
          disabled={currentPage === samplePages.length - 1}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-black/[.08] hover:bg-muted disabled:opacity-50 dark:border-white/[.145]"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      <span className="text-xs text-muted-foreground">
        Page {currentPage * 2 + 1}\u2013{currentPage * 2 + 2} of {samplePages.length * 2}
      </span>
    </div>
  );
}

function EReaderViewDemo() {
  const [fontSize, setFontSize] = useState(16);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`w-full max-w-lg rounded-xl border shadow-sm overflow-hidden ${
      darkMode
        ? "border-white/[.145] bg-zinc-900 text-zinc-100"
        : "border-black/[.08] bg-card text-foreground"
    }`}>
      <div className="flex items-center justify-between border-b border-black/[.06] px-5 py-3 dark:border-white/[.1]">
        <div className="flex items-center gap-2">
          <BookOpen className="h-4 w-4" />
          <span className="text-sm font-semibold">Chapter 1</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFontSize((s) => Math.max(12, s - 2))}
            className="flex h-7 w-7 items-center justify-center rounded-md text-xs font-medium hover:bg-muted"
          >
            A-
          </button>
          <button
            onClick={() => setFontSize((s) => Math.min(24, s + 2))}
            className="flex h-7 w-7 items-center justify-center rounded-md text-xs font-bold hover:bg-muted"
          >
            A+
          </button>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`flex h-7 items-center gap-1 rounded-md px-2 text-xs font-medium transition-colors ${
              darkMode ? "bg-zinc-700 text-zinc-100" : "bg-muted text-muted-foreground"
            }`}
          >
            {darkMode ? "Light" : "Dark"}
          </button>
        </div>
      </div>
      <div className="p-6" style={{ fontSize }}>
        <h2 className="mb-4 text-xl font-bold">The Beginning</h2>
        <p className="mb-3 leading-relaxed opacity-90">
          Once upon a time, in a land far beyond the mountains and seas, there lived a curious inventor who spent their days crafting extraordinary machines from scraps of metal and dreams of the impossible.
        </p>
        <p className="mb-3 leading-relaxed opacity-90">
          The villagers thought them mad. Why build machines when nature provided everything they needed? But the inventor saw something different\u2014a world where technology and nature could coexist in perfect harmony.
        </p>
        <p className="leading-relaxed opacity-90">
          One crisp autumn morning, as golden leaves danced outside the workshop window, the inventor completed their greatest creation yet.
        </p>
      </div>
      <div className="flex items-center justify-between border-t border-black/[.06] px-5 py-3 dark:border-white/[.1]">
        <span className="text-xs text-muted-foreground">Page 1 of 247</span>
        <div className="flex items-center gap-3">
          <Bookmark className="h-4 w-4 cursor-pointer text-muted-foreground hover:text-foreground" />
          <Share2 className="h-4 w-4 cursor-pointer text-muted-foreground hover:text-foreground" />
        </div>
      </div>
    </div>
  );
}

function BookLibraryDemo() {
  const books = [
    { title: "Design Systems", author: "Sara Vieira", pages: 342, rating: 4.8, color: "bg-blue-500", progress: 100 },
    { title: "Building Design Systems", author: "Fabiola Santana", pages: 288, rating: 4.6, color: "bg-purple-500", progress: 65 },
    { title: "Atomic Design", author: "Brad Frost", pages: 312, rating: 4.9, color: "bg-emerald-500", progress: 30 },
    { title: "Refactoring UI", author: "Steve Schoger", pages: 224, rating: 4.7, color: "bg-orange-500", progress: 0 },
  ];

  return (
    <div className="grid w-full max-w-lg gap-4 sm:grid-cols-2">
      {books.map((book) => (
        <div
          key={book.title}
          className="flex flex-col rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]"
        >
          <div className={`flex h-32 items-end p-4 ${book.color}`}>
            <div className="rounded-lg bg-black/20 px-3 py-1.5 backdrop-blur-sm">
              <span className="text-xs font-bold text-white">{book.progress === 100 ? "Completed" : book.progress > 0 ? "Reading" : "Not started"}</span>
            </div>
          </div>
          <div className="flex flex-1 flex-col p-4">
            <h3 className="text-sm font-bold">{book.title}</h3>
            <p className="text-xs text-muted-foreground">{book.author}</p>
            <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{book.rating}</span>
              <span>\u00b7</span>
              <span>{book.pages} pages</span>
            </div>
            {book.progress > 0 && book.progress < 100 && (
              <div className="mt-3">
                <div className="h-1 rounded-full bg-muted">
                  <div className={`h-full rounded-full ${book.color}`} style={{ width: `${book.progress}%` }} />
                </div>
                <span className="mt-1 text-[10px] text-muted-foreground">{book.progress}% complete</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function TableOfContentsDemo() {
  const [expanded, setExpanded] = useState<Record<number, boolean>>({ true: true });
  const chapters = [
    {
      title: "Getting Started",
      page: 1,
      sections: [
        { title: "Installation", page: 2 },
        { title: "Project Structure", page: 5 },
        { title: "Configuration", page: 8 },
      ],
    },
    {
      title: "Core Concepts",
      page: 15,
      sections: [
        { title: "Components", page: 16 },
        { title: "State Management", page: 24 },
        { title: "Routing", page: 32 },
      ],
    },
    {
      title: "Advanced Patterns",
      page: 45,
      sections: [
        { title: "Server Components", page: 46 },
        { title: "Streaming", page: 52 },
        { title: "Caching", page: 58 },
      ],
    },
    {
      title: "Deployment",
      page: 70,
      sections: [],
    },
  ];

  return (
    <div className="w-full max-w-lg rounded-xl border border-black/[.08] bg-card p-5 shadow-sm dark:border-white/[.145]">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm font-semibold">Table of Contents</span>
        <span className="text-[10px] text-muted-foreground">{chapters.length} chapters</span>
      </div>
      <div className="space-y-1">
        {chapters.map((ch, i) => (
          <div key={i}>
            <button
              onClick={() => setExpanded((e) => ({ ...e, [i]: !e[i] }))}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium hover:bg-muted transition-colors"
            >
              <ChevronRight className={`h-3.5 w-3.5 text-muted-foreground transition-transform ${expanded[i] ? "rotate-90" : ""}`} />
              <span className="flex-1">{ch.title}</span>
              <span className="text-xs text-muted-foreground/60 font-mono">p.{ch.page}</span>
            </button>
            {expanded[i] && ch.sections.length > 0 && (
              <div className="ml-5 space-y-0.5 border-l border-black/[.06] pl-3 dark:border-white/[.08]">
                {ch.sections.map((sec, j) => (
                  <button
                    key={j}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-left text-xs text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                  >
                    <span className="flex-1">{sec.title}</span>
                    <span className="font-mono text-[10px] text-muted-foreground/60">p.{sec.page}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ReadingProgressDemo() {
  const [progress, setProgress] = useState(42);
  const stats = [
    { label: "Current Page", value: "147" },
    { label: "Pages Left", value: "203" },
    { label: "Time Left", value: "4h 12m" },
    { label: "Avg. Speed", value: "48 pg/h" },
  ];

  return (
    <div className="w-full max-w-lg rounded-xl border border-black/[.08] bg-card p-5 shadow-sm dark:border-white/[.145]">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm font-semibold">Reading Progress</span>
        <span className="text-xs font-medium text-muted-foreground">Design Systems</span>
      </div>
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-2xl font-extrabold tabular-nums">{progress}%</span>
          <span className="text-xs text-muted-foreground">Page 147 of 342</span>
        </div>
        <div className="h-2 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full bg-foreground transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-3 mb-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-lg bg-muted/50 p-2.5 text-center">
            <div className="text-sm font-bold tabular-nums">{stat.value}</div>
            <div className="text-[10px] text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={progress}
        onChange={(e) => setProgress(Number(e.target.value))}
        className="w-full accent-foreground"
      />
    </div>
  );
}

function BookmarkedListDemo() {
  const [bookmarks, setBookmarks] = useState<Record<number, boolean>>({ 0: true, 2: true });
  const chapters = [
    { title: "Introduction to Design Tokens", page: 12, note: "Key concept for our design system" },
    { title: "Building Accessible Components", page: 45, note: "WCAG compliance checklist" },
    { title: "Component Documentation", page: 78, note: "" },
    { title: "Testing Strategies", page: 112, note: "Unit vs integration tests" },
    { title: "Publishing to npm", page: 156, note: "" },
  ];

  return (
    <div className="w-full max-w-lg rounded-xl border border-black/[.08] bg-card p-5 shadow-sm dark:border-white/[.145]">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bookmark className="h-4 w-4 fill-foreground" />
          <span className="text-sm font-semibold">Bookmarks</span>
        </div>
        <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
          {Object.values(bookmarks).filter(Boolean).length} saved
        </span>
      </div>
      <div className="space-y-1">
        {chapters.map((ch, i) => (
          <div
            key={i}
            className={`flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors ${
              bookmarks[i] ? "bg-muted/50" : "hover:bg-muted/30"
            }`}
          >
            <button
              onClick={() => setBookmarks((b) => ({ ...b, [i]: !b[i] }))}
              className={`mt-0.5 transition-colors ${
                bookmarks[i] ? "text-yellow-500" : "text-muted-foreground/40"
              }`}
            >
              <Bookmark className="h-4 w-4" fill={bookmarks[i] ? "currentColor" : "none"} />
            </button>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium truncate">{ch.title}</span>
                <span className="shrink-0 text-[10px] font-mono text-muted-foreground/60">p.{ch.page}</span>
              </div>
              {ch.note && (
                <p className="mt-0.5 text-xs text-muted-foreground truncate">{ch.note}</p>
              )}
            </div>
            <MoreHorizontal className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground/40" />
          </div>
        ))}
      </div>
    </div>
  );
}

function BookNotesDemo() {
  const notes = [
    { page: 24, text: "Design tokens are the atoms of our design system\u2014they store visual design attributes.", highlight: true },
    { page: 45, text: "Always test components with screen readers before shipping.", highlight: false },
    { page: 78, text: "Documentation should include do/don\'t examples for each component.", highlight: false },
  ];

  return (
    <div className="w-full max-w-lg rounded-xl border border-black/[.08] bg-card p-5 shadow-sm dark:border-white/[.145]">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="h-4 w-4" />
          <span className="text-sm font-semibold">Notes & Highlights</span>
        </div>
        <span className="text-xs text-muted-foreground">{notes.length} notes</span>
      </div>
      <div className="space-y-3">
        {notes.map((note, i) => (
          <div
            key={i}
            className={`rounded-lg border-l-2 p-3 ${
              note.highlight
                ? "border-l-yellow-400 bg-yellow-50/50 dark:bg-yellow-950/20"
                : "border-l-muted bg-muted/30"
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${
                note.highlight
                  ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-400"
                  : "bg-muted text-muted-foreground"
              }`}>
                p. {note.page}
              </span>
              {note.highlight && (
                <span className="text-[10px] font-medium text-yellow-600 dark:text-yellow-400">Highlighted</span>
              )}
            </div>
            <p className="text-sm leading-relaxed text-foreground">{note.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function BookOpenPage() {
  return (
    <ComponentDocPage
      name="Book Open"
      category="Layout"
      description="Book-style page layout with two-column spread, pagination, bookmarks, and reading progress tracking."
    >
      <PreviewPanel filename="book-open.tsx">
        <TwoPageSpreadDemo />
      </PreviewPanel>
      <SourceCodeViewer source={BOOK_OPEN_SOURCE} filename="components/ui/BookOpen/BookOpen.tsx" defaultExpanded />
      <div className="flex flex-col gap-6">
        <ExampleBlock title="Two-Page Spread" description="Classic book layout with page navigation and dot indicators." code={SPREAD_EXAMPLE}><TwoPageSpreadDemo /></ExampleBlock>
        <ExampleBlock title="E-Reader View" description="Reading mode with adjustable font size and dark/light toggle." code={EREADER_EXAMPLE}><EReaderViewDemo /></ExampleBlock>
        <ExampleBlock title="Book Library" description="Grid of books with covers, ratings, and reading progress." code={LIBRARY_EXAMPLE}><BookLibraryDemo /></ExampleBlock>
        <ExampleBlock title="Table of Contents" description="Collapsible chapter list with page numbers and nested sections." code={TOC_EXAMPLE}><TableOfContentsDemo /></ExampleBlock>
        <ExampleBlock title="Reading Progress" description="Progress bar with stats and interactive slider." code={PROGRESS_EXAMPLE}><ReadingProgressDemo /></ExampleBlock>
        <ExampleBlock title="Bookmarks" description="Saved bookmarks with notes and page references." code={BOOKMARKS_EXAMPLE}><BookmarkedListDemo /></ExampleBlock>
        <ExampleBlock title="Notes & Highlights" description="Annotated passages with page numbers and highlight styles." code={NOTES_EXAMPLE}><BookNotesDemo /></ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}