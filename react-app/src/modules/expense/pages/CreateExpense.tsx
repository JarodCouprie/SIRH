import { MonthlyExpenseDetails } from "@/modules/expense/components/MonthlyExpenseDetails.tsx";
import { Button } from "@/components/ui/button.tsx";
import { ArrowLeftIcon, CalendarIcon } from "@radix-ui/react-icons";
import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.js";
import React, { ChangeEvent, useEffect, useState } from "react";
import { selectedTypeEnum } from "@/models/ExpenseModel.ts";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover.tsx";
import { Calendar } from "@/components/ui/calendar.tsx";
import { toast } from "sonner";
import { customFetcher } from "@/common/helper/fetchInstance.js";

export function CreateExpense() {
  const navigate = useNavigate();
  const handleGoBackToList = () => {
    navigate("/expense");
  };
  const [createdExpense, setCreatedExpense] = useState({
    type: "",
    amount: "",
    motivation: "",
    facturation_date: new Date(),
  });
  const [file, setFile] = useState<File | null>(null);

  const { id } = useParams();

  const [method, setMethod] = useState("");
  const [cardTitle, setCardTitle] = useState("");

  const getTargetExpense = async () => {
    try {
      await customFetcher("http://localhost:5000/api/expense/" + id).then(
        (response) => {
          if (response.response.status !== 200) {
            toast.error("Accès refusé");
            return;
          }
          const date: Date = new Date(
            response.data.data.facturation_date.split("T")[0],
          );
          setCreatedExpense({
            type: response.data.data.type,
            amount: response.data.data.amount,
            motivation: response.data.data.motivation,
            facturation_date: date,
          });
        },
      );
    } catch {
      toast.error(`Echec de la récupération de la demande de frais`);
    }
  };

  useEffect(() => {
    if (id != undefined) {
      setMethod("PUT");
      setCardTitle("Modification de la demande de frais n°" + id);
      getTargetExpense();
    } else {
      setMethod("POST");
      setCardTitle("Création d'une demande de frais");
    }
  }, []);

  const handleExpenseFormDataChange = (e: any) => {
    setCreatedExpense({
      ...createdExpense,
      [e.target.name]: e.target.value || e.target.selected,
    });
  };

  const handleExpenseTypeChange = (value: string) => {
    setCreatedExpense({
      ...createdExpense,
      type: convertFromStringToSelectedTypeEnum(value),
    });
  };

  const handleExpenseFacturation_dateChange = (value: Date | undefined) => {
    if (value) {
      setCreatedExpense({
        ...createdExpense,
        facturation_date: value,
      });
      value?.setHours(2);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const displayDate = () => {
    if (createdExpense.facturation_date == undefined)
      return <span> Sélectionner une date </span>;
    else
      return (
        <span> {createdExpense.facturation_date.toLocaleDateString()} </span>
      );
  };
  const convertFromStringToSelectedTypeEnum = (
    stringToConvert: string,
  ): selectedTypeEnum => {
    return selectedTypeEnum[stringToConvert as keyof typeof selectedTypeEnum];
  };

  const handleFormSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    createdExpense.facturation_date.setHours(3);
    const date = createdExpense.facturation_date.toISOString().split("T")[0];
    const formData = new FormData();

    const body = {
      type: createdExpense.type,
      amount: createdExpense.amount,
      motivation: createdExpense.motivation,
      facturation_date: date,
    };

    if (file) {
      formData.append("file", file);
    }
    formData.append("body", JSON.stringify(body));

    try {
      let fetchUrl = "http://localhost:5000/api/expense/";
      if (id != undefined) fetchUrl = "http://localhost:5000/api/expense/" + id;
      await customFetcher(
        fetchUrl,
        {
          method: method,
          body: formData,
        },
        false,
      ).then(() => {
        navigate("/expense");
      });
    } catch {
      toast.error(`Echec de l'opération`);
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
      <div className="w-full py-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg"> {cardTitle} </CardTitle>
          </CardHeader>
          <CardContent>
            <form
              className="py-4"
              name="expenseCreationFrom"
              id="expenseCreationFrom"
            >
              <div className="">
                <Label className="my-1 text-lg" htmlFor="name">
                  Type
                </Label>
                <Select
                  onValueChange={(value) => handleExpenseTypeChange(value)}
                  defaultValue={selectedTypeEnum.TRAVEL}
                  value={createdExpense.type}
                  name="type"
                >
                  <SelectTrigger className="my-1 h-fit w-full border-gray-400">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="TRAVEL">Déplacement</SelectItem>
                      <SelectItem value="COMPENSATION">Indemnités</SelectItem>
                      <SelectItem value="FOOD">Restauration</SelectItem>
                      <SelectItem value="HOUSING">Hébergement</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col">
                <Label className="my-1 text-lg" htmlFor="name">
                  Description
                </Label>
                <Input
                  type="text"
                  id="motivation"
                  placeholder="Description"
                  name="motivation"
                  className="border-gray-400 p-4"
                  value={createdExpense.motivation}
                  onChange={handleExpenseFormDataChange}
                />
              </div>
              <div className="flex flex-col">
                <Label className="my-1 text-lg" htmlFor="amount">
                  Montant
                </Label>
                <Input
                  type="number"
                  id="amount"
                  placeholder="0€"
                  name="amount"
                  className="border-gray-400 p-4"
                  value={createdExpense.amount}
                  onChange={handleExpenseFormDataChange}
                />
              </div>
              <div className="flex flex-col">
                <Label className="my-1 text-lg" htmlFor="amount">
                  Date
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className="justify-start border-gray-400 text-left"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {displayDate()}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className=" w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={createdExpense.facturation_date}
                      onSelect={(value) =>
                        handleExpenseFacturation_dateChange(value)
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="py-4">
                <Label className="my-1 text-lg" htmlFor="files">
                  Fichier
                </Label>
                <Input
                  type="file"
                  className="cursor-pointer text-gray-950 dark:bg-slate-400"
                  onChange={handleFileChange}
                />
              </div>
            </form>
          </CardContent>
          <CardFooter className="justify-end">
            <div className="flex justify-end gap-8">
              <Button onClick={handleGoBackToList} variant="ghost">
                Annuler
              </Button>
              <Button
                variant="callToAction"
                onClick={(e) => handleFormSubmit(e)}
              >
                Envoyer
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
