import { NavLink, Outlet, useNavigation } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button.tsx";
import {
  BackpackIcon,
  CalendarIcon,
  DashboardIcon,
  FileIcon,
  PersonIcon,
  QuestionMarkIcon,
  ReaderIcon,
} from "@radix-ui/react-icons";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { UserMenu } from "@/components/navigation/UserMenu.tsx";

export function Navbar() {
  const { state } = useNavigation();
  return (
    <div className="flex h-dvh w-dvw bg-gray-950">
      <aside className="flex w-80 max-w-80 flex-col justify-between gap-4 bg-gray-900">
        <div className="flex flex-col">
          <h1 className="border-b border-gray-700 p-4 text-center text-lg font-bold text-gray-100">
            SIRH
          </h1>
          <div className="flex flex-col gap-2 p-4">
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                isActive
                  ? buttonVariants({ variant: "navActive", size: "nav" })
                  : buttonVariants({ variant: "navNotActive", size: "nav" })
              }
            >
              <DashboardIcon className="mr-4 h-4 w-4" />
              Dashboard
            </NavLink>
            <NavLink
              to={"/demand"}
              className={({ isActive }) =>
                isActive
                  ? buttonVariants({ variant: "navActive", size: "nav" })
                  : buttonVariants({ variant: "navNotActive", size: "nav" })
              }
            >
              <QuestionMarkIcon className="mr-4 h-4 w-4" />
              Demandes
            </NavLink>
            <NavLink
              to={"/expense"}
              className={({ isActive }) =>
                isActive
                  ? buttonVariants({ variant: "navActive", size: "nav" })
                  : buttonVariants({ variant: "navNotActive", size: "nav" })
              }
            >
              <ReaderIcon className="mr-4 h-4 w-4" />
              Frais
            </NavLink>
            <NavLink
              to={"/absence"}
              className={({ isActive }) =>
                isActive
                  ? buttonVariants({ variant: "navActive", size: "nav" })
                  : buttonVariants({ variant: "navNotActive", size: "nav" })
              }
            >
              <CalendarIcon className="mr-4 h-4 w-4" />
              Absences
            </NavLink>
            <NavLink
              to={"/file"}
              className={({ isActive }) =>
                isActive
                  ? buttonVariants({ variant: "navActive", size: "nav" })
                  : buttonVariants({ variant: "navNotActive", size: "nav" })
              }
            >
              <FileIcon className="mr-4 h-4 w-4" />
              Documents
            </NavLink>
            <NavLink
              to={"/organisation"}
              className={({ isActive }) =>
                isActive
                  ? buttonVariants({ variant: "navActive", size: "nav" })
                  : buttonVariants({ variant: "navNotActive", size: "nav" })
              }
            >
              <BackpackIcon className="mr-4 h-4 w-4" />
              Organisation
            </NavLink>
            <NavLink
              to={"/user"}
              className={({ isActive }) =>
                isActive
                  ? buttonVariants({ variant: "navActive", size: "nav" })
                  : buttonVariants({ variant: "navNotActive", size: "nav" })
              }
            >
              <PersonIcon className="mr-4 h-4 w-4" />
              Collaborateurs
            </NavLink>
          </div>
        </div>
        <UserMenu />
      </aside>
      <main className="w-full bg-gray-100 p-4 text-gray-950 dark:bg-gray-950 dark:text-gray-100">
        <Outlet />
        {state === "loading" && (
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        )}
      </main>
    </div>
  );
}
