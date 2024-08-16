import { UserModel } from "@/models/user/User.model.js";
import React, { useEffect, useState } from "react";
import { customFetcher } from "@/common/helper/fetchInstance.js";
import { DemandValidated } from "@/common/type/demand/validated-demand-list.type.js";
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
import { CaretLeftIcon, CaretRightIcon } from "@radix-ui/react-icons";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.js";
import { useNavigate } from "react-router-dom";
import { UserRejectDemand } from "@/modules/user/components/demand/userRejectDemand.js";
import { UserConfirmDemand } from "@/modules/user/components/demand/userConfirmDemand.js";
import { DemandStatus } from "@/common/enum/DemandStatus.enum.js";
import { getDemandBadge } from "@/modules/demand/components/demandBadge.js";
import { DemandListLabel } from "@/modules/demand/components/demandListLabel.js";

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
                    <DemandListLabel
                      type={demand.type}
                      created_at={demand.created_at}
                    />
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
                      {getDemandBadge(demand.status)}
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
