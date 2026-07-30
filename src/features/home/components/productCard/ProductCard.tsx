import { Link } from "react-router-dom";
import type { MouseEvent } from "react";
import { ShoppingCart, Star } from "lucide-react";
import useViewTransitionNavigate from "@/shared/hooks/useViewTransitionNavigate";
import { shouldInterceptLinkClick } from "@/shared/utils/shouldInterceptLinkClick";
import WishlistButton from "@/shared/components/ui/WishlistButton/WishlistButton";
import { useCartContext } from "@/shared/context/CartContext";
import cn from "@/shared/utils/cn";
import type { ProductCardProps } from "./productCard.type";
import styles from "./productcard.module.css";

export default function ProductCard({
  product,
  showWishlistButton = true,
}: ProductCardProps) {
  const navigateWithTransition = useViewTransitionNavigate();
  const { state, addItem, removeItem } = useCartContext();
  const inCart = state.items.some((item) => item.id === product.id);

  const handleCartClick = () => {
    if (inCart) {
      removeItem(product.id);
    } else {
      addItem(product);
    }
  };
  const userLocale =
    typeof navigator !== "undefined" ? navigator.language : "it-IT";
  const formattedPrice = new Intl.NumberFormat(userLocale, {
    style: "currency",
    currency: "EUR",
  }).format(product.price);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!shouldInterceptLinkClick(event)) return;
    event.preventDefault();
    navigateWithTransition(`/product/${product.id}`);
  };

  return (
    <article className={styles.card}>
      {showWishlistButton && (
        <WishlistButton product={product} className={styles.wishlistButton} />
      )}
      <Link
        to={`/product/${product.id}`}
        className={styles.link}
        aria-label={`Dettagli per ${product.title}`}
        onClick={handleClick}
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
        <div className={styles.titleSection}>
          <h3 className={styles.title}>{product.title}</h3>
        </div>
      </Link>
      <div className={styles.priceRow}>
        <p className={styles.price}>{formattedPrice}</p>
        <button
          type="button"
          className={cn(styles.cartButton, inCart && styles.inCart)}
          aria-pressed={inCart}
          aria-label={
            inCart
              ? `Rimuovi ${product.title} dal carrello`
              : `Aggiungi ${product.title} al carrello`
          }
          onClick={handleCartClick}
        >
          <ShoppingCart size={18} fill={inCart ? "currentColor" : "none"} />
        </button>
      </div>
    </article>
  );
}
