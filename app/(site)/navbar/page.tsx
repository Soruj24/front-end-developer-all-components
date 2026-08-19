"use client";

import { useState } from "react";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";

const NAVBAR_SOURCE = `"use client";

import { useState } from "react";

export interface NavLink {
  label: string;
  href: string;
}

export interface NavbarProps {
  logo: string;
  links?: NavLink[];
  cta?: { label: string; href: string };
  sticky?: boolean;
}

export function Navbar({ logo, links = [], cta, sticky = false }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const root =
    "flex h-14 items-center justify-between gap-4 rounded-lg border border-black/[.08] bg-white px-4 dark:border-white/[.145] dark:bg-black " +
    (sticky ? "sticky top-0 " : "");
  return (
    <nav className={root}>
      <span className="text-sm font-bold">{logo}</span>
      <div className="hidden items-center gap-6 md:flex">
        {links.map((link) => (
          <a key={link.href} href={link.href} className="text-xs text-muted-foreground hover:text-foreground">
            {link.label}
          </a>
        ))}
        {cta ? (
          <button className="rounded-full bg-foreground px-3 py-1 text-xs font-medium text-background">
            {cta.label}
          </button>
        ) : null}
      </div>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Toggle menu"
        className="text-xs md:hidden"
      >
        {open ? "✕" : "☰"}
      </button>
    </nav>
  );
}`;

function DropdownDemo() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  return (
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
              <button
                key={l}
                onClick={() => setDropdownOpen(false)}
                className="w-full px-3 py-1.5 text-left text-xs text-muted-foreground hover:bg-muted/40 dark:text-muted-foreground/70 dark:hover:bg-zinc-900"
              >
                {l}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}

export default function NavbarPage() {
  return (
    <ComponentDocPage
      name="Navbar"
      category="Navigation"
      description="A collection of navigation bar patterns — logo positions, themes, search, dropdowns, and responsive variants."
    >
      <PreviewPanel filename="navbar.tsx">
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
      </PreviewPanel>

      <SourceCodeViewer
        source={NAVBAR_SOURCE}
        filename="components/ui/Navbar/Navbar.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock
          title="With CTA"
          description="Navigation with login and call-to-action buttons."
          code={`<Navbar logo="Site" links={navLinks} cta={{ label: "Sign Up", href: "/signup" }} />`}
        >
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
        </ExampleBlock>

        <ExampleBlock
          title="With Search"
          description="Navigation bar with an inline search field and shortcuts."
          code={`<Navbar logo="App" links={navLinks} search={<SearchField />} />`}
        >
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
        </ExampleBlock>

        <ExampleBlock
          title="With Dropdown"
          description="Navigation with a dropdown menu for user actions."
          code={`<Navbar logo="App" links={navLinks} dropdown={[{ label: "Profile" }, { label: "Settings" }, { label: "Logout" }]} />`}
        >
          <DropdownDemo />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}