import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const spinnerLabel: RegistryEntry = entry({
  id: "spinner-label",
  title: "With Label",
  description: "Spinner with text label.",
  source: `import { Spinner } from "@/components/_spinner";

export default function SpinnerLabel() {
  return (
    <div className="flex flex-col items-center gap-4">
      <Spinner label="Loading..." />
      <Spinner size="lg" label="Please wait" />
    </div>
  );
}`,
});
