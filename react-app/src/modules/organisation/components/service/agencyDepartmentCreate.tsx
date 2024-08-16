import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.js";
import { Input } from "@/components/ui/input.js";
import { Button } from "@/components/ui/button.js";
import { useNavigate, useParams } from "react-router-dom";
import { Label } from "@/components/ui/label.js";
import React, { useState, useEffect } from "react";
import { customFetcher } from "@/common/helper/fetchInstance.js";
import { CreateDepartmentAgencyFormDataModel } from "@/models/organisation/CreateDepartmentAgencyFormData.model.js";
import { UserList } from "@/common/type/user/user-list.type.js";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.js";

export const AgencyDepartmentCreate = () => {
  const { id } = useParams();
  const [service, setService] = useState(
    new CreateDepartmentAgencyFormDataModel(),
  );
  const [users, setUsers] = useState<UserList[]>([]);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    const response = await customFetcher(`http://localhost:5000/api/user/`);
    if (response.response.status === 200) {
      setUsers(response.data.data.list);
    }
  };

  const handleClickSubmitButton = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    const config = {
      method: "POST",
      body: JSON.stringify(service),
    };
    const newAgencyFetch = await customFetcher(
      `http://localhost:5000/api/service/create/${id}`,
      config,
    );

    if (newAgencyFetch.response.status === 201) {
      return navigate("/organisation");
    }
  };

  const handleDepartmentFormDataChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setService({
      ...service,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (value: string) => {
    setService({
      ...service,
      id_user_lead_service: +value,
    });
  };

  useEffect(() => {
    fetchUsers().then();
  }, []);

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
            <Label htmlFor="label">Nom du service</Label>
            <Input
              className="p-6"
              type="text"
              id="label"
              placeholder="Nom du service..."
              name="label"
              onChange={handleDepartmentFormDataChange}
            />

            <Label htmlFor="minimum_user">Nombre minimum de membre</Label>
            <Input
              className="p-6"
              type="number"
              id="minimum_user"
              placeholder="Nombre minimum..."
              name="minimum_user"
              onChange={handleDepartmentFormDataChange}
            />

            <Label htmlFor="id_user_lead_service">Chef du service</Label>
            <Select
              name="id_user_lead_service"
              onValueChange={handleSelectChange}
            >
              <SelectTrigger className="p-6">
                <SelectValue placeholder="Chef du service" />
              </SelectTrigger>
              <SelectContent>
                {users.map((user) => (
                  <SelectItem key={user.id} value={user.id.toString()}>
                    {user.firstname} {user.lastname}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex justify-end gap-2 pt-6">
              <Button
                variant="ghost"
                type="button"
                onClick={() => navigate(`/organisation`)}
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
