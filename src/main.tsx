import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";

import "@/shared/styles/bootstrap-grid.min.css";
import "@/shared/styles/global.css";

import App from "@/App";
import AuthContextProvider from "@/shared/context/AuthContext";
import ThemeContextProvider from "@/shared/context/ThemeContext";
import WishlistContextProvider from "@/shared/context/WishlistContext";
import CartContextProvider from "@/shared/context/CartContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeContextProvider>
      <AuthContextProvider>
        <CartContextProvider>
          <WishlistContextProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </WishlistContextProvider>
        </CartContextProvider>
      </AuthContextProvider>
    </ThemeContextProvider>
  </StrictMode>,
);
