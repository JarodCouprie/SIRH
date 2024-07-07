import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { UserModel } from "@/models/User.model.ts";
import { customFetcher } from "@/helper/fetchInstance.ts";
import { Button } from "@/components/ui/button.tsx";
import {
  ArrowLeftIcon,
  CheckCircledIcon,
  CrossCircledIcon,
} from "@radix-ui/react-icons";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { RoleEnum, roleEnumKeyToFrench } from "@/enum/Role.enum.ts";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar.tsx";
import { BsFillInfoSquareFill } from "react-icons/bs";
import { FaLocationDot, FaUserGear } from "react-icons/fa6";
import { RiBankFill } from "react-icons/ri";
import { MdOutlineSecurity } from "react-icons/md";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs.tsx";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group.tsx";
import { Label } from "@/components/ui/label.tsx";

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
  const [user, setUser] = useState<UserModel>(new UserModel());
  const [userRole, setUserRole] = useState(user.role.toString());

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
    <div className="grid w-full grid-cols-3 gap-4">
      <div className="col-span-1 flex flex-col gap-4 max-2xl:col-span-3">
        <Card>
          <CardHeader className="text-gray-900 dark:text-gray-300">
            <CardTitle className="flex justify-between gap-2 text-xl">
              <div className="flex items-center gap-4">
                <BsFillInfoSquareFill />
                <span>Informations personnelles</span>
              </div>
              <Button variant="callToAction">Modifier</Button>
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
              <MdOutlineSecurity className="text-red-600" />
              <span>Sécurité</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Button variant="outline" className="text-red-600">
              Un bouton pour faire des trucs pas cool
            </Button>
            <Button variant="outline" className="text-red-600">
              Désactiver {user.firstname} {user.lastname}
            </Button>
          </CardContent>
        </Card>
      </div>
      <div className="col-span-2 flex flex-col gap-4 max-2xl:col-span-3">
        <Card>
          <CardHeader className="text-gray-900 dark:text-gray-300">
            <CardTitle className="flex justify-between gap-2 text-xl">
              <div className="flex items-center gap-4">
                <FaLocationDot />
                <span>Adresse</span>
              </div>
              <Button variant="callToAction">Modifier</Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="divide-y divide-slate-300 dark:divide-slate-700">
            <UserInfoRow title="Pays de résidence">{user.country}</UserInfoRow>
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
            <CardTitle className="flex justify-between gap-2 text-xl">
              <div className="flex items-center gap-4">
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
      </div>
    </div>
  );

  const handleSubmitRole = async () => {
    const config = {
      method: "POST",
      body: JSON.stringify({ role: userRole }),
    };
    await customFetcher(
      `http://localhost:5000/api/user/set-role/${id}`,
      config,
    ).then((response) => {
      if (response.response.status !== 200) {
        return;
      }
      setUserLoaded(true);
      setUser(response.data.data);
    });
  };

  const userRoleContent = (
    <Card>
      <CardHeader className="text-gray-900 dark:text-gray-300">
        <CardTitle className="flex items-center gap-4 text-xl">
          <FaUserGear />
          <span>Rôles</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup
          defaultValue={user.role}
          onValueChange={(value) => setUserRole(value)}
        >
          {Object.keys(RoleEnum).map((key) => {
            return (
              <div key={key} className="flex items-center space-x-2 text-xl">
                <RadioGroupItem value={key} id={key} />
                <Label htmlFor={key}>
                  <Badge
                    variant={
                      user.role.toString() === key ? "default" : "outline"
                    }
                  >
                    {roleEnumKeyToFrench(key)}
                  </Badge>
                </Label>
              </div>
            );
          })}
        </RadioGroup>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button variant="callToAction" onClick={handleSubmitRole}>
          Modifier
        </Button>
      </CardFooter>
    </Card>
  );

  const userMainPage = (
    <div className="w-full">
      <div className="flex flex-wrap justify-between gap-2 py-4">
        <div className="flex gap-2">
          <Avatar className="size-14">
            <AvatarImage src={user?.avatar_url} />
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
      </div>
      <div>
        <Tabs defaultValue="infos">
          <TabsList className="grid grid-cols-6">
            <TabsTrigger value="infos">Général</TabsTrigger>
            <TabsTrigger value="role">Rôles</TabsTrigger>
            <TabsTrigger value="demand">Demandes</TabsTrigger>
            <TabsTrigger value="expense">Frais</TabsTrigger>
            <TabsTrigger value="document">Documents</TabsTrigger>
            <TabsTrigger value="stuff">Matériel</TabsTrigger>
          </TabsList>
          <TabsContent value="infos">{userInfos}</TabsContent>
          <TabsContent value="role">{userRoleContent}</TabsContent>
          <TabsContent value="demand">{userInfos}</TabsContent>
          <TabsContent value="expense">{userInfos}</TabsContent>
          <TabsContent value="document">{userInfos}</TabsContent>
          <TabsContent value="stuff">{userInfos}</TabsContent>
        </Tabs>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col items-start gap-4 ">
      <Button onClick={handleGoBackToList} variant="link">
        <ArrowLeftIcon className="mr-2 h-4 w-4" />
        <span>Utilisateurs</span>
      </Button>
      {userLoaded ? userMainPage : noUser}
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
