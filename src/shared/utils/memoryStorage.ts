export class MemoryStorage {
  private store = new Map<string, string>();

  getItem(key: string): string | null {
    return this.store.get(key) ?? null;
  }

  setItem(key: string, value: string): void {
    this.store.set(key, value);
  }

  removeItem(key: string): void {
    this.store.delete(key);
  }

  clear(): void {
    this.store.clear();
  }

  getEntries(): Record<string, string> {
    const result: Record<string, string> = {};
    this.store.forEach((value, key) => {
      result[key] = value;
    });
    return result;
  }
}

export const memoryStorage = new MemoryStorage();
