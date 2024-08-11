import { MainRoot } from "@/components/navigation/MainRoot.tsx";
import { OrganisationMap } from "@/components/organisation/OrganisationMap.js";

export const Organisation = () => {
  return (
    <MainRoot title="Organisation">
      <div className="grid h-full grid-cols-4">
        <div className="col-span-1"></div>
        <div className="col-span-3">
          <OrganisationMap />
        </div>
      </div>
    </MainRoot>
  );
};
