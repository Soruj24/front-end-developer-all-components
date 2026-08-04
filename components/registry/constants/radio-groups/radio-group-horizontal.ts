import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const radioGroupHorizontal: RegistryEntry = entry({
  id: "radio-group-horizontal",
  title: "Horizontal",
  description: "Horizontal radio group layout.",
  source: `import { RadioGroup } from "@/components/_radio-group";

const options = [
  { value: "sm", label: "Small" },
  { value: "md", label: "Medium" },
  { value: "lg", label: "Large" },
];

export default function RadioGroupHorizontal() {
  return (
    <RadioGroup
      options={options}
      defaultValue="md"
      orientation="horizontal"
      label="Size"
    />
  );
}`,
});
