"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { cn } from "@/lib/cn";
import { PlaygroundToolbar } from "./PlaygroundToolbar";

interface PlaygroundModalProps {
  open: boolean;
  onClose: () => void;
  componentSlug: string;
  initialCode: string;
}

type TabId = "code" | "preview";

export function PlaygroundModal({
  open,
  onClose,
  componentSlug,
  initialCode,
}: PlaygroundModalProps) {
  const [activeTab, setActiveTab] = useState<TabId>("code");
  const [code, setCode] = useState(initialCode);
  const [history, setHistory] = useState<string[]>([initialCode]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setCode(initialCode);
    setHistory([initialCode]);
    setHistoryIndex(0);
  }, [initialCode]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  useEffect(() => {
    if (open && activeTab === "code") textareaRef.current?.focus();
  }, [open, activeTab]);

  const pushHistory = useCallback(
    (newCode: string) => {
      const next = history.slice(0, historyIndex + 1);
      next.push(newCode);
      setHistory(next);
      setHistoryIndex(next.length - 1);
    },
    [history, historyIndex]
  );

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex((i) => i - 1);
      setCode(history[historyIndex - 1]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex((i) => i + 1);
      setCode(history[historyIndex + 1]);
    }
  };

  const handleReset = () => {
    setCode(initialCode);
    setHistory([initialCode]);
    setHistoryIndex(0);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch { /* ignore */ }
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${componentSlug}.tsx`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCodeChange = (value: string) => {
    setCode(value);
    pushHistory(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "z") {
      e.preventDefault();
      e.shiftKey ? handleRedo() : handleUndo();
    }
    if (e.key === "Tab") {
      e.preventDefault();
      const ta = textareaRef.current;
      if (!ta) return;
      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      const next = code.slice(0, start) + "  " + code.slice(end);
      setCode(next);
      pushHistory(next);
      requestAnimationFrame(() => {
        ta.selectionStart = ta.selectionEnd = start + 2;
      });
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col bg-background/95 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Component Playground"
      onKeyDown={(e) => { if (e.key === "Escape") onClose(); }}
    >
      <PlaygroundToolbar
        componentSlug={componentSlug}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        canUndo={historyIndex > 0}
        canRedo={historyIndex < history.length - 1}
        onUndo={handleUndo}
        onRedo={handleRedo}
        onReset={handleReset}
        copied={copied}
        onCopy={handleCopy}
        onDownload={handleDownload}
        onClose={onClose}
      />

      <div className="min-h-0 flex-1 overflow-auto">
        {activeTab === "code" ? (
          <div className="relative flex h-full min-h-[500px] flex-col">
            <div className="absolute inset-0 overflow-auto">
              <pre className="flex p-4 font-mono text-[13px] leading-relaxed [tab-size:2]">
                <span className="mr-4 select-none text-right text-muted-foreground/30" aria-hidden="true">
                  {code.split("\n").map((_, i) => (
                    <div key={i}>{i + 1}</div>
                  ))}
                </span>
                <textarea
                  ref={textareaRef}
                  value={code}
                  onChange={(e) => handleCodeChange(e.target.value)}
                  onKeyDown={handleKeyDown}
                  spellCheck={false}
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  className="min-h-full flex-1 resize-none bg-transparent text-foreground outline-none"
                  aria-label="Component source code"
                />
              </pre>
            </div>
          </div>
        ) : (
          <div className="flex min-h-[500px] items-center justify-center p-6">
            <div className="w-full max-w-3xl rounded-xl border border-border bg-background p-8 shadow-card">
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted text-2xl">
                  {"</>"}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Live Preview</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Copy the code and paste it into your project to see the live component.
                    The preview section above shows the rendered component in real-time.
                  </p>
                </div>
                <div className="mt-2 flex min-h-32 w-full items-center justify-center rounded-lg border border-dashed border-border bg-muted/30 p-4">
                  <pre className="whitespace-pre-wrap text-left font-mono text-xs text-foreground/70">
                    {code}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
