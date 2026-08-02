import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";
import { blogTemplate, marketingTemplate } from "./shared";

export const promptBuilderFull: RegistryEntry = entry({
    id: "prompt-builder-full",
    title: "Full Prompt Builder",
    description:
      "A complete AI prompt builder — variables, chips, sections, live preview with syntax highlighting, validation, history, import/export, and keyboard shortcuts.",
    source: `import { PromptBuilder } from "@/components/ui";

const templates = [
${marketingTemplate},
${blogTemplate},
];

export default function PromptBuilderFull() {
  return (
    <div className="w-full max-w-4xl">
      <PromptBuilder templates={templates} maxLength={4000} />
    </div>
  );
}`,
  });
