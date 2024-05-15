import { Button } from "@/components/ui/button.tsx";
import { FaArrowLeft } from "react-icons/fa6";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DemandDTO } from "@/models/DemandModel.ts";
import { useAuth } from "@/hooks/useAuth.tsx";
import { AuthTokens } from "@/type/context/authTokens.tsx";

export function DemandDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [demand, setDemand] = useState<DemandDTO>({
    id: 0,
    startDate: new Date(),
    endDate: new Date(),
    createdAt: new Date(),
    status: "",
    type: DemandType.CA,
    number_day: 1,
  });
  const { token } = useAuth() as AuthTokens;
  const handleClick = () => {
    navigate("/demand");
  };

  const fetchDemand = async () => {
    await fetch(`http://localhost:5000/api/demand/${id}`, {
      headers: { Authorization: `Bearer ${token.accessToken}` },
    })
      .then((response) => response.json())
      .then((data) => {
        setDemand(data.data);
        console.log(data);
      });
  };

  useEffect(() => {
    fetchDemand().then();
  }, []);

  return (
    <>
      <div>
        <Button variant="link" onClick={handleClick}>
          <FaArrowLeft className="mr-2" />
          <div>Demandes</div>
        </Button>
      </div>
      {id ? <div>Détails</div> : <div> Cette demande n'existe pas</div>}
    </>
  );
}

export enum DemandType {
  RTT = "RTT",
  TT = "TT",
  CA = "CA",
}
