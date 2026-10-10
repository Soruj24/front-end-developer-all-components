import { ApiError } from "./api-errors";
import { buildUrl, fetchJson } from "./api-client";
import { createMockStore } from "./api-mock";
import type { ApiAdapter, ApiConfig, PageQuery } from "./api-types";

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  phone: string;
  city: string;
  company: string;
}

/** Deterministic mock dataset — clearly fake, stable across renders. */
export const mockUsers: User[] = [
  { id: "u01", name: "Ada Lovelace", username: "ada", email: "ada@example.dev", phone: "555-0101", city: "London", company: "Analytical Engines" },
  { id: "u02", name: "Alan Turing", username: "alan", email: "alan@example.dev", phone: "555-0102", city: "Manchester", company: "Bletchley Labs" },
  { id: "u03", name: "Grace Hopper", username: "grace", email: "grace@example.dev", phone: "555-0103", city: "New York", company: "Compiler Co" },
  { id: "u04", name: "Linus Torvalds", username: "linus", email: "linus@example.dev", phone: "555-0104", city: "Helsinki", company: "Kernel Works" },
  { id: "u05", name: "Margaret Hamilton", username: "margaret", email: "margaret@example.dev", phone: "555-0105", city: "Boston", company: "Apollo Systems" },
  { id: "u06", name: "Guido van Rossum", username: "guido", email: "guido@example.dev", phone: "555-0106", city: "Amsterdam", company: "Pythonic" },
  { id: "u07", name: "Barbara Liskov", username: "barbara", email: "barbara@example.dev", phone: "555-0107", city: "Cambridge", company: "CLU Designs" },
  { id: "u08", name: "Donald Knuth", username: "donald", email: "donald@example.dev", phone: "555-0108", city: "Stanford", company: "TeX Press" },
  { id: "u09", name: "Katherine Johnson", username: "katherine", email: "katherine@example.dev", phone: "555-0109", city: "Hampton", company: "Orbital Math" },
  { id: "u10", name: "Tim Berners-Lee", username: "tim", email: "tim@example.dev", phone: "555-0110", city: "Oxford", company: "World Wide Web" },
  { id: "u11", name: "Radia Perlman", username: "radia", email: "radia@example.dev", phone: "555-0111", city: "Boston", company: "Spanning Tree" },
  { id: "u12", name: "Dennis Ritchie", username: "dennis", email: "dennis@example.dev", phone: "555-0112", city: "Murray Hill", company: "Bell Labs" },
];

export function createUsersMockAdapter(latencyMs = 350): ApiAdapter<User> {
  return createMockStore<User>({
    resource: "users",
    seed: mockUsers,
    getId: (u) => u.id,
    searchFields: ["name", "username", "email", "city", "company"],
    latencyMs,
  });
}

interface JsonPlaceholderUser {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  address?: { city?: string };
  company?: { name?: string };
}

/**
 * Maps the public JSONPlaceholder /users payload onto our User type.
 * Transformation needed: nested address/company flattened, numeric id → string.
 */
export function mapJsonPlaceholderUser(raw: JsonPlaceholderUser): User {
  if (!raw || typeof raw !== "object" || typeof raw.name !== "string") {
    throw new ApiError("invalid-response", "Unexpected user shape from /users.");
  }
  return {
    id: String(raw.id),
    name: raw.name,
    username: raw.username ?? "",
    email: raw.email ?? "",
    phone: raw.phone ?? "",
    city: raw.address?.city ?? "",
    company: raw.company?.name ?? "",
  };
}

/** Example of one raw JSONPlaceholder user (response schema reference). */
export const USERS_RESPONSE_EXAMPLE = `{
  "id": 1,
  "name": "Leanne Graham",
  "username": "Bret",
  "email": "Sincere@april.biz",
  "phone": "1-770-736-8031 x56442",
  "address": { "city": "Gwenborough" },
  "company": { "name": "Romaguera-Crona" }
}`;

export function createUsersRealAdapter(config: ApiConfig): ApiAdapter<User> | null {
  const baseUrl = config.baseUrl?.trim();
  if (!baseUrl) return null;
  return {
    mode: "real",
    resource: "users",
    async list(query?: PageQuery, signal?: AbortSignal) {
      const { data } = await fetchJson<JsonPlaceholderUser[]>(buildUrl(baseUrl, "/users"), {
        headers: config.headers,
        timeoutMs: config.timeoutMs,
        signal,
      });
      if (!Array.isArray(data)) {
        throw new ApiError("invalid-response", "Expected a JSON array from GET /users.");
      }
      const mapped = data.map(mapJsonPlaceholderUser);
      const store = createMockStore<User>({
        resource: "users",
        seed: mapped,
        getId: (u) => u.id,
        searchFields: ["name", "username", "email", "city", "company"],
        latencyMs: 0,
      });
      return store.list(query);
    },
    async getById(id, signal) {
      const { data } = await fetchJson<JsonPlaceholderUser>(buildUrl(baseUrl, `/users/${id}`), {
        headers: config.headers,
        timeoutMs: config.timeoutMs,
        signal,
      });
      return mapJsonPlaceholderUser(data);
    },
  };
}

/** One-line mode switch — the smallest change to go from mock to real. */
export function createUsersApi(config: ApiConfig): ApiAdapter<User> | null {
  if (config.mode === "real") return createUsersRealAdapter(config);
  return createUsersMockAdapter(config.mockLatencyMs);
}
