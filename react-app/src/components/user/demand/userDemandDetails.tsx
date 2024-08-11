import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { Button } from "@/components/ui/button.js";
import { customFetcher } from "@/helper/fetchInstance.js";
import { useEffect, useState } from "react";
import { DemandValidated } from "@/type/demand/validated-demand-list.type.js";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.js";

export const UserDemandDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state.user;
  const { demandId } = useParams<{ demandId: string }>();

  const [demand, setDemand] = useState<DemandValidated>();

  const handleClick = () => {
    if (location.state?.previousRoute) {
      navigate(location.state.previousRoute);
    } else {
      navigate("/user");
    }
  };

  const fetchDemand = async () => {
    const { data } = await customFetcher(
      `http://localhost:5000/api/demand/${demandId}`,
    );
    setDemand(data.data);
  };

  useEffect(() => {
    fetchDemand().then();
  }, []);

  return (
    <div className="flex flex-col items-start gap-4 ">
      <Button variant="link" onClick={handleClick}>
        <FaArrowLeft className="mr-2" />
        <div>
          {user ? `${user?.firstname} ${user?.lastname}` : "Utilisateur"}
        </div>
      </Button>
      <Card>
        <CardHeader>
          <CardTitle>Demande</CardTitle>
        </CardHeader>
        <CardContent>{demand?.id}</CardContent>
      </Card>
    </div>
  );
};
