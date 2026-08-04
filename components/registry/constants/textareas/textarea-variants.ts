import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const textareaVariants: RegistryEntry = entry({
  id: "textarea-variants",
  title: "Variants",
  description: "Different visual styles.",
  source: `import { Textarea } from "@/components/_textarea";

export default function TextareaVariants() {
  return (
    <div className="flex flex-col gap-4">
      <Textarea variant="default" label="Default" placeholder="Default variant" />
      <Textarea variant="outlined" label="Outlined" placeholder="Outlined variant" />
      <Textarea variant="filled" label="Filled" placeholder="Filled variant" />
    </div>
  );
}`,
});
