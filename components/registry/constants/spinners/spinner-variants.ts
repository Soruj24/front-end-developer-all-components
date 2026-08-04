import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const spinnerVariants: RegistryEntry = entry({
  id: "spinner-variants",
  title: "Variants",
  description: "Different color variants.",
  source: `import { Spinner } from "@/components/_spinner";

export default function SpinnerVariants() {
  return (
    <div className="flex items-center gap-6">
      <Spinner variant="default" />
      <Spinner variant="primary" />
      <Spinner variant="secondary" />
    </div>
  );
}`,
});
