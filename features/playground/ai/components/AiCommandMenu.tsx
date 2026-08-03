"use client";

import { ASSISTANT_COMMANDS } from "../constants/commands";
import type { AssistantCommandId } from "../types";
import { Icon } from "../../ui/icons";

export interface AiCommandMenuProps {
  activeCommand: AssistantCommandId;
  disabled: boolean;
  onRun: (id: AssistantCommandId) => void;
}

/** Horizontally scrollable quick-action chips for every assistant command. */
export function AiCommandMenu({ activeCommand, disabled, onRun }: AiCommandMenuProps) {
  return (
    <div
      className="flex shrink-0 items-center gap-1 overflow-x-auto border-b border-[#2a2a2e] bg-[#1f1f23] px-2 py-1.5 [scrollbar-width:thin]"
      aria-label="AI commands"
    >
      {ASSISTANT_COMMANDS.map((command) => {
        const isActive = command.id === activeCommand;
        return (
          <button
            key={command.id}
            type="button"
            title={command.description}
            disabled={disabled}
            onClick={() => onRun(command.id)}
            className={`flex h-6 shrink-0 items-center gap-1 rounded px-2 text-[11px] transition-colors disabled:opacity-40 ${
              isActive
                ? "bg-[#2b7de9] text-white"
                : "border border-[#2a2a2e] bg-[#252529] text-[#9ca3af] hover:border-[#2b7de9]/50 hover:text-[#d4d4d8]"
            }`}
          >
            <Icon name={command.icon} width={11} height={11} />
            {command.label}
          </button>
        );
      })}
    </div>
  );
}
