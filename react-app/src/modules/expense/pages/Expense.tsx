import { Button } from "@/components/ui/button.js";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
} from "@/components/ui/breadcrumb.tsx";
import { useEffect, useState } from "react";
import { ExpenseList, selectedTypeEnum } from "@/models/ExpenseModel.ts";
import { ExpenseListCard } from "@/modules/expense/components/ExpenseListCard.tsx";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx";
import { Label } from "@/components/ui/label.js";
import { CaretLeftIcon, CaretRightIcon, PlusIcon } from "@radix-ui/react-icons";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.js";
import { MonthlyExpenseDetails } from "@/modules/expense/components/MonthlyExpenseDetails.tsx";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { MainRoot } from "@/components/navigation/MainRoot.tsx";
import { customFetcher } from "@/common/helper/fetchInstance.js";
import { Card } from "@/components/ui/card.js";

export function Expense() {
  const [selectedType, setSelectedType] = useState(selectedTypeEnum.ALL);
  const [expenses, setExpenses] = useState<ExpenseList[]>([]);
  const [expensesCount, setExpensesCount] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [limit, setLimit] = useState(5);
  const navigate = useNavigate();

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
          toast.error("Une erreur est survenue");
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
          toast.error("Une erreur est survenue");
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
        toast.error("Une erreur est survenue");
        return;
      }
      setExpensesCount(response.data.data);
    });
  };

  useEffect(() => {
    fetchExpenses().then();
    fetchExpenseCount().then();
  }, [pageNumber, selectedType, limit]);

  function maxValue() {
    let maxValue = limit * (pageNumber - 1) + limit;
    if (maxValue > expensesCount) maxValue = expensesCount;
    return maxValue;
  }

  const handleRedirection = () => {
    navigate("create");
  };

  const newExpense = (
    <Button variant="callToAction" onClick={handleRedirection}>
      <PlusIcon className="mr-2 size-4" />
      Créer une demande
    </Button>
  );

  return (
    <MainRoot title="Frais" action={newExpense}>
      <MonthlyExpenseDetails />
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
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead />
                <TableHead className="text-left"> Type de demande </TableHead>
                <TableHead className="text-left"> Frais </TableHead>
                <TableHead className="text-left">Date de facturation</TableHead>
                <TableHead className="text-left"> Status </TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {expenses.map((expense) => (
                <ExpenseListCard expense={expense} key={expense.id} />
              ))}
            </TableBody>
          </Table>
        </Card>
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
              {`${expenses.length === 0 ? 0 : limit * (pageNumber - 1) + 1} - ${maxValue()} sur ${expensesCount}`}
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
    </MainRoot>
  );
}
