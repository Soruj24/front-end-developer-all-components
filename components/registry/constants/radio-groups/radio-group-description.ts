import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const radioGroupDescription: RegistryEntry = entry({
  id: "radio-group-description",
  title: "With Description",
  description: "Radio group with option descriptions.",
  source: `import { RadioGroup } from "@/components/_radio-group";

const options = [
  { value: "free", label: "Free Plan", description: "1 GB storage" },
  { value: "pro", label: "Pro Plan", description: "100 GB storage" },
  { value: "enterprise", label: "Enterprise", description: "Unlimited storage" },
];

export default function RadioGroupDescription() {
  return (
    <RadioGroup
      options={options}
      defaultValue="pro"
      label="Select a plan"
    />
  );
}`,
});
