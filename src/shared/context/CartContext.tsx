import {
  useState,
  useEffect,
  type ReactNode,
  useMemo,
  useCallback,
} from "react";
import {
  type CartContextType,
  type LocalCartItem,
} from "@/shared/types/CartContext.type";
import type { Product } from "../types/fakestore";
import storage from "@/shared/utils/storage";
import createAppContext from "@/shared/utils/createAppContext";

const [CartContext, useCartContext] =
  createAppContext<CartContextType>("CartContext");

export { useCartContext };

const CART_KEY = "QST-CART-STATE";

export default function CartContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [items, setItems] = useState<LocalCartItem[]>(() => {
    return storage.get<LocalCartItem[]>(CART_KEY) || [];
  });

  useEffect(() => {
    storage.persist(CART_KEY, items);
  }, [items]);

  const state = useMemo(
    () => ({
      items,
      totalPrice: items.reduce(
        (acc, curr) => acc + curr.price * curr.quantity,
        0,
      ),
      totalItems: items.reduce((acc, curr) => acc + curr.quantity, 0),
    }),
    [items],
  );

  const addItem = useCallback((newItem: Product) => {
    setItems((prev) => {
      const existingItem = prev.find((item) => item.id === newItem.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { ...newItem, quantity: 1 }];
    });
  }, []);

  const removeItem = useCallback((id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const updateQuantity = useCallback((productId: number, newQty: number) => {
    if (newQty < 1) {
      setItems((prev) => prev.filter((item) => item.id !== productId));
      return;
    }

    setItems((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: newQty } : item,
      ),
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const contextValue = useMemo(
    () => ({
      state,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
    }),
    [state, addItem, removeItem, updateQuantity, clearCart],
  ); // 1. Dipendenze corrette

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}
