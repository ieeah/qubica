import { Trash2 } from "lucide-react";
import ProductCard from "@/features/home/components/productCard/ProductCard";
import type { WishlistCardProps } from "../wishlistPage.type";
import styles from "./wishlistcard.module.css";

export default function WishlistCard({
  product,
  onRequestRemove,
}: WishlistCardProps) {
  return (
    <div className={styles.wrapper}>
      <button
        type="button"
        className={styles.removeButton}
        onClick={() => onRequestRemove(product)}
        aria-label={`Rimuovi ${product.title} dalla wishlist`}
      >
        <Trash2 size={18} />
      </button>
      <ProductCard product={product} showWishlistButton={false} />
    </div>
  );
}
