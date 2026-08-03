"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/cn";
import type { PromptSection, PromptVariable } from "@/components/prompt-builder/templates";
import { ActionButton, Icon, ICON } from "./PromptBuilderToolbar";

interface PromptBuilderPreviewProps {
  sections: PromptSection[];
  variables: PromptVariable[];
  varById: Map<string, PromptVariable>;
  includeSectionTitles: boolean;
  totalChars: number;
  maxLength: number;
  charRatio: number;
  copied: boolean;
  onCopy: () => void;
  renderPreviewBody: (content: string) => ReactNode[];
}

export function PromptBuilderPreview({
  sections,
  includeSectionTitles,
  totalChars,
  maxLength,
  charRatio,
  copied,
  onCopy,
  renderPreviewBody,
}: PromptBuilderPreviewProps) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-4">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-sm font-semibold tracking-tight">Live Preview</h3>
        <ActionButton
          onClick={onCopy}
          disabled={totalChars === 0}
          label="Copy prompt (Ctrl + Enter)"
        >
          <Icon d={copied ? ICON.check : ICON.copy} className="h-3.5 w-3.5" />
          {copied ? "Copied" : "Copy"}
        </ActionButton>
      </div>

      <div className="rounded-lg border border-border bg-background p-4">
        {sections.length === 0 ? (
          <p className="py-6 text-center text-sm text-muted-foreground">
            Nothing to preview yet.
          </p>
        ) : (
          <div className="flex flex-col gap-4">
            {sections.map((section) => {
              const body = section.content.trim();
              if (!body && !includeSectionTitles) return null;
              return (
                <div key={section.id} className="flex flex-col gap-1.5">
                  {includeSectionTitles && (
                    <h4 className="text-sm font-semibold tracking-tight text-foreground">
                      {section.title}
                    </h4>
                  )}
                  {body ? (
                    <div className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
                      {renderPreviewBody(section.content)}
                    </div>
                  ) : (
                    <p className="text-sm italic text-muted-foreground/60">
                      Empty section
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="flex items-center gap-3">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
          <div
            className={cn(
              "h-full rounded-full transition-[width] duration-300",
              totalChars > maxLength
                ? "bg-danger"
                : charRatio > 0.8
                  ? "bg-warning"
                  : "bg-primary"
            )}
            style={{ width: `${charRatio * 100}%` }}
          />
        </div>
        <span
          className={cn(
            "font-mono text-xs tabular-nums",
            totalChars > maxLength ? "text-danger" : "text-muted-foreground"
          )}
        >
          {totalChars.toLocaleString()} / {maxLength.toLocaleString()} chars
        </span>
      </div>
    </div>
  );
}
