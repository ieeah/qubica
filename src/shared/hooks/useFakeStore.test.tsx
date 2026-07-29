import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import useFakeStore from './useFakeStore';
import { useAuthContext } from '@/shared/context/AuthContext';
import { API_BASE_URL, API_ENDPOINTS } from '@/shared/config/api';
import type { AuthContextType } from '@/shared/types/AuthContext.type';

// Mockiamo l'hook del contesto di autenticazione per simulare utenti loggati e non
vi.mock('@/shared/context/AuthContext', () => ({
  useAuthContext: vi.fn(),
}));

describe('useFakeStore', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Creiamo un mock fittizio della fetch globale
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ success: true }),
      } as Response)
    );
  });

  it('effettua chiamate pubbliche (es. getAll products) senza token', async () => {
    vi.mocked(useAuthContext).mockReturnValue({ token: null } as AuthContextType);
    const { result } = renderHook(() => useFakeStore());

    await act(async () => {
      await result.current.store.products.getAll();
    });

    expect(global.fetch).toHaveBeenCalledWith(
      `${API_BASE_URL}${API_ENDPOINTS.PRODUCTS}`,
      expect.objectContaining({ method: 'GET' })
    );
  });

  it('inietta dinamicamente l\'header Authorization: Bearer nelle chiamate al carrello se l\'utente è loggato', async () => {
    vi.mocked(useAuthContext).mockReturnValue({ token: 'mock-jwt-token' } as AuthContextType);
    const { result } = renderHook(() => useFakeStore());

    await act(async () => {
      await result.current.store.cart.get();
    });

    expect(global.fetch).toHaveBeenCalledWith(
      `${API_BASE_URL}${API_ENDPOINTS.CART}`,
      expect.objectContaining({
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer mock-jwt-token',
        },
      })
    );
  });

  it('gestisce correttamente le richieste POST con body serializzato (es. login)', async () => {
    vi.mocked(useAuthContext).mockReturnValue({ token: null } as AuthContextType);
    const { result } = renderHook(() => useFakeStore());

    const credentials = { username: 'testuser', password: 'password123' };

    await act(async () => {
      await result.current.store.auth.login(credentials);
    });

    expect(global.fetch).toHaveBeenCalledWith(
      `${API_BASE_URL}${API_ENDPOINTS.LOGIN}`,
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify(credentials),
      })
    );
  });
});
