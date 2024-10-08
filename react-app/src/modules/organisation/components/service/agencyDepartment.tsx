import { AgencyModel } from "@/models/organisation/agency/Agency.model.js";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.js";
import { CaretLeftIcon, CaretRightIcon, PlusIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button.js";
import { useNavigate } from "react-router-dom";
import { customFetcher } from "@/common/helper/fetchInstance.js";
import { DepartmentList } from "@/models/organisation/department/DepartmentList.model.ts";
import { Label } from "@/components/ui/label.js";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.js";
import { Card } from "@/components/ui/card";
import { GrGroup } from "react-icons/gr";

interface AgencyDetailsProps {
  agency: AgencyModel;
}

export const AgencyDepartment: React.FC<AgencyDetailsProps> = (agency) => {
  const [departmentList, setDepartmentList] = useState<DepartmentList[]>([]);
  const [totalData, setTotalData] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [pageNumber, setPageNumber] = useState(1);
  const navigate = useNavigate();

  const fetchDepartment = async (pageSize: number, pageNumber: number) => {
    const response = await customFetcher(
      `http://localhost:5000/api/service/${agency.agency.id}?` +
        new URLSearchParams({
          pageSize: pageSize.toString() || "10",
          pageNumber: pageNumber.toString() || "1",
        }),
    );
    if (response.response.status === 200) {
      setDepartmentList(response.data.data.list);
      setTotalData(response.data.data.totalData);
    }
  };

  const handlePageSize = (pageSize: string) => {
    setPageNumber(1);
    setPageSize(+pageSize);
  };

  const handlePreviousPageNumber = () => {
    setPageNumber(pageNumber - 1);
  };

  const handleNextPageNumber = () => {
    setPageNumber(pageNumber + 1);
  };

  useEffect(() => {
    fetchDepartment(pageSize, pageNumber).then();
  }, [pageSize, pageNumber]);

  const handleClickCreate = () => {
    navigate("service/create");
  };

  const handleClick = (id_service: number) => {
    navigate(`service/details/${id_service}`);
  };
  return (
    <div>
      <div className="flex justify-end pb-4">
        <Button variant="callToAction" onClick={handleClickCreate}>
          <PlusIcon className="mr-2 size-4" />
          Créer un service
        </Button>
      </div>
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left">Service</TableHead>
              <TableHead className="text-left">Chef de service</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {departmentList.length === 0 ? (
              <TableRow>
                <TableCell colSpan={2} className="h-24 text-center">
                  <div className="flex flex-col gap-2">
                    <span>Aucun service trouvé</span>
                    <span>Céez en un</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              departmentList.map((department: DepartmentList) => (
                <TableRow
                  key={department.id}
                  className="hover:cursor-pointer"
                  onClick={() => handleClick(department.id)}
                >
                  <TableCell className="flex gap-2 text-left">
                    <GrGroup className="size-7 text-gray-300" />
                    <div>
                      <div>{department.label}</div>
                      <div className="text-xs text-zinc-500">
                        nombre totale d'équipe {department.team_count}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-left">
                    {department.lead_service_firstname}{" "}
                    {department.lead_service_lastname}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
      <div className="flex w-full justify-between py-2">
        <div className="flex items-center gap-2">
          <Label>Services par page</Label>
          <Select
            onValueChange={(value) => handlePageSize(value)}
            defaultValue={pageSize.toString()}
          >
            <SelectTrigger className="w-fit">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-950 dark:text-gray-100">
            {`${departmentList.length === 0 ? 0 : 1 + pageSize * (pageNumber - 1)} - ${departmentList.length + pageSize * (pageNumber - 1)} sur ${totalData}`}
          </span>
          <Button
            variant="ghost"
            onClick={handlePreviousPageNumber}
            disabled={pageNumber === 1}
          >
            <CaretLeftIcon />
          </Button>
          <Button
            variant="ghost"
            onClick={handleNextPageNumber}
            disabled={pageSize * pageNumber >= totalData}
          >
            <CaretRightIcon />
          </Button>
        </div>
      </div>
    </div>
  );
};
