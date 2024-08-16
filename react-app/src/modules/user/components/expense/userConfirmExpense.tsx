import React from "react";
import { customFetcher } from "@/common/helper/fetchInstance.js";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog.js";
import { Button } from "@/components/ui/button.js";
import { ExpenseList } from "@/models/ExpenseModel.js";

interface UserConfirmDemandProps {
  expense: ExpenseList;
  refreshExpenses: () => void;
}

export const UserConfirmExpense: React.FC<UserConfirmDemandProps> = ({
  expense,
  refreshExpenses,
}) => {
  const handleConfirmExpenseClick = async () => {
    const { response } = await customFetcher(
      `http://localhost:5000/api/expense/status/validation/${expense.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (response.status === 200) {
      refreshExpenses();
    }
  };

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline" className="text-indigo-700">
            Accepter
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Vous êtes sûr ?</AlertDialogTitle>
            <AlertDialogDescription>
              Vous êtes sur le point de confirmer la demande de frais
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              type="submit"
              onClick={handleConfirmExpenseClick}
            >
              Accepter
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
