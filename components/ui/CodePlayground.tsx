"use client";

import * as React from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createRoot, type Root } from "react-dom/client";
import * as JsxRuntime from "react/jsx-runtime";
import * as UILib from "@/components/ui";
import { cn } from "@/lib/cn";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export interface PlaygroundFile {
  name: string;
  source: string;
}

export interface ConsoleEntry {
  id: number;
  type: "log" | "info" | "debug" | "warn" | "error";
  args: unknown[];
  ts: number;
}

export interface CodePlaygroundProps {
  files: PlaygroundFile[];
  /** Entry file compiled and mounted in the preview (defaults to the first file). */
  entry?: string;
  title?: string;
  className?: string;
  /** Total height of the playground (ignored in fullscreen). */
  height?: number | string;
  defaultTheme?: "light" | "dark";
  /** Patch window.console so user code output lands in the Console panel. */
  captureConsole?: boolean;
  /** Show the Console panel by default. */
  showConsole?: boolean;
  /** Query-param key used for the Share Link (avoid collisions on pages with several playgrounds). */
  shareKey?: string;
}

type DeviceKey = "fluid" | "mobile" | "tablet" | "desktop";

const DEVICE_WIDTHS: Record<Exclude<DeviceKey, "fluid">, number> = {
  mobile: 375,
  tablet: 768,
  desktop: 1280,
};

/* ------------------------------------------------------------------ */
/* Icons                                                                */
/* ------------------------------------------------------------------ */

const icon = (path: string) =>
  function Icon({ className = "h-4 w-4" }: { className?: string }) {
    return (
      <svg
        className={className}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d={path} />
      </svg>
    );
  };

const PlayIcon = icon("M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653z");
const RotateIcon = icon("M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3");
const CopyIcon = icon("M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75");
const CheckIcon = icon("m4.5 12.75 6 6 9-13.5");
const LinkIcon = icon("M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244");
const DownloadIcon = icon("M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3");
const SunIcon = icon("M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0z");
const MoonIcon = icon("M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998z");
const MaximizeIcon = icon("M3.75 3.75h5.5m-5.5 0v5.5m0-5.5 5.5 5.5M20.25 3.75h-5.5m5.5 0v5.5m0-5.5-5.5 5.5M3.75 20.25h5.5m-5.5 0v-5.5m0 5.5 5.5-5.5M20.25 20.25h-5.5m5.5 0v-5.5m0 5.5-5.5-5.5");
const MinimizeIcon = icon("M9 9V4.5M9 9H4.5M9 9 3.75 3.75M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15v4.5m0-4.5h4.5M15 15l5.25 5.25M9 15H4.5M9 15v4.5M9 15l-5.25 5.25");
const MonitorIcon = icon("M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25");
const TabletIcon = icon("M10.5 19.5h3m-6.75 2.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-15a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 4.5v15a2.25 2.25 0 0 0 2.25 2.25z");
const MobileIcon = icon("M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3");
const TerminalIcon = icon("m6.75 7.5 3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25z");
const ChevronDownIcon = icon("m19.5 8.25-7.5 7.5-7.5-7.5");
const TrashIcon = icon("m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0");
const AlertTriangleIcon = icon("M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z");
const FileIcon = icon("M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9z");
const CodeFileIcon = icon("M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5");

