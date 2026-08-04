import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const typographyBody: RegistryEntry = entry({
  id: "typography-body",
  title: "Body",
  description: "Body text and paragraph styles.",
  source: `import { Typography } from "@/components/_typography";

export default function TypographyBody() {
  return (
    <div className="flex flex-col gap-4">
      <Typography variant="p">
        The quick brown fox jumps over the lazy dog. This is a paragraph
        of text that demonstrates the default body styling.
      </Typography>
      <Typography variant="small">
        This is smaller text for captions and fine print.
      </Typography>
      <Typography variant="blockquote">
        "Design is not just what it looks like and feels like. Design is how it works."
      </Typography>
    </div>
  );
}`,
});
