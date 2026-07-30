import { useState } from "react";
import { useWishlistContext } from "@/shared/context/WishlistContext";
import Modal from "@/shared/components/ui/Modal/Modal";
import WishlistCard from "./components/WishlistCard";
import type { Product } from "@/shared/types/fakestore";
import styles from "./wishlistpage.module.css";

export default function WishlistPage() {
  const { items, removeItem } = useWishlistContext();
  const [productToRemove, setProductToRemove] = useState<Product | null>(null);

  const handleConfirmRemove = () => {
    if (productToRemove) {
      removeItem(productToRemove.id);
    }
    setProductToRemove(null);
  };

  return (
    <div className="container py-4">
      <h1>La mia Wishlist</h1>

      {items.length === 0 ? (
        <p className={styles.emptyState}>
          Non hai ancora aggiunto prodotti alla wishlist.
        </p>
      ) : (
        <div className={styles.grid}>
          {items.map((product) => (
            <WishlistCard
              key={product.id}
              product={product}
              onRequestRemove={setProductToRemove}
            />
          ))}
        </div>
      )}

      <Modal
        isOpen={!!productToRemove}
        onClose={() => setProductToRemove(null)}
        title="Rimuovi dalla wishlist"
      >
        <p>
          Vuoi rimuovere &quot;{productToRemove?.title}&quot; dalla tua
          wishlist?
        </p>
        <div className={styles.modalActions}>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={() => setProductToRemove(null)}
          >
            Annulla
          </button>
          <button
            type="button"
            className={styles.dangerButton}
            onClick={handleConfirmRemove}
          >
            Rimuovi
          </button>
        </div>
      </Modal>
    </div>
  );
}
