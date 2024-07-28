import { UserModel } from "@/models/User.model.js";
import React, { Dispatch, SetStateAction } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.js";
import { RiBankFill } from "react-icons/ri";
import { Button } from "@/components/ui/button.js";
import { UserInfoRow } from "@/components/user/userField.js";

interface UserBankInfosProps {
  user: UserModel;
  setUser: Dispatch<SetStateAction<UserModel>>;
}

export const UserBankInfos: React.FC<UserBankInfosProps> = ({
  user,
  setUser,
}) => {
  return (
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
  );
};
