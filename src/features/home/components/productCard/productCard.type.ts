import type { Product } from "@/shared/types/fakestore/product";

export type ProductCardProps = {
  product: Product;
  showWishlistButton?: boolean;
};
