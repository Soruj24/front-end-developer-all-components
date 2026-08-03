import type { AssistantCommandId, AssistantContext } from "../types";

const MAX_ACTIVE_CHARS = 9000;
const MAX_OTHER_FILE_CHARS = 1500;
const MAX_PROBLEMS = 12;

/** Renders a compact project index for the model. */
export function renderProjectIndex(ctx: AssistantContext): string {
  return ctx.files
    .map((file) => (file.name === ctx.activeFile ? `${file.name} (active)` : file.name))
    .join(", ");
}

/** Renders the active file source, truncated to a safe context budget. */
export function renderActiveFile(ctx: AssistantContext): string {
  const body = ctx.activeSource.slice(0, MAX_ACTIVE_CHARS);
  const truncated = body.length < ctx.activeSource.length ? "\n<!-- file truncated -->" : "";
  return `File: ${ctx.activeFile}\n\`\`\`${ext(ctx.activeFile)}\n${body}${truncated}\n\`\`\``;
}

/** Renders other files (names + truncated sources) for cross-file context. */
export function renderOtherFiles(ctx: AssistantContext): string {
  const others = ctx.files.filter((file) => file.name !== ctx.activeFile);
  if (others.length === 0) return "No other files.";
  return others
    .map((file) => {
      const body = file.source.slice(0, MAX_OTHER_FILE_CHARS);
      const truncated = body.length < file.source.length ? "\n<!-- truncated -->" : "";
      return `File: ${file.name}\n\`\`\`${ext(file.name)}\n${body}${truncated}\n\`\`\``;
    })
    .join("\n\n");
}

/** Renders current build/lint problems. */
export function renderProblems(ctx: AssistantContext): string {
  if (ctx.problems.length === 0) return "No known problems.";
  return ctx.problems
    .slice(0, MAX_PROBLEMS)
    .map((p) => `- [${p.severity}] ${p.file}:${p.line} — ${p.message}`)
    .join("\n");
}

/** Base system prompt for the embedded coding assistant. */
export function buildSystemPrompt(ctx: AssistantContext): string {
  return [
    "You are an expert front-end engineer embedded in a live React + Tailwind CSS component playground.",
    "You help the user write, explain, refactor, test, and document UI components.",
    `Current project files: ${renderProjectIndex(ctx)}.`,
    "Rules:",
    "- Be concise and actionable. Prefer short answers with code over prose.",
    "- When asked to produce code, respond with a single fenced code block (` ```tsx `) containing the full file.",
    "- Never assume extra packages exist; stick to React, Tailwind, and plain TypeScript.",
    "- Do not mention that you are an AI.",
  ].join("\n");
}

/** Builds the user message for a given command + raw input. */
export function buildCommandPrompt(
  id: AssistantCommandId,
  input: string,
  ctx: AssistantContext
): string {
  const detail = input.trim() ? `\n\nAdditional request:\n${input.trim()}` : "";
  const header = `ACTIVE FILE:\n${renderActiveFile(ctx)}`;
  const files = `\n\nPROJECT CONTEXT:\n${renderOtherFiles(ctx)}`;
  const problems = `\n\nCURRENT PROBLEMS:\n${renderProblems(ctx)}`;

  switch (id) {
    case "chat":
      return input.trim();
    case "explain":
      return `${header}${detail}\n\nExplain how this code works: its structure, key props, and how it composes with Tailwind classes.`;
    case "refactor":
      return `${header}${files}${detail}\n\nRefactor this file to be cleaner and more maintainable. Return the full rewritten file in one code block.`;
    case "generate-component":
      return `${files}${detail}\n\nGenerate a new React + Tailwind component following the project conventions. Return ONLY a single fenced code block with the full component file (no surrounding prose).`;
    case "generate-variants":
      return `${header}${files}${detail}\n\nGenerate useful visual variants of this component (sizes, tones, states). Return the full file in one code block, using the same props API where possible.`;
    case "fix-errors":
      return `${header}${problems}${detail}\n\nFix the reported errors and any obvious bugs. Return the full corrected file in one code block.`;
    case "improve-accessibility":
      return `${header}${detail}\n\nImprove accessibility: semantics, ARIA attributes, focus management, contrast, and keyboard support. Return the full file in one code block.`;
    case "optimize-tailwind":
      return `${header}${detail}\n\nOptimize the Tailwind class usage: remove duplicates/redundant utilities, merge conflicting classes, and prefer shorthand. Return the full file in one code block.`;
    case "create-docs":
      return `${header}${detail}\n\nWrite documentation for this component in markdown: overview, props table, usage examples, and accessibility notes.`;
    case "generate-tests":
      return `${header}${detail}\n\nGenerate unit tests for this component (rendering, props, interactions, and edge cases). Return ONLY a single fenced code block with the full test file.`;
    case "generate-storybook":
      return `${header}${detail}\n\nGenerate a Storybook CSF3 story file for this component covering default, variants, and common states. Return ONLY a single fenced code block with the full story file.`;
  }
}

function ext(name: string): string {
  const dot = name.lastIndexOf(".");
  return dot >= 0 ? name.slice(dot + 1) : "tsx";
}
