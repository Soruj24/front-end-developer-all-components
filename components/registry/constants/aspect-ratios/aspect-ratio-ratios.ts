import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const aspectRatioRatios: RegistryEntry = entry({
  id: "aspect-ratio-ratios",
  title: "Ratios",
  description: "Common aspect ratio presets.",
  source: `import { AspectRatio } from "@/components/_aspect-ratio";

const ratios = ["16:9", "4:3", "1:1", "2:3", "3:4", "9:16"] as const;

export default function AspectRatioRatios() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
      {ratios.map((ratio) => (
        <div key={ratio} className="flex flex-col gap-2">
          <p className="text-xs font-medium text-muted-foreground">{ratio}</p>
          <AspectRatio ratio={ratio}>
            <div className="flex h-full items-center justify-center rounded-md bg-zinc-100 dark:bg-zinc-800">
              <span className="text-sm font-medium text-zinc-500">{ratio}</span>
            </div>
          </AspectRatio>
        </div>
      ))}
    </div>
  );
}`,
});
