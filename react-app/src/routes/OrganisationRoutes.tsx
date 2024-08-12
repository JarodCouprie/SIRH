import { Organisation } from "@/pages/organisation/Organisation.tsx";

export const organisationRoutes = {
  path: "organisation",
  children: [
    {
      path: "",
      element: <Organisation />,
    },
  ],
};
