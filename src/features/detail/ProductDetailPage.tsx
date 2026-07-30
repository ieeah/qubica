import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Star } from "lucide-react";
import useFakeStore from "@/shared/hooks/useFakeStore";
import useReactiveRequest from "@/shared/hooks/useReactiveRequest";
import WishlistButton from "@/shared/components/ui/WishlistButton/WishlistButton";
import Alert from "@/shared/components/ui/Alert/Alert";
import RelatedProducts from "./components/RelatedProducts";
import ProductDetailSkeleton from "./ProductDetailSkeleton";
import { capitalize } from "@/shared/utils/capitalize";
import dummyLogger from "@/shared/utils/dummyLogger";
import type { Product } from "@/shared/types/fakestore/product";
import styles from "./productdetail.module.css";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { store } = useFakeStore();

  const [error, product, isLoading] = useReactiveRequest<Product>(
    (options?: RequestInit) => store.products.get(Number(id), options),
    [id, store],
  );

  useEffect(() => {
    if (error) {
      dummyLogger.error(
        "Errore durante il fetch del prodotto nella pagina di dettaglio.",
      );
    }
  }, [error]);

  if (isLoading) {
    return <ProductDetailSkeleton />;
  }

  if (error || !product) {
    return (
      <div className="container py-4">
        <Alert
          type="error"
          message="Impossibile caricare il prodotto. Riprova più tardi."
        />
      </div>
    );
  }

  const userLocale =
    typeof navigator !== "undefined" ? navigator.language : "it-IT";
  const formattedPrice = new Intl.NumberFormat(userLocale, {
    style: "currency",
    currency: "EUR",
  }).format(product.price);

  return (
    <div className="container py-4">
      <nav aria-label="Breadcrumb">
        <ol className={styles.breadcrumb}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to={`/?category=${encodeURIComponent(product.category)}`}>
              {capitalize(product.category)}
            </Link>
          </li>
          <li aria-current="page">{product.title}</li>
        </ol>
      </nav>

      <div className="row g-4 mt-2">
        <div className="col-12 col-md-6">
          <div className={styles.imageWrapper}>
            <img
              src={product.image}
              alt={product.title}
              className={styles.image}
            />
          </div>
        </div>

        <div className="col-12 col-md-6">
          <div className={styles.details}>
            <div className={styles.headingRow}>
              <h1 className={styles.title}>{product.title}</h1>
              <WishlistButton product={product} />
            </div>

            {product.rating && (
              <p className={styles.rating}>
                <Star size={18} fill="currentColor" />
                {product.rating.rate.toFixed(1)}
                <span className="visually-hidden">
                  Valutazione: {product.rating.rate.toFixed(1)} su 5,{" "}
                  {product.rating.count} recensioni
                </span>
              </p>
            )}

            <p className={styles.price}>{formattedPrice}</p>
            <p className={styles.description}>{product.description}</p>
          </div>
        </div>
      </div>

      <RelatedProducts
        category={product.category}
        excludeProductId={product.id}
      />
    </div>
  );
}
