import type { Product } from "./fakestore";

export type WishlistContextType = {
  items: Product[];
  isInWishlist: (productId: number) => boolean;
  toggleItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  clearWishlist: () => void;
};
