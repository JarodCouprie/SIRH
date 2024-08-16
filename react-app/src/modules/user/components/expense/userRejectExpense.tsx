import { ExpenseList } from "@/models/ExpenseModel.js";
import { useState } from "react";
import { customFetcher } from "@/common/helper/fetchInstance.js";
import { toast } from "sonner";
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
import { Input } from "@/components/ui/input.js";

interface RefuseExpenseProps {
  expense: ExpenseList;
  refreshExpenses: () => void;
}

export function UserRejectExpense({
  expense,
  refreshExpenses,
}: RefuseExpenseProps) {
  const [justification, setJustification] = useState("");

  const handleRefuse = async () => {
    try {
      const response = await customFetcher(
        `http://localhost:5000/api/expense/status/invalidation/${expense.id}`,
        {
          method: "PUT",
          body: JSON.stringify({ justification }),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (response.response.status === 200) {
        toast.message(`Demande de frais numéro ${expense.id} rejetée.`);
        refreshExpenses();
      }
    } catch (error) {
      toast.message("Erreur lors du rejet de la demande de frais.");
    }
  };

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline">
            <span className="text-red-600">Refuser</span>
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Êtes vous vraiment sûr?</AlertDialogTitle>
            <AlertDialogDescription>
              Vous êtes sur le point de refuser la demande de remboursement.
            </AlertDialogDescription>
            <label className="text-indigo-50">Justification :</label>
            <Input
              type="text"
              className="text-indigo-50"
              value={justification}
              onChange={(e) => setJustification(e.target.value)}
            ></Input>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction type="submit" onClick={handleRefuse}>
              Refuser
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
