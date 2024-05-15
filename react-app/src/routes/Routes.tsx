import { useAuth } from "@/hooks/useAuth.tsx";
import { LoginForm } from "@/pages/auth/LoginForm.tsx";
import { ProtectedRoute } from "@/routes/ProtectedRoute.tsx";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  useRouteError,
} from "react-router-dom";
import { AuthTokens } from "@/type/context/authTokens.tsx";
import { toast } from "sonner";
import NotFound from "@/pages/error/NotFound.tsx";
import { Root } from "@/components/navigation/Root.tsx";
import { absenceRoutes } from "@/pages/absence/AbsenceRoutes.tsx";
import { userRoutes } from "@/routes/UserRoutes.tsx";

export const Routes = () => {
  const { token } = useAuth() as AuthTokens;
  const publicRoutes = [
    {
      path: "*",
      element: <NotFound />,
    },
    {
      path: "/login",
      element: <LoginForm />,
    },
  ];
  const securedRoutes = [
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          path: "/",
          element: <Root />,
          errorElement: <PageError />,
          children: [absenceRoutes, userRoutes],
        },
      ],
    },
  ];
  const router = createBrowserRouter([
    ...publicRoutes,
    ...(!token.accessToken ? publicRoutes : []),
    ...securedRoutes,
  ]);

  return <RouterProvider router={router} />;
};

function PageError() {
  const error: any = useRouteError();
  toast.error("Une erreur est survenue");
  return (
    <>
      <h1>Une erreur est survenue</h1>
      <p>{error?.error?.toString() ?? error?.toString()}</p>
      <Navigate to="/login" replace={true} />;
    </>
  );
}
