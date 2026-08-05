"use client";

import { useEffect, useCallback } from "react";

interface UseKeyboardShortcutsOptions {
  onSearchToggle?: () => void;
  onEscape?: () => void;
  onArrowUp?: () => void;
  onArrowDown?: () => void;
  onEnter?: () => void;
}

export function useKeyboardShortcuts(options: UseKeyboardShortcutsOptions = {}) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const isModifier = e.metaKey || e.ctrlKey;

      if (isModifier && e.key.toLowerCase() === "k") {
        e.preventDefault();
        options.onSearchToggle?.();
      }

      if (e.key === "Escape") {
        options.onEscape?.();
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        options.onArrowUp?.();
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();
        options.onArrowDown?.();
      }

      if (e.key === "Enter") {
        options.onEnter?.();
      }
    },
    [options]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const isMac =
    typeof navigator !== "undefined" &&
    navigator.platform.toUpperCase().includes("MAC");

  return { isMac };
}
