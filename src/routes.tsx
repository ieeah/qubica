import { Routes, Route } from "react-router-dom";

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
      <Route path="/" element={<div>Home / Catalogo</div>} />
      <Route path="/product/:id" element={<div>Dettaglio Prodotto</div>} />
      <Route path="/cart" element={<div>Carrello</div>} />
      <Route path="*" element={<div>Pagina non trovata (404)</div>} />
    </Routes>
  );
}
