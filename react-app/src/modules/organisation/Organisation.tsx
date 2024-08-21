import { MainRoot } from "@/components/navigation/MainRoot.tsx";
import { Button } from "@/components/ui/button.js";
import { CaretLeftIcon, CaretRightIcon, PlusIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { AgencyList } from "@/models/organisation/agency/Agency.model.js";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.js";
import { FaCompass } from "react-icons/fa";
import { Label } from "@/components/ui/label.js";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.js";
import { OrganisationMap } from "@/modules/organisation/components/organisationMap.js";
import { customFetcher } from "@/common/helper/fetchInstance.js";
import { TbBuildingEstate } from "react-icons/tb";
import { TableCell } from "@/components/ui/table.tsx";

export const Organisation = () => {
  const [agencyList, setAgencyList] = useState<AgencyList[]>([]);
  const [totalData, setTotalData] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [pageNumber, setPageNumber] = useState(1);
  const [selectedCoord, setSelectedCoord] = useState<[number, number]>([
    49.1068, 6.1764,
  ]);
  const navigate = useNavigate();

  const fetchAgency = async (pageSize: number, pageNumber: number) => {
    const response = await customFetcher(
      "http://localhost:5000/api/agency?" +
        new URLSearchParams({
          pageSize: pageSize.toString() || "10",
          pageNumber: pageNumber.toString() || "1",
        }),
    );
    if (response.response.status === 200) {
      setAgencyList(response.data.data.list);
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

  const handleClickCreate = () => {
    navigate("agency/create");
  };

  const handleFocusMap = (lat: number, lng: number) => {
    setSelectedCoord([lat, lng]);
  };

  const newOrg = (
    <Button variant="callToAction" onClick={handleClickCreate}>
      <PlusIcon className="mr-2 size-4" />
      Créer une organisation
    </Button>
  );

  function handleClick(agencyId: number) {
    navigate(`agency/${agencyId}`);
  }

  useEffect(() => {
    fetchAgency(pageSize, pageNumber);
  }, [pageSize, pageNumber]);

  return (
    <MainRoot title="Organisation" action={newOrg}>
      <div className="grid h-full grid-cols-4">
        <div className="col-span-1 flex flex-col gap-2  pr-4">
          {agencyList.length === 0 ? (
            <Card>
              <CardHeader>
                <CardTitle className="h-24 text-center">
                  <div className="flex flex-col gap-2">
                    <span>Aucune agence trouvé</span>
                    <span>Céez en une</span>
                  </div>
                </CardTitle>
              </CardHeader>
            </Card>
          ) : (
            agencyList.map((agency: AgencyList) => (
              <Card
                className="flex items-center pr-2 hover:cursor-pointer hover:bg-slate-100 hover:dark:bg-slate-800"
                key={agency.id}
                onClick={() => handleClick(agency.id)}
              >
                <CardHeader className="flex items-center">
                  <TbBuildingEstate className="size-8 text-slate-500" />
                </CardHeader>
                <div className="flex flex-grow flex-col">
                  <CardTitle className="text-lg font-semibold">
                    {agency.locality}
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-600">
                    {agency.streetNumber} {agency.street}, {agency.zipcode}
                  </CardDescription>
                </div>

                <Button
                  variant="callToAction"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFocusMap(+agency.lat, +agency.lng);
                  }}
                >
                  <FaCompass className="size-6" />
                </Button>
              </Card>
            ))
          )}
          <div className="flex w-full justify-between py-2">
            <div className="flex items-center gap-2">
              <Label>Agences par page</Label>
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
                {`${1 + pageSize * (pageNumber - 1)} - ${agencyList.length + pageSize * (pageNumber - 1)} sur ${totalData}`}
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

        <div className="col-span-3">
          <OrganisationMap center={selectedCoord} />
        </div>
      </div>
    </MainRoot>
  );
};
