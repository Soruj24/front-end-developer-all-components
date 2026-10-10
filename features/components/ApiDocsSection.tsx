"use client";

import type { RegistryComponent } from "@/features/registry";
import { SourceCodeViewer } from "@/components/docs/SourceCodeViewer";

/**
 * API integration docs for data-driven components: endpoints, query params,
 * response schema, env/auth notes and the mock→real switching snippet.
 * Rendered only when the catalog entry carries `api` metadata.
 */
export function ApiDocsSection({ component }: { component: RegistryComponent }) {
  const api = component.api;
  if (!api) return null;

  const switchSnippet = `import { createMockStore, fetchJson, buildUrl } from "@/lib/api";

// Mock: deterministic local data, offline-friendly.
const mock = createMockStore({
  resource: "${api.resource}",
  seed: [], // your sample rows
  getId: (row) => row.id,
  latencyMs: 350,
});
await mock.list({ page: 1, pageSize: 10, search: "ada" });

// Real: same call shape against your backend.
const { data } = await fetchJson(buildUrl("${api.baseUrl}", "/${api.resource}", { page: 1 }), {
  timeoutMs: 10_000,
});`;

  return (
    <section aria-labelledby="api-docs-heading" id="api" className="flex flex-col gap-4">
      <h2 id="api-docs-heading" className="text-lg font-semibold tracking-tight text-foreground">
        API integration
      </h2>
      <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
        {component.name} is data-driven. It works offline with a mock adapter and connects to
        any backend implementing the endpoints below — no UI changes required.
      </p>

      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full min-w-[480px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th scope="col" className="px-4 py-2.5 font-mono text-xs font-semibold">Method</th>
              <th scope="col" className="px-4 py-2.5 font-mono text-xs font-semibold">Path</th>
              <th scope="col" className="px-4 py-2.5 text-xs font-semibold">Description</th>
            </tr>
          </thead>
          <tbody>
            {api.endpoints.map((endpoint) => (
              <tr key={`${endpoint.method} ${endpoint.path}`} className="border-b border-border/60 last:border-0">
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-primary">{endpoint.method}</td>
                <td className="px-4 py-2.5 font-mono text-xs text-foreground">
                  {api.baseUrl}
                  {endpoint.path}
                </td>
                <td className="px-4 py-2.5 text-xs text-muted-foreground">{endpoint.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {api.queryParams && api.queryParams.length > 0 && (
        <p className="text-xs text-muted-foreground">
          Supported query parameters:{" "}
          {api.queryParams.map((param) => (
            <code key={param} className="mr-1 rounded bg-muted px-1 py-0.5 font-mono text-[11px]">
              {param}
            </code>
          ))}
        </p>
      )}

      <SourceCodeViewer source={api.responseExample} filename="response.example.json" label="json" />

      {api.mappingNote && (
        <p className="text-xs leading-relaxed text-muted-foreground">
          <span className="font-medium text-foreground">Response mapping: </span>
          {api.mappingNote}
        </p>
      )}

      <SourceCodeViewer source={switchSnippet} filename="switching-to-real.ts" label="ts" />

      <ul className="flex list-disc flex-col gap-1.5 rounded-xl border border-border bg-muted/30 px-4 py-3 pl-9 text-xs text-muted-foreground">
        <li>
          Configure <code className="font-mono">NEXT_PUBLIC_API_BASE_URL</code> (public base URL only).
        </li>
        {api.authNote && <li>{api.authNote}</li>}
        <li>Private keys stay server-side — proxy through an allowlisted route, never the browser.</li>
        <li>Real failures surface error states; mock data is never shown as real results.</li>
      </ul>
    </section>
  );
}
