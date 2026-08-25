"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";

const installCommand = `npx component-library@latest add header`;

const usageCode = `import { Header } from "@/components/header";

<Header
  logo="MyApp"
  navItems={navLinks}
  cta={{ label: "Sign Up", href: "/signup" }}
/>`;

const headerProps = [
  { prop: "logo", type: "string | ReactNode", default: "-", required: "Yes" },
  { prop: "navItems", type: "NavItem[]", default: "[]", required: "No" },
  { prop: "cta", type: "{ label: string; href: string }", default: "-", required: "No" },
  { prop: "variant", type: "\"default\" | \"glass\" | \"overlay\" | \"admin\"", default: "\"default\"", required: "No" },
];

const frame =
  "flex h-64 w-full flex-col rounded-lg border border-border";
const content =
  "flex flex-1 items-center justify-center bg-muted/40 text-[10px] text-zinc-300 dark:bg-zinc-900";

export default function HeaderPage() {
  const [tab, setTab] = useState("Overview");
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Header</h1>
          <Badge variant="primary">8 variants</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          A collection of header patterns — brand navigation, search and avatar,
          two-line utility bars, overlay and glass effects, admin and
          e-commerce layouts, and more.
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

      {/* Examples */}
      <section className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Examples</h2>

        <h3 className="text-lg font-medium text-foreground">Brand Navigation</h3>
        <p className="text-sm text-muted-foreground">Headers with logo, nav links, and call-to-action buttons.</p>
        <ComponentPreview id="header-brand-nav-cta">
          <div className="grid w-full gap-6 lg:grid-cols-2">
            <div className={frame}>
              <header className="flex h-12 items-center justify-between border-b border-black/[.08] bg-white px-4 dark:border-white/[.145] dark:bg-black">
                <div className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-md bg-foreground text-[10px] font-bold text-background">L</span>
                  <span className="text-sm font-bold">Brand</span>
                </div>
                <nav className="flex gap-4 text-xs text-muted-foreground">
                  {["Home", "Features", "Pricing", "About"].map((l) => (
                    <span key={l} className="hover:text-foreground dark:hover:text-zinc-50">{l}</span>
                  ))}
                </nav>
                <button className="rounded-full bg-foreground px-4 py-1.5 text-xs font-medium text-background">Get Started</button>
              </header>
              <div className={content}>Page Content</div>
            </div>

            <div className={frame}>
              <header className="flex h-14 items-center justify-between border-b border-black/[.08] bg-white px-6 dark:border-white/[.145] dark:bg-black">
                <div />
                <nav className="flex gap-8 text-sm text-muted-foreground">
                  {["Home", "Features", "Pricing", "FAQ"].map((l, i) => (
                    <span key={l} className={`${i === 0 ? "font-medium text-foreground" : ""} hover:text-foreground dark:hover:text-zinc-50`}>{l}</span>
                  ))}
                </nav>
                <button className="rounded-full bg-foreground px-4 py-1.5 text-xs font-medium text-background">Sign Up</button>
              </header>
              <div className={content}>Hero Section</div>
            </div>

            <div className={frame}>
              <header className="flex h-12 items-center justify-between border-b border-black/[.08] bg-white px-6 dark:border-white/[.145] dark:bg-black">
                <nav className="flex gap-6 text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">Home</span>
                  <span>Products</span>
                  <span>About</span>
                </nav>
                <span className="text-sm font-bold tracking-wider">BRAND</span>
                <nav className="flex gap-6 text-xs text-muted-foreground">
                  <span>Blog</span>
                  <span>Contact</span>
                  <span className="font-medium text-foreground">Cart</span>
                </nav>
              </header>
              <div className={content}>Content</div>
            </div>

            <div className={frame}>
              <header className="flex h-12 items-center justify-between border-b border-black/[.08] bg-white px-4 dark:border-white/[.145] dark:bg-black">
                <span className="text-sm font-bold">Landing</span>
                <nav className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>Features</span>
                  <span>Pricing</span>
                  <span className="rounded-full bg-foreground px-4 py-1.5 text-xs font-medium text-background">Get Started</span>
                </nav>
              </header>
              <div className={content}>Hero Section</div>
            </div>
          </div>
        </ComponentPreview>

        <h3 className="text-lg font-medium text-foreground">Search & Avatar</h3>
        <p className="text-sm text-muted-foreground">Headers with search bars, notifications, and user avatars.</p>
        <ComponentPreview id="header-search-avatar">
          <div className="grid w-full gap-6 lg:grid-cols-2">
            <div className={frame}>
              <header className="flex h-12 items-center justify-between gap-4 border-b border-black/[.08] bg-white px-4 dark:border-white/[.145] dark:bg-black">
                <span className="text-sm font-bold">Dashboard</span>
                <div className="flex max-w-xs flex-1 items-center gap-1 rounded-md border border-black/[.08] bg-muted/40 px-2 py-1 text-xs text-muted-foreground/70 dark:border-white/[.145] dark:bg-zinc-900">
                  <span>⌕</span>
                  <span className="flex-1">Search</span>
                  <kbd className="rounded border border-black/[.08] px-1 text-[10px] dark:border-white/[.145]">⌘K</kbd>
                </div>
                <div className="flex items-center gap-3">
                  <span className="relative">
                    <span className="text-sm">🔔</span>
                    <span className="absolute -right-1 -top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-danger text-[8px] text-danger-foreground">3</span>
                  </span>
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-muted text-xs dark:bg-muted">JD</span>
                </div>
              </header>
              <div className={content}>Dashboard Content</div>
            </div>

            <div className={frame}>
              <header className="flex h-12 items-center justify-between border-b border-black/[.08] bg-white px-4 dark:border-white/[.145] dark:bg-black">
                <div className="flex items-center gap-3">
                  <span className="text-sm">☰</span>
                  <span className="text-sm font-bold">Overview</span>
                </div>
                <div className="flex flex-1 max-w-md items-center gap-1.5 rounded-md border border-black/[.08] bg-muted/40 px-2.5 py-1.5 text-xs text-muted-foreground/70 dark:border-white/[.145] dark:bg-zinc-900">
                  <span>⌕</span>
                  <span className="flex-1">Search anything...</span>
                  <kbd className="rounded border border-black/[.08] px-1 text-[10px] dark:border-white/[.145]">⌘K</kbd>
                </div>
                <div className="flex items-center gap-3">
                  <span className="relative text-sm">
                    🔔
                    <span className="absolute -right-1 -top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-danger text-[8px] text-danger-foreground">5</span>
                  </span>
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-[10px] font-bold text-white">JD</span>
                </div>
              </header>
              <div className={content}>Dashboard Grid</div>
            </div>

            <div className={frame}>
              <header className="flex h-12 items-center gap-3 border-b border-black/[.08] bg-white px-4 dark:border-white/[.145] dark:bg-black">
                <span className="text-sm">☰</span>
                <span className="text-sm font-bold">Dashboard</span>
                <div className="ml-auto flex items-center gap-2 text-xs text-muted-foreground/70">
                  <span>⌕</span>
                  <span>🔔</span>
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-[10px] dark:bg-muted">A</span>
                </div>
              </header>
              <div className={content}>Content</div>
            </div>

            <div className={frame}>
              <header className="flex h-12 items-center justify-between border-b border-black/[.08] bg-white px-4 dark:border-white/[.145] dark:bg-black">
                <span className="text-sm font-bold">Inbox</span>
                <div className="flex items-center gap-1">
                  {["All", "Unread", "Mentions"].map((t, i) => (
                    <button key={t} className={`rounded-md px-2 py-1 text-xs ${i === 0 ? "bg-muted font-medium dark:bg-muted" : "text-muted-foreground"}`}>{t}</button>
                  ))}
                </div>
                <span className="relative text-sm">
                  🔔
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-danger text-[8px] font-bold text-danger-foreground">12</span>
                </span>
              </header>
              <div className={content}>Messages</div>
            </div>
          </div>
        </ComponentPreview>

        <h3 className="text-lg font-medium text-foreground">Collapsible Search</h3>
        <p className="text-sm text-muted-foreground">Toggle-able search inputs in header bars.</p>
        <ComponentPreview id="header-collapsible-search">
          <div className="flex h-64 w-full max-w-md flex-col rounded-lg border border-border">
            <header className="flex h-12 items-center justify-between border-b border-black/[.08] bg-white px-4 dark:border-white/[.145] dark:bg-black">
              <span className="text-sm font-bold">App</span>
              <div className="flex items-center gap-2">
                {searchOpen ? (
                  <input
                    autoFocus
                    placeholder="Type to search..."
                    onBlur={() => setSearchOpen(false)}
                    className="w-28 rounded-md border border-black/[.08] px-2 py-1 text-xs focus:outline-none dark:border-white/[.145] dark:bg-zinc-900"
                  />
                ) : (
                  <button onClick={() => setSearchOpen(true)} className="text-sm text-muted-foreground/70 hover:text-muted-foreground">🔍</button>
                )}
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-[10px] dark:bg-muted">👤</span>
              </div>
            </header>
            <div className={content}>Content</div>
          </div>
        </ComponentPreview>

        <h3 className="text-lg font-medium text-foreground">Two-Line Utility Bars</h3>
        <p className="text-sm text-muted-foreground">Announcement bars, phone numbers, and multi-line headers.</p>
        <ComponentPreview id="header-two-line">
          <div className="grid w-full gap-6 lg:grid-cols-2">
            <div className={frame}>
              <header className="flex w-full flex-col">
                <div className="flex h-7 items-center justify-between bg-muted px-4 text-[10px] text-muted-foreground dark:bg-muted">
                  <span>🚀 New: Analytics dashboard is live!</span>
                  <span>✕</span>
                </div>
                <div className="flex h-11 items-center justify-between border-b border-black/[.08] bg-white px-4 dark:border-white/[.145] dark:bg-black">
                  <span className="text-sm font-bold">AppName</span>
                  <nav className="flex gap-4 text-xs text-muted-foreground">
                    <span>Dashboard</span>
                    <span>Team</span>
                    <span>Settings</span>
                  </nav>
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-muted text-xs dark:bg-muted">👤</span>
                </div>
              </header>
              <div className={content}>Content</div>
            </div>

            <div className={frame}>
              <header className="flex w-full flex-col">
                <div className="flex h-7 items-center justify-between bg-muted px-4 text-[10px] text-muted-foreground dark:bg-muted">
                  <span className="flex items-center gap-2">
                    <span>📞</span>
                    <span>1-800-555-0199</span>
                  </span>
                  <div className="flex items-center gap-3">
                    <span>Help</span>
                    <span>|</span>
                    <span>EN ▾</span>
                  </div>
                </div>
                <div className="flex h-11 items-center justify-between border-b border-black/[.08] bg-white px-4 dark:border-white/[.145] dark:bg-black">
                  <span className="text-sm font-bold">Brand</span>
                  <nav className="flex gap-4 text-xs text-muted-foreground">
                    <span className="text-foreground">Home</span>
                    <span>Shop</span>
                    <span>About</span>
                    <span>Contact</span>
                  </nav>
                  <span className="text-sm">🛒</span>
                </div>
              </header>
              <div className={content}>Content</div>
            </div>
          </div>
        </ComponentPreview>
      </section>


    </div>
  );
}
