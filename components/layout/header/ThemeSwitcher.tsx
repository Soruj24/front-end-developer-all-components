"use client";

import { useState, useEffect, useRef, useSyncExternalStore } from "react";
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
  return (localStorage.getItem("theme") as Theme) || "system";
}

function getThemeServerSnapshot(): Theme {
  return "system";
}

function selectTheme(theme: Theme) {
  localStorage.setItem("theme", theme);
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
    if (theme !== "system") root.classList.add(theme);
  }, [theme]);

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
          FOCUS.ring,
          className,
        )}
        aria-label={`Theme: ${current.label}`}
        aria-expanded={open}
      >
        {current.icon}
      </button>

      {open && (
        <div
          className={cn(
            "absolute right-0 top-full mt-1 w-36 overflow-hidden",
            Z.chrome,
            RADIUS.lg,
            BORDER.default,
            "bg-popover shadow-lg",
            "animate-in fade-in-0 zoom-in-95",
          )}
          role="menu"
        >
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                selectTheme(opt.value);
                setOpen(false);
              }}
              className={cn(
                "flex w-full items-center gap-2.5 px-3 py-2",
                TEXT.body,
                TRANSITION.colors,
                theme === opt.value
                  ? `${BG.muted} text-foreground`
                  : `text-muted-foreground ${BG.mutedSoft} hover:text-foreground`,
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
