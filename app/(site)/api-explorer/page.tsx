"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { ApiExplorer } from "@/components/ui";
import { demoEndpoints, publicEndpoints } from "@/components/api-explorer/demo";

const APIEXPLORER_SOURCE = `"use client";

import { useState } from "react";

interface Endpoint {
  method: string;
  path: string;
  description?: string;
  response?: { status: number; body: unknown };
}

interface ApiExplorerProps {
  endpoints: Endpoint[];
  baseUrl?: string;
  title?: string;
  height?: number;
}

export function ApiExplorer({ endpoints, baseUrl = "https://api.example.com/v1", title = "API Explorer", height = 600 }: ApiExplorerProps) {
  const [index, setIndex] = useState(0);
  const [response, setResponse] = useState<{ status: number; body: unknown } | null>(null);
  const active = endpoints[index] ?? endpoints[0];
  const methodColor =
    active.method === "GET"
      ? "bg-green-500/10 text-green-600"
      : active.method === "POST"
        ? "bg-blue-500/10 text-blue-600"
        : active.method === "PUT"
          ? "bg-amber-500/10 text-amber-600"
          : "bg-red-500/10 text-red-600";

  return (
    <div className="flex w-full flex-col overflow-hidden rounded-xl border border-border bg-background" style={{ height }}>
      <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
        <span className="text-sm font-semibold text-foreground">{title}</span>
        <span className="font-mono text-xs text-muted-foreground">{baseUrl}</span>
      </div>
      <div className="flex min-h-0 flex-1">
        <div className="w-56 shrink-0 overflow-y-auto border-r border-border p-2">
          {endpoints.map((e, i) => (
            <button
              key={e.path}
              onClick={() => {
                setIndex(i);
                setResponse(null);
              }}
              className={"flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left transition-colors " + (i === index ? "bg-muted" : "hover:bg-muted/50")}
            >
              <span className="w-12 shrink-0 rounded px-1 py-0.5 text-center font-mono text-[10px] font-bold uppercase">{e.method}</span>
              <span className="truncate font-mono text-xs">{e.path}</span>
            </button>
          ))}
        </div>
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-center gap-3 border-b border-border px-4 py-3">
            <span className={"rounded px-2 py-0.5 font-mono text-xs font-bold " + methodColor}>{active.method}</span>
            <span className="truncate font-mono text-sm">{baseUrl}{active.path}</span>
          </div>
          <div className="min-h-0 flex-1 overflow-auto p-4">
            <p className="mb-3 text-xs text-muted-foreground">{active.description}</p>
            {response ? (
              <pre className="rounded-lg bg-muted p-3 text-xs">{JSON.stringify(response.body, null, 2)}</pre>
            ) : (
              <button
                onClick={() => setResponse(active.response ?? { status: 200, body: {} })}
                className="rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-90"
              >
                Send Request
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}`;

const PUBLIC_EXAMPLE = `<ApiExplorer
  endpoints={publicEndpoints}
  title="Public API"
  height={560}
/>`;

export default function ApiExplorerPage() {
  return (
    <ComponentDocPage
      name="API Explorer"
      category="Data Display"
      description="A Postman-style API client. Browse endpoints, build requests with params, headers, auth, and a JSON body, then inspect simulated responses with status codes and a syntax-highlighted JSON viewer. Responses are mocked — no network calls are made."
    >
      <PreviewPanel filename="api-explorer.tsx">
        <div className="flex w-full flex-col gap-3 py-6">
          <ApiExplorer
            endpoints={demoEndpoints}
            baseUrl="https://api.example.com/v1"
            title="Example API"
            height={700}
          />
          <p className="text-xs text-subtle">
            Tip: press <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono">/</kbd> to
            search, use <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono">↑</kbd>/
            <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono">↓</kbd> +{" "}
            <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono">Enter</kbd> to pick an
            endpoint, and <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono">Ctrl</kbd> +{" "}
            <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono">Enter</kbd> to send.
          </p>
        </div>
      </PreviewPanel>

      <SourceCodeViewer source={APIEXPLORER_SOURCE} filename="components/ui/ApiExplorer/ApiExplorer.tsx" defaultExpanded />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Public API" description="Read-only public endpoints without auth configuration." code={PUBLIC_EXAMPLE}>
          <div className="flex w-full flex-col gap-3 py-6">
            <ApiExplorer endpoints={publicEndpoints} title="Public API" height={560} />
          </div>
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}