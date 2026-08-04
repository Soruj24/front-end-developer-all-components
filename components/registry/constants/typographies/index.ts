import { typographyHeadings } from "./typography-headings";
import { typographyBody } from "./typography-body";
import { typographyCode } from "./typography-code";
import { typographyAs } from "./typography-as";
import type { RegistryEntry } from "../../types";

export const typographies: RegistryEntry[] = [
  typographyHeadings,
  typographyBody,
  typographyCode,
  typographyAs,
];
