"use client";

import { useCallback, useState } from "react";
import type { GeneratedComponent } from "../types";
import { saveGeneratedComponent } from "../actions/save";

export interface UseSaveResult {
  isSaving: boolean;
  message?: string;
  savedHref?: string;
  save: (component: GeneratedComponent, publish: boolean) => Promise<void>;
}

/** Save Draft / Publish a generated component against the registry. */
export function useSave(): UseSaveResult {
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<string>();
  const [savedHref, setSavedHref] = useState<string>();

  const save = useCallback(async (component: GeneratedComponent, publish: boolean) => {
    setIsSaving(true);
    setMessage(undefined);
    setSavedHref(undefined);
    try {
      const result = await saveGeneratedComponent({ component, publish });
      if (result.ok) {
        setMessage(publish ? "Published to the registry." : "Draft saved.");
        setSavedHref(result.href);
      } else {
        setMessage(result.error);
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Save failed.");
    } finally {
      setIsSaving(false);
    }
  }, []);

  return { isSaving, message, savedHref, save };
}
