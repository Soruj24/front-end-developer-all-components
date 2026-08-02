import type { RAGDocument } from "../../types";

export interface ChunkOptions {
  maxChunkLength?: number;
  overlap?: number;
}

export function chunkText(text: string, options: ChunkOptions = {}): string[] {
  const { maxChunkLength = 800, overlap = 100 } = options;
  if (text.length <= maxChunkLength) {
    return text.trim() ? [text.trim()] : [];
  }

  const chunks: string[] = [];
  let start = 0;
  while (start < text.length) {
    let end = Math.min(start + maxChunkLength, text.length);
    if (end < text.length) {
      const breakAt = text.lastIndexOf("\n\n", end);
      if (breakAt > start) end = breakAt;
    }
    const chunk = text.slice(start, end).trim();
    if (chunk) chunks.push(chunk);
    if (end >= text.length) break;
    start = Math.max(end - overlap, start + 1);
  }
  return chunks;
}

export interface ChunkedDocument extends RAGDocument {
  chunkIndex: number;
  chunkCount: number;
}

export function chunkDocument(doc: RAGDocument, options: ChunkOptions = {}): ChunkedDocument[] {
  const chunks = chunkText(doc.content, options);
  return chunks.map((content, index) => ({
    id: `${doc.id}:${index}`,
    content,
    metadata: { ...doc.metadata, sourceId: doc.id, chunkIndex: index },
    chunkIndex: index,
    chunkCount: chunks.length,
  }));
}
