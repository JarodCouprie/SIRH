import { Button } from "@/components/ui/button.tsx";
import { FaArrowLeft } from "react-icons/fa6";
import React from "react";
import { useNavigate } from "react-router-dom";

export function ReadDemand() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/demand");
  };

  return (
    <>
      <div>Visualisation data</div>
      <div>
        <Button className="mb-3 mt-3" variant="ghost" onClick={handleClick}>
          <FaArrowLeft />
          <div className="ms-1">Demandes</div>
        </Button>
      </div>
    </>
  );
}
