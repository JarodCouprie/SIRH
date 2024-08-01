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
import React, { useEffect, useState } from "react";
import { customFetcher } from "@/helper/fetchInstance.ts";
import { toast } from "sonner";

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

  const handleUserBankInfosDisplayed = () => {
    setUserInfosDisplayed({
      infos: false,
      address: false,
      bankInfos: true,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      !userInfosValidated() ||
      !userAddressValidated() ||
      !userBankInfosValidated()
    ) {
      return toast.error("Des informations sont incorrectes");
    }

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
    const newUserFetch = await customFetcher(
      "http://localhost:5000/api/user",
      config,
    );

    if (newUserFetch.response.status === 201) {
      return navigate("/user");
    }
  };

  const handleNextToAddress = () => {
    if (userInfosValidated()) {
      handleUserAddressDisplayed();
      return setFormNavigationDisabled({
        infos: false,
        address: false,
        bankInfos: true,
      });
    }
    return setUserInfosValidatedDisplay(true);
  };

  const handleNextToBankInfos = () => {
    if (userAddressValidated()) {
      handleUserBankInfosDisplayed();
      return setFormNavigationDisabled({
        infos: false,
        address: false,
        bankInfos: false,
      });
    }
    return setUserAddressValidatedDisplay(true);
  };

  useEffect(() => {
    if (userInfosValidated()) {
      setUserInfosValidatedDisplay(false);
    } else {
      setUserInfosValidatedDisplay(true);
    }

    if (userAddressValidated()) {
      setUserAddressValidatedDisplay(false);
    } else {
      setUserAddressValidatedDisplay(true);
    }

    if (userBankInfosValidated()) {
      setUserBankInfosValidatedDisplay(false);
    } else {
      setUserBankInfosValidatedDisplay(true);
    }
  }, [userFormData]);

  const userInfosValidated = () => {
    const emailRegExp =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const firstnameNotEmpty = userFormData.firstname.trim() !== "";
    const lastnameNotEmpty = userFormData.lastname.trim() !== "";
    const emailNotEmpty = userFormData.email.trim() !== "";
    const emailValid = emailRegExp.test(userFormData.email);
    const phoneNotEmpty = userFormData.phone.trim() !== "";
    const nationalityNotEmpty = userFormData.nationality.trim() !== "";
    return (
      firstnameNotEmpty &&
      lastnameNotEmpty &&
      emailNotEmpty &&
      emailValid &&
      phoneNotEmpty &&
      nationalityNotEmpty
    );
  };

  const userAddressValidated = () => {
    const countryNotEmpty = userFormData.country.trim() !== "";
    const streetNumberNotEmpty = userFormData.streetNumber.trim() !== "";
    const streetNotEmpty = userFormData.street.trim() !== "";
    const zipcodeNotEmpty = userFormData.zipcode.trim() !== "";
    const localityNotEmpty = userFormData.locality.trim() !== "";
    return (
      countryNotEmpty &&
      streetNumberNotEmpty &&
      streetNotEmpty &&
      zipcodeNotEmpty &&
      localityNotEmpty
    );
  };

  const userBankInfosValidated = () => {
    const ibanNotEmpty = userFormData.iban.trim() !== "";
    const bicNotEmpty = userFormData.bic.trim() !== "";
    return ibanNotEmpty && bicNotEmpty;
  };

  const [userInfosValidatedDisplay, setUserInfosValidatedDisplay] =
    useState(false);
  const [userAddressValidatedDisplay, setUserAddressValidatedDisplay] =
    useState(false);
  const [userBankInfosValidatedDisplay, setUserBankInfosValidatedDisplay] =
    useState(false);

  const handleUserFormDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      {userInfosValidatedDisplay && (
        <div className="text-sm text-red-800">
          * Tous les champs doivent être complétés
        </div>
      )}
      <div className="flex justify-end pt-8">
        <Button
          variant="callToAction"
          onClick={handleNextToAddress}
          type="button"
        >
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
        <Label htmlFor="street">Nom de rue</Label>
        <Input
          type="text"
          id="street"
          placeholder="Nom de rue"
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
      {userAddressValidatedDisplay && (
        <div className="text-sm text-red-800">
          * Tous les champs doivent être complétés
        </div>
      )}
      <div className="flex justify-end pt-8">
        <Button variant="callToAction" onClick={handleNextToBankInfos}>
          Suivant
        </Button>
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
      {userBankInfosValidatedDisplay && (
        <div className="text-sm text-red-800">
          * Tous les champs doivent être complétés
        </div>
      )}
      <div className="flex justify-end gap-4">
        <Button variant="ghost" type="button" onClick={handleGoBackToList}>
          Annuler
        </Button>
        <Button variant="callToAction" type="submit">
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
        type="button"
        disabled={formNavigationDisabled.infos}
      >
        Informations générales
      </Button>
      <Button
        variant={userInfosDisplayed.address ? "defaultLeft" : "linkLeft"}
        onClick={handleUserAddressDisplayed}
        type="button"
        disabled={formNavigationDisabled.address}
      >
        Adresse
      </Button>
      <Button
        variant={userInfosDisplayed.bankInfos ? "defaultLeft" : "linkLeft"}
        onClick={handleUserBankInfosDisplayed}
        type="button"
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
            <form className="pt-4" onSubmit={handleSubmit}>
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
