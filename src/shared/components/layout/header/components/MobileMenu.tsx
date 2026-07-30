import { type ReactNode } from "react";
import { Link } from "react-router-dom";
import { Search, X } from "lucide-react";
import styles from "./mobilemenu.module.css";
import useCategories from "@/shared/hooks/useCategories";
import Alert from "@/shared/components/ui/Alert/Alert";
import { capitalize } from "@/shared/utils/capitalize";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function MobileMenu({ isOpen, onClose }: Props) {
  const { categories = [], isLoading, error } = useCategories();

  let categoriesContent: ReactNode;
  if (isLoading) {
    categoriesContent = <p className={styles.loading}>Caricamento...</p>;
  } else if (error) {
    categoriesContent = (
      <Alert type="error" message="Errore durante il caricamento delle categorie." />
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

          <h3 className={styles.sectionTitle}>Categorie</h3>
          {categoriesContent}
        </nav>
      </div>
    </>
  );
}
