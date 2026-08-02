"use client";

import { useState } from "react";
import { ComponentPreview } from "@/components/preview";

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
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Header</h1>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          A collection of header patterns — brand navigation, search and avatar,
          two-line utility bars, overlay and glass effects, admin and
          e-commerce layouts, and more. Use the tabs to switch between the live
          preview, source code, CLI, installation, and dependency details for
          each example.
        </p>
      </header>

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

          <div className={frame}>
            <header className="flex w-full flex-col">
              <div className="flex h-7 items-center justify-between bg-muted px-4 text-[10px] text-muted-foreground dark:bg-muted">
                <span>📢 New release 3.0 available</span>
                <span className="flex items-center gap-2">
                  <span>EN ▾</span>
                  <span>Support</span>
                </span>
              </div>
              <div className="flex h-10 items-center justify-between border-b border-black/[.08] bg-white px-4 dark:border-white/[.145] dark:bg-black">
                <div className="flex items-center gap-6">
                  <span className="text-sm font-bold">Product</span>
                  <nav className="flex gap-4 text-xs text-muted-foreground">
                    <span className="text-foreground">Features</span>
                    <span>Pricing</span>
                    <span>Docs</span>
                    <span>Blog</span>
                  </nav>
                </div>
                <div className="flex items-center gap-3">
                  <div className="hidden items-center gap-1 rounded-md border border-black/[.08] bg-muted/40 px-2 py-1 text-xs text-muted-foreground/70 sm:flex dark:border-white/[.145] dark:bg-zinc-900">
                    <span>⌕</span>
                    <span>Search</span>
                  </div>
                  <button className="text-xs text-muted-foreground">Log In</button>
                  <button className="rounded-full bg-foreground px-4 py-1.5 text-xs font-medium text-background">Sign Up</button>
                </div>
              </div>
            </header>
            <div className={content}>Hero Section</div>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="header-overlay-glass">
        <div className="grid w-full gap-6 lg:grid-cols-2">
          <div className="relative flex h-64 w-full flex-col rounded-lg">
            <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" />
            <header className="relative flex h-14 items-center justify-between px-6 text-white">
              <span className="text-sm font-bold">Overlay</span>
              <nav className="flex gap-6 text-xs text-white/70">
                <span className="text-white">Home</span>
                <span>Work</span>
                <span>About</span>
                <span>Contact</span>
              </nav>
              <button className="rounded-full border border-white/30 px-4 py-1.5 text-xs font-medium text-white hover:bg-white/10">Get in Touch</button>
            </header>
            <div className="relative flex flex-1 items-center justify-center text-sm text-white/40">
              Hero Background
            </div>
          </div>

          <div className="relative flex h-64 w-full flex-col rounded-lg">
            <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-pink-400 via-purple-400 to-indigo-500" />
            <header className="relative mx-2 mt-2 flex h-11 items-center justify-between rounded-xl border border-white/20 bg-white/60 px-4 backdrop-blur-md">
              <span className="text-sm font-bold text-zinc-800">Glass</span>
              <nav className="flex gap-4 text-xs text-muted-foreground">
                <span className="font-medium text-zinc-900">Home</span>
                <span>Features</span>
                <span>Pricing</span>
              </nav>
              <button className="rounded-full bg-zinc-900 px-4 py-1 text-xs font-medium text-white">Sign Up</button>
            </header>
            <div className="relative flex flex-1 items-center justify-center text-xs text-white/50">
              Hero Section
            </div>
          </div>

          <div className="relative flex h-64 w-full flex-col rounded-lg overflow-y-auto">
            <div className="sticky top-0 z-10 flex h-11 items-center justify-between border-b border-black/[.08] bg-white/80 px-4 backdrop-blur-md dark:border-white/[.145] dark:bg-black/80">
              <span className="text-sm font-bold">Sticky</span>
              <nav className="flex gap-4 text-xs text-muted-foreground">
                <span>Section 1</span>
                <span>Section 2</span>
                <span>Section 3</span>
              </nav>
            </div>
            <div className={content}>Scrollable Content</div>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="header-admin-dark">
        <div className="grid w-full gap-6 lg:grid-cols-2">
          <div className="flex h-64 w-full flex-col rounded-lg border border-zinc-700">
            <header className="flex h-12 items-center justify-between bg-zinc-900 px-4 text-white">
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold">Admin</span>
                <nav className="flex gap-3 text-[10px] text-muted-foreground/70">
                  <span className="text-white">Dashboard</span>
                  <span>Users</span>
                  <span>Analytics</span>
                  <span>Settings</span>
                </nav>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span>🔔</span>
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-700 text-[10px]">A</span>
              </div>
            </header>
            <div className="flex flex-1 items-center justify-center bg-zinc-950 text-[10px] text-muted-foreground">
              Admin Panel
            </div>
          </div>

          <div className="flex h-64 w-full flex-col rounded-lg">
            <header className="flex h-12 items-center justify-between rounded-t-lg bg-gradient-to-r from-slate-800 via-zinc-800 to-slate-800 px-4 text-white">
              <span className="text-sm font-bold">Dark</span>
              <nav className="flex gap-4 text-xs text-muted-foreground/70">
                <span className="text-white">Dashboard</span>
                <span>Analytics</span>
                <span>Settings</span>
              </nav>
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-700 text-[10px]">D</span>
            </header>
            <div className="flex flex-1 items-center justify-center rounded-b-lg bg-zinc-900 text-[10px] text-muted-foreground">
              Content
            </div>
          </div>

          <div className="flex h-64 w-full flex-col rounded-lg overflow-hidden">
            <header className="flex h-9 items-center justify-between bg-zinc-900 px-4 text-muted-foreground/70">
              <div className="flex items-center gap-2">
                <span className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-danger" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
                  <span className="h-2.5 w-2.5 rounded-full bg-success" />
                </span>
                <span className="ml-3 text-xs text-muted-foreground">terminal — bash</span>
              </div>
              <nav className="flex gap-3 text-[10px] text-muted-foreground">
                <span className="text-zinc-300">File</span>
                <span>Edit</span>
                <span>View</span>
                <span>Help</span>
              </nav>
            </header>
            <div className="flex flex-1 items-center justify-center bg-black text-[10px] text-success/30">
              ~ $
            </div>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="header-ecommerce-social">
        <div className="grid w-full gap-6 lg:grid-cols-2">
          <div className={frame}>
            <header className="flex h-12 items-center justify-between border-b border-black/[.08] bg-white px-4 dark:border-white/[.145] dark:bg-black">
              <div className="flex items-center gap-6">
                <span className="text-sm font-bold">Shop</span>
                <nav className="flex gap-4 text-xs text-muted-foreground">
                  <span className="text-foreground">All</span>
                  <span>Men</span>
                  <span>Women</span>
                  <span>Accessories</span>
                  <span>Sale</span>
                </nav>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span>🔍</span>
                <span className="relative">
                  🛒
                  <span className="absolute -right-2 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-foreground text-[8px] text-background">2</span>
                </span>
              </div>
            </header>
            <div className={content}>Products</div>
          </div>

          <div className={frame}>
            <header className="flex h-12 items-center justify-between border-b border-black/[.08] bg-white px-4 dark:border-white/[.145] dark:bg-black">
              <div className="flex items-center gap-4">
                <span className="text-lg font-bold tracking-tight">◆</span>
                <nav className="flex gap-4 text-xs font-medium text-muted-foreground">
                  <span className="text-foreground">Home</span>
                  <span>Explore</span>
                  <span>Notifications</span>
                  <span>Messages</span>
                </nav>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span>🔍</span>
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-muted text-xs dark:bg-muted">👤</span>
              </div>
            </header>
            <div className={content}>Feed</div>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="header-tabs-breadcrumbs">
        <div className="grid w-full gap-6 lg:grid-cols-2">
          <div className={frame}>
            <header className="flex w-full flex-col">
              <div className="flex h-10 items-center justify-between border-b border-black/[.08] bg-white px-4 dark:border-white/[.145] dark:bg-black">
                <span className="text-sm font-bold">Settings</span>
                <span className="text-xs text-muted-foreground/70">👤</span>
              </div>
              <div className="flex gap-0 border-b border-black/[.08] bg-white px-4 dark:border-white/[.145] dark:bg-black">
                {["Overview", "Security", "Notifications", "Billing"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`px-3 py-2 text-xs font-medium transition-colors ${
                      tab === t
                        ? "border-b-2 border-zinc-950 text-foreground dark:border-zinc-50 dark:text-foreground"
                        : "text-muted-foreground/70 hover:text-muted-foreground"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </header>
            <div className={content}>{tab} Content</div>
          </div>

          <div className={frame}>
            <header className="flex h-11 items-center justify-between border-b border-black/[.08] bg-white px-4 dark:border-white/[.145] dark:bg-black">
              <div className="flex items-center gap-2 text-xs">
                <span className="text-muted-foreground/70">Home</span>
                <span className="text-zinc-300">/</span>
                <span className="text-muted-foreground/70">Products</span>
                <span className="text-zinc-300">/</span>
                <span className="font-medium text-foreground">Current</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground/70">
                <span>Edit</span>
                <span>|</span>
                <span>Delete</span>
              </div>
            </header>
            <div className={content}>Product Details</div>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="header-progress-status">
        <div className="grid w-full gap-6 lg:grid-cols-2">
          <div className={frame}>
            <header className="flex w-full flex-col">
              <div className="flex h-10 items-center justify-between border-b border-black/[.08] bg-white px-4 dark:border-white/[.145] dark:bg-black">
                <span className="text-sm font-bold">Course</span>
                <span className="text-xs text-muted-foreground/70">Lesson 3 of 12</span>
              </div>
              <div className="h-1 bg-muted dark:bg-muted">
                <div className="h-full w-[25%] rounded-r-full bg-blue-500" />
              </div>
            </header>
            <div className={content}>Lesson Content</div>
          </div>

          <div className={frame}>
            <header className="flex h-11 items-center justify-between border-b border-black/[.08] bg-white px-4 dark:border-white/[.145] dark:bg-black">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-success" />
                <span className="text-sm font-bold">Online</span>
              </div>
              <span className="text-xs text-muted-foreground/70">Connected</span>
            </header>
            <div className={content}>Status Page</div>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="header-minimal-badge">
        <div className="grid w-full gap-6 lg:grid-cols-2">
          <div className={frame}>
            <header className="flex h-10 items-center justify-center border-b border-black/[.08] bg-white dark:border-white/[.145] dark:bg-black">
              <span className="text-[10px] font-semibold tracking-widest uppercase text-muted-foreground/70">Minimal</span>
            </header>
            <div className={content}>Content</div>
          </div>

          <div className={frame}>
            <header className="flex h-12 items-center justify-between border-b border-black/[.08] bg-white px-4 dark:border-white/[.145] dark:bg-black">
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold">Docs</span>
                <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground dark:bg-muted">v2.0</span>
              </div>
              <nav className="flex gap-4 text-xs text-muted-foreground">
                <span className="text-foreground">Getting Started</span>
                <span>API</span>
                <span>Components</span>
              </nav>
            </header>
            <div className={content}>Documentation</div>
          </div>

          <div className="flex h-64 w-full flex-col rounded-lg border border-emerald-200 dark:border-emerald-800">
            <header className="flex h-12 items-center justify-between border-b border-emerald-200 bg-emerald-50 px-4 dark:border-emerald-800 dark:bg-emerald-950">
              <span className="text-sm font-bold text-emerald-800 dark:text-emerald-200">Eco</span>
              <nav className="flex gap-4 text-xs text-emerald-600 dark:text-emerald-400">
                <span className="font-medium text-emerald-800 dark:text-emerald-200">Dashboard</span>
                <span>Analytics</span>
                <span>Reports</span>
              </nav>
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-300 text-[10px] text-white dark:bg-emerald-700">E</span>
            </header>
            <div className="flex flex-1 items-center justify-center bg-emerald-50/50 text-[10px] text-emerald-300 dark:bg-emerald-950/50">
              Dashboard
            </div>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="header-language-auth">
        <div className="grid w-full gap-6 lg:grid-cols-2">
          <div className={frame}>
            <header className="flex h-12 items-center justify-between border-b border-black/[.08] bg-white px-4 dark:border-white/[.145] dark:bg-black">
              <div className="flex items-center gap-6">
                <span className="text-sm font-bold">Global</span>
                <nav className="flex gap-4 text-xs text-muted-foreground">
                  <span>Home</span>
                  <span>Products</span>
                  <span>Support</span>
                </nav>
              </div>
              <div className="flex items-center gap-3">
                <select className="rounded border border-black/[.08] bg-transparent px-2 py-0.5 text-xs dark:border-white/[.145]">
                  <option>EN</option>
                  <option>ES</option>
                  <option>FR</option>
                  <option>DE</option>
                </select>
                <button className="text-xs text-muted-foreground hover:text-foreground">Log In</button>
                <button className="rounded-full bg-foreground px-4 py-1.5 text-xs font-medium text-background">Sign Up</button>
              </div>
            </header>
            <div className={content}>Content</div>
          </div>

          <div className={frame}>
            <header className="flex h-12 items-center justify-between border-b border-black/[.08] bg-white px-4 dark:border-white/[.145] dark:bg-black">
              <div className="flex items-center gap-6">
                <span className="text-sm font-bold">App</span>
                <nav className="flex gap-4 text-xs text-muted-foreground">
                  <span className="text-foreground">Dashboard</span>
                  <span>Team</span>
                  <span>Projects</span>
                </nav>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-muted-foreground/70">Help</span>
                <span className="text-zinc-300">|</span>
                <span className="text-muted-foreground">Settings</span>
              </div>
            </header>
            <div className={content}>Content</div>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="header-mobile-drawer">
        <div className="relative flex h-64 w-full max-w-sm flex-col rounded-lg border border-border">
          <header className="flex h-11 items-center justify-between border-b border-black/[.08] bg-white px-4 dark:border-white/[.145] dark:bg-black">
            <span className="text-sm font-bold">App</span>
            <button onClick={() => setDrawerOpen(!drawerOpen)} className="text-sm text-muted-foreground">
              {drawerOpen ? "✕" : "☰"}
            </button>
          </header>
          {drawerOpen && (
            <div className="flex flex-col gap-0.5 border-b border-black/[.08] bg-white px-4 py-2 dark:border-white/[.145] dark:bg-black">
              {["Home", "Products", "About", "Contact"].map((l) => (
                <span key={l} className="rounded-md px-2 py-1.5 text-xs text-muted-foreground hover:bg-muted/40 dark:text-muted-foreground/70">
                  {l}
                </span>
              ))}
            </div>
          )}
          <div className={content}>Content</div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="header-keyboard-shortcuts">
        <div className={frame}>
          <header className="flex h-12 items-center justify-between border-b border-black/[.08] bg-white px-4 dark:border-white/[.145] dark:bg-black">
            <span className="text-sm font-bold">Shortcuts</span>
            <nav className="flex items-center gap-4 text-xs text-muted-foreground">
              {["Home", "Search", "Settings"].map((l, i) => (
                <span key={l} className={`flex items-center gap-1.5 ${i === 0 ? "text-foreground" : ""}`}>
                  {l}
                  <kbd className="rounded border border-black/[.08] px-1 text-[10px] text-muted-foreground/70 dark:border-white/[.145]">⌘{["1", "K", ","][i]}</kbd>
                </span>
              ))}
            </nav>
          </header>
          <div className={content}>Content</div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="header-accent-border">
        <div className={frame}>
          <header className="flex h-12 items-center justify-between border-b-2 border-primary bg-white px-4 dark:bg-black">
            <span className="text-sm font-bold text-primary dark:text-blue-400">Blue</span>
            <nav className="flex gap-4 text-xs text-muted-foreground">
              <span className="text-primary dark:text-blue-400">Home</span>
              <span>About</span>
              <span>Contact</span>
            </nav>
          </header>
          <div className={content}>Content</div>
        </div>
      </ComponentPreview>
    </div>
  );
}
