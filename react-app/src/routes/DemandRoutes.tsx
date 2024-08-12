import { Demand } from "@/pages/demand/Demand.tsx";
import { DemandDetail } from "@/pages/demand/DemandDetail.tsx";
import { DemandEdit } from "@/pages/demand/DemandEdit.tsx";
import { DemandCreate } from "@/pages/demand/DemandCreate.tsx";

export const demandRoutes = {
  path: "demand",
  children: [
    {
      path: "",
      element: <Demand />,
    },
    {
      path: "create",
      element: <DemandCreate />,
    },
    {
      path: "detail/:id",
      element: <DemandDetail />,
    },
    {
      path: "edit/:id",
      element: <DemandEdit />,
    },
  ],
};
