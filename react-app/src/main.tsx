import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Toaster } from "@/components/ui/sonner.tsx";
import { CurrentUserProvider } from "@/common/providers/currentUserContext.js";
import { ThemeContextProvider } from "@/common/providers/themeContext.js";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CurrentUserProvider>
      <ThemeContextProvider>
        <Toaster />
        <App />
      </ThemeContextProvider>
    </CurrentUserProvider>
  </React.StrictMode>,
);
