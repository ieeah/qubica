import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCartContext } from "@/shared/context/CartContext";
import { useAuthContext } from "@/shared/context/AuthContext";
import LoginPromptModal from "@/shared/components/ui/LoginPromptModal/LoginPromptModal";
import CartItem from "./components/CartItem";
import styles from "./cartpage.module.css";
import cn from "@/shared/utils/cn";

export default function CartPage() {
  const { state, clearCart } = useCartContext();
  const { isLogged } = useAuthContext();
  const navigate = useNavigate();
  const [isLoginPromptOpen, setIsLoginPromptOpen] = useState(false);

  const userLocale =
    typeof navigator !== "undefined" ? navigator.language : "it-IT";
  const formattedTotal = new Intl.NumberFormat(userLocale, {
    style: "currency",
    currency: "EUR",
  }).format(state.totalPrice);

  const handleCheckoutClick = () => {
    if (isLogged) {
      navigate("/checkout");
    } else {
      setIsLoginPromptOpen(true);
    }
  };

  if (state.items.length === 0) {
    return (
      <main className="container py-4">
        <h1 className="mb-3">Carrello</h1>
        <div className={styles.emptyState}>
          <p>Il tuo carrello è vuoto.</p>
          <Link
            to="/"
            className="btn-primary"
            style={{
              textDecoration: "none",
              display: "inline-block",
              marginTop: "1rem",
            }}
          >
            Torna agli acquisti
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="container py-4">
      <div className={styles.headerRow}>
        <h1>Carrello</h1>
        <button 
          onClick={clearCart}
          className={styles.clearBtn}
          aria-label="Svuota il carrello"
        >
          Svuota Carrello
        </button>
      </div>

      <div className={styles.layout}>
        <div className={styles.itemsList}>
          {state.items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        <div className={styles.summaryPanel}>
          <h2>Riepilogo Ordine</h2>
          <div className={styles.summaryRow}>
            <span>Articoli ({state.totalItems})</span>
            <span>{formattedTotal}</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Spedizione</span>
            <span>Gratis</span>
          </div>
          <hr className={styles.divider} />
          <div className={cn(styles.summaryRow, styles.totalRow)}>
            <span>Totale</span>
            <output
              className={styles.totalValue}
              aria-label="Totale complessivo"
            >
              <span className="visually-hidden">Totale da pagare: </span>
              {formattedTotal}
            </output>
          </div>

          <button
            type="button"
            className={cn("btn-primary", styles.checkoutBtn)}
            onClick={handleCheckoutClick}
          >
            Procedi al Checkout
          </button>
        </div>
      </div>

      <LoginPromptModal
        isOpen={isLoginPromptOpen}
        onClose={() => setIsLoginPromptOpen(false)}
        redirectTo="/checkout"
      />
    </main>
  );
}
