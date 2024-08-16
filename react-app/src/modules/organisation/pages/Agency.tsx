import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs.js";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { AgencyModel } from "@/models/organisation/agency/Agency.model.js";
import { AgencyDetails } from "@/modules/organisation/components/agencyDetails.js";
import { Button } from "@/components/ui/button.js";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.js";
import { customFetcher } from "@/common/helper/fetchInstance.js";
import { TbBuildingEstate } from "react-icons/tb";
import { AgencyDepartment } from "@/modules/organisation/components/agencyDepartment.js";
import { AgencyTeam } from "@/modules/organisation/components/agencyTeam.js";

export const Agency = () => {
  const { id } = useParams();
  const [agencyLoaded, setAgencyLoaded] = useState<boolean>(false);
  const [agencyNotFound, setAgencyNotFound] = useState<boolean>(false);
  const [foundAgency, setFoundAgency] = useState<AgencyModel>(
    new AgencyModel(),
  );
  const navigate = useNavigate();

  const fetchUser = async () => {
    await customFetcher(`http://localhost:5000/api/agency/${id}`).then(
      (response) => {
        if (response.response.status !== 200) {
          return setAgencyNotFound(true);
        }
        setAgencyLoaded(true);
        setFoundAgency(response.data.data);
      },
    );
  };

  useEffect(() => {
    fetchUser().then();
  }, []);

  const noAgency = (
    <div>
      <h1 className="text-gray-950 dark:text-gray-100">
        Cett agence n'éxiste pas
      </h1>
    </div>
  );

  const handleGoBackToList = () => {
    navigate("/organisation");
  };

  const agencyMainPage = (
    <div className="w-full">
      <Card className="flex items-center">
        <CardHeader className="flex items-center">
          <TbBuildingEstate className="size-8 text-gray-300" />
        </CardHeader>
        <div className="flex flex-grow flex-col">
          <CardTitle className="text-lg font-semibold">
            {foundAgency.label}
          </CardTitle>
          <CardDescription className="text-sm text-gray-600">
            {foundAgency.address.streetNumber} {foundAgency.address.street},{" "}
            {foundAgency.address.zipcode} {foundAgency.address.locality}
          </CardDescription>
        </div>
      </Card>
      <div className="py-4">
        <Tabs defaultValue="details">
          <TabsList className="flex flex-wrap">
            <TabsTrigger value="details">Agence</TabsTrigger>
            <TabsTrigger value="service">Services</TabsTrigger>
            <TabsTrigger value="team">Équipes</TabsTrigger>
          </TabsList>
          <TabsContent value="details">
            <AgencyDetails agency={foundAgency} setAgency={setFoundAgency} />
          </TabsContent>
          <TabsContent value="service">
            <AgencyDepartment agency={foundAgency} />
          </TabsContent>
          <TabsContent value="team">
            <AgencyTeam agency={foundAgency} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col items-start gap-4 ">
      <Button onClick={handleGoBackToList} variant="link">
        <ArrowLeftIcon className="mr-2 h-4 w-4" />
        <span>Agence</span>
      </Button>
      {agencyLoaded && agencyMainPage}
      {agencyNotFound && noAgency}
    </div>
  );
};
