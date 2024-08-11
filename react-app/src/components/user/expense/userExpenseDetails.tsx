import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { Button } from "@/components/ui/button.js";
import { customFetcher } from "@/helper/fetchInstance.js";
import { useEffect, useState } from "react";
import { ExpenseList } from "@/models/ExpenseModel.js";

export const UserExpenseDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state.user;
  const { expenseId } = useParams<{ expenseId: string }>();

  const [expense, setExpense] = useState(new ExpenseList());

  const handleClick = () => {
    if (location.state?.previousRoute) {
      navigate(location.state.previousRoute);
    } else {
      navigate("/user");
    }
  };

  const fetchDemand = async () => {
    const { data } = await customFetcher(
      `http://localhost:5000/api/expense/${expenseId}`,
    );
    setExpense(data.data);
  };

  useEffect(() => {
    fetchDemand().then();
  }, []);

  return (
    <div className="flex flex-col items-start gap-4 ">
      <Button variant="link" onClick={handleClick}>
        <FaArrowLeft className="mr-2" />
        <div>
          {user ? `${user?.firstname} ${user?.lastname}` : "Utilisateur"}
        </div>
      </Button>
      Expense details from admin
      {expense?.id}
    </div>
  );
};
