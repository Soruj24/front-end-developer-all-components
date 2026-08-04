import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const aspectRatioImages: RegistryEntry = entry({
  id: "aspect-ratio-images",
  title: "Images",
  description: "Images displayed with different aspect ratios.",
  source: `import { AspectRatio } from "@/components/_aspect-ratio";

export default function AspectRatioImages() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
      <div className="flex flex-col gap-2">
        <p className="text-xs font-medium text-muted-foreground">16:9 Landscape</p>
        <AspectRatio ratio="16:9">
          <img
            src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
            alt="Landscape"
            className="h-full w-full rounded-md object-cover"
          />
        </AspectRatio>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-xs font-medium text-muted-foreground">4:3 Standard</p>
        <AspectRatio ratio="4:3">
          <img
            src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&dpr=2&q=80"
            alt="Standard"
            className="h-full w-full rounded-md object-cover"
          />
        </AspectRatio>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-xs font-medium text-muted-foreground">1:1 Square</p>
        <AspectRatio ratio="1:1">
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&dpr=2&q=80"
            alt="Square"
            className="h-full w-full rounded-md object-cover"
          />
        </AspectRatio>
      </div>
    </div>
  );
}`,
});
