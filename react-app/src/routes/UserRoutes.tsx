import { Users } from "@/pages/user/Users.tsx";
import { User } from "@/pages/user/User.tsx";
import { NewUser } from "@/pages/user/NewUser.tsx";
import { UserDemandDetails } from "@/components/user/demand/userDemandDetails.js";
import { UserExpenseDetails } from "@/components/user/expense/userExpenseDetails.js";

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
