import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { UserModel } from "@/models/User.model.ts";
import { customFetcher } from "@/helper/fetchInstance.ts";
import { Button } from "@/components/ui/button.tsx";
import {
  ArrowLeftIcon,
  CheckCircledIcon,
  CrossCircledIcon,
  Pencil1Icon,
} from "@radix-ui/react-icons";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { RoleEnum } from "@/enum/Role.enum.ts";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar.tsx";
import { BsFillInfoSquareFill } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import { RiBankFill } from "react-icons/ri";
import { MdOutlineSecurity } from "react-icons/md";

export function User() {
  const { id } = useParams();
  const [userLoaded, setUserLoaded] = useState(false);
  const navigate = useNavigate();
  const noUser = (
    <div>
      <h1 className="text-gray-950 dark:text-gray-100">
        Cet utilisateur n'existe pas
      </h1>
    </div>
  );
  if (!id) {
    return noUser;
  }
  const [user, setUser] = useState<UserModel>({
    id: 0,
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    created_at: new Date(),
    address: {
      street: "",
      streetNumber: "",
      locality: "",
      zipcode: "",
      lat: 0,
      lng: 0,
    },
    active: true,
    country: "",
    nationality: "",
    role: RoleEnum.USER,
    iban: "",
    bic: "",
  });

  const fetchUser = async () => {
    await customFetcher(`http://localhost:5000/api/user/${id}`).then(
      (response) => {
        if (response.response.status !== 200) {
          return;
        }
        setUserLoaded(true);
        setUser(response.data.data);
      },
    );
  };

  useEffect(() => {
    fetchUser().then();
  }, []);

  const handleGoBackToList = () => {
    navigate("/user");
  };

  const userInfos = (
    <div className="w-full">
      <div className="flex flex-wrap justify-between gap-2 p-4">
        <div className="flex gap-2">
          <Avatar className="size-14">
            <AvatarImage
              src={`https://api.dicebear.com/8.x/adventurer-neutral/svg?seed=${user.id}`}
            />
            <AvatarFallback>
              {user.firstname.charAt(0)}
              {user.lastname.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-gray-950 dark:text-slate-200">
                {user?.firstname} {user?.lastname}
              </span>
              {user?.active ? (
                <Badge variant="outline">
                  <CheckCircledIcon className="mr-2 size-4 text-green-600" />
                  Actif
                </Badge>
              ) : (
                <Badge variant="outline">
                  <CrossCircledIcon className="mr-2 size-4 text-orange-600" />
                  Inactif
                </Badge>
              )}
            </div>
            <div className="text-gray-500">{user.email}</div>
          </div>
        </div>
        <Button variant="callToAction">
          <Pencil1Icon className="mr-2 size-4" />
          Modifier les informations
        </Button>
      </div>
      <div className="grid w-full grid-cols-3 gap-4">
        <div className="col-span-1 flex flex-col gap-4 max-xl:col-span-3">
          <Card>
            <CardHeader className="text-gray-900 dark:text-gray-300">
              <CardTitle className="flex items-center gap-4 text-xl">
                <BsFillInfoSquareFill />
                <span>Informations personnelles</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="divide-y divide-slate-300 dark:divide-slate-700">
              <UserInfoRow title="Nom">
                {user.firstname} {user.lastname}
              </UserInfoRow>
              <UserInfoRow title="Email">{user.email}</UserInfoRow>
              <UserInfoRow title="Téléphone">{user.phone}</UserInfoRow>
              <UserInfoRow title="Nationalité">{user.nationality}</UserInfoRow>
              <UserInfoRow title="Date de création">
                {new Date(user.created_at).toLocaleString("fr-FR")}
              </UserInfoRow>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="text-gray-900 dark:text-gray-300">
              <CardTitle className="flex items-center gap-4 text-xl">
                <FaLocationDot />
                <span>Adresse</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="divide-y divide-slate-300 dark:divide-slate-700">
              <UserInfoRow title="Pays de résidence">
                {user.country}
              </UserInfoRow>
              <UserInfoRow title="Adresse">
                {user.address.streetNumber} {user.address.street}
              </UserInfoRow>
              <UserInfoRow title="Code postal">
                {user.address.zipcode}
              </UserInfoRow>
              <UserInfoRow title="Ville">{user.address.locality}</UserInfoRow>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="text-gray-900 dark:text-gray-300">
              <CardTitle className="flex items-center gap-4 text-xl">
                <MdOutlineSecurity className="text-red-600" />
                <span>Sécurité</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <Button variant="destructive">
                Donner les droits d'administrateur à {user.firstname}{" "}
                {user.lastname}
              </Button>
              <Button variant="destructive">
                Désactiver {user.firstname} {user.lastname}
              </Button>
            </CardContent>
          </Card>
        </div>
        <div className="col-span-2 max-xl:col-span-3">
          <Card>
            <CardHeader className="text-gray-900 dark:text-gray-300">
              <CardTitle className="flex items-center gap-4 text-xl">
                <RiBankFill />
                <span>Informations bancaires</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="divide-y divide-slate-300 dark:divide-slate-700">
              <UserInfoRow title="IBAN">{user.iban}</UserInfoRow>
              <UserInfoRow title="BIC">{user.bic}</UserInfoRow>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col items-start gap-4">
      <Button onClick={handleGoBackToList} variant="link">
        <ArrowLeftIcon className="mr-2 h-4 w-4" />
        <span>Utilisateurs</span>
      </Button>
      {userLoaded ? userInfos : noUser}
    </div>
  );
}

export function UserInfoRow(props: any) {
  const title: string = props.title || "Titre à donner";
  const children: React.JSX.Element = props.children;
  return (
    <div className="flex flex-col gap-1 p-4">
      <div className="text-slate-800 dark:text-slate-300">{title}</div>
      <div className="font-bold text-slate-950 dark:text-slate-50">
        {children}
      </div>
    </div>
  );
}
