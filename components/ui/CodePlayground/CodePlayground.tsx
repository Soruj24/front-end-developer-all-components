"use client";

import * as React from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createRoot, type Root } from "react-dom/client";
import * as JsxRuntime from "react/jsx-runtime";
import * as UILib from "@/components/ui";
import { cn } from "@/lib/cn";
import type { CodePlaygroundProps, PlaygroundFile, ConsoleEntry, DeviceKey } from "./CodePlayground.types";
import { highlightCode, loadEsbuild, transformFile, resolveRelative, isConsoleNoise, readSharedFiles, downloadBlob } from "./CodePlayground.utils";
import { CodePlaygroundToolbar } from "./CodePlaygroundToolbar";
import { CodePlaygroundEditor } from "./CodePlaygroundEditor";
import { CodePlaygroundPreview } from "./CodePlaygroundPreview";
import { CodePlaygroundConsole } from "./CodePlaygroundConsole";

const VIRTUAL_MODULES: Record<string, unknown> = {
  react: React,
  "react/jsx-runtime": JsxRuntime,
  "react/jsx-dev-runtime": JsxRuntime,
  "react-dom": React,
  "react-dom/client": { createRoot },
};

let consoleId = 0;

export function CodePlayground({ files: initialFiles, entry, title = "Code Playground", className, height = 560, defaultTheme = "dark", captureConsole = true, showConsole: initialShowConsole = true, shareKey = "files" }: CodePlaygroundProps) {
  const filesRef = useRef<PlaygroundFile[]>(initialFiles);
  const [files, setFiles] = useState<PlaygroundFile[]>(initialFiles);
  const entryName = files.find((f) => f.name === entry)?.name ?? files[0]?.name ?? "App.tsx";
  const [activeName, setActiveName] = useState(entryName);
  const activeFile = files.find((f) => f.name === activeName) ?? files[0] ?? { name: "App.tsx", source: "" };

  const [running, setRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [logs, setLogs] = useState<ConsoleEntry[]>([]);
  const [consoleOpen, setConsoleOpen] = useState(initialShowConsole);
  const [theme, setTheme] = useState<"light" | "dark">(defaultTheme);
  const [device, setDevice] = useState<DeviceKey>("fluid");
  const [fullscreen, setFullscreen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);

  const previewRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<Root | null>(null);
  const scrollMirrorRef = useRef<HTMLDivElement>(null);
  const runIdRef = useRef(0);
  const firstDelayRef = useRef(300);

  useEffect(() => { filesRef.current = files; }, [files]);
  useEffect(() => { const timer = window.setTimeout(() => { const restored = readSharedFiles(shareKey); if (restored) { setFiles(restored); setActiveName((restored.find((f) => f.name === entry) ?? restored[0])?.name ?? "App.tsx"); } const savedTheme = window.localStorage.getItem("code-playground:theme"); if (savedTheme === "light" || savedTheme === "dark") setTheme(savedTheme); }, 0); return () => window.clearTimeout(timer); }, []);
  useEffect(() => { document.documentElement.classList.toggle("dark", theme === "dark"); }, [theme]);

  const toggleTheme = () => { setTheme((current) => { const next = current === "dark" ? "light" : "dark"; if (typeof window !== "undefined") window.localStorage.setItem("code-playground:theme", next); return next; }); };

  useEffect(() => {
    if (!captureConsole) return;
    const original = { log: console.log.bind(console), info: console.info.bind(console), debug: console.debug.bind(console), warn: console.warn.bind(console), error: console.error.bind(console) };
    const emit = (type: ConsoleEntry["type"], args: unknown[]) => { if (isConsoleNoise(args)) return; setLogs((prev) => [...prev.slice(-199), { id: ++consoleId, type, args, ts: Date.now() }]); };
    console.log = (...args: unknown[]) => { original.log(...args); emit("log", args); };
    console.info = (...args: unknown[]) => { original.info(...args); emit("info", args); };
    console.debug = (...args: unknown[]) => { original.debug(...args); emit("debug", args); };
    console.warn = (...args: unknown[]) => { original.warn(...args); emit("warn", args); };
    console.error = (...args: unknown[]) => { original.error(...args); emit("error", args); };
    return () => { Object.assign(console, original); };
  }, [captureConsole]);

  useEffect(() => {
    const onError = (event: ErrorEvent) => { const message = event.message || "Unknown error"; setError(message); setLogs((prev) => [...prev, { id: ++consoleId, type: "error", args: [message], ts: Date.now() }]); };
    const onRejection = (event: PromiseRejectionEvent) => { const message = event.reason instanceof Error ? event.reason.message : String(event.reason); setError(message); setLogs((prev) => [...prev, { id: ++consoleId, type: "error", args: [message], ts: Date.now() }]); };
    window.addEventListener("error", onError); window.addEventListener("unhandledrejection", onRejection);
    return () => { window.removeEventListener("error", onError); window.removeEventListener("unhandledrejection", onRejection); };
  }, []);

  const run = useCallback(async () => {
    const currentFiles = filesRef.current; const entryFile = currentFiles.find((f) => f.name === entryName);
    if (!entryFile) return; const id = ++runIdRef.current; setRunning(true); setError(null);
    try {
      const esbuild = await loadEsbuild(); const available = new Map(currentFiles.map((f) => [f.name, f])); const cache = new Map<string, unknown>();
      const loadModule = async (name: string): Promise<unknown> => {
        if (cache.has(name)) return cache.get(name); const file = available.get(name); if (!file) throw new Error(`Module "${name}" not found.`);
        const compiled = await transformFile(file.source, name, esbuild); const moduleRecord = { exports: {} as Record<string, unknown> }; cache.set(name, moduleRecord.exports);
        const factory = new Function("require", "module", "exports", compiled) as (require: (id: string) => unknown, module: { exports: Record<string, unknown> }, exports: Record<string, unknown>) => void;
        const localRequire = (id: string): unknown => { if (id in VIRTUAL_MODULES) return VIRTUAL_MODULES[id]; if (id === "@/components/ui" || id.startsWith("@/components/ui")) return UILib; const resolved = resolveRelative(name, id, available); if (!resolved) throw new Error(`Cannot resolve "${id}" from "${name}".`); return loadModule(resolved); };
        factory(localRequire, moduleRecord, moduleRecord.exports); return moduleRecord.exports;
      };
      const entryModule = await loadModule(entryName); const Component = (entryModule as { default?: unknown }).default;
      if (typeof Component !== "function") throw new Error("Your code must export a default component.");
      const container = previewRef.current; if (!container || id !== runIdRef.current) return;
      rootRef.current?.unmount(); const root = createRoot(container); rootRef.current = root; root.render(React.createElement(Component as React.ComponentType));
    } catch (err) { if (id !== runIdRef.current) return; const message = err instanceof Error ? err.message : String(err); setError(message); setLogs((prev) => [...prev, { id: ++consoleId, type: "error", args: [message], ts: Date.now() }]); }
    finally { if (id === runIdRef.current) setRunning(false); }
  }, [entryName]);

  useEffect(() => { const timer = window.setTimeout(() => { void run(); }, firstDelayRef.current); firstDelayRef.current = 600; return () => window.clearTimeout(timer); }, [files, run]);
  useEffect(() => () => { rootRef.current?.unmount(); }, []);

  const updateFile = (name: string, source: string) => setFiles((prev) => prev.map((f) => (f.name === name ? { ...f, source } : f)));
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((event.metaKey || event.ctrlKey) && event.key === "Enter") { event.preventDefault(); void run(); return; }
    if (event.key === "Tab") { event.preventDefault(); const target = event.currentTarget; const start = target.selectionStart; const end = target.selectionEnd; const next = `${target.value.slice(0, start)}  ${target.value.slice(end)}`; updateFile(activeFile.name, next); requestAnimationFrame(() => { target.selectionStart = target.selectionEnd = start + 2; }); }
  };
  const syncScroll = (element: HTMLTextAreaElement) => { const target = scrollMirrorRef.current; if (target) target.style.transform = `translate3d(${-element.scrollLeft}px, ${-element.scrollTop}px, 0)`; };
  const copyActive = () => { void navigator.clipboard?.writeText(activeFile.source); setCopied(true); window.setTimeout(() => setCopied(false), 1400); };
  const reset = () => { setFiles(initialFiles.map((f) => ({ ...f }))); setActiveName(entryName); setError(null); setLogs([]); };
  const share = () => { const payload = btoa(encodeURIComponent(JSON.stringify(files))); const params = new URLSearchParams(window.location.search); params.set(shareKey, payload); const url = `${window.location.origin}${window.location.pathname}?${params.toString()}`; window.history.replaceState(null, "", url); void navigator.clipboard?.writeText(url); setShared(true); window.setTimeout(() => setShared(false), 1600); };
  const exportMenu = [{ label: `Download ${entryName}`, onSelect: () => downloadBlob(entryName, activeFile.source, "text/plain") }, { label: "Download project (.json)", onSelect: () => downloadBlob("playground-project.json", JSON.stringify(files, null, 2), "application/json") }];

  const dirtyMap = useMemo(() => new Map(initialFiles.map((f) => [f.name, f.source])), [initialFiles]);
  const counts = useMemo(() => { let errors = 0; let warnings = 0; for (const log of logs) { if (log.type === "error") errors += 1; else if (log.type === "warn") warnings += 1; } return { errors, warnings }; }, [logs]);
  const activeSource = activeFile.source;
  const highlighted = useMemo(() => highlightCode(activeSource), [activeSource]);

  return (
    <div className={cn("flex flex-col overflow-hidden rounded-xl border border-border bg-background text-foreground shadow-card transition-all", fullscreen && "fixed inset-0 z-50 h-screen max-h-none rounded-none shadow-xl", !fullscreen && className)} style={!fullscreen ? { height } : undefined}>
      <CodePlaygroundToolbar title={title} files={files} entryName={entryName} running={running} theme={theme} fullscreen={fullscreen} copied={copied} shared={shared} exportOpen={exportOpen} exportMenu={exportMenu} onRun={() => void run()} onCopy={copyActive} onReset={reset} onShare={share} onToggleTheme={toggleTheme} onToggleFullscreen={() => setFullscreen((v) => !v)} onToggleExportOpen={() => setExportOpen((v) => !v)} />
      <div className="grid min-h-0 flex-1 grid-cols-1 grid-rows-2 lg:grid-cols-2 lg:grid-rows-1">
        <CodePlaygroundEditor files={files} activeFile={activeFile} entryName={entryName} activeSource={activeSource} highlighted={highlighted} dirtyMap={dirtyMap} scrollMirrorRef={scrollMirrorRef} onUpdate={updateFile} onKeyDown={handleKeyDown} onSyncScroll={syncScroll} setActiveName={setActiveName} />
        <CodePlaygroundPreview previewRef={previewRef} device={device} setDevice={setDevice} consoleOpen={consoleOpen} setConsoleOpen={setConsoleOpen} error={error} setError={setError} counts={counts} onRun={() => void run()} />
      </div>
      {consoleOpen && <CodePlaygroundConsole logs={logs} setLogs={setLogs} setConsoleOpen={setConsoleOpen} />}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-border bg-surface/60 px-3 py-1.5 font-mono text-[10px] text-subtle">
        <span className="flex items-center gap-1.5"><span className={cn("h-1.5 w-1.5 rounded-full", running ? "animate-pulse bg-warning" : error ? "bg-danger" : "bg-success")} />{running ? "compiling…" : error ? "error" : "ready"}</span>
        <span>{activeFile.name} · {activeSource.split("\n").length} lines</span>
        <span className="ml-auto hidden sm:inline">Ctrl/Cmd + Enter to run</span>
      </div>
    </div>
  );
}
