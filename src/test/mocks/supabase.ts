import { vi } from "vitest";

type QueryResult = {
  data: any;
  error: any;
};

const defaultTableData: Record<string, any> = {
  markets: [],
  public_tutors: [],
  tutor_applications: null,
};

const createQueryBuilder = (tableName: string) => {
  const result: QueryResult = {
    data: tableName in defaultTableData ? defaultTableData[tableName] : [],
    error: null,
  };

  const builder: Record<string, any> = {
    select: vi.fn(() => builder),
    insert: vi.fn(async () => ({ data: null, error: null })),
    update: vi.fn(() => builder),
    delete: vi.fn(() => builder),
    upsert: vi.fn(async () => ({ data: null, error: null })),
    eq: vi.fn(() => builder),
    neq: vi.fn(() => builder),
    or: vi.fn(() => builder),
    in: vi.fn(() => builder),
    ilike: vi.fn(() => builder),
    like: vi.fn(() => builder),
    match: vi.fn(() => builder),
    range: vi.fn(() => builder),
    limit: vi.fn(() => builder),
    order: vi.fn(() => builder),
    single: vi.fn(async () => ({ data: result.data, error: null })),
    maybeSingle: vi.fn(async () => ({ data: result.data, error: null })),
    then: (onFulfilled?: (value: QueryResult) => unknown, onRejected?: (reason: unknown) => unknown) =>
      Promise.resolve(result).then(onFulfilled, onRejected),
    catch: (onRejected?: (reason: unknown) => unknown) => Promise.resolve(result).catch(onRejected),
    finally: (onFinally?: (() => void) | undefined) => Promise.resolve(result).finally(onFinally),
  };

  return builder;
};

const storageBucket = {
  upload: vi.fn(async () => ({ data: { path: "mock-file" }, error: null })),
  getPublicUrl: vi.fn(() => ({ data: { publicUrl: "https://example.com/mock-file" } })),
};

export const supabase = {
  from: vi.fn((tableName: string) => createQueryBuilder(tableName)),
  rpc: vi.fn(async () => ({ data: null, error: null })),
  storage: {
    from: vi.fn(() => storageBucket),
  },
  functions: {
    invoke: vi.fn(async () => ({ data: { valid: true }, error: null })),
  },
};
