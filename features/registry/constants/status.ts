import type { ComponentStatus } from "../types/component";

export type BadgeTone =
  | "default"
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "info";

export const componentStatuses: ComponentStatus[] = [
  "stable",
  "beta",
  "new",
  "deprecated",
];

export const componentLicenses = ["MIT", "Apache-2.0"] as const;

export interface SortOption {
  value: string;
  label: string;
}

export const registrySortOptions: SortOption[] = [
  { value: "popular", label: "Most popular" },
  { value: "downloads", label: "Most downloads" },
  { value: "newest", label: "Newest" },
  { value: "name", label: "Name" },
];

export const statusLabel: Record<ComponentStatus, string> = {
  stable: "Stable",
  beta: "Beta",
  new: "New",
  deprecated: "Deprecated",
};

export const componentStatusTone: Record<ComponentStatus, string> = {
  stable: "success",
  beta: "info",
  new: "warning",
  deprecated: "danger",
};

/** Maps a loose status string to a consistent badge tone. */
export function statusTone(status: string): BadgeTone {
  const map: Record<string, BadgeTone> = {
    Active: "success",
    Approved: "success",
    Published: "success",
    Resolved: "success",
    Stable: "success",
    Success: "success",
    Pending: "warning",
    Beta: "warning",
    Investigating: "warning",
    New: "info",
    Open: "info",
    Processing: "info",
    Draft: "info",
    Archived: "default",
    Suspended: "danger",
    Flagged: "danger",
    High: "danger",
    Critical: "danger",
    Error: "danger",
    Inactive: "default",
    Hidden: "default",
    Dismissed: "default",
    Medium: "warning",
    Low: "info",
  };
  return map[status] ?? "default";
}
