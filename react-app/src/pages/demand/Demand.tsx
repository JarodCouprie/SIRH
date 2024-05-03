import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { customFetcher } from "@/helper/fetchInstance.ts";
import { DemandDTO } from "@/models/DemandModel.ts";
import { Button } from "@/components/ui/button.tsx";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { TbCalendarClock, TbCalendarRepeat } from "react-icons/tb";
import { MdOutlineLaptop } from "react-icons/md";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb.tsx";

export function Demand() {
  const [demandList, setDemandList] = useState<DemandDTO[]>([]);
  const [filter, setFilter] = useState<string | null>(null);
  const [filteredDemandList, setFilteredDemandList] = useState<DemandDTO[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDemand();
  }, []);

  useEffect(() => {
    if (demandList.length > 0) {
      handleFilter(null);
    }
  }, [demandList]);

  const fetchDemand = async () => {
    try {
      const response = await customFetcher("http://localhost:5000/api/demand");
      if (response.response.status === 200) {
        setDemandList(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching demand:", error);
    }
  };

  const handleClickCreate = () => {
    navigate("/demand/create");
  };

  const handleClick = () => {
    navigate("/demand/visu");
  };

  const getClassForStatus = ({ status }: { status: any }) => {
    switch (status) {
      case "ACCEPTED":
        return "text-green-600";
      case "WAITING":
        return "text-yellow-600";
      case "DENIED":
        return "text-red-600";
      default:
        return "";
    }
  };

  const handleFilter = (type: string | null) => {
    if (type === filter) {
      setFilter(null);
      setFilteredDemandList(demandList);
    } else {
      setFilter(type);
      const filteredDemands = demandList.filter(
        (demand) => demand.type === type,
      );
      setFilteredDemandList(filteredDemands);
    }
    if (type === null) {
      setFilter(null);
      setFilteredDemandList(demandList);
    }
  };

  return (
    <>
      <div>Demandes</div>
      <div className="flex w-full justify-end py-4">
        <Button variant="callToAction" onClick={handleClickCreate}>
          Faire une demande
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card className="flex ">
          <CardHeader className="flex flex-row">
            <TbCalendarClock className="size-14 text-indigo-500 opacity-75" />
          </CardHeader>

          <CardTitle className="p-4">
            <span className="text-base">Solde de congés</span>
            <div className="text-4xl">30</div>
          </CardTitle>
        </Card>

        <Card className="flex ">
          <CardHeader className="flex flex-row">
            <TbCalendarRepeat className="size-14 text-red-500 opacity-75" />
          </CardHeader>

          <CardTitle className="p-4">
            <span className="text-base">Solde de RTT</span>
            <div className="text-4xl">30</div>
          </CardTitle>
        </Card>

        <Card className="flex ">
          <CardHeader className="flex flex-row">
            <MdOutlineLaptop className="size-14 text-orange-500 opacity-75" />
          </CardHeader>

          <CardTitle className="p-4">
            <span className="text-base">Solde de télétravail</span>
            <div className="text-4xl">30</div>
          </CardTitle>
        </Card>
      </div>

      <div className="border-b border-b-gray-400 pt-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/demand" onClick={() => handleFilter(null)}>
                  <span
                    className={`hover:text-indigo-600 ${filter === null && "text-indigo-600"}`}
                  >
                    Général
                  </span>
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/demand" onClick={() => handleFilter("CA")}>
                  <span
                    className={`hover:text-indigo-600 ${filter === "CA" && "text-indigo-600"}`}
                  >
                    Congés
                  </span>
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/demand" onClick={() => handleFilter("RTT")}>
                  <span
                    className={`hover:text-indigo-600 ${filter === "RTT" && "text-indigo-600"}`}
                  >
                    RTT
                  </span>
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/demand" onClick={() => handleFilter("TT")}>
                  <span
                    className={`hover:text-indigo-600 ${filter === "TT" && "text-indigo-600"}`}
                  >
                    Télétravail
                  </span>
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="rounded pt-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left">Demande</TableHead>
              <TableHead className="text-left">Date de début</TableHead>
              <TableHead className="text-left">Date de fin</TableHead>
              <TableHead className="text-left">Date de création</TableHead>
              <TableHead className="text-left">Jours</TableHead>
              <TableHead className="text-left">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDemandList.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  Aucune demande trouvée
                </TableCell>
              </TableRow>
            ) : (
              filteredDemandList.map((demand: DemandDTO) => (
                <TableRow
                  key={demand.id}
                  className="hover:cursor-pointer"
                  onClick={handleClick}
                >
                  <TableCell className="text-left">{demand.type}</TableCell>
                  <TableCell className="text-left">
                    {new Date(demand?.startDate?.toString()).toLocaleDateString(
                      "fr-FR",
                    )}
                  </TableCell>
                  <TableCell className="text-left">
                    {new Date(demand?.endDate?.toString()).toLocaleDateString(
                      "fr-FR",
                    )}
                  </TableCell>
                  <TableCell className="text-left">
                    {new Date(demand?.createdAt?.toString()).toLocaleDateString(
                      "fr-FR",
                    )}
                  </TableCell>
                  <TableCell className="text-left">
                    {demand.number_day}
                  </TableCell>
                  <TableCell
                    className={`text-left ${getClassForStatus({ status: demand.status })}`}
                  >
                    {demand.status}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
