import { AgencyTeam } from "@/modules/organisation/components/team/agencyTeam.js";
import { DepartmentInfo } from "@/modules/organisation/components/service/departmentInfo.js";

export const AgencyDepartmentDetails = () => {
  return (
    <div className="grid w-full grid-cols-3 gap-4">
      <div className="col-span-1 flex flex-col gap-4 max-2xl:col-span-3">
        <DepartmentInfo />
      </div>
      <div className="col-span-2 flex flex-col gap-4 max-2xl:col-span-3">
        <AgencyTeam />
      </div>
    </div>
  );
};
