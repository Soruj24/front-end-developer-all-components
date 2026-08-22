"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronDownIcon,
  CommandIcon,
} from "lucide-react";

const navItems = ["Home", "Products", "About", "Contact"];

const megaMenuProducts = [
  { category: "Analytics", items: ["Dashboards", "Reports", "Insights", "Forecasts"] },
  { category: "Developer", items: ["API", "Documentation", "SDKs", "Changelog"] },
  { category: "Marketing", items: ["Email", "Social", "SEO", "Ads"] },
];

const linkBase =
  "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40";

/** Basic horizontal nav bar with pill links and an active state. */
export function BasicNavDemo() {
  return (
    <nav
      aria-label="Main"
      className="flex w-full flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-background px-4 py-2.5 shadow-xs"
    >
      <span className="flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-[11px] font-bold text-primary-foreground shadow-xs">
          CL
        </span>
        <span className="text-sm font-semibold tracking-tight text-foreground">Logo</span>
      </span>
      <div className="flex flex-wrap items-center gap-1">
        {navItems.map((item, i) => (
          <Link
            key={item}
            href="#"
            aria-current={i === 0 ? "page" : undefined}
            className={`${linkBase} ${
              i === 0
                ? "bg-muted text-foreground"
                : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
            }`}
          >
            {item}
          </Link>
        ))}
      </div>
    </nav>
  );
}

/** Sticky nav bar with hover mega menu, dropdown, command hint and mobile menu. */
export function StickyNavDemo() {
  const [megaOpen, setMegaOpen] = useState(false);
  const [navDropdown, setNavDropdown] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const trigger =
    "flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors duration-150 hover:bg-muted/60 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40";

  return (
    <div className="flex w-full flex-col gap-4">
      <nav
        aria-label="Sticky demo"
        className="sticky top-0 z-30 flex w-full items-center justify-between rounded-xl border border-border bg-background/80 px-4 py-2 shadow-xs backdrop-blur-md supports-[backdrop-filter]:bg-background/60"
      >
        <div className="flex items-center gap-1">
          <span className="mr-3 flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-[11px] font-bold text-primary-foreground shadow-xs">
              CL
            </span>
            <span className="text-sm font-semibold tracking-tight text-foreground">Logo</span>
          </span>
          <Link href="#" className={`${linkBase} text-muted-foreground hover:bg-muted/60 hover:text-foreground`}>
            Home
          </Link>

          <div
            className="relative"
            onMouseEnter={() => setMegaOpen(true)}
            onMouseLeave={() => setMegaOpen(false)}
          >
            <button type="button" aria-haspopup="true" aria-expanded={megaOpen} className={trigger}>
              Products
              <ChevronDownIcon
                className={`h-3.5 w-3.5 transition-transform duration-200 ${megaOpen ? "rotate-180" : ""}`}
                aria-hidden="true"
              />
            </button>
            {megaOpen && (
              <div className="absolute left-0 top-full z-40 mt-2 w-[min(calc(100vw-3rem),520px)] animate-scale-in-fast rounded-xl border border-border bg-popover p-5 text-left shadow-popover">
                <div className="grid grid-cols-3 gap-6">
                  {megaMenuProducts.map((group) => (
                    <div key={group.category} className="flex flex-col gap-1.5">
                      <span className="px-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70">
                        {group.category}
                      </span>
                      {group.items.map((item) => (
                        <Link
                          key={item}
                          href="#"
                          className="rounded-md px-2 py-1 text-sm text-muted-foreground transition-colors duration-150 hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
                        >
                          {item}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
                <div className="mt-4 border-t border-border pt-3">
                  <Link href="#" className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80">
                    View all products →
                  </Link>
                </div>
              </div>
            )}
          </div>

          <div
            className="relative"
            onMouseEnter={() => setNavDropdown(true)}
            onMouseLeave={() => setNavDropdown(false)}
          >
            <button type="button" aria-haspopup="true" aria-expanded={navDropdown} className={trigger}>
              More
              <ChevronDownIcon
                className={`h-3.5 w-3.5 transition-transform duration-200 ${navDropdown ? "rotate-180" : ""}`}
                aria-hidden="true"
              />
            </button>
            {navDropdown && (
              <div className="absolute left-0 top-full z-40 mt-2 w-48 animate-scale-in-fast rounded-xl border border-border bg-popover p-1.5 shadow-popover">
                {["Features", "Pricing", "Contact"].map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setNavDropdown(false)}
                    className="w-full rounded-lg px-3 py-1.5 text-left text-sm text-muted-foreground transition-colors duration-150 hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => alert("Command palette would open here (Ctrl+K)")}
            className="hidden items-center gap-1.5 rounded-lg border border-input bg-background px-2.5 py-1.5 text-xs font-medium text-muted-foreground shadow-xs transition-colors duration-150 hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 sm:flex"
          >
            <CommandIcon className="h-3 w-3" aria-hidden="true" />
            K
          </button>
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            className="flex h-9 w-9 flex-col items-center justify-center gap-1 rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 sm:hidden"
          >
            <span className={`block h-0.5 w-4 rounded-full bg-current transition-all duration-200 ${mobileOpen ? "translate-y-[3px] rotate-45" : ""}`} />
            <span className={`block h-0.5 w-4 rounded-full bg-current transition-all duration-200 ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-4 rounded-full bg-current transition-all duration-200 ${mobileOpen ? "-translate-y-[3px] -rotate-45" : ""}`} />
          </button>
        </div>
      </nav>

      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out sm:hidden ${
          mobileOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="mt-1 flex flex-col gap-1 rounded-xl border border-border bg-popover p-2 shadow-popover">
            {navItems.map((item) => (
              <Link
                key={item}
                href="#"
                className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors duration-150 hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
