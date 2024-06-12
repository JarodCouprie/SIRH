import { Users } from "@/pages/user/Users.tsx";
import { User } from "@/pages/user/User.tsx";
import { NewUser } from "@/pages/user/NewUser.tsx";

export const userRoutes = {
  path: "user",
  children: [
    {
      path: "",
      element: <Users />,
    },
    {
      path: ":id",
      element: <User />,
    },
    {
      path: "new",
      element: <NewUser />,
    },
  ],
};
