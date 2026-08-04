import { sliderDefault } from "./slider-default";
import { sliderSizes } from "./slider-sizes";
import { sliderRange } from "./slider-range";
import { sliderDisabled } from "./slider-disabled";
import type { RegistryEntry } from "../../types";

export const sliders: RegistryEntry[] = [
  sliderDefault,
  sliderSizes,
  sliderRange,
  sliderDisabled,
];
