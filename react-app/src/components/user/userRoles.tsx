import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.js";
import { FaUserGear } from "react-icons/fa6";
import { Checkbox } from "@/components/ui/checkbox.js";
import { roleEnumKeyToFrench } from "@/enum/Role.enum.js";
import { Button } from "@/components/ui/button.js";
import { customFetcher } from "@/helper/fetchInstance.js";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge.js";
import { Label } from "@/components/ui/label.js";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert.js";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { UserModel } from "@/models/user/User.model.ts";
import { Role } from "@/type/user/user-role.type.ts";
import { useCurrentUser } from "@/hooks/useCurrentUser.tsx";

interface UserProps {
  user: UserModel;
  setUser: Dispatch<SetStateAction<UserModel>>;
}

export const UserRoles: React.FC<UserProps> = ({ user, setUser }) => {
  const { currentUser, refreshCurrentUser } = useCurrentUser();
  const [userRoles, setUserRoles] = useState<Role[]>([]);
  const [rolesCanBeModified, setRolesCanBeModified] = useState(false);
  const [fetchedRoles, setFetchedRoles] = useState<Role[]>([]);
  const [displayWarning, setDisplayWarning] = useState(false);

  const handleSubmitRole = async () => {
    const newRoles = userRoles.map((role) => {
      return role.id;
    });
    const config = {
      method: "POST",
      body: JSON.stringify({ roles: newRoles }),
    };
    await customFetcher(
      `http://localhost:5000/api/user/set-roles/${user.id}`,
      config,
    ).then((response) => {
      setUser(response.data.data);
      setRolesCanBeModified(false);
      if (user.id === currentUser.id) {
        refreshCurrentUser();
      }
    });
  };

  const getDatabaseRoles = async () => {
    await customFetcher(`http://localhost:5000/api/role`).then((response) => {
      if (response.response.status !== 200) {
        return;
      }
      const responseRoles: Role[] = response.data.data;
      setFetchedRoles(responseRoles);
      const userRoles = responseRoles.filter((role) =>
        user.roles.includes(role.label),
      );
      setUserRoles(userRoles);
    });
  };

  const addRole = (role: Role) => {
    setUserRoles([...userRoles, role]);
    if (userRoles.length >= 1) {
      setDisplayWarning(false);
    }
  };

  const removeRole = (role: Role) => {
    const filteredRoles = [...userRoles.filter((r) => r.id !== role.id)];
    if (filteredRoles.length === 0) {
      setDisplayWarning(true);
      return;
    } else {
      setUserRoles(filteredRoles);
    }
  };

  useEffect(() => {
    getDatabaseRoles().then();
  }, []);

  const handleModifyRoles = () => {
    setRolesCanBeModified(!rolesCanBeModified);
  };

  return (
    <Card>
      <CardHeader className="text-gray-900 dark:text-gray-300">
        <CardTitle className="flex flex-wrap justify-between gap-2 text-xl">
          <div className="flex flex-wrap items-center gap-4">
            <FaUserGear />
            <span>Rôles</span>
          </div>
          {rolesCanBeModified ? (
            <Button variant="ghost" onClick={handleModifyRoles}>
              Annuler
            </Button>
          ) : (
            <Button variant="callToAction" onClick={handleModifyRoles}>
              Modifier
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {rolesCanBeModified ? (
          <form className="flex flex-col gap-2">
            {fetchedRoles.map((role) => {
              return (
                <div className="flex items-center space-x-2" key={role.id}>
                  <Checkbox
                    id={role.id.toString()}
                    checked={userRoles.some((r) => r.label === role.label)}
                    onCheckedChange={(checked) => {
                      return checked ? addRole(role) : removeRole(role);
                    }}
                  />
                  <Label
                    htmlFor={role.id.toString()}
                    className="cursor-pointer text-sm font-medium"
                  >
                    <Badge variant="default">
                      {roleEnumKeyToFrench(role.label)}
                    </Badge>
                  </Label>
                </div>
              );
            })}
          </form>
        ) : (
          user.roles.map((role) => {
            return (
              <Badge key={role} variant="default">
                {roleEnumKeyToFrench(role)}
              </Badge>
            );
          })
        )}
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
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        {rolesCanBeModified && (
          <Button variant="callToAction" onClick={handleSubmitRole}>
            Enregistrer
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
