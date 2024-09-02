import { customFetcher } from "@/common/helper/fetchInstance.js";
import { useParams } from "react-router-dom";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.js";
import { FieldRow } from "@/components/fieldRow.js";
import { Label } from "@/components/ui/label.js";
import { Input } from "@/components/ui/input.js";
import { Button } from "@/components/ui/button.js";
import { UserList } from "@/common/type/user/user-list.type.js";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.js";
import { BsFillInfoSquareFill } from "react-icons/bs";
import { DepartmentModel } from "@/models/organisation/department/Department.model.ts";

interface DepartmentInfoDetailsProps {
  department: DepartmentModel;
  setDepartment: Dispatch<SetStateAction<DepartmentModel>>;
}

class DepartmentData {
  label: string;
  id_user_lead_service: number;
  lead_service_firstname: string;
  lead_service_lastname: string;
  count_team: number;

  constructor(department: DepartmentModel) {
    this.label = department.label;
    this.id_user_lead_service = department.id_user_lead_service;
    this.lead_service_lastname = department.lead_service_lastname;
    this.lead_service_firstname = department.lead_service_firstname;
    this.count_team = department.count_team;
  }
}

export const DepartmentInfo: React.FC<DepartmentInfoDetailsProps> = ({
  department,
  setDepartment,
}) => {
  const { id_service } = useParams();
  const [departmentCanBeUpdated, setDepartmentCanBeUpdated] = useState(false);
  const [departmentUpdated, setDepartmentUpdated] = useState(
    new DepartmentData(department),
  );
  const [users, setUsers] = useState<UserList[]>([]);
  const fetchDepartmentInfo = async () => {
    const response = await customFetcher(
      `http://localhost:5000/api/service/department/${id_service}`,
    );
    if (response.response.status === 200) {
      setDepartmentUpdated(response.data.data);
    }
  };

  const fetchUsers = async () => {
    const response = await customFetcher(`http://localhost:5000/api/user/`);
    if (response.response.status === 200) {
      setUsers(response.data.data.list);
    }
  };

  const handleUpdateDepartment = () => {
    setDepartmentUpdated(new DepartmentData(department));
    setDepartmentCanBeUpdated(!departmentCanBeUpdated);
  };

  const handleSubmitUpdatedDepartment = async () => {
    const config = {
      method: "POST",
      body: JSON.stringify(departmentUpdated),
    };
    await customFetcher(
      `http://localhost:5000/api/service/update-info/${id_service}`,
      config,
    ).then((response) => {
      setDepartment(response.data.data);
      setDepartmentCanBeUpdated(!departmentCanBeUpdated);
    });
  };

  const handleDepartmentFormDataChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setDepartmentUpdated({
      ...departmentUpdated,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (value: string) => {
    setDepartmentUpdated({
      ...departmentUpdated,
      id_user_lead_service: +value,
    });
  };

  useEffect(() => {
    fetchDepartmentInfo().then();
    fetchUsers().then();
  }, []);

  const departmentFields = (
    <CardContent className="divide-y divide-slate-300 dark:divide-slate-700">
      <FieldRow title="Nom">{departmentUpdated.label}</FieldRow>
      <FieldRow title="Chef de service">
        {department.lead_service_firstname} {""}{" "}
        {department.lead_service_lastname}
      </FieldRow>
      <FieldRow title="Nombre total de collaborateur">
        {departmentUpdated.count_team}
      </FieldRow>
    </CardContent>
  );

  const departmentUpdating = (
    <CardContent className="flex flex-col gap-4 py-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="label">Nom</Label>
        <Input
          type="text"
          id="label"
          placeholder="Numéro de rue"
          name="label"
          value={departmentUpdated.label}
          onChange={handleDepartmentFormDataChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="id_user_lead_service">Chef du service</Label>
        <Select
          name="id_user_lead_service"
          value={departmentUpdated.id_user_lead_service.toString()}
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
      </div>
    </CardContent>
  );

  return (
    <Card>
      <CardHeader className="text-gray-900 dark:text-gray-300">
        <CardTitle className="flex flex-wrap justify-between gap-2 text-xl">
          <div className="flex flex-wrap items-center gap-4">
            <BsFillInfoSquareFill />
            <span>Informations</span>
          </div>
          {departmentCanBeUpdated ? (
            <Button variant="ghost" onClick={handleUpdateDepartment}>
              Annuler
            </Button>
          ) : (
            <Button variant="ghost" onClick={handleUpdateDepartment}>
              <span className="text-slate-950 dark:text-slate-50">
                Modifier
              </span>
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      {departmentCanBeUpdated ? departmentUpdating : departmentFields}
      {departmentCanBeUpdated && (
        <CardFooter className="justify-end">
          <Button
            variant="callToAction"
            onClick={handleSubmitUpdatedDepartment}
          >
            Enregistrer
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};
