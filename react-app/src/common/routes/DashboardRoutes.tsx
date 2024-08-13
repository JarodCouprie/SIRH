import { Dashboard } from "@/modules/dashboard/Dashboard.tsx";

export const dashboardRoutes = {
  path: "",
  children: [{ path: "", element: <Dashboard /> }],
};
