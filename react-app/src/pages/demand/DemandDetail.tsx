import { ReactNode, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { CheckIcon, Pencil1Icon } from "@radix-ui/react-icons";
import { toast } from "sonner";

import { Button } from "@/components/ui/button.tsx";
import { DemandAll, DemandDTO, DemandStatus } from "@/models/Demand.model.ts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { customFetcher } from "@/helper/fetchInstance.ts";
import { Badge } from "@/components/ui/badge.tsx";
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

export function DemandDetail() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [demand, setDemand] = useState<DemandAll>({
    id: 0,
    motivation: "",
    start_date: new Date(),
    end_date: new Date(),
    type: DemandType.CA,
    status: DemandStatus.DRAFT,
    created_at: new Date(),
    number_day: 0,
  });

  const handleClick = () => {
    navigate("/demand");
  };

  const fetchDemand = async () => {
    const data = await customFetcher(`http://localhost:5000/api/demand/${id}`);
    setDemand(data.data.data);
  };

  useEffect(() => {
    fetchDemand().then();
  }, []);

  return (
    <>
      <div>
        <Button variant="link" onClick={handleClick}>
          <FaArrowLeft className="mr-2" />
          <div>Demandes</div>
        </Button>
      </div>
      {id ? <Detail demand={demand} /> : <div> Cette demande n'existe pas</div>}
    </>
  );
}

interface DetailProps {
  demand: DemandAll;
}

export function Detail({ demand }: DetailProps) {
  const navigate = useNavigate();
  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  const getClassForStatus = (status: string) => {
    switch (status) {
      case "ACCEPTED":
        return <Badge variant="accepted">Acceptée</Badge>;
      case "WAITING":
        return <Badge variant="waiting">En attente</Badge>;
      case "DENIED":
        return <Badge variant="denied">Refusée</Badge>;
      case "DRAFT":
        return <Badge variant="draft">A confirmer</Badge>;
      default:
        return <Badge variant="outline">Erreur</Badge>;
    }
  };

  const TypeDemand = (status: DemandType) => {
    switch (status) {
      case DemandType.CA:
        return "Congés payés";
      case DemandType.TT:
        return "Télétravail";
      case DemandType.RTT:
        return "RTT (Récupération du temps de travail)";
      case DemandType.SICKNESS:
        return "Arrêt maladie";
      case DemandType.ABSENCE:
        return "Absence";
      default:
        return "erreur";
    }
  };

  const handleEditClick = (id: number) => {
    navigate(`/demand/edit/${id}`);
  };

  const handleConfirmClick = async (id: number, demand: DemandDTO) => {
    const response = await customFetcher(
      `http://localhost:5000/api/demand/status/${id}`,
      {
        method: "PUT",
      },
    );

    if (response.response.status === 200) {
      toast.message(`Demande de ${demand.type} numéro ${id} envoyée`);
      navigate("/demand", { replace: true });
    }
  };

  const handleButton = () => {
    if (demand.status === "DRAFT") {
      return (
        <div>
          <ConfirmDeleteItem demand={demand} navigate={navigate} />
          <Button
            variant="secondary"
            onClick={() => handleEditClick(demand.id)}
            className="mx-2"
          >
            <Pencil1Icon className="mr-2 size-5" />
            Modifier
          </Button>
          <Button
            variant="callToAction"
            onClick={() => handleConfirmClick(demand.id, demand)}
          >
            <CheckIcon className="mr-2 size-5" />
            Confirmer la demande
          </Button>
        </div>
      );
    }
  };

  return (
    <div className="w-full">
      <Card className="col-span-1 max-2xl:col-span-3">
        <CardHeader className="text-gray-900 dark:text-gray-300">
          <CardTitle className="flex items-center justify-between gap-4 text-xl">
            <span>Informations de la demande</span>
            {handleButton()}
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y divide-slate-300 dark:divide-slate-700">
          <UserInfoRow title="Type">{TypeDemand(demand.type)}</UserInfoRow>
          <UserInfoRow title="Status">
            {getClassForStatus(demand.status)}
          </UserInfoRow>
          <UserInfoRow title="Description">{demand.motivation}</UserInfoRow>
          <UserInfoRow title="Date de création">
            {new Date(demand.created_at.toString()).toLocaleDateString(
              "fr-FR",
              dateTimeOptions,
            )}
          </UserInfoRow>
          <UserInfoRow title="Date de début">
            {new Date(demand.start_date.toString()).toLocaleDateString(
              "fr-FR",
              dateOptions,
            )}
          </UserInfoRow>
          <UserInfoRow title="Date de fin">
            {new Date(demand.end_date.toString()).toLocaleDateString(
              "fr-FR",
              dateOptions,
            )}
          </UserInfoRow>
          <UserInfoRow title="Total jour(s)">{demand.number_day}</UserInfoRow>
        </CardContent>
      </Card>
    </div>
  );
}

interface ConfirmDeleteItemProps {
  demand: DemandAll;
  navigate: ReturnType<typeof useNavigate>;
}

export function ConfirmDeleteItem({
  demand,
  navigate,
}: ConfirmDeleteItemProps) {
  const fetchDemand = async () => {
    const response = await customFetcher(
      `http://localhost:5000/api/demand/${demand.id}`,
      {
        method: "DELETE",
      },
    );

    if (response.response.status === 200) {
      toast.message(`Demande numéro ${demand.id} supprimée`);
      navigate("/demand", { replace: true });
    }
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
            Vous êtes sur le point de supprimer de manière definitive la demande
            sélectionnée, cette action est irréversible.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>

          <Button onClick={fetchDemand} variant="destructive">
            Supprimer
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

interface UserInfoRowProps {
  title: string;
  children: ReactNode;
}

export function UserInfoRow({ title, children }: UserInfoRowProps) {
  return (
    <div className="flex flex-col gap-1 p-4">
      <div className="text-xs text-slate-800 dark:text-slate-300">{title}</div>
      <div className="font-bold text-slate-950 dark:text-slate-50">
        {children}
      </div>
    </div>
  );
}

export enum DemandType {
  RTT = "RTT",
  TT = "TT",
  CA = "CA",
  SICKNESS = "SICKNESS",
  ABSENCE = "ABSENCE",
}
