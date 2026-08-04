import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const progressLabel: RegistryEntry = entry({
  id: "progress-label",
  title: "With Label",
  description: "Progress bar with label.",
  source: `import { Progress } from "@/components/_progress";

export default function ProgressLabel() {
  return (
    <div className="flex flex-col gap-3">
      <Progress value={60} label="Uploading..." />
      <Progress value={85} label="85% complete" />
    </div>
  );
}`,
});
