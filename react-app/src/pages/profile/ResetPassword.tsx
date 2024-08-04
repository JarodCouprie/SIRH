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

export const ResetPassword = () => {
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
            <Label htmlFor="currentPassword">Mot de passe actuel</Label>
            <Input
              type="password"
              id="currentPassword"
              name="currentPassword"
              // value={userUpdated.iban}
              // onChange={handleUserFormDataChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Nouveau mot de passe</Label>
            <Input
              type="password"
              id="password"
              name="password"
              // value={userUpdated.iban}
              // onChange={handleUserFormDataChange}
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
              // value={userUpdated.iban}
              // onChange={handleUserFormDataChange}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-4">
          <Button variant="ghost">Annuler</Button>
          <Button variant="callToAction">Changer mon mot de passe</Button>
        </CardFooter>
      </Card>
    </MainRoot>
  );
};
