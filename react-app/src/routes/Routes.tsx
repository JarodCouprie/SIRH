import { useAuth } from "@/hooks/useAuth.tsx";
import { LoginForm } from "@/pages/auth/LoginForm.tsx";
import { ProtectedRoutes } from "@/routes/ProtectedRoutes.tsx";
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
import { userRoutes } from "@/routes/UserRoutes.tsx";
import { organisationRoutes } from "@/routes/OrganisationRoutes.tsx";
import { demandRoutes } from "@/routes/DemandRoutes.tsx";
import { expenseRoutes } from "@/routes/ExpenseRoutes.tsx";

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
      element: <ProtectedRoutes />,
      children: [
        {
          path: "/",
          element: <Root />,
          errorElement: <PageError />,
          children: [
            userRoutes,
            organisationRoutes,
            demandRoutes,
            expenseRoutes,
          ],
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
