export interface Embeddings {
  embed(text: string): Promise<number[]>;
  embedMany(texts: string[]): Promise<number[][]>;
}

export class HashEmbeddings implements Embeddings {
  constructor(private dimensions = 256) {}

  async embed(text: string): Promise<number[]> {
    return hashEmbed(text, this.dimensions);
  }

  async embedMany(texts: string[]): Promise<number[][]> {
    return texts.map((text) => hashEmbed(text, this.dimensions));
  }
}

export function hashEmbed(text: string, dimensions = 256): number[] {
  const vector = new Array(dimensions).fill(0);
  const tokens = text
    .toLowerCase()
    .split(/[^\p{L}\p{N}]+/u)
    .filter(Boolean);
  for (const token of tokens) {
    const hash = stringHash(token);
    const index = Math.abs(hash) % dimensions;
    vector[index] += hash > 0 ? 1 : -1;
  }
  return vector;
}

function stringHash(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}

export function cosineSimilarity(a: number[], b: number[]): number {
  const length = Math.min(a.length, b.length);
  let dot = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  if (normA === 0 || normB === 0) return 0;
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}
