import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button.js";
import { CaretLeftIcon, CaretRightIcon, PlusIcon } from "@radix-ui/react-icons";
import { customFetcher } from "@/common/helper/fetchInstance.js";
import { TeamList } from "@/models/organisation/TeamList.model.js";
import { useNavigate, useParams } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.js";
import { Label } from "@/components/ui/label.js";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.js";
import { Card } from "@/components/ui/card.js";
import { TeamStatus } from "@/common/enum/TeamStatus.enum.ts";
import { Badge } from "@/components/ui/badge.tsx";
import { MdHomeRepairService } from "react-icons/md";

export const AgencyTeam = () => {
  const [teamList, setTeamList] = useState<TeamList[]>([]);
  const [totalData, setTotalData] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [pageNumber, setPageNumber] = useState(1);
  const navigate = useNavigate();
  const { id_agency, id_service } = useParams();

  const fetchTeam = async (pageSize: number, pageNumber: number) => {
    const response = await customFetcher(
      `http://localhost:5000/api/team/${id_service}?` +
        new URLSearchParams({
          pageSize: pageSize.toString() || "10",
          pageNumber: pageNumber.toString() || "1",
        }),
    );
    if (response.response.status === 200) {
      setTeamList(response.data.data.list);
      setTotalData(response.data.data.totalData);
    }
  };

  useEffect(() => {
    fetchTeam(pageSize, pageNumber);
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

  const handleClickCreate = () => {
    navigate(
      `/organisation/agency/${id_agency}/service/details/${id_service}/team/create`,
    );
  };

  const handleClick = (id: number) => {
    navigate(
      `/organisation/agency/${id_agency}/service/details/${id_service}/team/details/${id}`,
    );
  };

  const handleStatus = (status: TeamStatus) => {
    if (status === TeamStatus.COMPLETE) {
      return <Badge variant="accepted">Effectif complet</Badge>;
    }
    if (status === TeamStatus.UNDERSTAFFED) {
      return <Badge variant="waiting">Sous effectif</Badge>;
    }
    if (status === TeamStatus.ENOUGH) {
      return <Badge variant="draft">Effectif suffisant</Badge>;
    }
    if (status === TeamStatus.NOT_ENOUGH) {
      return <Badge variant="denied">Effectif insuffisant</Badge>;
    }
  };

  return (
    <>
      <div className="flex justify-end">
        <Button variant="callToAction" onClick={handleClickCreate}>
          <PlusIcon className="mr-2 size-4" />
          Créer une équipe
        </Button>
      </div>
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left">Équipe</TableHead>
              <TableHead className="text-left">Chef d'équipe</TableHead>
              <TableHead className="text-left">Statut</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teamList.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="h-24 text-center">
                  <div className="flex flex-col gap-2">
                    <span>Aucune équipe trouvé</span>
                    <span>Céez en une</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              teamList.map((team: TeamList) => {
                return (
                  <TableRow
                    key={team.id}
                    className="hover:cursor-pointer"
                    onClick={() => handleClick(team.id)}
                  >
                    <TableCell className="flex gap-2 text-left">
                      <MdHomeRepairService className="size-8 text-gray-300" />
                      <div>
                        <div>{team.label}</div>
                        <div className="text-xs text-zinc-500">
                          {team.total_present} présent(s) sur {team.total_team}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className={`text-left`}>
                      {team.lead_team_firstname} {team.lead_team_lastname}
                    </TableCell>
                    <TableCell>{handleStatus(team.status)}</TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </Card>
      <div className="flex w-full justify-between">
        <div className="flex items-center gap-2">
          <Label>Équipes par page</Label>
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
            {`${teamList.length === 0 ? 0 : 1 + pageSize * (pageNumber - 1)} - ${teamList.length + pageSize * (pageNumber - 1)} sur ${totalData}`}
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
