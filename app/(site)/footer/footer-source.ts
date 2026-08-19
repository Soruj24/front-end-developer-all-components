export const FOOTER_SOURCE = `"use client";

import { useState } from "react";
import type { FormEvent, ReactNode } from "react";

export interface FooterColumn {
  title: string;
  links: string[];
}

export interface SocialLink {
  label: string;
  href: string;
  icon: ReactNode;
}

export interface FooterProps {
  logo: string;
  tagline?: string;
  columns: FooterColumn[];
  socialLinks?: SocialLink[];
  showNewsletter?: boolean;
  showBackToTop?: boolean;
}

export function Footer({
  logo,
  tagline = "Building the future of web development, one component at a time.",
  columns,
  socialLinks = [],
  showNewsletter = true,
  showBackToTop = true,
}: FooterProps) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const subscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <footer className="w-full rounded-lg border border-border">
      <div className="grid gap-10 p-8 sm:grid-cols-2 lg:grid-cols-5">
        <div className="flex flex-col gap-4 lg:col-span-1">
          <span className="text-lg font-bold tracking-tight">{logo}</span>
          <p className="text-sm leading-relaxed text-muted-foreground">{tagline}</p>
          <div className="flex gap-3">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="rounded-full bg-muted p-2 text-muted-foreground hover:bg-muted hover:text-muted-foreground"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
        {columns.map((col) => (
          <div key={col.title} className="flex flex-col gap-3">
            <span className="text-sm font-semibold">{col.title}</span>
            {col.links.map((item) => (
              <a key={item} href="#" className="text-sm text-muted-foreground hover:text-foreground">
                {item}
              </a>
            ))}
          </div>
        ))}
      </div>
      {showNewsletter && (
        <div className="border-t border-black/[.08] px-8 py-6 dark:border-white/[.145]">
          <form onSubmit={subscribe} className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              required
              className="w-44 rounded-md border border-border bg-white px-3 py-1.5 text-xs text-muted-foreground dark:bg-muted"
            />
            <button
              type="submit"
              className="rounded-md bg-zinc-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-zinc-700 dark:bg-foreground dark:text-background"
            >
              {subscribed ? "✓ Sent!" : "Subscribe"}
            </button>
          </form>
        </div>
      )}
      {showBackToTop && (
        <div className="flex items-center justify-between border-t border-black/[.08] px-8 py-5 dark:border-white/[.145]">
          <p className="text-xs text-muted-foreground/70">
            © {new Date().getFullYear()} Your Company. All rights reserved.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-1.5 text-xs text-muted-foreground/70 hover:text-muted-foreground"
          >
            <span>↑</span> Back to top
          </button>
        </div>
      )}
    </footer>
  );
}`;