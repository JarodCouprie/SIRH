import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { Button } from "@/components/ui/button.js";
import { customFetcher } from "@/helper/fetchInstance.js";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.js";
import { getDemandTypeLabel } from "@/enum/DemandType.enum.js";
import { FieldRow } from "@/components/user/fieldRow.js";
import { getDemandBadge } from "@/components/demand/demandBadge.js";
import { Demand } from "@/models/demand/Demand.model.js";
import { dateOptions, dateTimeOptions } from "@/helper/DateHelper.js";
import { MdOutlineVisibility } from "react-icons/md";
import { UserConfirmDemand } from "@/components/user/demand/userConfirmDemand.js";
import { UserRejectDemand } from "@/components/user/demand/userRejectDemand.js";
import { DemandStatus } from "@/enum/DemandStatus.enum.js";

export const UserDemandDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state.user;
  const { demandId } = useParams<{ demandId: string }>();

  const [demand, setDemand] = useState(new Demand());

  const handleClick = () => {
    if (location.state?.previousRoute) {
      navigate(location.state.previousRoute);
    } else {
      navigate("/user");
    }
  };

  const fetchDemand = async () => {
    const { data } = await customFetcher(
      `http://localhost:5000/api/demand/${demandId}`,
    );
    setDemand(data.data);
  };

  useEffect(() => {
    fetchDemand().then();
  }, []);

  const getFileNameFromUrl = (url?: string) => {
    if (!url) {
      return "Aucun fichier";
    }
    return url?.split("/")?.pop()?.split("?")[0];
  };

  const handlePreviewFile = () => {
    window.open(demand.file_url, "_blank");
  };

  return (
    <div className="flex flex-col items-start gap-4">
      <div className="flex w-full flex-wrap justify-between gap-2">
        <Button variant="link" onClick={handleClick}>
          <FaArrowLeft className="mr-2" />
          <div>
            {user ? `${user?.firstname} ${user?.lastname}` : "Utilisateur"}
          </div>
        </Button>
        {demand.status === DemandStatus.WAITING && (
          <div className="flex gap-2">
            <UserRejectDemand
              demand={demand}
              refreshUserDemands={() => fetchDemand()}
            />
            <UserConfirmDemand
              demand={demand}
              refreshUserDemands={() => fetchDemand()}
            />
          </div>
        )}
      </div>
      <div className="flex w-full gap-4 max-md:flex-col">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Détails de la demande</CardTitle>
          </CardHeader>
          <CardContent className="divide-y divide-slate-300 dark:divide-slate-700">
            <FieldRow title="Type">{getDemandTypeLabel(demand.type)}</FieldRow>
            <FieldRow title="Description">{demand.motivation}</FieldRow>
            <FieldRow title="Date de création">
              {new Date(demand.created_at).toLocaleDateString(
                "fr-FR",
                dateTimeOptions,
              )}
            </FieldRow>
            <FieldRow title="Période">
              <span className="font-normal">Du </span>
              <span>
                {new Date(demand.start_date).toLocaleDateString(
                  "fr-FR",
                  dateOptions,
                )}
              </span>
              <span className="font-normal"> au </span>
              <span>
                {new Date(demand.end_date).toLocaleDateString(
                  "fr-FR",
                  dateOptions,
                )}
              </span>
            </FieldRow>
            <FieldRow title="Jours pris">{demand.number_day}</FieldRow>
            <FieldRow title="Fichier">
              <div className="flex flex-wrap gap-2">
                {getFileNameFromUrl(demand.file_url)}
                {demand.file_url && (
                  <Button variant="default" onClick={handlePreviewFile}>
                    <MdOutlineVisibility className="mr-2 size-6" />
                    Voir le document
                  </Button>
                )}
              </div>
            </FieldRow>
          </CardContent>
        </Card>
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Validation de la demande</CardTitle>
          </CardHeader>
          <CardContent className="divide-y divide-slate-300 dark:divide-slate-700">
            <FieldRow title="Statut">{getDemandBadge(demand.status)}</FieldRow>
            {demand.validated_at && (
              <FieldRow title="Date de validation">
                {new Date(demand.validated_at).toLocaleDateString(
                  "fr-FR",
                  dateOptions,
                )}
              </FieldRow>
            )}
            {(demand.validator_lastname || demand.validator_lastname) && (
              <FieldRow title="Validé par">
                {demand.validator_firstname} {demand.validator_lastname}
              </FieldRow>
            )}
            {demand.justification && (
              <FieldRow title="Justification">{demand.justification}</FieldRow>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
