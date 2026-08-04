import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const typographyAs: RegistryEntry = entry({
  id: "typography-as",
  title: "Custom Element",
  description: "Override rendered HTML element with as prop.",
  source: `import { Typography } from "@/components/_typography";

export default function TypographyAs() {
  return (
    <div className="flex flex-col gap-2">
      <Typography as="span" variant="h2">
        Rendered as span
      </Typography>
      <Typography as="div" variant="p">
        Rendered as div
      </Typography>
    </div>
  );
}`,
});
