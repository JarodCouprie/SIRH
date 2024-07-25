import { useNavigate, useParams } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog.js";
import { Input } from "@/components/ui/input.js";
import { FaPen } from "react-icons/fa";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip.js";
import { toast } from "sonner";
import { useCurrentUser } from "@/hooks/useCurrentUser.js";
import { Label } from "@/components/ui/label.js";
import { Checkbox } from "@/components/ui/checkbox.js";

export function User() {
  const { id } = useParams();
  const [userLoaded, setUserLoaded] = useState(false);
  const [foundUser, setFoundUser] = useState<UserModel>(new UserModel());
  const [userRoles, setUserRoles] = useState<RoleEnum[]>(foundUser.roles);
  const [file, setFile] = useState<File | null>(null);
  const { user, refreshUser } = useCurrentUser();
  useEffect(() => {
    fetchUser().then();
  }, []);
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

  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  const fetchUser = async () => {
    await customFetcher(`http://localhost:5000/api/user/${id}`).then(
      (response) => {
        if (response.response.status !== 200) {
          return;
        }
        setUserLoaded(true);
        setFoundUser(response.data.data);
      },
    );
  };

  const handleGoBackToList = () => {
    navigate("/user");
  };

  const handleDisableUser = async (userActive: boolean) => {
    const config = {
      method: "PUT",
      body: JSON.stringify({ active: userActive }),
    };
    await customFetcher(
      `http://localhost:5000/api/user/active/${id}`,
      config,
    ).then((response) => {
      if (response.response.status !== 200) {
        return toast.error(response.data.message);
      }
      toast.success(response.data.message);
      setUserLoaded(true);
      setFoundUser(response.data.data);
    });
  };

  const userInfos = (
    <div className="grid w-full grid-cols-3 gap-4">
      <div className="col-span-1 flex flex-col gap-4 max-2xl:col-span-3">
        <Card>
          <CardHeader className="text-gray-900 dark:text-gray-300">
            <CardTitle className="flex flex-wrap justify-between gap-2 text-xl">
              <div className="flex flex-wrap items-center gap-4">
                <BsFillInfoSquareFill />
                <span>Informations personnelles</span>
              </div>
              <Button variant="callToAction">Modifier</Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="divide-y divide-slate-300 dark:divide-slate-700">
            <UserInfoRow title="Nom">
              {foundUser.firstname} {foundUser.lastname}
            </UserInfoRow>
            <UserInfoRow title="Email">{foundUser.email}</UserInfoRow>
            <UserInfoRow title="Téléphone">{foundUser.phone}</UserInfoRow>
            <UserInfoRow title="Nationalité">
              {foundUser.nationality}
            </UserInfoRow>
            <UserInfoRow title="Date de création">
              {new Date(foundUser.created_at).toLocaleString(
                "fr-FR",
                dateOptions,
              )}
            </UserInfoRow>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="text-gray-900 dark:text-gray-300">
            <CardTitle className="flex flex-wrap items-center gap-4 text-xl">
              <MdOutlineSecurity className="text-red-600" />
              <span>Sécurité</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Button variant="outline" className="text-red-600">
              Un bouton pour faire des trucs pas cool
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                {foundUser.active ? (
                  <Button variant="outline" className="text-red-600">
                    Désactiver {foundUser.firstname} {foundUser.lastname}
                  </Button>
                ) : (
                  <Button variant="outline" className="text-red-600">
                    Réactiver {foundUser.firstname} {foundUser.lastname}
                  </Button>
                )}
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Désactiver{" "}
                    <span className="text-gray-50">
                      {foundUser.firstname} {foundUser.lastname}
                    </span>
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Êtes-vous sûr de vouloir désactiver {foundUser.firstname}{" "}
                    {foundUser.lastname}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Annuler</AlertDialogCancel>
                  {foundUser.active ? (
                    <AlertDialogAction onClick={() => handleDisableUser(false)}>
                      Désactiver
                    </AlertDialogAction>
                  ) : (
                    <AlertDialogAction onClick={() => handleDisableUser(true)}>
                      Réactiver
                    </AlertDialogAction>
                  )}
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>
      </div>
      <div className="col-span-2 flex flex-col gap-4 max-2xl:col-span-3">
        <Card>
          <CardHeader className="text-gray-900 dark:text-gray-300">
            <CardTitle className="flex flex-wrap justify-between gap-2 text-xl">
              <div className="flex flex-wrap items-center gap-4">
                <FaLocationDot />
                <span>Adresse</span>
              </div>
              <Button variant="callToAction">Modifier</Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="divide-y divide-slate-300 dark:divide-slate-700">
            <UserInfoRow title="Pays de résidence">
              {foundUser.country}
            </UserInfoRow>
            <UserInfoRow title="Adresse">
              {foundUser.address.streetNumber} {foundUser.address.street}
            </UserInfoRow>
            <UserInfoRow title="Code postal">
              {foundUser.address.zipcode}
            </UserInfoRow>
            <UserInfoRow title="Ville">
              {foundUser.address.locality}
            </UserInfoRow>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="text-gray-900 dark:text-gray-300">
            <CardTitle className="flex flex-wrap justify-between gap-2 text-xl">
              <div className="flex flex-wrap items-center gap-4">
                <RiBankFill />
                <span>Informations bancaires</span>
              </div>
              <Button variant="callToAction">Modifier</Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="divide-y divide-slate-300 dark:divide-slate-700">
            <UserInfoRow title="IBAN">{foundUser.iban}</UserInfoRow>
            <UserInfoRow title="BIC">{foundUser.bic}</UserInfoRow>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const handleSubmitRole = async () => {
    const config = {
      method: "POST",
      body: JSON.stringify({ role: userRoles }),
    };
    await customFetcher(
      `http://localhost:5000/api/user/set-role/${id}`,
      config,
    ).then((response) => {
      if (response.response.status !== 200) {
        return;
      }
      setUserLoaded(true);
      setFoundUser(response.data.data);
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
      <CardContent className="flex flex-col gap-2">
        {foundUser.roles.map((role) => {
          return (
            <div className="flex items-center space-x-2" key={role}>
              <Checkbox id={role} />
              <label
                htmlFor={role}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {roleEnumKeyToFrench(role)}
              </label>
            </div>
          );
        })}
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button variant="callToAction" onClick={handleSubmitRole}>
          Modifier
        </Button>
      </CardFooter>
    </Card>
  );

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmitPicture = async () => {
    if (!file) {
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    const config = {
      method: "PUT",
      body: formData,
    };
    await customFetcher(
      `http://localhost:5000/api/user/set-picture/${id}`,
      config,
      false,
    ).then((response) => {
      if (response.response.status !== 200) {
        return;
      }
      setUserLoaded(true);
      setFoundUser(response.data.data);

      if (user.id === foundUser.id) {
        refreshUser();
      }
    });
  };

  const userMainPage = (
    <div className="w-full">
      <div className="flex flex-wrap justify-between gap-2 py-4">
        <div className="flex gap-2">
          <AlertDialog>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <AlertDialogTrigger asChild>
                    <Avatar className="size-14 cursor-pointer">
                      <AvatarImage src={foundUser?.avatar_url} />
                      <AvatarFallback>
                        {foundUser.firstname.charAt(0)}
                        {foundUser.lastname.charAt(0)}
                      </AvatarFallback>
                      <div className="absolute left-0 top-0 grid size-full place-items-center bg-slate-700 opacity-0 transition duration-200 hover:opacity-90">
                        <FaPen className="size-6 text-gray-50" />
                      </div>
                    </Avatar>
                  </AlertDialogTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Modifier la photo</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Nouvelle image de profil</AlertDialogTitle>
                <AlertDialogDescription></AlertDialogDescription>
              </AlertDialogHeader>
              <div className="grid w-full items-center gap-1.5">
                <Input
                  type="file"
                  className="cursor-pointer bg-gray-50"
                  onChange={handleFileChange}
                />
              </div>
              <AlertDialogFooter>
                <AlertDialogCancel>Annuler</AlertDialogCancel>
                <AlertDialogAction onClick={handleSubmitPicture}>
                  Modifier
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <div>
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-gray-950 dark:text-slate-200">
                {foundUser?.firstname} {foundUser?.lastname}
              </span>
              {foundUser?.active ? (
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
            <div className="text-gray-500">{foundUser.email}</div>
          </div>
        </div>
      </div>
      <div>
        <Tabs defaultValue="infos">
          <TabsList className="flex flex-wrap">
            <TabsTrigger value="infos">Général</TabsTrigger>
            <TabsTrigger value="role">Rôles</TabsTrigger>
            <TabsTrigger value="demand">Demandes</TabsTrigger>
            <TabsTrigger value="expense">Frais</TabsTrigger>
          </TabsList>
          <TabsContent value="infos">{userInfos}</TabsContent>
          <TabsContent value="role">{userRoleContent}</TabsContent>
          <TabsContent value="demand">{userInfos}</TabsContent>
          <TabsContent value="expense">{userInfos}</TabsContent>
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

export function UserInfoRow(props: {
  title: string;
  children: string | string[];
}) {
  const title = props.title || "Titre à donner";
  const children = props.children;
  return (
    <div className="flex flex-col gap-1 p-4">
      <div className="text-slate-800 dark:text-slate-300">{title}</div>
      <div className="font-bold text-slate-950 dark:text-slate-50">
        {children}
      </div>
    </div>
  );
}
