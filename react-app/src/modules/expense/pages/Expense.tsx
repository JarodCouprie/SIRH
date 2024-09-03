import { Button } from "@/components/ui/button.js";
import { useEffect, useState } from "react";
import { ExpenseList, selectedTypeEnum } from "@/models/ExpenseModel.ts";
import { ExpenseListCard } from "@/modules/expense/components/ExpenseListCard.tsx";
import {
  Table,
  TableBody,
  TableCell,
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs.tsx";
import { Card } from "@/components/ui/card.js";

export function Expense() {
  const [selectedType, setSelectedType] = useState(selectedTypeEnum.ALL);
  const [expenses, setExpenses] = useState<ExpenseList[]>([]);
  const [expensesCount, setExpensesCount] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [limit, setLimit] = useState(5);
  const navigate = useNavigate();

  const fetchExpenses = async () => {
    await customFetcher(
      `http://localhost:5000/api/expense/list/${selectedType || selectedTypeEnum.ALL}?` +
        new URLSearchParams({
          offset: (limit * (pageNumber - 1)).toString(),
          limit: limit.toString(),
        }).toString(),
    ).then((response) => {
      if (response.response.status !== 200) {
        toast.error("Une erreur est survenue");
        return;
      }
      setExpenses(response.data.data.expenses);
      setExpensesCount(response.data.data.totalExpensesCount);
    });
  };

  useEffect(() => {
    fetchExpenses().then();
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

  const tableExpense = (
    <>
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead />
              <TableHead className="text-left"> Type de demande </TableHead>
              <TableHead className="text-left"> Frais </TableHead>
              <TableHead className="text-left">Date de facturation</TableHead>
              <TableHead className="text-left"> Status </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {expenses.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  Aucune demande de frais n'a été trouvée
                </TableCell>
              </TableRow>
            ) : (
              expenses.map((expense) => (
                <ExpenseListCard expense={expense} key={expense.id} />
              ))
            )}
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
    </>
  );

  return (
    <MainRoot title="Frais" action={newExpense}>
      <MonthlyExpenseDetails />
      <Tabs defaultValue="all" className="pt-8">
        <TabsList className="flex flex-wrap">
          <TabsTrigger
            value="all"
            onClick={() => setSelectedType(selectedTypeEnum.ALL)}
          >
            Général
          </TabsTrigger>
          <TabsTrigger
            value="travel"
            onClick={() => setSelectedType(selectedTypeEnum.TRAVEL)}
          >
            Déplacement
          </TabsTrigger>
          <TabsTrigger
            value="food"
            onClick={() => setSelectedType(selectedTypeEnum.FOOD)}
          >
            Restauration
          </TabsTrigger>
          <TabsTrigger
            value="compensation"
            onClick={() => setSelectedType(selectedTypeEnum.COMPENSATION)}
          >
            Indemnités
          </TabsTrigger>
          <TabsTrigger
            value="housing"
            onClick={() => setSelectedType(selectedTypeEnum.HOUSING)}
          >
            Hébergement
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all">{tableExpense}</TabsContent>
        <TabsContent value="food">{tableExpense}</TabsContent>
        <TabsContent value="travel">{tableExpense}</TabsContent>
        <TabsContent value="compensation">{tableExpense}</TabsContent>
        <TabsContent value="housing">{tableExpense}</TabsContent>
      </Tabs>
    </MainRoot>
  );
}
