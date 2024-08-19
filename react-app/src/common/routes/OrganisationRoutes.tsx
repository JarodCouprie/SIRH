import { Organisation } from "@/modules/organisation/Organisation.tsx";
import { AgencyCreate } from "@/modules/organisation/pages/AgencyCreate.js";
import { Agency } from "@/modules/organisation/pages/Agency.js";
import { AgencyDepartmentCreate } from "@/modules/organisation/components/service/agencyDepartmentCreate.js";
import { AgencyTeamCreate } from "@/modules/organisation/components/team/agencyTeamCreate.js";
import { AgencyDepartmentDetails } from "@/modules/organisation/components/service/agencyDepartmentDetails.js";

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
          path: "agency/:id_agency",
          children: [
            {
              path: "",
              element: <Agency />,
            },
            {
              path: "service",
              children: [
                {
                  path: "create",
                  element: <AgencyDepartmentCreate />,
                },
                {
                  path: "details",
                  children: [
                    {
                      path: ":id_service",
                      children: [
                        {
                          path: "",
                          element: <AgencyDepartmentDetails />,
                        },
                        {
                          path: "team",
                          children: [
                            {
                              path: "create",
                              element: <AgencyTeamCreate />,
                            },
                            {
                              path: "details/:id_team",
                              element: <h1>In progress</h1>,
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
