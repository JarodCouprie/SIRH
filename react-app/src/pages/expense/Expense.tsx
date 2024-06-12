import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
} from "@/components/ui/breadcrumb.tsx";
import { customFetcher } from "@/helper/fetchInstance.ts";
import { useEffect, useState } from "react";
import { ExpenseList, selectedTypeEnum } from "@/models/ExpenseModel.ts";
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
import { MonthlyExpenseDetails } from "@/components/expense/MonthlyExpenseDetails.tsx";
import { useNavigate } from "react-router-dom";

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

  return (
    <>
      <div className="flex justify-between py-4">
        <div className="max-[300px]:text-xl min-[300px]:text-2xl"> Frais</div>
        <Button variant="callToAction" onClick={handleRedirection}>
          {" "}
          Demande de remboursement{" "}
        </Button>
      </div>
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
