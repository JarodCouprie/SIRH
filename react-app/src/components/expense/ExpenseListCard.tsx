import { Card, CardContent } from "@/components/ui/card.tsx";
import {
  ExpenseList,
  ExpenseStatus,
  ExpenseType,
} from "@/models/ExpenseModel.ts";

export function ExpenseListCard(props: any) {
  const expense: ExpenseList = props.expense;

  return (
    <>
      <Card>
        <CardContent>test</CardContent>
      </Card>
    </>
  );
}
