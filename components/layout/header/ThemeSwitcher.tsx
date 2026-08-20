"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

type Theme = "light" | "dark" | "system";

interface ThemeSwitcherProps {
  className?: string;
  onThemeToggle?: (theme: Theme) => void;
}

export function ThemeSwitcher({ className, onThemeToggle }: ThemeSwitcherProps) {
  const [theme, setTheme] = useState<Theme>("system");
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem("theme") as Theme | null;
    if (stored && stored !== theme) setTheme(stored);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    if (theme !== "system") root.classList.add(theme);
    localStorage.setItem("theme", theme);
    onThemeToggle?.(theme);
  }, [theme, mounted, onThemeToggle]);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const options: { value: Theme; label: string; icon: JSX.Element }[] = [
    {
      value: "light",
      label: "Light",
      icon: (
        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="m4.93 4.93 1.41 1.41" />
          <path d="m17.66 17.66 1.41 1.41" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="m6.34 17.66-1.41 1.41" />
          <path d="m19.07 4.93-1.41 1.41" />
        </svg>
      ),
    },
    {
      value: "dark",
      label: "Dark",
      icon: (
        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      ),
    },
    {
      value: "system",
      label: "System",
      icon: (
        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="14" x="2" y="3" rx="2" />
          <line x1="8" x2="16" y1="21" y2="21" />
          <line x1="12" x2="12" y1="17" y2="21" />
        </svg>
      ),
    },
  ];

  const current = options.find((o) => o.value === theme) ?? options[2];

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-md",
          "text-muted-foreground hover:text-foreground hover:bg-muted",
          "transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          "focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          className,
        )}
        aria-label={`Theme: ${current.label}`}
        aria-expanded={open}
      >
        {mounted ? current.icon : options[2].icon}
      </button>

      {open && (
        <div
          className={cn(
            "absolute right-0 top-full z-50 mt-1 w-36 overflow-hidden rounded-lg",
            "border border-border/60 bg-popover shadow-lg",
            "animate-in fade-in-0 zoom-in-95",
          )}
          role="menu"
        >
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                setTheme(opt.value);
                setOpen(false);
              }}
              className={cn(
                "flex w-full items-center gap-2.5 px-3 py-2 text-sm",
                "transition-colors",
                theme === opt.value
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
              role="menuitem"
            >
              {opt.icon}
              {opt.label}
              {theme === opt.value && (
                <svg className="ml-auto h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
