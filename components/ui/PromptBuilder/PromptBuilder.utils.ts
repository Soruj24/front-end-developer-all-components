import type { PromptVariable } from "@/components/prompt-builder/templates";
import type { Token, PromptBuilderState } from "./PromptBuilder.types";
import { TOKEN_RE } from "./PromptBuilder.constants";

export function parseTokens(content: string): Token[] {
  const tokens: Token[] = [];
  TOKEN_RE.lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = TOKEN_RE.exec(content)) !== null) {
    tokens.push({
      full: match[0],
      id: match[1],
      start: match.index,
      end: match.index + match[0].length,
    });
  }
  return tokens;
}

export function substitute(content: string, variables: PromptVariable[]): string {
  const vars = new Map(variables.map((v) => [v.id, v]));
  return content.replace(TOKEN_RE, (full, id: string) => {
    const variable = vars.get(id);
    if (variable?.value) return variable.value;
    if (variable?.placeholder) return `[${variable.placeholder}]`;
    return full;
  });
}

export function buildPrompt(
  sections: PromptBuilderState["sections"],
  variables: PromptBuilderState["variables"],
  includeTitles: boolean
): string {
  return sections
    .map((section) => {
      const body = substitute(section.content, variables).trim();
      if (!body) return "";
      return includeTitles ? `## ${section.title}\n\n${body}` : body;
    })
    .filter(Boolean)
    .join("\n\n");
}

export function isSection(value: unknown): value is import("@/components/prompt-builder/templates").PromptSection {
  if (!value || typeof value !== "object") return false;
  const s = value as Record<string, unknown>;
  return (
    typeof s.id === "string" &&
    typeof s.title === "string" &&
    typeof s.content === "string"
  );
}

export function isVariable(value: unknown): value is PromptVariable {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.id === "string" &&
    typeof v.label === "string" &&
    typeof v.value === "string"
  );
}

export function isState(value: unknown): value is PromptBuilderState {
  if (!value || typeof value !== "object") return false;
  const s = value as Record<string, unknown>;
  return (
    typeof s.templateId === "string" &&
    Array.isArray(s.sections) &&
    s.sections.every(isSection) &&
    Array.isArray(s.variables) &&
    s.variables.every(isVariable)
  );
}

export function timeAgo(at: number): string {
  const seconds = Math.max(1, Math.floor((Date.now() - at) / 1000));
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h ago`;
}
