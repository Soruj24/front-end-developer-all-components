import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const aspectRatioCard: RegistryEntry = entry({
  id: "aspect-ratio-card",
  title: "Card",
  description: "Cards with aspect ratio images.",
  source: `import { AspectRatio } from "@/components/_aspect-ratio";

export default function AspectRatioCard() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div className="overflow-hidden rounded-lg border">
        <AspectRatio ratio="16:9">
          <img
            src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&dpr=2&q=80"
            alt="Nature"
            className="h-full w-full object-cover"
          />
        </AspectRatio>
        <div className="p-4">
          <h3 className="font-semibold">Nature Photography</h3>
          <p className="text-sm text-muted-foreground">Beautiful landscapes captured in 16:9 ratio.</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border">
        <AspectRatio ratio="4:3">
          <img
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&dpr=2&q=80"
            alt="Mountains"
            className="h-full w-full object-cover"
          />
        </AspectRatio>
        <div className="p-4">
          <h3 className="font-semibold">Mountain Views</h3>
          <p className="text-sm text-muted-foreground">Stunning mountain scenes in 4:3 ratio.</p>
        </div>
      </div>
    </div>
  );
}`,
});
