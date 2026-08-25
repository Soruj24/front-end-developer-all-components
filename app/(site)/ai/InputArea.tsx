"use client";

import type { ChangeEvent, DragEvent, KeyboardEvent, RefObject } from "react";
import { CodeBlock } from "@/components/markdown";
import { PaperclipIcon, ImageIcon, MicIcon } from "./icons";
import { InlineSelect } from "@/components/ui/InlineSelect";
import { tones } from "./data";
import type { Tone } from "./data";

export function InputArea({
  contextTokens,
  selectedTone,
  onToneChange,
  systemPrompt,
  onSystemPromptChange,
  input,
  onInputChange,
  onKeyDown,
  dragOver,
  onDragOver,
  onDragLeave,
  onDrop,
  fileInputRef,
  imageInputRef,
  onImageUpload,
  isRecording,
  onToggleRecording,
  onSend,
  canSend,
  temperature,
  onTemperatureChange,
  maxTokens,
  onMaxTokensChange,
  codeInput,
  onCodeInputChange,
  codeLanguage,
  onCodeLanguageChange,
  onGenerateCode,
  generatedCode,
}: {
  contextTokens: number;
  selectedTone: Tone;
  onToneChange: (tone: Tone) => void;
  systemPrompt: string;
  onSystemPromptChange: (value: string) => void;
  input: string;
  onInputChange: (value: string) => void;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  dragOver: boolean;
  onDragOver: (e: DragEvent<HTMLDivElement>) => void;
  onDragLeave: () => void;
  onDrop: (e: DragEvent<HTMLDivElement>) => void;
  fileInputRef: RefObject<HTMLInputElement | null>;
  imageInputRef: RefObject<HTMLInputElement | null>;
  onImageUpload: (e: ChangeEvent<HTMLInputElement>) => void;
  isRecording: boolean;
  onToggleRecording: () => void;
  onSend: () => void;
  canSend: boolean;
  temperature: number;
  onTemperatureChange: (value: number) => void;
  maxTokens: number;
  onMaxTokensChange: (value: number) => void;
  codeInput: string;
  onCodeInputChange: (value: string) => void;
  codeLanguage: string;
  onCodeLanguageChange: (value: string) => void;
  onGenerateCode: () => void;
  generatedCode: string;
}) {
  return (
    <div className="border-t border-border px-4 py-4 dark:border-border">
      <div className="mx-auto max-w-3xl space-y-3">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>{contextTokens.toLocaleString()} / 8,192 tokens</span>
            <div className="h-1.5 w-20 overflow-hidden rounded-full bg-muted">
              <div
                className={`h-full rounded-full transition-all ${
                  contextTokens > 7000 ? "bg-red-500" : contextTokens > 5000 ? "bg-amber-500" : "bg-blue-500"
                }`}
                style={{ width: `${(contextTokens / 8192) * 100}%` }}
              />
            </div>
          </div>

          <div className="flex gap-1">
            {tones.map((t) => (
              <button
                key={t}
                onClick={() => onToneChange(t)}
                className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
                  selectedTone === t
                    ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400"
                    : "bg-muted text-muted-foreground hover:bg-muted dark:text-muted-foreground/70 dark:hover:bg-muted"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <textarea
          value={systemPrompt}
          onChange={(e) => onSystemPromptChange(e.target.value)}
          placeholder="System prompt..."
          rows={1}
          className="w-full resize-none rounded-lg border border-border bg-muted/40 px-3 py-1.5 text-xs text-muted-foreground outline-none transition-colors focus:border-blue-400 dark:border-border dark:bg-muted/50 dark:text-muted-foreground/70"
        />

        <div className="flex gap-3">
          <div className="relative flex-1">
            <div
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              className={`absolute inset-0 z-10 flex items-center justify-center rounded-xl border-2 border-dashed transition-all ${
                dragOver
                  ? "border-blue-400 bg-blue-50 dark:border-blue-500 dark:bg-blue-950/20"
                  : "border-transparent"
              }`}
            >
              {dragOver && <span className="text-sm font-medium text-blue-500">Drop files here</span>}
            </div>
            <input
              type="text"
              value={input}
              onChange={(e) => onInputChange(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Type your message..."
              className="w-full rounded-xl border border-border bg-muted/40 px-5 py-3 pl-4 pr-28 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-border dark:bg-muted dark:text-zinc-100 dark:placeholder-zinc-500"
            />
            <div className="absolute bottom-2 right-2 flex items-center gap-1">
              <button onClick={() => fileInputRef.current?.click()} className="rounded-lg p-1.5 text-muted-foreground/70 hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted dark:hover:text-zinc-300" title="Upload file">
                <PaperclipIcon className="h-4 w-4" />
              </button>
              <input ref={fileInputRef} type="file" className="hidden" onChange={() => {}} />

              <button onClick={() => imageInputRef.current?.click()} className="rounded-lg p-1.5 text-muted-foreground/70 hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted dark:hover:text-zinc-300" title="Upload image for analysis">
                <ImageIcon className="h-4 w-4" />
              </button>
              <input ref={imageInputRef} type="file" accept="image/*" className="hidden" onChange={onImageUpload} />

              <button
                onClick={onToggleRecording}
                className={`rounded-lg p-1.5 transition-colors ${
                  isRecording
                    ? "bg-red-100 text-red-500 dark:bg-red-900/30"
                    : "text-muted-foreground/70 hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted dark:hover:text-zinc-300"
                }`}
                title={isRecording ? "Stop recording" : "Voice input"}
              >
                {isRecording ? (
                  <span className="relative flex h-4 w-4 items-center justify-center">
                    <span className="absolute h-4 w-4 animate-[pulse-ring_1.5s_ease-out_infinite] rounded-full bg-red-400 opacity-50" />
                    <MicIcon className="relative h-4 w-4" />
                  </span>
                ) : (
                  <MicIcon className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
          <button
            onClick={onSend}
            disabled={!canSend}
            className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Send
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-3">
            <label className="text-xs font-medium text-muted-foreground">Temp: {temperature.toFixed(1)}</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={temperature}
              onChange={(e) => onTemperatureChange(parseFloat(e.target.value))}
              className="h-1.5 w-24 cursor-pointer appearance-none rounded-full bg-muted accent-blue-500 dark:bg-muted"
            />
          </div>
          <div className="flex items-center gap-3">
            <label className="text-xs font-medium text-muted-foreground">Max tokens: {maxTokens}</label>
            <input
              type="range"
              min="100"
              max="4096"
              step="100"
              value={maxTokens}
              onChange={(e) => onMaxTokensChange(parseInt(e.target.value))}
              className="h-1.5 w-24 cursor-pointer appearance-none rounded-full bg-muted accent-blue-500 dark:bg-muted"
            />
          </div>
        </div>

        <details className="group">
          <summary className="cursor-pointer text-xs font-medium text-muted-foreground hover:text-muted-foreground dark:hover:text-zinc-300">Code Generator</summary>
          <div className="mt-2 space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                value={codeInput}
                onChange={(e) => onCodeInputChange(e.target.value)}
                placeholder="Describe the code you need..."
                className="flex-1 rounded-lg border border-border bg-muted/40 px-4 py-2 text-sm outline-none focus:border-blue-500 dark:border-border dark:bg-muted dark:text-zinc-100"
              />
              <InlineSelect
                options={[
                  { value: "JavaScript", label: "JavaScript" },
                  { value: "TypeScript", label: "TypeScript" },
                  { value: "Python", label: "Python" },
                  { value: "SQL", label: "SQL" },
                  { value: "CSS", label: "CSS" },
                ]}
                value={codeLanguage}
                onChange={(val) => onCodeLanguageChange(val)}
                size="sm"
              />
              <button onClick={onGenerateCode} className="rounded-lg bg-emerald-600 px-4 py-2 text-xs font-medium text-white hover:bg-emerald-700">
                Generate
              </button>
            </div>
            {generatedCode && <CodeBlock code={generatedCode} language={codeLanguage} />}
          </div>
        </details>
      </div>
    </div>
  );
}
