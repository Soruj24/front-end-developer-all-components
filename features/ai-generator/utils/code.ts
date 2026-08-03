import type { GeneratedComponent } from "../types";

/** Extracts the `json` fenced block from a model response. */
export function extractJsonBlock(text: string): string | null {
  const fenced = text.match(/```json\s*([\s\S]*?)```/);
  if (fenced) return fenced[1].trim();
  const brace = text.match(/\{[\s\S]*\}/);
  return brace ? brace[0] : null;
}

/** Parses the model's structured JSON into a GeneratedComponent. */
export function parseGeneratedComponent(text: string): GeneratedComponent | null {
  const block = extractJsonBlock(text);
  if (!block) return null;
  try {
    const data: unknown = JSON.parse(block);
    if (typeof data !== "object" || data === null) return null;
    const record = data as Record<string, unknown>;
    if (typeof record.source !== "string" || !record.source.trim()) return null;
    return {
      name: stringOf(record.name) || guessComponentName(text, "GeneratedComponent"),
      description: stringOf(record.description),
      category: stringOf(record.category) || "surfaces",
      tags: arrayOf(record.tags).slice(0, 6),
      dependencies: arrayOf(record.dependencies).length
        ? arrayOf(record.dependencies)
        : ["react"],
      source: record.source.trim(),
      docs: typeof record.docs === "string" ? record.docs : undefined,
    };
  } catch {
    return null;
  }
}

export function stringOf(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export function arrayOf(value: unknown): string[] {
  return Array.isArray(value) ? value.map(String).filter(Boolean) : [];
}

/** `PascalCase` component name derived from a raw prompt. */
export function guessComponentName(input: string, fallback = "GeneratedComponent"): string {
  const words = input
    .split(/[^a-zA-Z0-9]+/)
    .filter((word) => word.length > 0)
    .slice(0, 3);
  if (words.length === 0) return fallback;
  const name = words.map((word) => word[0].toUpperCase() + word.slice(1)).join("");
  return /^[A-Z]/.test(name) ? name : fallback;
}

/** Lowercase dashed slug for registry ids and file names. */
export function slugify(name: string): string {
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug || "generated-component";
}
