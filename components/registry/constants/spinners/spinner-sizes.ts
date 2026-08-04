import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const spinnerSizes: RegistryEntry = entry({
  id: "spinner-sizes",
  title: "Sizes",
  description: "Different sizes for the spinner.",
  source: `import { Spinner } from "@/components/_spinner";

export default function SpinnerSizes() {
  return (
    <div className="flex items-center gap-6">
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </div>
  );
}`,
});
