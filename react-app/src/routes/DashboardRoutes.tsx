import { Dashboard } from "@/pages/dashboard/Dashboard.tsx";

export const dashboardRoutes = {
  path: "",
  children: [{ path: "", element: <Dashboard /> }],
};
