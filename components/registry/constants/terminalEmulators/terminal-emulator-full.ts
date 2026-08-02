import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const terminalEmulatorFull: RegistryEntry = entry({
    id: "terminal-emulator-full",
    title: "Full Terminal",
    description:
      "Boot typing animation, command history with arrow-key navigation, Tab autocomplete for commands and paths, six color themes, a resizable viewport, and a simulated filesystem — all in the browser.",
    source: `import { TerminalEmulator } from "@/components/ui";

export default function TerminalEmulatorDemo() {
  return (
    <TerminalEmulator
      username="ada"
      hostname="playground"
      height={520}
      welcome={[
        "========================================================",
        "  playground-terminal  —  a browser shell, zero backend",
        "  Type 'help' for commands, 'themes' to switch colors.",
        "========================================================",
      ]}
      bootScript={["whoami", "ls", "neofetch"]}
    />
  );
}`,
  });
