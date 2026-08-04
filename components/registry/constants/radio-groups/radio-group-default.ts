import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const radioGroupDefault: RegistryEntry = entry({
  id: "radio-group-default",
  title: "Default",
  description: "Default radio group.",
  source: `import { RadioGroup } from "@/components/_radio-group";

const options = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry" },
];

export default function RadioGroupDefault() {
  return <RadioGroup options={options} defaultValue="apple" label="Choose a fruit" />;
}`,
});
