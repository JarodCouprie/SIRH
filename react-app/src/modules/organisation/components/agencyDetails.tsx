import React, { Dispatch, SetStateAction } from "react";
import { AgencyAddress } from "@/modules/organisation/components/agencyAddress.js";
import { AgencyModel } from "@/models/organisation/agency/Agency.model.js";
import { AgencyChart } from "@/modules/organisation/components/agencyChart.js";

interface AgencyDetailsProps {
  agency: AgencyModel;
  setAgency: Dispatch<SetStateAction<AgencyModel>>;
}

export const AgencyDetails: React.FC<AgencyDetailsProps> = ({
  agency,
  setAgency,
}) => {
  return (
    <div className="grid w-full grid-cols-3 gap-4">
      <div className="col-span-1 flex flex-col gap-4 max-2xl:col-span-3">
        <AgencyAddress agency={agency} setAgency={setAgency} />
      </div>
      <div className="col-span-2 flex flex-col gap-4 max-2xl:col-span-3">
        <AgencyChart />
      </div>
    </div>
  );
};
