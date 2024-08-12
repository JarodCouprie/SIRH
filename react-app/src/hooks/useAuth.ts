import { createContext, useContext } from "react";
import { AuthTokens } from "@/type/context/auth-tokens.type.ts";

export const AuthContext = createContext<AuthTokens | null>(null);

export const useAuth = () => {
  return useContext(AuthContext);
};
