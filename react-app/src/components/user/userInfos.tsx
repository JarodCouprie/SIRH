import React, { Dispatch, SetStateAction, useState } from "react";
import { UserModel } from "@/models/User.model.js";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.js";
import { BsFillInfoSquareFill } from "react-icons/bs";
import { Button } from "@/components/ui/button.js";
import { UserField } from "@/components/user/userField.js";
import { Input } from "@/components/ui/input.js";
import { Label } from "@/components/ui/label.js";

interface UserInfosProps {
  user: UserModel;
  setUser: Dispatch<SetStateAction<UserModel>>;
}

class UserInfosData {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  nationality: string;

  constructor(user: UserModel) {
    this.firstname = user.firstname;
    this.lastname = user.lastname;
    this.email = user.email;
    this.phone = user.phone;
    this.nationality = user.nationality;
  }
}

export const UserInfos: React.FC<UserInfosProps> = ({ user, setUser }) => {
  const [userCanBeUpdated, setUserCanBeUpdated] = useState(false);
  const [userUpdated, setUserUpdated] = useState(new UserInfosData(user));
  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  const userFields = (
    <CardContent className="divide-y divide-slate-300 dark:divide-slate-700">
      <UserField title="Nom">{userUpdated.lastname}</UserField>
      <UserField title="Prénoom">{userUpdated.firstname}</UserField>
      <UserField title="Email">{userUpdated.email}</UserField>
      <UserField title="Téléphone">{userUpdated.phone}</UserField>
      <UserField title="Nationalité">{userUpdated.nationality}</UserField>
      <UserField title="Date de création">
        {new Date(user.created_at).toLocaleString("fr-FR", dateOptions)}
      </UserField>
    </CardContent>
  );

  const handleUserFormDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserUpdated({
      ...userUpdated,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateUser = () => {
    setUserUpdated(new UserInfosData(user));
    setUserCanBeUpdated(!userCanBeUpdated);
  };

  const handleSubmitUpdatedUser = () => {
    console.log(userUpdated);
    setUserCanBeUpdated(!userCanBeUpdated);
  };

  const userUpdating = (
    <CardContent className="flex flex-col gap-4 py-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="lastname">Nom</Label>
        <Input
          type="text"
          id="lastname"
          placeholder="Nom"
          name="lastname"
          value={userUpdated.lastname}
          onChange={handleUserFormDataChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="firstname">Prénom</Label>
        <Input
          type="text"
          id="firstname"
          placeholder="Prénom"
          name="firstname"
          value={userUpdated.firstname}
          onChange={handleUserFormDataChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          type="text"
          id="email"
          placeholder="Email"
          name="email"
          value={userUpdated.email}
          onChange={handleUserFormDataChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="phone">Téléphone</Label>
        <Input
          type="text"
          id="phone"
          placeholder="Numéro de téléphone"
          name="phone"
          value={userUpdated.phone}
          onChange={handleUserFormDataChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="nationality">Nationalité</Label>
        <Input
          type="text"
          id="nationality"
          placeholder="Nationalité"
          name="nationality"
          value={userUpdated.nationality}
          onChange={handleUserFormDataChange}
        />
      </div>
    </CardContent>
  );

  return (
    <Card>
      <CardHeader className="text-gray-900 dark:text-gray-300">
        <CardTitle className="flex flex-wrap justify-between gap-2 text-xl">
          <div className="flex flex-wrap items-center gap-4">
            <BsFillInfoSquareFill />
            <span>Informations personnelles</span>
          </div>
          {userCanBeUpdated ? (
            <Button variant="ghost" onClick={handleUpdateUser}>
              Annuler
            </Button>
          ) : (
            <Button variant="callToAction" onClick={handleUpdateUser}>
              Modifier
            </Button>
          )}
        </CardTitle>
        {userCanBeUpdated ? userUpdating : userFields}
      </CardHeader>
      {userCanBeUpdated && (
        <CardFooter className="justify-end">
          <Button variant="callToAction" onClick={handleSubmitUpdatedUser}>
            Enregistrer
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};
