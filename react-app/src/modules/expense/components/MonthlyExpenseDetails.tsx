import { useEffect, useState } from "react";
import {
  ExpenseAmountDateAndStatus,
  ExpenseCardModel,
  ExpenseStatus,
} from "@/models/ExpenseModel.ts";
import {
  ExpenseCard,
  ExpenseCardType,
} from "@/modules/expense/pages/ExpenseCard.js";
import { customFetcher } from "@/common/helper/fetchInstance.js";

export function MonthlyExpenseDetails() {
  const [expensesCardModelMonthly, setExpensesCardModelMonthly] = useState(
    new ExpenseCardModel(0, 0),
  );

  const [expensesCardModelRefunded, setExpensesCardModelRefunded] = useState(
    new ExpenseCardModel(0, 0),
  );

  const [expensesCardModelNotRefunded, setExpensesCardModelNotRefunded] =
    useState(new ExpenseCardModel(0, 0));

  const [expensesCardModelWaiting, setExpensesCardModelWaiting] = useState(
    new ExpenseCardModel(0, 0),
  );

  const [expensesAmountDateAndStatus, setexpensesAmountDateAndStatus] =
    useState<ExpenseAmountDateAndStatus[]>([]);

  const fetchExpensesAmountDateAndStatus = async () => {
    await customFetcher(
      "http://localhost:5000/api/expense/amount-date-and-status-by-date?" +
        new URLSearchParams({
          date: new Date().toString(),
        }).toString(),
    ).then((response) => {
      if (response.response.status !== 200) {
        return;
      }
      setexpensesAmountDateAndStatus(response.data.data);
    });
  };

  useEffect(() => {
    if (
      expensesAmountDateAndStatus == undefined ||
      expensesAmountDateAndStatus.length == 0
    )
      return;
    let monthlyAmount = 0;
    let monthlyInvoiceAmount = 0;
    let waitingAmount = 0;
    let waitingInvoiceAmount = 0;
    let refundedAmount = 0;
    let refundedInvoiceAmount = 0;
    let notRefundedAmount = 0;
    let notRefundedInvoiceAmount = 0;
    expensesAmountDateAndStatus.forEach((row) => {
      const rowDate: Date = new Date(row.facturation_date);
      const todayDate: Date = new Date();
      if (rowDate.getFullYear() + 1 != todayDate.getFullYear() + 1) return;

      monthlyAmount += row.amount;
      monthlyInvoiceAmount += 1;

      switch (row.status) {
        case ExpenseStatus.REFUNDED:
          refundedAmount += row.amount;
          refundedInvoiceAmount += 1;
          break;
        case ExpenseStatus.NOT_REFUNDED:
          notRefundedAmount += row.amount;
          notRefundedInvoiceAmount += 1;
          break;
        case ExpenseStatus.WAITING:
          waitingAmount += row.amount;
          waitingInvoiceAmount += 1;
          break;
      }
    });
    setExpensesCardModelMonthly(
      new ExpenseCardModel(monthlyAmount, monthlyInvoiceAmount),
    );
    setExpensesCardModelRefunded(
      new ExpenseCardModel(refundedAmount, refundedInvoiceAmount),
    );
    setExpensesCardModelNotRefunded(
      new ExpenseCardModel(notRefundedAmount, notRefundedInvoiceAmount),
    );
    setExpensesCardModelWaiting(
      new ExpenseCardModel(waitingAmount, waitingInvoiceAmount),
    );
  }, [expensesAmountDateAndStatus]);

  useEffect(() => {
    fetchExpensesAmountDateAndStatus().then();
  }, []);

  return (
    <>
      <div className="grid gap-2 max-sm:grid-rows-4 sm:max-lg:grid-cols-2 sm:max-lg:grid-rows-2 lg:grid-cols-4">
        <ExpenseCard
          type={ExpenseCardType.EXPENSE}
          data={expensesCardModelMonthly}
        />
        <ExpenseCard
          type={ExpenseCardType.REFUNDED}
          data={expensesCardModelRefunded}
        />
        <ExpenseCard
          type={ExpenseCardType.NON_REFUNDED}
          data={expensesCardModelNotRefunded}
        />
        <ExpenseCard
          type={ExpenseCardType.WAITING}
          data={expensesCardModelWaiting}
        />
      </div>
    </>
  );
}
