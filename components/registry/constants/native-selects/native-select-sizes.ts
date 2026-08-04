import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const nativeSelectSizes: RegistryEntry = entry({
  id: "native-select-sizes",
  title: "Sizes",
  description: "Different sizes for the native select.",
  source: `import { NativeSelect } from "@/components/_native-select";

export default function NativeSelectSizes() {
  return (
    <div className="flex flex-col gap-4">
      <NativeSelect size="sm" label="Small">
        <option>Small</option>
      </NativeSelect>
      <NativeSelect size="md" label="Medium">
        <option>Medium</option>
      </NativeSelect>
      <NativeSelect size="lg" label="Large">
        <option>Large</option>
      </NativeSelect>
    </div>
  );
}`,
});
