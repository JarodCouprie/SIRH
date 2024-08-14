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
import { DepartmentList } from "@/models/organisation/DepartmentList.model.js";
import { Label } from "@/components/ui/label.js";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.js";

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

  return (
    <div>
      <div className="flex justify-end">
        <Button variant="callToAction" onClick={handleClickCreate}>
          <PlusIcon className="mr-2 size-4" />
          Créer un département
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-left">Service</TableHead>
            <TableHead className="text-left">Collaborateur</TableHead>
            <TableHead className="text-left">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {departmentList.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                Aucun département trouvé
              </TableCell>
            </TableRow>
          ) : (
            departmentList.map((department: DepartmentList) => (
              <TableRow
                key={department.id}
                className="hover:cursor-pointer"
                //onClick={() => handleClick(department.id)}
              >
                <TableCell className="flex gap-2 text-left">
                  {department.label}
                </TableCell>
                <TableCell className="text-left">
                  {department.id_user_lead_service}
                </TableCell>
                <TableCell className={`text-left`}>
                  {/* {getClassForStatus(department.status)} */}
                  {department.minimum_users}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <div className="flex w-full justify-between py-2">
        <div className="flex items-center gap-2">
          <Label>Demandes par page</Label>
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
            {`${1 + pageSize * (pageNumber - 1)} - ${departmentList.length + pageSize * (pageNumber - 1)} sur ${totalData}`}
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
