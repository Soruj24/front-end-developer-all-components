/** Extracts a ```json block (or raw JSON) from agent output. */
export function extractJsonBlock(text: string): unknown | null {
  const match = text.match(/```json\s*([\s\S]*?)```/);
  const candidate = match ? match[1] : text;
  try {
    return JSON.parse(candidate);
  } catch {
    return null;
  }
}

/** Parses agent output as a JSON object, or null. */
export function parseJsonObject<T>(text: string): T | null {
  const parsed = extractJsonBlock(text);
  return parsed && typeof parsed === "object" ? (parsed as T) : null;
}
