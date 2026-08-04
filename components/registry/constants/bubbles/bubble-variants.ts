import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const bubbleVariants: RegistryEntry = entry({
  id: "bubble-variants",
  title: "Variants",
  description: "Four visual styles — default, primary, secondary, and muted.",
  source: `import { Bubble } from "@/components/_bubble";

const variants = ["default", "primary", "secondary", "muted"] as const;

export default function BubbleVariants() {
  return (
    <div className="flex flex-col gap-3">
      {variants.map((variant) => (
        <div key={variant} className="flex flex-col gap-1">
          <p className="text-xs font-medium text-muted-foreground capitalize">{variant}</p>
          <Bubble variant={variant}>
            This is a {variant} bubble message.
          </Bubble>
        </div>
      ))}
    </div>
  );
}`,
});
