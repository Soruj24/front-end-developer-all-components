"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import * as React from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createRoot, Root } from "react-dom/client";
import * as JsxRuntime from "react/jsx-runtime";
import * as UILib from "@/components/ui";
import { getRegistryItem, registryIds } from "@/components/registry";
import { cn } from "@/lib/cn";
import {
  AlertCircleIcon,
  PlayIcon,
  RotateCcwIcon,
} from "@/components/preview/icons";
import { ArrowLeftIcon } from "@/components/docs/icons";

/* ------------------------------------------------------------------ */
/* Sandbox                                                             */
/* ------------------------------------------------------------------ */

const VIRTUAL_MODULES: Record<string, unknown> = {
  react: React,
  "react/jsx-runtime": JsxRuntime,
  "react/jsx-dev-runtime": JsxRuntime,
  "react-dom": React,
  "react-dom/client": { createRoot },
};

function virtualRequire(id: string): unknown {
  if (id.startsWith("@/components/ui")) return UILib;
  if (id in VIRTUAL_MODULES) return VIRTUAL_MODULES[id];
  throw new Error(`Cannot resolve module "${id}" in the playground.`);
}

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

/* ------------------------------------------------------------------ */
/* Playground                                                          */
/* ------------------------------------------------------------------ */

export function Playground() {
  const searchParams = useSearchParams();
  const id = searchParams.get("component") ?? registryIds[0];
  return <PlaygroundEditor key={id} id={id} />;
}

function PlaygroundEditor({ id }: { id: string }) {
  const item = useMemo(() => getRegistryItem(id), [id]);
  const [code, setCode] = useState(item?.source ?? "");
  const [error, setError] = useState<string | null>(null);
  const [running, setRunning] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<Root | null>(null);

  const run = useCallback(async (source: string) => {
    setRunning(true);
    setError(null);
    try {
      const esbuild = await loadEsbuild();
      const result = await esbuild.transform(source, {
        loader: "jsx",
        jsx: "automatic",
        jsxDev: false,
        format: "cjs",
        target: "es2020",
      });
      const sandboxModule = { exports: {} as Record<string, unknown> };
      const factory = new Function("require", "module", "exports", result.code);
      factory(virtualRequire, sandboxModule, sandboxModule.exports);
      const Component = sandboxModule.exports.default as React.ComponentType | undefined;
      if (typeof Component !== "function") {
        throw new Error("Your code must export a default component.");
      }
      const container = previewRef.current;
      if (!container) return;
      rootRef.current?.unmount();
      const root = createRoot(container);
      rootRef.current = root;
      root.render(React.createElement(Component));
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setRunning(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      void run(item?.source ?? "");
    }, 0);
    return () => clearTimeout(timer);
  }, [item, run]);

  useEffect(
    () => () => {
      rootRef.current?.unmount();
    },
    []
  );

  if (!item) {
    return (
      <div className="flex h-[calc(100vh-4rem)] flex-col items-center justify-center gap-3 p-6 text-center">
        <p className="text-sm text-muted-foreground">
          No playground example found for &quot;{id}&quot;.
        </p>
        <Link
          href="/buttons"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Back to Buttons
        </Link>
      </div>
    );
  }

  const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
      event.preventDefault();
      void run(code);
    }
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col overflow-hidden">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <Link
            href="/buttons"
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Back to Buttons"
          >
            <ArrowLeftIcon className="h-4 w-4" />
          </Link>
          <div className="flex min-w-0 flex-col">
            <span className="truncate font-medium">{item.title}</span>
            <span className="font-mono text-xs text-muted-foreground">{item.id}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setCode(item.source)}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <RotateCcwIcon className="h-3.5 w-3.5" />
            Reset
          </button>
          <button
            type="button"
            onClick={() => void run(code)}
            disabled={running}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-foreground px-3 text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:pointer-events-none disabled:opacity-60"
          >
            <PlayIcon className="h-3.5 w-3.5" />
            {running ? "Compiling..." : "Run"}
          </button>
        </div>
      </header>

      <div className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-2">
        <div className="flex min-h-0 flex-col border-b border-border lg:border-b-0 lg:border-r">
          <div className="flex items-center justify-between border-b border-border px-4 py-2">
            <span className="font-mono text-xs text-muted-foreground">
              registry/{item.id}.tsx
            </span>
            <span className="hidden text-xs text-muted-foreground sm:block">
              Ctrl/Cmd + Enter to run
            </span>
          </div>
          <textarea
            value={code}
            onChange={(event) => setCode(event.target.value)}
            onKeyDown={onKeyDown}
            spellCheck={false}
            aria-label="Component source code"
            className="scrollbar-thin min-h-0 flex-1 resize-none bg-transparent p-4 font-mono text-[13px] leading-relaxed text-foreground outline-none"
          />
        </div>

        <div className="flex min-h-0 flex-col">
          <div className="flex items-center justify-between border-b border-border px-4 py-2">
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Preview
            </span>
            <span
              className={cn(
                "text-xs",
                error ? "text-danger dark:text-danger" : "text-muted-foreground"
              )}
            >
              {error ? "error" : running ? "compiling..." : "ready"}
            </span>
          </div>
          <div className="relative min-h-0 flex-1 overflow-auto bg-muted/40">
            <div
              className="pointer-events-none absolute inset-0 bg-dots opacity-50 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
              aria-hidden="true"
            />
            <div
              ref={previewRef}
              className="relative z-10 flex min-h-full w-full items-center justify-center p-6 sm:p-10"
            />
          </div>
        </div>
      </div>

      {error && (
        <div className="scrollbar-thin max-h-40 overflow-auto border-t border-danger/30 bg-danger/5 px-4 py-3">
          <div className="flex items-start gap-2">
            <AlertCircleIcon className="mt-0.5 h-4 w-4 shrink-0 text-danger dark:text-danger" />
            <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed text-danger dark:text-danger">
              {error}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
