import { useEffect, useState } from "react";
import { DemandDTO } from "@/models/Demand.model.ts";
import { DemandType } from "@/pages/demand/DemandDetail.tsx";
import { useParams } from "react-router-dom";
import { customFetcher } from "@/helper/fetchInstance.ts";
import DemandForm from "@/components/demand/demandForm.tsx";

export function DemandEdit() {
  const { id } = useParams();
  const [demand, setDemand] = useState<DemandDTO>({
    motivation: "",
    start_date: new Date(),
    end_date: new Date(),
    type: DemandType.CA,
    status: "",
  });

  const fetchDemand = async () => {
    await customFetcher(`http://localhost:5000/api/demand/${id}`).then(
      (data) => {
        setDemand(data.data.data);
      },
    );
  };

  useEffect(() => {
    fetchDemand();
  }, []);

  return (
    <>
      <DemandForm
        initialData={demand}
        submitUrl={`http://localhost:5000/api/demand/${id}`}
        method="PUT"
      />
    </>
  );
}
