"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/cn";
import type { SpotlightItem, SpotlightSearchProps } from "./SpotlightSearch.types";
import { readList, writeList, buildSections } from "./SpotlightSearch.utils";
import {
  SpotlightSearchBar,
  SpotlightResults,
  SpotlightFooter,
} from "./SpotlightSearchPieces2";

export function SpotlightSearch({
  items,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  placeholder = "Search files, apps, actions...",
  emptyMessage = "No results found",
  storageKey = "spotlight-search",
  recentLimit = 5,
  width = 560,
  maxHeight = 420,
  bindShortcut = true,
  className,
}: SpotlightSearchProps) {
  const [open, setOpen] = useState(openProp ?? defaultOpen);
  const isOpen = openProp ?? open;
  const setOpenState = useCallback(
    (next: boolean) => {
      if (openProp === undefined) setOpen(next);
      onOpenChange?.(next);
    },
    [openProp, onOpenChange],
  );

  const [rendered, setRendered] = useState(isOpen);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (isOpen || !rendered) return;
    const previous = document.activeElement as HTMLElement | null;
    const timer = window.setTimeout(() => {
      setRendered(false);
      setClosing(false);
      previous?.focus();
    }, 160);
    return () => window.clearTimeout(timer);
  }, [isOpen, rendered]);

  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const [recents, setRecents] = useState<string[]>(() =>
    typeof window === "undefined"
      ? []
      : readList(`${storageKey}:recents`) ?? [],
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const [prevOpen, setPrevOpen] = useState(isOpen);
  if (prevOpen !== isOpen) {
    setPrevOpen(isOpen);
    if (isOpen) {
      setRendered(true);
      setClosing(false);
      setQuery("");
      setSelected(0);
    } else {
      setClosing(true);
    }
  }

  const recordRecent = useCallback(
    (id: string) => {
      const next = [id, ...recents.filter((x) => x !== id)].slice(
        0,
        recentLimit,
      );
      setRecents(next);
      if (typeof window !== "undefined")
        writeList(`${storageKey}:recents`, next);
    },
    [recents, recentLimit, storageKey],
  );

  const selectItem = useCallback(
    (item: SpotlightItem) => {
      recordRecent(item.id);
      item.onSelect?.();
      setOpenState(false);
    },
    [recordRecent, setOpenState],
  );

  const sections = useMemo(
    () => buildSections(items, query, recents),
    [items, query, recents],
  );
  const rows = useMemo(() => sections.flatMap((s) => s.rows), [sections]);
  const safeSelected = Math.min(selected, Math.max(0, rows.length - 1));

  const handleKeyDown = useCallback(
    (event: ReactKeyboardEvent<HTMLInputElement>) => {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setSelected((i) => (rows.length > 0 ? (i + 1) % rows.length : 0));
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        setSelected((i) =>
          rows.length > 0 ? (i - 1 + rows.length) % rows.length : 0,
        );
      } else if (event.key === "Home") {
        event.preventDefault();
        setSelected(0);
      } else if (event.key === "End") {
        event.preventDefault();
        setSelected(Math.max(0, rows.length - 1));
      } else if (event.key === "Enter") {
        event.preventDefault();
        const row = rows[safeSelected];
        if (row) selectItem(row);
      } else if (event.key === "Escape") {
        event.preventDefault();
        setOpenState(false);
      }
    },
    [rows, safeSelected, selectItem, setOpenState],
  );

  const handlePanelKeyDown = useCallback(
    (event: ReactKeyboardEvent<HTMLDivElement>) => {
      if (event.key !== "Tab") return;
      event.preventDefault();
      const focusables = Array.from(
        panelRef.current?.querySelectorAll<HTMLElement>("[data-focusable]") ??
          [],
      );
      if (focusables.length === 0) return;
      const current = document.activeElement as HTMLElement | null;
      const index = focusables.indexOf(current as HTMLElement);
      const next = event.shiftKey
        ? index <= 0
          ? focusables[focusables.length - 1]
          : focusables[index - 1]
        : index >= focusables.length - 1
          ? focusables[0]
          : focusables[index + 1];
      next?.focus();
    },
    [],
  );

  useEffect(() => {
    if (!bindShortcut) return;
    const handler = (e: globalThis.KeyboardEvent) => {
      if (
        (e.metaKey || e.ctrlKey) &&
        !e.altKey &&
        e.key.toLowerCase() === "k"
      ) {
        e.preventDefault();
        setOpenState(!isOpen);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [bindShortcut, isOpen, setOpenState]);

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && rendered && !closing) inputRef.current?.focus();
  }, [isOpen, rendered, closing]);

  useEffect(() => {
    if (!rendered || closing) return;
    const el = listRef.current?.querySelector(
      `[data-option-index="${safeSelected}"]`,
    );
    el?.scrollIntoView({ block: "nearest" });
  }, [safeSelected, rendered, closing, rows.length]);

  if (!rendered) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Spotlight search"
      className={cn(
        "fixed inset-0 z-50 flex items-end justify-center sm:items-start sm:px-4 sm:pb-8 sm:pt-[12vh]",
        className,
      )}
    >
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        style={{
          animation: closing
            ? "fade-out 140ms ease both"
            : "fade-in 150ms ease both",
        }}
        onClick={() => setOpenState(false)}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        ref={panelRef}
        onKeyDown={handlePanelKeyDown}
        className={cn(
          "relative z-10 w-full overflow-hidden rounded-2xl border border-border/60 bg-background shadow-2xl shadow-black/10",
          "sm:rounded-2xl",
          "max-sm:rounded-b-none max-sm:rounded-t-2xl",
        )}
        style={{
          width,
          maxWidth: "100%",
          animation: closing
            ? "zoom-out 150ms ease both"
            : "pop 220ms cubic-bezier(0.34, 1.56, 0.64, 1) both",
        }}
      >
        <SpotlightSearchBar
          query={query}
          setQuery={setQuery}
          setSelected={setSelected}
          inputRef={inputRef}
          placeholder={placeholder}
          handleKeyDown={handleKeyDown}
        />
        <SpotlightResults
          listRef={listRef}
          sections={sections}
          rows={rows}
          safeSelected={safeSelected}
          query={query}
          emptyMessage={emptyMessage}
          maxHeight={maxHeight}
          selectItem={selectItem}
          setSelected={setSelected}
        />
        <SpotlightFooter />
      </div>
    </div>,
    document.body,
  );
}
