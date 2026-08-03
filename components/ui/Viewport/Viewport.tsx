import { cn } from "@/lib/cn";
import type { ViewportProps } from "./Viewport.types";
import { deviceSizes } from "./Viewport.types";

export function Viewport({ children, width, height, device = "desktop", className }: ViewportProps) {
  const size = deviceSizes[device];
  const w = width ?? size.width;
  const h = height ?? size.height;

  return (
    <div className={cn("mx-auto overflow-auto border rounded-lg bg-white dark:bg-zinc-900", className)} style={{ width: w, height: h }}>
      <div className="w-full h-full overflow-auto">
        {children}
      </div>
    </div>
  );
}
