"use client";

import type { NavItem } from "../types/portfolio";

interface NavbarProps {
  items: NavItem[];
}

export function Navbar({ items }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-800 bg-black/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
        <a href="#" className="text-lg font-bold tracking-tight text-white">
          JD<span className="text-blue-500">.</span>
        </a>
        <div className="hidden items-center gap-8 md:flex">
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-zinc-400 transition-colors hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </div>
        <a
          href="#contact"
          className="rounded-full bg-white px-5 py-2 text-sm font-medium text-black transition-all hover:bg-zinc-200"
        >
          Let&apos;s Talk
        </a>
      </div>
    </nav>
  );
}
