import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const progressDefault: RegistryEntry = entry({
  id: "progress-default",
  title: "Default",
  description: "Default progress bar.",
  source: `import { Progress } from "@/components/_progress";

export default function ProgressDefault() {
  return <Progress value={60} />;
}`,
});
