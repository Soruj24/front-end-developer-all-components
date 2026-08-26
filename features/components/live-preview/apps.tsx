"use client";

import type { ReactNode } from "react";
import {
  ApiExplorer,
  DependencyGraph,
  PromptBuilder,
  StreamingResponse,
  TerminalEmulator,
} from "@/components/ui";

/** Heavy, app-like component demos (terminal, playground, explorer…). */
export const apps: Record<string, () => ReactNode> = {
  "terminal-emulator": () => (
    <TerminalEmulator
      height={220}
      username="developer"
      hostname="component-library"
      welcome={["Type help to list available commands."]}
      autoFocus={false}
    />
  ),

  "api-explorer": () => (
    <ApiExplorer
      height={320}
      baseUrl="https://api.example.com"
      endpoints={[
        {
          id: "list",
          method: "GET",
          path: "/components",
          title: "List components",
          description: "Returns every public component in the registry.",
          tags: ["components"],
          response: { status: 200, body: { ok: true, count: 1284 } },
        },
        {
          id: "get",
          method: "GET",
          path: "/components/:id",
          title: "Get component",
          params: [{ key: "id", value: "button" }],
          response: { status: 200, body: { ok: true, data: { slug: "button", downloads: 482190 } } },
        },
        {
          id: "create",
          method: "POST",
          path: "/components",
          title: "Create component",
          requiresAuth: true,
          requestBody: { slug: "accordion", category: "navigation" },
          response: { status: 201, body: { ok: true, id: "cmp_9f2a" } },
        },
      ]}
    />
  ),

  "prompt-builder": () => <PromptBuilder className="max-w-xl" />,

  "dependency-graph": () => (
    <DependencyGraph
      height={260}
      nodes={[
        { id: "app", label: "app", kind: "entry", status: "ok" },
        { id: "ui", label: "@/components/ui", kind: "module", status: "ok" },
        { id: "utils", label: "@/lib/cn", kind: "module", status: "ok" },
        { id: "styles", label: "globals.css", kind: "asset", status: "warn" },
      ]}
      edges={[
        { from: "app", to: "ui" },
        { from: "app", to: "utils" },
        { from: "app", to: "styles" },
      ]}
      searchable={false}
      minimap={false}
    />
  ),

  "streaming-response": () => (
    <StreamingResponse
      variant="plain"
      maxHeight={240}
      content={"# Streaming\n\nThis response renders **markdown** token by token, live.\n\n- Thinking indicator first\n- Then the answer streams in\n- Supports tool calls and citations"}
    />
  ),
};
