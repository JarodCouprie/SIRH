import { UserModel } from "@/models/user/User.model.js";
import React, { useEffect, useState } from "react";
import { customFetcher } from "@/helper/fetchInstance.js";
import { DemandValidated } from "@/type/demand/validated-demand-list.type.js";
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
import { UserRejectDemand } from "@/components/user/demand/userRejectDemand.js";
import { UserConfirmDemand } from "@/components/user/demand/userConfirmDemand.js";

interface UserDemandProps {
  user: UserModel;
}

export const UserDemands: React.FC<UserDemandProps> = ({ user }) => {
  const [demandList, setDemandList] = useState<DemandValidated[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [totalData, setTotalData] = useState<number>(0);
  const navigate = useNavigate();

  const dateOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const fetchDemand = async (pageSize: number, pageNumber: number) => {
    const response = await customFetcher(
      `http://localhost:5000/api/demand/validation/list/${user.id}?` +
        new URLSearchParams({
          pageSize: pageSize.toString() || "10",
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
          label: "Congés",
        };
      case DemandType.RTT:
        return {
          icon: <TbCalendarRepeat className="size-9 text-red-500 opacity-75" />,
          label: "RTT",
        };
      case DemandType.TT:
        return {
          icon: (
            <MdOutlineLaptop className="size-9 text-orange-500 opacity-75" />
          ),
          label: "Télétravail",
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

  return (
    <>
      <div className="rounded pt-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left">Demande</TableHead>
              <TableHead className="text-center">Jours</TableHead>
              <TableHead>Période</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {demandList.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  Aucune demande trouvée
                </TableCell>
              </TableRow>
            ) : (
              demandList.map((demand: DemandValidated) => (
                <TableRow
                  key={demand.id}
                  className="hover:cursor-pointer"
                  onClick={() => handleGoToDemandDetail(demand.id)}
                >
                  <TableCell>
                    <div className="flex gap-2 text-nowrap text-left">
                      {getStatusOption(demand.type).icon}
                      <div>
                        <div>{getStatusOption(demand.type).label}</div>
                        <div className="text-xs text-zinc-500">
                          {new Date(demand?.created_at).toLocaleDateString(
                            "fr-FR",
                            dateOptions,
                          )}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell align="center">{demand.number_day}</TableCell>
                  <TableCell align="left">
                    {new Date(demand?.start_date).toLocaleDateString(
                      "fr-FR",
                      dateOptions,
                    )}
                    <span> - </span>
                    {new Date(demand?.end_date).toLocaleDateString(
                      "fr-FR",
                      dateOptions,
                    )}
                  </TableCell>
                  <TableCell align="left">
                    <div className="flex flex-col gap-1">
                      {getClassForStatus(demand.status)}
                      {demand.id_validator && (
                        <div className="flex gap-1">
                          <span className="text-xs font-semibold">
                            <span>{demand.validator_firstname}</span>
                            <span> {demand.validator_lastname}</span>
                          </span>
                          <span className="text-xs text-zinc-500">
                            {new Date(demand?.validated_at).toLocaleDateString(
                              "fr-FR",
                              dateOptions,
                            )}
                          </span>
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {demand.status === DemandStatus.WAITING && (
                      <div className="flex justify-end gap-2">
                        <UserRejectDemand
                          demand={demand}
                          refreshUserDemands={() =>
                            fetchDemand(pageSize, pageNumber)
                          }
                        />
                        <UserConfirmDemand
                          demand={demand}
                          refreshUserDemands={() =>
                            fetchDemand(pageSize, pageNumber)
                          }
                        />
                      </div>
                    )}
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
};
