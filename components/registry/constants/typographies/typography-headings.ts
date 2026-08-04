import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const typographyHeadings: RegistryEntry = entry({
  id: "typography-headings",
  title: "Headings",
  description: "Heading variants from h1 to h6.",
  source: `import { Typography } from "@/components/_typography";

export default function TypographyHeadings() {
  return (
    <div className="flex flex-col gap-2">
      <Typography variant="h1">Heading 1</Typography>
      <Typography variant="h2">Heading 2</Typography>
      <Typography variant="h3">Heading 3</Typography>
      <Typography variant="h4">Heading 4</Typography>
      <Typography variant="h5">Heading 5</Typography>
      <Typography variant="h6">Heading 6</Typography>
    </div>
  );
}`,
});
