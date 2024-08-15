import { useEffect, useState } from "react";
import { DemandDTO } from "@/models/demand/DemandList.model.ts";
import { useParams } from "react-router-dom";
import DemandForm from "@/modules/demand/components/demandForm.tsx";
import { DemandType } from "@/common/enum/DemandType.enum.js";
import { customFetcher } from "@/common/helper/fetchInstance.js";

export function DemandEdit() {
  const { id } = useParams();
  const [demand, setDemand] = useState<DemandDTO>({
    motivation: "",
    start_date: new Date(),
    end_date: new Date(),
    type: DemandType.CA,
    file_url: "",
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
