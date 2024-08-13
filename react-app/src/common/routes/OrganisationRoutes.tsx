import { Organisation } from "@/modules/organisation/Organisation.tsx";
import { AgencyCreate } from "@/modules/organisation/pages/AgencyCreate.js";
import { Agency } from "@/modules/organisation/pages/Agency.js";

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
          ],
        },
      ],
    },
  ],
};
