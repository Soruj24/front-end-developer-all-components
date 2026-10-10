"use client";

import { useState, useEffect, useRef, useSyncExternalStore, type JSX } from "react";
import { cn } from "@/lib/cn";
import {
  FOCUS,
  TRANSITION,
  Z,
  RADIUS,
  BORDER,
  BG,
  TEXT,
} from "@/constants/tokens";

type Theme = "light" | "dark" | "system";

interface ThemeSwitcherProps {
  className?: string;
  onThemeToggle?: (theme: Theme) => void;
}

let themeListeners: Array<() => void> = [];

function subscribeTheme(callback: () => void) {
  themeListeners.push(callback);
  return () => {
    themeListeners = themeListeners.filter((l) => l !== callback);
  };
}

function getThemeSnapshot(): Theme {
  if (typeof window === "undefined") return "system";
  try {
    return (window.localStorage.getItem("theme") as Theme) || "system";
  } catch {
    return "system";
  }
}

function getThemeServerSnapshot(): Theme {
  return "system";
}

function selectTheme(theme: Theme) {
  try {
    localStorage.setItem("theme", theme);
  } catch {
    /* storage unavailable */
  }
  for (const listener of themeListeners) listener();
}

export function ThemeSwitcher({ className, onThemeToggle }: ThemeSwitcherProps) {
  const theme = useSyncExternalStore(subscribeTheme, getThemeSnapshot, getThemeServerSnapshot);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const callbackRef = useRef(onThemeToggle);
  const prevThemeRef = useRef(theme);

  useEffect(() => {
    callbackRef.current = onThemeToggle;
  });

  useEffect(() => {
    if (prevThemeRef.current === theme) return;
    prevThemeRef.current = theme;
    callbackRef.current?.(theme);
  }, [theme]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    if (theme === "system") {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      root.classList.add(prefersDark ? "dark" : "light");
      root.style.colorScheme = prefersDark ? "dark" : "light";
    } else {
      root.classList.add(theme);
      root.style.colorScheme = theme;
    }
  }, [theme]);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        (ref.current?.querySelector("button") as HTMLElement | null)?.focus();
      }
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    // Move focus into the menu on open.
    const menu = ref.current?.querySelector('[role="menu"]');
    const current = menu?.querySelector<HTMLElement>('button[aria-checked="true"]')
      ?? menu?.querySelector<HTMLElement>("button");
    current?.focus();
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
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
        onKeyDown={(e) => {
          if ((e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") && !open) {
            e.preventDefault();
            setOpen(true);
          }
        }}
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-md",
          "text-muted-foreground hover:text-foreground hover:bg-muted",
          "transition-colors",
          FOCUS.ring,
          className,
        )}
        aria-label={`Theme: ${current.label}`}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls="theme-menu"
      >
        {current.icon}
      </button>

      {open && (
        <div
          id="theme-menu"
          className={cn(
            "absolute right-0 top-full mt-1 w-36 overflow-hidden",
            Z.chrome,
            RADIUS.lg,
            BORDER.default,
            "bg-popover shadow-lg",
            "animate-in fade-in-0 zoom-in-95",
          )}
          role="menu"
          aria-label="Theme"
          onKeyDown={(e) => {
            const items = Array.from(
              (e.currentTarget as HTMLElement).querySelectorAll<HTMLElement>("button"),
            );
            const index = items.indexOf(document.activeElement as HTMLElement);
            if (e.key === "ArrowDown") {
              e.preventDefault();
              items[(index + 1) % items.length]?.focus();
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              items[(index - 1 + items.length) % items.length]?.focus();
            }
          }}
        >
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                selectTheme(opt.value);
                setOpen(false);
              }}
              aria-checked={theme === opt.value}
              className={cn(
                "flex w-full items-center gap-2.5 px-3 py-2",
                TEXT.body,
                TRANSITION.colors,
                theme === opt.value
                  ? `${BG.muted} text-foreground`
                  : `text-muted-foreground ${BG.mutedSoft} hover:text-foreground`,
              )}
              role="menuitemradio"
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
