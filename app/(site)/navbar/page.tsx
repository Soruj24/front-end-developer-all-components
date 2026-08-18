"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";

const installCommand = `npx component-library@latest add navbar`;

const usageCode = `import { Navbar } from "@/components/navbar";

<Navbar
  logo="MyApp"
  links={navLinks}
  cta={{ label: "Get Started", href: "/signup" }}
/>`;

const navbarProps = [
  { prop: "logo", type: "string | ReactNode", default: "-", required: "Yes" },
  { prop: "links", type: "NavLink[]", default: "[]", required: "No" },
  { prop: "cta", type: "{ label: string; href: string }", default: "-", required: "No" },
  { prop: "variant", type: "\"default\" | \"dark\" | \"gradient\" | \"glass\"", default: "\"default\"", required: "No" },
  { prop: "sticky", type: "boolean", default: "false", required: "No" },
];

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
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Navbar</h1>
          <Badge variant="primary">16 variants</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          A collection of navigation bar patterns — logo positions, themes,
          search, dropdowns, and responsive variants.
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
      </section>

      {/* API Reference */}
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
              {navbarProps.map((row, i) => (
                <tr key={row.prop} className={i < navbarProps.length - 1 ? "border-b" : ""}>
                  <td className="px-4 py-3 font-mono text-xs">{row.prop}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.type}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.default}</td>
                  <td className="px-4 py-3">{row.required}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
