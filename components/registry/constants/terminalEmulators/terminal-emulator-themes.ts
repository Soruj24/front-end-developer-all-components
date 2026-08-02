import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const terminalEmulatorThemes: RegistryEntry = entry({
    id: "terminal-emulator-themes",
    title: "Theme Switcher",
    description:
      "Six built-in palettes — try the 'theme' and 'themes' commands inside the shell, or start on any theme via the theme prop.",
    source: `import { TerminalEmulator, TERMINAL_THEMES } from "@/components/ui";

export default function TerminalEmulatorThemes() {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        {TERMINAL_THEMES.map((t) => (
          <span
            key={t.id}
            className="rounded-full border px-2.5 py-1 font-mono text-xs"
            style={{ borderColor: t.accent, color: t.accent }}
          >
            {t.label}
          </span>
        ))}
      </div>
      <TerminalEmulator
        theme="cyber"
        username="ada"
        hostname="playground"
        height={400}
        bootScript={["themes", "help"]}
      />
    </div>
  );
}`,
  });
