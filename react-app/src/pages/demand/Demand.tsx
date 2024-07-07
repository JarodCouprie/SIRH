import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { customFetcher } from "@/helper/fetchInstance.ts";
import { DemandAll } from "@/models/DemandModel.ts";
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
import { TbCalendarClock, TbCalendarRepeat } from "react-icons/tb";
import { MdOutlineLaptop } from "react-icons/md";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb.tsx";
import {
  CaretLeftIcon,
  CaretRightIcon,
  MinusIcon,
} from "@radix-ui/react-icons";
import { Badge } from "@/components/ui/badge.tsx";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import { Label } from "@/components/ui/label.tsx";
import { DemandCard } from "@/components/demand/demandCard.tsx";

export function Demand() {
  const [demandList, setDemandList] = useState<DemandAll[]>([]);
  const [filter, setFilter] = useState("");
  const [pageSize, setPageSize] = useState(5);
  const [pageNumber, setPageNumber] = useState(1);
  const [type, setType] = useState("");
  const [totalData, setTotalData] = useState(0);
  const navigate = useNavigate();

  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
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
    fetchDemand(pageSize, pageNumber, type);
  }, [pageSize, pageNumber, type]);

  const fetchDemand = async (
    pageSize: number,
    pageNumber: number,
    type: string,
  ) => {
    try {
      const response = await customFetcher(
        "http://localhost:5000/api/demand?" +
          new URLSearchParams({
            pageSize: pageSize.toString() || "10",
            pageNumber: pageNumber.toString() || "1",
            type: type || "",
          }),
      );
      if (response.response.status === 200) {
        setDemandList(response.data.data.list);
        setTotalData(response.data.data.totalData);
      }
    } catch (error) {
      console.error("Error fetching demand:", error);
    }
  };

  const handleClickCreate = () => {
    navigate("/demand/create");
  };

  const handleClick = (id: number) => {
    navigate(`/demand/detail/${id}`);
  };

  const getClassForStatus = (status: any) => {
    switch (status) {
      case "ACCEPTED":
        return <Badge variant="accepted">Acceptée</Badge>;
      case "WAITING":
        return <Badge variant="waiting">En attente</Badge>;
      case "DENIED":
        return <Badge variant="denied">Refusée</Badge>;
      case "DRAFT":
        return <Badge variant="draft">A confirmer</Badge>;
      default:
        return <Badge variant="outline">Erreur</Badge>;
    }
  };

  const getStatusOption = (status: any) => {
    switch (status) {
      case "CA":
        return {
          icon: (
            <TbCalendarClock className="size-9 text-indigo-500 opacity-75" />
          ),
          label: "Demande de congés",
        };
      case "RTT":
        return {
          icon: <TbCalendarRepeat className="size-9 text-red-500 opacity-75" />,
          label: "Demande de RTT",
        };
      case "TT":
        return {
          icon: (
            <MdOutlineLaptop className="size-9 text-orange-500 opacity-75" />
          ),
          label: "Demande de télétravail",
        };
      default:
        return {
          icon: <MinusIcon />,
          label: "???",
        };
    }
  };

  const handleFilter = (type = "") => {
    setPageNumber(1);
    setType(type);
    setFilter(type);
  };

  return (
    <>
      <div>Demandes</div>
      <div className="flex w-full justify-end py-4">
        <Button variant="callToAction" onClick={handleClickCreate}>
          Faire une demande
        </Button>
      </div>

      <DemandCard />

      <div className="border-b border-b-gray-400 pt-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/demand" onClick={() => handleFilter()}>
                  <span
                    className={`hover:text-indigo-600 ${filter === "" && "text-indigo-600"}`}
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
              <TableHead className="text-left">Jours</TableHead>
              <TableHead className="text-left">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {demandList.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  Aucune demande trouvée
                </TableCell>
              </TableRow>
            ) : (
              demandList.map((demand: DemandAll) => (
                <TableRow
                  key={demand.id}
                  className="hover:cursor-pointer"
                  onClick={() => handleClick(demand.id)}
                >
                  <TableCell className="flex gap-2 text-left">
                    {getStatusOption(demand.type).icon}
                    <div>
                      <div>{getStatusOption(demand.type).label}</div>
                      <div className="text-xs text-zinc-500">
                        {new Date(
                          demand?.createdAt?.toString(),
                        ).toLocaleDateString("fr-FR", dateOptions)}
                      </div>
                    </div>
                  </TableCell>
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
                    {demand.number_day}
                  </TableCell>
                  <TableCell className={`text-left`}>
                    {getClassForStatus(demand.status)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
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
            {`${1 + pageSize * (pageNumber - 1)} - ${demandList.length + pageSize * (pageNumber - 1)} sur ${totalData}`}
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
    </>
  );
}
