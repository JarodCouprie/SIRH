import { Users } from "@/modules/user/pages/Users.tsx";
import { User } from "@/modules/user/pages/User.tsx";
import { NewUser } from "@/modules/user/pages/NewUser.tsx";
import { UserDemandDetails } from "@/modules/user/components/demand/userDemandDetails.js";
import { UserExpenseDetails } from "@/modules/user/components/expense/userExpenseDetails.js";

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
          element: <UserExpenseDetails />,
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
