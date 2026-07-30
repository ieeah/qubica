import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import styles from "./productcard.module.css";
import type { Product } from "@/shared/types/fakestore/product";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const userLocale =
    typeof navigator !== "undefined" ? navigator.language : "it-IT";
  const formattedPrice = new Intl.NumberFormat(userLocale, {
    style: "currency",
    currency: "EUR",
  }).format(product.price);

  return (
    <article className={styles.card}>
      <Link
        to={`/product/${product.id}`}
        className={styles.link}
        aria-label={`Dettagli per ${product.title}`}
      >
        <div className={styles.imageWrapper}>
          <img
            src={product.image}
            alt={product.title}
            className={styles.image}
            loading="lazy"
          />
          {product.rating && (
            <span className={styles.ratingBadge}>
              <Star size={14} fill="currentColor" />
              {product.rating.rate.toFixed(1)}
            </span>
          )}
        </div>
        <div className={styles.content}>
          <h3 className={styles.title}>{product.title}</h3>
          <p className={styles.price}>{formattedPrice}</p>
        </div>
      </Link>
    </article>
  );
}
