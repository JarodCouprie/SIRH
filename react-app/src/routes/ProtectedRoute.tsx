import { useAuth } from "@/hooks/useAuth.tsx";
import { Outlet, Navigate } from "react-router-dom";
import { AuthTokens } from "@/type/context/authTokens.tsx";

export const ProtectedRoute = () => {
  const { token } = useAuth() as AuthTokens;
  if (!token.accessToken) {
    return <Navigate to="/login" replace={true} />;
  }
  return <Outlet />;
};
