import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const selectHelper: RegistryEntry = entry({
  id: "select-helper",
  title: "Helper Text",
  description: "Select with helper text and error state.",
  source: `import { Select } from "@/components/_select";

const options = [
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
];

export default function SelectHelper() {
  return (
    <div className="flex flex-col gap-4">
      <Select
        options={options}
        label="Country"
        helperText="Select your country"
      />
      <Select
        options={options}
        label="Currency"
        error
        helperText="This field is required"
      />
    </div>
  );
}`,
});
