import React, { ChangeEvent, useEffect, useState } from "react";
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
import { Calendar } from "@/components/ui/calendar";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { customFetcher } from "@/helper/fetchInstance";
import { DemandDTO, DemandType } from "@/models/Demand.model.ts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { useCurrentUser } from "@/hooks/useCurrentUser.js";

interface DemandFormProps {
  initialData?: DemandDTO;
  submitUrl: string;
  method: "POST" | "PUT";
}

const DemandForm: React.FC<DemandFormProps> = ({
  initialData,
  submitUrl,
  method,
}) => {
  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const { id } = useParams();
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [motivation, setMotivation] = useState("");
  const [selectedType, setSelectedType] = useState(DemandType.CA);
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<{
    start_date?: string;
    end_date?: string;
    type?: string;
  }>({});
  const { refreshCurrentUser } = useCurrentUser();

  const isWeekday = (date: Date) => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  useEffect(() => {
    if (initialData) {
      setStartDate(new Date(initialData.start_date));
      setEndDate(new Date(initialData.end_date));
      setMotivation(initialData.motivation);
      setSelectedType(initialData.type);
    }
  }, [initialData]);

  const handleClickSubmitButton = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    if (formDemandValid()) {
      const formMotivation = event.currentTarget.description.value;
      const formattedStartDate = startDate?.toLocaleDateString("fr-CA");
      const formattedEndDate = endDate?.toLocaleDateString("fr-CA");
      let demandData;

      if (method === "PUT") {
        demandData = {
          start_date: formattedStartDate,
          end_date: formattedEndDate,
          motivation: formMotivation,
          type: selectedType,
          status: initialData?.status,
        };
      }
      if (method === "POST") {
        demandData = {
          start_date: formattedStartDate,
          end_date: formattedEndDate,
          motivation: formMotivation,
          type: selectedType,
        };
      }

      let response;
      const formData = new FormData();
      if (file) {
        formData.append("file", file);
        formData.append("body", JSON.stringify(demandData));
        response = await customFetcher(
          submitUrl,
          {
            method: method,
            body: formData,
          },
          false,
        );
      } else {
        formData.append("body", JSON.stringify(demandData));
        response = await customFetcher(
          submitUrl,
          {
            method: method,
            headers: {
              "Content-Type": "application/json",
            },
            body: formData,
          },
          false,
        );
      }

      if (response.response.status === 201 && method === "POST") {
        toast.message(
          `Nouvelle demande de ${demandData?.type} à la date du ${demandData?.start_date} a bien été créée`,
        );
        navigate("/demand", { replace: true });
      } else if (response.response.status === 200 && method === "PUT") {
        toast.message(
          `Demande de ${demandData?.type} a la date du ${demandData?.start_date} modifiée`,
        );
        navigate(`/demand/detail/${id}`, { replace: true });
      } else if (response.data.details && response.data.details.length > 0) {
        toast.error(`${response.data.details[0].message}`);
      } else {
        toast.error(`${response.data.message}`);
      }

      refreshCurrentUser();
    }
  };

  const formDemandValid = () => {
    const newErrors: { start_date?: string; end_date?: string; type?: string } =
      {};

    if (!selectedType.trim()) {
      newErrors.type = "Le type de demande est requis";
    }

    if (!startDate) {
      newErrors.start_date = "La date de début est requise";
    }

    if (!endDate) {
      newErrors.end_date = "La date de fin est requise";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMotivation(e.target.value);
  };

  const handleSelectChange = (value: string) => {
    setSelectedType(value as DemandType);
  };

  const dateChanger = () => {
    return (
      <>
        <div className="flex justify-between justify-items-center gap-3">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start border-gray-500 p-6 text-left font-normal",
                  !startDate && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {startDate ? (
                  new Date(startDate).toLocaleString("fr-FR", dateOptions)
                ) : (
                  <span>Date de début</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={setStartDate}
                initialFocus
                disabled={isWeekday}
              />
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start border-gray-500 p-6 text-left font-normal",
                  !endDate && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {endDate ? (
                  new Date(endDate).toLocaleString("fr-FR", dateOptions)
                ) : (
                  <span>Date de fin</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={setEndDate}
                initialFocus
                disabled={isWeekday}
              />
            </PopoverContent>
          </Popover>
        </div>
      </>
    );
  };

  const returnButton = () => {
    if (method === "POST") {
      return (
        <>
          <Button
            variant="ghost"
            type="button"
            onClick={() => navigate("/demand")}
          >
            Annuler
          </Button>
        </>
      );
    } else if (method === "PUT") {
      return (
        <>
          <Button
            variant="ghost"
            type="button"
            onClick={() => navigate(`/demand/detail/${id}`)}
          >
            Annuler
          </Button>
        </>
      );
    }
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

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  return (
    <Card>
      <CardTitle className="flex items-center justify-between gap-4 text-xl">
        {handleTitle()}
      </CardTitle>
      <CardContent>
        <form
          onSubmit={handleClickSubmitButton}
          className="flex flex-col gap-3"
          encType="multipart/form-data"
        >
          <div className="flex justify-center">
            <Select
              name="type"
              value={selectedType}
              onValueChange={handleSelectChange}
            >
              <SelectTrigger className="p-6">
                <SelectValue placeholder="Type de demande..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CA">Congé annuel</SelectItem>
                <SelectItem value="RTT">RTT</SelectItem>
                <SelectItem value="TT">Télétravail</SelectItem>
                <SelectItem value="ABSENCE">Absence</SelectItem>
                <SelectItem value="SICKNESS">Arrêt maladie</SelectItem>
              </SelectContent>
            </Select>
            {errors.type && <p className="text-red-500">{errors.type}</p>}
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

          {(selectedType === DemandType.ABSENCE ||
            selectedType === DemandType.SICKNESS) && (
            <Input
              className="p-6"
              type="file"
              id="additionalInfo"
              placeholder="Raison de l'absence"
              onChange={handleFileChange}
            />
          )}

          {dateChanger()}

          <div className="flex justify-around">
            <div>
              {errors.start_date && (
                <p className="text-red-500">{errors.start_date}</p>
              )}
            </div>
            <div>
              {errors.end_date && (
                <p className="text-red-500">{errors.end_date}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-6">
            {returnButton()}
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
