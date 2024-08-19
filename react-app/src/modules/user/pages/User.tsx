import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { UserModel } from "@/models/user/User.model.ts";
import { Button } from "@/components/ui/button.tsx";
import {
  ArrowLeftIcon,
  CheckCircledIcon,
  CrossCircledIcon,
} from "@radix-ui/react-icons";
import { Badge } from "@/components/ui/badge.js";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs.tsx";
import { UserRoles } from "@/modules/user/components/userRoles.js";
import { UserDetails } from "@/modules/user/components/userDetails.js";
import { UserExpenses } from "@/modules/user/components/expense/userExpenses.tsx";
import { UserDemands } from "@/modules/user/components/demand/userDemands.js";
import { customFetcher } from "@/common/helper/fetchInstance.js";
import { UserAvatar } from "@/modules/user/components/userAvatar.js";

export function User() {
  const { id } = useParams();
  const [userLoaded, setUserLoaded] = useState<boolean>(false);
  const [userNotFound, setUserNotFound] = useState<boolean>(false);
  const [foundUser, setFoundUser] = useState<UserModel>(new UserModel());
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

  const userMainPage = (
    <div className="w-full">
      <div className="flex flex-wrap justify-between gap-2 py-4">
        <div className="flex gap-2">
          <UserAvatar user={foundUser} setUser={setFoundUser} />
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
            <div className="text-gray-950 dark:text-gray-300">
              {foundUser.email}
            </div>
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
        <span>Collaborateurs</span>
      </Button>
      {userLoaded && userMainPage}
      {userNotFound && noUser}
    </div>
  );
}
