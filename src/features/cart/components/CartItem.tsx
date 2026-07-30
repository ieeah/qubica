import { Minus, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import type { LocalCartItem } from "@/shared/types/CartContext.type";
import { useCartContext } from "@/shared/context/CartContext";
import styles from "./cartitem.module.css";

type CartItemProps = {
  item: LocalCartItem;
};

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCartContext();

  const userLocale =
    typeof navigator !== "undefined" ? navigator.language : "it-IT";
  const formattedPrice = new Intl.NumberFormat(userLocale, {
    style: "currency",
    currency: "EUR",
  }).format(item.price);
  const formattedTotal = new Intl.NumberFormat(userLocale, {
    style: "currency",
    currency: "EUR",
  }).format(item.price * item.quantity);

  const handleDecrease = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  const handleIncrease = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  return (
    <div className={styles.item}>
      <Link to={`/product/${item.id}`} className={styles.imageLink} aria-label={`Dettagli per ${item.title}`}>
        <img src={item.image} alt={item.title} className={styles.image} loading="lazy" />
      </Link>
      <div className={styles.details}>
        <h3 className={styles.title}>
          <Link to={`/product/${item.id}`}>{item.title}</Link>
        </h3>
        <p className={styles.price}>{formattedPrice}</p>
      </div>
      <div className={styles.actions}>
        <div className={styles.quantityControl}>
          <button
            type="button"
            className={styles.qtyBtn}
            onClick={handleDecrease}
            disabled={item.quantity <= 1}
            aria-label={`Riduci quantità per ${item.title}`}
          >
            <Minus size={16} />
          </button>
          <span className={styles.qtyDisplay} aria-label="Quantità corrente">
            {item.quantity}
          </span>
          <button
            type="button"
            className={styles.qtyBtn}
            onClick={handleIncrease}
            aria-label={`Aumenta quantità per ${item.title}`}
          >
            <Plus size={16} />
          </button>
        </div>
        <div className={styles.totalAndRemove}>
          <p className={styles.itemTotal}>
            <span className="visually-hidden">Totale articolo: </span>
            {formattedTotal}
          </p>
          <button
            type="button"
            className={styles.removeBtn}
            onClick={() => removeItem(item.id)}
            aria-label={`Rimuovi ${item.title} dal carrello`}
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
