import { useSearchParams } from "react-router-dom";
import { capitalize } from "@/shared/utils/capitalize";
import type { ProductsGridHeaderProps } from "./productsGrid.type";

export default function ProductsGridHeader({
  category,
  searchQuery,
  onClearFilters,
}: ProductsGridHeaderProps) {
  const [, setSearchParams] = useSearchParams();

  const handleClearFilters = () => {
    if (onClearFilters) {
      onClearFilters();
    } else {
      setSearchParams({});
    }
  };

  const hasFilters = Boolean(category || searchQuery);

  return (
    <div
      id="products-container"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "2rem",
        scrollMarginTop: "100px",
      }}
    >
      <h2
        id="products-heading"
        style={{
          fontSize: "2rem",
          fontWeight: 700,
          margin: 0,
          scrollMarginTop: "100px",
        }}
      >
        {category
          ? `Categoria: ${capitalize(category)}`
          : searchQuery
            ? `Risultati per: "${searchQuery}"`
            : "I Nostri Prodotti"}
      </h2>
      {hasFilters && (
        <button
          className="btn-primary"
          onClick={handleClearFilters}
          style={{ padding: "0.5rem 1rem", fontSize: "0.9rem" }}
        >
          Rimuovi Filtri
        </button>
      )}
    </div>
  );
}
