import { aspectRatioRatios } from "./aspect-ratio-ratios";
import { aspectRatioImages } from "./aspect-ratio-images";
import { aspectRatioVideo } from "./aspect-ratio-video";
import { aspectRatioCustom } from "./aspect-ratio-custom";
import { aspectRatioCard } from "./aspect-ratio-card";
import type { RegistryEntry } from "../../types";

/** Individual examples. Each is one preview block on the Aspect Ratio page. */
export const aspectRatios: RegistryEntry[] = [
  aspectRatioRatios,
  aspectRatioImages,
  aspectRatioVideo,
  aspectRatioCustom,
  aspectRatioCard,
];
