import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const apiExplorerQuick: RegistryEntry = entry({
    id: "api-explorer-quick",
    title: "Compact Explorer",
    description:
      "A lighter, public-endpoints-only explorer with a smaller footprint.",
    source: `import { ApiExplorer } from "@/components/ui";

const endpoints = [
  {
    id: "health",
    method: "GET",
    path: "/health",
    title: "Service health check",
    group: "System",
    delay: 200,
    response: { status: 200, body: { status: "ok", uptime: 48231, version: "2.4.1" } },
  },
  {
    id: "version",
    method: "GET",
    path: "/version",
    title: "API version",
    group: "System",
    delay: 150,
    response: { status: 200, body: { api: "v1", build: "2026.07.1" } },
  },
  {
    id: "docs",
    method: "GET",
    path: "/docs",
    title: "API documentation",
    group: "System",
    delay: 250,
    response: { status: 200, body: "Welcome to the API." },
  },
];

export default function ApiExplorerDemo() {
  return (
    <ApiExplorer endpoints={endpoints} title="Public API" height={520} />
  );
}`,
  });
