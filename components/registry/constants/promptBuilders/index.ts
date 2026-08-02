import { promptBuilderFull } from "./prompt-builder-full";
import { promptBuilderEmbedded } from "./prompt-builder-embedded";

export { blogTemplate, marketingTemplate } from "./shared";
import type { RegistryEntry } from "../../types";

export const promptBuilders: RegistryEntry[] = [
  promptBuilderFull,
  promptBuilderEmbedded,
];
