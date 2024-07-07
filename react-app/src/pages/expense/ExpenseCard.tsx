import { Card, CardContent, CardDescription } from "@/components/ui/card.tsx";
import { MdOutlineCancel, MdOutlineEuroSymbol } from "react-icons/md";
import { FaHourglassStart, FaRegCheckCircle } from "react-icons/fa";
import { ExpenseCardModel } from "@/models/ExpenseModel.ts";

export function ExpenseCard(props: any) {
  const type: ExpenseCardType = props.type || ExpenseCardType.EXPENSE;
  const ExpenseCardData = props.data || new ExpenseCardModel(0, 0);
  const totalMoney: number = ExpenseCardData.amount;
  const invoiceNumber: number = ExpenseCardData.invoicesAmount;
  let invoiceText = "factures";

  if (invoiceNumber > 1) invoiceText = "factures";
  else invoiceText = "facture";

  let icon;
  let cardDesc: string = "";

  switch (type) {
    case ExpenseCardType.EXPENSE:
      cardDesc = "Total du mois";
      icon = <MdOutlineEuroSymbol className="size-10" />;
      break;
    case ExpenseCardType.WAITING:
      cardDesc = "En Attente";
      icon = (
        <FaHourglassStart className="size-9 text-yellow-500 dark:text-yellow-200" />
      );
      break;
    case ExpenseCardType.REFUNDED:
      cardDesc = "Remboursés";
      icon = <FaRegCheckCircle className="size-10 text-green-500" />;
      break;
    case ExpenseCardType.NON_REFUNDED:
      cardDesc = "Non Remboursés";
      icon = <MdOutlineCancel className="size-10 text-red-600" />;
      break;
  }
  return (
    <Card>
      <CardContent className="flex w-fit flex-row px-4 py-1">
        <div className="p-2">{icon}</div>
        <div className="p-2">
          <CardDescription className=""> {cardDesc} </CardDescription>
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
