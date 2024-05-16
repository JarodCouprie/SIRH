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
import {
  ExpenseAmountDateAndStatus,
  ExpenseCardModel,
  ExpenseList,
  ExpenseStatus,
} from "@/models/ExpenseModel.ts";
import { ExpenseListCard } from "@/components/expense/ExpenseListCard.tsx";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx";
import { Label } from "@/components/ui/label";
import { CaretLeftIcon, CaretRightIcon } from "@radix-ui/react-icons";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function Expense() {
  const [selectedType, setSelectedType] = useState(selectedTypeEnum.ALL);
  const [expenses, setExpenses] = useState<ExpenseList[]>([]);
  const [expensesCount, setExpensesCount] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [limit, setLimit] = useState(5);
  const [expensesAmountDateAndStatus, setexpensesAmountDateAndStatus] =
    useState<ExpenseAmountDateAndStatus[]>([]);
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
  const fetchExpenses = async () => {
    if (selectedType == selectedTypeEnum.ALL) {
      await customFetcher(
        "http://localhost:5000/api/expense/list?" +
          new URLSearchParams({
            offset: (limit * (pageNumber - 1)).toString(),
            limit: limit.toString(),
          }).toString(),
      ).then((response) => {
        if (response.response.status !== 200) {
          return;
        }
        setExpenses(response.data.data);
      });
    } else {
      await customFetcher(
        "http://localhost:5000/api/expense/list?" +
          new URLSearchParams({
            offset: (limit * (pageNumber - 1)).toString(),
            limit: limit.toString(),
            type: selectedType,
          }).toString(),
      ).then((response) => {
        if (response.response.status !== 200) {
          return;
        }
        setExpenses(response.data.data);
      });
    }
  };

  const fetchExpenseCount = async () => {
    await customFetcher(
      "http://localhost:5000/api/expense/count?" +
        new URLSearchParams({
          type: selectedType,
        }).toString(),
    ).then((response) => {
      if (response.response.status !== 200) {
        return;
      }
      setExpensesCount(response.data.data);
    });
  };

  const fetchExpensesAmountDateAndStatus = async () => {
    await customFetcher(
      "http://localhost:5000/api/expense/amount-date-and-status-by-month?" +
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
    fetchExpenses().then();
    fetchExpenseCount().then();
  }, [pageNumber, selectedType, limit]);

  useEffect(() => {
    fetchExpensesAmountDateAndStatus().then();
  }, []);

  useEffect(() => {
    if (expensesAmountDateAndStatus.length == 0) return;
    let monthlyAmount = 0;
    let monthlyInvoiceAmount = 0;
    let waitingAmount = 0;
    let waitingInvoiceAmount = 0;
    let refundedAmount = 0;
    let refundedInvoiceAmount = 0;
    let notRefundedAmount = 0;
    let notRefundedInvoiceAmount = 0;
    expensesAmountDateAndStatus.forEach((row) => {
      let rowDate: Date = new Date(row.facturationDate);
      let todayDate: Date = new Date();
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
  function maxValue() {
    let maxValue = limit * (pageNumber - 1) + limit;
    if (maxValue > expensesCount) maxValue = expensesCount;
    return maxValue;
  }

  return (
    <>
      <div className="flex justify-between py-4">
        <div className="max-[300px]:text-xl min-[300px]:text-2xl"> Frais</div>
        <Button variant="callToAction"> Demande de remboursement </Button>
      </div>
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
      <div className="border-b-2 pt-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <button
                onClick={() => {
                  setSelectedType(selectedTypeEnum.ALL);
                  setPageNumber(1);
                }}
                className="cursor-pointer border-indigo-700  hover:text-indigo-700 dark:border-indigo-400 dark:hover:text-indigo-400"
              >
                Général
              </button>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <button
                onClick={() => {
                  setSelectedType(selectedTypeEnum.TRAVEL);
                  setPageNumber(1);
                }}
                className="cursor-pointer border-indigo-700  hover:text-indigo-700 dark:border-indigo-400 dark:hover:text-indigo-400"
              >
                Déplacement
              </button>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <button
                onClick={() => {
                  setSelectedType(selectedTypeEnum.COMPENSATION);
                  setPageNumber(1);
                }}
                className="cursor-pointer border-indigo-700  hover:text-indigo-700 dark:border-indigo-400 dark:hover:text-indigo-400"
              >
                Indemnités
              </button>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <button
                onClick={() => {
                  setSelectedType(selectedTypeEnum.HOUSING);
                  setPageNumber(1);
                }}
                className="cursor-pointer border-indigo-700 hover:text-indigo-700 dark:border-indigo-400 dark:hover:text-indigo-400"
              >
                Hébergement
              </button>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <button
                onClick={() => {
                  setSelectedType(selectedTypeEnum.FOOD);
                  setPageNumber(1);
                }}
                className="cursor-pointer border-indigo-700 hover:text-indigo-700 dark:border-indigo-400 dark:hover:text-indigo-400"
              >
                Restauration
              </button>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="py-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead />
              <TableHead className="text-left"> Type de demande </TableHead>
              <TableHead className="text-left"> Frais </TableHead>
              <TableHead className="text-left"> Date de facturation </TableHead>
              <TableHead className="text-left"> Status </TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {expenses.map((expense) => (
              <ExpenseListCard expense={expense} />
            ))}
          </TableBody>
        </Table>
        <div className="flex w-full justify-between py-2">
          <div className="flex items-center gap-2">
            <Label>Demande de frais par page</Label>
            <Select
              onValueChange={(value) => setLimit(parseInt(value))}
              defaultValue={limit.toString()}
            >
              <SelectTrigger className="w-fit">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-950 dark:text-gray-100">
              {`${limit * (pageNumber - 1) + 1} - ${maxValue()} sur ${expensesCount}`}
            </span>
            <Button
              variant="ghost"
              onClick={() => {
                setPageNumber(pageNumber - 1);
              }}
              disabled={pageNumber === 1}
            >
              <CaretLeftIcon />
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                setPageNumber(pageNumber + 1);
              }}
              disabled={limit * pageNumber >= expensesCount}
            >
              <CaretRightIcon />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

enum selectedTypeEnum {
  "ALL" = "ALL",
  TRAVEL = "TRAVEL",
  COMPENSATION = "COMPENSATION",
  FOOD = "FOOD",
  HOUSING = "HOUSING",
}
