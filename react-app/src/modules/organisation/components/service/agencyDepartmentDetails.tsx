import { AgencyTeam } from "@/modules/organisation/components/team/agencyTeam.js";
import { DepartmentInfo } from "@/modules/organisation/components/service/departmentInfo.js";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.js";
import { TbBuildingCommunity, TbBuildingEstate } from "react-icons/tb";
import { customFetcher } from "@/common/helper/fetchInstance.js";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCurrentUser } from "@/common/hooks/useCurrentUser.js";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog.js";
import { Button } from "@/components/ui/button.js";
import { MdOutlineDelete } from "react-icons/md";
import { DepartmentModel } from "@/models/organisation/department/Department.model.js";
import { FaArrowLeft } from "react-icons/fa";
import { GrGroup } from "react-icons/gr";

export const AgencyDepartmentDetails = () => {
  const { id_service, id_agency } = useParams();
  const [foundService, setFoundService] = useState<DepartmentModel>(
    new DepartmentModel(),
  );
  const navigate = useNavigate();

  const fetchUser = async () => {
    await customFetcher(
      `http://localhost:5000/api/service/department/${id_service}`,
    ).then((response) => {
      setFoundService(response.data.data);
    });
  };

  useEffect(() => {
    fetchUser().then();
  }, []);

  const handleClick = () => {
    navigate(`/organisation/agency/${id_agency}`);
  };

  return (
    <>
      <div>
        <Button variant="link" onClick={handleClick}>
          <FaArrowLeft className="mr-2" />
          <div>Agence</div>
        </Button>
      </div>
      <div className="w-full py-4">
        <Card className="flex items-center px-4">
          <CardHeader className="flex items-center">
            <GrGroup className="size-8 text-gray-300" />
          </CardHeader>
          <div className="flex flex-grow flex-col">
            <CardTitle className="text-lg font-semibold">
              {foundService.label}
            </CardTitle>
            <CardDescription className="text-sm text-gray-600">
              Chef de service : {foundService.lead_service_firstname}{" "}
              {foundService.lead_service_lastname}
            </CardDescription>
          </div>
          <ConfirmDeleteItem service={foundService} navigate={navigate} />
        </Card>
      </div>
      <div className="grid w-full grid-cols-3 gap-4">
        <div className="col-span-1 flex flex-col gap-4 max-2xl:col-span-3">
          <DepartmentInfo />
        </div>
        <div className="col-span-2 flex flex-col gap-4 max-2xl:col-span-3">
          <AgencyTeam />
        </div>
      </div>
    </>
  );
};

interface ConfirmDeleteItemProps {
  service: DepartmentModel;
  navigate: ReturnType<typeof useNavigate>;
}

export function ConfirmDeleteItem({
  service,
  navigate,
}: ConfirmDeleteItemProps) {
  const { refreshCurrentUser } = useCurrentUser();

  const fetchDepartment = async () => {
    const response = await customFetcher(
      `http://localhost:5000/api/service/${service.id}`,
      {
        method: "DELETE",
      },
    );

    if (response.response.status === 200) {
      navigate(`/organisation/agency/${service.id_agency}`, { replace: true });
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
            Vous êtes sur le point de supprimer de manière definitive le service
            {service.label} de l'agence {service.id_agency}, cette action est
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
