import { Demand } from "@/modules/demand/pages/Demand.tsx";
import { DemandDetail } from "@/modules/demand/pages/DemandDetail.tsx";
import { DemandEdit } from "@/modules/demand/pages/DemandEdit.tsx";
import { DemandCreate } from "@/modules/demand/pages/DemandCreate.tsx";

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
