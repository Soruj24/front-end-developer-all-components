"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ComponentPreview } from "@/components/preview";

const navItems = ["Home", "Products", "About", "Contact"];
const tabItems = ["Details", "Reviews", "Shipping"];

const megaMenuProducts = [
  {
    category: "Analytics",
    items: ["Dashboards", "Reports", "Insights", "Forecasts"],
  },
  {
    category: "Developer",
    items: ["API", "Documentation", "SDKs", "Changelog"],
  },
  {
    category: "Marketing",
    items: ["Email", "Social", "SEO", "Ads"],
  },
];

const sections = ["section-home", "section-features", "section-pricing", "section-contact"];

const label = (id: string) => id.replace("section-", "").replace(/^\w/, (c) => c.toUpperCase());

export default function NavigationPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [page, setPage] = useState(1);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [navDropdown, setNavDropdown] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("section-home");

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);

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
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Navigation</h1>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Navigation patterns — nav bars, mega menus, tabs, breadcrumbs,
          pagination, scroll spy, and progress indicators. Use the tabs to
          switch between the live preview, source code, CLI, installation, and
          dependency details for each example.
        </p>
      </header>

      <ComponentPreview id="navigation-basic">
        <nav className="flex w-full items-center gap-6 rounded-lg border border-black/[.08] px-4 py-3 dark:border-white/[.145]">
          {navItems.map((item) => (
            <Link key={item} href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground dark:text-muted-foreground/70 dark:hover:text-zinc-50">
              {item}
            </Link>
          ))}
        </nav>
      </ComponentPreview>

      <ComponentPreview id="navigation-sticky">
        <div className="flex w-full flex-col gap-4">
          <nav className="sticky top-0 z-30 flex w-full items-center justify-between rounded-lg border border-black/[.08] bg-white/80 px-4 py-3 backdrop-blur-md dark:border-white/[.145] dark:bg-zinc-900/80">
            <div className="flex items-center gap-6">
              <span className="text-sm font-bold tracking-tight">Logo</span>
              <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground dark:text-muted-foreground/70 dark:hover:text-zinc-50">
                Home
              </Link>
              <div className="relative" onMouseEnter={() => setMegaOpen(true)} onMouseLeave={() => setMegaOpen(false)}>
                <button className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground dark:text-muted-foreground/70 dark:hover:text-zinc-50">
                  Products
                  <span className="text-xs">▾</span>
                </button>
                {megaOpen && (
                  <div className="absolute left-0 top-full mt-2 w-[min(calc(100vw-3rem),500px)] rounded-lg border border-border bg-white p-5 shadow-xl dark:border-border dark:bg-zinc-900">
                    <div className="grid grid-cols-3 gap-6">
                      {megaMenuProducts.map((group) => (
                        <div key={group.category} className="flex flex-col gap-2">
                          <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{group.category}</span>
                          {group.items.map((item) => (
                            <Link key={item} href="#" className="text-sm text-muted-foreground hover:text-foreground dark:text-muted-foreground/70 dark:hover:text-zinc-50">
                              {item}
                            </Link>
                          ))}
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 border-t border-border pt-4 dark:border-border">
                      <Link href="#" className="text-sm font-medium text-primary hover:text-primary dark:text-blue-400">
                        View all products →
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              <div className="relative" onMouseEnter={() => setNavDropdown(true)} onMouseLeave={() => setNavDropdown(false)}>
                <button className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground dark:text-muted-foreground/70 dark:hover:text-zinc-50">
                  More
                  <span className="text-xs">▾</span>
                </button>
                {navDropdown && (
                  <div className="absolute left-0 top-full mt-2 w-44 rounded-lg border border-border bg-white py-1 shadow-lg dark:border-border dark:bg-zinc-900">
                    <button onClick={() => setNavDropdown(false)} className="w-full px-4 py-1.5 text-left text-sm hover:bg-muted dark:hover:bg-muted">Features</button>
                    <button onClick={() => setNavDropdown(false)} className="w-full px-4 py-1.5 text-left text-sm hover:bg-muted dark:hover:bg-muted">Pricing</button>
                    <button onClick={() => setNavDropdown(false)} className="w-full px-4 py-1.5 text-left text-sm hover:bg-muted dark:hover:bg-muted">Contact</button>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => alert("Command palette would open here (Ctrl+K)")} className="flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 text-xs text-muted-foreground/70 hover:bg-muted/40 dark:border-border dark:hover:bg-muted">
                ⌘K
              </button>
              <div className="flex items-center gap-2 sm:hidden">
                <button onClick={() => setMobileOpen((v) => !v)} className="flex h-8 w-8 flex-col items-center justify-center gap-1">
                  <span className={`block h-0.5 w-5 bg-zinc-600 transition-all dark:bg-muted ${mobileOpen ? "translate-y-[3px] rotate-45" : ""}`} />
                  <span className={`block h-0.5 w-5 bg-zinc-600 transition-all dark:bg-muted ${mobileOpen ? "opacity-0" : ""}`} />
                  <span className={`block h-0.5 w-5 bg-zinc-600 transition-all dark:bg-muted ${mobileOpen ? "-translate-y-[3px] -rotate-45" : ""}`} />
                </button>
              </div>
            </div>
          </nav>
          <div className={`overflow-hidden rounded-lg border border-black/[.08] transition-all dark:border-white/[.145] ${mobileOpen ? "max-h-40" : "max-h-0"} sm:hidden`}>
            <div className="flex flex-col gap-1 p-3">
              {navItems.map((item) => (
                <Link key={item} href="#" className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted dark:hover:bg-muted">
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="navigation-progress">
        <div className="flex w-full flex-col gap-4">
          <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-150" style={{ width: `${scrollProgress}%` }} />
          </div>
          <p className="text-xs text-muted-foreground/70">Scroll the page to see the progress bar move.</p>
        </div>
      </ComponentPreview>

      <ComponentPreview id="navigation-scrollspy">
        <div className="flex w-full flex-col gap-4">
          <div className="flex flex-wrap gap-2">
            {sections.map((id) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${activeSection === id ? "bg-foreground text-background dark:bg-foreground dark:text-background" : "bg-muted text-muted-foreground hover:bg-muted dark:text-muted-foreground/70 dark:hover:bg-muted"}`}
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
                className={`rounded-lg border p-6 transition-colors ${activeSection === id ? "border-zinc-900 bg-muted/40 dark:border-border dark:bg-muted/50" : "border-border"}`}
              >
                <h2 className="font-semibold">Section: {label(id)}</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  This section is {activeSection === id ? "currently active" : "not active"} in the scroll spy.
                </p>
              </section>
            ))}
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="navigation-breadcrumbs">
        <nav className="flex w-full items-center gap-2 text-sm text-muted-foreground">
          <Link href="#" className="hover:text-foreground dark:hover:text-zinc-50">Home</Link>
          <span>/</span>
          <Link href="#" className="hover:text-foreground dark:hover:text-zinc-50">Products</Link>
          <span>/</span>
          <span className="text-foreground">Shoes</span>
        </nav>
      </ComponentPreview>

      <ComponentPreview id="navigation-tabs">
        <div className="flex w-full flex-col gap-4">
          <div className="flex border-b border-border">
            {tabItems.map((tab, i) => (
              <button
                key={tab}
                onClick={() => setActiveTab(i)}
                className={`px-4 py-2 text-sm font-medium transition-colors ${i === activeTab ? "border-b-2 border-zinc-950 text-foreground dark:border-zinc-50 dark:text-foreground" : "text-muted-foreground hover:text-foreground dark:hover:text-zinc-50"}`}
              >
                {tab}
              </button>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            Showing content for &ldquo;{tabItems[activeTab]}&rdquo;.
          </p>
        </div>
      </ComponentPreview>

      <ComponentPreview id="navigation-pagination">
        <div className="flex w-full items-center gap-2">
          <button
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-sm transition-colors hover:bg-muted disabled:opacity-40 dark:hover:bg-muted"
          >
            ←
          </button>
          {[1, 2, 3].map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm transition-colors ${p === page ? "bg-foreground text-background" : "hover:bg-muted dark:hover:bg-muted"}`}
            >
              {p}
            </button>
          ))}
          <button
            onClick={() => setPage(Math.min(3, page + 1))}
            disabled={page === 3}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-sm transition-colors hover:bg-muted disabled:opacity-40 dark:hover:bg-muted"
          >
            →
          </button>
        </div>
      </ComponentPreview>
    </div>
  );
}
