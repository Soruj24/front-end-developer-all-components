"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { MoonIcon, SunIcon } from "./icons";

interface ThemeToggleProps {
  className?: string;
}

/** Toggles the document theme and persists the preference to localStorage. */
export function ThemeToggle({ className }: ThemeToggleProps) {
  const [mounted, setMounted] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setMounted(true);
      setDark(document.documentElement.classList.contains("dark"));
    }, 0);
    return () => clearTimeout(t);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      /* ignore storage errors */
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground active:scale-95",
        className
      )}
    >
      {mounted ? (
        dark ? (
          <SunIcon className="h-[17px] w-[17px]" />
        ) : (
          <MoonIcon className="h-[17px] w-[17px]" />
        )
      ) : (
        <span className="h-[17px] w-[17px]" />
      )}
    </button>
  );
}
