export const promptBuilderSource: string = `"use client";

import { useLayoutEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface PromptSection {
  id: string;
  title: string;
  content: string;
}

export interface PromptVariable {
  id: string;
  label: string;
  value: string;
  placeholder?: string;
  required?: boolean;
}

export interface PromptTemplate {
  id: string;
  name: string;
  sections: PromptSection[];
  variables: PromptVariable[];
}

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

const TOKEN_RE = /\\{\\{\\s*([\\w.-]+)\\s*\\}\\}/g;
const MAX_HISTORY = 40;

const DEFAULT_TEMPLATES: PromptTemplate[] = [
  {
    id: "summarize",
    name: "Summarizer",
    sections: [
      { id: "role", title: "Role", content: "You are a precise technical editor." },
      { id: "task", title: "Task", content: "Summarize the following for {{audience}} in a {{tone}} tone:\\n\\n{{input}}" },
    ],
    variables: [
      { id: "audience", label: "Audience", value: "", placeholder: "e.g. engineers", required: true },
      { id: "tone", label: "Tone", value: "concise", placeholder: "e.g. concise" },
      { id: "input", label: "Input", value: "", placeholder: "Paste text here", required: true },
    ],
  },
  {
    id: "code-review",
    name: "Code Review",
    sections: [
      { id: "role", title: "Role", content: "You are a senior {{language}} reviewer." },
      { id: "task", title: "Task", content: "Review this diff for bugs and clarity:\\n\\n{{diff}}" },
    ],
    variables: [
      { id: "language", label: "Language", value: "TypeScript", placeholder: "e.g. TypeScript" },
      { id: "diff", label: "Diff", value: "", placeholder: "Paste diff here", required: true },
    ],
  },
];

function parseTokens(content: string): Array<{ full: string; id: string }> {
  const out: Array<{ full: string; id: string }> = [];
  TOKEN_RE.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = TOKEN_RE.exec(content)) !== null) out.push({ full: m[0], id: m[1] });
  return out;
}

function substitute(content: string, variables: PromptVariable[]): string {
  const map = new Map(variables.map((v) => [v.id, v]));
  return content.replace(TOKEN_RE, (full, id: string) => {
    const v = map.get(id);
    if (v?.value) return v.value;
    if (v?.placeholder) return "[" + v.placeholder + "]";
    return full;
  });
}

function buildPrompt(sections: PromptSection[], variables: PromptVariable[], includeTitles: boolean): string {
  return sections
    .map((s) => {
      const body = substitute(s.content, variables).trim();
      if (!body) return "";
      return includeTitles ? "## " + s.title + "\\n\\n" + body : body;
    })
    .filter(Boolean)
    .join("\\n\\n");
}

export function PromptBuilder({
  templates = DEFAULT_TEMPLATES,
  initialTemplateId,
  maxLength = 4000,
  storageKey,
  includeSectionTitles = true,
  className,
  onCopy,
  onStateChange,
}: PromptBuilderProps) {
  const createInitial = (): PromptBuilderState => {
    const t = templates.find((x) => x.id === initialTemplateId) ?? templates[0];
    return {
      templateId: t?.id ?? "",
      sections: t?.sections.map((s) => ({ ...s })) ?? [],
      variables: t?.variables.map((v) => ({ ...v })) ?? [],
    };
  };

  const [state, setState] = useState<PromptBuilderState>(() => {
    if (storageKey && typeof window !== "undefined") {
      try {
        const raw = window.localStorage.getItem(storageKey);
        if (raw) {
          const parsed = JSON.parse(raw) as PromptBuilderState;
          if (parsed && Array.isArray(parsed.sections) && Array.isArray(parsed.variables)) return parsed;
        }
      } catch {
        // fall through to defaults
      }
    }
    return createInitial();
  });
  const stateRef = useRef(state);
  const [activeId, setActiveId] = useState(() => state.sections[0]?.id ?? "");
  const [history, setHistory] = useState<PromptBuilderState[]>([]);
  const [future, setFuture] = useState<PromptBuilderState[]>([]);
  const [copied, setCopied] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);
  const idCounter = useRef(0);
  const taRefs = useRef<Record<string, HTMLTextAreaElement | null>>({});
  const fileRef = useRef<HTMLInputElement>(null);

  const active = state.sections.find((s) => s.id === activeId) ?? state.sections[0];
  const varById = useMemo(() => new Map(state.variables.map((v) => [v.id, v])), [state.variables]);

  const missing = state.variables.filter((v) => v.required && !v.value.trim());
  const unknown = useMemo(() => {
    const seen = new Set<string>();
    const out: string[] = [];
    for (const s of state.sections)
      for (const t of parseTokens(s.content))
        if (!varById.has(t.id) && !seen.has(t.id)) {
          seen.add(t.id);
          out.push(t.id);
        }
    return out;
  }, [state.sections, varById]);

  const prompt = buildPrompt(state.sections, state.variables, includeSectionTitles);
  const valid = missing.length === 0 && unknown.length === 0;

  const commit = (next: PromptBuilderState, record = true) => {
    if (record) {
      setHistory((h) => [...h, stateRef.current].slice(-MAX_HISTORY));
      setFuture([]);
    }
    stateRef.current = next;
    setState(next);
    onStateChange?.(next);
  };

  const patchSection = (id: string, patch: Partial<PromptSection>) =>
    commit({
      ...stateRef.current,
      sections: stateRef.current.sections.map((s) => (s.id === id ? { ...s, ...patch } : s)),
    });

  const patchVariable = (id: string, patch: Partial<PromptVariable>) =>
    commit({
      ...stateRef.current,
      variables: stateRef.current.variables.map((v) => (v.id === id ? { ...v, ...patch } : v)),
    });

  useLayoutEffect(() => {
    if (!active) return;
    const ta = taRefs.current[active.id];
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = ta.scrollHeight + "px";
  }, [active, active?.content]);

  const copy = async () => {
    if (!prompt) return;
    try {
      await navigator.clipboard.writeText(prompt);
      onCopy?.(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // clipboard unavailable
    }
  };

  const highlight = (content: string): ReactNode[] => {
    const nodes: ReactNode[] = [];
    let last = 0;
    TOKEN_RE.lastIndex = 0;
    let m: RegExpExecArray | null;
    let i = 0;
    while ((m = TOKEN_RE.exec(content)) !== null) {
      if (m.index > last) nodes.push(content.slice(last, m.index));
      const known = varById.has(m[1]);
      nodes.push(
        <mark
          key={m[1] + "-" + i++}
          className={cn(
            "rounded-[3px] px-px font-semibold",
            known ? "bg-primary/10 text-primary" : "bg-danger-soft text-danger"
          )}
        >
          {m[0]}
        </mark>
      );
      last = m.index + m[0].length;
    }
    if (last < content.length) nodes.push(content.slice(last));
    return nodes;
  };

  return (
    <div className={cn("flex w-full flex-col gap-4", className)}>
      <input
        ref={fileRef}
        type="file"
        accept="application/json,.json"
        className="hidden"
        aria-label="Import prompt JSON"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          const reader = new FileReader();
          reader.onload = () => {
            try {
              const parsed = JSON.parse(String(reader.result)) as PromptBuilderState;
              if (!Array.isArray(parsed.sections) || !Array.isArray(parsed.variables))
                throw new Error("Invalid prompt file structure.");
              commit({
                templateId: parsed.templateId ?? "imported",
                sections: parsed.sections,
                variables: parsed.variables,
              });
              setActiveId(parsed.sections[0]?.id ?? "");
              setImportError(null);
            } catch (err) {
              setImportError(err instanceof Error ? err.message : "Could not read file.");
            }
          };
          reader.readAsText(file);
          e.target.value = "";
        }}
      />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <select
            value={state.templateId}
            onChange={(e) => {
              const t = templates.find((x) => x.id === e.target.value);
              if (!t) return;
              commit({
                templateId: t.id,
                sections: t.sections.map((s) => ({ ...s })),
                variables: t.variables.map((v) => ({ ...v })),
              });
              setActiveId(t.sections[0]?.id ?? "");
            }}
            aria-label="Prompt template"
            className="h-9 rounded-lg border border-input bg-background px-2.5 text-sm outline-none focus:border-ring"
          >
            {templates.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
              valid
                ? "border-success/40 bg-success-soft text-success"
                : "border-warning/40 bg-warning-soft text-warning"
            )}
          >
            {valid ? (prompt ? "Ready to copy" : "Empty prompt") : missing.length + " need values"}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            disabled={history.length === 0}
            onClick={() => {
              const prev = history[history.length - 1];
              if (!prev) return;
              setFuture((f) => [...f, stateRef.current]);
              setHistory((h) => h.slice(0, -1));
              stateRef.current = prev;
              setState(prev);
            }}
            aria-label="Undo"
            className="h-8 rounded-lg border border-border px-2.5 text-xs font-medium hover:bg-muted disabled:opacity-40"
          >
            Undo
          </button>
          <button
            type="button"
            disabled={future.length === 0}
            onClick={() => {
              const next = future[future.length - 1];
              if (!next) return;
              setHistory((h) => [...h, stateRef.current]);
              setFuture((f) => f.slice(0, -1));
              stateRef.current = next;
              setState(next);
            }}
            aria-label="Redo"
            className="h-8 rounded-lg border border-border px-2.5 text-xs font-medium hover:bg-muted disabled:opacity-40"
          >
            Redo
          </button>
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            aria-label="Import JSON"
            className="h-8 rounded-lg border border-border px-3 text-xs font-medium hover:bg-muted"
          >
            Import
          </button>
          <button
            type="button"
            disabled={!prompt}
            onClick={() => void copy()}
            aria-label="Copy prompt"
            className="h-8 rounded-lg bg-primary px-3 text-xs font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-40"
          >
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>

      {importError && (
        <p className="rounded-lg border border-danger/30 bg-danger-soft px-3 py-2 text-sm text-danger">
          {importError}
        </p>
      )}
      {unknown.length > 0 && (
        <p className="rounded-lg border border-warning/30 bg-warning-soft px-3 py-2 text-xs text-warning">
          Unknown variables: {unknown.join(", ")}
        </p>
      )}

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="flex min-w-0 flex-col gap-3 rounded-xl border border-border/60 bg-card p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold">Sections</h3>
            <button
              type="button"
              onClick={() => {
                const id = "section-" + ++idCounter.current;
                commit({
                  ...stateRef.current,
                  sections: [...stateRef.current.sections, { id, title: "New Section", content: "" }],
                });
                setActiveId(id);
              }}
              className="h-8 rounded-lg border border-border px-3 text-xs font-medium hover:bg-muted"
            >
              + Add
            </button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {state.sections.length === 0 && (
              <p className="text-sm text-muted-foreground">No sections yet. Add one to get started.</p>
            )}
            {state.sections.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setActiveId(s.id)}
                className={cn(
                  "rounded-lg border px-2.5 py-1.5 text-xs font-medium",
                  s.id === active?.id
                    ? "border-primary/40 bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:text-foreground"
                )}
              >
                {i + 1}. {s.title}
              </button>
            ))}
          </div>
          {active ? (
            <>
              <input
                value={active.title}
                onChange={(e) => patchSection(active.id, { title: e.target.value })}
                aria-label="Section title"
                className="h-9 rounded-lg border border-input bg-background px-2.5 text-sm font-medium outline-none focus:border-ring"
              />
              <div className="relative rounded-lg border border-input bg-background focus-within:border-ring">
                <pre aria-hidden className="pointer-events-none absolute inset-0 whitespace-pre-wrap break-words px-3.5 py-3 font-mono text-[13px] leading-[1.6]">
                  {highlight(active.content)}
                  {"\\n"}
                </pre>
                <textarea
                  ref={(el) => {
                    taRefs.current[active.id] = el;
                  }}
                  value={active.content}
                  onChange={(e) =>
                    patchSection(active.id, { content: e.target.value.slice(0, maxLength) })
                  }
                  placeholder="Write your prompt here. Use {{variable}} tokens."
                  aria-label={"Section content: " + active.title}
                  spellCheck={false}
                  className="relative block min-h-[180px] w-full resize-none overflow-hidden bg-transparent px-3.5 py-3 font-mono text-[13px] leading-[1.6] text-transparent caret-foreground outline-none placeholder:text-muted-foreground"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                {active.content.length.toLocaleString()} chars in this section
              </p>
            </>
          ) : (
            <p className="py-6 text-center text-sm text-muted-foreground">No sections yet.</p>
          )}
        </div>

        <div className="flex min-w-0 flex-col gap-4">
          <div className="flex flex-col gap-3 rounded-xl border border-border/60 bg-card p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">Variables</h3>
              <button
                type="button"
                onClick={() => {
                  const id = "var-" + ++idCounter.current;
                  commit({
                    ...stateRef.current,
                    variables: [
                      ...stateRef.current.variables,
                      { id, label: "New variable", value: "", placeholder: "" },
                    ],
                  });
                }}
                className="h-8 rounded-lg border border-border px-3 text-xs font-medium hover:bg-muted"
              >
                + Add
              </button>
            </div>
            {state.variables.length === 0 && (
              <p className="text-sm text-muted-foreground">No variables yet. Reference them with {"{{id}}" }.</p>
            )}
            {state.variables.map((v) => (
              <div key={v.id} className="rounded-lg border border-border bg-background p-3">
                <div className="flex items-center gap-2">
                  <input
                    value={v.label}
                    onChange={(e) => patchVariable(v.id, { label: e.target.value })}
                    aria-label={"Label for " + v.id}
                    className="h-8 w-32 rounded-md border border-input bg-background px-2 text-sm outline-none focus:border-ring"
                  />
                  <code className="flex-1 truncate font-mono text-xs text-muted-foreground">
                    {"{{" + v.id + "}}"}
                  </code>
                  <button
                    type="button"
                    aria-pressed={v.required}
                    onClick={() => patchVariable(v.id, { required: !v.required })}
                    className={cn(
                      "rounded-full border px-2.5 py-1 text-[11px] font-medium",
                      v.required ? "border-danger/40 bg-danger-soft text-danger" : "border-border text-muted-foreground"
                    )}
                  >
                    {v.required ? "Required" : "Optional"}
                  </button>
                  <button
                    type="button"
                    aria-label={"Delete variable " + v.label}
                    onClick={() =>
                      commit({
                        ...stateRef.current,
                        variables: stateRef.current.variables.filter((x) => x.id !== v.id),
                      })
                    }
                    className="rounded-md p-1.5 text-muted-foreground hover:bg-danger-soft hover:text-danger"
                  >
                    ✕
                  </button>
                </div>
                <input
                  value={v.value}
                  onChange={(e) => patchVariable(v.id, { value: e.target.value })}
                  placeholder={v.placeholder || "Value for " + v.label}
                  aria-label={"Value for " + v.label}
                  className="mt-2 h-9 w-full rounded-md border border-input bg-background px-2.5 text-sm outline-none placeholder:text-muted-foreground focus:border-ring"
                />
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3 rounded-xl border border-border/60 bg-card p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">Live Preview</h3>
              <button
                type="button"
                disabled={!prompt}
                onClick={() => void copy()}
                className="h-8 rounded-lg border border-border px-3 text-xs font-medium hover:bg-muted disabled:opacity-40"
              >
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
            <div className="rounded-lg border border-border bg-background p-4">
              {state.sections.length === 0 ? (
                <p className="py-6 text-center text-sm text-muted-foreground">Nothing to preview yet.</p>
              ) : (
                <div className="flex flex-col gap-4">
                  {state.sections.map((s) => (
                    <div key={s.id} className="flex flex-col gap-1.5">
                      {includeSectionTitles && (
                        <h4 className="text-sm font-semibold">{s.title}</h4>
                      )}
                      <p className="whitespace-pre-wrap text-sm leading-relaxed">
                        {substitute(s.content, state.variables) || (
                          <span className="italic text-muted-foreground/60">Empty section</span>
                        )}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <p className="font-mono text-xs tabular-nums text-muted-foreground">
              {prompt.length.toLocaleString()} / {maxLength.toLocaleString()} chars
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
`;
