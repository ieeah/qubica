import useFakeStore from "@/shared/hooks/useFakeStore";
import useReactiveRequest from "@/shared/hooks/useReactiveRequest";
import ProductCard from "@/features/home/components/productCard/ProductCard";
import { Skeleton } from "@/shared/components/skeleton/Skeleton";
import type { Product } from "@/shared/types/fakestore/product";

type RelatedProductsProps = {
  category: string;
  excludeProductId: number;
};

const MAX_RELATED_PRODUCTS = 4;

export default function RelatedProducts({
  category,
  excludeProductId,
}: RelatedProductsProps) {
  const { store } = useFakeStore();

  const [error, products, isLoading] = useReactiveRequest<Product[]>(
    (options?: RequestInit) => store.categories.getProducts(category, options),
    [category, store],
  );

  const relatedProducts = (products || [])
    .filter((product) => product.id !== excludeProductId)
    .slice(0, MAX_RELATED_PRODUCTS);

  if (error || (!isLoading && relatedProducts.length === 0)) {
    return null;
  }

  return (
    <section>
      <h2 className="mt-5 mb-4">Altri prodotti della stessa categoria</h2>
      <div className="row g-3">
        {isLoading
          ? Array.from({ length: MAX_RELATED_PRODUCTS }).map((_, i) => (
              <div key={i} className="col-6 col-md-3">
                <Skeleton.Rect w="100%" h="200px" rounded />
              </div>
            ))
          : relatedProducts.map((product) => (
              <div key={product.id} className="col-6 col-md-3">
                <ProductCard product={product} />
              </div>
            ))}
      </div>
    </section>
  );
}
