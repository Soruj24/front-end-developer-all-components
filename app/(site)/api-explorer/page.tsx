"use client";

import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { ApiExplorer } from "@/components/ui";
import { demoEndpoints, publicEndpoints } from "@/components/api-explorer/demo";

const installCommand = `npx component-library@latest add api-explorer`;

const usageCode = `import { ApiExplorer } from "@/components/ui";

<ApiExplorer
  endpoints={demoEndpoints}
  baseUrl="https://api.example.com/v1"
  title="Example API"
/>`;

export default function ApiExplorerPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            API Explorer
          </h1>
          <Badge variant="primary">2 examples</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          A Postman-style API client. Browse endpoints, build requests with
          params, headers, auth, and a JSON body, then inspect simulated
          responses with status codes and a syntax-highlighted JSON viewer.
          Responses are mocked — no network calls are made.
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
            <h3 className="text-lg font-medium text-foreground">Full Explorer</h3>
            <p className="text-sm text-muted-foreground">Complete API client with endpoints, params, and response viewer.</p>
          </div>
          <ComponentPreview id="api-explorer-full">
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
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-medium text-foreground">Public API</h3>
            <p className="text-sm text-muted-foreground">Read-only public endpoints without auth configuration.</p>
          </div>
          <ComponentPreview id="api-explorer-quick">
            <div className="flex w-full flex-col gap-3 py-6">
              <ApiExplorer
                endpoints={publicEndpoints}
                title="Public API"
                height={560}
              />
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
                <td className="px-4 py-3 font-mono text-xs">endpoints</td>
                <td className="px-4 py-3 text-muted-foreground">Endpoint[]</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">baseUrl</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">title</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">height</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">600</td>
                <td className="px-4 py-3">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
