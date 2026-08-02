import type { RegistryComponent } from "../types/component";
import { buttons } from "./buttons";
import { inputs } from "./inputs";
import { dataDisplay } from "./data-display";
import { feedback } from "./feedback";
import { overlays } from "./overlays";
import { navigation } from "./navigation";
import { surfaces } from "./surfaces";

/** The full component registry catalog, ready for server rendering. */
export const registryCatalog: RegistryComponent[] = [
  ...buttons,
  ...inputs,
  ...dataDisplay,
  ...feedback,
  ...overlays,
  ...navigation,
  ...surfaces,
];

export { component } from "./factory";
export type { ComponentSeed } from "./factory";

/** Looks up a single component by its unique slug. */
export function getComponentBySlug(slug: string): RegistryComponent | undefined {
  return registryCatalog.find((item) => item.slug === slug);
}

/** All slugs, used to generate static component routes. */
export function getAllComponentSlugs(): string[] {
  return registryCatalog.map((item) => item.slug);
}
