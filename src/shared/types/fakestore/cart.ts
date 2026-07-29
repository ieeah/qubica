export type CartItem = {
  productId: number;
  quantity: number;
}

export type Cart = {
  id: number;
  userId: number;
  products: CartItem[];
}
