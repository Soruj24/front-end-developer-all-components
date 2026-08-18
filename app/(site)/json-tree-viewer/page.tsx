"use client";

import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { JsonTreeViewer } from "@/components/ui";
import {
  userProfile,
  nestedConfig,
  apiResponse,
  largePayload,
} from "@/components/json-tree-viewer/demo";

const installCommand = `npx component-library@latest add json-tree-viewer`;

const usageCode = `import { JsonTreeViewer } from "@/components/ui";

<JsonTreeViewer
  data={jsonData}
  title="API Response"
  defaultExpandedDepth={2}
  height={420}
/>`;

export default function JsonTreeViewerPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            JSON Tree Viewer
          </h1>
          <Badge variant="primary">4 examples</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          A collapsible, searchable JSON inspector. Expand and collapse nodes,
          filter by key or value with inline highlighting, copy paths and
          values, and read type-colored output — built to stay smooth on very
          large payloads by rendering lazily with a configurable row cap.
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Installation</h2>
        <CodeBlock code={installCommand} filename="Terminal" label="bash" variant="terminal" />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} filename="page.tsx" label="tsx" />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Examples</h2>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-medium text-foreground">User Profile</h3>
            <p className="text-sm text-muted-foreground">Explore a user profile object with search and copy actions.</p>
          </div>
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
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-medium text-foreground">Nested Configuration</h3>
            <p className="text-sm text-muted-foreground">Deeply nested service configuration object.</p>
          </div>
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
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-medium text-foreground">API Response</h3>
            <p className="text-sm text-muted-foreground">Typical API response with nested objects and arrays.</p>
          </div>
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
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-medium text-foreground">Large Payload</h3>
            <p className="text-sm text-muted-foreground">Lazy rendering with a configurable row cap for large datasets.</p>
          </div>
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
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left font-medium">Prop</th>
                <th className="px-4 py-3 text-left font-medium">Type</th>
                <th className="px-4 py-3 text-left font-medium">Default</th>
                <th className="px-4 py-3 text-left font-medium">Required</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">data</td>
                <td className="px-4 py-3 text-muted-foreground">unknown</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">title</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">defaultExpandedDepth</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">1</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">maxItems</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">100</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">height</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">400</td>
                <td className="px-4 py-3">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
