"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { CodePlayground } from "@/components/ui";
import { fullProject, quickProject } from "@/components/code-playground/demo";
import { CODE_PLAYGROUND_SOURCE } from "./code-playground-source";

const MULTI_FILE_CODE = `<CodePlayground
  files={project}
  entry="App.tsx"
  title="Multi-file App"
  shareKey="full"
/>`;

const SINGLE_FILE_CODE = `<CodePlayground
  files={project}
  entry="App.tsx"
  title="Single-file App"
  height={480}
  shareKey="quick"
/>`;

export default function CodePlaygroundPage() {
  return (
    <ComponentDocPage
      name="Code Playground"
      category="Forms"
      description="An interactive, self-contained IDE for React + TypeScript. Edit code with a live preview, compile with esbuild in the browser, and play with the console, responsive devices, themes, sharing, and export."
    >
      <PreviewPanel filename="code-playground.tsx">
        <div className="flex w-full flex-col gap-4 py-2">
          <CodePlayground
            files={fullProject}
            entry="App.tsx"
            title="Multi-file App"
            shareKey="full"
          />
        </div>
      </PreviewPanel>

      <SourceCodeViewer
        source={CODE_PLAYGROUND_SOURCE}
        filename="components/ui/CodePlayground/CodePlayground.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Multi-file App" description="Edit multiple files with live recompilation." code={MULTI_FILE_CODE}>
          <div className="flex w-full flex-col gap-4 py-4">
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
        </ExampleBlock>

        <ExampleBlock title="Single-file App" description="Quick single-file playground with custom height." code={SINGLE_FILE_CODE}>
          <div className="flex w-full flex-col gap-4 py-4">
            <CodePlayground
              files={quickProject}
              entry="App.tsx"
              title="Single-file App"
              height={480}
              shareKey="quick"
            />
          </div>
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}