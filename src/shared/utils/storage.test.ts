import { describe, it, expect, vi, beforeEach } from 'vitest';
import storage from './storage';
import dummyLogger from './dummyLogger';

vi.mock('./dummyLogger', () => ({
  default: {
    error: vi.fn(),
  },
}));

describe('storage', () => {
  beforeEach(() => {
    storage.clear();
    vi.clearAllMocks();
  });

  it('salva e recupera un valore serializzandolo in JSON', () => {
    storage.persist('test-key', { id: 1, name: 'Test' });
    const result = storage.get('test-key');
    expect(result).toEqual({ id: 1, name: 'Test' });
  });

  it('ritorna null per chiavi inesistenti', () => {
    expect(storage.get('missing-key')).toBeNull();
  });

  it('se il json salvato è corrotto, logga errore e ritorna la stringa grezza (raw)', () => {
    localStorage.setItem('corrupt-key', '{ invalid json');
    const result = storage.get('corrupt-key');
    expect(result).toBe('{ invalid json');
    expect(dummyLogger.error).toHaveBeenCalled();
  });

  it('cattura e gestisce gli errori in scrittura (es. QuotaExceededError) senza far crashare lapp', () => {
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('QuotaExceededError');
    });

    // Assicuriamoci che NON lanci eccezione
    expect(() => storage.persist('key', 'data')).not.toThrow();
    expect(dummyLogger.error).toHaveBeenCalledWith(expect.stringContaining('maybe quota exceeded'));
    
    setItemSpy.mockRestore();
  });

  it('elimina chiavi specifiche ed esegue il clear completo', () => {
    storage.persist('k1', 1);
    storage.persist('k2', 2);
    
    storage.delete('k1');
    expect(storage.get('k1')).toBeNull();
    expect(storage.get('k2')).toBe(2);

    storage.clear();
    expect(storage.get('k2')).toBeNull();
  });
});
