import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const progressSizes: RegistryEntry = entry({
  id: "progress-sizes",
  title: "Sizes",
  description: "Different sizes for the progress bar.",
  source: `import { Progress } from "@/components/_progress";

export default function ProgressSizes() {
  return (
    <div className="flex flex-col gap-3">
      <Progress value={60} size="sm" />
      <Progress value={60} size="md" />
      <Progress value={60} size="lg" />
    </div>
  );
}`,
});
