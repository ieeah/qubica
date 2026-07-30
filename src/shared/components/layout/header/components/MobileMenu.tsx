import { type ReactNode } from "react";
import { Link } from "react-router-dom";
import { Search, X, ShoppingCart } from "lucide-react";
import styles from "./mobilemenu.module.css";
import { useCartContext } from "@/shared/context/CartContext";
import CountBadge from "@/shared/components/ui/CountBadge/CountBadge";
import useCategories from "@/shared/hooks/useCategories";
import Alert from "@/shared/components/ui/Alert/Alert";
import AccountMenuContent from "./AccountMenuContent";
import ThemeToggle from "@/shared/components/ui/ThemeToggle/ThemeToggle";
import { capitalize } from "@/shared/utils/capitalize";
import type { MobileMenuProps } from "./mobilemenu.type";

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { categories = [], isLoading, error } = useCategories();
  const { state } = useCartContext();
  const cartItemsCount = state.items.reduce((total, item) => total + item.quantity, 0);

  let categoriesContent: ReactNode;
  if (isLoading) {
    categoriesContent = <p className={styles.loading}>Caricamento...</p>;
  } else if (error) {
    categoriesContent = (
      <Alert
        type="error"
        message="Errore durante il caricamento delle categorie."
      />
    );
  } else {
    categoriesContent = (categories || []).map((category) => (
      <Link
        key={category}
        to={`/?category=${encodeURIComponent(category)}`}
        onClick={onClose}
      >
        {capitalize(category)}
      </Link>
    ));
  }

  return (
    <>
      <div
        className={`${styles.backdrop} ${isOpen ? styles.open : ""}`}
        onClick={onClose}
      />
      <div className={`${styles.panel} ${isOpen ? styles.open : ""}`}>
        <div className={styles.header}>
          <h2>Menu</h2>
          <button
            onClick={onClose}
            className={styles.closeBtn}
            aria-label="Chiudi menu"
          >
            <X size={24} />
          </button>
        </div>
        <nav className={styles.nav}>
          <Link to="/" onClick={onClose} className={styles.searchLink}>
            <Search size={20} style={{ marginRight: "8px" }} />
            Cerca
          </Link>

          <Link
            to="/cart"
            onClick={onClose}
            className={styles.searchLink} // Using searchLink style for generic menu items with icon
            aria-label={`Carrello${cartItemsCount > 0 ? `, ${cartItemsCount} articoli` : ""}`}
            style={{ marginTop: '0.5rem' }}
          >
            <ShoppingCart size={20} style={{ marginRight: "8px" }} />
            Carrello
            <CountBadge count={cartItemsCount} />
          </Link>

          <hr className={styles.divider} />

          <AccountMenuContent onNavigate={onClose} variant="drawer" />

          <h3 className={styles.sectionTitle}>Categorie</h3>
          {categoriesContent}

          <hr className={styles.divider} />
          
          <div className={styles.themeToggleContainer}>
            <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>Tema</span>
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </>
  );
}
