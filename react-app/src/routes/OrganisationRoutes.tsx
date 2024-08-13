import { Organisation } from "@/pages/organisation/Organisation.tsx";
import { AgencyCreate } from "@/pages/organisation/agency/AgencyCreate.js";
import { Agency } from "@/pages/organisation/agency/Agency.js";

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
