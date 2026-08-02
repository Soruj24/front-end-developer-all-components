import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const promptBuilderEmbedded: RegistryEntry = entry({
    id: "prompt-builder-embedded",
    title: "Embedded Usage",
    description:
      "Drop the builder into any card or form. Pass a single template, tighten the max length, and persist state locally with a storage key.",
    source: `import { PromptBuilder } from "@/components/ui";

const reviewTemplate = [
  {
    id: "code-review",
    name: "Code Review",
    description: "Get thorough, actionable reviews of a code snippet.",
    sections: [
      { id: "system", title: "System", content: "You are a senior software engineer performing a thorough, kind, and actionable code review." },
      { id: "code", title: "Code", content: "Here is the code to review:\\n\\n{{code}}" },
      { id: "instructions", title: "Instructions", content: "Review for correctness, \\"{{focus}}\\", code style, and edge cases." },
      { id: "output", title: "Output Format", content: "For each issue provide severity, why it matters, and a suggested fix." },
    ],
    variables: [
      { id: "code", label: "Code", value: "", placeholder: "Paste the code to review", required: true },
      { id: "language", label: "Language", value: "", placeholder: "e.g., TypeScript", required: true },
      { id: "focus", label: "Focus areas", value: "", placeholder: "e.g., performance, readability, security" },
    ],
  },
];

export default function PromptBuilderEmbedded() {
  return (
    <div className="w-full max-w-3xl rounded-2xl border border-border bg-surface p-4 sm:p-6">
      <PromptBuilder
        templates={reviewTemplate}
        maxLength={2000}
        storageKey="embedded-prompt-builder"
      />
    </div>
  );
}`,
  });
