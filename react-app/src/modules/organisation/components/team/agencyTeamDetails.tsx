import { Button } from "@/components/ui/button.tsx";
import { FaArrowLeft } from "react-icons/fa";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { useNavigate, useParams } from "react-router-dom";
import { customFetcher } from "@/common/helper/fetchInstance.ts";
import React, { useEffect, useState } from "react";
import { MdHomeRepairService, MdOutlineVisibility } from "react-icons/md";
import { TeamModel } from "@/models/organisation/Team.model.ts";
import { FieldRow } from "@/components/fieldRow.tsx";
import { getDemandTypeLabel } from "@/common/enum/DemandType.enum.ts";
import { dateOptions, dateTimeOptions } from "@/common/helper/DateHelper.ts";
import { getDemandBadge } from "@/modules/demand/components/demandBadge.tsx";
import { TeamStatus } from "@/common/enum/TeamStatus.enum.ts";
import { Badge } from "@/components/ui/badge.tsx";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx";
import { TeamList } from "@/models/organisation/TeamList.model.ts";
import { PlusIcon } from "@radix-ui/react-icons";

export const AgencyTeamDetails = () => {
  const [team, setTeam] = useState<TeamModel>(new TeamModel());
  const { id_service, id_agency, id_team } = useParams();
  const navigate = useNavigate();

  const fetchTeam = async () => {
    const { response, data } = await customFetcher(
      `http://localhost:5000/api/team/details/${id_team}`,
    );
    if (response.status === 200) {
      setTeam(data.data);
    }
  };

  useEffect(() => {
    fetchTeam().then();
  }, []);

  const getStatusBadge = (status: TeamStatus) => {
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

  const handleClick = () => {
    navigate(`/organisation/agency/${id_agency}/service/details/${id_service}`);
  };

  return (
    <>
      <div>
        <Button variant="link" onClick={handleClick}>
          <FaArrowLeft className="mr-2" />
          <div>Service</div>
        </Button>
      </div>
      <div className="w-full py-4">
        <Card className="flex items-center px-4">
          <CardHeader className="flex items-center">
            <MdHomeRepairService className="size-10 text-gray-300" />
          </CardHeader>
          <div className="flex flex-grow flex-col">
            <CardTitle className="text-lg font-semibold">
              {team.label}
            </CardTitle>
            <CardDescription className="text-sm text-gray-600">
              Chef de l'équipe : {team.lead_team_firstname}{" "}
              {team.lead_team_lastname}
            </CardDescription>
          </div>
        </Card>
      </div>
      <div className="flex w-full gap-4 max-md:flex-col">
        <div className="flex-1">
          <Card className="mb-2">
            <CardHeader>
              <CardTitle>Statut {getStatusBadge(team.status)}</CardTitle>
            </CardHeader>
            <CardContent className="divide-y divide-slate-300 dark:divide-slate-700">
              <FieldRow title="Présence">
                {team.total_present} présent(s) sur {team.total_team}
              </FieldRow>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Détails de la demande</CardTitle>
            </CardHeader>
            <CardContent className="divide-y divide-slate-300 dark:divide-slate-700">
              <FieldRow title="Nom de l'équipe">{team.label}</FieldRow>
              <FieldRow title="Chef d'équipe">
                {team.lead_team_firstname} {team.lead_team_lastname}
              </FieldRow>
            </CardContent>
          </Card>
        </div>
        <div className="flex-1">
          <div className="flex justify-end pb-4">
            <Button variant="callToAction">
              <PlusIcon className="mr-2 size-4" />
              Ajouter un membre
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
                <TableRow>
                  <TableCell className={`text-left`}>
                    {team.lead_team_firstname} {team.lead_team_lastname}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Card>
        </div>
      </div>
    </>
  );
};
