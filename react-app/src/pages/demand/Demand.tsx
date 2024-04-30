import { Card, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { TbCalendarClock } from "react-icons/tb";
import { TbCalendarRepeat } from "react-icons/tb";
import { MdOutlineLaptop } from "react-icons/md";
import { Button } from "@/components/ui/button.tsx";
import { useNavigate } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb.tsx";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { customFetcher } from "@/helper/fetchInstance.ts";
import { DemandDTO } from "@/models/DemandModel.ts";

export function Demand() {
  const [demandList, setDemandList] = useState<DemandDTO[]>([]);
  const navigate = useNavigate();

  const fetchDemand = async () => {
    await customFetcher("http://localhost:5000/api/demand").then((response) => {
      if (response.response.status !== 200) {
        return;
      }
      setDemandList(response.data.data);
    });
  };

  useEffect(() => {
    fetchDemand().then();
  }, []);

  console.log(demandList);

  const handleClick = () => {
    navigate("/demand/create");
  };

  return (
    <>
      <div>Demandes</div>
      <div className="flex w-full justify-end py-4">
        <Button variant="callToAction" onClick={handleClick}>
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
                <Link to="/">
                  <span className="hover:text-indigo-600">Général</span>
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">
                  <span className="hover:text-indigo-600">Congés</span>
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">
                  <span className="hover:text-indigo-600">RTT</span>
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">
                  <span className="hover:text-indigo-600">Télétravail</span>
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
            {demandList?.length ? (
              demandList?.map((demand: DemandDTO) => (
                <TableRow className="hover:cursor-pointer">
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
                  <TableCell className="text-left">30</TableCell>
                  <TableCell className="text-left">{demand.status}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  Aucune demande
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
