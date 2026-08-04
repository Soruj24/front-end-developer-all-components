import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const aspectRatioCustom: RegistryEntry = entry({
  id: "aspect-ratio-custom",
  title: "Custom",
  description: "Custom aspect ratios with gradient backgrounds.",
  source: `import { AspectRatio } from "@/components/_aspect-ratio";

export default function AspectRatioCustom() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <div className="flex flex-col gap-2">
        <p className="text-xs font-medium text-muted-foreground">2:3 Portrait</p>
        <AspectRatio ratio="2:3">
          <div className="flex h-full items-center justify-center rounded-md bg-gradient-to-br from-blue-500 to-purple-500 text-white">
            <span className="text-sm font-medium">2:3</span>
          </div>
        </AspectRatio>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-xs font-medium text-muted-foreground">3:4 Photo</p>
        <AspectRatio ratio="3:4">
          <div className="flex h-full items-center justify-center rounded-md bg-gradient-to-br from-green-500 to-teal-500 text-white">
            <span className="text-sm font-medium">3:4</span>
          </div>
        </AspectRatio>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-xs font-medium text-muted-foreground">9:16 Mobile</p>
        <AspectRatio ratio="9:16">
          <div className="flex h-full items-center justify-center rounded-md bg-gradient-to-br from-orange-500 to-red-500 text-white">
            <span className="text-sm font-medium">9:16</span>
          </div>
        </AspectRatio>
      </div>
    </div>
  );
}`,
});
