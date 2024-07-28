import { UserModel } from "@/models/User.model.js";
import React, { Dispatch, SetStateAction } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.js";
import { FaLocationDot } from "react-icons/fa6";
import { Button } from "@/components/ui/button.js";
import { UserField } from "@/components/user/userField.js";

interface UserAddressProps {
  user: UserModel;
  setUser: Dispatch<SetStateAction<UserModel>>;
}

export const UserAddress: React.FC<UserAddressProps> = ({ user, setUser }) => {
  return (
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
        <UserField title="Pays de résidence">{user.country}</UserField>
        <UserField title="Adresse">
          {user.address.streetNumber} {user.address.street}
        </UserField>
        <UserField title="Code postal">{user.address.zipcode}</UserField>
        <UserField title="Ville">{user.address.locality}</UserField>
      </CardContent>
    </Card>
  );
};
