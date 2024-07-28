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
import { UserInfoRow } from "@/components/user/userField.js";

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
        <UserInfoRow title="Pays de résidence">{user.country}</UserInfoRow>
        <UserInfoRow title="Adresse">
          {user.address.streetNumber} {user.address.street}
        </UserInfoRow>
        <UserInfoRow title="Code postal">{user.address.zipcode}</UserInfoRow>
        <UserInfoRow title="Ville">{user.address.locality}</UserInfoRow>
      </CardContent>
    </Card>
  );
};
