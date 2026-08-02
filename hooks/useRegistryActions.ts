"use client";

import { useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";

export type RegistryAction = "likes" | "bookmarks" | "downloads";

export interface RegistryActionState {
  liked: boolean;
  bookmarked: boolean;
  downloaded: boolean;
}

/**
 * Tracks the current user's like / bookmark / download state per component,
 * persisted to localStorage so it survives navigation and reloads.
 */
export function useRegistryActions() {
  const [state, setState] = useLocalStorage<Record<string, RegistryActionState>>(
    "registry-actions",
    {}
  );

  const toggleAction = useCallback(
    (slug: string, action: keyof RegistryActionState) => {
      setState((current) => {
        const existing = current[slug] ?? {
          liked: false,
          bookmarked: false,
          downloaded: false,
        };
        return {
          ...current,
          [slug]: { ...existing, [action]: !existing[action] },
        };
      });
    },
    [setState]
  );

  const markDownloaded = useCallback(
    (slug: string) => {
      setState((current) => {
        const existing = current[slug] ?? {
          liked: false,
          bookmarked: false,
          downloaded: false,
        };
        return {
          ...current,
          [slug]: { ...existing, downloaded: true },
        };
      });
    },
    [setState]
  );

  const getActionState = useCallback(
    (slug: string): RegistryActionState => {
      return (
        state[slug] ?? { liked: false, bookmarked: false, downloaded: false }
      );
    },
    [state]
  );

  return { getActionState, toggleAction, markDownloaded };
}
