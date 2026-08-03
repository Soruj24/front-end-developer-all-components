import type { PromptSection, PromptVariable } from "@/components/prompt-builder/templates";

export interface PromptBuilderState {
  templateId: string;
  sections: PromptSection[];
  variables: PromptVariable[];
}

export interface PromptBuilderProps {
  templates?: import("@/components/prompt-builder/templates").PromptTemplate[];
  initialTemplateId?: string;
  maxLength?: number;
  storageKey?: string;
  includeSectionTitles?: boolean;
  className?: string;
  onCopy?: (prompt: string) => void;
  onStateChange?: (state: PromptBuilderState) => void;
}

export interface Token {
  full: string;
  id: string;
  start: number;
  end: number;
}

export interface HistoryEntry {
  state: PromptBuilderState;
  at: number;
  reason: string;
}
