"use client";

import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
} from "react";
import { cn } from "@/lib/cn";
import {
  promptBuilderTemplates,
  type PromptSection,
  type PromptTemplate,
  type PromptVariable,
} from "@/components/prompt-builder/templates";

/* ------------------------------------------------------------------ */
/* Types & helpers                                                     */
/* ------------------------------------------------------------------ */

export interface PromptBuilderState {
  templateId: string;
  sections: PromptSection[];
  variables: PromptVariable[];
}

export interface PromptBuilderProps {
  templates?: PromptTemplate[];
  initialTemplateId?: string;
  maxLength?: number;
  storageKey?: string;
  includeSectionTitles?: boolean;
  className?: string;
  onCopy?: (prompt: string) => void;
  onStateChange?: (state: PromptBuilderState) => void;
}

const TOKEN_RE = /\{\{\s*([\w.-]+)\s*\}\}/g;
const MAX_HISTORY = 40;
const DEFAULT_MAX_LENGTH = 4000;
const editorBase =
  "min-h-[180px] w-full resize-none overflow-hidden bg-transparent px-3.5 py-3 font-mono text-[13px] leading-[1.6] whitespace-pre-wrap break-words outline-none";

const SHORTCUTS: Array<{ keys: string; label: string }> = [
  { keys: "Ctrl / ⌘ + Enter", label: "Copy prompt" },
  { keys: "Ctrl / ⌘ + Z", label: "Undo" },
  { keys: "Ctrl / ⌘ + Shift + Z", label: "Redo" },
  { keys: "Ctrl / ⌘ + B", label: "Bold  **text**" },
  { keys: "Ctrl / ⌘ + I", label: "Italic  *text*" },
  { keys: "Ctrl / ⌘ + Shift + B", label: "Bullet list" },
  { keys: "Ctrl / ⌘ + K", label: "Toggle shortcuts" },
];

interface Token {
  full: string;
  id: string;
  start: number;
  end: number;
}

interface HistoryEntry {
  state: PromptBuilderState;
  at: number;
  reason: string;
}

function parseTokens(content: string): Token[] {
  const tokens: Token[] = [];
  TOKEN_RE.lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = TOKEN_RE.exec(content)) !== null) {
    tokens.push({
      full: match[0],
      id: match[1],
      start: match.index,
      end: match.index + match[0].length,
    });
  }
  return tokens;
}

function substitute(content: string, variables: PromptVariable[]): string {
  const vars = new Map(variables.map((v) => [v.id, v]));
  return content.replace(TOKEN_RE, (full, id: string) => {
    const variable = vars.get(id);
    if (variable?.value) return variable.value;
    if (variable?.placeholder) return `[${variable.placeholder}]`;
    return full;
  });
}

function buildPrompt(
  sections: PromptSection[],
  variables: PromptVariable[],
  includeTitles: boolean
): string {
  return sections
    .map((section) => {
      const body = substitute(section.content, variables).trim();
      if (!body) return "";
      return includeTitles ? `## ${section.title}\n\n${body}` : body;
    })
    .filter(Boolean)
    .join("\n\n");
}

function isSection(value: unknown): value is PromptSection {
  if (!value || typeof value !== "object") return false;
  const s = value as Record<string, unknown>;
  return (
    typeof s.id === "string" &&
    typeof s.title === "string" &&
    typeof s.content === "string"
  );
}

function isVariable(value: unknown): value is PromptVariable {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.id === "string" &&
    typeof v.label === "string" &&
    typeof v.value === "string"
  );
}

function isState(value: unknown): value is PromptBuilderState {
  if (!value || typeof value !== "object") return false;
  const s = value as Record<string, unknown>;
  return (
    typeof s.templateId === "string" &&
    Array.isArray(s.sections) &&
    s.sections.every(isSection) &&
    Array.isArray(s.variables) &&
    s.variables.every(isVariable)
  );
}

