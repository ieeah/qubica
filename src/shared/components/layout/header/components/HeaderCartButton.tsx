import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useCartContext } from "@/shared/context/CartContext";
import CountBadge from "@/shared/components/ui/CountBadge/CountBadge";
import styles from "./headercartbutton.module.css";
import cn from "@/shared/utils/cn";

export default function HeaderCartButton({ className }: { className?: string }) {
  const { state } = useCartContext();

  return (
    <Link
      to="/cart"
      className={cn(styles.button, className)}
      aria-label={`Carrello${state.totalItems > 0 ? `, ${state.totalItems} articoli` : ""}`}
    >
      <ShoppingCart size={20} />
      <span className={styles.badge}>
        <CountBadge count={state.totalItems} />
      </span>
    </Link>
  );
}
