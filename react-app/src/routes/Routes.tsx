import { useAuth } from "@/hooks/useAuth.tsx";
import { LoginForm } from "@/pages/auth/LoginForm.tsx";
import { ProtectedRoute } from "@/routes/ProtectedRoute.tsx";
import {
  createBrowserRouter,
  defer,
  RouterProvider,
  useRouteError,
} from "react-router-dom";
import { Navbar } from "@/components/navigation/Navbar.tsx";
import { User, Users } from "@/pages/user/Users.tsx";
import { AuthTokens } from "@/type/context/authTokens.tsx";

export const Routes = () => {
  const { token } = useAuth() as AuthTokens;
  const publicRoutes = [
    {
      path: "/login",
      element: (
        <div className="grid h-dvh w-dvw place-items-center bg-zinc-50 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100">
          <LoginForm />
        </div>
      ),
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
                  loader: () => {
                    const users = fetch("http://localhost:5000/api/user", {
                      headers: { Authorization: `Bearer ${token.accessToken}` },
                    }).then((response) => response.json());
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
              path: "contact",
              element: <div>Contact</div>,
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
  return (
    <>
      <h1>Une erreur est survenue</h1>
      <p>{error?.error?.toString() ?? error?.toString()}</p>
    </>
  );
}
