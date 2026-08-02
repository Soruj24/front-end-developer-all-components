"use client";

import { ComponentPreview } from "@/components/preview";
import { JsonTreeViewer } from "@/components/ui";
import {
  userProfile,
  nestedConfig,
  apiResponse,
  largePayload,
} from "@/components/json-tree-viewer/demo";

export default function JsonTreeViewerPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          JSON Tree Viewer
        </h1>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          A collapsible, searchable JSON inspector. Expand and collapse nodes,
          filter by key or value with inline highlighting, copy paths and
          values, and read type-colored output — built to stay smooth on very
          large payloads by rendering lazily with a configurable row cap.
        </p>
      </header>

      <ComponentPreview id="json-tree-viewer-full">
        <div className="flex w-full flex-col gap-3 py-6">
          <JsonTreeViewer
            data={userProfile}
            title="User Profile"
            defaultExpandedDepth={2}
            height={540}
          />
          <p className="text-xs text-subtle">
            Tip: press <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono">/</kbd> to
            focus search, hover a row to copy its path or value, and use the
            toolbar to expand/collapse everything or flip the theme.
          </p>
        </div>
      </ComponentPreview>

      <ComponentPreview id="json-tree-viewer-nested">
        <div className="flex w-full flex-col gap-3 py-6">
          <JsonTreeViewer
            data={nestedConfig}
            title="Service Configuration"
            defaultExpandedDepth={3}
            height={480}
          />
        </div>
      </ComponentPreview>

      <ComponentPreview id="json-tree-viewer-response">
        <div className="flex w-full flex-col gap-3 py-6">
          <JsonTreeViewer
            data={apiResponse}
            title="API Response"
            defaultExpandedDepth={2}
            height={420}
          />
        </div>
      </ComponentPreview>

      <ComponentPreview id="json-tree-viewer-large">
        <div className="flex w-full flex-col gap-3 py-6">
          <JsonTreeViewer
            data={largePayload}
            title="Telemetry — 5,000 points"
            defaultExpandedDepth={1}
            maxItems={60}
            height={420}
          />
          <p className="text-xs text-subtle">
            The <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono">points</kbd>{" "}
            array holds 5,000 entries. Only 60 rows render initially — a{" "}
            <em>… N more</em> row reveals the rest on demand, so the DOM never
            blows up on large payloads.
          </p>
        </div>
      </ComponentPreview>
    </div>
  );
}
