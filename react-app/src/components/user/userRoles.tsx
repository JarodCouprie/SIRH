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
import { useState } from "react";

interface UserRolesProps {
  roles: string[];
  id: number;
}

export const UserRoles: React.FC<UserRolesProps> = ({ roles, id }) => {
  const [userRoles, setUserRoles] = useState<RoleEnum[]>(roles);
  const handleSubmitRole = async () => {
    const config = {
      method: "POST",
      body: JSON.stringify({ role: userRoles }),
    };
    await customFetcher(
      `http://localhost:5000/api/user/set-role/${id}`,
      config,
    );
  };

  return (
    <Card>
      <CardHeader className="text-gray-900 dark:text-gray-300">
        <CardTitle className="flex items-center gap-4 text-xl">
          <FaUserGear />
          <span>Rôles</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {roles.map((role) => {
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
};
