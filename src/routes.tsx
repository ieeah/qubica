import { Routes, Route } from "react-router-dom";
import Home from "@/features/home/Home";
import ProductDetailPage from "@/features/detail/ProductDetailPage";
import WishlistPage from "@/features/wishlist/WishlistPage";
import ProtectedRoute from "@/shared/components/routeComponents/ProtectedRoute";
import Layout from "@/shared/components/layout/Layout";
import GenericPage from "@/features/generic/GenericPage";
import LoginPage from "@/features/auth/LoginPage";

export function AppRoutes() {
  return (
    <Routes>
      {/* Pagine senza Layout */}
      <Route path="/auth/login" element={<LoginPage />} />

      {/* Pagine con Layout (Header & Footer) */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/page/:id" element={<GenericPage />} />

        {/* Carrello accessibile anche da ospiti: il login viene chiesto solo al tentativo di acquisto */}
        <Route path="/cart" element={<div>Carrello</div>} />

        {/* Pagine Protette con Layout */}
        <Route element={<ProtectedRoute />}>
          <Route path="/wishlist" element={<WishlistPage />} />
        </Route>
      </Route>

      <Route path="*" element={<div>Pagina non trovata (404)</div>} />
    </Routes>
  );
}
