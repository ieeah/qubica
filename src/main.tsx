import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";

import "@/shared/styles/bootstrap-grid.min.css";
import "@/shared/styles/global.css";

import App from "@/App";
import AuthContextProvider from "@/shared/context/AuthContext";
import ThemeContextProvider from "@/shared/context/ThemeContext";
import WishlistContextProvider from "@/shared/context/WishlistContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeContextProvider>
      <AuthContextProvider>
        <WishlistContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </WishlistContextProvider>
      </AuthContextProvider>
    </ThemeContextProvider>
  </StrictMode>,
);
