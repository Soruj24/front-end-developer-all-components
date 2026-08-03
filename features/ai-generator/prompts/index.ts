import type { GeneratorSettings } from "../types";
import { getTemplate } from "../constants";

const ALLOWED_CATEGORIES = [
  "buttons",
  "inputs",
  "data-display",
  "feedback",
  "overlays",
  "navigation",
  "surfaces",
];

/** Base instructions for the prompt-to-component model. */
export function buildSystemPrompt(settings: GeneratorSettings): string {
  const options = settings.options;
  const rules = [
    "- Write a single self-contained function component.",
    "- Do NOT include import/export statements or TypeScript type annotations.",
    "- Assume React and Tailwind are available globally.",
    "- Use Tailwind utility classes only (no inline style objects except dynamic values).",
    "- Add responsive classes (sm:, md:, lg:) where the design scales.",
    '- Add dark mode variants using the "dark:" prefix.',
    "- Add accessibility: semantic HTML, aria-* attributes, focus-visible styles, keyboard support.",
    "- Keep props plain (JS props with default values).",
  ];
  if (settings.framework === "nextjs") rules.unshift('- Start "source" with `"use client";`.');
  if (!options.includeComments) rules.push("- Keep the source free of explanatory comments.");
  if (options.includeComments) rules.push("- Use brief comments to explain non-obvious parts.");

  return [
    "You are an expert front-end engineer who builds production-ready UI components with React and Tailwind CSS.",
    "Respond with ONLY a single JSON code block (```json ... ```) — no prose, no extra text.",
    `The JSON object must have exactly these fields: "name" (PascalCase), "description" (one sentence), "category" (one of: ${ALLOWED_CATEGORIES.join(", ")}), "tags" (3-5 lowercase tags), "dependencies" (npm packages; "react" always, others only when truly required), "source" (the complete component source).${
      options.includeDocs
        ? ' When "includeDocs" is on also add "docs": a concise markdown usage guide covering props, examples, and accessibility notes.'
        : ""
    }`,
    "Rules for \"source\":",
    ...rules,
    `The target category is "${settings.category}". Respect the user's request and keep the component production-quality and complete.`,
  ].join("\n");
}

/** Builds the user message from template + raw prompt + option flags. */
export function buildUserPrompt(settings: GeneratorSettings): string {
  const template = getTemplate(settings.templateId);
  const spec = template.prompt.trim();
  const prompt = settings.prompt.trim();

  const parts: string[] = [];
  if (spec) parts.push(`Component spec: ${spec}`);
  if (prompt) parts.push(`Request: ${prompt}`);
  if (!spec && !prompt) parts.push("Request: A small, polished UI component.");

  const flags: string[] = [];
  if (settings.options.darkMode) flags.push("dark mode");
  if (settings.options.responsive) flags.push("responsive");
  if (settings.options.accessibility) flags.push("accessible");
  if (settings.options.includeDocs) flags.push("include docs");
  if (settings.options.includeComments) flags.push("include comments");
  if (flags.length) parts.push(`Requirements: ${flags.join(", ")}.`);

  parts.push("Respond with ONLY a single JSON code block.");
  return parts.join("\n\n");
}
