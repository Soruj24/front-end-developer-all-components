import type { AssistantCommand, AssistantCommandId } from "../types";

/** The curated command set surfaced in the AI Assistant panel. */
export const ASSISTANT_COMMANDS: AssistantCommand[] = [
  {
    id: "chat",
    label: "Chat",
    description: "Ask anything about the current project.",
    icon: "sparkles",
    placeholder: "Ask anything about your project…",
    applyMode: "none",
    suggestedName: "",
  },
  {
    id: "explain",
    label: "Explain Code",
    description: "Explain what the active file does.",
    icon: "info",
    placeholder: "Explain the active file…",
    applyMode: "none",
    suggestedName: "",
  },
  {
    id: "refactor",
    label: "Refactor",
    description: "Improve structure and readability of the active file.",
    icon: "refresh",
    placeholder: "Refactor the active file (describe the goal)…",
    applyMode: "replace",
    suggestedName: "",
  },
  {
    id: "generate-component",
    label: "Generate Component",
    description: "Create a brand-new React + Tailwind component.",
    icon: "plus",
    placeholder: "Describe the component to generate…",
    applyMode: "new-file",
    suggestedName: "NewComponent.tsx",
  },
  {
    id: "generate-variants",
    label: "Generate Variants",
    description: "Create variants of the active component.",
    icon: "grid",
    placeholder: "Which variants do you want?",
    applyMode: "both",
    suggestedName: "Variants.tsx",
  },
  {
    id: "fix-errors",
    label: "Fix Errors",
    description: "Fix current build and lint errors.",
    icon: "bug",
    placeholder: "Fix the reported errors in the active file…",
    applyMode: "replace",
    suggestedName: "",
  },
  {
    id: "improve-accessibility",
    label: "Improve Accessibility",
    description: "Improve ARIA, semantics, contrast and keyboard support.",
    icon: "eye",
    placeholder: "Improve accessibility of the active file…",
    applyMode: "replace",
    suggestedName: "",
  },
  {
    id: "optimize-tailwind",
    label: "Optimize Tailwind",
    description: "Simplify and reorder Tailwind class utilities.",
    icon: "zap",
    placeholder: "Optimize Tailwind classes in the active file…",
    applyMode: "replace",
    suggestedName: "",
  },
  {
    id: "create-docs",
    label: "Create Documentation",
    description: "Write markdown docs for the active component.",
    icon: "file",
    placeholder: "What should the docs cover?",
    applyMode: "new-file",
    suggestedName: "README.md",
  },
  {
    id: "generate-tests",
    label: "Generate Tests",
    description: "Write unit tests for the active component.",
    icon: "check",
    placeholder: "What behaviors should the tests cover?",
    applyMode: "new-file",
    suggestedName: ".test.tsx",
  },
  {
    id: "generate-storybook",
    label: "Generate Storybook",
    description: "Create a Storybook story for the active component.",
    icon: "bookmark",
    placeholder: "Which stories do you want?",
    applyMode: "new-file",
    suggestedName: ".stories.tsx",
  },
];

const BY_ID = new Map(ASSISTANT_COMMANDS.map((command) => [command.id, command]));

export function getAssistantCommand(id: AssistantCommandId): AssistantCommand {
  return BY_ID.get(id) ?? ASSISTANT_COMMANDS[0];
}
