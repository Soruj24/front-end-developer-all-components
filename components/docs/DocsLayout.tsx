"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";
import { findDocPage, slugify } from "@/utils/docs";
import { GithubIcon } from "@/components/layout/icons";
import { DocsTOC, type TOCItem } from "./DocsTOC";
import { DocsPrevNext } from "./DocsPrevNext";
import { ReadingProgress } from "./ReadingProgress";
import { ChevronRightIcon, ClockIcon } from "./icons";
import { attachHeadingLink } from "./heading-links";

interface DocsLayoutProps {
  children: ReactNode;
  /** Overrides the title derived from the navigation tree. */
  title?: string;
  /** Overrides the description derived from the navigation tree. */
  description?: string;
  className?: string;
  /** Extra classes for the content column (defaults to a spaced flex column). */
  contentClassName?: string;
}

/** Documentation page shell: breadcrumb, TOC, reading progress, prev/next. */
export function DocsLayout({
  children,
  title,
  description,
  className,
  contentClassName = "flex flex-col gap-14",
}: DocsLayoutProps) {
  const pathname = usePathname();
  const contentRef = useRef<HTMLDivElement>(null);
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState("");
  const [readingTime, setReadingTime] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [mobileTocOpen, setMobileTocOpen] = useState(false);

  const page = useMemo(() => findDocPage(pathname), [pathname]);
  const resolvedTitle = title ?? page?.label ?? "Documentation";
  const resolvedDescription = description ?? page?.description ?? "";
  const editUrl = `${siteConfig.github.replace(/\/+$/, "")}/edit/main/app${pathname}/page.tsx`;

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const content = contentRef.current;
      if (!content) return;

      const elements = Array.from(
        content.querySelectorAll<HTMLHeadingElement>("h2, h3")
      );
      const seen = new Set<string>();
      const collected: TOCItem[] = [];

      elements.forEach((element, index) => {
        let id = element.id;
        if (!id) {
          id = slugify(element.textContent ?? "") || `section-${index + 1}`;
        }
        if (seen.has(id)) {
          let suffix = 2;
          const base = id;
          while (seen.has(id)) id = `${base}-${suffix++}`;
        }
        seen.add(id);
        element.id = id;
        collected.push({
          id,
          text: element.textContent?.trim() ?? "",
          level: element.tagName === "H3" ? 3 : 2,
        });
        attachHeadingLink(element, id);
      });

      setHeadings(collected);

      const wordCount =
        (content.innerText ?? "").split(/\s+/).filter(Boolean).length;
      setReadingTime(Math.max(1, Math.round(wordCount / 200)));
    }, 0);

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const doc = document.documentElement;
        const max = doc.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);

        const offset = 140;
        let current = "";
        const headingEls = contentRef.current?.querySelectorAll<HTMLElement>(
          "h2[id], h3[id]"
        );
        if (headingEls) {
          headingEls.forEach((element) => {
            if (element.getBoundingClientRect().top <= offset) current = element.id;
          });
        }
        setActiveId(current);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className={cn("relative", className)}>
      <ReadingProgress value={progress} />

      <div className="mx-auto w-full max-w-[88rem] px-4 py-8 sm:px-6 lg:px-10">
        <div className="flex flex-col gap-6">
          <header className="flex flex-col gap-5 pb-6 border-b border-border/60 bg-gradient-to-b from-background via-background to-muted/20 -mx-4 px-4 py-5 sm:-mx-6 sm:px-6 sm:py-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[13px] text-muted-foreground">
                <Link href="/" className="transition-colors hover:text-foreground">
                  Home
                </Link>
                <ChevronRightIcon className="h-3.5 w-3.5 text-muted-foreground/50" />
                <Link
                  href={page?.categoryHref ?? "/"}
                  className="transition-colors hover:text-foreground"
                >
                  {page?.category ?? "Docs"}
                </Link>
                <ChevronRightIcon className="h-3.5 w-3.5 text-muted-foreground/50" />
                <span className="font-medium text-foreground">{resolvedTitle}</span>
              </nav>

              <div className="flex items-center gap-2">
                {readingTime !== null && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/40 px-2.5 py-1 text-[11px] text-muted-foreground">
                    <ClockIcon className="h-3 w-3" />
                    {readingTime} min read
                  </span>
                )}
                <a
                  href={editUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/40 px-2.5 py-1 text-[11px] font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  <GithubIcon className="h-3 w-3" />
                  Edit on GitHub
                </a>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-[2.5rem]">
                {resolvedTitle}
              </h1>
              {resolvedDescription && (
                <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
                  {resolvedDescription}
                </p>
              )}
            </div>
          </header>

          {headings.length > 0 && (
            <div className="xl:hidden">
              <DocsTOC
                items={headings}
                activeId={activeId}
                variant="mobile"
                open={mobileTocOpen}
                onToggle={() => setMobileTocOpen((value) => !value)}
              />
            </div>
          )}

          <div className="flex items-start gap-14">
            <div
              ref={contentRef}
              className={cn("docs min-w-0 flex-1 rounded-xl border border-border/50 bg-card/50 p-6 sm:p-8 backdrop-blur-sm", contentClassName)}
            >
              {children}
              <DocsPrevNext prev={page?.prev} next={page?.next} />
            </div>

          <aside
            className="scrollbar-thin sticky top-14 hidden max-h-[calc(100vh-7.5rem)] w-60 shrink-0 overflow-y-auto rounded-xl border border-border/40 bg-card/30 p-4 backdrop-blur-sm pb-10 xl:block"
            aria-label="Table of contents"
          >
              <DocsTOC items={headings} activeId={activeId} />
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
