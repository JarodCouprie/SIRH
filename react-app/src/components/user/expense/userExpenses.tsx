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
import { MdOutlineEuroSymbol } from "react-icons/md";
import { UserModel } from "@/models/user/User.model.js";
import { UserRejectExpense } from "@/components/user/expense/userRejectExpense.js";
import { UserConfirmExpense } from "@/components/user/expense/userConfirmExpense.js";
import { useNavigate } from "react-router-dom";

interface UserExpenseProps {
  user: UserModel;
}

export const UserExpenses: React.FC<UserExpenseProps> = ({ user }) => {
  const [expenseList, setExpenseList] = useState<ExpenseList[]>([]);
  const [pageSize, setPageSize] = useState(5);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalData, setTotalData] = useState(0);
  const navigate = useNavigate();

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

  const handleDetailsDisplay = (id: string) => {
    navigate(`expense/${id}`, {
      state: { previousRoute: window.location.pathname, user },
    });
  };

  useEffect(() => {
    fetchExpense(pageSize, pageNumber).then();
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
              <TableHead className="text-right"> Actions </TableHead>
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
                  onClick={() => handleDetailsDisplay(expense.id)}
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

                  <TableCell>
                    {getClassForStatus(expense.status)}
                    {expense.id_validator && (
                      <div className="flex gap-1">
                        <span className="text-xs font-semibold">
                          <span>{expense.validator_firstname}</span>
                          <span> {expense.validator_lastname}</span>
                        </span>
                        <span className="text-xs text-zinc-500">
                          {new Date(expense?.validated_at).toLocaleDateString(
                            "fr-FR",
                            dateOptions,
                          )}
                        </span>
                      </div>
                    )}
                  </TableCell>

                  <TableCell>
                    {expense.status === ExpenseStatus.WAITING && (
                      <div className="flex justify-end gap-2">
                        <UserRejectExpense
                          expense={expense}
                          refreshExpenses={() =>
                            fetchExpense(pageSize, pageNumber)
                          }
                        />
                        <UserConfirmExpense
                          expense={expense}
                          refreshExpenses={() =>
                            fetchExpense(pageSize, pageNumber)
                          }
                        />
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
