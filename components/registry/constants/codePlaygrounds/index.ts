import { codePlaygroundFull } from "./code-playground-full";
import { codePlaygroundQuick } from "./code-playground-quick";

import type { RegistryEntry } from "../../types";

/** Code Playground examples. Each is one preview block on the Code Playground page. */
export const codePlaygrounds: RegistryEntry[] = [
  codePlaygroundFull,
  codePlaygroundQuick,
];
