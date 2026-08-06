import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const terminalEmulatorCommands: RegistryEntry = entry({
    id: "terminal-emulator-commands",
    title: "Custom Commands",
    description:
      "Extend the shell with your own commands through the commands prop — each one receives the args and a TerminalContext for the virtual filesystem, theme, and history.",
    source: `import { TerminalEmulator, type TerminalCommand } from "@/components/ui";

const fortunes = [
  "A clear conscience is usually the sign of a bad memory.",
  "A handful of patience is worth more than a bushel of brains.",
  "The best time to plant a tree was 20 years ago.",
];

const quotes = [
  "Talk is cheap. Show me the code. — Linus Torvalds",
  "First, solve the problem. Then, write the code. — John Johnson",
  "Simplicity is the soul of efficiency. — Austin Freeman",
];

const commands: TerminalCommand[] = [
  {
    title: "fortune",
    description: "Print a random fortune",
    usage: "fortune",
    run: () => [
      {
        spans: [{ text: fortunes[Math.floor(Math.random() * fortunes.length)], color: "warn" }],
        type: "chars",
        delay: 16,
      },
    ],
  },
  {
    title: "quote",
    description: "Print a programmer quote",
    usage: "quote",
    run: () => [
      {
        spans: [{ text: quotes[Math.floor(Math.random() * quotes.length)] }],
        type: "chars",
        delay: 16,
      },
    ],
  },
  {
    title: "weather",
    description: "Weather report (fake)",
    usage: "weather [city]",
    run: (args) => {
      const picked =
        args[0] === "berlin"
          ? { city: "Berlin", temp: 22, cond: "Partly cloudy, occasional cat" }
          : { city: "San Francisco", temp: 18, cond: "Fog rolling in off the bay" };
      return [
        {
          spans: [
            { text: picked.city + "  ", color: "accent", bold: true },
            { text: picked.temp + "°C  " },
            { text: picked.cond, color: "dim" },
          ],
          delay: 240,
        },
      ];
    },
  },
];

export default function TerminalEmulatorCustomCommands() {
  return (
    <TerminalEmulator
      username="ada"
      hostname="playground"
      height={440}
      commands={commands}
      bootScript={["whoami", "ls", "neofetch", "fortune"]}
    />
  );
}`,
  });
