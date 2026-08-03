"use client";

import { useState } from "react";
import { Button, Spinner } from "@/components/ui";
import { formatTokens, estimateTokens } from "@/features/ai";
import type { GeneratedComponent } from "../types";
import { copyText, downloadRegistryJson, downloadTsx, downloadZip } from "../utils/exporters";
import { GeneratorMarkdown } from "./GeneratorMarkdown";
import { GeneratorPreview } from "./GeneratorPreview";

type Tab = "preview" | "code" | "docs";

export interface GeneratorResultViewProps {
  component: GeneratedComponent;
  favorite: boolean;
  darkMode: boolean;
  isSaving: boolean;
  saveMessage?: string;
  savedHref?: string;
  onToggleFavorite: () => void;
  onSaveDraft: () => void;
  onPublish: () => void;
}

/** Header, actions, and preview/code/docs tabs for a generated component. */
export function GeneratorResultView({
  component,
  favorite,
  darkMode,
  isSaving,
  saveMessage,
  savedHref,
  onToggleFavorite,
  onSaveDraft,
  onPublish,
}: GeneratorResultViewProps) {
  const [tab, setTab] = useState<Tab>("preview");
  const docs = component.docs;

  return (
    <div className="flex min-h-0 flex-col gap-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-lg font-semibold text-foreground">{component.name}</h2>
            {favorite ? (
              <Button variant="ghost" size="sm" onClick={onToggleFavorite} aria-label="Unfavorite">
                ★
              </Button>
            ) : (
              <Button variant="ghost" size="sm" onClick={onToggleFavorite} aria-label="Favorite">
                ☆
              </Button>
            )}
          </div>
          <p className="mt-0.5 text-sm text-muted-foreground">{component.description}</p>
          {component.tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {component.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border bg-muted/50 px-2 py-0.5 text-[11px] text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" onClick={onToggleFavorite}>
            {favorite ? "Unfavorite" : "Favorite"}
          </Button>
          <Button variant="outline" size="sm" onClick={() => void copyText(component.source)}>
            Copy code
          </Button>
          <Button variant="outline" size="sm" onClick={() => downloadTsx(component)}>
            Download .tsx
          </Button>
          <Button variant="outline" size="sm" onClick={() => downloadZip(component)}>
            Download ZIP
          </Button>
          <Button variant="outline" size="sm" onClick={() => downloadRegistryJson(component)}>
            registry.json
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Button size="sm" onClick={onSaveDraft} disabled={isSaving}>
          {isSaving ? <Spinner size="sm" /> : "Save draft"}
        </Button>
        <Button size="sm" variant="secondary" onClick={onPublish} disabled={isSaving}>
          Publish
        </Button>
        {saveMessage && (
          <span className="text-xs text-muted-foreground">
            {saveMessage}
            {savedHref && (
              <>
                {" — "}
                <a href={savedHref} className="text-primary underline">
                  view
                </a>
              </>
            )}
          </span>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-2">
        <div className="flex gap-1">
          {(["preview", "code", "docs"] as Tab[]).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setTab(item)}
              className={`rounded-md px-3 py-1 text-sm font-medium capitalize transition-colors ${
                tab === item
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              {item}
              {item === "docs" && !docs ? " —" : ""}
            </button>
          ))}
        </div>
        <span className="text-xs text-muted-foreground">
          {formatTokens(estimateTokens(component.source))} tokens
        </span>
      </div>

      {tab === "preview" && <GeneratorPreview component={component} darkMode={darkMode} />}
      {tab === "code" && (
        <pre className="max-h-[480px] overflow-auto rounded-xl border border-border bg-muted/40 p-4 font-mono text-[13px] leading-relaxed text-foreground">
          <code>{component.source}</code>
        </pre>
      )}
      {tab === "docs" &&
        (docs ? (
          <div className="rounded-xl border border-border bg-muted/20 p-4">
            <GeneratorMarkdown text={docs} />
          </div>
        ) : (
          <p className="rounded-xl border border-border bg-muted/20 p-4 text-sm text-muted-foreground">
            Docs were not requested for this generation. Enable the “Docs” option and regenerate to
            include a usage guide.
          </p>
        ))}
    </div>
  );
}
