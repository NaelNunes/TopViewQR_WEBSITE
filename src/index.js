import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./global.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./Router";
import { AuthProvider } from "./hooks/Auth/index";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
