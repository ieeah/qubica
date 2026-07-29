import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import CartContextProvider, { useCartContext } from './CartContext';
import storage from '@/shared/utils/storage';
import { ReactNode } from 'react';
import type { Product } from '../types/fakestore';

vi.mock('@/shared/utils/storage', () => ({
  default: {
    get: vi.fn(),
    persist: vi.fn(),
  },
}));

const mockProduct: Product = {
  id: 1,
  title: 'Test Product',
  price: 10,
  category: 'test',
  description: 'Descrizione test',
  image: 'test.png',
  rating: { rate: 4, count: 10 },
};

describe('CartContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const wrapper = ({ children }: { children: ReactNode }) => (
    <CartContextProvider>{children}</CartContextProvider>
  );

  it('inizializza il carrello calcolando totali a 0 se vuoto', () => {
    vi.mocked(storage.get).mockReturnValueOnce([]);
    const { result } = renderHook(() => useCartContext(), { wrapper });

    expect(result.current.state.items).toEqual([]);
    expect(result.current.state.totalPrice).toBe(0);
    expect(result.current.state.totalItems).toBe(0);
  });

  it('aggiunge un prodotto nuovo e ne incrementa la quantità se già presente', () => {
    vi.mocked(storage.get).mockReturnValueOnce([]);
    const { result } = renderHook(() => useCartContext(), { wrapper });

    act(() => {
      result.current.addItem(mockProduct);
    });

    expect(result.current.state.items).toHaveLength(1);
    expect(result.current.state.items[0].quantity).toBe(1);
    expect(result.current.state.totalPrice).toBe(10);
    expect(result.current.state.totalItems).toBe(1);

    act(() => {
      result.current.addItem(mockProduct);
    });

    // Stessa lunghezza (non lo sdoppia), ma quantità raddoppiata
    expect(result.current.state.items).toHaveLength(1);
    expect(result.current.state.items[0].quantity).toBe(2);
    expect(result.current.state.totalPrice).toBe(20);
    expect(result.current.state.totalItems).toBe(2);
    expect(storage.persist).toHaveBeenCalled(); // Verifica se chiama il persist
  });

  it('aggiorna la quantità e rimuove il prodotto se la quantità è < 1', () => {
    vi.mocked(storage.get).mockReturnValueOnce([{ ...mockProduct, quantity: 2 }]);
    const { result } = renderHook(() => useCartContext(), { wrapper });

    act(() => {
      result.current.updateQuantity(1, 5);
    });

    expect(result.current.state.items[0].quantity).toBe(5);
    expect(result.current.state.totalPrice).toBe(50);

    act(() => {
      result.current.updateQuantity(1, 0); // Scende sotto 1
    });

    expect(result.current.state.items).toHaveLength(0);
  });

  it('svuota completamente il carrello (clearCart) e resetta i totali', () => {
    vi.mocked(storage.get).mockReturnValueOnce([{ ...mockProduct, quantity: 2 }]);
    const { result } = renderHook(() => useCartContext(), { wrapper });

    act(() => {
      result.current.clearCart();
    });

    expect(result.current.state.items).toHaveLength(0);
    expect(result.current.state.totalPrice).toBe(0);
    expect(result.current.state.totalItems).toBe(0);
  });
});
