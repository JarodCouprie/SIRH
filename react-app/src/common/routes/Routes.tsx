import { useAuth } from "@/common/hooks/useAuth.ts";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  useRouteError,
} from "react-router-dom";
import { AuthTokens } from "@/common/type/context/auth-tokens.type.ts";
import { toast } from "sonner";
import NotFound from "@/modules/error/NotFound.tsx";
import { Root } from "@/components/navigation/Root.tsx";
import { useCurrentUser } from "@/common/hooks/useCurrentUser.ts";
import { RoleEnum } from "@/common/enum/Role.enum.js";
import { LoginForm } from "@/modules/auth/LoginForm.js";
import { ProtectedRoutes } from "@/common/routes/ProtectedRoutes.js";
import { dashboardRoutes } from "@/common/routes/DashboardRoutes.js";
import { organisationRoutes } from "@/common/routes/OrganisationRoutes.js";
import { demandRoutes } from "@/common/routes/DemandRoutes.js";
import { expenseRoutes } from "@/common/routes/ExpenseRoutes.js";
import { userRoutes } from "@/common/routes/UserRoutes.js";
import { profileRoutes } from "@/common/routes/ProfileRoutes.js";

export const Routes = () => {
  const { token } = useAuth() as AuthTokens;
  const { currentUser } = useCurrentUser();
  const authorisedRoles = [RoleEnum.ADMIN, RoleEnum.HR];
  const userHasRequiredRoles = currentUser.roles.some((role) =>
    authorisedRoles?.includes(role),
  );
  const childrenRoutes = [
    dashboardRoutes,
    organisationRoutes,
    demandRoutes,
    expenseRoutes,
    userRoutes,
    profileRoutes,
  ];

  if (currentUser.id && !userHasRequiredRoles) {
    const userRoutesIndex = childrenRoutes.indexOf(userRoutes);
    const organisationRoutesIndex = childrenRoutes.indexOf(organisationRoutes);
    childrenRoutes.splice(userRoutesIndex, 1);
    childrenRoutes.splice(organisationRoutesIndex, 1);
  }

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
          children: childrenRoutes,
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
