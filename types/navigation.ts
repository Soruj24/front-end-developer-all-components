import type { ReactNode } from "react";

/** A single destination inside a navigation section. */
export interface NavLink {
  label: string;
  href: string;
  /** Small glyph shown next to the label (sidebar only). */
  icon?: ReactNode;
  /** One-line description (home page cards only). */
  desc?: string;
  /** Optional nested destinations rendered as an indented sub-level. */
  children?: NavLink[];
}

/** A group of navigation links, e.g. "Components" or "Templates". */
export interface NavSection {
  title: string;
  /** Small glyph shown before the section title (sidebar only). */
  icon?: ReactNode;
  /** Short description shown under the section title (home page only). */
  description?: string;
  links: NavLink[];
}
