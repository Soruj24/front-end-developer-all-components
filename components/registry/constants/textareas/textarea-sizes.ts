import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const textareaSizes: RegistryEntry = entry({
  id: "textarea-sizes",
  title: "Sizes",
  description: "Different sizes for the textarea.",
  source: `import { Textarea } from "@/components/_textarea";

export default function TextareaSizes() {
  return (
    <div className="flex flex-col gap-4">
      <Textarea size="sm" label="Small" placeholder="Small textarea" />
      <Textarea size="md" label="Medium" placeholder="Medium textarea" />
      <Textarea size="lg" label="Large" placeholder="Large textarea" />
    </div>
  );
}`,
});
