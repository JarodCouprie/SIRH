import { useEffect, useState } from "react";
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
    fetchTeam(pageSize, pageNumber).then();
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
    navigate(`/organisation/agency/${id_agency}/team/create`);
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
            <TableHead className="text-left">Équipe</TableHead>
            <TableHead className="text-left">Chef d'équipe</TableHead>
            <TableHead className="text-left">Collaborateurs</TableHead>
            <TableHead className="text-left">Statut</TableHead>
          </TableHeader>
          <TableBody>
            {teamList.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  Aucune équipe trouvé
                </TableCell>
              </TableRow>
            ) : (
              teamList.map((team: TeamList) => (
                <TableRow
                  key={team.id}
                  className="hover:cursor-pointer"
                  //onClick={() => handleClick(department.id)}
                >
                  <TableCell className="flex gap-2 text-left">
                    {team.label}
                  </TableCell>
                  <TableCell className={`text-left`}>
                    {team.id_user_lead_team}
                  </TableCell>
                  <TableCell className={`text-left`}>
                    {/* {getClassForStatus(department.status)} */}4 présent(s)
                    sur 7
                  </TableCell>
                  <TableCell>///</TableCell>
                </TableRow>
              ))
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
