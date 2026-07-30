import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import AuthContextProvider, { useAuthContext } from './AuthContext';
import storage from '@/shared/utils/storage';
import { type ReactNode } from 'react';

vi.mock('@/shared/utils/storage', () => ({
  default: {
    get: vi.fn(),
    persist: vi.fn(),
    delete: vi.fn(),
  },
}));

describe('AuthContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const wrapper = ({ children }: { children: ReactNode }) => (
    <AuthContextProvider>{children}</AuthContextProvider>
  );

  it('inizializza lo stato come "non loggato" se lo storage è vuoto', () => {
    vi.mocked(storage.get).mockReturnValueOnce(null);
    const { result } = renderHook(() => useAuthContext(), { wrapper });

    expect(result.current.isLogged).toBe(false);
    expect(result.current.token).toBeNull();
    expect(storage.get).toHaveBeenCalledWith('QST-JWT-TOKEN');
  });

  it('inizializza lo stato come "loggato" recuperando il token persistito', () => {
    vi.mocked(storage.get).mockReturnValueOnce('fake-jwt-token');
    const { result } = renderHook(() => useAuthContext(), { wrapper });

    expect(result.current.isLogged).toBe(true);
    expect(result.current.token).toBe('fake-jwt-token');
  });

  it('la funzione login salva il token in stato e lo persiste nello storage', () => {
    vi.mocked(storage.get).mockReturnValueOnce(null);
    const { result } = renderHook(() => useAuthContext(), { wrapper });

    act(() => {
      result.current.login('new-token');
    });

    expect(result.current.isLogged).toBe(true);
    expect(result.current.token).toBe('new-token');
    expect(storage.persist).toHaveBeenCalledWith('QST-JWT-TOKEN', 'new-token');
  });

  it('la funzione logout rimuove il token dallo stato e dallo storage', () => {
    vi.mocked(storage.get).mockReturnValueOnce('existing-token');
    const { result } = renderHook(() => useAuthContext(), { wrapper });

    act(() => {
      result.current.logout();
    });

    expect(result.current.isLogged).toBe(false);
    expect(result.current.token).toBeNull();
    expect(storage.delete).toHaveBeenCalledWith('QST-JWT-TOKEN');
  });
});
