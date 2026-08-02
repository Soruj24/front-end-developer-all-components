import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const formFileUpload: RegistryEntry = entry({
    id: "form-file-upload",
    title: "File Upload",
    description: "Drag-and-drop upload zone with a selected-file chip.",
    source: `import { useState } from "react";

export default function FormFileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragOver(false);
        if (e.dataTransfer.files?.[0]) setFile(e.dataTransfer.files[0]);
      }}
      className={\`flex w-full max-w-lg cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-8 text-center transition-colors \${dragOver ? "border-zinc-900 bg-zinc-50 dark:border-zinc-100 dark:bg-zinc-900" : "border-zinc-300 hover:border-zinc-400 dark:border-zinc-700"}\`}
      onClick={() => document.getElementById("fu")?.click()}
    >
      <svg className="h-10 w-10 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
      </svg>
      <div>
        <p className="text-sm font-medium">Drop files here or click to browse</p>
        <p className="text-xs text-zinc-500">Up to 10MB</p>
      </div>
      {file && (
        <div className="flex items-center gap-2 rounded-md bg-zinc-100 px-3 py-1.5 text-sm dark:bg-zinc-800">
          <span>{file.name}</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setFile(null);
            }}
            className="text-zinc-400 hover:text-zinc-600"
          >
            &times;
          </button>
        </div>
      )}
      <input id="fu" type="file" className="hidden" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
    </div>
  );
}`,
  });
