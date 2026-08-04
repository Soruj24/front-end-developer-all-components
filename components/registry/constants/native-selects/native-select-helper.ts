import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const nativeSelectHelper: RegistryEntry = entry({
  id: "native-select-helper",
  title: "Helper Text",
  description: "Native select with helper text and error state.",
  source: `import { NativeSelect } from "@/components/_native-select";

export default function NativeSelectHelper() {
  return (
    <div className="flex flex-col gap-4">
      <NativeSelect
        label="Country"
        helperText="Select your country of residence"
      >
        <option value="">Select...</option>
        <option value="us">United States</option>
        <option value="uk">United Kingdom</option>
      </NativeSelect>
      <NativeSelect
        label="Currency"
        error
        helperText="This field is required"
      >
        <option value="">Select...</option>
      </NativeSelect>
    </div>
  );
}`,
});
