"use client";

import { useCallback, useEffect, useState } from "react";
import { uid } from "@/features/ai";
import type { Preset, Values } from "../types";
import { MAX_PRESETS, PRESETS_STORAGE_KEY } from "../constants";

function readPresets(): Preset[] {
  try {
    const raw = localStorage.getItem(PRESETS_STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Preset[]) : [];
  } catch {
    return [];
  }
}

export interface UsePresetsResult {
  presets: Preset[];
  savePreset: (name: string, values: Values) => void;
  applyPreset: (id: string) => Preset | undefined;
  deletePreset: (id: string) => void;
}

/** Named value snapshots persisted in localStorage. */
export function usePresets(): UsePresetsResult {
  const [presets, setPresets] = useState<Preset[]>(() =>
    typeof window === "undefined" ? [] : readPresets()
  );

  useEffect(() => {
    try {
      localStorage.setItem(PRESETS_STORAGE_KEY, JSON.stringify(presets));
    } catch {
      // Storage unavailable; presets are best-effort.
    }
  }, [presets]);

  const savePreset = useCallback((name: string, values: Values) => {
    const preset: Preset = {
      id: uid("preset"),
      name: name.trim() || "Untitled preset",
      values: JSON.parse(JSON.stringify(values)) as Values,
      createdAt: Date.now(),
    };
    setPresets((prev) => [preset, ...prev].slice(0, MAX_PRESETS));
  }, []);

  const applyPreset = useCallback(
    (id: string): Preset | undefined => {
      const preset = presets.find((item) => item.id === id);
      return preset ? (JSON.parse(JSON.stringify(preset)) as Preset) : undefined;
    },
    [presets]
  );

  const deletePreset = useCallback((id: string) => {
    setPresets((prev) => prev.filter((item) => item.id !== id));
  }, []);

  return { presets, savePreset, applyPreset, deletePreset };
}
