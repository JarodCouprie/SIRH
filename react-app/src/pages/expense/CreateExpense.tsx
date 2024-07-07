import { MonthlyExpenseDetails } from "@/components/expense/MonthlyExpenseDetails.tsx";
import { Button } from "@/components/ui/button.tsx";
import { ArrowLeftIcon, CalendarIcon } from "@radix-ui/react-icons";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MouseEvent, useEffect, useState } from "react";
import { ExpenseStatus, selectedTypeEnum } from "@/models/ExpenseModel.ts";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover.tsx";
import { Calendar } from "@/components/ui/calendar.tsx";
import { MdOutlineFileUpload } from "react-icons/md";
import { customFetcher } from "@/helper/fetchInstance.ts";
import { toast } from "sonner";

export function CreateExpense() {
  const navigate = useNavigate();
  const handleGoBackToList = () => {
    navigate("/expense");
  };
  const [createdExpense, setCreatedExpense] = useState({
    type: "",
    amount: "",
    motivation: "",
    facturationDate: new Date(),
    ownerId: "",
  });
  const { id } = useParams();

  const [method, setMethod] = useState("");

  const getTargetExpense = async () => {
    try {
      await customFetcher("http://localhost:5000/api/expense/" + id).then(
        (response) => {
          if (response.response.status !== 200) {
            toast.error("Accès refusé");
            return;
          }
          const date: Date = new Date(
            response.data.data.facturationDate.split("T")[0],
          );
          setCreatedExpense({
            type: response.data.data.type,
            amount: response.data.data.amount,
            motivation: response.data.data.motivation,
            facturationDate: date,
            ownerId: response.data.data.ownerId,
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
      getTargetExpense();
    } else setMethod("POST");
  }, []);

  const handlerExpenseFormDataChange = (e: any) => {
    setCreatedExpense({
      ...createdExpense,
      [e.target.name]: e.target.value || e.target.selected,
    });
  };

  const handlerExpenseTypeChange = (value: string) => {
    setCreatedExpense({
      ...createdExpense,
      ["type"]: convertFromStringToSelectedTypeEnum(value),
    });
  };

  const handlerExpenseFacturationDateChange = (value: Date | undefined) => {
    setCreatedExpense({
      ...createdExpense,
      ["facturationDate"]: value,
    });
    value?.setHours(3);
  };

  const displayDate = () => {
    if (createdExpense.facturationDate == undefined)
      return <span> Sélectionner une date </span>;
    else
      return (
        <span> {createdExpense.facturationDate.toLocaleDateString()} </span>
      );
  };
  const convertFromStringToSelectedTypeEnum = (
    stringToConvert: string,
  ): selectedTypeEnum => {
    return selectedTypeEnum[stringToConvert as keyof typeof selectedTypeEnum];
  };

  const handleFormSubmit = async (
    e: MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    createdExpense.facturationDate.setHours(3);
    const date = createdExpense.facturationDate.toISOString().split("T")[0];

    const body = {
      type: createdExpense.type,
      amount: createdExpense.amount,
      motivation: createdExpense.motivation,
      facturationDate: date,
      ownerId: "",
    };
    try {
      let fetchUrl = "http://localhost:5000/api/expense/";
      if (id != undefined) fetchUrl = "http://localhost:5000/api/expense/" + id;
      await customFetcher(fetchUrl, {
        method: method,
        body: JSON.stringify(body),
      }).then((response) => {
        if (response.response.status !== 200) {
          toast.error(`Echec de l'opération`);
          return;
        } else {
          if (method == "POST")
            toast.message(
              `Nouvelle demande de frais du type ${createdExpense.type} à la date du ${createdExpense.facturationDate} a été créée.`,
            );
          else
            toast.message(
              `La demande de frais du type ${createdExpense.type} à la date du ${createdExpense.facturationDate} a été modifiée.`,
            );
          navigate("/expense");
        }
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
          <CardContent>
            <form>
              <div className="">
                <Label className="my-1 text-lg" htmlFor="name">
                  Type
                </Label>
                <Select
                  onValueChange={(value) => handlerExpenseTypeChange(value)}
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
                  onChange={handlerExpenseFormDataChange}
                />
              </div>
              <div className="flex flex-col">
                <Label className="my-1 text-lg" htmlFor="amount">
                  Montant
                </Label>
                <Input
                  type="text"
                  id="amount"
                  placeholder="0€"
                  name="amount"
                  className="border-gray-400 p-4"
                  value={createdExpense.amount}
                  onChange={handlerExpenseFormDataChange}
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
                      selected={createdExpense.facturationDate}
                      onSelect={(value) =>
                        handlerExpenseFacturationDateChange(value)
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="my-4 flex h-20 w-full items-center justify-center gap-4 rounded border border-dashed border-gray-400 bg-gray-100 p-4 dark:border-gray-700 dark:bg-gray-900">
                <MdOutlineFileUpload className="size-14 rounded-full bg-white p-1 dark:bg-gray-950" />
                <div>
                  <div className="flex font-medium">
                    <div className=" cursor-pointer text-blue-700 underline dark:text-blue-500">
                      Cliquer pour envoyer votre image
                    </div>
                    &nbsp;ou glisser-déposez votre photo ici
                  </div>
                  <div className="font-normal text-gray-500">
                    (SVG, JPG ou PNG)
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-8">
                <Button
                  onClick={handleGoBackToList}
                  variant="link"
                  className="rounded p-4 text-lg hover:bg-gray-200 dark:hover:bg-gray-900"
                >
                  Annuler
                </Button>
                <Button
                  className="rounded bg-blue-600 p-4 text-lg font-medium text-white hover:bg-blue-400 dark:bg-blue-600 dark:text-white dark:hover:bg-blue-400"
                  onClick={(e) => handleFormSubmit(e)}
                >
                  Envoyer
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
