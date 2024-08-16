import { Organisation } from "@/modules/organisation/Organisation.tsx";
import { AgencyCreate } from "@/modules/organisation/pages/AgencyCreate.js";
import { Agency } from "@/modules/organisation/pages/Agency.js";
import { AgencyDepartmentCreate } from "@/modules/organisation/components/service/agencyDepartmentCreate.js";
import { AgencyTeamCreate } from "@/modules/organisation/components/service/agencyTeamCreate.js";

export const organisationRoutes = {
  path: "organisation",
  children: [
    {
      path: "",
      children: [
        {
          path: "",
          element: <Organisation />,
        },
        {
          path: "agency/create",
          element: <AgencyCreate />,
        },
        {
          path: "agency/:id",
          children: [
            {
              path: "",
              element: <Agency />,
            },
            {
              path: "service/create",
              element: <AgencyDepartmentCreate />,
            },
            {
              path: "team/create",
              element: <AgencyTeamCreate />,
            },
          ],
        },
      ],
    },
  ],
};
