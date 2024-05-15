import { Outlet, useNavigation } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { NavBar } from "@/components/navigation/Navbar.tsx";

export function Root() {
  const { state } = useNavigation();
  return (
    <div className="flex h-dvh w-dvw bg-gray-950">
      <NavBar />
      <main className="w-full overflow-y-auto bg-gray-100 p-4 dark:bg-gray-950">
        {state !== "loading" && <Outlet />}
        {state === "loading" && (
          <div className="space-y-2">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-[80%]" />
            <Skeleton className="h-6 w-[60%]" />
            <Skeleton className="h-4 w-[50%]" />
            <Skeleton className="h-4 w-[50%]" />
            <Skeleton className="h-4 w-[40%]" />
          </div>
        )}
      </main>
    </div>
  );
}
