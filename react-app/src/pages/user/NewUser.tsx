import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { useState } from "react";

export function NewUser() {
  const navigate = useNavigate();
  const [userInfosDisplayed, setUserInfosDisplayed] = useState(true);
  const [userAddressDisplayed, setUserAddressDisplayed] = useState(false);
  const [userBankInfosDisplayed, setUserBankInfosDisplayed] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nationality, setNationality] = useState("");
  const [country, setCountry] = useState("");
  const [streetNumber, setStreetNumber] = useState("");
  const [street, setStreet] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [locality, setLocality] = useState("");
  const [iban, setIban] = useState("");
  const [bic, setBic] = useState("");
  const handleGoBackToList = () => {
    navigate("/user");
  };
  const handleUserAddressDisplayed = () => {
    setUserInfosDisplayed(false);
    setUserAddressDisplayed(true);
    setUserBankInfosDisplayed(false);
  };

  const handleUserInfosDisplayed = () => {
    setUserInfosDisplayed(true);
    setUserAddressDisplayed(false);
    setUserBankInfosDisplayed(false);
  };

  const handleUserBankInfos = () => {
    setUserInfosDisplayed(false);
    setUserAddressDisplayed(false);
    setUserBankInfosDisplayed(true);
  };

  const handleSubmit = () => {
    const newUser = {
      firstname,
      lastname,
      email,
      phone,
      nationality,
      country,
      address: {
        street,
        streetNumber,
        zipcode,
        locality,
      },
      iban,
      bic,
    };
    console.log(newUser);
  };

  const userInfos = (
    <div className="flex flex-1 flex-col gap-4">
      <h2 className="text-lg font-semibold">Informations générales</h2>
      <Separator />
      <div className="flex flex-col gap-2">
        <Label htmlFor="firstname">Prénom</Label>
        <Input
          type="text"
          id="firstname"
          placeholder="Prénom"
          name="firstname"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
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
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Adresse email</Label>
        <Input
          type="email"
          id="email"
          placeholder="Adresse email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
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
          value={nationality}
          onChange={(e) => setNationality(e.target.value)}
          required
        />
      </div>
    </div>
  );

  const userAddress = (
    <div className="flex flex-1 flex-col gap-4">
      <h2 className="text-lg font-semibold">Adresse</h2>
      <Separator />
      <div className="flex flex-col gap-2">
        <Label htmlFor="country">Pays</Label>
        <Input
          type="text"
          id="country"
          placeholder="Pays"
          name="country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
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
          value={streetNumber}
          onChange={(e) => setStreetNumber(e.target.value)}
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
          value={street}
          onChange={(e) => setStreet(e.target.value)}
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="zipcode">Code postal</Label>
        <Input
          type="number"
          id="zipcode"
          placeholder="Code postal"
          name="zipcode"
          value={zipcode}
          onChange={(e) => setZipcode(e.target.value)}
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
          value={locality}
          onChange={(e) => setLocality(e.target.value)}
          required
        />
      </div>
    </div>
  );

  const userBankInfos = (
    <div className="flex flex-1 flex-col gap-4">
      <h2 className="text-lg font-semibold">Informations bancaires</h2>
      <Separator />
      <div className="flex flex-col gap-2">
        <Label htmlFor="iban">IBAN</Label>
        <Input
          type="text"
          id="iban"
          placeholder="IBAN"
          name="iban"
          value={iban}
          onChange={(e) => setIban(e.target.value)}
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="bic">BIC</Label>
        <Input
          type="text"
          id="bic"
          placeholder="BIC"
          name="bic"
          value={bic}
          onChange={(e) => setBic(e.target.value)}
          required
        />
      </div>
      <div className="flex justify-end gap-4">
        <Button variant="ghost" type="button" onClick={handleGoBackToList}>
          Annuler
        </Button>
        <Button variant="callToAction" type="submit" onClick={handleSubmit}>
          Créer
        </Button>
      </div>
    </div>
  );

  const formNavigation = (
    <div className="flex flex-col gap-2">
      <Button
        variant={userInfosDisplayed ? "defaultLeft" : "linkLeft"}
        onClick={handleUserInfosDisplayed}
        type="submit"
      >
        Informations générales
      </Button>
      <Button
        variant={userAddressDisplayed ? "defaultLeft" : "linkLeft"}
        onClick={handleUserAddressDisplayed}
        type="submit"
      >
        Adresse
      </Button>
      <Button
        variant={userBankInfosDisplayed ? "defaultLeft" : "linkLeft"}
        onClick={handleUserBankInfos}
        type="submit"
      >
        Informations bancaires
      </Button>
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
            <CardTitle className="flex items-center gap-2 text-xl">
              <span>Nouveau collaborateur</span>
            </CardTitle>
            <CardDescription>
              <span>Création d'un nouveau collaborateur.</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Separator />
            <form className="py-4" onSubmit={(event) => event.preventDefault()}>
              <div className="flex justify-start gap-8">
                {formNavigation}
                {userInfosDisplayed && userInfos}
                {userAddressDisplayed && userAddress}
                {userBankInfosDisplayed && userBankInfos}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
