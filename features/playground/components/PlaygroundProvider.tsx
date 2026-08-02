"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { PlaygroundContext } from "../context";
import { useFiles } from "../hooks/useFiles";
import { useRunner } from "../hooks/useRunner";
import { useConsole } from "../hooks/useConsole";
import { useLayout } from "../hooks/useLayout";
import { AUTO_RUN_DELAY_MS, DEFAULT_DEVICE_ID, DEFAULT_SETTINGS, DEVICES } from "../constants";
import type { EditorSettings } from "../types";
import { decodeSharePayload, registryItemToFiles } from "../registry";
import { PlaygroundLayout } from "./Playground";

const SETTINGS_KEY = "playground:settings";

function loadSettings(): EditorSettings {
  if (typeof window === "undefined") return { ...DEFAULT_SETTINGS };
  try {
    const raw = window.localStorage.getItem(SETTINGS_KEY);
    if (!raw) return { ...DEFAULT_SETTINGS };
    return { ...DEFAULT_SETTINGS, ...(JSON.parse(raw) as Partial<EditorSettings>) };
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

/** Composes all playground hooks and routes every section of the IDE. */
export function PlaygroundProvider() {
  const searchParams = useSearchParams();
  const files = useFiles();
  const runner = useRunner();
  const consoleApi = useConsole();
  const layout = useLayout();
  const previewRef = useRef<HTMLDivElement | null>(null);

  const [settings, setSettingsState] = useState<EditorSettings>(loadSettings);
  const [deviceId, setDeviceIdState] = useState<string>(() => {
    if (typeof window === "undefined") return DEFAULT_DEVICE_ID;
    return window.localStorage.getItem("playground:device") ?? DEFAULT_DEVICE_ID;
  });
  const [zoom, setZoom] = useState(1);
  const [rotate, setRotate] = useState(false);
  const [previewTheme, setPreviewTheme] = useState<"light" | "dark">("light");
  const [fullscreen, setFullscreen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [statusMessage, setStatusMessage] = useState("Ready");

  const device = useMemo(() => DEVICES.find((d) => d.id === deviceId) ?? DEVICES[0], [deviceId]);

  const setSettings = useCallback((patch: Partial<EditorSettings>) => {
    setSettingsState((prev) => {
      const next = { ...prev, ...patch };
      try {
        window.localStorage.setItem(SETTINGS_KEY, JSON.stringify(next));
      } catch {
        /* storage unavailable */
      }
      return next;
    });
  }, []);

  const setDeviceId = useCallback((id: string) => {
    setDeviceIdState(id);
    try {
      window.localStorage.setItem("playground:device", id);
    } catch {
      /* storage unavailable */
    }
  }, []);

  const { run } = runner;

  const build = useCallback(
    async (entry: string, container: HTMLElement | null) => {
      consoleApi.clearBuild();
      consoleApi.pushBuild("info", `esbuild · ${entry} · ${new Date().toLocaleTimeString()}`);
      const result = await run(files.files, entry, container);
      consoleApi.pushBuild(
        result.ok ? "success" : "error",
        result.ok ? "Build succeeded" : (result.error ?? "Build failed")
      );
      consoleApi.deriveProblems(result.ok ? [] : [result.error ?? ""]);
      setStatusMessage(result.ok ? `Ready — ${entry}` : "Build failed — see Console");
      return result;
    },
    [run, files.files, consoleApi]
  );

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      void build(files.activeName, previewRef.current);
    }, AUTO_RUN_DELAY_MS);
    return () => window.clearTimeout(timeout);
  }, [files.files, files.activeName, build]);

  useEffect(() => {
    const component = searchParams.get("component");
    const payload = searchParams.get("p");
    if (payload) {
      const decoded = decodeSharePayload(payload);
      if (decoded) files.loadProject(decoded);
      return;
    }
    if (component) {
      const project = registryItemToFiles(component);
      if (project.length > 0) files.loadProject(project);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.code === "F11" && event.altKey) {
        event.preventDefault();
        setFullscreen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const value = useMemo(
    () => ({
      files,
      runner,
      console: consoleApi,
      layout,
      settings,
      setSettings,
      device,
      deviceId,
      setDeviceId,
      zoom,
      setZoom,
      rotate,
      setRotate,
      previewTheme,
      setPreviewTheme,
      fullscreen,
      setFullscreen,
      previewRef,
      paletteOpen,
      setPaletteOpen,
      statusMessage,
      setStatusMessage,
      setBottomTab: layout.setBottomTab,
      setSidebarView: layout.setSidebarView,
    }),
    [files, runner, consoleApi, layout, settings, setSettings, device, deviceId, setDeviceId, zoom, rotate, previewTheme, fullscreen, previewRef, paletteOpen, statusMessage]
  );

  return (
    <PlaygroundContext.Provider value={value}>
      <PlaygroundLayout />
    </PlaygroundContext.Provider>
  );
}
