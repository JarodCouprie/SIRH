import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import { ArrowLeftIcon, ExclamationTriangleIcon } from "@radix-ui/react-icons";
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
import {
  CreateUserFormDataModel,
  CreateUserModel,
} from "@/models/user/CreateUserFormData.model.ts";
import { Role } from "@/type/user/user-role.type.ts";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { roleEnumKeyToFrench } from "@/enum/Role.enum.ts";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert.tsx";

export function NewUser() {
  const navigate = useNavigate();
  const [userFormData, setUserFormData] = useState(
    new CreateUserFormDataModel(),
  );
  const [userInfosDisplayed, setUserInfosDisplayed] = useState({
    infos: true,
    address: false,
    bankInfos: false,
    userRoles: false,
  });
  const [formNavigationDisabled, setFormNavigationDisabled] = useState({
    infos: false,
    address: true,
    bankInfos: true,
    userRoles: true,
  });

  const handleGoBackToList = () => {
    navigate("/user");
  };
  const handleUserInfosDisplayed = () => {
    setUserInfosDisplayed({
      infos: true,
      address: false,
      bankInfos: false,
      userRoles: false,
    });
  };

  const handleUserAddressDisplayed = () => {
    setUserInfosDisplayed({
      infos: false,
      address: true,
      bankInfos: false,
      userRoles: false,
    });
  };

  const handleUserBankInfosDisplayed = () => {
    setUserInfosDisplayed({
      infos: false,
      address: false,
      bankInfos: true,
      userRoles: false,
    });
  };

  const handleUserRolesDisplayed = () => {
    setUserInfosDisplayed({
      infos: false,
      address: false,
      bankInfos: false,
      userRoles: true,
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
    const newUser = new CreateUserModel(userFormData);

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
        userRoles: false,
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
        userRoles: true,
      });
    }
    return setUserAddressValidatedDisplay(true);
  };

  const handleNextToRoles = () => {
    if (userBankInfosValidated()) {
      handleUserRolesDisplayed();
      return setFormNavigationDisabled({
        infos: false,
        address: false,
        bankInfos: false,
        userRoles: false,
      });
    }
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
    const passwordValid =
      userFormData.password.trim() !== "" &&
      userFormData.password === userFormData.confirmPassword;
    const emailValid = emailRegExp.test(userFormData.email);
    const phoneNotEmpty = userFormData.phone.trim() !== "";
    const nationalityNotEmpty = userFormData.nationality.trim() !== "";
    return (
      firstnameNotEmpty &&
      lastnameNotEmpty &&
      emailNotEmpty &&
      emailValid &&
      passwordValid &&
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
        <Label htmlFor="email">Mot de passe</Label>
        <Input
          type="password"
          id="password"
          placeholder="Mot de passe"
          name="password"
          value={userFormData.password}
          onChange={handleUserFormDataChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Confirmation du mot de passe</Label>
        <Input
          type="password"
          id="confirmPassword"
          placeholder="Confirmation du mot de passe"
          name="confirmPassword"
          value={userFormData.confirmPassword}
          onChange={handleUserFormDataChange}
        />
      </div>
      {userFormData.password !== userFormData.confirmPassword && (
        <div className="text-sm text-red-800">
          Les mots de passe doivent être similaires
        </div>
      )}
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
      <div className="flex justify-end pt-8">
        <Button variant="callToAction" onClick={handleNextToRoles}>
          Suivant
        </Button>
      </div>
    </div>
  );

  const [fetchedRoles, setFetchedRoles] = useState<Role[]>([]);

  useEffect(() => {
    getDatabaseRoles().then();
  }, []);

  const [displayWarning, setDisplayWarning] = useState(false);

  const getDatabaseRoles = async () => {
    await customFetcher(`http://localhost:5000/api/role`).then((response) => {
      if (response.response.status !== 200) {
        return;
      }
      const responseRoles: Role[] = response.data.data;
      setFetchedRoles(responseRoles);
    });
  };

  const addRole = (role: Role) => {
    const roles = [
      ...userFormData.roles.filter((roleId) => roleId !== role.id),
      role.id,
    ];
    setUserFormData({
      ...userFormData,
      roles,
    });
    if (userFormData.roles.length >= 1) {
      setDisplayWarning(false);
    }
  };

  const removeRole = (role: Role) => {
    const roles = [
      ...userFormData.roles.filter((roleId) => roleId !== role.id),
    ];
    if (roles.length === 0) {
      setDisplayWarning(true);
      return;
    } else {
      setUserFormData({ ...userFormData, roles });
    }
  };

  const userRoles = (
    <div className="flex flex-1 flex-col gap-4">
      {fetchedRoles.map((role) => {
        return (
          <div className="flex items-center space-x-2" key={role.id}>
            <Checkbox
              id={role.id.toString()}
              checked={userFormData.roles.some((r) => r === role.id)}
              onCheckedChange={(checked) => {
                return checked ? addRole(role) : removeRole(role);
              }}
            />
            <Label
              htmlFor={role.id.toString()}
              className="cursor-pointer text-sm font-medium"
            >
              <Badge variant="default">{roleEnumKeyToFrench(role.label)}</Badge>
            </Label>
          </div>
        );
      })}
      {displayWarning && (
        <Alert variant="destructive" className="grid place-items-center">
          <div className="flex gap-2">
            <ExclamationTriangleIcon className="h-4 w-4" />
            <AlertTitle>Attention</AlertTitle>
          </div>
          <AlertDescription>
            Un utilisateur doit avoir au minimum un rôle
          </AlertDescription>
        </Alert>
      )}
      <div className="flex justify-end gap-4">
        <Button variant="ghost" type="button" onClick={handleGoBackToList}>
          Annuler
        </Button>
        <Button variant="callToAction" type="submit">
          Créer {userFormData.firstname}
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
      <Button
        variant={userInfosDisplayed.userRoles ? "defaultLeft" : "linkLeft"}
        onClick={handleUserRolesDisplayed}
        type="button"
        disabled={formNavigationDisabled.userRoles}
      >
        Rôles
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
                {userInfosDisplayed.userRoles && userRoles}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
