import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const textareaHelper: RegistryEntry = entry({
  id: "textarea-helper",
  title: "Helper Text",
  description: "Textarea with helper text and error state.",
  source: `import { Textarea } from "@/components/_textarea";

export default function TextareaHelper() {
  return (
    <div className="flex flex-col gap-4">
      <Textarea
        label="Bio"
        helperText="Tell us about yourself"
        placeholder="Enter your bio..."
      />
      <Textarea
        label="Description"
        error
        helperText="This field is required"
        placeholder="Enter description..."
      />
    </div>
  );
}`,
});
