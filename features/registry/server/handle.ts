/** Minimal query chain surface used by the data layer. */
export interface QueryChain {
  sort(sort?: Record<string, 1 | -1>): QueryChain;
  skip(n: number): QueryChain;
  limit(n: number): QueryChain;
  lean<T>(): Promise<T[]>;
}

export interface SingleQueryChain {
  lean<T>(): Promise<T | null>;
}

/** Minimal Mongoose-model surface the data layer relies on. */
export interface DbHandle {
  find(filter?: Record<string, unknown>): QueryChain;
  findOne(filter?: Record<string, unknown>): SingleQueryChain;
  findById(id: unknown): SingleQueryChain;
  findByIdAndUpdate(
    id: unknown,
    update: object,
    opts?: object
  ): Promise<unknown>;
  findOneAndUpdate(
    filter: Record<string, unknown>,
    update: object,
    opts?: object
  ): Promise<unknown>;
  countDocuments(filter?: Record<string, unknown>): Promise<number>;
  aggregate<T>(pipeline: object[]): Promise<T[]>;
  create(data: object): Promise<unknown>;
}

/** Casts a typed Mongoose model to the minimal handle used by services. */
export function db(model: unknown): DbHandle {
  return model as DbHandle;
}
