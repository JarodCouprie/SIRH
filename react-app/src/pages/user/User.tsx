import { useNavigate, useParams } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";
import { UserModel } from "@/models/user/User.model.ts";
import { customFetcher } from "@/helper/fetchInstance.ts";
import { Button } from "@/components/ui/button.tsx";
import {
  ArrowLeftIcon,
  CheckCircledIcon,
  CrossCircledIcon,
} from "@radix-ui/react-icons";
import { Badge } from "@/components/ui/badge";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar.tsx";
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
import { useCurrentUser } from "@/hooks/useCurrentUser.ts";
import { UserRoles } from "@/components/user/userRoles.js";
import { UserDetails } from "@/components/user/userDetails.js";
import { UserExpenses } from "@/components/user/expense/userExpenses.tsx";
import { UserDemands } from "@/components/user/demand/userDemands.js";

export function User() {
  const { id } = useParams();
  const [userLoaded, setUserLoaded] = useState<boolean>(false);
  const [userNotFound, setUserNotFound] = useState<boolean>(false);
  const [foundUser, setFoundUser] = useState<UserModel>(new UserModel());
  const [file, setFile] = useState<File | null>(null);
  const { currentUser, refreshCurrentUser } = useCurrentUser();
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

  const fetchUser = async () => {
    await customFetcher(`http://localhost:5000/api/user/${id}`).then(
      (response) => {
        if (response.response.status !== 200) {
          return setUserNotFound(true);
        }
        setUserLoaded(true);
        setFoundUser(response.data.data);
      },
    );
  };

  const handleGoBackToList = () => {
    navigate("/user");
  };

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
      if (!response.data.data) {
        return setUserLoaded(false);
      }
      setUserLoaded(true);
      setFoundUser(response.data.data);

      if (currentUser.id === foundUser.id) {
        refreshCurrentUser();
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
                        {foundUser?.firstname?.charAt(0)}
                        {foundUser?.lastname?.charAt(0)}
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
        <Tabs defaultValue="details">
          <TabsList className="flex flex-wrap">
            <TabsTrigger value="details">Général</TabsTrigger>
            <TabsTrigger value="role">Rôles</TabsTrigger>
            <TabsTrigger value="demand">Demandes</TabsTrigger>
            <TabsTrigger value="expense">Frais</TabsTrigger>
          </TabsList>
          <TabsContent value="details">
            <UserDetails user={foundUser} setUser={setFoundUser} />
          </TabsContent>
          <TabsContent value="role">
            <UserRoles user={foundUser} setUser={setFoundUser} />
          </TabsContent>
          <TabsContent value="demand">
            <UserDemands user={foundUser} />
          </TabsContent>
          <TabsContent value="expense">
            <UserExpenses user={foundUser} />
          </TabsContent>
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
      {userLoaded && userMainPage}
      {userNotFound && noUser}
    </div>
  );
}
