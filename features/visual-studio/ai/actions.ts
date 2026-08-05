"use server";

import type { CanvasNode } from "../types/canvas";
import type { SuggestionType, DesignAIResponse } from "./types";
import { analyzeDesign, explainDesign } from "./server";

export async function analyzeDesignAction(
  nodes: Record<string, CanvasNode>,
  types: SuggestionType[],
  selectedNodeId?: string
): Promise<DesignAIResponse> {
  try {
    const result = await analyzeDesign(nodes, types, selectedNodeId);
    return { ok: true, data: result };
  } catch (error) {
    return { ok: false, error: String(error) };
  }
}

export async function explainDesignAction(
  nodes: Record<string, CanvasNode>,
  nodeId?: string
): Promise<{ ok: boolean; explanation?: string; error?: string }> {
  try {
    const explanation = await explainDesign(nodes, nodeId);
    return { ok: true, explanation };
  } catch (error) {
    return { ok: false, error: String(error) };
  }
}
