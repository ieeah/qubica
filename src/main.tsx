import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";

import "@/shared/styles/bootstrap-grid.min.css";
import "@/shared/styles/global.css";

import App from "@/App";
import AuthContextProvider from "@/shared/context/AuthContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthContextProvider>
  </StrictMode>,
);
