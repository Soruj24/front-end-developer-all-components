"use client";

import { createContext, useContext } from "react";
import type { RefObject } from "react";
import type { BottomTab, DevicePreset, EditorSettings, SidebarView } from "./types";
import type { UseFilesResult } from "./hooks/useFiles";
import type { UseRunnerResult } from "./hooks/useRunner";
import type { UseConsoleResult } from "./hooks/useConsole";
import type { UseLayoutResult } from "./hooks/useLayout";

export interface PlaygroundContextValue {
  files: UseFilesResult;
  runner: UseRunnerResult;
  console: UseConsoleResult;
  layout: UseLayoutResult;
  settings: EditorSettings;
  setSettings: (patch: Partial<EditorSettings>) => void;
  device: DevicePreset;
  deviceId: string;
  setDeviceId: (id: string) => void;
  zoom: number;
  setZoom: (zoom: number) => void;
  rotate: boolean;
  setRotate: (rotate: boolean) => void;
  previewTheme: "light" | "dark";
  setPreviewTheme: (theme: "light" | "dark") => void;
  fullscreen: boolean;
  setFullscreen: (value: boolean) => void;
  previewRef: RefObject<HTMLDivElement | null>;
  paletteOpen: boolean;
  setPaletteOpen: (open: boolean) => void;
  statusMessage: string;
  setStatusMessage: (message: string) => void;
  setBottomTab: (tab: BottomTab) => void;
  setSidebarView: (view: SidebarView) => void;
}

export const PlaygroundContext = createContext<PlaygroundContextValue | null>(null);

export function usePlayground(): PlaygroundContextValue {
  const value = useContext(PlaygroundContext);
  if (!value) throw new Error("usePlayground must be used within PlaygroundProvider");
  return value;
}
