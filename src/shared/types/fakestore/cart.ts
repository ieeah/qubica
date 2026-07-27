export type CartItem = {
  productId: number;
  quantity: number;
}

export type Cart = {
  id: number;
  userId: number;
  date: string;
  products: CartItem[];
}

export type AddCartPayload = {
  userId: number;
  date: string;
  products: CartItem[];
}
