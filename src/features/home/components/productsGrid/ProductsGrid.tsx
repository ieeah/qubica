import { useEffect, type ReactNode } from "react";
import useFakeStore from "@/shared/hooks/useFakeStore";
import useReactiveRequest from "@/shared/hooks/useReactiveRequest";
import ProductCard from "@/features/home/components/productCard/ProductCard";
import styles from "./productsgrid.module.css";
import ProductsSkeleton from "./ProductsSkeleton";
import ProductsGridHeader from "./ProductsGridHeader";
import dummyLogger from "@/shared/utils/dummyLogger";
import type { Product } from "@/shared/types/fakestore/product";
import type { ProductsGridProps } from "./productsGrid.type";

export default function ProductsGrid({
  category,
  searchQuery,
}: ProductsGridProps) {
  const { store } = useFakeStore();

  const fetchProducts = async (
    options?: RequestInit,
  ): Promise<[Error | null, Product[] | null]> => {
    if (category) {
      return await store.categories.getProducts(category, options);
    }

    const [err, allProducts] = await store.products.getAll(options);
    if (err || !allProducts) return [err, null];

    if (!searchQuery) return [null, allProducts];

    const filtered = allProducts.filter(
      (p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    return [null, filtered];
  };

  const [error, products, isLoading] = useReactiveRequest<Product[]>(
    fetchProducts,
    [category, searchQuery, store],
  );

  useEffect(() => {
    if (error) {
      dummyLogger.error(
        "Errore durante il caricamento dei prodotti nella griglia.",
      );
    }
  }, [error]);

  let content: ReactNode;

  if (isLoading) {
    content = <ProductsSkeleton />;
  } else if (error) {
    content = (
      <div className={styles.messageContainer}>
        <p className="text-danger p-4">
          Si è verificato un errore nel caricamento dei prodotti. Riprova più
          tardi.
        </p>
      </div>
    );
  } else if (!products || products.length === 0) {
    content = (
      <div className={styles.messageContainer}>
        <p>Nessun prodotto trovato per i criteri selezionati.</p>
      </div>
    );
  } else {
    content = (
      <div className={styles.grid}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    );
  }

  return (
    <>
      <ProductsGridHeader category={category} searchQuery={searchQuery} />
      {content}
    </>
  );
}
