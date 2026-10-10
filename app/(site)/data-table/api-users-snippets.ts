/** Copy-paste snippets for the Data Table API docs. All imports are real. */

export const MOCK_SNIPPET = `"use client";

import { useMemo } from "react";
import { DataTable } from "@/components/ui/DataTable";
import { createUsersApi, useApiResource } from "@/lib/api";
import type { User } from "@/lib/api";

// Mock-first: works offline, no server, deterministic data.
export function UsersTable() {
  const adapter = useMemo(() => createUsersApi({ mode: "mock" }), []);
  const { items, status, error, reload } = useApiResource(adapter);

  if (status === "loading") return <p role="status">Loading users…</p>;
  if (status === "error") {
    return (
      <div role="alert">
        <p>{error}</p>
        <button type="button" onClick={reload}>Retry</button>
      </div>
    );
  }
  return (
    <DataTable<User>
      columns={[
        { key: "name", header: "Name", sortable: true },
        { key: "email", header: "Email", sortable: true },
        { key: "company", header: "Company" },
      ]}
      data={items}
      emptyMessage="No users found."
    />
  );
}`;

export const REAL_SNIPPET = `"use client";

import { useMemo } from "react";
import { DataTable } from "@/components/ui/DataTable";
import { createUsersApi, useApiResource } from "@/lib/api";
import type { User } from "@/lib/api";

// Real mode: needs a base URL. JSONPlaceholder requires no API key.
// For private APIs, pass headers from your auth flow — never hardcode
// secrets here; use a server-side proxy (see app/api/proxy/route.ts).
const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://jsonplaceholder.typicode.com";

export function UsersTable() {
  const adapter = useMemo(
    () => createUsersApi({ mode: "real", baseUrl: BASE_URL, timeoutMs: 10_000 }),
    [],
  );
  const { items, status, error, reload } = useApiResource(adapter);

  if (status === "loading") return <p role="status">Loading users…</p>;
  // A failed real request surfaces status "error" — mock data is NEVER
  // substituted, so you always know what you are looking at.
  if (status === "error") {
    return (
      <div role="alert">
        <p>{error}</p>
        <button type="button" onClick={reload}>Retry</button>
      </div>
    );
  }
  return <DataTable<User> columns={/* same as mock */ []} data={items} />;
}`;

export const SWITCH_SNIPPET = `import { createUsersApi } from "@/lib/api";

// Before: mock data, zero setup.
const mock = createUsersApi({ mode: "mock" });

// After: the smallest change — same adapter interface, same UI code.
const real = createUsersApi({
  mode: "real",
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
});

// Expected response: GET {baseUrl}/users -> User[]
// { "id": 1, "name": "Leanne Graham", "username": "Bret",
//   "email": "Sincere@april.biz", "address": { "city": "Gwenborough" },
//   "company": { "name": "Romaguera-Crona" } }
// Nested address/company are flattened by mapJsonPlaceholderUser.
// Your backend can return this shape directly — no mapping needed.`;
