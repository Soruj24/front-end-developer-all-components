"use client";

import { useCallback, useState } from "react";
import type { BottomTab, SidebarView } from "../types";

export interface UseLayoutResult {
  sidebarOpen: boolean;
  sidebarView: SidebarView;
  sidebarWidth: number;
  editorWidth: number;
  bottomOpen: boolean;
  bottomTab: BottomTab;
  bottomHeight: number;
  aiOpen: boolean;
  aiWidth: number;
  toggleSidebar: () => void;
  setSidebarView: (view: SidebarView) => void;
  setSidebarWidth: (width: number) => void;
  setEditorWidth: (width: number) => void;
  toggleBottom: () => void;
  setBottomTab: (tab: BottomTab) => void;
  setBottomHeight: (height: number) => void;
  toggleAi: () => void;
  setAiOpen: (open: boolean) => void;
  setAiWidth: (width: number) => void;
}

/** Resizable IDE layout state (sidebar width, editor/preview split, bottom height). */
export function useLayout(): UseLayoutResult {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarView, setSidebarViewState] = useState<SidebarView>("explorer");
  const [sidebarWidth, setSidebarWidthState] = useState(248);
  const [editorWidth, setEditorWidthState] = useState(50);
  const [bottomOpen, setBottomOpen] = useState(true);
  const [bottomTab, setBottomTabState] = useState<BottomTab>("console");
  const [bottomHeight, setBottomHeightState] = useState(220);
  const [aiOpen, setAiOpenState] = useState(false);
  const [aiWidth, setAiWidthState] = useState(340);

  const toggleSidebar = useCallback(() => setSidebarOpen((v) => !v), []);
  const setSidebarView = useCallback((view: SidebarView) => setSidebarViewState(view), []);
  const setSidebarWidth = useCallback((width: number) => setSidebarWidthState(width), []);
  const setEditorWidth = useCallback((width: number) => setEditorWidthState(width), []);
  const toggleBottom = useCallback(() => setBottomOpen((v) => !v), []);
  const setBottomTab = useCallback((tab: BottomTab) => setBottomTabState(tab), []);
  const setBottomHeight = useCallback((height: number) => setBottomHeightState(height), []);
  const toggleAi = useCallback(() => setAiOpenState((v) => !v), []);
  const setAiOpen = useCallback((open: boolean) => setAiOpenState(open), []);
  const setAiWidth = useCallback((width: number) => setAiWidthState(width), []);

  return {
    sidebarOpen,
    sidebarView,
    sidebarWidth,
    editorWidth,
    bottomOpen,
    bottomTab,
    bottomHeight,
    aiOpen,
    aiWidth,
    toggleSidebar,
    setSidebarView,
    setSidebarWidth,
    setEditorWidth,
    toggleBottom,
    setBottomTab,
    setBottomHeight,
    toggleAi,
    setAiOpen,
    setAiWidth,
  };
}
