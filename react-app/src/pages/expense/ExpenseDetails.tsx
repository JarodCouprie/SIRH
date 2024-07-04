import { MonthlyExpenseDetails } from "@/components/expense/MonthlyExpenseDetails.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card.tsx";

import { useEffect, useState } from "react";
import {
  ExpenseStatus,
  ExpenseType,
  selectedTypeEnum,
} from "@/models/ExpenseModel.ts";
import { customFetcher } from "@/helper/fetchInstance.ts";
import { undefined } from "zod";
import { ArrowLeftIcon } from "@radix-ui/react-icons";

export function ExpenseDetails() {
  const navigate = useNavigate();
  const handleGoBackToList = () => {
    navigate("/expense");
  };
  const [expense, setExpense] = useState({
    id: 0,
    type: ExpenseType.TRAVEL,
    amount: "",
    motivation: "",
    createdAt: new Date(),
    facturationDate: new Date(),
    status: ExpenseStatus.WAITING,
  });
  const { id } = useParams();

  let method: string;

  const convertFromStringToExpenseStatusEnum = (target: string) => {
    return ExpenseStatus[target as keyof typeof ExpenseStatus];
  };

  const convertFromStringToExpenseTypeEnum = (target: string) => {
    return selectedTypeEnum[target as keyof typeof selectedTypeEnum];
  };

  const getTargetExpense = async () => {
    await customFetcher("http://localhost:5000/api/expense/" + id).then(
      (response) => {
        if (response.response.status !== 200) {
          return;
        }
        const facturationDate: Date = new Date(
          response.data.data.facturationDate.split("T")[0],
        );
        const creartedAt: Date = new Date(
          response.data.data.createdAt.split("T")[0],
        );
        setExpense({
          id: response.data.data.id,
          type: convertFromStringToExpenseTypeEnum(response.data.data.type),
          amount: response.data.data.amount,
          motivation: response.data.data.motivation,
          facturationDate: facturationDate,
          createdAt: creartedAt,
          status: convertFromStringToExpenseStatusEnum(
            response.data.data.status,
          ),
        });
      },
    );
  };

  useEffect(() => {
    if (id != undefined) {
      method = "PUT";
      getTargetExpense();
    } else method = "POST";
  }, []);

  const handleEdit = () => {
    navigate("/expense/edit/" + expense.id);
  };

  return (
    <>
      <div className="flex justify-between py-4">
        <Button onClick={handleGoBackToList} variant="link">
          <ArrowLeftIcon className="mr-2 h-4 w-4" />
          <span>Frais</span>
        </Button>
      </div>
      <MonthlyExpenseDetails />
      <div className="flex w-full flex-col gap-5 py-4">
        <Card>
          <CardContent className="flex flex-col p-4">
            <div className="rounded border-b border-gray-300/50 p-4 dark:border-gray-700/50">
              <div className="font-bold">Type</div>
              <div className="text-xl">{expense.type}</div>
            </div>
            <div className="rounded border-b border-gray-300/50 p-4 dark:border-gray-700/50">
              <div className="font-bold">Montant</div>
              <div className="text-xl">{expense.amount}€</div>
            </div>
            <div className="rounded border-b border-gray-300/50 p-4 dark:border-gray-700/50">
              <div className="font-bold">Description</div>
              <div className="flex flex-wrap text-xl">{expense.motivation}</div>
            </div>
            <div className="rounded border-b border-gray-300/50 p-4 dark:border-gray-700/50">
              <div className="font-bold">Date de facturation</div>
              <div className="text-xl">
                {expense.facturationDate.toLocaleDateString()}
              </div>
            </div>
            <div className="rounded border-b border-gray-300/50 p-4 dark:border-gray-700/50">
              <div className="font-bold">Date de création</div>
              <div className="text-xl">
                {expense.createdAt.toLocaleDateString()}
              </div>
            </div>
            <div className="rounded border-gray-300/50 p-4 dark:border-gray-700/50">
              <div className="font-bold">Status</div>
              <div className="text-xl">{expense.status}</div>
            </div>
          </CardContent>
        </Card>
        <div className="flex flex-row justify-end gap-5">
          <Button variant={"ghost"} className="text-lg">
            {" "}
            Supprimer{" "}
          </Button>
          <Button
            variant={"callToAction"}
            className="text-lg"
            onClick={handleEdit}
          >
            {" "}
            Modifier{" "}
          </Button>
        </div>
      </div>
    </>
  );
}
