import { Routes, Route } from "react-router-dom";
import Home from "@/features/home/Home";
import Layout from "@/shared/components/layout/Layout";

export function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/auth/login"
        element={
          <div>
            <h1>login</h1>
          </div>
        }
      />

      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<div>Dettaglio Prodotto</div>} />
        <Route path="/cart" element={<div>Carrello</div>} />
      </Route>

      <Route path="*" element={<div>Pagina non trovata (404)</div>} />
    </Routes>
  );
}
