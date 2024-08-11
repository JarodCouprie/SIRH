import { Users } from "@/pages/user/Users.tsx";
import { User } from "@/pages/user/User.tsx";
import { NewUser } from "@/pages/user/NewUser.tsx";
import { UserDemandDetails } from "@/components/user/demand/userDemandDetails.js";

export const userRoutes = {
  path: "user",
  children: [
    {
      path: "",
      element: <Users />,
    },
    {
      path: ":id",
      children: [
        {
          path: "",
          element: <User />,
        },
        {
          path: "expense/:expenseId",
          element: <div>Hello</div>,
        },
        {
          path: "demand/:demandId",
          element: <UserDemandDetails />,
        },
      ],
    },
    {
      path: "new",
      element: <NewUser />,
    },
  ],
};
