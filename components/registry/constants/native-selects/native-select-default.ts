import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const nativeSelectDefault: RegistryEntry = entry({
  id: "native-select-default",
  title: "Default",
  description: "Default native select dropdown.",
  source: `import { NativeSelect } from "@/components/_native-select";

export default function NativeSelectDefault() {
  return (
    <NativeSelect label="Choose a framework">
      <option value="">Select...</option>
      <option value="react">React</option>
      <option value="vue">Vue</option>
      <option value="angular">Angular</option>
      <option value="svelte">Svelte</option>
    </NativeSelect>
  );
}`,
});
