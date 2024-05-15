import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeContextProvider } from "@/hooks/useTheme.tsx";
import { Toaster } from "@/components/ui/sonner.tsx";
import { CurrentUserProvider } from "@/hooks/useCurrentUser.tsx";

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
