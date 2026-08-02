import type { TerminalCommand, FsNode } from "@/components/ui";

const fortunes = [
  "A clear conscience is usually the sign of a bad memory.",
  "A handful of patience is worth more than a bushel of brains.",
  "Do not mistake the goat's beard for the stallion's mane.",
  "When the wind blows, the grass says nothing.",
  "The best time to plant a tree was 20 years ago.",
];

const quotes = [
  "Talk is cheap. Show me the code. — Linus Torvalds",
  "First, solve the problem. Then, write the code. — John Johnson",
  "Programs must be written for people to read. — Harold Abelson",
  "Simplicity is the soul of efficiency. — Austin Freeman",
];

const forecasts = [
  { city: "San Francisco", temp: 18, cond: "Fog rolling in off the bay" },
  { city: "Berlin", temp: 22, cond: "Partly cloudy, occasional cat" },
  { city: "Tokyo", temp: 29, cond: "Humid, servers running hot" },
];

export const extraCommands: TerminalCommand[] = [
  {
    name: "fortune",
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
    name: "quote",
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
    name: "weather",
    description: "Weather report (fake)",
    usage: "weather [city]",
    run: (args) => {
      const picked =
        forecasts.find((f) => f.city.toLowerCase() === args[0]?.toLowerCase()) ??
        forecasts[Math.floor(Math.random() * forecasts.length)];
      return [
        {
          spans: [
            { text: `${picked.city}  `, color: "accent", bold: true },
            { text: `${picked.temp}°C  ` },
            { text: picked.cond, color: "dim" },
          ],
          delay: 240,
        },
      ];
    },
  },
];

export const customFs: FsNode = {
  type: "dir",
  children: {
    home: {
      type: "dir",
      children: {
        ada: {
          type: "dir",
          children: {
            projects: {
              type: "dir",
              children: {
                "port-royale.ts": { type: "file", content: "const ships = [] as const;" },
                "analytical-engine.ts": {
                  type: "file",
                  content: "export function compute(x: number, y: number) {\n  return x + y;\n}",
                },
              },
            },
            notes: {
              type: "dir",
              children: {
                "ideas.md": {
                  type: "file",
                  content: "# Ideas\n\n- Ada is the only programmer.\n- Punch cards make a comeback.",
                },
                "groceries.txt": { type: "file", content: "tea\noat milk\nnotebook" },
              },
            },
          },
        },
      },
    },
    tmp: { type: "dir", children: {} },
    etc: {
      type: "dir",
      children: { "motd": { type: "file", content: "Welcome to the browser. You have no email." } },
    },
  },
};

export const welcomeBanner = [
  "========================================================",
  "  playground-terminal  —  a browser shell, zero backend",
  "  Type 'help' for commands, 'themes' to switch colors.",
  "========================================================",
];

export const customBootScript = ["whoami", "ls", "neofetch", "fortune"];
