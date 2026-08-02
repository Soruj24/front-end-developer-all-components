import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const terminalEmulatorFs: RegistryEntry = entry({
    id: "terminal-emulator-fs",
    title: "Custom Filesystem",
    description:
      "Swap in a virtual file tree through the fs prop — ls, cd, cat, and Tab path completion all run against a plain in-memory object.",
    source: `import { TerminalEmulator, type FsNode } from "@/components/ui";

const fs: FsNode = {
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
                  content: "export function compute(x: number, y: number) {\\n  return x + y;\\n}",
                },
              },
            },
            notes: {
              type: "dir",
              children: {
                "ideas.md": {
                  type: "file",
                  content: "# Ideas\\n\\n- Ada is the only programmer.\\n- Punch cards make a comeback.",
                },
                "groceries.txt": { type: "file", content: "tea\\noat milk\\nnotebook" },
              },
            },
          },
        },
      },
    },
    tmp: { type: "dir", children: {} },
    etc: {
      type: "dir",
      children: { motd: { type: "file", content: "Welcome to the browser. You have no email." } },
    },
  },
};

export default function TerminalEmulatorCustomFs() {
  return (
    <TerminalEmulator
      username="ada"
      hostname="playground"
      theme="matrix"
      height={420}
      fs={fs}
      bootScript={["whoami", "ls", "cat notes/ideas.md", "pwd"]}
    />
  );
}`,
  });
