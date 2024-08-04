import { createContext, useContext } from "react";

export const ThemeContext = createContext({
  theme: "dark",
  setDarkTheme: () => {},
  setLightTheme: () => {},
  setSystemTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}
