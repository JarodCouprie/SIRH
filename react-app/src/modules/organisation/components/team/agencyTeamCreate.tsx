import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.js";
import { Label } from "@/components/ui/label.js";
import { Input } from "@/components/ui/input.js";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.js";
import { Button } from "@/components/ui/button.js";
import { useNavigate, useParams } from "react-router-dom";
import { customFetcher } from "@/common/helper/fetchInstance.js";
import { CreateTeamFormDataModel } from "@/models/organisation/CreateTeamFormData.model.js";
import { UserList } from "@/common/type/user/user-list.type.js";
import { Checkbox } from "@/components/ui/checkbox.js";

export const AgencyTeamCreate = () => {
  const navigate = useNavigate();
  const { id_service, id_agency } = useParams();
  const [team, setTeam] = useState(new CreateTeamFormDataModel());
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [users, setUsers] = useState<UserList[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await customFetcher(`http://localhost:5000/api/user/`);
      if (response.response.status === 200) {
        setUsers(response.data.data.list);
      }
    };
    fetchUsers().then();
  }, []);

  const handleClickSubmitButton = async (event: {
    preventDefault: () => void;
  }) => {
    event.preventDefault();
    const config = {
      method: "POST",
      body: JSON.stringify({
        ...team,
        id_service: id_service,
        members: selectedUsers,
      }),
    };

    const newAgencyFetch = await customFetcher(
      `http://localhost:5000/api/team/create`,
      config,
    );

    if (newAgencyFetch.response.status === 204) {
      navigate(
        `/organisation/agency/${id_agency}/service/details/${id_service}`,
      );
    }
  };

  const handleTeamFormDataChange = (e: {
    target: { name: string; value: string };
  }) => {
    setTeam({
      ...team,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChangeUserLead = (value: string | number) => {
    setTeam({
      ...team,
      id_user_lead_team: +value,
    });
  };

  const handleCheckboxChange = (userId: number, checked: boolean) => {
    if (checked) {
      setSelectedUsers((prevSelected) => [...prevSelected, userId]);
    } else {
      setSelectedUsers((prevSelected) =>
        prevSelected.filter((id) => id !== userId),
      );
    }
  };

  return (
    <div>
      <Card>
        <CardTitle className="flex items-center justify-between gap-4 text-xl">
          <CardHeader>Création d'un service</CardHeader>
        </CardTitle>
        <CardContent>
          <form
            className="flex flex-col gap-3"
            onSubmit={handleClickSubmitButton}
          >
            <Label htmlFor="label">Nom de l'équipe</Label>
            <Input
              className="p-6"
              type="text"
              id="label"
              placeholder="Nom de l'équipe..."
              name="label"
              onChange={handleTeamFormDataChange}
            />

            <Label htmlFor="id_user_lead_team">Chef de l'équipe</Label>
            <Select
              name="id_user_lead_team"
              onValueChange={handleSelectChangeUserLead}
            >
              <SelectTrigger className="p-6">
                <SelectValue placeholder="Chef de l'équipe" />
              </SelectTrigger>
              <SelectContent>
                {users.map((user) => (
                  <SelectItem key={user.id} value={user.id.toString()}>
                    {user.firstname} {user.lastname}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Label htmlFor="minimum_users">Nombre minimum de membre</Label>
            <Input
              className="p-6"
              type="number"
              id="minimum_users"
              placeholder="Nombre minimum..."
              name="minimum_users"
              onChange={handleTeamFormDataChange}
            />

            <Label htmlFor="members">Membre de l'équipe</Label>
            <div className="rounded-md border p-3">
              {users.map((user) => (
                <div className="flex items-center space-x-2" key={user.id}>
                  <Checkbox
                    id={user.id.toString()}
                    checked={selectedUsers.includes(user.id)}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange(user.id, checked as boolean)
                    }
                  />
                  <Label
                    htmlFor={user.id.toString()}
                    className="cursor-pointer text-sm font-medium"
                  >
                    {user.firstname} {user.lastname}
                  </Label>
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-2 pt-6">
              <Button
                variant="ghost"
                type="button"
                onClick={() =>
                  navigate(
                    `/organisation/agency/${id_agency}/service/details/${id_service}`,
                  )
                }
              >
                Annuler
              </Button>
              <Button variant="callToAction" type="submit">
                Enregistrer
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
