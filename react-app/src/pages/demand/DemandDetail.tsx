import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { MdOutlineDelete, MdOutlineVisibility } from "react-icons/md";
import { CheckIcon, Pencil1Icon } from "@radix-ui/react-icons";
import { toast } from "sonner";
import { Button } from "@/components/ui/button.tsx";
import { DemandDTO, DemandList } from "@/models/demand/DemandList.model.ts";
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
import { useCurrentUser } from "@/hooks/useCurrentUser.js";
import { DemandType } from "@/enum/DemandType.enum.js";
import { DemandStatus } from "@/enum/DemandStatus.enum.js";
import { FieldRow } from "@/components/user/fieldRow.js";
import { dateOptions, dateTimeOptions } from "@/helper/DateHelper.js";

export function DemandDetail() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [demand, setDemand] = useState<DemandList>(new DemandList());

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
  demand: DemandList;
}

export function Detail({ demand }: DetailProps) {
  const navigate = useNavigate();
  const { currentUser } = useCurrentUser();

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
  const fetchFileNameFromUrl = (url?: string) => {
    if (!url || url === "") return "Aucun fichier";
    let fileName = url.split("/").pop();
    if (fileName) fileName = fileName.split("?")[0];
    else fileName = "Aucun fichier";

    return fileName;
  };

  const previewButton = (url?: string) => {
    if (url && url !== "")
      return (
        <Button variant="default" onClick={handlePreviewFile}>
          <MdOutlineVisibility className="mr-2 size-6" />
          Voir le document
        </Button>
      );
  };

  const handlePreviewFile = () => {
    window.open(demand.file_key, "_blank");
  };
  const handleButton = () => {
    if (
      demand.status === DemandStatus.DRAFT &&
      demand.id_owner === currentUser.id
    ) {
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
          <FieldRow title="Type">{TypeDemand(demand.type)}</FieldRow>
          <FieldRow title="Statut">{getClassForStatus(demand.status)}</FieldRow>
          <FieldRow title="Description">{demand.motivation}</FieldRow>
          <FieldRow title="Date de création">
            {new Date(demand.created_at.toString()).toLocaleDateString(
              "fr-FR",
              dateTimeOptions,
            )}
          </FieldRow>
          <FieldRow title="Date de début">
            {new Date(demand.start_date.toString()).toLocaleDateString(
              "fr-FR",
              dateOptions,
            )}
          </FieldRow>
          <FieldRow title="Date de fin">
            {new Date(demand.end_date.toString()).toLocaleDateString(
              "fr-FR",
              dateOptions,
            )}
          </FieldRow>
          <FieldRow title="Total jour(s)">{demand.number_day}</FieldRow>
          <FieldRow title="Fichier">
            <div className="flex flex-wrap gap-2">
              {fetchFileNameFromUrl(demand.file_key)}
              <div className="">{previewButton(demand.file_key)}</div>
            </div>
          </FieldRow>
        </CardContent>
      </Card>
    </div>
  );
}

interface ConfirmDeleteItemProps {
  demand: DemandList;
  navigate: ReturnType<typeof useNavigate>;
}

export function ConfirmDeleteItem({
  demand,
  navigate,
}: ConfirmDeleteItemProps) {
  const { refreshCurrentUser } = useCurrentUser();

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
