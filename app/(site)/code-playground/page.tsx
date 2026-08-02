"use client";

import { ComponentPreview } from "@/components/preview";
import { CodePlayground } from "@/components/ui";
import { fullProject, quickProject } from "@/components/code-playground/demo";

export default function CodePlaygroundPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Code Playground
        </h1>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          An interactive, self-contained IDE for React + TypeScript. Edit code
          with a live preview, compile with esbuild in the browser, and play
          with the console, responsive devices, themes, sharing, and export.
        </p>
      </header>

      <ComponentPreview id="code-playground-full">
        <div className="flex w-full flex-col gap-4 py-6">
          <CodePlayground
            files={fullProject}
            entry="App.tsx"
            title="Multi-file App"
            shareKey="full"
          />
          <p className="text-xs text-subtle">
            Try editing <span className="font-mono">timer.ts</span> or{" "}
            <span className="font-mono">analytics.ts</span> — the preview
            recompiles on the fly.
          </p>
        </div>
      </ComponentPreview>

      <ComponentPreview id="code-playground-quick">
        <div className="flex w-full flex-col gap-4 py-6">
          <CodePlayground
            files={quickProject}
            entry="App.tsx"
            title="Single-file App"
            height={480}
            shareKey="quick"
          />
        </div>
      </ComponentPreview>
    </div>
  );
}
