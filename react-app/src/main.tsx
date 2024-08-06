import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Toaster } from "@/components/ui/sonner.tsx";
import { ThemeContextProvider } from "@/providers/themeContext.tsx";
import { CurrentUserProvider } from "@/providers/currentUserContext.tsx";

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
