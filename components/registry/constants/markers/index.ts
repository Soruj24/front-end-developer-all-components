import { markerDefault } from "./marker-default";
import { markerVariants } from "./marker-variants";
import { markerShapes } from "./marker-shapes";
import { markerSizes } from "./marker-sizes";
import { markerWithLabel } from "./marker-with-label";
import type { RegistryEntry } from "../../types";

export const markers: RegistryEntry[] = [
  markerDefault,
  markerVariants,
  markerShapes,
  markerSizes,
  markerWithLabel,
];
