"use client";

import { useMemo } from "react";
import { TerminalEmulator, type FsNode, type TerminalCommand } from "@/components/ui";
import { usePlayground } from "../../context";
import { exportFiles } from "../../utils/exporters";

function filesToFs(files: { name: string; source: string }[]): FsNode {
  const root: FsNode = { type: "dir", children: {} };
  for (const file of files) {
    if (!root.children) root.children = {};
    root.children[file.name] = { type: "file", content: file.source };
  }
  return root;
}

export function TerminalTab() {
  const { files, runner, setStatusMessage } = usePlayground();

  const commands: TerminalCommand[] = useMemo(
    () => [
      {
        name: "run",
        description: "Compile and render the project",
        usage: "run",
        run: async () => {
          runner.rerun();
          return `Rebuilding ${files.activeName}…`;
        },
      },
      {
        name: "build",
        description: "Compile the project (alias of run)",
        usage: "build",
        run: async () => {
          runner.rerun();
          return `Build started for ${files.files.length} file(s).`;
        },
      },
      {
        name: "export",
        description: "Download the project as a ZIP",
        usage: "export",
        run: async () => {
          void exportFiles(files.files, "zip");
          setStatusMessage("Exported ZIP");
          return "Exported playground-project.zip";
        },
      },
    ],
    [files, runner, setStatusMessage]
  );

  return (
    <div className="h-full min-h-0">
      <TerminalEmulator
        className="h-full"
        height={200}
        theme="term"
        username="dev"
        hostname="playground"
        fs={filesToFs(files.files)}
        commands={commands}
        boot={false}
        welcome={["Type `help` to see available commands.", `Project: ${files.files.map((f) => f.name).join(", ")}`]}
        autoFocus={false}
      />
    </div>
  );
}
