import { useAuth } from "@/common/hooks/useAuth.ts";
import { Outlet, Navigate } from "react-router-dom";
import { AuthTokens } from "@/common/type/context/auth-tokens.type.ts";

export const ProtectedRoutes = () => {
  const { token } = useAuth() as AuthTokens;
  if (!token.accessToken) {
    return <Navigate to="/login" replace={true} />;
  }
  return <Outlet />;
};
