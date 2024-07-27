import React, { Dispatch, SetStateAction } from "react";
import { UserModel } from "@/models/User.model.js";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.js";
import { BsFillInfoSquareFill } from "react-icons/bs";
import { Button } from "@/components/ui/button.js";
import { MdOutlineSecurity } from "react-icons/md";
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
import { FaLocationDot } from "react-icons/fa6";
import { RiBankFill } from "react-icons/ri";
import { UserInfoRow } from "@/pages/user/User.js";
import { customFetcher } from "@/helper/fetchInstance.js";

interface UserInfosProps {
  user: UserModel;
  setUser: Dispatch<SetStateAction<UserModel>>;
}

export const UserInfos: React.FC<UserInfosProps> = ({ user, setUser }) => {
  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

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
    <div className="grid w-full grid-cols-3 gap-4">
      <div className="col-span-1 flex flex-col gap-4 max-2xl:col-span-3">
        <Card>
          <CardHeader className="text-gray-900 dark:text-gray-300">
            <CardTitle className="flex flex-wrap justify-between gap-2 text-xl">
              <div className="flex flex-wrap items-center gap-4">
                <BsFillInfoSquareFill />
                <span>Informations personnelles</span>
              </div>
              <Button variant="callToAction">Modifier</Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="divide-y divide-slate-300 dark:divide-slate-700">
            <UserInfoRow title="Nom">{user.lastname}</UserInfoRow>
            <UserInfoRow title="Prénoom">{user.firstname}</UserInfoRow>
            <UserInfoRow title="Email">{user.email}</UserInfoRow>
            <UserInfoRow title="Téléphone">{user.phone}</UserInfoRow>
            <UserInfoRow title="Nationalité">{user.nationality}</UserInfoRow>
            <UserInfoRow title="Date de création">
              {new Date(user.created_at).toLocaleString("fr-FR", dateOptions)}
            </UserInfoRow>
          </CardContent>
        </Card>
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
      </div>
      <div className="col-span-2 flex flex-col gap-4 max-2xl:col-span-3">
        <Card>
          <CardHeader className="text-gray-900 dark:text-gray-300">
            <CardTitle className="flex flex-wrap justify-between gap-2 text-xl">
              <div className="flex flex-wrap items-center gap-4">
                <FaLocationDot />
                <span>Adresse</span>
              </div>
              <Button variant="callToAction">Modifier</Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="divide-y divide-slate-300 dark:divide-slate-700">
            <UserInfoRow title="Pays de résidence">{user.country}</UserInfoRow>
            <UserInfoRow title="Adresse">
              {user.address.streetNumber} {user.address.street}
            </UserInfoRow>
            <UserInfoRow title="Code postal">
              {user.address.zipcode}
            </UserInfoRow>
            <UserInfoRow title="Ville">{user.address.locality}</UserInfoRow>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="text-gray-900 dark:text-gray-300">
            <CardTitle className="flex flex-wrap justify-between gap-2 text-xl">
              <div className="flex flex-wrap items-center gap-4">
                <RiBankFill />
                <span>Informations bancaires</span>
              </div>
              <Button variant="callToAction">Modifier</Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="divide-y divide-slate-300 dark:divide-slate-700">
            <UserInfoRow title="IBAN">{user.iban}</UserInfoRow>
            <UserInfoRow title="BIC">{user.bic}</UserInfoRow>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
