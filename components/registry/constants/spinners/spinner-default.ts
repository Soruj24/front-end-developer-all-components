import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const spinnerDefault: RegistryEntry = entry({
  id: "spinner-default",
  title: "Default",
  description: "Default spinner.",
  source: `import { Spinner } from "@/components/_spinner";

export default function SpinnerDefault() {
  return <Spinner />;
}`,
});
