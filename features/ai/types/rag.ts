export interface RAGDocument {
  id: string;
  content: string;
  metadata?: Record<string, unknown>;
}

export interface RetrievalResult {
  document: RAGDocument;
  score: number;
}
