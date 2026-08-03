"use client";

import { useAssistant } from "../hooks/useAssistant";
import { usePlayground } from "../../context";
import { Icon } from "../../ui/icons";
import { Spinner } from "../../ui/primitives";
import { AiCommandMenu } from "./AiCommandMenu";
import { AiMessages } from "./AiMessages";
import { AiApplyBar } from "./AiApplyBar";
import { AiInput } from "./AiInput";

/** Integrated AI Assistant panel — resizable, collapsible, streaming. */
export function AiAssistantPanel() {
  const { files, layout } = usePlayground();
  const assistant = useAssistant();

  return (
    <div className="flex h-full min-h-0 min-w-0 flex-col bg-[#1f1f23]">
      <header className="flex h-9 shrink-0 items-center gap-2 border-b border-[#2a2a2e] bg-[#252526] px-2">
        <Icon name="sparkles" width={14} height={14} className="text-[#2b7de9]" />
        <span className="flex-1 truncate text-[12px] font-semibold text-[#d4d4d8]">
          AI Assistant
        </span>
        {assistant.isStreaming && (
          <span className="flex items-center gap-1 text-[11px] text-[#8ab4ff]">
            <Spinner width={11} height={11} />
            Streaming
          </span>
        )}
        <button
          type="button"
          title="Clear conversation"
          onClick={assistant.clear}
          disabled={assistant.messages.length === 0}
          className="flex h-6 w-6 items-center justify-center rounded text-[#9ca3af] transition-colors hover:bg-[#37373d] hover:text-[#d4d4d8] disabled:opacity-40"
          aria-label="Clear conversation"
        >
          <Icon name="trash" width={13} height={13} />
        </button>
        <button
          type="button"
          title="Collapse panel (Ctrl+I)"
          onClick={layout.toggleAi}
          className="flex h-6 w-6 items-center justify-center rounded text-[#9ca3af] transition-colors hover:bg-[#37373d] hover:text-[#d4d4d8]"
          aria-label="Collapse AI panel"
        >
          <Icon name="chevronRight" width={14} height={14} className="-rotate-90" />
        </button>
      </header>

      <AiCommandMenu
        activeCommand={assistant.activeCommand}
        disabled={assistant.isStreaming}
        onRun={assistant.runCommand}
      />

      <AiMessages
        messages={assistant.messages}
        isStreaming={assistant.isStreaming}
        error={assistant.error}
      />

      <AiApplyBar
        commandId={assistant.activeCommand}
        mode={assistant.applyMode}
        snippet={assistant.primarySnippet}
        activeFile={files.activeName}
        disabled={assistant.isStreaming}
        onApplyReplace={assistant.applyToActiveFile}
        onApplyNewFile={assistant.applyAsNewFile}
        onCopy={assistant.copyPrimary}
      />

      <AiInput
        activeCommand={assistant.activeCommand}
        value={assistant.input}
        onChange={assistant.setInput}
        onSend={assistant.sendChat}
        onStop={assistant.stop}
        isStreaming={assistant.isStreaming}
        focusSignal={assistant.focusSignal}
      />
    </div>
  );
}
