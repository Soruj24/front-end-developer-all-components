"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";
import { SiteHeaderSearchInput } from "./SiteHeaderSearchInput";
import { SiteHeaderSearchResults } from "./SiteHeaderSearchResults";
import { SiteHeaderSearchRecent } from "./SiteHeaderSearchRecent";

interface SiteHeaderSearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

const recentSearches = [
  { id: "1", query: "button", timestamp: Date.now() },
  { id: "2", query: "dialog", timestamp: Date.now() },
  { id: "3", query: "form", timestamp: Date.now() },
];

const searchResults = [
  { id: "1", title: "Button", description: "Interactive button component", href: "/components/button" },
  { id: "2", title: "Dialog", description: "Modal dialog component", href: "/components/dialog" },
  { id: "3", title: "Form", description: "Form handling utilities", href: "/components/form" },
];

export function SiteHeaderSearchOverlay({
  isOpen,
  onClose,
  className,
}: SiteHeaderSearchOverlayProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (overlayRef.current && !overlayRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-start justify-center pt-[15vh]",
        "bg-black/70 backdrop-blur-sm",
        "animate-fade-in",
        className
      )}
      role="dialog"
      aria-modal="true"
      aria-label="Search"
    >
      <div
        ref={overlayRef}
        className={cn(
          "w-full max-w-lg mx-4",
          "rounded-2xl border border-zinc-800 bg-zinc-900",
          "shadow-modal animate-scale-in"
        )}
      >
        <SiteHeaderSearchInput ref={inputRef} onClose={onClose} />

        <div className="border-t border-zinc-800">
          <SiteHeaderSearchRecent
            searches={recentSearches}
            onSelect={(query) => {
              console.log("Selected:", query);
              onClose();
            }}
          />
        </div>

        <div className="border-t border-zinc-800">
          <SiteHeaderSearchResults results={searchResults} onSelect={onClose} />
        </div>

        <div className="flex items-center justify-between border-t border-zinc-800 px-4 py-2.5">
          <div className="flex items-center gap-4 text-[11px] text-zinc-500">
            <span className="flex items-center gap-1">
              <kbd className="rounded border border-zinc-700 bg-zinc-800 px-1.5 py-0.5 font-mono text-[10px]">↑</kbd>
              <kbd className="rounded border border-zinc-700 bg-zinc-800 px-1.5 py-0.5 font-mono text-[10px]">↓</kbd>
              Navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="rounded border border-zinc-700 bg-zinc-800 px-1.5 py-0.5 font-mono text-[10px]">↵</kbd>
              Select
            </span>
            <span className="flex items-center gap-1">
              <kbd className="rounded border border-zinc-700 bg-zinc-800 px-1.5 py-0.5 font-mono text-[10px]">Esc</kbd>
              Close
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
