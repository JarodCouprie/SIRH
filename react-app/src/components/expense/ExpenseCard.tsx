import { Card, CardContent, CardDescription } from "@/components/ui/card.tsx";
import { MdOutlineCancel, MdOutlineEuroSymbol } from "react-icons/md";
import { FaHourglassStart, FaRegCheckCircle } from "react-icons/fa";

export function ExpenseCard(props: any) {
  const type: ExpenseCardType = props.type || ExpenseCardType.EXPENSE;
  const totalMoney: number = props.money || 0;
  const invoiceNumber: number = props.invoice || 0;
  let invoiceText = "factures";

  if (invoiceNumber > 1) invoiceText = "factures";
  else invoiceText = "facture";

  let icon;
  let CardDesc: string = "";

  switch (type) {
    case ExpenseCardType.EXPENSE:
      CardDesc = "Frais du mois";
      icon = <MdOutlineEuroSymbol className="size-10" />;
      break;
    case ExpenseCardType.WAITING:
      CardDesc = "En Attente";
      icon = (
        <FaHourglassStart className="size-9 text-yellow-500 dark:text-yellow-200" />
      );
      break;
    case ExpenseCardType.REFUNDED:
      CardDesc = "Remboursés";
      icon = <FaRegCheckCircle className="size-10 text-green-500" />;
      break;
    case ExpenseCardType.NON_REFUNDED:
      CardDesc = "Non Remboursés";
      icon = <MdOutlineCancel className="size-10 text-red-600" />;
      break;
  }
  return (
    <Card>
      <CardContent className="flex w-fit flex-row px-4 py-1">
        <div className="p-2">{icon}</div>
        <div className="p-2">
          <CardDescription className=""> {CardDesc} </CardDescription>
          <div className="text-xl font-bold">{totalMoney.toFixed(2)}€</div>
          <div className="text-xs">
            {invoiceNumber} {invoiceText}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export enum ExpenseCardType {
  "EXPENSE" = "EXPENSE",
  "REFUNDED" = "REFUNDED",
  "NON_REFUNDED" = "NON_REFUNDED",
  "WAITING" = "WAITING",
}
