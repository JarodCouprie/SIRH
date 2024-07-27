import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.js";
import { FaUserGear } from "react-icons/fa6";
import { Checkbox } from "@/components/ui/checkbox.js";
import { RoleEnum, roleEnumKeyToFrench } from "@/enum/Role.enum.js";
import { Button } from "@/components/ui/button.js";
import { customFetcher } from "@/helper/fetchInstance.js";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge.js";

interface UserRolesProps {
  roles: RoleEnum[];
  id: number;
}

interface Role {
  id: number;
  label: RoleEnum;
}

export const UserRoles: React.FC<UserRolesProps> = ({ roles, id }) => {
  const [userRoles, setUserRoles] = useState<Role[]>([]);
  const [roleCanBeModified, setRoleCanBeModified] = useState(false);
  const [fetchedRoles, setFetchedRoles] = useState<Role[]>([]);
  const handleSubmitRole = async () => {
    const newRoles = userRoles.map((role) => {
      return role.id;
    });
    const config = {
      method: "POST",
      body: JSON.stringify({ roles: newRoles }),
    };
    await customFetcher(
      `http://localhost:5000/api/user/set-roles/${id}`,
      config,
    );
  };

  const getDatabaseRoles = async () => {
    await customFetcher(`http://localhost:5000/api/role`).then((response) => {
      if (response.response.status !== 200) {
        return;
      }
      const responseRoles: Role[] = response.data.data;
      setFetchedRoles(responseRoles);
      const userRoles = responseRoles.filter((role) =>
        roles.includes(role.label),
      );
      setUserRoles(userRoles);
    });
  };

  const addRole = (role: Role) => {
    setUserRoles([...userRoles, role]);
  };

  const removeRole = (role: Role) => {
    setUserRoles([...userRoles.filter((r) => r.id !== role.id)]);
  };

  useEffect(() => {
    getDatabaseRoles().then();
  }, []);

  const handleModifyRoles = () => {
    setRoleCanBeModified(!roleCanBeModified);
  };

  return (
    <Card>
      <CardHeader className="text-gray-900 dark:text-gray-300">
        <CardTitle className="flex flex-wrap justify-between gap-2 text-xl">
          <div className="flex flex-wrap items-center gap-4">
            <FaUserGear />
            <span>Rôles</span>
          </div>
          {roleCanBeModified ? (
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
        {roleCanBeModified ? (
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
                  <label
                    htmlFor={role.id.toString()}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    <Badge variant="default">
                      {roleEnumKeyToFrench(role.label)}
                    </Badge>
                  </label>
                </div>
              );
            })}
          </form>
        ) : (
          roles.map((role) => {
            return (
              <Badge key={role} variant="default">
                {roleEnumKeyToFrench(role)}
              </Badge>
            );
          })
        )}
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        {roleCanBeModified && (
          <Button variant="callToAction" onClick={handleSubmitRole}>
            Enregistrer
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
