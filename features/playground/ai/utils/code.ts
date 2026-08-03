/** Pure helpers for extracting and naming code from assistant responses. */

import type { CodeSnippet } from "../types";

/** Extracts fenced code blocks (` ```lang`) from a markdown string. */
export function extractCodeBlocks(text: string): CodeSnippet[] {
  const blocks: CodeSnippet[] = [];
  const regex = /```([\w+-]*)\n([\s\S]*?)```/g;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(text)) !== null) {
    blocks.push({ language: match[1] || "text", code: match[2].replace(/\s+$/, "") });
  }
  return blocks;
}

/** The first code block whose language suggests source (tsx/ts/js/jsx), if any. */
export function firstSourceSnippet(text: string): CodeSnippet | null {
  const blocks = extractCodeBlocks(text);
  return blocks.find((block) => SOURCE_LANGS.has(block.language)) ?? blocks[0] ?? null;
}

const SOURCE_LANGS = new Set(["tsx", "ts", "jsx", "js"]);

/** PascalCase component name derived from a raw prompt, or a fallback. */
export function guessComponentName(input: string, fallback = "GeneratedComponent"): string {
  const words = input
    .split(/[^a-zA-Z0-9]+/)
    .filter((word) => word.length > 0)
    .slice(0, 3);
  if (words.length === 0) return fallback;
  const name = words.map((word) => word[0].toUpperCase() + word.slice(1)).join("");
  return /^[A-Z]/.test(name) ? name : fallback;
}

/** Deduplicated file name given a suggested name and existing project files. */
export function uniqueFileName(name: string, existing: string[]): string {
  if (!existing.includes(name)) return name;
  const dot = name.lastIndexOf(".");
  const stem = dot >= 0 ? name.slice(0, dot) : name;
  const ext = dot >= 0 ? name.slice(dot) : "";
  let index = 2;
  while (existing.includes(`${stem}${index}${ext}`)) index += 1;
  return `${stem}${index}${ext}`;
}

/** Infer the correct extension for a new-file command result. */
export function fileNameForCommand(
  base: string,
  commandId: string,
  input: string,
  existing: string[]
): string {
  const dot = base.lastIndexOf(".");
  const stem = dot >= 0 ? base.slice(0, dot) : base;

  switch (commandId) {
    case "generate-component":
      return uniqueFileName(`${guessComponentName(input, stem)}.tsx`, existing);
    case "generate-tests":
      return uniqueFileName(`${stem}.test.tsx`, existing);
    case "generate-storybook":
      return uniqueFileName(`${stem}.stories.tsx`, existing);
    case "generate-variants":
      return uniqueFileName(`${stem}.variants.tsx`, existing);
    case "create-docs":
      return uniqueFileName(`${stem}.md`, existing);
    default:
      return uniqueFileName(base, existing);
  }
}
