import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const typographyCode: RegistryEntry = entry({
  id: "typography-code",
  title: "Code",
  description: "Inline and code block styles.",
  source: `import { Typography } from "@/components/_typography";

export default function TypographyCode() {
  return (
    <div className="flex flex-col gap-4">
      <Typography variant="p">
        Use the <Typography variant="code">useState</Typography> hook for state management.
      </Typography>
      <Typography variant="pre">{\`const count = 0;
const setCount = (n) => n + 1;\`}</Typography>
    </div>
  );
}`,
});
