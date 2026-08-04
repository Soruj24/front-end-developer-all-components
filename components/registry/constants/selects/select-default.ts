import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const selectDefault: RegistryEntry = entry({
  id: "select-default",
  title: "Default",
  description: "Default select dropdown.",
  source: `import { Select } from "@/components/_select";

const options = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "angular", label: "Angular" },
  { value: "svelte", label: "Svelte" },
];

export default function SelectDefault() {
  return <Select options={options} label="Framework" placeholder="Choose..." />;
}`,
});
