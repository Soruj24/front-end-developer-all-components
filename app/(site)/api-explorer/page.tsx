"use client";

import { ComponentPreview } from "@/components/preview";
import { ApiExplorer } from "@/components/ui";
import { demoEndpoints, publicEndpoints } from "@/components/api-explorer/demo";

export default function ApiExplorerPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          API Explorer
        </h1>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          A Postman-style API client. Browse endpoints, build requests with
          params, headers, auth, and a JSON body, then inspect simulated
          responses with status codes and a syntax-highlighted JSON viewer.
          Responses are mocked — no network calls are made.
        </p>
      </header>

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
  );
}
