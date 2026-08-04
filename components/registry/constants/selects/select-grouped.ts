import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const selectGrouped: RegistryEntry = entry({
  id: "select-grouped",
  title: "Grouped",
  description: "Select with grouped options.",
  source: `import { Select } from "@/components/_select";

const options = [
  { value: "react", label: "React", group: "Frontend" },
  { value: "vue", label: "Vue", group: "Frontend" },
  { value: "svelte", label: "Svelte", group: "Frontend" },
  { value: "node", label: "Node.js", group: "Backend" },
  { value: "python", label: "Python", group: "Backend" },
];

export default function SelectGrouped() {
  return <Select options={options} label="Technology" placeholder="Choose..." />;
}`,
});
