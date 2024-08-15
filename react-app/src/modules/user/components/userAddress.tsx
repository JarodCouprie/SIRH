import { UserModel } from "@/models/user/User.model.ts";
import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.js";
import { FaLocationDot } from "react-icons/fa6";
import { Button } from "@/components/ui/button.js";
import { FieldRow } from "@/components/fieldRow.js";
import { customFetcher } from "@/common/helper/fetchInstance.js";
import { Label } from "@/components/ui/label.js";
import { Input } from "@/components/ui/input.js";

interface UserAddressProps {
  user: UserModel;
  setUser: Dispatch<SetStateAction<UserModel>>;
  path?: string;
}

class UserAddressData {
  street: string;
  streetNumber: string;
  locality: string;
  zipcode: string;
  country: string;

  constructor(user: UserModel) {
    this.street = user.address.street;
    this.streetNumber = user.address.streetNumber;
    this.locality = user.address.locality;
    this.zipcode = user.address.zipcode;
    this.country = user.country;
  }
}

export const UserAddress: React.FC<UserAddressProps> = ({
  user,
  setUser,
  path = `user/update-address/${user.id}`,
}) => {
  const [userCanBeUpdated, setUserCanBeUpdated] = useState(false);
  const [userUpdated, setUserUpdated] = useState(new UserAddressData(user));

  const handleUpdateUser = () => {
    setUserUpdated(new UserAddressData(user));
    setUserCanBeUpdated(!userCanBeUpdated);
  };

  const handleSubmitUpdatedUser = async () => {
    const config = {
      method: "POST",
      body: JSON.stringify(userUpdated),
    };
    await customFetcher(`http://localhost:5000/api/${path}`, config).then(
      (response) => {
        setUser(response.data.data);
        setUserCanBeUpdated(!userCanBeUpdated);
      },
    );
  };

  const handleUserFormDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserUpdated({
      ...userUpdated,
      [e.target.name]: e.target.value,
    });
  };

  const userFields = (
    <CardContent className="divide-y divide-slate-300 dark:divide-slate-700">
      <FieldRow title="Pays de résidence">{user.country}</FieldRow>
      <FieldRow title="Adresse">
        {user.address.streetNumber} {user.address.street}
      </FieldRow>
      <FieldRow title="Code postal">{user.address.zipcode}</FieldRow>
      <FieldRow title="Ville">{user.address.locality}</FieldRow>
    </CardContent>
  );

  const userUpdating = (
    <CardContent className="flex flex-col gap-4 py-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="country">Pays de résidence</Label>
        <Input
          type="text"
          id="country"
          placeholder="Pays de résidence"
          name="country"
          value={userUpdated.country}
          onChange={handleUserFormDataChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="streetNumber">Numéro de rue</Label>
        <Input
          type="number"
          id="streetNumber"
          placeholder="Numéro de rue"
          name="streetNumber"
          value={userUpdated.streetNumber}
          onChange={handleUserFormDataChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="street">Nom de rue</Label>
        <Input
          type="text"
          id="street"
          placeholder="Nom de rue"
          name="street"
          value={userUpdated.street}
          onChange={handleUserFormDataChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="zipcode">Code postal</Label>
        <Input
          type="number"
          id="zipcode"
          placeholder="Code postal"
          name="zipcode"
          value={userUpdated.zipcode}
          onChange={handleUserFormDataChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="locality">Ville</Label>
        <Input
          type="text"
          id="locality"
          placeholder="Ville"
          name="locality"
          value={userUpdated.locality}
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
            <FaLocationDot />
            <span>Adresse</span>
          </div>
          {userCanBeUpdated ? (
            <Button variant="ghost" onClick={handleUpdateUser}>
              Annuler
            </Button>
          ) : (
            <Button variant="outline" onClick={handleUpdateUser}>
              <span className="text-indigo-700">Modifier</span>
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      {userCanBeUpdated ? userUpdating : userFields}
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
