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
import { useEffect, useState } from "react";
import { MdHomeRepairService, MdOutlineDelete } from "react-icons/md";
import { TeamModel } from "@/models/organisation/team/Team.model.ts";
import { FieldRow } from "@/components/fieldRow.tsx";
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
import { PlusIcon } from "@radix-ui/react-icons";
import { TeamMembers } from "@/models/organisation/team/TeamMembers.model.ts";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar.tsx";
import { MemberStatus } from "@/common/enum/MemberStatus.enum.ts";
import { useCurrentUser } from "@/common/hooks/useCurrentUser.ts";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog.tsx";

export const AgencyTeamDetails = () => {
  const [team, setTeam] = useState<TeamModel>(new TeamModel());
  const [members, setMembers] = useState<TeamMembers[]>([]);
  const { id_service, id_agency, id_team } = useParams();
  const navigate = useNavigate();

  const fetchTeam = async () => {
    const { response, data } = await customFetcher(
      `http://localhost:5000/api/team/details/${id_team}`,
    );
    if (response.status === 200) {
      setTeam(data.data);
      setMembers(data.data.members);
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

  const getStatusPresent = (status: MemberStatus) => {
    if (status === MemberStatus.PRESENT) {
      return <Badge variant="accepted">Présent</Badge>;
    }
    if (status === MemberStatus.NOT_PRESENT) {
      return <Badge variant="denied">Absent</Badge>;
    }
  };

  const handleClick = () => {
    navigate(`/organisation/agency/${id_agency}/service/details/${id_service}`);
  };

  const handleUserLeadTeam = (lead_email: string, member_email: string) => {
    if (lead_email === member_email) {
      return <Badge variant="accepted">Chef d'équipe</Badge>;
    } else {
      return <Badge variant="neutral">Membre</Badge>;
    }
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
          <ConfirmDeleteItem team={team} navigate={navigate} />
          <div className="flex justify-end">
            <Button variant="callToAction">
              <PlusIcon className="mr-2 size-4" />
              Ajouter un membre
            </Button>
          </div>
        </Card>
      </div>
      <div className="flex w-full gap-4 max-md:flex-col">
        <div className="flex-1">
          <Card className="mb-2">
            <CardHeader>
              <CardTitle>Statut {getStatusBadge(team.status)}</CardTitle>
              <CardDescription>
                {team.total_present} présent(s) sur {team.total_team}
              </CardDescription>
            </CardHeader>
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
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-left">
                    Membre de l'équipe
                  </TableHead>
                  <TableHead className="text-left">Statut</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {members.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={2} className="h-24 text-center">
                      Aucun membre dans l'équipe
                    </TableCell>
                  </TableRow>
                ) : (
                  members.map((member: TeamMembers) => (
                    <TableRow
                      key={member.id_member}
                      className="hover:cursor-pointer"
                    >
                      <TableCell className="flex gap-2 font-medium">
                        <Avatar>
                          <AvatarImage
                            src={member.member_avatar}
                            alt={`avatar image of ${member.member_firstname} ${member.member_lastname}`}
                          />
                          <AvatarFallback>
                            {member.member_firstname.charAt(0)}
                            {member.member_lastname.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <div>
                            {member.member_firstname} {member.member_lastname}{" "}
                            {handleUserLeadTeam(
                              member.member_email,
                              team.lead_team_email,
                            )}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {member.member_email}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {getStatusPresent(member.is_present)}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </Card>
        </div>
      </div>
    </>
  );
};

interface ConfirmDeleteItemProps {
  team: TeamModel;
  navigate: ReturnType<typeof useNavigate>;
}

export function ConfirmDeleteItem({ team, navigate }: ConfirmDeleteItemProps) {
  const { refreshCurrentUser } = useCurrentUser();
  const { id_team, id_service, id_agency } = useParams();

  const fetchDepartment = async () => {
    const response = await customFetcher(
      `http://localhost:5000/api/team/${id_team}`,
      {
        method: "DELETE",
      },
    );

    if (response.response.status === 200) {
      navigate(
        `/organisation/agency/${id_agency}/service/details/${id_service}`,
        { replace: true },
      );
    }

    refreshCurrentUser();
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost">
          <MdOutlineDelete className="mr-2 size-5 text-red-600" />
          <span className="text-red-600">Supprimer</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Êtes vous vraiment sur?</AlertDialogTitle>
          <AlertDialogDescription>
            Vous êtes sur le point de supprimer de manière definitive l'équipe
            {team.label} du service {team.service_label}, cette action est
            irréversible.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>

          <Button onClick={fetchDepartment} variant="destructive">
            Supprimer
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
