import type { RAGDocument, RetrievalResult } from "../../types";
import type { Embeddings, VectorStore } from "../vector";
import { RAG_TOP_K } from "../../constants";
import { chunkDocument, type ChunkOptions } from "./chunker";

export interface RetrieverConfig {
  vectorStore: VectorStore;
  embeddings: Embeddings;
  topK?: number;
}

export class Retriever {
  constructor(private config: RetrieverConfig) {}

  async index(documents: RAGDocument[], chunkOptions?: ChunkOptions): Promise<number> {
    const items = [];
    for (const doc of documents) {
      const chunks = chunkDocument(doc, chunkOptions);
      const vectors = await this.config.embeddings.embedMany(
        chunks.map((chunk) => chunk.content)
      );
      for (let i = 0; i < chunks.length; i++) {
        items.push({ doc: chunks[i], vector: vectors[i] });
      }
    }
    await this.config.vectorStore.addMany(items);
    return items.length;
  }

  async retrieve(query: string, topK?: number): Promise<RetrievalResult[]> {
    const limit = topK ?? this.config.topK ?? RAG_TOP_K;
    const vector = await this.config.embeddings.embed(query);
    const hits = await this.config.vectorStore.search(vector, limit);
    const results: RetrievalResult[] = [];
    for (const hit of hits) {
      const document = await this.config.vectorStore.get(hit.id);
      if (document) results.push({ document, score: hit.score });
    }
    return results;
  }

  async clear(): Promise<void> {
    await this.config.vectorStore.clear();
  }
}
