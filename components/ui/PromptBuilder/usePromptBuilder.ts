"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  promptBuilderTemplates,
  type PromptSection,
  type PromptVariable,
  type PromptTemplate,
} from "@/components/prompt-builder/templates";
import type { PromptBuilderState, HistoryEntry } from "./PromptBuilder.types";
import { MAX_HISTORY } from "./PromptBuilder.constants";
import { parseTokens, buildPrompt, isState } from "./PromptBuilder.utils";
import { formatSelection, toggleBullet, insertVariableToken } from "./PromptBuilderFormatting";

interface UsePromptBuilderOptions {
  templates: PromptTemplate[];
  initialTemplateId?: string;
  maxLength: number;
  storageKey?: string;
  includeSectionTitles: boolean;
  onCopy?: (prompt: string) => void;
  onStateChange?: (state: PromptBuilderState) => void;
}

export function usePromptBuilder({
  templates, initialTemplateId, maxLength, storageKey, includeSectionTitles, onCopy, onStateChange,
}: UsePromptBuilderOptions) {
  const createInitial = (): PromptBuilderState => {
    const template = templates.find((t) => t.id === initialTemplateId) ?? templates[0];
    return { templateId: template?.id ?? "", sections: template?.sections.map((s) => ({ ...s })) ?? [], variables: template?.variables.map((v) => ({ ...v })) ?? [] };
  };

  const [state, setState] = useState<PromptBuilderState>(() => {
    if (storageKey && typeof window !== "undefined") {
      try { const raw = window.localStorage.getItem(storageKey); if (raw) { const parsed: unknown = JSON.parse(raw); if (isState(parsed)) return parsed; } } catch { return createInitial(); }
    }
    return createInitial();
  });
  const stateRef = useRef(state);
  const [activeSectionId, setActiveSectionId] = useState(() => state.sections[0]?.id ?? "");
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [future, setFuture] = useState<HistoryEntry[]>([]);
  const [copied, setCopied] = useState(false);
  const idCounter = useRef(0);
  const nextId = (prefix: string) => `${prefix}-${++idCounter.current}`;
  const taRefs = useRef<Record<string, HTMLTextAreaElement | null>>({});

  useEffect(() => { if (!storageKey) return; const t = setTimeout(() => { try { window.localStorage.setItem(storageKey, JSON.stringify(state)); } catch {} }, 300); return () => clearTimeout(t); }, [state, storageKey]);
  useEffect(() => { onStateChange?.(state); }, [state, onStateChange]);

  const activeSection = state.sections.find((s) => s.id === activeSectionId) ?? state.sections[0];
  const activeSectionContent = activeSection?.content ?? "";
  const activeSectionIndex = activeSection ? state.sections.findIndex((s) => s.id === activeSection.id) : -1;
  const varById = useMemo(() => new Map(state.variables.map((v) => [v.id, v])), [state.variables]);

  const validation = useMemo(() => {
    const missingRequired = state.variables.filter((v) => v.required && !v.value.trim());
    const unknownTokens: string[] = []; const seen = new Set<string>();
    for (const section of state.sections) { for (const token of parseTokens(section.content)) { if (!varById.has(token.id) && !seen.has(token.id)) { seen.add(token.id); unknownTokens.push(token.id); } } }
    return { missingRequired, unknownTokens };
  }, [state.sections, state.variables, varById]);

  const totalChars = useMemo(() => buildPrompt(state.sections, state.variables, includeSectionTitles).length, [state.sections, state.variables, includeSectionTitles]);
  const charRatio = maxLength > 0 ? Math.min(1, totalChars / maxLength) : 0;
  const isValid = validation.missingRequired.length === 0 && validation.unknownTokens.length === 0;

  const applyState = (next: PromptBuilderState) => { stateRef.current = next; setState(next); setActiveSectionId((prev) => next.sections.some((s) => s.id === prev) ? prev : next.sections[0]?.id ?? ""); };
  const update = (updater: (prev: PromptBuilderState) => PromptBuilderState, reason: string) => {
    const current = stateRef.current; const next = updater(current); if (next === current) return;
    setHistory((prev) => { const entries = [...prev, { state: current, at: Date.now(), reason }]; return entries.length > MAX_HISTORY ? entries.slice(entries.length - MAX_HISTORY) : entries; });
    setFuture([]); stateRef.current = next; setState(next);
  };

  const undo = () => { if (history.length === 0) return; const last = history[history.length - 1]; setFuture((p) => [...p, { state: stateRef.current, at: Date.now(), reason: "Undo" }]); setHistory((p) => p.slice(0, -1)); applyState(last.state); };
  const redo = () => { if (future.length === 0) return; const next = future[future.length - 1]; setHistory((p) => [...p, { state: stateRef.current, at: Date.now(), reason: "Redo" }]); setFuture((p) => p.slice(0, -1)); applyState(next.state); };
  const jumpToHistory = (index: number) => { const entry = history[index]; if (!entry) return; setFuture([]); setHistory((p) => p.slice(0, index + 1)); applyState(entry.state); };

  const resizeActive = () => { if (!activeSection) return; const ta = taRefs.current[activeSection.id]; if (!ta) return; ta.style.height = "auto"; ta.style.height = `${ta.scrollHeight}px`; };
  useLayoutEffect(() => { if (!activeSection) return; const ta = taRefs.current[activeSection.id]; if (!ta) return; ta.style.height = "auto"; ta.style.height = `${ta.scrollHeight}px`; }, [activeSection, activeSectionContent, state.sections]);

  const updateSection = (id: string, patch: Partial<PromptSection>) => update((s) => ({ ...s, sections: s.sections.map((sec) => sec.id === id ? { ...sec, ...patch } : sec) }), "Edited section");
  const addSection = () => { const newId = nextId("section"); update((s) => ({ ...s, sections: [...s.sections, { id: newId, title: "New Section", content: "" }] }), "Added section"); setActiveSectionId(newId); };
  const removeSection = (id: string) => { update((s) => ({ ...s, sections: s.sections.filter((sec) => sec.id !== id) }), "Removed section"); setActiveSectionId((prev) => { if (prev !== id) return prev; const idx = stateRef.current.sections.findIndex((sec) => sec.id === id); const n = stateRef.current.sections[idx - 1] ?? stateRef.current.sections[idx + 1]; return n?.id ?? ""; }); };
  const moveSection = (id: string, dir: -1 | 1) => update((s) => { const idx = s.sections.findIndex((sec) => sec.id === id); const t = idx + dir; if (idx < 0 || t < 0 || t >= s.sections.length) return s; const sections = [...s.sections]; const [sec] = sections.splice(idx, 1); sections.splice(t, 0, sec); return { ...s, sections }; }, "Reordered section");

  const updateVariable = (id: string, patch: Partial<PromptVariable>) => update((s) => ({ ...s, variables: s.variables.map((v) => v.id === id ? { ...v, ...patch } : v) }), "Edited variable");
  const addVariable = () => { const newId = nextId("var"); update((s) => ({ ...s, variables: [...s.variables, { id: newId, label: "New variable", value: "", placeholder: "" }] }), "Added variable"); };
  const removeVariable = (id: string) => update((s) => ({ ...s, variables: s.variables.filter((v) => v.id !== id) }), "Removed variable");

  const selectTemplate = (id: string) => { const target = templates.find((t) => t.id === id); if (!target || target.id === state.templateId) return; update(() => ({ templateId: target.id, sections: target.sections.map((s) => ({ ...s })), variables: target.variables.map((v) => ({ ...v })) }), `Loaded "${target.name}"`); setActiveSectionId(target.sections[0]?.id ?? ""); };
  const reset = () => { const fresh = createInitial(); update(() => fresh, "Reset prompt"); setActiveSectionId(fresh.sections[0]?.id ?? ""); };

  const doFormatSelection = (before: string, after: string) => formatSelection(activeSection, activeSectionContent, taRefs, before, after, updateSection, resizeActive);
  const doToggleBullet = () => toggleBullet(activeSection, activeSectionContent, taRefs, updateSection);
  const doInsertVariable = (id: string) => insertVariableToken(activeSection, activeSectionContent, taRefs, id, updateSection, resizeActive);
  const copyPrompt = async () => { const text = buildPrompt(state.sections, state.variables, includeSectionTitles); if (!text) return; try { await navigator.clipboard.writeText(text); onCopy?.(text); setCopied(true); setTimeout(() => setCopied(false), 1600); } catch {} };

  return {
    state, activeSection, activeSectionContent, activeSectionIndex, varById, validation, totalChars, charRatio, isValid, copied, taRefs, history, future,
    updateSection, addSection, removeSection, moveSection, updateVariable, addVariable, removeVariable, selectTemplate, reset, copyPrompt, undo, redo, jumpToHistory,
    formatSelection: doFormatSelection, toggleBullet: doToggleBullet, insertVariable: doInsertVariable,
  };
}
