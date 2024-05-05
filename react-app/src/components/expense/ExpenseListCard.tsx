import { Card, CardContent } from "@/components/ui/card.tsx";
import {
  ExpenseList,
  ExpenseStatus,
  ExpenseType,
} from "@/models/ExpenseModel.ts";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { MdOutlineEuroSymbol } from "react-icons/md";
import { FaBed, FaCar, FaUtensils } from "react-icons/fa";

export function ExpenseListCard(props: any) {
  const expense: ExpenseList =
    props.expense ||
    new ExpenseList(
      ExpenseType.COMPENSATION,
      100,
      "placeholder",
      new Date(),
      new Date(),
      ExpenseStatus.WAITING,
    );
  const type: ExpenseType = expense.type;
  const status: ExpenseStatus = expense.status;
  let icon;
  let typeText: string;
  let statusText: string;
  let statusStyle: string;
  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  switch (type) {
    case ExpenseType.COMPENSATION:
      icon = <MdOutlineEuroSymbol className="size-10" />;
      typeText = "Indemnités";
      break;
    case ExpenseType.TRAVEL:
      icon = <FaCar className="size-10" />;
      typeText = "Déplacement";
      break;
    case ExpenseType.FOOD:
      icon = <FaUtensils className="size-10" />;
      typeText = "Restauration";
      break;
    case ExpenseType.HOUSING:
      icon = <FaBed className="size-10" />;
      typeText = "Hébergement";
      break;
  }

  switch (status) {
    case ExpenseStatus.WAITING:
      statusText = "En Attente";
      statusStyle =
        "h-fit w-fit rounded dark:bg-amber-200 bg-amber-300 dark:bg-opacity-20 bg-opacity-40 px-2 dark:text-yellow-400 text-yellow-700";
      break;
    case ExpenseStatus.REFUNDED:
      statusText = "Remboursé";
      statusStyle =
        "h-fit w-fit rounded bg-green-400 bg-opacity-30 px-2 text-green-700 dark:bg-green-300 dark:text-green-400";
      break;
    case ExpenseStatus.NOT_REFUNDED:
      statusText = "Non Remboursé";
      statusStyle =
        "h-fit w-fit rounded bg-red-400 bg-opacity-30 px-2 text-red-700 dark:bg-red-500 dark:bg-opacity-15 dark:text-red-500";
      break;
  }
  return (
    <>
      <Card>
        <CardContent className="p-2">
          <div className="flex w-full items-center">
            <div className="mx-4 w-10">{icon}</div>
            <div className="grid w-full grid-cols-4 items-center">
              <div className="grid grid-rows-2 gap-2">
                <div>{typeText}</div>
                <div>
                  {expense.createdAt.toLocaleDateString("fr-FR", dateOptions)}
                </div>
              </div>
              <div>{expense.amount}€</div>
              <div>
                {expense.facturationDate.toLocaleDateString(
                  "fr-FR",
                  dateOptions,
                )}
              </div>
              <div className="">
                <div className={statusStyle}>{statusText}</div>
              </div>
            </div>
            <div className="w-10 px-4">
              <DotsVerticalIcon className="size-10" />
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
