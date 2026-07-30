import useFakeStore from "@/shared/hooks/useFakeStore";
import useReactiveRequest from "@/shared/hooks/useReactiveRequest";
import useViewTransitionNavigate from "@/shared/hooks/useViewTransitionNavigate";
import { shouldInterceptLinkClick } from "@/shared/utils/shouldInterceptLinkClick";
import { Link } from "react-router-dom";
import type { MouseEvent } from "react";
import styles from "./hero.module.css";
import HeroSkeleton from "./HeroSkeleton";
import dummyLogger from "@/shared/utils/dummyLogger";
import { useEffect } from "react";

export default function Hero() {
  const { store } = useFakeStore();
  const navigateWithTransition = useViewTransitionNavigate();
  const [error, featured, isLoading] = useReactiveRequest(
    (options?: RequestInit) => store.products.getFeatured("home", options),
    [store],
  );

  useEffect(() => {
    if (error) {
      dummyLogger.error(
        "Errore durante il fetch di products.getFeatured in Hero component",
      );
    }
  }, [error]);

  if (isLoading || !featured) return <HeroSkeleton />;

  return (
    <section className="container" style={{ padding: "2rem 1rem" }}>
      <div
        className={styles.heroCard}
        style={{ backgroundImage: `url(${featured.image})` }}
      >
        <div className={styles.overlay}>
          <div className={styles.content}>
            <div className={styles.textContent}>
              <h2 className="d-none d-md-block">Prodotto in evidenza</h2>
              <p className="d-none d-md-block">
                Acquista i prodotti migliori e di tendenza.
              </p>
              <Link
                to={`/product/${featured.id}`}
                className="btn-primary"
                onClick={(event: MouseEvent<HTMLAnchorElement>) => {
                  if (!shouldInterceptLinkClick(event)) return;
                  event.preventDefault();
                  navigateWithTransition(`/product/${featured.id}`);
                }}
              >
                Acquista Ora
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
