import { useSearchParams } from "react-router-dom";
import Hero from "./components/hero/Hero";
import CategoriesGrid from "./components/categoriesGrid/CategoriesGrid";
import ProductsGrid from "./components/productsGrid/ProductsGrid";

export default function Home() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const searchQuery = searchParams.get("q");

  return (
    <>
      <Hero />

      <section className="container" style={{ paddingBottom: "4rem" }}>
        <ProductsGrid category={category} searchQuery={searchQuery} />
        <CategoriesGrid />
      </section>
    </>
  );
}
