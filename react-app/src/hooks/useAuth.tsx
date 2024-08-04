import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { AuthTokens } from "@/type/context/auth-tokens.type.ts";

const AuthContext = createContext<AuthTokens | null>(null);

export const AuthProvider = ({ children }: any) => {
  const [token, setToken_] = useState({
    accessToken: localStorage.accessToken ? localStorage.accessToken : "",
    refreshToken: localStorage.refreshToken ? localStorage.refreshToken : "",
  });
  const setToken = (accessToken: string, refreshToken: string) => {
    setToken_({ accessToken, refreshToken });
  };

  useEffect(() => {
    if (token) {
      localStorage.accessToken = token.accessToken;
      localStorage.refreshToken = token.refreshToken;
    } else {
      localStorage.accessToken = "";
      localStorage.refreshToken = "";
    }
  }, [token]);
  const contextValue = useMemo(
    () => ({
      token,
      setToken,
    }),
    [token],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
