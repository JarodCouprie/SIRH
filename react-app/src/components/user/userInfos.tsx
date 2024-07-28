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
import { UserInfoRow } from "@/components/user/userField.js";

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

  return (
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
  );
};
