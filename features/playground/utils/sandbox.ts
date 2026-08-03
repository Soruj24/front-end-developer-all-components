import * as React from "react";
import { createRoot, type Root } from "react-dom/client";
import * as JsxRuntime from "react/jsx-runtime";
import * as UILib from "@/components/ui";
import type { PlaygroundFile } from "../types";

const VIRTUAL_MODULES: Record<string, unknown> = {
  react: React,
  "react/jsx-runtime": JsxRuntime,
  "react/jsx-dev-runtime": JsxRuntime,
  "react-dom": React,
  "react-dom/client": { createRoot },
};

let esbuildPromise: Promise<typeof import("esbuild-wasm")> | null = null;
const ESBUILD_INIT_KEY = "__esbuild_initialized__";

function loadEsbuild(): Promise<typeof import("esbuild-wasm")> {
  if (!esbuildPromise) {
    esbuildPromise = import("esbuild-wasm").then(async (mod) => {
      if (!(globalThis as Record<string, unknown>)[ESBUILD_INIT_KEY]) {
        await mod.initialize({ wasmURL: "/esbuild.wasm" });
        (globalThis as Record<string, unknown>)[ESBUILD_INIT_KEY] = true;
      }
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
  const ext = name.split(".").pop() ?? "tsx";
  const loader =
    ext === "tsx" ? "tsx" : ext === "ts" ? "ts" : ext === "jsx" ? "jsx" : ext === "json" ? "json" : "js";
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
    `${dir}${base}.css`,
    `${dir}${base}.json`,
    `${dir}${base}.md`,
    `${dir}${base}/index.tsx`,
    `${dir}${base}/index.ts`,
  ];
  for (const candidate of candidates) {
    if (available.has(candidate)) return candidate;
  }
  return null;
}

const CSS_ATTR = "data-playground-css";

function injectCss(source: string): void {
  const style = document.createElement("style");
  style.setAttribute(CSS_ATTR, "true");
  style.textContent = source;
  document.head.appendChild(style);
}

export function clearInjectedCss(): void {
  document.querySelectorAll(`style[${CSS_ATTR}]`).forEach((el) => el.remove());
}

export interface RunResult {
  ok: boolean;
  error?: string;
}

let activeRoot: Root | null = null;

/** Compile the project entry and render its default component. */
export async function runProject(
  files: PlaygroundFile[],
  entryName: string,
  container: HTMLElement | null
): Promise<RunResult> {
  if (!container) return { ok: false, error: "Preview container not available." };
  const esbuild = await loadEsbuild();
  clearInjectedCss();

  const available = new Map(files.map((f) => [f.name, f]));
  const cache = new Map<string, unknown>();
  const cssSeen = new Set<string>();

  const loadModule = async (name: string): Promise<unknown> => {
    if (cache.has(name)) return cache.get(name);
    const file = available.get(name);
    if (!file) throw new Error(`Module "${name}" not found.`);
    if (file.name.endsWith(".css")) {
      if (!cssSeen.has(file.name)) {
        cssSeen.add(file.name);
        injectCss(file.source);
      }
      const exports: Record<string, unknown> = {};
      cache.set(name, exports);
      return exports;
    }
    if (file.name.endsWith(".md")) {
      const exports = { default: file.source };
      cache.set(name, exports);
      return exports;
    }
    const compiled = await transformFile(file.source, file.name, esbuild);
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
      if (id === "@/components/ui" || id.startsWith("@/components/ui")) return UILib;
      const resolved = resolveRelative(name, id, available);
      if (!resolved) throw new Error(`Cannot resolve "${id}" from "${name}".`);
      return loadModule(resolved);
    };
    factory(localRequire, moduleRecord, moduleRecord.exports);
    return moduleRecord.exports;
  };

  try {
    const entryModule = await loadModule(entryName);
    const Component = (entryModule as { default?: unknown }).default;
    if (typeof Component !== "function") {
      throw new Error(`"${entryName}" must export a default component.`);
    }
    activeRoot?.unmount();
    const root = createRoot(container);
    activeRoot = root;
    root.render(React.createElement(Component as React.ComponentType));
    return { ok: true };
  } catch (caught) {
    const message = caught instanceof Error ? caught.message : String(caught);
    return { ok: false, error: message };
  }
}

export function unmountPreview(): void {
  activeRoot?.unmount();
  activeRoot = null;
}
