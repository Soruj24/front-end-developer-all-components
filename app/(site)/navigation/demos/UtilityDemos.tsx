"use client";

import { useEffect, useState } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";

const sections = ["section-home", "section-features", "section-pricing", "section-contact"];
const tabItems = ["Details", "Reviews", "Shipping"];

const label = (id: string) => id.replace("section-", "").replace(/^\w/, (c) => c.toUpperCase());

/** Scroll progress indicator bound to the page scroll position. */
export function ProgressDemo() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex w-full flex-col gap-3">
      <div
        role="progressbar"
        aria-label="Page scroll progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress)}
        className="h-1.5 w-full overflow-hidden rounded-full bg-muted"
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-primary to-info transition-[width] duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-xs text-muted-foreground">
        Scroll the page to see the indicator track reading position ({Math.round(progress)}%).
      </p>
    </div>
  );
}

/** Scroll-spy pills plus section panels that highlight while scrolling. */
export function ScrollSpyDemo() {
  const [activeSection, setActiveSection] = useState("section-home");

  useEffect(() => {
    const handleScroll = () => {
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 150) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Page sections">
        {sections.map((id) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={activeSection === id}
            onClick={() => scrollTo(id)}
            className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 ${
              activeSection === id
                ? "bg-foreground text-background shadow-xs"
                : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            {label(id)}
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-3">
        {sections.map((id) => (
          <section
            key={id}
            id={id}
            className={`rounded-xl border p-5 transition-colors duration-300 ${
              activeSection === id
                ? "border-foreground/20 bg-muted/40 dark:border-ring/40 dark:bg-muted/60"
                : "border-border"
            }`}
          >
            <h3 className="flex items-center gap-2 font-semibold text-foreground">
              <span
                className={`h-2 w-2 rounded-full transition-colors duration-300 ${
                  activeSection === id ? "bg-primary" : "bg-muted-foreground/30"
                }`}
                aria-hidden="true"
              />
              Section: {label(id)}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              This section is {activeSection === id ? "currently active" : "not active"} in the scroll spy.
            </p>
          </section>
        ))}
      </div>
    </div>
  );
}

/** Breadcrumb trail with muted separators and an aria-current page. */
export function BreadcrumbsDemo() {
  const crumbs = [
    { label: "Home", href: "#" },
    { label: "Products", href: "#" },
  ];

  return (
    <nav aria-label="Breadcrumb" className="w-full">
      <ol className="flex flex-wrap items-center gap-1 text-sm">
        {crumbs.map((crumb) => (
          <li key={crumb.label} className="flex items-center gap-1">
            <a
              href={crumb.href}
              className="rounded-md px-1.5 py-0.5 text-muted-foreground transition-colors duration-150 hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
            >
              {crumb.label}
            </a>
            <ChevronRightIcon className="h-3.5 w-3.5 text-muted-foreground/50" aria-hidden="true" />
          </li>
        ))}
        <li aria-current="page">
          <span className="px-1.5 py-0.5 font-medium text-foreground">Shoes</span>
        </li>
      </ol>
    </nav>
  );
}

/** Segmented tabs that switch the visible panel. */
export function TabsDemo() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="flex w-full flex-col gap-3">
      <div
        role="tablist"
        aria-label="Product info"
        className="flex w-fit items-center gap-1 rounded-xl border border-border bg-muted/40 p-1"
      >
        {tabItems.map((tab, i) => (
          <button
            key={tab}
            type="button"
            role="tab"
            aria-selected={i === activeTab}
            onClick={() => setActiveTab(i)}
            className={`rounded-lg px-4 py-1.5 text-sm font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 ${
              i === activeTab
                ? "bg-background text-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <p role="tabpanel" className="text-sm text-muted-foreground">
        Showing content for &ldquo;{tabItems[activeTab]}&rdquo;.
      </p>
    </div>
  );
}

/** Compact page-number navigation with icon buttons and a filled active page. */
export function PaginationDemo() {
  const [page, setPage] = useState(1);

  const base =
    "inline-flex h-8 min-w-8 items-center justify-center rounded-lg px-2 text-sm font-medium tabular-nums transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 disabled:pointer-events-none disabled:opacity-40";
  const ghost = `${base} border border-transparent text-muted-foreground hover:bg-muted hover:text-foreground`;

  return (
    <nav aria-label="Pagination" className="flex w-fit items-center gap-1 rounded-xl border border-border bg-background p-1 shadow-xs">
      <button type="button" onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1} aria-label="Previous page" className={`${ghost} mr-1`}>
        <ChevronLeftIcon className="h-4 w-4" aria-hidden="true" />
      </button>
      {[1, 2, 3].map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => setPage(p)}
          aria-current={p === page ? "page" : undefined}
          aria-label={`Page ${p}`}
          className={`${base} ${p === page ? "bg-primary text-primary-foreground shadow-xs" : ghost}`}
        >
          {p}
        </button>
      ))}
      <button type="button" onClick={() => setPage(Math.min(3, page + 1))} disabled={page === 3} aria-label="Next page" className={`${ghost} ml-1`}>
        <ChevronRightIcon className="h-4 w-4" aria-hidden="true" />
      </button>
    </nav>
  );
}
