"use client";

import { useState } from "react";
import { ComponentPreview } from "@/components/preview";

export default function NavbarPage() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);
  const [tabsTab, setTabsTab] = useState("Overview");
  const [mobileOpen, setMobileOpen] = useState(true);
  const [fullSearchOpen, setFullSearchOpen] = useState(false);
  const [fullDropdown, setFullDropdown] = useState<string | null>(null);
  const [fullNotifCount, setFullNotifCount] = useState(3);
  const [fullUserMenu, setFullUserMenu] = useState(false);
  const [fullMobileOpen, setFullMobileOpen] = useState(false);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Navbar</h1>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          A collection of navigation bar patterns — logo positions, themes,
          search, dropdowns, and responsive variants. Use the tabs to switch
          between the live preview, source code, CLI, installation, and
          dependency details for each example.
        </p>
      </header>

      <ComponentPreview id="navbar-logo">
        <div className="flex w-full flex-col gap-4">
          <nav className="flex h-10 w-full items-center justify-between rounded-lg border border-black/[.08] bg-white px-4 dark:border-white/[.145] dark:bg-black">
            <span className="text-sm font-bold">Logo</span>
            <div className="flex gap-4 text-xs text-muted-foreground">
              <span>Home</span>
              <span>About</span>
              <span>Contact</span>
            </div>
          </nav>
          <nav className="flex h-10 w-full items-center justify-between rounded-lg border border-black/[.08] bg-white px-4 dark:border-white/[.145] dark:bg-black">
            <div />
            <span className="text-sm font-bold tracking-widest uppercase">Brand</span>
            <span className="text-xs text-muted-foreground/70">☰</span>
          </nav>
        </div>
      </ComponentPreview>

      <ComponentPreview id="navbar-cta">
        <div className="flex w-full flex-col gap-4">
          <nav className="flex h-10 w-full items-center justify-between rounded-lg border border-black/[.08] bg-white px-4 dark:border-white/[.145] dark:bg-black">
            <span className="text-sm font-bold">Site</span>
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground">Login</span>
              <span className="rounded-full bg-foreground px-3 py-1 text-xs font-medium text-background">Sign Up</span>
            </div>
          </nav>
          <nav className="flex h-10 w-full items-center justify-between rounded-lg border border-black/[.08] bg-white px-4 dark:border-white/[.145] dark:bg-black">
            <span className="text-sm font-bold">App</span>
            <div className="flex gap-2">
              <span className="rounded-md px-2 py-1 text-xs text-muted-foreground hover:bg-black/[.04]">Features</span>
              <span className="rounded-md px-2 py-1 text-xs text-muted-foreground hover:bg-black/[.04]">Pricing</span>
              <span className="rounded-md bg-foreground px-3 py-1 text-xs font-medium text-background">Sign Up</span>
            </div>
          </nav>
        </div>
      </ComponentPreview>

      <ComponentPreview id="navbar-search">
        <div className="flex w-full flex-col gap-4">
          <nav className="flex h-10 w-full items-center justify-between gap-4 rounded-lg border border-black/[.08] bg-white px-4 dark:border-white/[.145] dark:bg-black">
            <span className="text-sm font-bold">App</span>
            <div className="flex max-w-xs flex-1 items-center gap-1 rounded-md border border-black/[.08] bg-muted/40 px-2 py-1 text-xs text-muted-foreground/70 dark:border-white/[.145] dark:bg-zinc-900">
              <span>⌕</span>
              <span className="flex-1">Search...</span>
              <kbd className="rounded border border-black/[.08] px-1 text-[10px] dark:border-white/[.145]">⌘K</kbd>
            </div>
          </nav>
          <nav className="flex h-11 w-full items-center justify-between gap-4 rounded-lg border border-black/[.08] bg-white px-4 dark:border-white/[.145] dark:bg-black">
            <div className="flex items-center gap-3">
              <span className="text-sm">☰</span>
              <span className="text-sm font-bold">Dashboard</span>
            </div>
            <div className="flex max-w-xs flex-1 items-center gap-1 rounded-md border border-black/[.08] bg-muted/40 px-2 py-1 text-xs text-muted-foreground/70 dark:border-white/[.145] dark:bg-zinc-900">
              <span>⌕</span>
              <span className="flex-1">Search</span>
              <kbd className="rounded border border-black/[.08] px-1 text-[10px] dark:border-white/[.145]">⌘K</kbd>
            </div>
            <div className="flex items-center gap-2">
              <span className="relative text-sm">
                🔔
                <span className="absolute -right-1 -top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-danger text-[7px] text-danger-foreground">3</span>
              </span>
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-[10px] font-bold text-white">JD</span>
            </div>
          </nav>
          <nav className="flex h-10 w-full items-center justify-between rounded-lg border border-black/[.08] bg-white px-4 dark:border-white/[.145] dark:bg-black">
            <span className="text-sm font-bold">App</span>
            <div className="flex items-center gap-2">
              {searchOpen ? (
                <input autoFocus placeholder="Search..." onBlur={() => setSearchOpen(false)} className="w-28 rounded-md border border-black/[.08] px-2 py-1 text-xs focus:outline-none dark:border-white/[.145] dark:bg-zinc-900" />
              ) : (
                <button onClick={() => setSearchOpen(true)} className="text-sm text-muted-foreground/70">🔍</button>
              )}
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-[10px] dark:bg-muted">JD</span>
            </div>
          </nav>
        </div>
      </ComponentPreview>

      <ComponentPreview id="navbar-icons">
        <div className="flex w-full flex-col gap-4">
          <nav className="flex h-10 w-full items-center justify-between rounded-lg border border-black/[.08] bg-white px-4 dark:border-white/[.145] dark:bg-black">
            <span className="text-sm font-bold">Social</span>
            <div className="flex items-center gap-3 text-sm">
              <span className="text-muted-foreground/70">🔍</span>
              <span className="text-muted-foreground/70">🔔</span>
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-[10px] dark:bg-muted">JD</span>
            </div>
          </nav>
          <nav className="flex h-10 w-full items-center justify-between rounded-lg border border-black/[.08] bg-white px-4 dark:border-white/[.145] dark:bg-black">
            <span className="text-sm font-bold">Inbox</span>
            <div className="flex items-center gap-3">
              <span className="relative">
                <span className="text-sm">🔔</span>
                <span className="absolute -right-1 -top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-danger text-[7px] font-bold text-danger-foreground">5</span>
              </span>
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-[10px] dark:bg-muted">JD</span>
            </div>
          </nav>
          <nav className="flex h-10 w-full items-center justify-between rounded-lg border border-black/[.08] bg-white px-4 dark:border-white/[.145] dark:bg-black">
            <span className="text-sm font-bold">Social</span>
            <div className="flex gap-2 text-sm">
              <span className="text-muted-foreground/70">🐦</span>
              <span className="text-muted-foreground/70">📷</span>
              <span className="text-muted-foreground/70">💼</span>
              <span className="text-muted-foreground/70">▶</span>
            </div>
          </nav>
        </div>
      </ComponentPreview>

      <ComponentPreview id="navbar-theme-dark">
        <div className="flex w-full flex-col gap-4">
          <nav className="flex h-10 w-full items-center justify-between rounded-lg bg-zinc-900 px-4 text-white">
            <span className="text-sm font-bold">Dark</span>
            <div className="flex gap-4 text-xs text-muted-foreground/70">
              <span className="text-white">Home</span>
              <span>Features</span>
              <span>Pricing</span>
            </div>
          </nav>
          <nav className="flex h-10 w-full items-center justify-between rounded-lg bg-zinc-900 px-4 text-white">
            <div className="flex items-center gap-4">
              <span className="text-sm font-bold">Admin</span>
              <div className="flex gap-3 text-[10px] text-muted-foreground/70">
                <span className="text-white">Dashboard</span>
                <span>Users</span>
                <span>Analytics</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">🔔</span>
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-700 text-[10px]">A</span>
            </div>
          </nav>
        </div>
      </ComponentPreview>

      <ComponentPreview id="navbar-theme-gradient">
        <div className="flex w-full flex-col gap-4">
          <nav className="flex h-10 w-full items-center justify-between rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-4 text-white">
            <span className="text-sm font-bold">Premium</span>
            <div className="flex gap-4 text-xs text-white/80">
              <span className="text-white">Home</span>
              <span>Products</span>
              <span>Support</span>
            </div>
            <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium">Get Started</span>
          </nav>
          <div className="relative rounded-lg">
            <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600" />
            <nav className="relative mx-2 my-2 flex h-9 items-center justify-between rounded-xl border border-white/20 bg-white/60 px-4 backdrop-blur-md">
              <span className="text-sm font-bold text-zinc-800">Glass</span>
              <div className="flex gap-4 text-xs text-muted-foreground">
                <span className="font-medium text-zinc-900">Home</span>
                <span>About</span>
                <span>Contact</span>
              </div>
              <span className="rounded-full bg-zinc-900 px-3 py-1 text-xs font-medium text-white">Sign Up</span>
            </nav>
          </div>
          <div className="relative w-full rounded-lg">
            <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" />
            <nav className="relative flex h-10 items-center justify-between px-4 text-white">
              <span className="text-sm font-bold">Overlay</span>
              <div className="flex gap-4 text-xs text-white/70">
                <span className="text-white">Home</span>
                <span>Work</span>
                <span>About</span>
              </div>
              <span className="rounded-full border border-white/30 px-3 py-1 text-xs text-white">Contact</span>
            </nav>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="navbar-sticky">
        <div className="flex w-full flex-col rounded-lg border border-border">
          <nav className="sticky top-0 flex h-10 items-center justify-between rounded-t-lg border-b border-black/[.08] bg-white/80 px-4 backdrop-blur dark:border-white/[.145] dark:bg-black/80">
            <span className="text-sm font-bold">Sticky</span>
            <div className="flex gap-4 text-xs text-muted-foreground">
              <span>Section 1</span>
              <span>Section 2</span>
            </div>
          </nav>
          <div className="flex h-10 items-center justify-center text-[10px] text-zinc-300">Content below</div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="navbar-dropdown">
        <nav className="flex h-10 w-full items-center justify-between rounded-lg border border-black/[.08] bg-white px-4 dark:border-white/[.145] dark:bg-black">
          <span className="text-sm font-bold">App</span>
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-muted-foreground hover:bg-black/[.04] dark:hover:bg-white/[.06]"
            >
              Menu ▾
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 top-full mt-1 w-32 rounded-lg border border-black/[.08] bg-white py-1 shadow-lg dark:border-white/[.145] dark:bg-black">
                {["Profile", "Settings", "Logout"].map((l) => (
                  <button key={l} onClick={() => setDropdownOpen(false)} className="w-full px-3 py-1.5 text-left text-xs text-muted-foreground hover:bg-muted/40 dark:text-muted-foreground/70 dark:hover:bg-zinc-900">{l}</button>
                ))}
              </div>
            )}
          </div>
        </nav>
      </ComponentPreview>

      <ComponentPreview id="navbar-avatar-menu">
        <nav className="flex h-10 w-full items-center justify-between rounded-lg border border-black/[.08] bg-white px-4 dark:border-white/[.145] dark:bg-black">
          <span className="text-sm font-bold">Dashboard</span>
          <div className="relative">
            <button
              onClick={() => setAvatarMenuOpen(!avatarMenuOpen)}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-[10px] font-bold text-white"
            >
              JD
            </button>
            {avatarMenuOpen && (
              <div className="absolute right-0 top-full mt-1 w-36 rounded-lg border border-black/[.08] bg-white py-1 shadow-lg dark:border-white/[.145] dark:bg-black">
                {["Profile", "Settings", "Sign out"].map((l) => (
                  <button key={l} onClick={() => setAvatarMenuOpen(false)} className="w-full px-3 py-1.5 text-left text-xs text-muted-foreground hover:bg-muted/40 dark:text-muted-foreground/70 dark:hover:bg-zinc-900">{l}</button>
                ))}
              </div>
            )}
          </div>
        </nav>
      </ComponentPreview>

      <ComponentPreview id="navbar-two-line">
        <div className="flex w-full flex-col gap-4">
          <nav className="flex w-full flex-col rounded-lg border border-black/[.08] bg-white dark:border-white/[.145] dark:bg-black">
            <div className="flex h-6 items-center justify-between bg-muted px-4 text-[10px] text-muted-foreground dark:bg-muted">
              <span>📢 Announcement bar</span>
              <span>✕</span>
            </div>
            <div className="flex h-9 items-center justify-between px-4">
              <span className="text-sm font-bold">Brand</span>
              <div className="flex gap-4 text-xs text-muted-foreground">
                <span>Home</span>
                <span>Products</span>
                <span>About</span>
              </div>
            </div>
          </nav>
          <nav className="flex w-full flex-col rounded-lg border border-border">
            <div className="flex h-6 items-center justify-between bg-muted px-4 text-[10px] text-muted-foreground dark:bg-muted">
              <span>📢 New: Analytics dashboard live</span>
              <span className="flex items-center gap-2">
                <span>EN ▾</span>
                <span>Support</span>
              </span>
            </div>
            <div className="flex h-9 items-center justify-between bg-white px-4 dark:bg-black">
              <div className="flex items-center gap-6">
                <span className="text-sm font-bold">Product</span>
                <div className="flex gap-4 text-xs text-muted-foreground">
                  <span className="text-foreground">Features</span>
                  <span>Pricing</span>
                  <span>Docs</span>
                  <span>Blog</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 rounded-md border border-black/[.08] bg-muted/40 px-2 py-1 text-xs text-muted-foreground/70 dark:border-white/[.145] dark:bg-zinc-900">
                  <span>⌕</span>
                  <span>Search</span>
                </div>
                <span className="text-xs text-muted-foreground">Log In</span>
                <span className="rounded-full bg-foreground px-3 py-1 text-xs font-medium text-background">Sign Up</span>
              </div>
            </div>
          </nav>
        </div>
      </ComponentPreview>

      <ComponentPreview id="navbar-tabs">
        <nav className="flex w-full flex-col rounded-lg border border-black/[.08] bg-white dark:border-white/[.145] dark:bg-black">
          <div className="flex h-9 items-center justify-between px-4">
            <span className="text-sm font-bold">Settings</span>
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-[10px] dark:bg-muted">S</span>
          </div>
          <div className="flex gap-0 border-t border-black/[.08] px-2 dark:border-white/[.145]">
            {["Overview", "Security", "Billing"].map((t) => (
              <button
                key={t}
                onClick={() => setTabsTab(t)}
                className={`px-3 py-1.5 text-xs font-medium transition-colors ${tabsTab === t ? "border-b-2 border-zinc-950 text-foreground dark:border-zinc-50 dark:text-foreground" : "text-muted-foreground/70"}`}
              >
                {t}
              </button>
            ))}
          </div>
        </nav>
      </ComponentPreview>

      <ComponentPreview id="navbar-breadcrumbs">
        <div className="flex w-full flex-col gap-4">
          <nav className="flex h-10 w-full items-center justify-between rounded-lg border border-black/[.08] bg-white px-4 dark:border-white/[.145] dark:bg-black">
            <div className="flex items-center gap-2 text-xs text-muted-foreground/70">
              <span>Home</span>
              <span>/</span>
              <span className="font-medium text-foreground">Products</span>
            </div>
            <span className="text-xs text-muted-foreground/70">Actions</span>
          </nav>
          <nav className="flex h-10 w-full items-center justify-between rounded-lg border border-black/[.08] bg-white px-4 dark:border-white/[.145] dark:bg-black">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold">Docs</span>
              <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground dark:bg-muted">v2.0</span>
            </div>
            <div className="flex gap-4 text-xs text-muted-foreground">
              <span>API</span>
              <span>Guides</span>
            </div>
          </nav>
        </div>
      </ComponentPreview>

      <ComponentPreview id="navbar-language">
        <nav className="flex h-10 w-full items-center justify-between rounded-lg border border-black/[.08] bg-white px-4 dark:border-white/[.145] dark:bg-black">
          <span className="text-sm font-bold">Global</span>
          <div className="flex items-center gap-3">
            <select className="rounded border border-black/[.08] bg-transparent px-2 py-0.5 text-xs dark:border-white/[.145]">
              <option>EN</option>
              <option>ES</option>
              <option>FR</option>
            </select>
            <span className="text-xs text-muted-foreground">Login</span>
            <span className="rounded-full bg-foreground px-3 py-1 text-xs font-medium text-background">Sign Up</span>
          </div>
        </nav>
      </ComponentPreview>

      <ComponentPreview id="navbar-mobile">
        <div className="w-full rounded-lg border border-border">
          <nav className="flex h-10 items-center justify-between bg-white px-4 dark:bg-black">
            <span className="text-sm font-bold">Menu</span>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="text-sm text-muted-foreground">{mobileOpen ? "✕" : "☰"}</button>
          </nav>
          {mobileOpen && (
            <div className="flex flex-col gap-0.5 border-t border-black/[.08] bg-white px-4 py-2 dark:border-white/[.145] dark:bg-black">
              {["Home", "Products", "Services", "About", "Contact"].map((l) => (
                <span key={l} className="rounded-md px-2 py-1.5 text-xs text-muted-foreground hover:bg-muted/40 dark:text-muted-foreground/70">{l}</span>
              ))}
            </div>
          )}
        </div>
      </ComponentPreview>

      <ComponentPreview id="navbar-ecommerce">
        <div className="flex w-full flex-col gap-4">
          <nav className="flex h-11 w-full items-center justify-between rounded-lg border border-black/[.08] bg-white px-4 dark:border-white/[.145] dark:bg-black">
            <div className="flex items-center gap-6">
              <span className="text-sm font-bold">Shop</span>
              <div className="hidden gap-4 text-xs text-muted-foreground sm:flex">
                <span className="text-foreground">All</span>
                <span>Men</span>
                <span>Women</span>
                <span>Sale</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span>🔍</span>
              <span className="relative">
                🛒
                <span className="absolute -right-1.5 -top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-foreground text-[7px] text-background">3</span>
              </span>
            </div>
          </nav>
          <nav className="flex w-full flex-col rounded-lg border border-black/[.08] bg-white dark:border-white/[.145] dark:bg-black">
            <div className="flex h-9 items-center justify-between px-4">
              <span className="text-sm font-bold">Brand</span>
              <span className="text-xs text-muted-foreground/70">Get Started →</span>
            </div>
            <div className="flex">
              {["Home", "Products", "About"].map((l, i) => (
                <span key={l} className={`flex-1 border-r border-black/[.08] px-3 py-1.5 text-center text-[10px] dark:border-white/[.145] ${i === 0 ? "border-b-2 border-zinc-950 font-medium text-foreground dark:border-zinc-50 dark:text-foreground" : "text-muted-foreground/70"}`}>{l}</span>
              ))}
            </div>
          </nav>
        </div>
      </ComponentPreview>

      <ComponentPreview id="navbar-progress">
        <nav className="flex w-full flex-col rounded-lg border border-black/[.08] bg-white dark:border-white/[.145] dark:bg-black">
          <div className="flex h-10 items-center justify-between px-4">
            <span className="text-sm font-bold">Course</span>
            <span className="text-xs text-muted-foreground/70">45%</span>
          </div>
          <div className="h-1 w-full bg-muted dark:bg-muted">
            <div className="h-full w-[45%] rounded-r-full bg-blue-500" />
          </div>
        </nav>
      </ComponentPreview>

      <ComponentPreview id="navbar-status">
        <div className="flex w-full flex-col gap-4">
          <nav className="flex h-10 w-full items-center justify-between rounded-lg border border-black/[.08] bg-white px-4 dark:border-white/[.145] dark:bg-black">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-success" />
              <span className="text-sm font-bold">Online</span>
            </div>
            <span className="text-xs text-muted-foreground/70">Connected</span>
          </nav>
          <nav className="flex h-10 w-full items-center justify-between rounded-lg border border-emerald-200 bg-emerald-50 px-4 dark:border-emerald-800 dark:bg-emerald-950">
            <span className="text-sm font-bold text-emerald-800 dark:text-emerald-200">Eco</span>
            <div className="flex gap-4 text-xs text-emerald-600 dark:text-emerald-400">
              <span className="font-medium text-emerald-800 dark:text-emerald-200">Dashboard</span>
              <span>Analytics</span>
              <span>Reports</span>
            </div>
          </nav>
        </div>
      </ComponentPreview>

      <ComponentPreview id="navbar-shortcuts">
        <nav className="flex h-10 w-full items-center justify-between rounded-lg border border-black/[.08] bg-white px-4 dark:border-white/[.145] dark:bg-black">
          <span className="text-sm font-bold">Shortcuts</span>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              Search <kbd className="rounded border border-black/[.08] px-1 text-[10px] dark:border-white/[.145]">⌘K</kbd>
            </span>
            <span className="flex items-center gap-1">
              Home <kbd className="rounded border border-black/[.08] px-1 text-[10px] dark:border-white/[.145]">⌘1</kbd>
            </span>
          </div>
        </nav>
      </ComponentPreview>

      <ComponentPreview id="navbar-minimal">
        <div className="flex w-full flex-col gap-4">
          <nav className="flex h-8 w-full items-center justify-center rounded-lg border border-black/[.08] bg-white dark:border-white/[.145] dark:bg-black">
            <span className="text-[10px] font-semibold tracking-widest uppercase text-muted-foreground/70">Minimal</span>
          </nav>
          <nav className="flex h-10 w-full items-center justify-between border-b border-black/[.08] px-4 dark:border-white/[.145]">
            <span className="text-sm font-bold">Logo</span>
            <div className="flex gap-6 text-xs font-medium text-muted-foreground">
              <span className="text-foreground">Home</span>
              <span>Features</span>
              <span>Pricing</span>
              <span>FAQ</span>
            </div>
            <span className="text-xs text-muted-foreground">Login</span>
          </nav>
        </div>
      </ComponentPreview>

      <ComponentPreview id="navbar-split">
        <nav className="flex h-10 w-full items-center justify-between rounded-lg border border-black/[.08] bg-white px-4 dark:border-white/[.145] dark:bg-black">
          <div className="flex items-center gap-6">
            <span className="text-sm font-bold">App</span>
            <div className="flex gap-4 text-xs text-muted-foreground">
              <span className="text-foreground">Dashboard</span>
              <span>Team</span>
              <span>Projects</span>
            </div>
          </div>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <span className="text-muted-foreground/70">Help</span>
            <span>Settings</span>
          </div>
        </nav>
      </ComponentPreview>

      <ComponentPreview id="navbar-full-demo">
        <div className="flex w-full flex-col gap-4">
          <nav className="flex h-11 w-full items-center justify-between rounded-lg border border-black/[.08] bg-white/80 px-4 backdrop-blur dark:border-white/[.145] dark:bg-black/80">
            <span className="text-sm font-bold">App</span>

            <div className="hidden items-center gap-1 sm:flex">
              {["Products", "Resources"].map((item) => (
                <div key={item} className="relative">
                  <button
                    onClick={() => setFullDropdown(fullDropdown === item ? null : item)}
                    className={`flex items-center gap-1 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors ${fullDropdown === item ? "bg-muted text-zinc-900 dark:bg-muted dark:text-zinc-100" : "text-muted-foreground hover:text-foreground dark:text-muted-foreground/70 dark:hover:text-zinc-50"}`}
                  >
                    {item}
                    <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {fullDropdown === item && (
                    <div className="absolute left-0 top-full mt-1 w-40 rounded-lg border border-black/[.08] bg-white py-1 shadow-lg dark:border-white/[.145] dark:bg-black">
                      {["Analytics", "Engagement", "Docs"].map((child) => (
                        <button key={child} onClick={() => setFullDropdown(null)} className="block w-full px-3 py-1.5 text-left text-xs text-muted-foreground hover:bg-muted/40 dark:text-muted-foreground/70 dark:hover:bg-zinc-900">{child}</button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <span className="px-2.5 py-1.5 text-xs text-muted-foreground hover:text-foreground dark:text-muted-foreground/70 dark:hover:text-zinc-50">Pricing</span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setFullSearchOpen(!fullSearchOpen)}
                className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-muted dark:hover:bg-muted"
              >
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <button
                onClick={() => setFullNotifCount(0)}
                className="relative flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-muted dark:hover:bg-muted"
              >
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {fullNotifCount > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-danger text-[8px] font-bold text-danger-foreground">{fullNotifCount}</span>
                )}
              </button>
              <div className="relative hidden sm:block">
                <button
                  onClick={() => setFullUserMenu(!fullUserMenu)}
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-[10px] font-bold text-white"
                >
                  JD
                </button>
                {fullUserMenu && (
                  <div className="absolute right-0 top-full mt-1 w-36 rounded-lg border border-black/[.08] bg-white py-1 shadow-lg dark:border-white/[.145] dark:bg-black">
                    {["Profile", "Settings", "Sign out"].map((opt) => (
                      <button key={opt} onClick={() => setFullUserMenu(false)} className="block w-full px-3 py-1.5 text-left text-xs text-muted-foreground hover:bg-muted/40 dark:text-muted-foreground/70 dark:hover:bg-zinc-900">{opt}</button>
                    ))}
                  </div>
                )}
              </div>
              <button onClick={() => setFullMobileOpen(!fullMobileOpen)} className="flex h-7 w-7 items-center justify-center rounded-md text-sm sm:hidden">
                {fullMobileOpen ? "✕" : "☰"}
              </button>
            </div>
          </nav>

          {fullSearchOpen && (
            <div className="relative">
              <input autoFocus placeholder="Search..." className="w-full rounded-lg border border-black/[.08] px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-zinc-300 dark:border-white/[.145] dark:bg-zinc-900 dark:focus:ring-zinc-600" />
            </div>
          )}

          {fullMobileOpen && (
            <div className="flex flex-col gap-1 rounded-lg border border-black/[.08] bg-white p-3 dark:border-white/[.145] dark:bg-black">
              {["Products", "Resources", "Pricing", "About"].map((item) => (
                <span key={item} className="rounded-md px-2 py-1.5 text-xs text-muted-foreground hover:bg-muted/40 dark:text-muted-foreground/70">{item}</span>
              ))}
              <hr className="my-1 border-border" />
              {["Profile", "Settings", "Sign out"].map((opt) => (
                <span key={opt} className="rounded-md px-2 py-1.5 text-xs text-muted-foreground hover:bg-muted/40 dark:text-muted-foreground/70">{opt}</span>
              ))}
            </div>
          )}
        </div>
      </ComponentPreview>
    </div>
  );
}
