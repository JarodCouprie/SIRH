import { UserModel } from "@/models/User.model.js";
import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.js";
import { RiBankFill } from "react-icons/ri";
import { Button } from "@/components/ui/button.js";
import { UserField } from "@/components/user/userField.js";
import { customFetcher } from "@/helper/fetchInstance.js";
import { Label } from "@/components/ui/label.js";
import { Input } from "@/components/ui/input.js";

interface UserBankInfosProps {
  user: UserModel;
  setUser: Dispatch<SetStateAction<UserModel>>;
}

class UserBankInfosData {
  iban: string;
  bic: string;

  constructor(user: UserModel) {
    this.iban = user.iban;
    this.bic = user.bic;
  }
}

export const UserBankInfos: React.FC<UserBankInfosProps> = ({
  user,
  setUser,
}) => {
  const [userCanBeUpdated, setUserCanBeUpdated] = useState(false);
  const [userUpdated, setUserUpdated] = useState(new UserBankInfosData(user));

  const handleUpdateUser = () => {
    setUserUpdated(new UserBankInfosData(user));
    setUserCanBeUpdated(!userCanBeUpdated);
  };

  const handleSubmitUpdatedUser = async () => {
    const config = {
      method: "POST",
      body: JSON.stringify(userUpdated),
    };
    await customFetcher(
      `http://localhost:5000/api/user/update-bank-infos/${user.id}`,
      config,
    ).then((response) => {
      setUser(response.data.data);
      setUserCanBeUpdated(!userCanBeUpdated);
    });
  };

  const handleUserFormDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserUpdated({
      ...userUpdated,
      [e.target.name]: e.target.value,
    });
  };

  const userFields = (
    <CardContent className="divide-y divide-slate-300 dark:divide-slate-700">
      <UserField title="IBAN">{user.iban}</UserField>
      <UserField title="BIC">{user.bic}</UserField>
    </CardContent>
  );

  const userUpdating = (
    <CardContent className="flex flex-col gap-4 py-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="iban">IBAN</Label>
        <Input
          type="text"
          id="iban"
          placeholder="IBAN"
          name="iban"
          value={userUpdated.iban}
          onChange={handleUserFormDataChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="bic">BIC</Label>
        <Input
          type="text"
          id="bic"
          placeholder="BIC"
          name="bic"
          value={userUpdated.bic}
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
            <RiBankFill />
            <span>Informations bancaires</span>
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
