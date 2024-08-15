import React, { useState } from "react";
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
import { Input } from "@/components/ui/input.js";

interface UserRejectDemandProps {
  demand: DemandValidated;
  refreshUserDemands: () => void;
}

export const UserRejectDemand: React.FC<UserRejectDemandProps> = ({
  demand,
  refreshUserDemands,
}) => {
  const [justification, setJustification] = useState("");

  const handleRejectDemandClick = async () => {
    const { response } = await customFetcher(
      `http://localhost:5000/api/demand/reject/${demand.id}`,
      {
        method: "PUT",
        body: JSON.stringify({ justification }),
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
          <Button variant="outline" className="text-red-600">
            Refuser
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Vous êtes sûr ?</AlertDialogTitle>
            <AlertDialogDescription>
              Vous êtes sur le point de refuser la demande
            </AlertDialogDescription>
            <div className="flex flex-col gap-2 py-4 text-gray-950 dark:text-gray-50">
              <label>Justification</label>
              <Input
                type="text"
                value={justification}
                onChange={(e) => setJustification(e.target.value)}
              ></Input>
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction type="submit" onClick={handleRejectDemandClick}>
              Refuser
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
