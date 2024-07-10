import {
  ExpenseList,
  ExpenseStatus,
  ExpenseType,
} from "@/models/ExpenseModel.ts";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { MdOutlineEuroSymbol } from "react-icons/md";
import { FaBed, FaCar, FaUtensils } from "react-icons/fa";
import { TableCell, TableRow } from "@/components/ui/table.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { useNavigate } from "react-router-dom";

export function ExpenseListCard(props: any) {
  const expense: ExpenseList =
    props.expense ||
    new ExpenseList(
      "0",
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
  let statusBadge;
  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const navigate = useNavigate();

  switch (type) {
    case ExpenseType.COMPENSATION:
      icon = (
        <MdOutlineEuroSymbol className="size-8 text-black dark:text-slate-50" />
      );
      typeText = "Indemnités";
      break;
    case ExpenseType.TRAVEL:
      icon = <FaCar className="size-8 text-black dark:text-slate-50" />;
      typeText = "Déplacement";
      break;
    case ExpenseType.FOOD:
      icon = <FaUtensils className="size-7 text-black dark:text-slate-50" />;
      typeText = "Restauration";
      break;
    case ExpenseType.HOUSING:
      icon = <FaBed className="size-8 text-black dark:text-slate-50" />;
      typeText = "Hébergement";
      break;
  }

  switch (status) {
    case ExpenseStatus.WAITING:
      statusBadge = <Badge variant="waiting"> En attente </Badge>;
      break;
    case ExpenseStatus.REFUNDED:
      statusBadge = <Badge variant="accepted"> Remboursé </Badge>;
      break;
    case ExpenseStatus.NOT_REFUNDED:
      statusBadge = <Badge variant="denied"> Non remboursé </Badge>;
      break;
  }

  const handleDetailsDisplay = () => {
    navigate("details/" + expense.id);
  };

  return (
    <TableRow
      className="cursor-pointer rounded-md"
      onClick={handleDetailsDisplay}
    >
      <TableCell className="mx-4 w-10">{icon}</TableCell>
      <TableCell>
        <div>{typeText}</div>
        <div className="text-xs">
          {new Date(expense.created_at).toLocaleDateString(
            "fr-FR",
            dateOptions,
          )}
        </div>
      </TableCell>
      <TableCell className="text-left">{expense.amount.toFixed(2)}€</TableCell>
      <TableCell className="text-left">
        {new Date(expense.facturation_date).toLocaleDateString(
          "fr-FR",
          dateOptions,
        )}
      </TableCell>
      <TableCell className="text-left">{statusBadge}</TableCell>
      <TableCell className="w-10 px-4">
        <DotsVerticalIcon className="size-7 cursor-pointer" />
      </TableCell>
    </TableRow>
  );
}
