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
import { customFetcher } from "@/helper/fetchInstance.ts";

export function NewUser() {
  const navigate = useNavigate();
  const [userFormData, setUserFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    nationality: "",
    country: "",
    street: "",
    streetNumber: "",
    zipcode: "",
    locality: "",
    iban: "",
    bic: "",
  });
  const [userInfosDisplayed, setUserInfosDisplayed] = useState({
    infos: true,
    address: false,
    bankInfos: false,
  });
  const [formNavigationDisabled, setFormNavigationDisabled] = useState({
    infos: false,
    address: true,
    bankInfos: true,
  });

  const handleGoBackToList = () => {
    navigate("/user");
  };
  const handleUserInfosDisplayed = () => {
    setUserInfosDisplayed({
      infos: true,
      address: false,
      bankInfos: false,
    });
  };

  const handleUserAddressDisplayed = () => {
    setUserInfosDisplayed({
      infos: false,
      address: true,
      bankInfos: false,
    });
  };

  const handleUserBankInfos = () => {
    setUserInfosDisplayed({
      infos: false,
      address: false,
      bankInfos: true,
    });
  };

  const handleSubmit = async () => {
    const newUser = {
      firstname: userFormData.firstname,
      lastname: userFormData.lastname,
      email: userFormData.email,
      phone: userFormData.phone,
      nationality: userFormData.nationality,
      country: userFormData.country,
      address: {
        street: userFormData.street,
        streetNumber: userFormData.streetNumber,
        zipcode: userFormData.zipcode,
        locality: userFormData.locality,
      },
      iban: userFormData.iban,
      bic: userFormData.bic,
    };

    const config = {
      method: "POST",
      body: JSON.stringify(newUser),
    };

    await customFetcher("http://localhost:5000/api/user", config);
  };

  const handleNextToAddress = () => {
    if (userFormData.firstname === "") {
      console.log("firstname is empty");
      return;
    }
    handleUserAddressDisplayed();
    setFormNavigationDisabled({
      infos: false,
      address: false,
      bankInfos: false,
    });
  };

  const handleUserFormDataChange = (e: any) => {
    setUserFormData({
      ...userFormData,
      [e.target.name]: e.target.value,
    });
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
          value={userFormData.firstname}
          onChange={handleUserFormDataChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="lastname">Nom</Label>
        <Input
          type="text"
          id="lastname"
          placeholder="Nom"
          name="lastname"
          value={userFormData.lastname}
          onChange={handleUserFormDataChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Adresse email</Label>
        <Input
          type="email"
          id="email"
          placeholder="Adresse email"
          name="email"
          value={userFormData.email}
          onChange={handleUserFormDataChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="phone">Numéro de téléphone</Label>
        <Input
          type="text"
          id="phone"
          placeholder="Numéro de téléphone"
          name="phone"
          value={userFormData.phone}
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
          value={userFormData.nationality}
          onChange={handleUserFormDataChange}
        />
      </div>
      <div className="flex justify-end p-4 py-8">
        <Button variant="callToAction" onClick={handleNextToAddress}>
          Suivant
        </Button>
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
          value={userFormData.country}
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
          value={userFormData.streetNumber}
          onChange={handleUserFormDataChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="street">Nom de la rue</Label>
        <Input
          type="text"
          id="street"
          placeholder="Nom de la rue"
          name="street"
          value={userFormData.street}
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
          value={userFormData.zipcode}
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
          value={userFormData.locality}
          onChange={handleUserFormDataChange}
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
          value={userFormData.iban}
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
          value={userFormData.bic}
          onChange={handleUserFormDataChange}
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
        variant={userInfosDisplayed.infos ? "defaultLeft" : "linkLeft"}
        onClick={handleUserInfosDisplayed}
        type="submit"
        disabled={formNavigationDisabled.infos}
      >
        Informations générales
      </Button>
      <Button
        variant={userInfosDisplayed.address ? "defaultLeft" : "linkLeft"}
        onClick={handleUserAddressDisplayed}
        type="submit"
        disabled={formNavigationDisabled.address}
      >
        Adresse
      </Button>
      <Button
        variant={userInfosDisplayed.bankInfos ? "defaultLeft" : "linkLeft"}
        onClick={handleUserBankInfos}
        type="submit"
        disabled={formNavigationDisabled.bankInfos}
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
                {userInfosDisplayed.infos && userInfos}
                {userInfosDisplayed.address && userAddress}
                {userInfosDisplayed.bankInfos && userBankInfos}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
