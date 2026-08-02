import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const inputFile: RegistryEntry = entry({
    id: "input-file",
    title: "File Input (Styled)",
    description: "Drop-zone style file picker.",
    source: `import { useState } from "react";

export default function InputFile() {
  const [fileName, setFileName] = useState("");

  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-black/[.08] px-4 py-6 text-sm text-zinc-500 transition-colors hover:border-zinc-400 hover:text-zinc-700 dark:border-white/[.145] dark:hover:border-zinc-500 dark:hover:text-zinc-300">
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
        <span>{fileName || "Choose a file..."}</span>
        <input
          type="file"
          className="hidden"
          onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")}
        />
      </label>
      {fileName && <p className="text-xs text-green-600 dark:text-green-400">Selected: {fileName}</p>}
    </div>
  );
}`,
  });
