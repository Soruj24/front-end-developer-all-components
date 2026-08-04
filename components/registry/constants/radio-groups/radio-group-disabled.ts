import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const radioGroupDisabled: RegistryEntry = entry({
  id: "radio-group-disabled",
  title: "Disabled",
  description: "Radio group with disabled options.",
  source: `import { RadioGroup } from "@/components/_radio-group";

const options = [
  { value: "enabled", label: "Enabled" },
  { value: "disabled", label: "Disabled", disabled: true },
  { value: "also-enabled", label: "Also Enabled" },
];

export default function RadioGroupDisabled() {
  return <RadioGroup options={options} defaultValue="enabled" />;
}`,
});
