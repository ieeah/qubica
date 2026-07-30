import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import CartPage from "./CartPage";
import { useCartContext } from "@/shared/context/CartContext";
import { useAuthContext } from "@/shared/context/AuthContext";

vi.mock("@/shared/context/CartContext", () => ({
  useCartContext: vi.fn(),
}));

vi.mock("@/shared/context/AuthContext", () => ({
  useAuthContext: vi.fn(),
}));

describe("CartPage", () => {
  const mockClearCart = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = () => {
    return render(
      <MemoryRouter>
        <CartPage />
      </MemoryRouter>
    );
  };

  it("mostra il messaggio di carrello vuoto se non ci sono elementi", () => {
    vi.mocked(useAuthContext).mockReturnValue({ isLogged: true, token: "123", login: vi.fn(), logout: vi.fn() } as any);
    vi.mocked(useCartContext).mockReturnValue({
      state: { items: [], totalItems: 0, totalPrice: 0 },
      addItem: vi.fn(),
      updateQuantity: vi.fn(),
      removeItem: vi.fn(),
      clearCart: mockClearCart,
    });

    renderComponent();
    expect(screen.getByText(/Il tuo carrello è vuoto/i)).toBeDefined();
    expect(screen.getByText(/Torna agli acquisti/i)).toBeDefined();
  });

  it("renderizza gli elementi nel carrello e il pulsante per svuotarlo", () => {
    vi.mocked(useAuthContext).mockReturnValue({ isLogged: true, token: "123", login: vi.fn(), logout: vi.fn() } as any);
    vi.mocked(useCartContext).mockReturnValue({
      state: {
        items: [
          {
            id: 1,
            title: "Prodotto Test",
            price: 50,
            quantity: 2,
            category: "Test",
            description: "Test",
            image: "test.jpg",
            rating: { rate: 4, count: 1 },
          },
        ],
        totalItems: 2,
        totalPrice: 100,
      },
      addItem: vi.fn(),
      updateQuantity: vi.fn(),
      removeItem: vi.fn(),
      clearCart: mockClearCart,
    });

    renderComponent();
    
    // Verifica che l'articolo venga mostrato
    expect(screen.getByText("Prodotto Test")).toBeDefined();
    // Verifica il totale
    expect(screen.getAllByText(/100\.00/).length).toBeGreaterThan(0);
    
    // Verifica che il pulsante Svuota Carrello sia presente e funzionante
    const clearBtn = screen.getByText("Svuota Carrello");
    expect(clearBtn).toBeDefined();
    
    fireEvent.click(clearBtn);
    expect(mockClearCart).toHaveBeenCalledTimes(1);
  });
});
