import { Button } from "@/components/ui/button.tsx";
import { FaArrowLeft } from "react-icons/fa6";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DemandDTO } from "@/models/DemandModel.ts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { customFetcher } from "@/helper/fetchInstance.ts";
import { MdOutlineDelete } from "react-icons/md";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog.tsx";
import { toast } from "sonner";

export function DemandDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [demand, setDemand] = useState<DemandDTO>({
    motivation: "",
    startDate: new Date(),
    endDate: new Date(),
    type: DemandType.CA,
  });

  const handleClick = () => {
    navigate("/demand");
  };

  const fetchDemand = async () => {
    await customFetcher(`http://localhost:5000/api/demand/${id}`).then(
      (data) => {
        setDemand(data.data.data);
      },
    );
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

export function Detail({ demand }: any) {
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

  const TypeDemand = (status: any) => {
    switch (status) {
      case "CA":
        return "Congés payés";
      case "TT":
        return "Télétravail";
      case "RTT":
        return "RTT (Récupération du temps de travail)";
      default:
        return "erreur";
    }
  };

  const handleEditClick = (id: number) => {
    navigate(`/demand/edit/${id}`);
  };

  return (
    <>
      <div className="w-full">
        <Card className="col-span-1 max-2xl:col-span-3">
          <CardHeader className="text-gray-900 dark:text-gray-300">
            <CardTitle className="flex items-center justify-between gap-4 text-xl">
              <span>Informations de la demande</span>
              <div>
                <Button
                  variant="callToAction"
                  onClick={() => handleEditClick(demand.id)}
                  className="mx-2"
                >
                  <Pencil1Icon className="mr-2 size-5" />
                  Modifier
                </Button>
                <ConfirmDeleteItem demandId={demand.id} navigate={navigate} />
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="divide-y divide-slate-300 dark:divide-slate-700">
            <UserInfoRow title="Type">{TypeDemand(demand.type)}</UserInfoRow>
            <UserInfoRow title="Description">{demand.motivation}</UserInfoRow>
            <UserInfoRow title="Date de création">
              {new Date(demand?.createdAt?.toString()).toLocaleDateString(
                "fr-FR",
                dateTimeOptions,
              )}
            </UserInfoRow>
            <UserInfoRow title="Date de début">
              {new Date(demand?.startDate?.toString()).toLocaleDateString(
                "fr-FR",
                dateOptions,
              )}
            </UserInfoRow>
            <UserInfoRow title="Date de fin">
              {new Date(demand?.endDate?.toString()).toLocaleDateString(
                "fr-FR",
                dateOptions,
              )}
            </UserInfoRow>
            <UserInfoRow title="Total jour(s)">{demand.number_day}</UserInfoRow>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export function ConfirmDeleteItem({ demandId, navigate }: any) {
  const fetchDemand = async () => {
    const response = await customFetcher(
      `http://localhost:5000/api/demand/${demandId}`,
      {
        method: "DELETE",
      },
    );

    if (response.response.status === 200) {
      toast.message(`Demande numéro ${demandId} supprimé`);
      navigate("/demand", { replace: true });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" onClick={ConfirmDeleteItem}>
          <MdOutlineDelete className="mr-2 size-5" />
          Supprimer
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Êtes vous vraiment sur?</AlertDialogTitle>
          <AlertDialogDescription>
            Vous êtes sur le point de supprimer de manière definitif la demande
            sélectionner, cette action est irréversible.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction onClick={fetchDemand}>Supprimer</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function UserInfoRow(props: any) {
  const title: string = props.title || "Titre à donner";
  const children: React.JSX.Element = props.children;
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
}