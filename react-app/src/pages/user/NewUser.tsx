import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Separator } from "@/components/ui/separator.tsx";

export function NewUser() {
  const navigate = useNavigate();
  const handleGoBackToList = () => {
    navigate("/user");
  };

  const userAddress = (
    <div className="flex flex-1 flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="country">Pays</Label>
        <Input
          type="text"
          id="country"
          placeholder="Pays"
          name="country"
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="streetNumber">Numéro de rue</Label>
        <Input
          type="number"
          id="streetNumber"
          placeholder="Numéro de rue"
          name="streetNumber"
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="street">Nom de la rue</Label>
        <Input
          type="text"
          id="street"
          placeholder="Nom de la rue"
          name="street"
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="zipcode">Code postal</Label>
        <Input
          type="text"
          id="zipcode"
          placeholder="Code postal"
          name="zipcode"
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="locality">Ville</Label>
        <Input
          type="text"
          id="locality"
          placeholder="Ville"
          name="locality"
          required
        />
      </div>
    </div>
  );

  const userInfos = (
    <div className="flex flex-1 flex-col gap-4">
      <h2>Informations générales</h2>
      <div className="flex flex-col gap-2">
        <Label htmlFor="firstname">Prénom</Label>
        <Input
          type="text"
          id="firstname"
          placeholder="Prénom"
          name="firstname"
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="lastname">Nom</Label>
        <Input
          type="text"
          id="lastname"
          placeholder="Nom"
          name="lastname"
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          placeholder="Adresse email"
          name="email"
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="phone">Numéro de téléphone</Label>
        <Input
          type="text"
          id="phone"
          placeholder="Numéro de téléphone"
          name="phone"
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="nationality">Nationalité</Label>
        <Input
          type="text"
          id="nationality"
          placeholder="Nationalité"
          name="nationality"
          required
        />
      </div>
    </div>
  );

  return (
    <div className="flex flex-col items-start gap-4">
      <Button onClick={handleGoBackToList} variant="link">
        <ArrowLeftIcon className="mr-2 h-4 w-4" />
        <span>Collaborateurs</span>
      </Button>
      <div className="w-full p-4">
        <Card>
          <CardHeader>
            <CardTitle>Nouveau collaborateur</CardTitle>
          </CardHeader>
          <CardContent>
            <Separator />
            <form className="flex flex-col gap-4 py-4">
              {userInfos}
              {userAddress}
              <div className="flex justify-end gap-4">
                <Button variant="ghost">Annuler</Button>
                <Button variant="callToAction">Créer</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
