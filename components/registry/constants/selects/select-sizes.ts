import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const selectSizes: RegistryEntry = entry({
  id: "select-sizes",
  title: "Sizes",
  description: "Different sizes for the select.",
  source: `import { Select } from "@/components/_select";

const options = [{ value: "option", label: "Option" }];

export default function SelectSizes() {
  return (
    <div className="flex flex-col gap-4">
      <Select options={options} size="sm" label="Small" />
      <Select options={options} size="md" label="Medium" />
      <Select options={options} size="lg" label="Large" />
    </div>
  );
}`,
});
