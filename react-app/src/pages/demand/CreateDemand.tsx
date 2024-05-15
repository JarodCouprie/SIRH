import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { TbCalendarClock, TbCalendarRepeat } from "react-icons/tb";
import { MdOutlineLaptop } from "react-icons/md";
import { Input } from "@/components/ui/input.tsx";
import { Select } from "@radix-ui/react-select";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import { format } from "date-fns";
import { FaArrowLeft } from "react-icons/fa6";
import { Button } from "@/components/ui/button.tsx";
import { useNavigate } from "react-router-dom";
import { CalendarIcon } from "@radix-ui/react-icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils.ts";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth.tsx";
import { AuthTokens } from "@/type/context/authTokens.tsx";
import React from "react";

export function CreateDemand() {
  const { setToken } = useAuth() as AuthTokens;
  const navigate = useNavigate();
  const [start_date, setStartDate] = React.useState<Date>();
  const [end_date, setEndDate] = React.useState<Date>();

  const handleClickSummitButton = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const type = formData.get("type");
    const motivation = formData.get("description");
    const startDate = start_date?.toISOString().split("T")[0];
    const endDate = end_date?.toISOString().split("T")[0];
    const status = "WAITING";
    const idOwner = "1";

    let number_day = null;

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const differenceMs = end.getTime() - start.getTime();

      number_day = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));
    }

    console.log("Nombre de jours entre les deux dates:", number_day);

    const demandeData = {
      startDate,
      endDate,
      motivation,
      status,
      type,
      number_day,
      idOwner,
    };

    const response = await fetch("http://localhost:5000/api/demand", {
      method: "POST",
      body: JSON.stringify(demandeData),
      headers: {
        Authorization: `Bearer ${localStorage.accessToken}`,
        "Content-Type": "application/json",
      },
    });

    const fetchData = await response.json();
    if (response.status === 200) {
      setToken(fetchData.data.accessToken, fetchData.data.refreshToken);
      navigate("/demand", { replace: true });
    } else {
      toast.error(`${fetchData.message}`);
    }
  };

  const handleClick = () => {
    navigate("/demand");
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <Button variant="link" onClick={handleClick}>
          <FaArrowLeft className="mr-2" />
          <div>Demandes</div>
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <Card className="flex ">
          <CardHeader className="flex flex-row">
            <TbCalendarClock className="size-14 text-indigo-500 opacity-75" />
          </CardHeader>

          <CardTitle className="p-4">
            <span className="text-base">Solde de congés</span>
            <div className="text-4xl">30</div>
          </CardTitle>
        </Card>

        <Card className="flex ">
          <CardHeader className="flex flex-row">
            <TbCalendarRepeat className="size-14 text-red-500 opacity-75" />
          </CardHeader>

          <CardTitle className="p-4">
            <span className="text-base">Solde de RTT</span>
            <div className="text-4xl">30</div>
          </CardTitle>
        </Card>

        <Card className="flex ">
          <CardHeader className="flex flex-row">
            <MdOutlineLaptop className="size-14 text-orange-500 opacity-75" />
          </CardHeader>

          <CardTitle className="p-4">
            <span className="text-base">Solde de télétravail</span>
            <div className="text-4xl">30</div>
          </CardTitle>
        </Card>
      </div>

      <Card>
        <CardHeader>Nouvelle demande</CardHeader>
        <CardContent>
          <form
            onSubmit={handleClickSummitButton}
            className="flex flex-col gap-3"
          >
            <Select name="type">
              <div className="flex justify-center">
                <SelectTrigger className="p-6 outline outline-1">
                  <SelectValue placeholder="Type de demande" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CA">Congé annuel</SelectItem>
                  <SelectItem value="RTT">RTT</SelectItem>
                  <SelectItem value="TT">Télétravail</SelectItem>
                </SelectContent>
              </div>
            </Select>

            <Input
              className="p-6"
              type="text"
              id="description"
              placeholder="Description"
              name="description"
            ></Input>

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

            <div className="flex justify-end gap-2 pt-6">
              <Button variant="ghost"> Annuler</Button>
              <Button variant="callToAction">Enregistrer</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
