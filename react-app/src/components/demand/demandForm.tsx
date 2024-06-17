import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { customFetcher } from "@/helper/fetchInstance";
import { DemandDTO, DemandType } from "@/models/DemandModel";
import { Card, CardContent, CardHeader } from "@/components/ui/card.tsx";

interface DemandFormProps {
  initialData?: DemandDTO;
  submitUrl: string;
  method: "POST" | "PUT";
  navigateUrl: string;
}

const DemandForm: React.FC<DemandFormProps> = ({
  initialData,
  submitUrl,
  method,
}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [start_date, setStartDate] = useState<Date>(new Date());
  console.log(start_date);
  const [end_date, setEndDate] = useState<Date>(new Date());
  const [motivation, setMotivation] = useState("");
  const [selectedType, setSelectedType] = useState(DemandType.CA);

  useEffect(() => {
    if (initialData) {
      setStartDate(new Date(initialData.startDate));
      setEndDate(new Date(initialData.endDate));
      setMotivation(initialData.motivation);
      setSelectedType(initialData.type);
    }
  }, [initialData]);

  const handleClickSubmitButton = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    const motivation = event.currentTarget.description.value;
    const startDate = start_date.toLocaleDateString("fr-CA");
    const endDate = end_date.toLocaleDateString("fr-CA");

    const demandeData = {
      startDate,
      endDate,
      motivation,
      type: selectedType,
    };

    const response = await customFetcher(submitUrl, {
      method: method,
      body: JSON.stringify(demandeData),
    });

    if (response.response.status === 201 && method === "POST") {
      navigate("/demand", { replace: true });
    } else if (response.response.status === 200 && method === "PUT") {
      navigate(`/demand/detail/${id}`, { replace: true });
    } else {
      toast.error(`${response.response.message}`);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMotivation(e.target.value);
  };

  const handleSelectChange = (value: React.SetStateAction<DemandType>) => {
    setSelectedType(value);
  };

  const handleTitle = () => {
    if (method === "POST") {
      return (
        <>
          <CardHeader>Nouvelle demande</CardHeader>
        </>
      );
    } else if (method === "PUT") {
      return (
        <>
          <CardHeader>Modification de la demande</CardHeader>
        </>
      );
    }
  };

  return (
    <Card>
      <CardHeader>{handleTitle()}</CardHeader>
      <CardContent>
        <form
          onSubmit={handleClickSubmitButton}
          className="flex flex-col gap-3"
        >
          <div className="flex justify-center">
            <Select
              name="type"
              value={selectedType}
              onValueChange={handleSelectChange}
            >
              <SelectTrigger className="p-6 outline outline-1">
                <SelectValue placeholder="Type de demande..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CA">Congé annuel</SelectItem>
                <SelectItem value="RTT">RTT</SelectItem>
                <SelectItem value="TT">Télétravail</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Input
            className="p-6"
            type="text"
            id="description"
            placeholder="Description"
            name="description"
            value={motivation}
            onChange={handleChange}
          />

          <div className="flex justify-between justify-items-center gap-3">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start p-6 text-left font-normal outline outline-1",
                    !start_date && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {start_date ? (
                    format(start_date, "PPP")
                  ) : (
                    <span>Date de début</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={start_date}
                  onSelect={setStartDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start p-6 text-left font-normal outline outline-1",
                    !end_date && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {end_date ? (
                    format(end_date, "PPP")
                  ) : (
                    <span>Date de fin</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={end_date}
                  onSelect={setEndDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex justify-items-center gap-3">
            <Select name="momentDayStart">
              <div className="flex w-full justify-center">
                <SelectTrigger className="p-6 outline outline-1">
                  <SelectValue placeholder="Moment de la journée..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AM">Matin</SelectItem>
                  <SelectItem value="PM">Après-midi</SelectItem>
                  <SelectItem value="ALL">Toute la journée</SelectItem>
                </SelectContent>
              </div>
            </Select>

            <Select name="momentDayEnd">
              <div className="flex w-full justify-center">
                <SelectTrigger className="p-6 outline outline-1">
                  <SelectValue placeholder="Moment de la journée..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AM">Matin</SelectItem>
                  <SelectItem value="PM">Après-midi</SelectItem>
                  <SelectItem value="ALL">Toute la journée</SelectItem>
                </SelectContent>
              </div>
            </Select>
          </div>

          <div className="flex justify-end gap-2 pt-6">
            <Button
              variant="ghost"
              type="button"
              onClick={() => navigate("/demand")}
            >
              Annuler
            </Button>
            <Button variant="callToAction" type="submit">
              Enregistrer
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default DemandForm;
