"use client";

import { useState, useCallback } from "react";
import type { CanvasNode, VisualProps } from "../types/canvas";
import type { SuggestionType, DesignSuggestion, AIAnalysisResult } from "./types";
import { analyzeDesignAction, explainDesignAction } from "./actions";

interface UseDesignAIResult {
  suggestions: DesignSuggestion[];
  score: number;
  summary: string;
  loading: boolean;
  error: string | null;
  analyze: (types: SuggestionType[], selectedNodeId?: string) => Promise<void>;
  explain: (nodeId?: string) => Promise<string>;
  applySuggestion: (suggestion: DesignSuggestion) => Partial<VisualProps>;
  dismissSuggestion: (id: string) => void;
  clearSuggestions: () => void;
}

export function useDesignAI(nodes: Record<string, CanvasNode>): UseDesignAIResult {
  const [suggestions, setSuggestions] = useState<DesignSuggestion[]>([]);
  const [score, setScore] = useState(1);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyze = useCallback(async (types: SuggestionType[], selectedNodeId?: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await analyzeDesignAction(nodes, types, selectedNodeId);
      if (result.ok && result.data) {
        setSuggestions(result.data.suggestions);
        setScore(result.data.score);
        setSummary(result.data.summary);
      } else {
        setError(result.error ?? "Analysis failed");
      }
    } catch (err) {
      setError(String(err));
    } finally {
      setLoading(false);
    }
  }, [nodes]);

  const explain = useCallback(async (nodeId?: string): Promise<string> => {
    setLoading(true);
    setError(null);
    try {
      const result = await explainDesignAction(nodes, nodeId);
      if (result.ok && result.explanation) {
        return result.explanation;
      }
      setError(result.error ?? "Explanation failed");
      return "";
    } catch (err) {
      setError(String(err));
      return "";
    } finally {
      setLoading(false);
    }
  }, [nodes]);

  const applySuggestion = useCallback((suggestion: DesignSuggestion): Partial<VisualProps> => {
    setSuggestions((prev) =>
      prev.map((s) => (s.id === suggestion.id ? { ...s, applied: true } : s))
    );
    return suggestion.after;
  }, []);

  const dismissSuggestion = useCallback((id: string) => {
    setSuggestions((prev) => prev.filter((s) => s.id !== id));
  }, []);

  const clearSuggestions = useCallback(() => {
    setSuggestions([]);
    setScore(1);
    setSummary("");
  }, []);

  return { suggestions, score, summary, loading, error, analyze, explain, applySuggestion, dismissSuggestion, clearSuggestions };
}
