import * as React from "react";
import { cn } from "@/lib/cn";
import type { AspectRatioProps } from "./AspectRatio.types";
import { ASPECT_RATIO_PRESETS, ASPECT_RATIO_STYLES } from "./AspectRatio.constants";

export function AspectRatio({ children, ratio = "16:9", width, height, objectFit = "cover", className, ...props }: AspectRatioProps) {
  const aspectRatio = width && height ? width / height : ASPECT_RATIO_PRESETS[ratio];
  const paddingBottom = `${(1 / aspectRatio) * 100}%`;

  const objectFitClass = {
    contain: ASPECT_RATIO_STYLES.contain,
    cover: ASPECT_RATIO_STYLES.cover,
    fill: ASPECT_RATIO_STYLES.fill,
    none: ASPECT_RATIO_STYLES.none,
    "scale-down": ASPECT_RATIO_STYLES["scale-down"],
  }[objectFit];

  return (
    <div className={cn(ASPECT_RATIO_STYLES.base, className)} style={{ paddingBottom }} {...props}>
      {children}
    </div>
  );
}
