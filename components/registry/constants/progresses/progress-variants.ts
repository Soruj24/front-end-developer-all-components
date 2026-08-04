import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const progressVariants: RegistryEntry = entry({
  id: "progress-variants",
  title: "Variants",
  description: "Different color variants.",
  source: `import { Progress } from "@/components/_progress";

export default function ProgressVariants() {
  return (
    <div className="flex flex-col gap-3">
      <Progress value={60} variant="default" />
      <Progress value={75} variant="success" />
      <Progress value={50} variant="warning" />
      <Progress value={40} variant="danger" />
    </div>
  );
}`,
});
