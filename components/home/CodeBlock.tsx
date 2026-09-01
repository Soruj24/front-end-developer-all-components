"use client";

import {
  CodeBlock as NewCodeBlock,
  type SupportedLanguage,
} from "@/components/code";

interface LegacyCodeBlockProps {
  code: string;
  filename?: string;
  label?: string;
  variant?: "default" | "terminal";
  className?: string;
}

function guessLanguage(
  filename?: string,
  label?: string,
): SupportedLanguage {
  const name = (filename ?? label ?? "").toLowerCase();
  if (name.includes("terminal") || name.includes("bash") || name.includes("shell") || name.includes("sh"))
    return "bash";
  if (name.endsWith(".tsx") || name.includes("tsx")) return "tsx";
  if (name.endsWith(".ts") || name.includes("typescript")) return "typescript";
  if (name.endsWith(".jsx") || name.includes("jsx")) return "jsx";
  if (name.endsWith(".js") || name.includes("javascript") || name.includes("js")) return "javascript";
  if (name.endsWith(".css") || name.includes("css")) return "css";
  if (name.endsWith(".html") || name.includes("html")) return "html";
  if (name.endsWith(".json") || name.includes("json")) return "json";
  return "plaintext";
}

export function CodeBlock({
  code,
  filename,
  label,
  variant,
  className,
}: LegacyCodeBlockProps) {
  const language = guessLanguage(filename, label);

  return (
    <NewCodeBlock
      code={code}
      language={language}
      filename={filename}
      label={label}
      showLineNumbers={false}
      className={className}
    />
  );
}
