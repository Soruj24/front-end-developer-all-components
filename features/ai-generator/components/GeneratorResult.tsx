"use client";

import { useState } from "react";
import { Spinner } from "@/components/ui";
import type { GeneratedComponent, GenStatus } from "../types";
import { GeneratorMarkdown } from "./GeneratorMarkdown";
import { GeneratorResultView } from "./GeneratorResultView";

export interface GeneratorResultProps {
  status: GenStatus;
  error?: string;
  raw: string;
  component: GeneratedComponent | null;
  favorite: boolean;
  darkMode: boolean;
  isSaving: boolean;
  saveMessage?: string;
  savedHref?: string;
  onToggleFavorite: () => void;
  onSaveDraft: () => void;
  onPublish: () => void;
}

export function GeneratorResult({
  status,
  error,
  raw,
  component,
  favorite,
  darkMode,
  isSaving,
  saveMessage,
  savedHref,
  onToggleFavorite,
  onSaveDraft,
  onPublish,
}: GeneratorResultProps) {
  const [showTranscript, setShowTranscript] = useState(false);
  const streaming = status === "streaming";

  if (status === "idle" && !component) {
    return (
      <EmptyState
        title="Describe a component"
        body="Write a prompt (or pick a template), choose a provider and model, then generate. Responses stream in live and render in the preview."
      />
    );
  }

  return (
    <div className="flex min-h-0 flex-col gap-4">
      {streaming && (
        <div className="flex items-center gap-2 rounded-xl border border-border bg-muted/30 px-4 py-3 text-sm text-muted-foreground">
          <Spinner size="sm" />
          Generating component…
        </div>
      )}

      {status === "error" && (
        <div className="rounded-xl border border-danger/40 bg-danger/10 px-4 py-3 text-sm text-danger">
          {error ?? "Generation failed."}
        </div>
      )}

      {status === "done" && !component && !streaming && (
        <div className="rounded-xl border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm text-amber-600 dark:text-amber-400">
          The model response could not be parsed as a component. Check the raw transcript below
          and try regenerating.
        </div>
      )}

      {component && !streaming && (
        <GeneratorResultView
          component={component}
          favorite={favorite}
          darkMode={darkMode}
          isSaving={isSaving}
          saveMessage={saveMessage}
          savedHref={savedHref}
          onToggleFavorite={onToggleFavorite}
          onSaveDraft={onSaveDraft}
          onPublish={onPublish}
        />
      )}

      {raw && (
        <div className="rounded-xl border border-border">
          <button
            type="button"
            onClick={() => setShowTranscript((value) => !value)}
            className="flex w-full items-center justify-between px-4 py-2 text-xs font-medium text-muted-foreground hover:text-foreground"
          >
            <span>Raw transcript</span>
            <span>{showTranscript ? "Hide" : "Show"}</span>
          </button>
          {showTranscript && (
            <div className="max-h-56 overflow-auto border-t border-border px-4 py-3">
              <GeneratorMarkdown text={raw} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className="flex h-full min-h-[240px] items-center justify-center rounded-xl border border-dashed border-border p-6 text-center">
      <div className="max-w-sm">
        <p className="text-base font-semibold text-foreground">{title}</p>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
      </div>
    </div>
  );
}
