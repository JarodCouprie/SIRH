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

  return (
    <div className="flex flex-col items-start gap-4">
      <Button variant="link" onClick={handleClick}>
        <FaArrowLeft className="mr-2" />
        <div>
          {user ? `${user?.firstname} ${user?.lastname}` : "Utilisateur"}
        </div>
      </Button>
      <div className="flex w-full gap-4 max-md:flex-col">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Demande initiale</CardTitle>
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
            <FieldRow title="Fichier">{demand.file_key}</FieldRow>
          </CardContent>
        </Card>
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Validation</CardTitle>
          </CardHeader>
          <CardContent className="divide-y divide-slate-300 dark:divide-slate-700">
            <FieldRow title="Statut">{getDemandBadge(demand.status)}</FieldRow>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
