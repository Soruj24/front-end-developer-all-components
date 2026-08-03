export { AiAssistantPanel } from "./components/AiAssistantPanel";
export { useAssistant, type UseAssistantResult } from "./hooks/useAssistant";
export { ASSISTANT_COMMANDS, getAssistantCommand } from "./constants/commands";
export type {
  AssistantCommand,
  AssistantCommandId,
  AssistantContext,
  ApplyMode,
  CodeSnippet,
} from "./types";
export { buildCommandPrompt, buildSystemPrompt } from "./prompts";
