import type { RAGDocument } from "../../types";
import { cosineSimilarity } from "./embeddings";

export interface VectorItem {
  doc: RAGDocument;
  vector: number[];
}

export interface VectorSearchHit {
  id: string;
  score: number;
}

export interface VectorStore {
  add(item: VectorItem): Promise<void>;
  addMany(items: VectorItem[]): Promise<void>;
  search(vector: number[], topK: number): Promise<VectorSearchHit[]>;
  get(id: string): Promise<RAGDocument | undefined>;
  clear(): Promise<void>;
}

export class InMemoryVectorStore implements VectorStore {
  private docs = new Map<string, RAGDocument>();
  private vectors = new Map<string, number[]>();

  async add(item: VectorItem): Promise<void> {
    this.docs.set(item.doc.id, item.doc);
    this.vectors.set(item.doc.id, item.vector);
  }

  async addMany(items: VectorItem[]): Promise<void> {
    for (const item of items) await this.add(item);
  }

  async search(vector: number[], topK: number): Promise<VectorSearchHit[]> {
    const scored: VectorSearchHit[] = [];
    for (const [id, stored] of this.vectors) {
      const score = cosineSimilarity(vector, stored);
      if (score > 0) scored.push({ id, score });
    }
    return scored.sort((a, b) => b.score - a.score).slice(0, topK);
  }

  async get(id: string): Promise<RAGDocument | undefined> {
    return this.docs.get(id);
  }

  async clear(): Promise<void> {
    this.docs.clear();
    this.vectors.clear();
  }

  get size(): number {
    return this.docs.size;
  }
}
