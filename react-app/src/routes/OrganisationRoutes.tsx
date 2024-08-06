import { Organisation } from "@/pages/Organisation.tsx";

export const organisationRoutes = {
  path: "organisation",
  children: [
    {
      path: "",
      element: <Organisation />,
    },
  ],
};
