import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const apiExplorerFull: RegistryEntry = entry({
    id: "api-explorer-full",
    title: "Full API Explorer",
    description:
      "Endpoint list with method colors and search, request builder with params / headers / auth / body editors, simulated responses with status codes, JSON viewer, and copy-as-curl.",
    source: `import { ApiExplorer } from "@/components/ui";

const endpoints = [
  {
    id: "users",
    method: "GET",
    path: "/users",
    title: "List users",
    group: "Users",
    query: [{ key: "limit", value: "10" }],
    response: {
      status: 200,
      body: {
        data: [
          { id: "user_1", name: "Ada Lovelace", email: "ada@example.com" },
          { id: "user_2", name: "Alan Turing", email: "alan@example.com" },
        ],
        pagination: { limit: 10, offset: 0, total: 42 },
      },
    },
  },
  {
    id: "user-create",
    method: "POST",
    path: "/users",
    title: "Create a user",
    group: "Users",
    requiresAuth: true,
    delay: 500,
    requestBody: { name: "New User", email: "new@example.com", role: "engineer" },
    response: {
      status: 201,
      body: { id: "user_44", name: "New User", email: "new@example.com", role: "engineer" },
    },
  },
  {
    id: "user-delete",
    method: "DELETE",
    path: "/users/:id",
    title: "Delete a user",
    group: "Users",
    requiresAuth: true,
    params: [{ key: "id", value: "user_3" }],
    response: { status: 200, body: { ok: true, deleted: "user_3" } },
  },
  {
    id: "health",
    method: "GET",
    path: "/health",
    title: "Service health",
    group: "System",
    delay: 200,
    response: { status: 200, body: { status: "ok", uptime: 48231 } },
  },
  {
    id: "stats",
    method: "GET",
    path: "/stats",
    title: "Usage statistics",
    group: "System",
    requiresAuth: true,
    delay: 700,
    response: {
      status: 500,
      body: { error: "internal_error", message: "Downstream analytics timeout" },
    },
  },
];

export default function ApiExplorerDemo() {
  return (
    <ApiExplorer
      endpoints={endpoints}
      baseUrl="https://api.example.com/v1"
      title="Users API"
    />
  );
}`,
  });
