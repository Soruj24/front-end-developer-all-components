export type ReleaseKind = "major" | "minor" | "patch";

/** A tagged version of a component with its changelog notes. */
export interface RegistryRelease {
  version: string;
  kind: ReleaseKind;
  date: string;
  notes: string[];
}
