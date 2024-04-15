import { NavLink, Outlet, useNavigation } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button.tsx";
import { HomeIcon, PersonIcon, RocketIcon } from "@radix-ui/react-icons";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { UserMenu } from "@/components/navigation/UserMenu.tsx";

export function Navbar() {
  const { state } = useNavigation();
  return (
    <div className="flex h-dvh w-dvw bg-zinc-950">
      <aside className="flex w-80 max-w-80 flex-col justify-between gap-4 bg-zinc-950">
        <div className="flex flex-col">
          <h1 className="border-b border-zinc-700 p-4 text-center text-lg font-bold text-zinc-100">
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
              <HomeIcon className="mr-4 h-4 w-4" />
              Dashboard
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
              Utilisateurs
            </NavLink>
            <NavLink
              to={"/contact"}
              className={({ isActive }) =>
                isActive
                  ? buttonVariants({ variant: "navActive", size: "nav" })
                  : buttonVariants({ variant: "navNotActive", size: "nav" })
              }
            >
              <RocketIcon className="mr-4 h-4 w-4" />
              Support
            </NavLink>
          </div>
        </div>
        <UserMenu />
      </aside>
      <main className="w-full bg-zinc-50 p-4 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100">
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
