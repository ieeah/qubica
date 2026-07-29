import type { Product } from './fakestore';

export type LocalCartItem = Product & { quantity: number };

export type CartState = {
  items: LocalCartItem[];
  totalItems: number;
  totalPrice: number;
}

export type CartContextType = {
  state: CartState;
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}
