import React from "react";
import { DemandValidated } from "@/common/type/demand/validated-demand-list.type.js";
import { customFetcher } from "@/common/helper/fetchInstance.js";
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
} from "@/components/ui/alert-dialog.js";
import { Button } from "@/components/ui/button.js";

interface UserConfirmDemandProps {
  demand: DemandValidated;
  refreshUserDemands: () => void;
}

export const UserConfirmDemand: React.FC<UserConfirmDemandProps> = ({
  demand,
  refreshUserDemands,
}) => {
  const handleConfirmDemandClick = async () => {
    const { response } = await customFetcher(
      `http://localhost:5000/api/demand/confirm/${demand.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (response.status === 200) {
      refreshUserDemands();
    }
  };

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline" className="text-indigo-700">
            Accepter
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Vous êtes sûr ?</AlertDialogTitle>
            <AlertDialogDescription>
              Vous êtes sur le point de confirmer la demande
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction type="submit" onClick={handleConfirmDemandClick}>
              Accepter
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
