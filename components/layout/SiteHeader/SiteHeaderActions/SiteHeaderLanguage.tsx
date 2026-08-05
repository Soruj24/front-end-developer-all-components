"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/cn";

const languages = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "zh", label: "中文", flag: "🇨🇳" },
  { code: "ja", label: "日本語", flag: "🇯🇵" },
  { code: "ko", label: "한국어", flag: "🇰🇷" },
];

interface SiteHeaderLanguageProps {
  className?: string;
}

export function SiteHeaderLanguage({ className }: SiteHeaderLanguageProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(languages[0]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "hidden h-9 items-center gap-1.5 rounded-full px-2.5",
          "text-[13px] font-medium text-muted-foreground",
          "transition-all duration-200",
          "hover:bg-muted hover:text-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          "lg:flex"
        )}
        aria-label="Select language"
        aria-expanded={isOpen}
      >
        <span className="text-base">{selected.flag}</span>
        <span className="hidden xl:inline">{selected.code.toUpperCase()}</span>
        <svg
          className={cn(
            "h-3 w-3 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div
          className={cn(
            "absolute right-0 top-full z-50 mt-1",
            "w-40 rounded-xl border border-border bg-surface p-1.5",
            "shadow-popover animate-scale-in"
          )}
          role="menu"
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => {
                setSelected(lang);
                setIsOpen(false);
              }}
              className={cn(
                "flex w-full items-center gap-2 rounded-lg px-3 py-2",
                "text-[13px] font-medium transition-colors",
                "hover:bg-muted",
                selected.code === lang.code
                  ? "text-foreground bg-muted"
                  : "text-muted-foreground",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              )}
              role="menuitem"
            >
              <span className="text-base">{lang.flag}</span>
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
