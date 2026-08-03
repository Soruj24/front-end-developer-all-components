import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const commandCustomEmpty: RegistryEntry = entry({
  id: "command-custom-empty",
  title: "Command with Custom Empty State",
  description: "Custom empty state message.",
  source: `import { Command } from "@/components/_command";

export default function CommandCustomEmpty() {
  return (
    <Command
      items={[]}
      emptyMessage="No commands found. Try a different search."
      placeholder="Search commands..."
    />
  );
}`,
  files: ["components/_command/Command.tsx"],
  dependencies: ["react"],
});
