import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { UserModel } from "@/models/UserModel.ts";
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
    createdAt: new Date(),
    active: false,
    ca: 0,
    rtt: 0,
    tt: 0,
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
      <div className="px-4 pb-4">
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
      <div className="grid w-full grid-cols-3 gap-4">
        <Card className="col-span-1 max-2xl:col-span-3">
          <CardHeader className="text-gray-900 dark:text-gray-300">
            <CardTitle className="flex items-center justify-between gap-4 text-xl">
              <span>Informations personnelles</span>
              <Button variant="callToAction">
                <Pencil1Icon className="mr-2 size-4" />
                Modifier
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="divide-y divide-slate-300 dark:divide-slate-700">
            <UserInfoRow title="Identifiant">{user.id}</UserInfoRow>
            <UserInfoRow title="Nom">{user.lastname}</UserInfoRow>
            <UserInfoRow title="Prénom">{user.firstname}</UserInfoRow>
            <UserInfoRow title="Email">{user.email}</UserInfoRow>
            {/*<UserInfoRow title="Date de création">*/}
            {/*  {new Date(user.createdAt.toString()).toLocaleString("fr-FR")}*/}
            {/*</UserInfoRow>*/}
          </CardContent>
        </Card>
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
      <div className="text-xs text-slate-800 dark:text-slate-300">{title}</div>
      <div className="font-bold text-slate-950 dark:text-slate-50">
        {children}
      </div>
    </div>
  );
}
