import { terminalEmulatorFull } from "./terminal-emulator-full";
import { terminalEmulatorCommands } from "./terminal-emulator-commands";
import { terminalEmulatorThemes } from "./terminal-emulator-themes";
import { terminalEmulatorFs } from "./terminal-emulator-fs";

import type { RegistryEntry } from "../../types";

/** Terminal Emulator examples. Each is one preview block on the Terminal Emulator page. */
export const terminalEmulators: RegistryEntry[] = [
  terminalEmulatorFull,
  terminalEmulatorCommands,
  terminalEmulatorThemes,
  terminalEmulatorFs,
];
