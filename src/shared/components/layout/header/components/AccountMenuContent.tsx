import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useAuthContext } from "@/shared/context/AuthContext";
import { useCartContext } from "@/shared/context/CartContext";
import { useWishlistContext } from "@/shared/context/WishlistContext";
import CountBadge from "@/shared/components/ui/CountBadge/CountBadge";
import cn from "@/shared/utils/cn";
import type { AccountMenuContentProps } from "./accountmenucontent.type";
import styles from "./accountmenucontent.module.css";

export default function AccountMenuContent({
  onNavigate,
  variant = "dropdown",
}: AccountMenuContentProps) {
  const { token, logout } = useAuthContext();
  const { state } = useCartContext();
  const { items: wishlistItems } = useWishlistContext();

  if (!token) {
    return (
      <Link to="/auth/login" className="btn-primary" onClick={onNavigate}>
        Login / Profilo
      </Link>
    );
  }

  return (
    <div className={cn(styles.content, styles[variant])}>
      <ul className={styles.menuList}>
        <li>
          <Link
            to="/cart"
            onClick={onNavigate}
            className={styles.cartLink}
            aria-label={`Carrello${state.totalItems > 0 ? `, ${state.totalItems} articoli` : ""}`}
          >
            <ShoppingCart size={20} aria-hidden="true" />
            <span>Carrello</span>
            <CountBadge count={state.totalItems} />
          </Link>
        </li>
        <li>
          <Link
            to="/wishlist"
            onClick={onNavigate}
            aria-label={`Wishlist${wishlistItems.length > 0 ? `, ${wishlistItems.length} articoli` : ""}`}
          >
            Wishlist
            <CountBadge count={wishlistItems.length} />
          </Link>
        </li>
        <li>
          <Link to="/page/profilo" onClick={onNavigate}>
            Il mio profilo
          </Link>
        </li>
        <li>
          <Link to="/page/ordini" onClick={onNavigate}>
            I miei ordini
          </Link>
        </li>
        <li>
          <Link to="/page/impostazioni" onClick={onNavigate}>
            Impostazioni
          </Link>
        </li>
      </ul>
      <button
        type="button"
        className={styles.logoutButton}
        onClick={() => {
          onNavigate();
          logout();
        }}
      >
        Logout
      </button>
    </div>
  );
}
