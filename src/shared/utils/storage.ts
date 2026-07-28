import dummyLogger from "@/shared/utils/dummyLogger";

export interface AppStorage {
  get<T = unknown>(key: string): T | null;
  getAll(): Record<string, unknown>;
  persist(key: string, data: unknown): void;
  delete(key: string): void;
  clear(): void;
}

const storage: AppStorage = {
  get<T = unknown>(key: string): T | null {
    const rawResult = localStorage.getItem(key);

    if (rawResult === null) {
      return null;
    }

    try {
      return JSON.parse(rawResult) as T;
    } catch {
      dummyLogger.error(`Failed parsing '${key}' from storage, stored value was '${rawResult}'`);
      return rawResult as unknown as T;
    }
  },

  getAll(): Record<string, unknown> {
    const result: Record<string, unknown> = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        result[key] = this.get(key);
      }
    }
    return result;
  },

  persist(key: string, data: unknown) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch {
      dummyLogger.error(`Failed persisting '${key}' to storage (maybe quota exceeded)`);
    }
  },

  delete(key: string) {
    localStorage.removeItem(key);
  },

  clear() {
    localStorage.clear();
  },
};

export default storage;