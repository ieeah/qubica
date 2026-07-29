export type AppStorage = {
  get<T = unknown>(key: string): T | null;
  getAll(): Record<string, unknown>;
  persist(key: string, data: unknown): void;
  delete(key: string): void;
  clear(): void;
}