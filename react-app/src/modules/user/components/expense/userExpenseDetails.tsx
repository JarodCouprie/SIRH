import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { Button } from "@/components/ui/button.js";
import { customFetcher } from "@/common/helper/fetchInstance.js";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.js";
import { FieldRow } from "@/modules/user/components/fieldRow.js";
import { dateOptions, dateTimeOptions } from "@/common/helper/DateHelper.js";
import { MdOutlineVisibility } from "react-icons/md";
import {
  ExpenseList,
  ExpenseStatus,
  ExpenseType,
} from "@/models/ExpenseModel.js";
import { UserRejectExpense } from "@/modules/user/components/expense/userRejectExpense.js";
import { UserConfirmExpense } from "@/modules/user/components/expense/userConfirmExpense.js";
import { Badge } from "@/components/ui/badge.js";

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

  const translateAndDisplayExpenseTypeEnum = (enumToTranslate: ExpenseType) => {
    switch (enumToTranslate) {
      case ExpenseType.COMPENSATION:
        return "Indemnités";
      case ExpenseType.TRAVEL:
        return "Déplacement";
      case ExpenseType.HOUSING:
        return "Hébergement";
      case ExpenseType.FOOD:
        return "Restauration";
    }
  };

  const translateAndDisplayExpenseStatusEnum = (
    enumToTranslate: ExpenseStatus,
  ) => {
    switch (enumToTranslate) {
      case ExpenseStatus.WAITING:
        return (
          <Badge variant="waiting" className="text-xl">
            En attente
          </Badge>
        );
      case ExpenseStatus.REFUNDED:
        return (
          <Badge variant="accepted" className="text-xl">
            Remboursé
          </Badge>
        );
      case ExpenseStatus.NOT_REFUNDED:
        return (
          <Badge variant="denied" className="text-xl">
            Non remboursé
          </Badge>
        );
    }
  };

  useEffect(() => {
    fetchDemand().then();
  }, []);

  const getFileNameFromUrl = (url?: string) => {
    if (!url) {
      return "Aucun fichier";
    }
    return url?.split("/")?.pop()?.split("?")[0];
  };

  const handlePreviewFile = () => {
    window.open(expense.fileUrl, "_blank");
  };

  return (
    <div className="flex flex-col items-start gap-4">
      <div className="flex w-full flex-wrap justify-between gap-2">
        <Button variant="link" onClick={handleClick}>
          <FaArrowLeft className="mr-2" />
          <div>
            {user ? `${user?.firstname} ${user?.lastname}` : "Utilisateur"}
          </div>
        </Button>
        {expense.status === ExpenseStatus.WAITING && (
          <div className="flex gap-2">
            <UserRejectExpense
              expense={expense}
              refreshExpenses={() => fetchDemand()}
            />
            <UserConfirmExpense
              expense={expense}
              refreshExpenses={() => fetchDemand()}
            />
          </div>
        )}
      </div>
      <div className="flex w-full gap-4 max-md:flex-col">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Détails de la demande</CardTitle>
          </CardHeader>
          <CardContent className="divide-y divide-slate-300 dark:divide-slate-700">
            <FieldRow title="Type">
              {translateAndDisplayExpenseTypeEnum(expense.type)}
            </FieldRow>
            <FieldRow title="Description">{expense.motivation}</FieldRow>
            <FieldRow title="Date de création">
              {new Date(expense.created_at).toLocaleDateString(
                "fr-FR",
                dateTimeOptions,
              )}
            </FieldRow>
            <FieldRow title="Date de facturation">
              <span className="font-normal"> au </span>
              <span>
                {new Date(expense.facturation_date).toLocaleDateString(
                  "fr-FR",
                  dateOptions,
                )}
              </span>
            </FieldRow>
            <FieldRow title="Montant">{expense.amount}</FieldRow>
            <FieldRow title="Fichier">
              <div className="flex flex-wrap gap-2">
                {getFileNameFromUrl(expense.fileUrl)}
                {expense.fileUrl && (
                  <Button variant="default" onClick={handlePreviewFile}>
                    <MdOutlineVisibility className="mr-2 size-6" />
                    Voir le document
                  </Button>
                )}
              </div>
            </FieldRow>
          </CardContent>
        </Card>
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Validation de la demande</CardTitle>
          </CardHeader>
          <CardContent className="divide-y divide-slate-300 dark:divide-slate-700">
            <FieldRow title="Statut">
              {translateAndDisplayExpenseStatusEnum(expense.status)}
            </FieldRow>
            {expense.validated_at && (
              <FieldRow title="Date de validation">
                {new Date(expense.validated_at).toLocaleDateString(
                  "fr-FR",
                  dateOptions,
                )}
              </FieldRow>
            )}
            {(expense.validator_lastname || expense.validator_lastname) && (
              <FieldRow title="Validé par">
                {expense.validator_firstname} {expense.validator_lastname}
              </FieldRow>
            )}
            {expense.justification && (
              <FieldRow title="Justification">{expense.justification}</FieldRow>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
