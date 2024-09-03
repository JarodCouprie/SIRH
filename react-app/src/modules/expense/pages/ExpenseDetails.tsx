import { MonthlyExpenseDetails } from "@/modules/expense/components/MonthlyExpenseDetails.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";

import { useEffect, useState } from "react";
import {
  ExpenseList,
  ExpenseStatus,
  ExpenseType,
} from "@/models/ExpenseModel.ts";
import { ArrowLeftIcon, Pencil1Icon } from "@radix-ui/react-icons";
import { Badge } from "@/components/ui/badge.tsx";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog.tsx";
import { MdOutlineDelete, MdOutlineVisibility } from "react-icons/md";
import { undefined } from "zod";
import { customFetcher } from "@/common/helper/fetchInstance.js";
import { FieldRow } from "@/components/fieldRow.tsx";

export function ExpenseDetails() {
  const navigate = useNavigate();
  const handleGoBackToList = () => {
    navigate("/expense");
  };

  const [expense, setExpense] = useState(
    new ExpenseList(
      "0",
      ExpenseType.TRAVEL,
      0,
      "",
      new Date(),
      new Date(),
      ExpenseStatus.WAITING,
      "",
    ),
  );

  const { id } = useParams();

  const convertFromStringToExpenseStatusEnum = (target: string) => {
    return ExpenseStatus[target as keyof typeof ExpenseStatus];
  };

  const convertFromStringToExpenseTypeEnum = (target: string) => {
    return ExpenseType[target as keyof typeof ExpenseType];
  };

  const getTargetExpense = async () => {
    await customFetcher("http://localhost:5000/api/expense/" + id).then(
      (response) => {
        if (response.response.status !== 200) {
          toast.error("Une erreur est survenue");
          return;
        }
        const facturation_date: Date = new Date(
          response.data.data.facturation_date.split("T")[0],
        );
        const creartedAt: Date = new Date(
          response.data.data.created_at.split("T")[0],
        );
        setExpense({
          justification: "",
          id_validator: 0,
          validated_at: new Date(),
          validator_firstname: "",
          validator_lastname: "",
          id: response.data.data.id,
          type: convertFromStringToExpenseTypeEnum(response.data.data.type),
          amount: response.data.data.amount,
          motivation: response.data.data.motivation,
          facturation_date: facturation_date,
          created_at: creartedAt,
          status: convertFromStringToExpenseStatusEnum(
            response.data.data.status,
          ),
          fileUrl: response.data.data.fileUrl || undefined,
        });
      },
    );
  };

  useEffect(() => {
    getTargetExpense();
  }, []);

  const handleEdit = () => {
    navigate("/expense/edit/" + expense.id);
  };

  const translateAndDisplayExpenseTypeEnum = (enumToTranslate: ExpenseType) => {
    switch (enumToTranslate) {
      case ExpenseType.COMPENSATION:
        return "Indemnités";
      case ExpenseType.TRAVEL:
        return "Déplacement";
      case ExpenseType.HOUSING:
        return "Hébergement";
      case ExpenseType.FOOD:
        return "Restauration";
    }
  };

  const translateAndDisplayExpenseStatusEnum = (
    enumToTranslate: ExpenseStatus,
  ) => {
    switch (enumToTranslate) {
      case ExpenseStatus.WAITING:
        return <Badge variant="waiting">En attente</Badge>;
      case ExpenseStatus.REFUNDED:
        return <Badge variant="accepted">Remboursé</Badge>;
      case ExpenseStatus.NOT_REFUNDED:
        return <Badge variant="denied">Non remboursé</Badge>;
    }
  };

  const handleDelete = async () => {
    try {
      await customFetcher("http://localhost:5000/api/expense/" + id, {
        method: "DELETE",
      }).then(() => {
        navigate("/expense");
      });
    } catch {
      toast.error(`Echec de l'opération`);
    }
  };

  const fetchFileNameFromUrl = (url?: string) => {
    if (typeof url !== "string" || !url) {
      return "Aucun fichier";
    }

    let fileName = url.split("/").pop();
    if (fileName) {
      fileName = fileName.split("?")[0];
    } else {
      fileName = "Aucun fichier";
    }

    return fileName;
  };

  const previewButton = (url?: string) => {
    if (typeof url === "string" && url !== "") {
      return (
        <Button variant="default" onClick={handlePreviewFile}>
          <MdOutlineVisibility className="mr-2 size-6" />
          Voir le document
        </Button>
      );
    }
    return null;
  };

  const handlePreviewFile = () => {
    window.open(`${expense.fileUrl}`, "_blank");
  };

  const buttons = () => {
    if (expense.status === "WAITING") {
      return (
        <div className="flex flex-row justify-end gap-5">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost">
                <MdOutlineDelete className="mr-2 size-5 text-red-600" />
                <span className="text-red-600">Supprimer</span>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Êtes-vous sûr de vouloir supprimer cette demande ?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Cette action est irrévesrible, les données supprimée ne
                  pourront pas être restaurée.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Annuler</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>
                  Confirmer
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <Button variant="callToAction" onClick={handleEdit}>
            <Pencil1Icon className="mr-2 size-5" />
            Modifier
          </Button>
        </div>
      );
    }
  };

  return (
    <>
      <div className="flex justify-between py-4">
        <Button onClick={handleGoBackToList} variant="link">
          <ArrowLeftIcon className="mr-2 h-4 w-4" />
          <span>Frais</span>
        </Button>
      </div>
      <MonthlyExpenseDetails />
      <div className="flex w-full flex-col gap-5 py-4">
        <Card>
          <CardHeader>
            <div className="flex flex-wrap justify-between">
              <CardTitle className="text-lg">
                Visualisation de la demande n°{expense.id}
              </CardTitle>
              {buttons()}
            </div>
          </CardHeader>
          <CardContent className="divide-y divide-slate-300 dark:divide-slate-700">
            <FieldRow title="Type">
              {translateAndDisplayExpenseTypeEnum(expense.type)}
            </FieldRow>
            <FieldRow title="Montant">{expense.amount}€</FieldRow>
            <FieldRow title="Description">{expense.motivation}</FieldRow>
            <FieldRow title="Date de facturation">
              {expense.facturation_date.toLocaleDateString()}
            </FieldRow>
            <FieldRow title="Date de création">
              {expense.created_at.toLocaleDateString()}
            </FieldRow>
            <FieldRow title="Status">
              {translateAndDisplayExpenseStatusEnum(expense.status)}
            </FieldRow>
            <FieldRow title="Fichier">
              <div className="flex flex-wrap gap-2">
                <div className="">{fetchFileNameFromUrl(expense.fileUrl)}</div>
                <div className="">{previewButton(expense.fileUrl)}</div>
              </div>
            </FieldRow>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
