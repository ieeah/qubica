import HeroSkeleton from "./components/hero/HeroSkeleton";
import CategoriesSkeleton from "./components/categoriesGrid/CategoriesSkeleton";
import ProductsSkeleton from "./components/productsGrid/ProductsSkeleton";

export default function HomeSkeleton() {
  return (
    <>
      <HeroSkeleton />
      <section className="container" style={{ paddingBottom: "4rem" }}>
        <ProductsSkeleton count={6} />
        <CategoriesSkeleton />
      </section>
    </>
  );
}
