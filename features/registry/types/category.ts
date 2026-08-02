/** A browsable grouping that components belong to. */
export interface RegistryCategory {
  id: string;
  label: string;
  description: string;
  /** Small glyph used in navigation and cards. */
  icon: string;
}
