import { useTheme } from "@/hooks/useTheme.ts";
import { useEffect } from "react";
import { Routes } from "@/routes/Routes.tsx";
import { AuthProvider } from "@/providers/authContext.tsx";

function App() {
  const { theme } = useTheme();

  const localStorageIsDarkTheme = localStorage.theme === "dark";
  const localStorageIsEmpty = !("theme" in localStorage);
  const localStorageIsOsDefault =
    (localStorage.theme || theme) === "os-default";
  const osDefaultIsDarkTheme = window.matchMedia(
    "(prefers-color-scheme: dark)",
  ).matches;

  useEffect(() => {
    if (
      localStorageIsDarkTheme ||
      (localStorageIsOsDefault && osDefaultIsDarkTheme) ||
      localStorageIsEmpty
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default App;