function timeAgo(at: number): string {
  const seconds = Math.max(1, Math.floor((Date.now() - at) / 1000));
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h ago`;
}

/* ------------------------------------------------------------------ */
/* Small UI atoms                                                      */
/* ------------------------------------------------------------------ */

function ToolbarButton({
  onClick,
  label,
  active,
  disabled,
  children,
}: {
  onClick: () => void;
  label: string;
  active?: boolean;
  disabled?: boolean;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      aria-label={label}
      aria-pressed={active}
      disabled={disabled}
      className={cn(
        "inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-40",
        active &&
          "border-primary/40 bg-primary-soft text-primary hover:bg-primary-soft hover:text-primary"
      )}
    >
      {children}
    </button>
  );
}

function ActionButton({
  onClick,
  label,
  variant,
  disabled,
  children,
}: {
  onClick: () => void;
  label: string;
  variant?: "primary" | "secondary";
  disabled?: boolean;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      aria-label={label}
      disabled={disabled}
      className={cn(
        "inline-flex h-8 items-center gap-1.5 rounded-lg px-3 text-xs font-medium transition-colors disabled:pointer-events-none disabled:opacity-40",
        variant === "primary"
          ? "bg-primary text-primary-foreground hover:bg-primary/90"
          : "border border-border bg-background text-foreground hover:bg-muted"
      )}
    >
      {children}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Icons                                                               */
/* ------------------------------------------------------------------ */

function Icon({ d, className }: { d: string; className?: string }) {
  return (
    <svg
      className={className ?? "h-4 w-4"}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
}

const ICON = {
  copy: "M8 5H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1M16 3h2a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-2M8 5h8M8 5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2",
  check: "M5 13l4 4L19 7",
  undo: "M9 14L4 9l5-5M4 9h10.5a5.5 5.5 0 1 1 0 11H11",
  redo: "M15 14l5-5-5-5M20 9H9.5a5.5 5.5 0 1 0 0 11H13",
  clock: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2",
  download: "M12 3v12m0 0l-4-4m4 4l4-4M4 21h16",
  upload: "M12 21V9m0 0l-4 4m4-4l4 4M4 3h16",
  reset: "M3 12a9 9 0 1 0 2.64-6.36L3 8M3 3v5h5",
  help: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01",
  plus: "M12 5v14M5 12h14",
  trash: "M19 7l-.867 12.142A2 2 0 0 1 16.138 21H7.862a2 2 0 0 1-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v3M4 7h16",
  chevronUp: "M18 15l-6-6-6 6",
  chevronDown: "M6 9l6 6 6-6",
  sparkles:
    "M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4z",
};

/* ------------------------------------------------------------------ */
/* PromptBuilder                                                       */
/* ------------------------------------------------------------------ */

export function PromptBuilder({
  templates = promptBuilderTemplates,
  initialTemplateId,
  maxLength = DEFAULT_MAX_LENGTH,
  storageKey,
  includeSectionTitles = true,
  className,
  onCopy,
  onStateChange,
}: PromptBuilderProps) {
  const createInitial = (): PromptBuilderState => {
    const template =
      templates.find((t) => t.id === initialTemplateId) ?? templates[0];
    return {
      templateId: template?.id ?? "",
      sections: template?.sections.map((s) => ({ ...s })) ?? [],
      variables: template?.variables.map((v) => ({ ...v })) ?? [],
    };
  };

  const [state, setState] = useState<PromptBuilderState>(() => {
    if (storageKey && typeof window !== "undefined") {
      try {
        const raw = window.localStorage.getItem(storageKey);
        if (raw) {
          const parsed: unknown = JSON.parse(raw);
          if (isState(parsed)) return parsed;
        }
      } catch {
        return createInitial();
      }
    }
    return createInitial();
  });
  const stateRef = useRef(state);

  const [activeSectionId, setActiveSectionId] = useState<string>(
    () => state.sections[0]?.id ?? ""
  );
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [future, setFuture] = useState<HistoryEntry[]>([]);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);

  const idCounter = useRef(0);
  const nextId = (prefix: string) => `${prefix}-${++idCounter.current}`;

  const taRefs = useRef<Record<string, HTMLTextAreaElement | null>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const historyPanelRef = useRef<HTMLDivElement>(null);
  const helpPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!storageKey) return;
    const timer = setTimeout(() => {
      try {
        window.localStorage.setItem(storageKey, JSON.stringify(state));
      } catch {
        // storage may be unavailable; ignore
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [state, storageKey]);

  useEffect(() => {
    onStateChange?.(state);
  }, [state, onStateChange]);

  useEffect(() => {
    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      if (historyPanelRef.current && !historyPanelRef.current.contains(target)) {
        setHistoryOpen(false);
      }
      if (helpPanelRef.current && !helpPanelRef.current.contains(target)) {
        setHelpOpen(false);
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
    };
  }, []);

  const activeSection =
    state.sections.find((s) => s.id === activeSectionId) ?? state.sections[0];
  const activeSectionContent = activeSection?.content ?? "";
  const activeSectionIndex = activeSection
    ? state.sections.findIndex((s) => s.id === activeSection.id)
    : -1;

  const template = templates.find((t) => t.id === state.templateId);

  const varById = useMemo(
    () => new Map(state.variables.map((v) => [v.id, v])),
    [state.variables]
  );

  const validation = useMemo(() => {
    const missingRequired = state.variables.filter(
      (v) => v.required && !v.value.trim()
    );
    const unknownTokens: string[] = [];
    const seen = new Set<string>();
    for (const section of state.sections) {
      for (const token of parseTokens(section.content)) {
        if (!varById.has(token.id) && !seen.has(token.id)) {
          seen.add(token.id);
          unknownTokens.push(token.id);
        }
      }
    }
    return { missingRequired, unknownTokens };
  }, [state.sections, state.variables, varById]);

  const totalChars = useMemo(
    () => buildPrompt(state.sections, state.variables, includeSectionTitles).length,
    [state.sections, state.variables, includeSectionTitles]
  );
  const charRatio = maxLength > 0 ? Math.min(1, totalChars / maxLength) : 0;
  const isValid =
    validation.missingRequired.length === 0 &&
    validation.unknownTokens.length === 0;

  const statusText = isValid
    ? totalChars > 0
      ? "Ready to copy"
      : "Empty prompt"
    : validation.missingRequired.length > 0
      ? `${validation.missingRequired.length} variable${
          validation.missingRequired.length === 1 ? "" : "s"
        } need${
          validation.missingRequired.length === 1 ? "s" : ""
        } a value`
      : `${validation.unknownTokens.length} unknown variable${
          validation.unknownTokens.length === 1 ? "" : "s"
        }`;

  const applyState = (next: PromptBuilderState) => {
    stateRef.current = next;
    setState(next);
    setActiveSectionId((prev) =>
      next.sections.some((s) => s.id === prev)
        ? prev
        : next.sections[0]?.id ?? ""
    );
  };

  const update = (
    updater: (prev: PromptBuilderState) => PromptBuilderState,
    reason: string
  ) => {
    const current = stateRef.current;
    const next = updater(current);
    if (next === current) return;
    setHistory((prev) => {
      const entries = [...prev, { state: current, at: Date.now(), reason }];
      return entries.length > MAX_HISTORY
        ? entries.slice(entries.length - MAX_HISTORY)
        : entries;
    });
    setFuture([]);
    stateRef.current = next;
    setState(next);
  };

  const undo = () => {
    if (history.length === 0) return;
    const last = history[history.length - 1];
    const current = stateRef.current;
    setFuture((prev) => [...prev, { state: current, at: Date.now(), reason: "Undo" }]);
    setHistory((prev) => prev.slice(0, -1));
    applyState(last.state);
  };

  const redo = () => {
    if (future.length === 0) return;
    const next = future[future.length - 1];
    const current = stateRef.current;
    setHistory((prev) => [...prev, { state: current, at: Date.now(), reason: "Redo" }]);
    setFuture((prev) => prev.slice(0, -1));
    applyState(next.state);
  };

  const jumpToHistory = (index: number) => {
    const entry = history[index];
    if (!entry) return;
    setFuture([]);
    setHistory((prev) => prev.slice(0, index + 1));
    applyState(entry.state);
    setHistoryOpen(false);
  };

  const resizeActive = () => {
    if (!activeSection) return;
    const ta = taRefs.current[activeSection.id];
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = `${ta.scrollHeight}px`;
  };

  useLayoutEffect(() => {
    if (!activeSection) return;
    const ta = taRefs.current[activeSection.id];
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = `${ta.scrollHeight}px`;
  }, [activeSection, activeSectionContent, state.sections]);

  const updateSection = (id: string, patch: Partial<PromptSection>) => {
    update(
      (s) => ({
        ...s,
        sections: s.sections.map((sec) =>
          sec.id === id ? { ...sec, ...patch } : sec
        ),
      }),
      "Edited section"
    );
  };

  const addSection = () => {
    const newId = nextId("section");
    update(
      (s) => ({
        ...s,
        sections: [
          ...s.sections,
          { id: newId, title: "New Section", content: "" },
        ],
      }),
      "Added section"
    );
    setActiveSectionId(newId);
  };

  const removeSection = (id: string) => {
    update(
      (s) => ({ ...s, sections: s.sections.filter((sec) => sec.id !== id) }),
      "Removed section"
    );
    setActiveSectionId((prev) => {
      if (prev !== id) return prev;
      const idx = stateRef.current.sections.findIndex((sec) => sec.id === id);
      const next =
        stateRef.current.sections[idx - 1] ?? stateRef.current.sections[idx + 1];
      return next?.id ?? "";
    });
  };

  const moveSection = (id: string, dir: -1 | 1) => {
    update(
      (s) => {
        const idx = s.sections.findIndex((sec) => sec.id === id);
        const target = idx + dir;
        if (idx < 0 || target < 0 || target >= s.sections.length) return s;
        const sections = [...s.sections];
        const [section] = sections.splice(idx, 1);
        sections.splice(target, 0, section);
        return { ...s, sections };
      },
      "Reordered section"
    );
  };

  const updateVariable = (id: string, patch: Partial<PromptVariable>) => {
    update(
      (s) => ({
        ...s,
        variables: s.variables.map((v) =>
          v.id === id ? { ...v, ...patch } : v
        ),
      }),
      "Edited variable"
    );
  };

  const addVariable = () => {
    const newId = nextId("var");
    update(
      (s) => ({
        ...s,
        variables: [
          ...s.variables,
          { id: newId, label: "New variable", value: "", placeholder: "" },
        ],
      }),
      "Added variable"
    );
  };

  const removeVariable = (id: string) => {
    update(
      (s) => ({
        ...s,
        variables: s.variables.filter((v) => v.id !== id),
      }),
      "Removed variable"
    );
  };

  const selectTemplate = (id: string) => {
    const target = templates.find((t) => t.id === id);
    if (!target || target.id === state.templateId) return;
    update(
      () => ({
        templateId: target.id,
        sections: target.sections.map((s) => ({ ...s })),
        variables: target.variables.map((v) => ({ ...v })),
      }),
      `Loaded "${target.name}"`
    );
    setActiveSectionId(target.sections[0]?.id ?? "");
  };

  const reset = () => {
    const fresh = createInitial();
    update(() => fresh, "Reset prompt");
    setActiveSectionId(fresh.sections[0]?.id ?? "");
  };

  const formatSelection = (before: string, after: string) => {
    if (!activeSection) return;
    const ta = taRefs.current[activeSection.id];
    const len = activeSectionContent.length;
    const start =
      ta && document.activeElement === ta ? ta.selectionStart : len;
    const end = ta && document.activeElement === ta ? ta.selectionEnd : len;
    const selected = activeSectionContent.slice(start, end) || "text";
    const nextContent =
      activeSectionContent.slice(0, start) +
      before +
      selected +
      after +
      activeSectionContent.slice(end);
    updateSection(activeSection.id, { content: nextContent });
    requestAnimationFrame(() => {
      if (ta) {
        ta.focus();
        ta.setSelectionRange(
          start + before.length,
          start + before.length + selected.length
        );
        resizeActive();
      }
    });
  };

  const toggleBullet = () => {
    if (!activeSection) return;
    const ta = taRefs.current[activeSection.id];
    const len = activeSectionContent.length;
    const start =
      ta && document.activeElement === ta ? ta.selectionStart : len;
    const lineStart = activeSectionContent.lastIndexOf("\n", start - 1) + 1;
    const before = activeSectionContent.slice(0, lineStart);
    const after = activeSectionContent.slice(lineStart);
    const hasBullet = after.startsWith("- ");
    const nextContent = hasBullet
      ? before + after.slice(2)
      : before + "- " + after;
    updateSection(activeSection.id, { content: nextContent });
  };

  const insertVariable = (id: string) => {
    if (!activeSection) return;
    const ta = taRefs.current[activeSection.id];
    const len = activeSectionContent.length;
    const start =
      ta && document.activeElement === ta ? ta.selectionStart : len;
    const token = `{{${id}}}`;
    const nextContent =
      activeSectionContent.slice(0, start) +
      token +
      activeSectionContent.slice(start);
    updateSection(activeSection.id, { content: nextContent });
    requestAnimationFrame(() => {
      if (ta) {
        ta.focus();
        ta.setSelectionRange(start + token.length, start + token.length);
        resizeActive();
      }
    });
  };

  const copyPrompt = async () => {
    const text = buildPrompt(state.sections, state.variables, includeSectionTitles);
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      onCopy?.(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // clipboard unavailable; ignore
    }
  };

  const exportJSON = () => {
    const payload = {
      version: 1,
      templateId: state.templateId,
      sections: state.sections,
      variables: state.variables,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "prompt-builder.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed: unknown = JSON.parse(String(reader.result));
        if (!isState(parsed)) {
          throw new Error("Invalid prompt file structure.");
        }
        update(
          () => ({
            templateId: parsed.templateId,
            sections: parsed.sections.map((s) => ({ ...s })),
            variables: parsed.variables.map((v) => ({ ...v })),
          }),
          "Imported JSON"
        );
        setActiveSectionId(parsed.sections[0]?.id ?? "");
        setImportError(null);
      } catch (error) {
        setImportError(
          error instanceof Error ? error.message : "Could not read file."
        );
      }
    };
    reader.readAsText(file);
    event.target.value = "";
  };

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    const mod = event.metaKey || event.ctrlKey;
    if (mod && event.key === "Enter") {
      event.preventDefault();
      void copyPrompt();
      return;
    }
    if (mod && event.shiftKey && event.key.toLowerCase() === "b") {
      event.preventDefault();
      toggleBullet();
      return;
    }
    if (mod && event.key.toLowerCase() === "b") {
      event.preventDefault();
      formatSelection("**", "**");
      return;
    }
    if (mod && event.key.toLowerCase() === "i") {
      event.preventDefault();
      formatSelection("*", "*");
      return;
    }
    if (mod && event.key.toLowerCase() === "z") {
      event.preventDefault();
      if (event.shiftKey) redo();
      else undo();
      return;
    }
    if (mod && event.key.toLowerCase() === "y") {
      event.preventDefault();
      redo();
      return;
    }
    if (mod && event.key.toLowerCase() === "k") {
      event.preventDefault();
      setHelpOpen((o) => !o);
      return;
    }
  };

  const renderEditorHighlight = (content: string): ReactNode[] => {
    const tokens = parseTokens(content);
    const nodes: ReactNode[] = [];
    let last = 0;
    tokens.forEach((token, i) => {
      if (token.start > last) nodes.push(content.slice(last, token.start));
      const known = varById.has(token.id);
      nodes.push(
        <mark
          key={`${token.id}-${i}`}
          className={cn(
            "rounded-[3px] px-px font-semibold",
            known
              ? "bg-primary-soft text-primary"
              : "bg-danger-soft text-danger"
          )}
        >
          {token.full}
        </mark>
      );
      last = token.end;
    });
    if (last < content.length) nodes.push(content.slice(last));
    return nodes;
  };

  const renderPreviewBody = (content: string): ReactNode[] => {
    const tokens = parseTokens(content);
    const nodes: ReactNode[] = [];
    let last = 0;
    tokens.forEach((token, i) => {
      if (token.start > last) nodes.push(content.slice(last, token.start));
      const variable = varById.get(token.id);
      const filled = Boolean(variable?.value.trim());
      const requiredMissing = Boolean(variable?.required && !filled);
      const hasPlaceholder = Boolean(variable?.placeholder && !filled);
      const display = filled
        ? variable?.value ?? ""
        : hasPlaceholder
          ? `[${variable?.placeholder ?? token.full}]`
          : token.full;
      nodes.push(
        <span
          key={`${token.id}-${i}`}
          title={
            variable
              ? `${variable.label}${
                  filled ? `: ${variable.value}` : " — needs a value"
                }`
              : `Unknown variable: ${token.full}`
          }
          className={cn(
            "mx-0.5 inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 font-mono text-[0.9em]",
            filled
              ? "bg-primary-soft text-primary"
              : requiredMissing
                ? "bg-danger-soft text-danger"
                : hasPlaceholder
                  ? "bg-warning-soft text-warning"
                  : "bg-muted text-muted-foreground"
          )}
        >
          {display}
          {requiredMissing && (
            <span className="text-[10px] font-semibold uppercase tracking-wide">
              Required
            </span>
          )}
        </span>
      );
      last = token.end;
    });
    if (last < content.length) nodes.push(content.slice(last));
    return nodes;
  };

  const historyList = [...history].reverse();

  return (
    <div
      className={cn("flex w-full flex-col gap-4", className)}
      onKeyDown={handleKeyDown}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="application/json,.json"
        className="hidden"
        onChange={handleImport}
        aria-label="Import prompt JSON"
      />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex min-w-0 flex-wrap items-center gap-2.5">
          <select
            value={state.templateId}
            onChange={(e) => selectTemplate(e.target.value)}
            aria-label="Prompt template"
            className="h-9 max-w-[16rem] rounded-lg border border-input bg-background px-2.5 pr-8 text-sm outline-none transition-colors focus:border-ring focus:ring-1 focus:ring-ring"
          >
            {!template && (
              <option value={state.templateId}>Custom (imported)</option>
            )}
            {templates.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
              isValid
                ? "border-success/40 bg-success-soft text-success"
                : "border-warning/40 bg-warning-soft text-warning"
            )}
          >
            <span
              className={cn(
                "h-1.5 w-1.5 rounded-full",
                isValid ? "bg-success" : "bg-warning"
              )}
            />
            {statusText}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5">
            <ToolbarButton
              onClick={undo}
              disabled={history.length === 0}
              label="Undo (Ctrl + Z)"
            >
              <Icon d={ICON.undo} />
            </ToolbarButton>
            <ToolbarButton
              onClick={redo}
              disabled={future.length === 0}
              label="Redo (Ctrl + Shift + Z)"
            >
              <Icon d={ICON.redo} />
            </ToolbarButton>

            <div ref={historyPanelRef} className="relative">
              <ToolbarButton
                onClick={() => setHistoryOpen((o) => !o)}
                active={historyOpen}
                label="Prompt history"
              >
                <Icon d={ICON.clock} />
              </ToolbarButton>
              {historyOpen && (
                <div className="absolute right-0 top-full z-30 mt-2 w-72 rounded-xl border border-border bg-surface p-2 shadow-popover">
                  <p className="px-2 pb-1 pt-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Prompt History
                  </p>
                  {historyList.length === 0 ? (
                    <p className="px-2 py-4 text-center text-sm text-muted-foreground">
                      No changes yet.
                    </p>
                  ) : (
                    <div className="scrollbar-thin max-h-64 overflow-y-auto">
                      {historyList.map((entry, i) => {
                        const originalIndex = history.length - 1 - i;
                        return (
                          <button
                            key={`${entry.at}-${originalIndex}`}
                            type="button"
                            onClick={() => jumpToHistory(originalIndex)}
                            className="flex w-full items-center justify-between gap-2 rounded-lg px-2 py-1.5 text-left text-sm transition-colors hover:bg-muted"
                          >
                            <span className="min-w-0 truncate text-muted-foreground">
                              {entry.reason}
                            </span>
                            <span className="shrink-0 font-mono text-[10px] text-muted-foreground/70">
                              {timeAgo(entry.at)}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div ref={helpPanelRef} className="relative">
              <ToolbarButton
                onClick={() => setHelpOpen((o) => !o)}
                active={helpOpen}
                label="Keyboard shortcuts"
              >
                <Icon d={ICON.help} />
              </ToolbarButton>
              {helpOpen && (
                <div className="absolute right-0 top-full z-30 mt-2 w-72 rounded-xl border border-border bg-surface p-2 shadow-popover">
                  <p className="px-2 pb-1 pt-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Keyboard Shortcuts
                  </p>
                  <div className="flex flex-col">
                    {SHORTCUTS.map((shortcut) => (
                      <div
                        key={shortcut.keys}
                        className="flex items-center justify-between gap-3 rounded-lg px-2 py-1.5"
                      >
                        <span className="text-sm text-muted-foreground">
                          {shortcut.label}
                        </span>
                        <kbd className="shrink-0 rounded-md border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px] text-foreground">
                          {shortcut.keys}
                        </kbd>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <span className="mx-1 hidden h-5 w-px bg-border sm:block" />

          <div className="flex items-center gap-1.5">
            <ActionButton
              onClick={() => fileInputRef.current?.click()}
              label="Import JSON"
            >
              <Icon d={ICON.upload} className="h-3.5 w-3.5" />
              Import
            </ActionButton>
            <ActionButton onClick={exportJSON} label="Export JSON">
              <Icon d={ICON.download} className="h-3.5 w-3.5" />
              Export
            </ActionButton>
            <ActionButton onClick={reset} label="Reset prompt">
              <Icon d={ICON.reset} className="h-3.5 w-3.5" />
              Reset
            </ActionButton>
            <ActionButton
              variant="primary"
              onClick={() => void copyPrompt()}
              disabled={totalChars === 0}
              label="Copy prompt (Ctrl + Enter)"
            >
              <Icon d={copied ? ICON.check : ICON.copy} className="h-3.5 w-3.5" />
              {copied ? "Copied" : "Copy"}
            </ActionButton>
          </div>
        </div>
      </div>

      {importError && (
        <p className="rounded-lg border border-danger/30 bg-danger-soft px-3 py-2 text-sm text-danger">
          {importError}
        </p>
      )}

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="flex min-w-0 flex-col gap-3 rounded-xl border border-border bg-surface p-4">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-sm font-semibold tracking-tight">Sections</h3>
            <ActionButton onClick={addSection} label="Add section">
              <Icon d={ICON.plus} className="h-3.5 w-3.5" />
              Add
            </ActionButton>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {state.sections.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No sections yet. Add one to get started.
              </p>
            ) : (
              state.sections.map((section, index) => (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => setActiveSectionId(section.id)}
                  className={cn(
                    "inline-flex max-w-full items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-colors",
                    section.id === activeSection?.id
                      ? "border-primary/40 bg-primary-soft text-primary"
                      : "border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <span className="font-mono text-[10px] opacity-70">
                    {index + 1}
                  </span>
                  <span className="max-w-[10rem] truncate">{section.title}</span>
                </button>
              ))
            )}
          </div>

          {activeSection ? (
            <>
              <div className="flex flex-wrap items-center gap-2">
                <input
                  value={activeSection.title}
                  onChange={(e) =>
                    updateSection(activeSection.id, { title: e.target.value })
                  }
                  aria-label="Section title"
                  className="h-9 w-full max-w-[16rem] rounded-lg border border-input bg-background px-2.5 text-sm font-medium outline-none transition-colors focus:border-ring focus:ring-1 focus:ring-ring"
                />
                <div className="ml-auto flex items-center gap-1">
                  <ToolbarButton
                    onClick={() => moveSection(activeSection.id, -1)}
                    disabled={activeSectionIndex <= 0}
                    label="Move section up"
                  >
                    <Icon d={ICON.chevronUp} className="h-3.5 w-3.5" />
                  </ToolbarButton>
                  <ToolbarButton
                    onClick={() => moveSection(activeSection.id, 1)}
                    disabled={
                      activeSectionIndex < 0 ||
                      activeSectionIndex >= state.sections.length - 1
                    }
                    label="Move section down"
                  >
                    <Icon d={ICON.chevronDown} className="h-3.5 w-3.5" />
                  </ToolbarButton>
                  <ToolbarButton
                    onClick={() => removeSection(activeSection.id)}
                    disabled={state.sections.length <= 1}
                    label="Delete section"
                  >
                    <Icon d={ICON.trash} className="h-3.5 w-3.5" />
                  </ToolbarButton>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                {state.variables.map((variable) => {
                  const filled = Boolean(variable.value.trim());
                  return (
                    <button
                      key={variable.id}
                      type="button"
                      onClick={() => insertVariable(variable.id)}
                      title={`Insert {{${variable.id}}}${
                        filled ? ` (${variable.value})` : ""
                      }`}
                      className={cn(
                        "inline-flex max-w-full items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium transition-colors",
                        filled
                          ? "border-primary/30 bg-primary-soft/60 text-primary hover:bg-primary-soft"
                          : variable.required
                            ? "border-danger/40 bg-danger-soft/60 text-danger hover:bg-danger-soft"
                            : "border-warning/40 bg-warning-soft/60 text-warning hover:bg-warning-soft"
                      )}
                    >
                      <Icon d={ICON.sparkles} className="h-3 w-3" />
                      <span className="max-w-[8rem] truncate">
                        {variable.label}
                      </span>
                      <code className="font-mono text-[10px] opacity-70">
                        {`{{${variable.id}}}`}
                      </code>
                    </button>
                  );
                })}
                {state.variables.length === 0 && (
                  <span className="text-xs text-muted-foreground">
                    Add variables to insert them as tokens.
                  </span>
                )}
              </div>

              <div className="relative rounded-lg border border-input bg-background focus-within:border-ring focus-within:ring-1 focus-within:ring-ring">
                <pre
                  aria-hidden
                  className={cn(editorBase, "pointer-events-none absolute inset-0 text-foreground")}
                >
                  {renderEditorHighlight(activeSectionContent)}
                  {"\n"}
                </pre>
                <textarea
                  ref={(el) => {
                    taRefs.current[activeSection.id] = el;
                  }}
                  value={activeSectionContent}
                  onChange={(e) =>
                    updateSection(activeSection.id, {
                      content: e.target.value.slice(0, maxLength),
                    })
                  }
                  placeholder="Write your prompt here. Insert {{variable}} tokens or click a chip above."
                  aria-label={`Section content: ${activeSection.title}`}
                  spellCheck={false}
                  className={cn(
                    editorBase,
                    "relative block text-transparent caret-foreground selection:bg-primary-soft placeholder:text-subtle"
                  )}
                />
              </div>

              <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground/70">
                <span>
                  {activeSectionContent.length.toLocaleString()} chars in this
                  section
                </span>
                <span className="font-mono">
                  {"{{variable}}"} tokens highlight live
                </span>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed border-border py-10">
              <p className="text-sm text-muted-foreground">No sections yet.</p>
              <ActionButton onClick={addSection} label="Add section">
                <Icon d={ICON.plus} className="h-3.5 w-3.5" />
                Add section
              </ActionButton>
            </div>
          )}
        </div>

        <div className="flex min-w-0 flex-col gap-4">
          <div className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-4">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-sm font-semibold tracking-tight">Variables</h3>
              <ActionButton onClick={addVariable} label="Add variable">
                <Icon d={ICON.plus} className="h-3.5 w-3.5" />
                Add
              </ActionButton>
            </div>

            <div className="flex flex-col gap-2.5">
              {state.variables.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  No variables yet. Add one and reference it with{" "}
                  <code className="font-mono text-foreground">
                    {"{{id}}"}
                  </code>
                  .
                </p>
              )}
              {state.variables.map((variable) => (
                <div
                  key={variable.id}
                  className="rounded-lg border border-border bg-background p-3"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <input
                      value={variable.label}
                      onChange={(e) =>
                        updateVariable(variable.id, { label: e.target.value })
                      }
                      aria-label={`Label for ${variable.id}`}
                      className="h-8 w-36 min-w-0 rounded-md border border-input bg-background px-2 text-sm outline-none transition-colors focus:border-ring focus:ring-1 focus:ring-ring"
                    />
                    <code className="min-w-0 flex-1 truncate font-mono text-xs text-muted-foreground">
                      {`{{${variable.id}}}`}
                    </code>
                    <button
                      type="button"
                      onClick={() =>
                        updateVariable(variable.id, {
                          required: !variable.required,
                        })
                      }
                      aria-pressed={variable.required}
                      className={cn(
                        "rounded-full border px-2.5 py-1 text-[11px] font-medium transition-colors",
                        variable.required
                          ? "border-danger/40 bg-danger-soft text-danger"
                          : "border-border text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      {variable.required ? "Required" : "Optional"}
                    </button>
                    <button
                      type="button"
                      onClick={() => removeVariable(variable.id)}
                      aria-label={`Delete variable ${variable.label}`}
                      className="inline-flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-danger-soft hover:text-danger"
                    >
                      <Icon d={ICON.trash} className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <input
                    value={variable.value}
                    onChange={(e) =>
                      updateVariable(variable.id, { value: e.target.value })
                    }
                    placeholder={variable.placeholder || `Value for ${variable.label}`}
                    aria-label={`Value for ${variable.label}`}
                    className="mt-2 h-9 w-full rounded-md border border-input bg-background px-2.5 text-sm outline-none transition-colors placeholder:text-subtle focus:border-ring focus:ring-1 focus:ring-ring"
                  />
                  <div className="mt-1.5 flex items-center justify-between gap-2">
                    <input
                      value={variable.placeholder ?? ""}
                      onChange={(e) =>
                        updateVariable(variable.id, {
                          placeholder: e.target.value,
                        })
                      }
                      placeholder="Placeholder (optional)"
                      aria-label={`Placeholder for ${variable.label}`}
                      className="h-7 w-full rounded-md border border-transparent bg-transparent px-2 text-xs text-muted-foreground outline-none transition-colors placeholder:text-subtle hover:border-border focus:border-ring"
                    />
                    {variable.required && !variable.value.trim() && (
                      <span className="shrink-0 text-[11px] font-medium text-danger">
                        Needs a value
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-4">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-sm font-semibold tracking-tight">
                Live Preview
              </h3>
              <ActionButton
                onClick={() => void copyPrompt()}
                disabled={totalChars === 0}
                label="Copy prompt (Ctrl + Enter)"
              >
                <Icon d={copied ? ICON.check : ICON.copy} className="h-3.5 w-3.5" />
                {copied ? "Copied" : "Copy"}
              </ActionButton>
            </div>

            <div className="rounded-lg border border-border bg-background p-4">
              {state.sections.length === 0 ? (
                <p className="py-6 text-center text-sm text-muted-foreground">
                  Nothing to preview yet.
                </p>
              ) : (
                <div className="flex flex-col gap-4">
                  {state.sections.map((section) => {
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
        </div>
      </div>
    </div>
  );
}
