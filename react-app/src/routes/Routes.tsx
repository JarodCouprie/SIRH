import { useAuth } from "@/hooks/useAuth.tsx";
import { LoginForm } from "@/pages/auth/LoginForm.tsx";
import { ProtectedRoute } from "@/routes/ProtectedRoute.tsx";
import {
  createBrowserRouter,
  defer,
  Navigate,
  RouterProvider,
  useRouteError,
} from "react-router-dom";
import { Navbar } from "@/components/navigation/Navbar.tsx";
import { User, Users } from "@/pages/user/Users.tsx";
import { AuthTokens } from "@/type/context/authTokens.tsx";
import { customFetcher } from "@/helper/fetchInstance.ts";
import { toast } from "sonner";
import NotFound from "@/pages/error/NotFound.tsx";
import { Demand } from "@/pages/demand/Demand.tsx";

export const Routes = () => {
  const { token } = useAuth() as AuthTokens;
  const publicRoutes = [
    {
      path: "/login",
      element: (
        <div className="grid h-dvh w-dvw place-items-center bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
          <LoginForm />
        </div>
      ),
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ];
  const securedRoutes = [
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          path: "/",
          element: <Navbar />,
          errorElement: <PageError />,
          children: [
            {
              path: "/",
              element: <div>Dashboard</div>,
            },
            {
              path: "user",
              children: [
                {
                  path: "",
                  element: <Users />,
                  loader: async () => {
                    const users = await customFetcher(
                      "http://localhost:5000/api/user",
                    ).then((response) => response.data);
                    return defer({
                      users,
                    });
                  },
                },
                {
                  path: ":id",
                  element: <User />,
                },
              ],
            },
            {
              path: "organisation",
              element: <div>Organisation</div>,
            },
            {
              path: "demand",
              element: <Demand />,
            },
            {
              path: "expense",
              element: <div>Frais</div>,
            },
            {
              path: "absence",
              element: <div>Absences</div>,
            },
            {
              path: "file",
              element: <div>Documents</div>,
            },
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
