import { dependencyGraphApp } from "./dependency-graph-app";
import { dependencyGraphLarge } from "./dependency-graph-large";
import { dependencyGraphPipeline } from "./dependency-graph-pipeline";

export { largeLayers, miniNodes } from "./shared";
import type { RegistryEntry } from "../../types";

/** Dependency Graph examples. Each is one preview block on the Dependency Graph page. */
export const dependencyGraphs: RegistryEntry[] = [
  dependencyGraphApp,
  dependencyGraphLarge,
  dependencyGraphPipeline,
];
