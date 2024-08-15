import { UserModel } from "@/models/user/User.model.ts";
import React, { Dispatch, SetStateAction } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.js";
import { MdOutlineSecurity } from "react-icons/md";
import { Button } from "@/components/ui/button.js";
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
import { customFetcher } from "@/common/helper/fetchInstance.js";

interface UserSecurityProps {
  user: UserModel;
  setUser: Dispatch<SetStateAction<UserModel>>;
}

export const UserSecurity: React.FC<UserSecurityProps> = ({
  user,
  setUser,
}) => {
  const handleDisableUser = async (userActive: boolean) => {
    const config = {
      method: "PUT",
      body: JSON.stringify({ active: userActive }),
    };
    await customFetcher(
      `http://localhost:5000/api/user/active/${user.id}`,
      config,
    ).then((response) => {
      if (response.response.status !== 200) {
        return;
      }
      setUser(response.data.data);
    });
  };

  return (
    <Card>
      <CardHeader className="text-gray-900 dark:text-gray-300">
        <CardTitle className="flex flex-wrap items-center gap-4 text-xl">
          <MdOutlineSecurity className="text-red-600" />
          <span>Sécurité</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Button variant="outline" className="text-red-600">
          Un bouton pour faire des trucs pas cool
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            {user.active ? (
              <Button variant="outline" className="text-red-600">
                Désactiver {user.firstname} {user.lastname}
              </Button>
            ) : (
              <Button variant="outline" className="text-red-600">
                Réactiver {user.firstname} {user.lastname}
              </Button>
            )}
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Désactiver{" "}
                <span className="text-gray-50">
                  {user.firstname} {user.lastname}
                </span>
              </AlertDialogTitle>
              <AlertDialogDescription>
                Êtes-vous sûr de vouloir désactiver {user.firstname}{" "}
                {user.lastname}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Annuler</AlertDialogCancel>
              {user.active ? (
                <AlertDialogAction onClick={() => handleDisableUser(false)}>
                  Désactiver
                </AlertDialogAction>
              ) : (
                <AlertDialogAction onClick={() => handleDisableUser(true)}>
                  Réactiver
                </AlertDialogAction>
              )}
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
};
