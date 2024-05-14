import {
  ExpenseCard,
  ExpenseCardType,
} from "@/components/expense/ExpenseCard.tsx";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
} from "@/components/ui/breadcrumb.tsx";
import { customFetcher } from "@/helper/fetchInstance.ts";
import { useEffect, useState } from "react";
import { ExpenseList } from "@/models/ExpenseModel.ts";
import { ExpenseListCard } from "@/components/expense/ExpenseListCard.tsx";
import { Card, CardContent } from "@/components/ui/card.tsx";

export function Expense() {
  let selectedType: selectedTypeEnum = selectedTypeEnum.ALL;
  const [expense, setExpense] = useState<ExpenseList[]>([]);

  const fetchExpense = async () => {
    await customFetcher(
      "http://localhost:5000/api/expense/list?" +
        new URLSearchParams({ offset: "0", limit: "10" }).toString(),
    ).then((response) => {
      if (response.response.status !== 200) {
        return;
      }
      setExpense(response.data.data);
    });
  };

  useEffect(() => {
    fetchExpense().then();
  }, []);
  console.log(expense);

  return (
    <>
      <div className="flex justify-between py-4">
        <div className="max-[300px]:text-xl min-[300px]:text-2xl"> Frais</div>
        <Button variant="callToAction"> Demande de remboursement </Button>
      </div>
      <div className="grid gap-2 max-sm:grid-rows-4 sm:max-lg:grid-cols-2 sm:max-lg:grid-rows-2 lg:grid-cols-4">
        <ExpenseCard type={ExpenseCardType.EXPENSE} money={2000} invoice={31} />
        <ExpenseCard type={ExpenseCardType.REFUNDED} money={1000} invoice={5} />
        <ExpenseCard
          type={ExpenseCardType.NON_REFUNDED}
          money={567}
          invoice={8}
        />
        <ExpenseCard type={ExpenseCardType.WAITING} money={44.99} invoice={1} />
      </div>
      <div className="border-b-2 pt-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <span className="cursor-pointer border-indigo-700  hover:text-indigo-700 dark:border-indigo-400 dark:hover:text-indigo-400">
                Général
              </span>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <span className="cursor-pointer border-indigo-700  hover:text-indigo-700 dark:border-indigo-400 dark:hover:text-indigo-400">
                Remboursés
              </span>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <span className="cursor-pointer border-indigo-700  hover:text-indigo-700 dark:border-indigo-400 dark:hover:text-indigo-400">
                Non Remboursés
              </span>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <span className="cursor-pointer border-indigo-700 hover:text-indigo-700 dark:border-indigo-400 dark:hover:text-indigo-400">
                En Attente
              </span>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="py-2">
        <Card className="my-2 rounded-md bg-gray-300">
          <CardContent className="p-1">
            <div className="text-md grid grid-cols-4 items-center font-medium">
              <div className="pl-20"> Demande </div>
              <div className="pl-10"> Montant </div>
              <div className="pl-4"> Date de facturation </div>
              <div> Statut </div>
            </div>
          </CardContent>
        </Card>
        <ExpenseListCard />
      </div>
    </>
  );
}
enum selectedTypeEnum {
  "ALL" = "ALL",
  "REFUNDED" = "REFUNDED",
  "NON_REFUNDED" = "NON_REFUNDED",
  "WAITING" = "WAITING",
}
