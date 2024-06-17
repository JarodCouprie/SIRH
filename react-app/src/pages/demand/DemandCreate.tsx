import { Card, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { TbCalendarClock, TbCalendarRepeat } from "react-icons/tb";
import { MdOutlineLaptop } from "react-icons/md";

import { FaArrowLeft } from "react-icons/fa6";
import { Button } from "@/components/ui/button.tsx";
import { useNavigate } from "react-router-dom";
import DemandForm from "@/components/demand/demandForm.tsx";

export function DemandCreate() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/demand");
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <Button variant="link" onClick={handleClick}>
          <FaArrowLeft className="mr-2" />
          <div>Demandes</div>
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

      <DemandForm
        submitUrl="http://localhost:5000/api/demand"
        method="POST"
        navigateUrl="/demand"
      />
    </div>
  );
}
