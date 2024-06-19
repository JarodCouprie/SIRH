import { FaArrowLeft } from "react-icons/fa6";
import { Button } from "@/components/ui/button.tsx";
import { useNavigate } from "react-router-dom";
import DemandForm from "@/components/demand/demandForm.tsx";
import { DemandCard } from "@/components/demand/demandCard.tsx";

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

      <DemandCard />

      <DemandForm submitUrl="http://localhost:5000/api/demand" method="POST" />
    </div>
  );
}
