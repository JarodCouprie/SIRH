import React, { useEffect, useState } from "react";
import { DemandDTO } from "@/models/DemandModel.ts";
import { DemandType } from "@/pages/demand/DemandDetail.tsx";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth.tsx";
import { AuthTokens } from "@/type/context/authTokens.tsx";
import { Card, CardContent, CardHeader } from "@/components/ui/card.tsx";
import { Select } from "@radix-ui/react-select";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import { Input } from "@/components/ui/input.tsx";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Button } from "@/components/ui/button.tsx";
import { cn } from "@/lib/utils.ts";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar.tsx";
import { toast } from "sonner";

export function DemandEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth() as AuthTokens;
  const [start_date, setStartDate] = React.useState<Date>(new Date());
  const [end_date, setEndDate] = React.useState<Date>(new Date());
  const [motivation, setMotivation] = useState("");
  const [demand, setDemand] = useState<DemandDTO>({
    id: 0,
    motivation: "",
    startDate: new Date(),
    endDate: new Date(),
    createdAt: new Date(),
    status: "",
    type: DemandType.CA,
    number_day: 1,
  });

  const fetchDemand = async () => {
    await fetch(`http://localhost:5000/api/demand/${id}`, {
      headers: { Authorization: `Bearer ${token.accessToken}` },
    })
      .then((response) => response.json())
      .then((data) => {
        setDemand(data.data);
        setStartDate(data.data.startDate);
        setEndDate(data.data.endDate);
        setMotivation(data.data.motivation);
      });
  };

  const handleClickSummitButton = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const type = formData.get("type");
    const motivation = formData.get("description");
    const startDate = new Date(start_date).toLocaleDateString("fr-CA");
    const endDate = new Date(end_date).toLocaleDateString("fr-CA");

    const status = demand.status;
    const idOwner = "1";

    let number_day = null;

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const differenceMs = end.getTime() - start.getTime();

      number_day = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));
    }

    const demandeEditData = {
      startDate,
      endDate,
      motivation,
      status,
      type,
      number_day,
      idOwner,
    };

    const response = await fetch(`http://localhost:5000/api/demand/${id}`, {
      method: "PUT",
      body: JSON.stringify(demandeEditData),
      headers: {
        Authorization: `Bearer ${localStorage.accessToken}`,
        "Content-Type": "application/json",
      },
    });

    const fetchData = await response.json();
    if (response.status === 200) {
      navigate(`/demand/detail/${id}`, { replace: true });
    } else {
      toast.error(`${fetchData.message}`);
    }
  };

  const handleChange = (e: any) => {
    setMotivation(e.target.value);
  };

  useEffect(() => {
    fetchDemand().then();
  }, []);

  return (
    <>
      <div>Modification</div>
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
                  <SelectValue placeholder={demand.type} />
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
              value={motivation}
              onChange={handleChange}
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
                      <span>{start_date}</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={start_date}
                    onSelect={() => setStartDate}
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
                      <span>{end_date}</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={end_date}
                    onSelect={() => setEndDate}
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
    </>
  );
}
