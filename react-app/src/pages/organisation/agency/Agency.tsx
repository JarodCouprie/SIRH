import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs.js";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { customFetcher } from "@/helper/fetchInstance.js";
import { AgencyModel } from "@/models/organisation/agency/Agency.model.js";
import { AgencyDetails } from "@/components/organisation/Agency/agencyDetails.js";
import { Button } from "@/components/ui/button.js";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { FaBuilding } from "react-icons/fa";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.js";

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
      <Card className="my-4 flex items-center pe-2">
        <CardHeader className="flex items-center">
          <FaBuilding className="size-10 text-gray-500" />
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
      <div>
        <Tabs defaultValue="details">
          <TabsList className="flex flex-wrap">
            <TabsTrigger value="details">Agence</TabsTrigger>
            <TabsTrigger value="demand">Services</TabsTrigger>
            <TabsTrigger value="expense">Équipes</TabsTrigger>
          </TabsList>
          <TabsContent value="details">
            <AgencyDetails agency={foundAgency} setAgency={setFoundAgency} />
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
