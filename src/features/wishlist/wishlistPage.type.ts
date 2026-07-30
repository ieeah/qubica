import type { Product } from "@/shared/types/fakestore";

export type WishlistCardProps = {
  product: Product;
  onRequestRemove: (product: Product) => void;
};
