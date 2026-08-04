import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const bubbleSizes: RegistryEntry = entry({
  id: "bubble-sizes",
  title: "Sizes",
  description: "Three size options — small, medium, and large.",
  source: `import { Bubble } from "@/components/_bubble";

const sizes = ["sm", "md", "lg"] as const;

export default function BubbleSizes() {
  return (
    <div className="flex flex-col gap-3">
      {sizes.map((size) => (
        <div key={size} className="flex flex-col gap-1">
          <p className="text-xs font-medium text-muted-foreground capitalize">{size}</p>
          <Bubble size={size}>
            {size === "sm" ? "Short message" : size === "md" ? "Medium length message" : "This is a longer message with more content to demonstrate the large size variant."}
          </Bubble>
        </div>
      ))}
    </div>
  );
}`,
});
