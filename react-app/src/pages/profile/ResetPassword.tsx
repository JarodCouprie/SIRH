import { MainRoot } from "@/components/navigation/MainRoot.tsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { customFetcher } from "@/helper/fetchInstance.ts";
import { Alert, AlertDescription } from "@/components/ui/alert.tsx";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

class UserPasswords {
  oldPassword: string;
  confirmPassword: string;
  newPassword: string;

  constructor(
    oldPassword: string = "",
    confirmPassword: string = "",
    newPassword: string = "",
  ) {
    this.oldPassword = oldPassword;
    this.confirmPassword = confirmPassword;
    this.newPassword = newPassword;
  }
}

class UserPasswordsToSend {
  oldPassword: string;
  newPassword: string;

  constructor(passwords: UserPasswords) {
    this.oldPassword = passwords.oldPassword;
    this.newPassword = passwords.newPassword;
  }
}

export const ResetPassword = () => {
  const [passwords, setPasswords] = useState(new UserPasswords());
  const navigate = useNavigate();
  const handleRedirect = () => {
    navigate("/");
  };

  const handleUserPasswordsFormDataChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setPasswords({
      ...passwords,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordsFormSubmit = async () => {
    const passwordsToSend = new UserPasswordsToSend(passwords);

    if (passwords.newPassword !== passwords.confirmPassword) {
      return;
    }

    const config = {
      method: "PUT",
      body: JSON.stringify(passwordsToSend),
    };
    await customFetcher(
      `http://localhost:5000/api/user/reset-password`,
      config,
    ).then((response) => {
      if (response.response.status === 201) {
        navigate("/");
      }
    });
  };

  return (
    <MainRoot title="Nouveau mot de passe">
      <Card>
        <CardHeader>
          <CardTitle>Changement du mot de passe</CardTitle>
          <CardDescription>
            Vous allez changer votre mot de passe. Faîtes bien attention à
            conserver ce nouveau mot de passe pour vous.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="oldPassword">Mot de passe actuel</Label>
            <Input
              type="password"
              id="oldPassword"
              name="oldPassword"
              value={passwords.oldPassword}
              onChange={handleUserPasswordsFormDataChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="newPassword">Nouveau mot de passe</Label>
            <Input
              type="password"
              id="newPassword"
              name="newPassword"
              value={passwords.newPassword}
              onChange={handleUserPasswordsFormDataChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="confirmPassword">
              Confirmation du nouveau mot de passe
            </Label>
            <Input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={passwords.confirmPassword}
              onChange={handleUserPasswordsFormDataChange}
            />
          </div>
          {passwords.newPassword !== passwords.confirmPassword && (
            <Alert variant="destructive" className="grid place-items-center">
              <div className="flex items-center gap-2">
                <ExclamationTriangleIcon className="h-4 w-4" />
                <AlertDescription>
                  Les mots de passe doivent être identiques
                </AlertDescription>
              </div>
            </Alert>
          )}
        </CardContent>
        <CardFooter className="flex justify-end gap-4">
          <Button variant="ghost" onClick={handleRedirect}>
            Annuler
          </Button>
          <Button variant="callToAction" onClick={handlePasswordsFormSubmit}>
            Changer mon mot de passe
          </Button>
        </CardFooter>
      </Card>
    </MainRoot>
  );
};
