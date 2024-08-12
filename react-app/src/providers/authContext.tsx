import { AuthContext } from "@/hooks/useAuth";
import React, { useEffect, useMemo, useState } from "react";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
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
