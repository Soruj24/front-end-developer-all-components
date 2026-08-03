import type { IconName } from "../../ui/icons";

/** The built-in AI Assistant actions available in the playground. */
export type AssistantCommandId =
  | "chat"
  | "explain"
  | "refactor"
  | "generate-component"
  | "generate-variants"
  | "fix-errors"
  | "improve-accessibility"
  | "optimize-tailwind"
  | "create-docs"
  | "generate-tests"
  | "generate-storybook";

/** How a command's generated code can be written back into the project. */
export type ApplyMode = "none" | "replace" | "new-file" | "both";

export interface AssistantCommand {
  id: AssistantCommandId;
  label: string;
  description: string;
  icon: IconName;
  /** Placeholder text shown in the input while the command is selected. */
  placeholder: string;
  applyMode: ApplyMode;
  /** Default file name suggested when the result is applied as a new file. */
  suggestedName: string;
}

/** Snapshot of the playground state used to build command prompts. */
export interface AssistantContext {
  activeFile: string;
  activeSource: string;
  files: Array<{ name: string; source: string }>;
  problems: Array<{ severity: "error" | "warning" | "info"; message: string; file: string; line: number }>;
  buildStatus: string;
}

/** Extracted fenced code block from an assistant response. */
export interface CodeSnippet {
  language: string;
  code: string;
}