/* ------------------------------------------------------------------ */
/* Syntax highlighting                                                 */
/* ------------------------------------------------------------------ */

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function highlightCode(code: string): string {
  const re =
    /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)|\b(import|export|default|from|const|let|var|function|return|if|else|for|while|do|switch|case|break|continue|new|class|extends|super|async|await|typeof|instanceof|in|of|try|catch|finally|throw|this|void|null|undefined|true|false|interface|type|enum|number|string|boolean|any|readonly)\b|\b(\d+(?:\.\d+)?)\b|\b([A-Z][A-Za-z0-9_$]*)\b|\b([a-zA-Z_$][\w$]*)(?=\()|(<\/?)([a-zA-Z][\w.-]*)|([{}()[\].,;:<>+\-*/%!&|?=^~@])/g;
  const tokens: string[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  while ((match = re.exec(code))) {
    if (match.index > last) tokens.push(escapeHtml(code.slice(last, match.index)));
    const [, comment, str, keyword, num, component, fn, , tagName, punct] = match;
    let cls = "tok-plain";
    if (comment) cls = "tok-comment";
    else if (str) cls = "tok-string";
    else if (keyword) cls = "tok-keyword";
    else if (num) cls = "tok-number";
    else if (component) cls = "tok-component";
    else if (fn) cls = "tok-function";
    else if (tagName) cls = "tok-tag";
    else if (punct) cls = "tok-punct";
    tokens.push(`<span class="${cls}">${escapeHtml(match[0])}</span>`);
    last = match.index + match[0].length;
  }
  if (last < code.length) tokens.push(escapeHtml(code.slice(last)));
  return tokens.join("");
}

/* ------------------------------------------------------------------ */
/* Sandbox (mini module system + esbuild)                              */
/* ------------------------------------------------------------------ */

const VIRTUAL_MODULES: Record<string, unknown> = {
  react: React,
  "react/jsx-runtime": JsxRuntime,
  "react/jsx-dev-runtime": JsxRuntime,
  "react-dom": React,
  "react-dom/client": { createRoot },
};

let esbuildPromise: Promise<typeof import("esbuild-wasm")> | null = null;

function loadEsbuild(): Promise<typeof import("esbuild-wasm")> {
  if (!esbuildPromise) {
    esbuildPromise = import("esbuild-wasm").then(async (mod) => {
      await mod.initialize({ wasmURL: "/esbuild.wasm" });
      return mod;
    });
  }
  return esbuildPromise;
}

async function transformFile(
  source: string,
  name: string,
  esbuild: typeof import("esbuild-wasm")
): Promise<string> {
  const loader = name.endsWith(".tsx") ? "tsx" : name.endsWith(".ts") ? "ts" : "jsx";
  const result = await esbuild.transform(source, {
    loader,
    jsx: "automatic",
    jsxDev: false,
    format: "cjs",
    target: "es2020",
  });
  return result.code;
}

function resolveRelative(
  fromFile: string,
  id: string,
  available: Map<string, PlaygroundFile>
): string | null {
  if (!id.startsWith(".")) return null;
  const dir = fromFile.includes("/") ? fromFile.slice(0, fromFile.lastIndexOf("/") + 1) : "";
  const base = id.replace(/^\.\//, "").replace(/^\.\.\//, "");
  const candidates = [
    `${dir}${base}`,
    `${dir}${base}.tsx`,
    `${dir}${base}.ts`,
    `${dir}${base}.jsx`,
    `${dir}${base}.js`,
    `${dir}${base}/index.tsx`,
    `${dir}${base}/index.ts`,
  ];
  for (const candidate of candidates) {
    if (available.has(candidate)) return candidate;
  }
  return null;
}

function formatConsoleArg(arg: unknown): string {
  if (typeof arg === "string") return arg;
  if (arg instanceof Error) return arg.message;
  try {
    const value = JSON.stringify(arg);
    return value === undefined ? String(arg) : value;
  } catch {
    return String(arg);
  }
}

function isConsoleNoise(args: unknown[]): boolean {
  const first = args[0];
  if (typeof first !== "string") return false;
  return (
    first.startsWith("%c") ||
    first.startsWith("Warning:") ||
    first.startsWith("Download the React DevTools") ||
    first.startsWith("An error occurred in")
  );
}

/* ------------------------------------------------------------------ */
/* CodePlayground                                                      */
/* ------------------------------------------------------------------ */

let consoleId = 0;

export function CodePlayground({
  files: initialFiles,
  entry,
  title = "Code Playground",
  className,
  height = 560,
  defaultTheme = "dark",
  captureConsole = true,
  showConsole: initialShowConsole = true,
  shareKey = "files",
}: CodePlaygroundProps) {
  const filesRef = useRef<PlaygroundFile[]>(initialFiles);
  const [files, setFiles] = useState<PlaygroundFile[]>(initialFiles);
  const entryName =
    files.find((f) => f.name === entry)?.name ?? files[0]?.name ?? "App.tsx";
  const [activeName, setActiveName] = useState(entryName);
  const activeFile =
    files.find((f) => f.name === activeName) ?? files[0] ?? { name: "App.tsx", source: "" };

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

  useEffect(() => {
    filesRef.current = files;
  }, [files]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const restored = readSharedFiles(shareKey);
      if (restored) {
        setFiles(restored);
        setActiveName(
          (restored.find((f) => f.name === entry) ?? restored[0])?.name ?? "App.tsx"
        );
      }
      const savedTheme = window.localStorage.getItem("code-playground:theme");
      if (savedTheme === "light" || savedTheme === "dark") setTheme(savedTheme);
    }, 0);
    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ---- Theme ------------------------------------------------------ */

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current) => {
      const next = current === "dark" ? "light" : "dark";
      if (typeof window !== "undefined") {
        window.localStorage.setItem("code-playground:theme", next);
      }
      return next;
    });
  };

  /* ---- Console + runtime errors ------------------------------------ */

  useEffect(() => {
    if (!captureConsole) return;
    const original = {
      log: console.log.bind(console),
      info: console.info.bind(console),
      debug: console.debug.bind(console),
      warn: console.warn.bind(console),
      error: console.error.bind(console),
    };
    const emit = (type: ConsoleEntry["type"], args: unknown[]) => {
      if (isConsoleNoise(args)) return;
      const entry: ConsoleEntry = { id: ++consoleId, type, args, ts: Date.now() };
      setLogs((prev) => [...prev.slice(-199), entry]);
    };
    console.log = (...args: unknown[]) => {
      original.log(...args);
      emit("log", args);
    };
    console.info = (...args: unknown[]) => {
      original.info(...args);
      emit("info", args);
    };
    console.debug = (...args: unknown[]) => {
      original.debug(...args);
      emit("debug", args);
    };
    console.warn = (...args: unknown[]) => {
      original.warn(...args);
      emit("warn", args);
    };
    console.error = (...args: unknown[]) => {
      original.error(...args);
      emit("error", args);
    };
    return () => {
      console.log = original.log;
      console.info = original.info;
      console.debug = original.debug;
      console.warn = original.warn;
      console.error = original.error;
    };
  }, [captureConsole]);

  useEffect(() => {
    const onError = (event: ErrorEvent) => {
      const message = event.message || "Unknown error";
      setError(message);
      setLogs((prev) => [
        ...prev,
        { id: ++consoleId, type: "error", args: [message], ts: Date.now() },
      ]);
    };
    const onRejection = (event: PromiseRejectionEvent) => {
      const message =
        event.reason instanceof Error ? event.reason.message : String(event.reason);
      setError(message);
      setLogs((prev) => [
        ...prev,
        { id: ++consoleId, type: "error", args: [message], ts: Date.now() },
      ]);
    };
    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onRejection);
    return () => {
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onRejection);
    };
  }, []);

  /* ---- Run --------------------------------------------------------- */

  const run = useCallback(async () => {
    const currentFiles = filesRef.current;
    const entryFile = currentFiles.find((f) => f.name === entryName);
    if (!entryFile) return;
    const id = ++runIdRef.current;
    setRunning(true);
    setError(null);
    try {
      const esbuild = await loadEsbuild();
      const available = new Map(currentFiles.map((f) => [f.name, f]));
      const cache = new Map<string, unknown>();
      const loadModule = async (name: string): Promise<unknown> => {
        if (cache.has(name)) return cache.get(name);
        const file = available.get(name);
        if (!file) throw new Error(`Module "${name}" not found.`);
        const compiled = await transformFile(file.source, name, esbuild);
        const moduleRecord = { exports: {} as Record<string, unknown> };
        cache.set(name, moduleRecord.exports);
        const factory = new Function(
          "require",
          "module",
          "exports",
          compiled
        ) as (
          require: (id: string) => unknown,
          module: { exports: Record<string, unknown> },
          exports: Record<string, unknown>
        ) => void;
        const localRequire = (id: string): unknown => {
          if (id in VIRTUAL_MODULES) return VIRTUAL_MODULES[id];
          if (id === "@/components/ui" || id.startsWith("@/components/ui")) {
            return UILib;
          }
          const resolved = resolveRelative(name, id, available);
          if (!resolved) throw new Error(`Cannot resolve "${id}" from "${name}".`);
          return loadModule(resolved);
        };
        factory(localRequire, moduleRecord, moduleRecord.exports);
        return moduleRecord.exports;
      };
      const entryModule = await loadModule(entryName);
      const Component = (entryModule as { default?: unknown }).default;
      if (typeof Component !== "function") {
        throw new Error("Your code must export a default component.");
      }
      const container = previewRef.current;
      if (!container || id !== runIdRef.current) return;
      rootRef.current?.unmount();
      const root = createRoot(container);
      rootRef.current = root;
      root.render(React.createElement(Component as React.ComponentType));
    } catch (err) {
      if (id !== runIdRef.current) return;
      const message = err instanceof Error ? err.message : String(err);
      setError(message);
      setLogs((prev) => [
        ...prev,
        { id: ++consoleId, type: "error", args: [message], ts: Date.now() },
      ]);
    } finally {
      if (id === runIdRef.current) setRunning(false);
    }
  }, [entryName]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void run();
    }, firstDelayRef.current);
    firstDelayRef.current = 600;
    return () => window.clearTimeout(timer);
  }, [files, run]);

  useEffect(
    () => () => {
      rootRef.current?.unmount();
    },
    []
  );

  /* ---- Editor helpers ---------------------------------------------- */

  const updateFile = (name: string, source: string) => {
    setFiles((prev) => prev.map((f) => (f.name === name ? { ...f, source } : f)));
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
      event.preventDefault();
      void run();
      return;
    }
    if (event.key === "Tab") {
      event.preventDefault();
      const target = event.currentTarget;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      const next = `${target.value.slice(0, start)}  ${target.value.slice(end)}`;
      updateFile(activeFile.name, next);
      requestAnimationFrame(() => {
        target.selectionStart = target.selectionEnd = start + 2;
      });
    }
  };

  const syncScroll = (element: HTMLTextAreaElement) => {
    const target = scrollMirrorRef.current;
    if (target) {
      target.style.transform = `translate3d(${-element.scrollLeft}px, ${-element.scrollTop}px, 0)`;
    }
  };

  /* ---- Actions ----------------------------------------------------- */

  const copyActive = () => {
    void navigator.clipboard?.writeText(activeFile.source);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  const reset = () => {
    setFiles(initialFiles.map((f) => ({ ...f })));
    setActiveName(entryName);
    setError(null);
    setLogs([]);
  };

  const share = () => {
    const payload = btoa(encodeURIComponent(JSON.stringify(files)));
    const params = new URLSearchParams(window.location.search);
    params.set(shareKey, payload);
    const url = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    window.history.replaceState(null, "", url);
    void navigator.clipboard?.writeText(url);
    setShared(true);
    window.setTimeout(() => setShared(false), 1600);
  };

  const download = (name: string, content: string, type: string) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = name;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const exportMenu = [
    {
      label: `Download ${entryName}`,
      onSelect: () => download(entryName, activeFile.source, "text/plain"),
    },
    {
      label: "Download project (.json)",
      onSelect: () =>
        download("playground-project.json", JSON.stringify(files, null, 2), "application/json"),
    },
  ];

  const dirtyMap = useMemo(
    () => new Map(initialFiles.map((f) => [f.name, f.source])),
    [initialFiles]
  );

  const counts = useMemo(() => {
    let errors = 0;
    let warnings = 0;
    for (const log of logs) {
      if (log.type === "error") errors += 1;
      else if (log.type === "warn") warnings += 1;
    }
    return { errors, warnings };
  }, [logs]);

  const status = running ? "compiling…" : error ? "error" : "ready";
  const activeSource = activeFile.source;
  const highlighted = useMemo(() => highlightCode(activeSource), [activeSource]);

  const deviceWidth = device === "fluid" ? null : DEVICE_WIDTHS[device];

  /* ---- Render ------------------------------------------------------ */

  const deviceButtons: { key: DeviceKey; label: string; icon: React.ReactNode }[] = [
    { key: "fluid", label: "Fluid", icon: <MonitorIcon className="h-3.5 w-3.5" /> },
    { key: "desktop", label: "1280", icon: <MonitorIcon className="h-3.5 w-3.5" /> },
    { key: "tablet", label: "768", icon: <TabletIcon className="h-3.5 w-3.5" /> },
    { key: "mobile", label: "375", icon: <MobileIcon className="h-3.5 w-3.5" /> },
  ];

  return (
    <div
      className={cn(
        "flex flex-col overflow-hidden rounded-xl border border-border bg-background text-foreground shadow-card transition-all",
        fullscreen && "fixed inset-0 z-50 h-screen max-h-none rounded-none shadow-xl",
        !fullscreen && className
      )}
      style={!fullscreen ? { height } : undefined}
    >
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2 border-b border-border bg-surface/60 px-3 py-2">
        <div className="mr-auto flex min-w-0 items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary-soft text-primary">
            <CodeFileIcon className="h-4 w-4" />
          </div>
          <div className="flex min-w-0 flex-col leading-tight">
            <span className="truncate text-sm font-semibold">{title}</span>
            <span className="font-mono text-[10px] text-subtle">
              {files.length} file{files.length === 1 ? "" : "s"} · {entryName}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => void run()}
          disabled={running}
          className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-foreground px-3 text-xs font-medium text-background transition-opacity hover:opacity-90 disabled:pointer-events-none disabled:opacity-60"
        >
          <PlayIcon className="h-3.5 w-3.5" />
          {running ? "Compiling" : "Run"}
        </button>

        <button
          type="button"
          onClick={copyActive}
          className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-border px-2.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          {copied ? <CheckIcon className="h-3.5 w-3.5 text-success" /> : <CopyIcon className="h-3.5 w-3.5" />}
          {copied ? "Copied" : "Copy"}
        </button>

        <button
          type="button"
          onClick={reset}
          className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-border px-2.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <RotateIcon className="h-3.5 w-3.5" />
          Reset
        </button>

        <div className="relative">
          <button
            type="button"
            onClick={() => setExportOpen((v) => !v)}
            className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-border px-2.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <DownloadIcon className="h-3.5 w-3.5" />
            Export
          </button>
          {exportOpen && (
            <div className="absolute right-0 top-full z-30 mt-1 w-56 overflow-hidden rounded-lg border border-border bg-background py-1 shadow-popover animate-scale-in">
              {exportMenu.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => {
                    setExportOpen(false);
                    item.onSelect();
                  }}
                  className="block w-full px-3 py-2 text-left text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={share}
          className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-border px-2.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          {shared ? <CheckIcon className="h-3.5 w-3.5 text-success" /> : <LinkIcon className="h-3.5 w-3.5" />}
          {shared ? "Link copied" : "Share"}
        </button>

        <button
          type="button"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          {theme === "dark" ? <SunIcon className="h-3.5 w-3.5" /> : <MoonIcon className="h-3.5 w-3.5" />}
        </button>

        <button
          type="button"
          onClick={() => setFullscreen((v) => !v)}
          aria-label={fullscreen ? "Exit fullscreen" : "Fullscreen"}
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          {fullscreen ? <MinimizeIcon className="h-3.5 w-3.5" /> : <MaximizeIcon className="h-3.5 w-3.5" />}
        </button>
      </div>

      {/* Editor + Preview */}
      <div className="grid min-h-0 flex-1 grid-cols-1 grid-rows-2 lg:grid-cols-2 lg:grid-rows-1">
        {/* Editor */}
        <div className="flex min-h-0 min-w-0 flex-col border-b border-border lg:border-b-0 lg:border-r">
          <div className="scrollbar-thin flex items-center gap-1 overflow-x-auto border-b border-border bg-muted/30 px-2 py-1.5">
            {files.map((file) => {
              const isActive = file.name === activeFile.name;
              const isEntry = file.name === entryName;
              const isDirty = dirtyMap.get(file.name) !== file.source;
              return (
                <button
                  key={file.name}
                  type="button"
                  onClick={() => setActiveName(file.name)}
                  className={cn(
                    "group flex shrink-0 items-center gap-1.5 rounded-md px-2.5 py-1 font-mono text-xs transition-colors",
                    isActive
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                  )}
                >
                  {isEntry ? (
                    <CodeFileIcon className="h-3.5 w-3.5 text-primary" />
                  ) : (
                    <FileIcon className="h-3.5 w-3.5 text-subtle" />
                  )}
                  {file.name}
                  {isDirty && <span className="h-1.5 w-1.5 rounded-full bg-warning" />}
                </button>
              );
            })}
          </div>

          <div key={activeFile.name} className="relative min-h-0 flex-1 bg-background">
            <div
              ref={scrollMirrorRef}
              aria-hidden="true"
              className="absolute inset-0 overflow-hidden"
            >
              <pre className="whitespace-pre-wrap break-words p-4 font-mono text-[13px] leading-relaxed [tab-size:2]">
                <code dangerouslySetInnerHTML={{ __html: highlighted }} />
              </pre>
            </div>
            <textarea
              value={activeSource}
              onChange={(event) => updateFile(activeFile.name, event.target.value)}
              onKeyDown={handleKeyDown}
              onScroll={(event) => syncScroll(event.currentTarget)}
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              aria-label={`${activeFile.name} source`}
              className="scrollbar-thin absolute inset-0 h-full w-full resize-none overflow-auto whitespace-pre-wrap break-words bg-transparent p-4 font-mono text-[13px] leading-relaxed text-transparent caret-foreground outline-none [tab-size:2] selection:bg-primary-soft"
            />
          </div>
        </div>

        {/* Preview */}
        <div className="flex min-h-0 min-w-0 flex-col">
          <div className="flex flex-wrap items-center gap-2 border-b border-border bg-surface/60 px-3 py-2">
            <span className="mr-auto text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Preview
              {deviceWidth ? (
                <span className="ml-2 font-mono normal-case text-subtle">{deviceWidth}px</span>
              ) : null}
            </span>
            <div className="flex items-center gap-1 rounded-lg border border-border bg-muted/40 p-0.5">
              {deviceButtons.map((btn) => (
                <button
                  key={btn.key}
                  type="button"
                  onClick={() => setDevice(btn.key)}
                  title={`${btn.label}${btn.key !== "fluid" ? ` (${DEVICE_WIDTHS[btn.key]}px)` : ""}`}
                  className={cn(
                    "inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium transition-colors",
                    device === btn.key
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {btn.icon}
                  {btn.label !== "Fluid" && <span className="hidden sm:inline">{btn.label}</span>}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setConsoleOpen((v) => !v)}
              aria-label="Toggle console"
              className={cn(
                "inline-flex h-7 items-center gap-1.5 rounded-lg px-2 text-[11px] font-medium transition-colors",
                consoleOpen
                  ? "bg-primary-soft text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <TerminalIcon className="h-3.5 w-3.5" />
              Console
              {(counts.errors > 0 || counts.warnings > 0) && (
                <span
                  className={cn(
                    "flex items-center gap-0.5 font-mono",
                    counts.errors > 0 ? "text-danger" : "text-warning"
                  )}
                >
                  <span>{counts.errors}</span>
                  <span className="opacity-60">/</span>
                  <span>{counts.warnings}</span>
                </span>
              )}
            </button>
          </div>

          <div className="relative min-h-0 flex-1 overflow-hidden bg-muted/40">
            <div
              className="pointer-events-none absolute inset-0 bg-dots opacity-50 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
              aria-hidden="true"
            />
            <div className="absolute inset-0 overflow-auto p-3 sm:p-4">
              <div
                className="relative mx-auto h-full min-h-[320px] overflow-hidden rounded-lg border border-border bg-background shadow-card"
                style={{ maxWidth: deviceWidth ?? undefined }}
              >
                <div
                  ref={previewRef}
                  className="flex min-h-full w-full items-center justify-center"
                />
              </div>
            </div>

            {error && (
              <div className="absolute inset-0 z-20 flex flex-col bg-danger-soft/95 p-6 backdrop-blur-sm animate-fade-in">
                <div className="flex items-center gap-2 text-danger">
                  <AlertTriangleIcon className="h-5 w-5" />
                  <span className="text-sm font-semibold">Runtime error</span>
                </div>
                <pre className="scrollbar-thin mt-3 flex-1 overflow-auto whitespace-pre-wrap rounded-lg border border-danger/20 bg-background/70 p-4 font-mono text-xs leading-relaxed text-danger">
                  {error}
                </pre>
                <div className="mt-3 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setError(null)}
                    className="rounded-lg border border-danger/30 px-3 py-1.5 text-xs font-medium text-danger transition-colors hover:bg-danger/10"
                  >
                    Dismiss
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setError(null);
                      void run();
                    }}
                    className="rounded-lg bg-danger px-3 py-1.5 text-xs font-medium text-danger-foreground transition-opacity hover:opacity-90"
                  >
                    Retry
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Console */}
          {consoleOpen && (
            <div className="flex h-44 flex-col border-t border-border bg-background">
              <div className="flex items-center justify-between border-b border-border px-3 py-1.5">
                <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                  <TerminalIcon className="h-3.5 w-3.5" />
                  Console
                  <span className="font-mono text-[10px] text-subtle">{logs.length} entries</span>
                </span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setLogs([])}
                    aria-label="Clear console"
                    className="inline-flex h-6 w-6 items-center justify-center rounded text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <TrashIcon className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setConsoleOpen(false)}
                    aria-label="Hide console"
                    className="inline-flex h-6 w-6 items-center justify-center rounded text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <ChevronDownIcon className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
              <div className="scrollbar-thin flex-1 overflow-auto px-3 py-2 font-mono text-xs leading-relaxed">
                {logs.length === 0 ? (
                  <p className="text-subtle">Log output will appear here — try clicking the button in the preview.</p>
                ) : (
                  logs.map((log) => (
                    <div key={log.id} className="flex items-start gap-2 border-b border-border/40 py-1">
                      <span className="shrink-0 text-[10px] text-subtle">
                        {new Date(log.ts).toLocaleTimeString([], { hour12: false })}
                      </span>
                      <span
                        className={cn(
                          "shrink-0 text-[10px] font-semibold uppercase",
                          log.type === "error"
                            ? "text-danger"
                            : log.type === "warn"
                              ? "text-warning"
                              : log.type === "info"
                                ? "text-info"
                                : log.type === "debug"
                                  ? "text-subtle"
                                  : "text-muted-foreground"
                        )}
                      >
                        {log.type}
                      </span>
                      <span
                        className={cn(
                          "min-w-0 break-words",
                          log.type === "error"
                            ? "text-danger"
                            : log.type === "warn"
                              ? "text-warning"
                              : "text-foreground"
                        )}
                      >
                        {log.args.map((arg, index) => (
                          <React.Fragment key={index}>
                            {index > 0 ? " " : ""}
                            {formatConsoleArg(arg).slice(0, 400)}
                          </React.Fragment>
                        ))}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Status bar */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-border bg-surface/60 px-3 py-1.5 font-mono text-[10px] text-subtle">
        <span className="flex items-center gap-1.5">
          <span
            className={cn(
              "h-1.5 w-1.5 rounded-full",
              running ? "animate-pulse bg-warning" : error ? "bg-danger" : "bg-success"
            )}
          />
          {status}
        </span>
        <span>
          {activeFile.name} · {activeSource.split("\n").length} lines
        </span>
        <span className="ml-auto hidden sm:inline">Ctrl/Cmd + Enter to run</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* URL sharing helpers                                                  */
/* ------------------------------------------------------------------ */

function readSharedFiles(shareKey: string): PlaygroundFile[] | null {
  if (typeof window === "undefined") return null;
  const encoded = new URLSearchParams(window.location.search).get(shareKey);
  if (!encoded) return null;
  try {
    const parsed: unknown = JSON.parse(decodeURIComponent(atob(encoded)));
    if (
      Array.isArray(parsed) &&
      parsed.length > 0 &&
      parsed.every(
        (f): f is PlaygroundFile =>
          typeof f === "object" &&
          f !== null &&
          typeof (f as PlaygroundFile).name === "string" &&
          typeof (f as PlaygroundFile).source === "string"
      )
    ) {
      return parsed;
    }
  } catch {
    // fall through to null
  }
  return null;
}
