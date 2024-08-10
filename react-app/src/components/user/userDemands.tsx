import { UserModel } from "@/models/user/User.model.js";
import React, { useEffect, useState } from "react";
import { customFetcher } from "@/helper/fetchInstance.js";
import { DemandValidatedList } from "@/type/demand/validated-demand-list.type.js";
import { Label } from "@/components/ui/label.js";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.js";
import { Button } from "@/components/ui/button.js";
import {
  CaretLeftIcon,
  CaretRightIcon,
  MinusIcon,
} from "@radix-ui/react-icons";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.js";
import { DemandStatus, DemandType } from "@/models/Demand.model.js";
import { useNavigate } from "react-router-dom";
import { TbCalendarClock, TbCalendarRepeat } from "react-icons/tb";
import { MdOutlineLaptop } from "react-icons/md";
import { FaRegCalendarXmark } from "react-icons/fa6";
import { GiMedicalThermometer } from "react-icons/gi";
import { Badge } from "@/components/ui/badge.js";

interface UserDemandProps {
  user: UserModel;
}

export const UserDemands: React.FC<UserDemandProps> = ({ user }) => {
  const [demandList, setDemandList] = useState<DemandValidatedList[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [totalData, setTotalData] = useState<number>(0);
  const navigate = useNavigate();

  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const fetchDemand = async (pageSize: number, pageNumber: number) => {
    const response = await customFetcher(
      `http://localhost:5000/api/demand/validation/list/${user.id}?` +
        new URLSearchParams({
          pageSize: pageSize.toString() || "5",
          pageNumber: pageNumber.toString() || "1",
        }),
    );
    if (response.response.status === 200) {
      setDemandList(response.data.data.list);
      setTotalData(response.data.data.totalData);
    }
  };

  useEffect(() => {
    fetchDemand(pageSize, pageNumber).then();
  }, [pageSize, pageNumber]);

  const handlePageSize = (pageSize: string) => {
    setPageNumber(1);
    setPageSize(+pageSize);
  };

  const handlePreviousPageNumber = () => {
    setPageNumber(pageNumber - 1);
  };

  const handleNextPageNumber = () => {
    setPageNumber(pageNumber + 1);
  };

  const handleGoToDemandDetail = (demandId: number) => {
    navigate(`demand/${demandId}`, {
      state: { previousRoute: window.location.pathname, user },
    });
  };

  const getStatusOption = (status: DemandType) => {
    switch (status) {
      case DemandType.CA:
        return {
          icon: (
            <TbCalendarClock className="size-9 text-indigo-500 opacity-75" />
          ),
          label: "Demande de congés",
        };
      case DemandType.RTT:
        return {
          icon: <TbCalendarRepeat className="size-9 text-red-500 opacity-75" />,
          label: "Demande de RTT",
        };
      case DemandType.TT:
        return {
          icon: (
            <MdOutlineLaptop className="size-9 text-orange-500 opacity-75" />
          ),
          label: "Demande de télétravail",
        };
      case DemandType.ABSENCE:
        return {
          icon: (
            <FaRegCalendarXmark className="size-8 text-amber-500 opacity-75" />
          ),
          label: "Absence",
        };
      case DemandType.SICKNESS:
        return {
          icon: (
            <GiMedicalThermometer className="size-8 text-red-500 opacity-75" />
          ),
          label: "Arrêt maladie",
        };
      default:
        return {
          icon: <MinusIcon />,
          label: "???",
        };
    }
  };

  const getClassForStatus = (status: DemandStatus) => {
    switch (status) {
      case DemandStatus.ACCEPTED:
        return <Badge variant="accepted">Acceptée</Badge>;
      case DemandStatus.WAITING:
        return <Badge variant="waiting">En attente</Badge>;
      case DemandStatus.DENIED:
        return <Badge variant="denied">Refusée</Badge>;
      case DemandStatus.DRAFT:
        return <Badge variant="draft">A confirmer</Badge>;
      default:
        return <Badge variant="outline">Erreur</Badge>;
    }
  };

  const template = (
    <>
      <div className="rounded pt-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left">Demande</TableHead>
              <TableHead className="text-left">Date de début</TableHead>
              <TableHead className="text-left">Date de fin</TableHead>
              <TableHead className="text-left">Jours</TableHead>
              <TableHead className="text-left">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {demandList.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  Aucune demande trouvée
                </TableCell>
              </TableRow>
            ) : (
              demandList.map((demand: DemandValidatedList) => (
                <TableRow
                  key={demand.id}
                  className="hover:cursor-pointer"
                  onClick={() => handleGoToDemandDetail(demand.id)}
                >
                  <TableCell className="flex gap-2 text-left">
                    {getStatusOption(demand.type).icon}
                    <div>
                      <div>{getStatusOption(demand.type).label}</div>
                      <div className="text-xs text-zinc-500">
                        {new Date(
                          demand?.created_at?.toString(),
                        ).toLocaleDateString("fr-FR", dateOptions)}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-left">
                    {new Date(
                      demand?.start_date?.toString(),
                    ).toLocaleDateString("fr-FR")}
                  </TableCell>
                  <TableCell className="text-left">
                    {new Date(demand?.end_date?.toString()).toLocaleDateString(
                      "fr-FR",
                    )}
                  </TableCell>
                  <TableCell className="text-left">
                    {demand.number_day}
                  </TableCell>
                  <TableCell className={`text-left`}>
                    {getClassForStatus(demand.status)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex w-full justify-between py-2">
        <div className="flex items-center gap-2">
          <Label>Demandes par page</Label>
          <Select
            onValueChange={(value) => handlePageSize(value)}
            defaultValue={pageSize.toString()}
          >
            <SelectTrigger className="w-fit">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-950 dark:text-gray-100">
            {`${1 + pageSize * (pageNumber - 1)} - ${
              demandList.length + pageSize * (pageNumber - 1)
            } sur ${totalData}`}
          </span>
          <Button
            variant="ghost"
            onClick={handlePreviousPageNumber}
            disabled={pageNumber === 1}
          >
            <CaretLeftIcon />
          </Button>
          <Button
            variant="ghost"
            onClick={handleNextPageNumber}
            disabled={pageSize * pageNumber >= totalData}
          >
            <CaretRightIcon />
          </Button>
        </div>
      </div>
    </>
  );
  return template;
};
