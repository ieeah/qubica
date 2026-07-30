import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, beforeAll } from "vitest";
import { MemoryRouter } from "react-router-dom";
import CheckoutPage from "./CheckoutPage";
import { useCartContext } from "@/shared/context/CartContext";
import useCheckoutForm from "./useCheckoutForm";

vi.mock("@/shared/context/CartContext", () => ({
  useCartContext: vi.fn(),
}));

vi.mock("./useCheckoutForm", () => ({
  default: vi.fn(),
}));

describe("CheckoutPage", () => {
  const mockClearCart = vi.fn();
  const mockHandleSubmit = vi.fn((fn) => (e: any) => {
    e?.preventDefault();
    return fn({
      firstName: "Test",
      lastName: "User",
      address: "Via Roma",
      city: "Roma",
      zipCode: "00100",
      paymentMethod: "card"
    });
  });
  const mockRegister = vi.fn();

  beforeAll(() => {
    HTMLDialogElement.prototype.showModal = vi.fn();
    HTMLDialogElement.prototype.close = vi.fn();
  });

  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(useCartContext).mockReturnValue({
      state: {
        items: [
          {
            id: 1,
            title: "Test",
            price: 50,
            quantity: 1,
            category: "test",
            description: "test",
            image: "test.jpg",
            rating: { rate: 4, count: 1 },
          },
        ],
        totalItems: 1,
        totalPrice: 50,
      },
      addItem: vi.fn(),
      updateQuantity: vi.fn(),
      removeItem: vi.fn(),
      clearCart: mockClearCart,
    });

    vi.mocked(useCheckoutForm).mockReturnValue({
      register: mockRegister,
      handleSubmit: mockHandleSubmit,
      errors: {},
      formState: { isSubmitting: false },
      setValue: vi.fn(),
    });
  });

  const renderComponent = () => {
    return render(
      <MemoryRouter>
        <CheckoutPage />
      </MemoryRouter>
    );
  };

  it("renderizza il form di checkout", () => {
    renderComponent();
    expect(screen.getByText("Dati di Spedizione")).toBeDefined();
    expect(screen.getByText("Conferma Ordine")).toBeDefined();
  });

  it("gestisce la transizione di stato da elaborazione a successo durante il submit", async () => {
    // Simula startViewTransition se non esiste nell'ambiente di test
    if (!document.startViewTransition) {
      document.startViewTransition = vi.fn((cb) => cb());
    }

    renderComponent();
    
    const submitBtn = screen.getByText("Conferma Ordine");
    
    fireEvent.submit(submitBtn);

    // Il bottone dovrebbe mostrare "Elaborazione..."
    expect(screen.getByText("Elaborazione...")).toBeDefined();
    
    // Aspetta che la modale si aggiorni per mostrare il successo (circa 2 secondi)
    await waitFor(() => {
      expect(screen.getByText("Ordine Completato!")).toBeDefined();
    }, { timeout: 3000 });
    
    expect(screen.getByText(/Il tuo ordine è stato processato con successo/i)).toBeDefined();
    expect(mockClearCart).toHaveBeenCalledTimes(1);
  });
});
