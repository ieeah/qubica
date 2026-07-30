import dummyLogger from "@/shared/utils/dummyLogger";
import { memoryStorage } from "./memoryStorage";
import type { AppStorage } from "./storage.type";

let isStorageAvailable = true;

try {
  const testKey = "__test_storage__";
  localStorage.setItem(testKey, testKey);
  localStorage.removeItem(testKey);
} catch {
  isStorageAvailable = false;
  dummyLogger.info("localStorage is not available (Access Denied). Using in-memory fallback.");
}

const activeStorage = isStorageAvailable ? localStorage : memoryStorage;

const storage: AppStorage = {
  get<T = unknown>(key: string): T | null {
    const rawResult = activeStorage.getItem(key);
    if (rawResult === null) return null;

    try {
      return JSON.parse(rawResult) as T;
    } catch {
      dummyLogger.error(`Failed to parse stored value for key "${key}", returning raw value`);
      return rawResult as unknown as T;
    }
  },

  getAll(): Record<string, unknown> {
    const result: Record<string, unknown> = {};

    if (!isStorageAvailable) {
      const entries = memoryStorage.getEntries();
      for (const [key, value] of Object.entries(entries)) {
        try {
          result[key] = JSON.parse(value);
        } catch {
          result[key] = value;
        }
      }
      return result;
    }

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) result[key] = this.get(key);
    }

    return result;
  },

  persist(key: string, data: unknown) {
    try {
      const stringified = JSON.stringify(data);
      activeStorage.setItem(key, stringified);
    } catch (error) {
      dummyLogger.error(
        `Failed to persist data to storage (maybe quota exceeded): ${JSON.stringify(error)}`,
      );
    }
  },

  delete(key: string) {
    activeStorage.removeItem(key);
  },

  clear() {
    activeStorage.clear();
  },
};

export default storage;