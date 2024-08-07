import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx";
import { Label } from "@/components/ui/label.tsx";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import { Button } from "@/components/ui/button.tsx";
import {
  CaretLeftIcon,
  CaretRightIcon,
  MinusIcon,
} from "@radix-ui/react-icons";
import {
  ExpenseList,
  ExpenseStatus,
  ExpenseType,
} from "@/models/ExpenseModel.ts";
import { customFetcher } from "@/helper/fetchInstance.ts";
import { Badge } from "@/components/ui/badge.tsx";
import { FaBed, FaCar, FaUtensils } from "react-icons/fa";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog.tsx";
import { Input } from "@/components/ui/input.tsx";
import { MdOutlineEuroSymbol } from "react-icons/md";
import { UserModel } from "@/models/user/User.model.js";

interface UserExpenseProps {
  user: UserModel;
}

export const UserValidationExpense: React.FC<UserExpenseProps> = ({ user }) => {
  const [expenseList, setExpenseList] = useState<ExpenseList[]>([]);
  const [pageSize, setPageSize] = useState(5);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalData, setTotalData] = useState(0);

  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const getStatusOption = (status: ExpenseType) => {
    switch (status) {
      case ExpenseType.TRAVEL:
        return {
          icon: <FaCar className="size-8 text-black dark:text-slate-50" />,
          label: "Déplacement",
        };
      case ExpenseType.COMPENSATION:
        return {
          icon: (
            <MdOutlineEuroSymbol className="size-8 text-black dark:text-slate-50" />
          ),
          label: "Indemnité",
        };
      case ExpenseType.FOOD:
        return {
          icon: <FaUtensils className="size-7 text-black dark:text-slate-50" />,
          label: "Restauration",
        };
      case ExpenseType.HOUSING:
        return {
          icon: <FaBed className="size-8 text-black dark:text-slate-50" />,
          label: "Hébergement",
        };
      default:
        return {
          icon: <MinusIcon />,
          label: "???",
        };
    }
  };

  const getClassForStatus = (status: ExpenseStatus) => {
    switch (status) {
      case ExpenseStatus.REFUNDED:
        return <Badge variant="accepted">Remboursé</Badge>;
      case ExpenseStatus.WAITING:
        return <Badge variant="waiting">En attente</Badge>;
      case ExpenseStatus.NOT_REFUNDED:
        return <Badge variant="denied">Non remboursé</Badge>;
      default:
        return <Badge variant="outline">Erreur</Badge>;
    }
  };

  const handlePageSize = (pageSize: string) => {
    setPageNumber(1);
    setPageSize(+pageSize);
  };

  const handlePreviousPageNumber = () => {
    setPageNumber(pageNumber - 1);
  };

  const handleNextPageNumber = () => {
    setPageNumber(pageNumber + 1);
  };

  const fetchExpense = async (pageSize: number, pageNumber: number) => {
    try {
      const response = await customFetcher(
        `http://localhost:5000/api/expense/validation/list/${user.id}?` +
          new URLSearchParams({
            pageSize: pageSize.toString() || "10",
            pageNumber: pageNumber.toString() || "1",
          }),
      );
      if (response.response.status === 200) {
        setExpenseList(response.data.data.list);
        setTotalData(response.data.data.totalData);
      }
    } catch (error) {
      toast.message("Erreur lors de la récuperation de la liste des frais.");
    }
  };

  const handleConfirmClick = async (id: number, expense: ExpenseList) => {
    const response = await customFetcher(
      `http://localhost:5000/api/expense/status/validation/${id}`,
      {
        method: "PUT",
      },
    );

    if (response.response.status === 200) {
      toast.message(`Frais de ${expense.type} numéro ${id} validé`);
      fetchExpense(pageSize, pageNumber);
    }
  };

  useEffect(() => {
    fetchExpense(pageSize, pageNumber);
  }, [pageSize, pageNumber]);

  return (
    <>
      <div className="rounded pt-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left"> Type de demande </TableHead>
              <TableHead className="text-left"> Frais </TableHead>
              <TableHead className="text-left"> Date de facturation </TableHead>
              <TableHead className="text-left"> Status </TableHead>
              <TableHead className="text-left"> Actions </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {expenseList.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  Aucune demande trouvée
                </TableCell>
              </TableRow>
            ) : (
              expenseList.map((expense: ExpenseList) => (
                <TableRow
                  key={expense.id}
                  className="hover:cursor-pointer"
                  //onClick={() => handleClick(expense.id)}
                >
                  <TableCell className="flex gap-2 text-left">
                    {getStatusOption(expense.type).icon}
                    <div>
                      <div>{getStatusOption(expense.type).label}</div>
                      <div className="text-xs text-zinc-500">
                        {new Date(
                          expense?.created_at?.toString(),
                        ).toLocaleDateString("fr-FR", dateOptions)}
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div>{expense.amount}</div>
                  </TableCell>

                  <TableCell>
                    {new Date(
                      expense?.facturation_date?.toString(),
                    ).toLocaleDateString("fr-FR", dateOptions)}
                  </TableCell>

                  <TableCell>{getClassForStatus(expense.status)}</TableCell>

                  <TableCell>
                    {expense.status === ExpenseStatus.WAITING && (
                      <div className="flex gap-2">
                        <RefuseExpense
                          expense={expense}
                          refreshExpenses={() =>
                            fetchExpense(pageSize, pageNumber)
                          }
                        />
                        <Button
                          variant="outline"
                          onClick={() =>
                            handleConfirmClick(+expense.id, expense)
                          }
                        >
                          <span className="text-indigo-700">Accepter</span>
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        <div className="flex w-full justify-between py-2">
          <div className="flex items-center gap-2">
            <Label>Demande de frais par page</Label>
            <Select
              onValueChange={(value) => handlePageSize(value)}
              defaultValue={pageSize.toString()}
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
              {`${1 + pageSize * (pageNumber - 1)} - ${
                expenseList.length + pageSize * (pageNumber - 1)
              } sur ${totalData}`}
            </span>
            <Button
              variant="ghost"
              onClick={handlePreviousPageNumber}
              disabled={pageNumber === 1}
            >
              <CaretLeftIcon />
            </Button>
            <Button
              variant="ghost"
              onClick={handleNextPageNumber}
              disabled={pageSize * pageNumber >= totalData}
            >
              <CaretRightIcon />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

interface RefuseExpenseProps {
  expense: ExpenseList;
  refreshExpenses: () => void;
}

export function RefuseExpense({
  expense,
  refreshExpenses,
}: RefuseExpenseProps) {
  const [justification, setJustification] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleRefuse = async () => {
    try {
      const response = await customFetcher(
        `http://localhost:5000/api/expense/status/invalidation/${expense.id}`,
        {
          method: "PUT",
          body: JSON.stringify({ justification }),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (response.response.status === 200) {
        toast.message(`Demande de frais numéro ${expense.id} rejetée.`);
        setIsOpen(false);
        refreshExpenses();
      }
    } catch (error) {
      toast.message("Erreur lors du rejet de la demande de frais.");
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline" onClick={() => setIsOpen(true)}>
          <span className="text-red-600">Refuser</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Êtes vous vraiment sûr?</AlertDialogTitle>
          <AlertDialogDescription>
            Vous êtes sur le point de refuser la demande de remboursement.
          </AlertDialogDescription>
          <label className="text-indigo-50">Justification :</label>
          <Input
            type="text"
            className="text-indigo-50"
            value={justification}
            onChange={(e) => setJustification(e.target.value)}
          ></Input>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setIsOpen(false)}>
            Annuler
          </AlertDialogCancel>

          <Button type="submit" onClick={handleRefuse} variant="destructive">
            Refuser
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
