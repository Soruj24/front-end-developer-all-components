"use client";

import type { ApplyMode, AssistantCommandId, CodeSnippet } from "../types";
import { getAssistantCommand } from "../constants/commands";
import { Icon } from "../../ui/icons";

export interface AiApplyBarProps {
  commandId: AssistantCommandId;
  mode: ApplyMode;
  snippet: CodeSnippet | null;
  activeFile: string;
  disabled: boolean;
  onApplyReplace: () => void;
  onApplyNewFile: (name?: string) => void;
  onCopy: () => void;
}

/** Actions to write a generated snippet back into the project. */
export function AiApplyBar({
  commandId,
  mode,
  snippet,
  activeFile,
  disabled,
  onApplyReplace,
  onApplyNewFile,
  onCopy,
}: AiApplyBarProps) {
  if (!snippet || mode === "none" || disabled) return null;

  const command = getAssistantCommand(commandId);
  const replace = mode === "replace" || mode === "both";
  const newFile = mode === "new-file" || mode === "both";

  return (
    <div className="shrink-0 border-t border-[#2a2a2e] bg-[#1f1f23] px-2 py-1.5">
      <p className="mb-1 flex items-center gap-1 text-[10.5px] font-medium uppercase tracking-wide text-[#6a6a72]">
        <Icon name="sparkles" width={10} height={10} />
        Generated code
      </p>
      <div className="flex flex-wrap items-center gap-1">
        {replace && (
          <button
            type="button"
            onClick={onApplyReplace}
            title={`Replace ${activeFile} with the generated source`}
            className="flex h-6 items-center gap-1 rounded bg-[#2b7de9] px-2 text-[11px] font-medium text-white transition-colors hover:bg-[#3b8be9]"
          >
            <Icon name="refresh" width={11} height={11} />
            Apply to {activeFile}
          </button>
        )}
        {newFile && (
          <button
            type="button"
            onClick={() => onApplyNewFile()}
            title="Save as a new file in the project"
            className="flex h-6 items-center gap-1 rounded bg-[#2b7de9]/20 px-2 text-[11px] font-medium text-[#8ab4ff] transition-colors hover:bg-[#2b7de9]/30"
          >
            <Icon name="plus" width={11} height={11} />
            {command.suggestedName ? `New: ${command.suggestedName}` : "New file"}
          </button>
        )}
        <button
          type="button"
          onClick={onCopy}
          className="flex h-6 items-center gap-1 rounded border border-[#2a2a2e] px-2 text-[11px] text-[#9ca3af] transition-colors hover:bg-[#37373d] hover:text-[#d4d4d8]"
        >
          <Icon name="copy" width={11} height={11} />
          Copy
        </button>
      </div>
    </div>
  );
}
