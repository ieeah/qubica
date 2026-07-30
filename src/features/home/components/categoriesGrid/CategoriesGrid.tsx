import { Link } from "react-router-dom";
import styles from "./categoriesgrid.module.css";
import CategoriesSkeleton from "./CategoriesSkeleton";
import dummyLogger from "@/shared/utils/dummyLogger";
import { useEffect } from "react";
import useCategories from "@/shared/hooks/useCategories";
import useScroll from "@/shared/hooks/useScroll";

const GRADIENTS = [
  "linear-gradient(135deg, hsl(234, 40%, 20%) 0%, hsl(234, 60%, 10%) 100%)",
  "linear-gradient(135deg, hsl(200, 40%, 20%) 0%, hsl(200, 60%, 10%) 100%)",
  "linear-gradient(135deg, hsl(260, 40%, 20%) 0%, hsl(260, 60%, 10%) 100%)",
  "linear-gradient(135deg, hsl(320, 30%, 20%) 0%, hsl(320, 50%, 10%) 100%)",
];

export default function CategoriesGrid() {
  const { categories, isLoading, error } = useCategories();
  const { scrollToElement } = useScroll();

  useEffect(() => {
    if (error) {
      dummyLogger.error("Errore durante il fetch in CategoriesGrid");
    }
  }, [error]);

  const handleCategoryClick = () => {
    scrollToElement("products-heading", 100);
  };

  if (isLoading || !categories || categories.length === 0)
    return <CategoriesSkeleton />;

  return (
    <section className="container" style={{ padding: "4rem 1rem" }}>
      <h2 className={styles.sectionTitle}>Esplora le Categorie</h2>

      <div className={styles.grid}>
        {categories.map((cat, index) => (
          <Link
            key={cat}
            to={`/?category=${encodeURIComponent(cat)}`}
            className={styles.card}
            onClick={handleCategoryClick}
          >
            <div
              className={styles.colorBlock}
              style={{ background: GRADIENTS[index % GRADIENTS.length] }}
            >
              <h3>{cat}</h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
