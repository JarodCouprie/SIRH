import { MonthlyExpenseDetails } from "@/components/expense/MonthlyExpenseDetails.tsx";
import { Button } from "@/components/ui/button.tsx";
import { ArrowLeftIcon, CalendarIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";
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
import { useState } from "react";
import { selectedTypeEnum } from "@/models/ExpenseModel.ts";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover.tsx";
import { Calendar } from "@/components/ui/calendar.tsx";

export function CreateExpense() {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState(selectedTypeEnum.ALL);
  const [date, setDate] = useState<Date>();
  const handleGoBackToList = () => {
    navigate("/expense");
  };

  const displayDate = () => {
    if (date == undefined) return <span> Sélectionner une date </span>;
    else return <span> {date.toLocaleDateString()} </span>;
  };
  const convertFromStringToSelectedTypeEnum = (
    stringToConvert: string,
  ): selectedTypeEnum => {
    return selectedTypeEnum[stringToConvert as keyof typeof selectedTypeEnum];
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
                  onValueChange={(value) =>
                    setSelectedType(convertFromStringToSelectedTypeEnum(value))
                  }
                  defaultValue={selectedTypeEnum.TRAVEL}
                >
                  <SelectTrigger className="my-1 h-fit w-full">
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
                  id="desc"
                  placeholder="Description"
                  name="desc"
                  className="p-4"
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
                  className="p-4"
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
                      className="justify-start text-left"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {displayDate()}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className=" w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
