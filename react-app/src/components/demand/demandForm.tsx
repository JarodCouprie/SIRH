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
import { Calendar } from "@/components/ui/calendar";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { customFetcher } from "@/helper/fetchInstance";
import { DemandDTO, DemandType } from "@/models/DemandModel";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";

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
  const [start_date, setStartDate] = useState<Date>();
  const [end_date, setEndDate] = useState<Date>();
  const [motivation, setMotivation] = useState("");
  const [selectedType, setSelectedType] = useState(DemandType.CA);
  const [errors, setErrors] = useState<{
    startDate?: string;
    endDate?: string;
    type?: string;
  }>({});

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

    if (formDemandValid()) {
      const motivation = event.currentTarget.description.value;
      const startDate = start_date?.toLocaleDateString("fr-FR");
      let endDate = end_date?.toLocaleDateString("fr-FR");
      let demandeData;

      if (!endDate) {
        endDate = startDate;
      }

      if (method === "PUT") {
        demandeData = {
          startDate,
          endDate,
          motivation,
          type: selectedType,
          status: initialData?.status,
        };
      }
      if (method === "POST") {
        demandeData = {
          startDate,
          endDate,
          motivation,
          type: selectedType,
        };
      }

      const response = await customFetcher(submitUrl, {
        method: method,
        body: JSON.stringify(demandeData),
      });

      if (response.response.status === 201 && method === "POST") {
        toast.message(
          `Nouvelle demande de ${demandeData?.type} à la date du ${demandeData?.startDate} a bien été créée`,
        );
        navigate("/demand", { replace: true });
      } else if (response.response.status === 200 && method === "PUT") {
        toast.message(
          `Demande de ${demandeData?.type} a la date du ${demandeData?.startDate} modifiée`,
        );
        navigate(`/demand/detail/${id}`, { replace: true });
      } else if (response.data.details && response.data.details.length > 0) {
        toast.error(`${response.data.details[0].message}`);
      } else {
        toast.error(`${response.data.message}`);
      }
    }
  };

  const formDemandValid = () => {
    const newErrors: { startDate?: string; endDate?: string; type?: string } =
      {};

    if (!selectedType.trim()) {
      newErrors.type = "Le type de demande est requis";
    }

    if (!start_date) {
      newErrors.startDate = "La date de début est requise";
    }

    if (!end_date) {
      newErrors.endDate = "La date de fin est requise";
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
                  !start_date && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {start_date ? (
                  new Date(start_date).toLocaleString("fr-FR", dateOptions)
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
                  "w-full justify-start border-gray-500 p-6 text-left font-normal",
                  !end_date && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {end_date ? (
                  new Date(end_date).toLocaleString("fr-FR", dateOptions)
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

  return (
    <Card>
      <CardTitle className="flex items-center justify-between gap-4 text-xl">
        {handleTitle()}
      </CardTitle>
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
              <SelectTrigger className="p-6">
                <SelectValue placeholder="Type de demande..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CA">Congé annuel</SelectItem>
                <SelectItem value="RTT">RTT</SelectItem>
                <SelectItem value="TT">Télétravail</SelectItem>
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

          {dateChanger()}

          <div className="flex justify-around">
            <div>
              {errors.startDate && (
                <p className="text-red-500">{errors.startDate}</p>
              )}
            </div>
            <div>
              {errors.endDate && (
                <p className="text-red-500">{errors.endDate}</p>
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
