import type { PlaygroundFile } from "../types";
import { ENTRY_FILE } from "../constants";
import { createZip } from "./zip";

function download(name: string, content: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = name;
  anchor.click();
  URL.revokeObjectURL(url);
}

/** A copyable, self-contained render body (drops script import + module wrapper). */
function componentBody(source: string): string {
  return source
    .replace(/^import.*$/gm, "")
    .replace(/^export default /gm, "function ")
    .trim();
}

export function toTsx(files: PlaygroundFile[]): string {
  return files.map((f) => `// --- ${f.name} ---\n${f.source}`).join("\n\n");
}

/** JSX: TS annotations and `as const`/interfaces are stripped heuristically. */
export function toJsx(files: PlaygroundFile[]): string {
  return files
    .map((f) => {
      const body = f.source
        .replace(/:\s*[A-Z][A-Za-z0-9_<>[\]| ]*(?=[,)=])/g, "")
        .replace(/\s+as\s+const/g, "")
        .replace(/^\s*import\s+type\b.*$/gm, "")
        .replace(/^interface\s+.*$/gm, "")
        .replace(/^}\s*$/gm, "}");
      return `// --- ${f.name} ---\n${body}`;
    })
    .join("\n\n");
}

export function toHtml(files: PlaygroundFile[]): string {
  const entry = files.find((f) => f.name === ENTRY_FILE) ?? files[0];
  const title = "Playground preview";
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module">
${componentBody(entry?.source ?? "")}
    </script>
  </body>
</html>`;
}

export function toJson(files: PlaygroundFile[]): string {
  return JSON.stringify(files, null, 2);
}

export async function toZip(files: PlaygroundFile[]): Promise<Blob> {
  return createZip(
    files.map((f) => ({ name: f.name, content: f.source }))
  );
}

export const EXPORT_FORMATS = ["tsx", "jsx", "html", "json", "zip"] as const;
export type ExportFormat = (typeof EXPORT_FORMATS)[number];

export async function exportFiles(files: PlaygroundFile[], format: ExportFormat): Promise<void> {
  switch (format) {
    case "tsx":
      return download("project.tsx", toTsx(files), "text/plain");
    case "jsx":
      return download("project.jsx", toJsx(files), "text/plain");
    case "html":
      return download("preview.html", toHtml(files), "text/html");
    case "json":
      return download("project.json", toJson(files), "application/json");
    case "zip": {
      const blob = await toZip(files);
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = "playground-project.zip";
      anchor.click();
      URL.revokeObjectURL(url);
      return;
    }
  }
}
