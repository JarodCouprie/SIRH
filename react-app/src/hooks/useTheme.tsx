import { createContext, useContext, useState } from "react";

const ThemeContext = createContext({
  theme: "dark",
  setDarkTheme: () => {},
  setLightTheme: () => {},
  setSystemTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeContextProvider({ children }: any) {
  const [theme, setTheme] = useState(
    localStorage.theme ? localStorage.theme : "dark",
  );

  if (localStorage.theme === "os-default") {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (event) => {
        setTheme(event.matches ? "dark" : "light");
      });
  }

  function setDarkTheme() {
    localStorage.theme = "dark";
    setTheme("dark");
  }

  function setLightTheme() {
    localStorage.theme = "light";
    setTheme("light");
  }

  function setSystemTheme() {
    localStorage.theme = "os-default";
    setTheme("os-default");
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setDarkTheme,
        setLightTheme,
        setSystemTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
