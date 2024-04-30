import { Card, CardHeader, CardTitle } from "@/components/ui/card.tsx";
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
import React from "react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth.tsx";
import { AuthTokens } from "@/type/context/authTokens.tsx";

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
    const description = formData.get("description");
    const s_date = start_date;
    const e_date = end_date;
    const demandeData = { type, description, s_date, e_date };
    const response = await fetch("http://localhost:5000/api/demand", {
      method: "POST",
      body: JSON.stringify(demandeData),
      headers: {
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
    console.log(type, description, s_date, e_date);
  };
  const handleClick = () => {
    navigate("/demand");
  };

  return (
    <>
      <div>
        <Button className="mb-3 mt-3" variant="ghost" onClick={handleClick}>
          <FaArrowLeft />
          <div className="ms-1">Demandes</div>
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

      <form onSubmit={handleClickSummitButton}>
        <div className="pt-4">
          <Card>
            <CardHeader>Nouvelle demande</CardHeader>
            <Select name="type">
              <div className="flex justify-center">
                <SelectTrigger className="w-11/12 p-6 outline outline-1">
                  <SelectValue placeholder="Type de demande" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CA">Congé annuel</SelectItem>
                  <SelectItem value="RTT">RTT</SelectItem>
                  <SelectItem value="TT">Télétravail</SelectItem>
                </SelectContent>
              </div>
            </Select>

            <div className="flex justify-center">
              <Input
                className=" mt-3 w-11/12 p-6"
                type="text"
                id="description"
                placeholder="Description"
                name="description"
              ></Input>
            </div>

            <div className="mb-3 mt-3 flex justify-evenly justify-items-center gap-12">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-5/12 justify-start p-6 text-left font-normal outline outline-1",
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
                      "w-5/12 justify-start p-6 text-left font-normal outline outline-1",
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

            <div className="m-2 flex justify-start">
              <div className="pe-3 ps-3">
                <Button variant="callToAction">Enregistrer</Button>
              </div>
              <div>
                <Button variant="ghost"> Annuler</Button>
              </div>
            </div>
          </Card>
        </div>
      </form>
    </>
  );
}
