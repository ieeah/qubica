import {
  useState,
  useEffect,
  type ReactNode,
  useMemo,
  useCallback,
} from "react";
import type { WishlistContextType } from "@/shared/types/WishlistContext.type";
import type { Product } from "@/shared/types/fakestore";
import storage from "@/shared/utils/storage";
import createAppContext from "@/shared/utils/createAppContext";

const [WishlistContext, useWishlistContext] =
  createAppContext<WishlistContextType>("WishlistContext");

export { useWishlistContext };

const WISHLIST_KEY = "QST-WISHLIST-STATE";

export default function WishlistContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [items, setItems] = useState<Product[]>(() => {
    return storage.get<Product[]>(WISHLIST_KEY) || [];
  });

  useEffect(() => {
    storage.persist(WISHLIST_KEY, items);
  }, [items]);

  const isInWishlist = useCallback(
    (productId: number) => items.some((item) => item.id === productId),
    [items],
  );

  const toggleItem = useCallback((product: Product) => {
    setItems((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        return prev.filter((item) => item.id !== product.id);
      }
      return [...prev, product];
    });
  }, []);

  const removeItem = useCallback((productId: number) => {
    setItems((prev) => prev.filter((item) => item.id !== productId));
  }, []);

  const clearWishlist = useCallback(() => setItems([]), []);

  const contextValue = useMemo(
    () => ({
      items,
      isInWishlist,
      toggleItem,
      removeItem,
      clearWishlist,
    }),
    [items, isInWishlist, toggleItem, removeItem, clearWishlist],
  );

  return (
    <WishlistContext.Provider value={contextValue}>
      {children}
    </WishlistContext.Provider>
  );
}
